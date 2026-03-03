import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pool } from 'mysql2/promise';

/** Fallback model names if API list fails (in order of preference) */
const FALLBACK_MODEL_NAMES = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro',
];

/** Current model being used (will be set after discovery or testing) */
let currentModelName = FALLBACK_MODEL_NAMES[0];

/** Models discovered from API (populated by fetchAvailableModels) */
let discoveredModelNames: string[] = [];

const GEMINI_MODELS_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Fetches list of available models from Gemini API and returns model IDs
 * that support generateContent. Prefers text-generation models.
 */
async function fetchAvailableModels(apiKey: string): Promise<string[]> {
  const url = `${GEMINI_MODELS_URL}?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Models list failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { models?: Array<{ name: string; supportedGenerationMethods?: string[] }> };
  const models = data.models || [];
  const names: string[] = [];
  for (const m of models) {
    const supported = m.supportedGenerationMethods || [];
    if (!supported.includes('generateContent')) continue;
    const name = m.name.startsWith('models/') ? m.name.slice(7) : m.name;
    if (!names.includes(name)) names.push(name);
  }
  return names;
}

/** System prompt that makes the chatbot specific to Cottonunique application. */
const COTTONIQ_SYSTEM_PROMPT = `You are a helpful customer service assistant for Cottonunique, a premium sustainable tote bag e-commerce platform. Your role is to answer questions specifically about Cottonunique's products, services, and business.

About Cottonunique:
- Cottonunique specializes in premium, sustainable tote bags made from 100% GOTS-certified organic cotton
- We offer ethically sourced, intelligently designed, and export-ready products
- Our products are designed for businesses and individuals who value both aesthetics and sustainability
- We provide custom branding for corporate gifting
- We offer bulk orders, sample orders, and custom orders
- Our products feature water-based inks and FSC-certified packaging
- We are GOTS-certified, FSC-compliant, and MSME & export compliant
- We serve clients globally and are export-ready

Key Information:
- Products: Premium sustainable tote bags in various categories (Classic Cotton Totes, etc.)
- Materials: 100% GOTS-certified organic cotton
- Print Type: Water-based inks
- Packaging: FSC-certified hangtags and labels
- MOQ: Flexible for pilot programs
- Certifications: GOTS, FSC, MSME & export compliance
- Order Types: Sample orders, bulk orders, custom orders
- Use Cases: Corporate gifting, retail, personal use
- Contact: Customers can submit inquiries through the contact form on the website

About Tote Bags (explain when asked):
- What are tote bags: A tote bag is a large, open-top bag with parallel handles (often long straps), used for carrying shopping, groceries, books, beach items, or everyday belongings. They are versatile, reusable, and eco-friendly alternatives to single-use plastic bags.
- Types: Classic canvas/cotton totes, promotional totes, grocery totes, beach totes, laptop totes, and custom-branded totes for events or corporate gifting.
- Benefits: Reusable and durable; reduce plastic waste; lightweight and easy to fold; can be custom-printed for branding; suitable for retail, events, and corporate gifting; professional and sustainable image.
- Materials: Cotton totes (like Cottonunique’s) are made from natural fibres; organic cotton is grown without harmful pesticides and is GOTS-certified for environmental and social standards. Cotton is breathable, washable, and biodegradable.
- Cottonunique’s tote bags: We make premium sustainable tote bags from 100% GOTS-certified organic cotton, with water-based inks and FSC-certified packaging. Ideal for corporate gifting, retail, samples, and bulk orders. We offer custom branding and are export-ready.
- When users ask "what are tote bags", "explain tote bags", "tell me about tote bags", or similar: Give a clear, friendly explanation of tote bags (what they are, types, benefits, materials) and then connect to Cottonunique’s sustainable cotton totes and how we can help (custom orders, samples, bulk, contact form).

Your Responsibilities:
- Answer questions about Cottonunique products, materials, certifications, and services
- Explain what tote bags are when asked (definition, types, benefits, materials) and link to Cottonunique’s sustainable totes
- Help customers understand our sustainability practices
- Provide information about ordering (sample, bulk, custom)
- Guide customers to use the contact form for inquiries
- Be friendly, professional, and knowledgeable about Cottonunique and tote bags
- If asked about topics unrelated to Cottonunique or tote bags, politely redirect to Cottonunique-related topics

Important: Only answer questions related to Cottonunique. If asked about other topics, politely say: "I'm here to help you with questions about Cottonunique's sustainable tote bags. How can I assist you today?"`;

/**
 * Returns the admin-selected preferred model ID from chatbot_settings, or null for auto.
 */
async function getPreferredModel(pool: Pool): Promise<string | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT preferred_model AS preferredModel FROM chatbot_settings WHERE id = 1'
    );
    const row = Array.isArray(rows) && rows.length > 0 ? (rows as any[])[0] : null;
    const v = row?.preferredModel;
    return typeof v === 'string' && v.trim() ? v.trim() : null;
  } catch (_) {
    return null;
  }
}

/**
 * Builds the system prompt for the chatbot, merging base Cottonunique prompt with admin-configured instructions.
 */
async function getSystemPrompt(pool: Pool): Promise<string> {
  let prompt = COTTONIQ_SYSTEM_PROMPT;
  try {
    const [rows] = await pool.execute(
      'SELECT custom_instructions, disallowed_topics FROM chatbot_settings WHERE id = 1'
    );
    const s = Array.isArray(rows) && rows.length > 0 ? (rows as any[])[0] : null;
    if (s?.custom_instructions?.trim()) {
      prompt += '\n\n--- Additional instructions from admin (follow these) ---\n' + s.custom_instructions.trim();
    }
    if (s?.disallowed_topics?.trim()) {
      prompt += '\n\n--- Do NOT respond to or discuss the following ---\n' + s.disallowed_topics.trim();
    }
  } catch (_) {
    // ignore; use base prompt only
  }
  return prompt;
}

export default function createChatbotRouter(pool: Pool) {
  const router = Router();

/**
 * GET /api/chatbot/diagnostics
 * Returns diagnostic information about the chatbot configuration.
 */
router.get('/diagnostics', async (req: Request, res: Response) => {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GOOGLE_API_KEY,
    apiKeyLength: process.env.GOOGLE_API_KEY?.length || 0,
    currentModel: currentModelName,
    availableModels: discoveredModelNames.length > 0 ? discoveredModelNames : FALLBACK_MODEL_NAMES,
  };

  if (!process.env.GOOGLE_API_KEY) {
    return res.json({
      ...diagnostics,
      status: 'error',
      error: 'GOOGLE_API_KEY is not configured',
    });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    // Fetch available models from API
    try {
      discoveredModelNames = await fetchAvailableModels(apiKey);
      diagnostics.modelsFromAPI = discoveredModelNames;
      if (discoveredModelNames.length > 0) {
        currentModelName = discoveredModelNames[0];
        diagnostics.currentModel = currentModelName;
      }
    } catch (listErr: any) {
      diagnostics.modelListError = listErr.message;
      discoveredModelNames = [];
    }

    const modelsToTest = discoveredModelNames.length > 0 ? discoveredModelNames : FALLBACK_MODEL_NAMES;
    const modelTests: any[] = [];
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const testResult = await model.generateContent('Test');
        await testResult.response;
        modelTests.push({ model: modelName, status: 'working' });
        if (!diagnostics.workingModel) {
          diagnostics.workingModel = modelName;
          currentModelName = modelName;
        }
      } catch (error: any) {
        modelTests.push({
          model: modelName,
          status: 'failed',
          error: error.message,
          statusCode: error.status,
        });
      }
    }
    diagnostics.modelTests = modelTests;

    res.json({
      ...diagnostics,
      status: diagnostics.workingModel ? 'ok' : 'error',
    });
  } catch (error: any) {
    res.json({
      ...diagnostics,
      status: 'error',
      error: error.message,
      stack: error.stack,
    });
  }
});

/**
 * GET /api/chatbot/models
 * Returns list of available Gemini model IDs (for admin model selector).
 */
router.get('/models', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.json({ models: FALLBACK_MODEL_NAMES });
    }
    try {
      const models = await fetchAvailableModels(apiKey);
      return res.json({ models: models.length > 0 ? models : FALLBACK_MODEL_NAMES });
    } catch (_) {
      return res.json({ models: FALLBACK_MODEL_NAMES });
    }
  } catch (error: any) {
    res.json({ models: FALLBACK_MODEL_NAMES });
  }
});

/**
 * POST /api/chatbot/message
 * Handles chatbot messages using Google Gemini API with Cottonunique-specific context.
 */
router.post('/message', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    messageLength: req.body.message?.length || 0,
    historyLength: req.body.conversationHistory?.length || 0,
  };

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('[CHATBOT] GOOGLE_API_KEY is not set');
      debugInfo.error = 'API key not configured';
      return res.status(500).json({
        error: 'Chatbot service is not configured',
        debug: debugInfo,
      });
    }

    debugInfo.apiKeyConfigured = true;
    debugInfo.apiKeyPrefix = apiKey.substring(0, 10) + '...';

    const genAI = new GoogleGenerativeAI(apiKey);
    debugInfo.attemptedModel = currentModelName;

    // If we haven't discovered models yet, fetch from API once
    if (discoveredModelNames.length === 0) {
      try {
        discoveredModelNames = await fetchAvailableModels(apiKey);
        if (discoveredModelNames.length > 0) {
          currentModelName = discoveredModelNames[0];
          debugInfo.modelsDiscovered = discoveredModelNames.length;
        }
      } catch (_) {
        discoveredModelNames = [];
      }
    }

    const baseModels = discoveredModelNames.length > 0 ? discoveredModelNames : FALLBACK_MODEL_NAMES;
    const preferred = await getPreferredModel(pool);
    const modelsToTry =
      preferred && baseModels.includes(preferred)
        ? [preferred, ...baseModels.filter((m) => m !== preferred)]
        : preferred
          ? [preferred, ...baseModels]
          : baseModels;
    debugInfo.preferredModel = preferred || undefined;

    // Try to use the current model, fallback to others if it fails
    let model;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        debugInfo.testingModel = modelName;
        model = genAI.getGenerativeModel({ model: modelName });
        await model.generateContent('test');
        currentModelName = modelName;
        if (modelName !== debugInfo.attemptedModel) {
          debugInfo.modelSwitched = true;
          debugInfo.newModel = modelName;
          console.log(`[CHATBOT] Using model: ${modelName}`);
        }
        break;
      } catch (error: any) {
        debugInfo.modelTestFailed = modelName;
        lastError = error;
        model = undefined;
        continue;
      }
    }

    if (!model) {
      const errMsg = lastError?.message || String(lastError);
      const cause = (lastError as any)?.cause;
      const causeInfo = cause ? ` [cause: ${cause.code || cause.message || 'unknown'}]` : '';
      const causeStr = cause ? String(cause.code || cause.message || '') : '';
      const isNetworkError = ['fetch failed', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'socket hang up', 'UND_ERR'].some(
        (s) => errMsg.includes(s) || causeStr.includes(s)
      );
      console.error('[CHATBOT] No working model found. Last error:', errMsg + causeInfo);
      debugInfo.allModelsFailed = true;
      debugInfo.lastError = errMsg;
      if (cause) debugInfo.lastErrorCause = cause.code || cause.message;
      const suggestion = isNetworkError
        ? 'Cannot reach Google API (network error). Check: 1) Internet connection, 2) Firewall/proxy allowing HTTPS to *.googleapis.com, 3) GOOGLE_API_KEY in .env is valid.'
        : 'Check GOOGLE_API_KEY in .env and that the key has access to Gemini models.';
      return res.status(500).json({
        error: 'No working model found',
        debug: debugInfo,
        suggestion,
      });
    }

    debugInfo.usingModel = currentModelName;

    // Load admin-configured prompt (custom instructions + disallowed topics)
    const systemPrompt = await getSystemPrompt(pool);

    // Build conversation history (last 10 messages to avoid token limits)
    // Gemini requires history to START with 'user' – strip any leading assistant messages
    const rawHistory = conversationHistory.slice(-10);
    debugInfo.rawHistoryLength = rawHistory.length;
    
    const recentHistory = (() => {
      let i = 0;
      while (i < rawHistory.length && rawHistory[i].role === 'assistant') i++;
      return rawHistory.slice(i);
    })();
    
    debugInfo.recentHistoryLength = recentHistory.length;
    debugInfo.strippedLeadingAssistants = rawHistory.length - recentHistory.length;

    const history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // If no user messages yet (only had assistant greeting), treat as first message
    if (recentHistory.length === 0) {
      debugInfo.mode = 'first_message';
      debugInfo.systemPromptLength = systemPrompt.length;
      
      try {
        const contextualMessage = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;
        debugInfo.contextualMessageLength = contextualMessage.length;
        
        const result = await model.generateContent(contextualMessage);
        const response = await result.response;
        const text = response.text();
        
        debugInfo.responseLength = text.length;
        debugInfo.processingTime = Date.now() - startTime;

        return res.json({
          message: text,
          timestamp: new Date().toISOString(),
          debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined,
        });
      } catch (error: any) {
        debugInfo.generateContentError = error.message;
        debugInfo.errorStatus = error.status;
        debugInfo.errorStatusText = error.statusText;
        throw error;
      }
    }

    // Convert to Gemini format: first content must be 'user'
    debugInfo.mode = 'conversation';
    let isFirstUserMessage = true;
    for (const item of recentHistory) {
      if (item.role === 'user') {
        history.push({
          role: 'user',
          parts: [{ text: isFirstUserMessage ? `${systemPrompt}\n\n${item.content}` : item.content }],
        });
        isFirstUserMessage = false;
      } else {
        history.push({
          role: 'model',
          parts: [{ text: item.content }],
        });
      }
    }
    
    debugInfo.historyLength = history.length;
    debugInfo.historyStartsWith = history[0]?.role || 'none';

    try {
      // startChat requires first entry to be role 'user'
      debugInfo.startingChat = true;
      const chat = model.startChat({
        history,
      });
      debugInfo.chatStarted = true;

      // Send current message
      debugInfo.sendingMessage = true;
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      debugInfo.responseLength = text.length;
      debugInfo.processingTime = Date.now() - startTime;

      res.json({
        message: text,
        timestamp: new Date().toISOString(),
        debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined,
      });
    } catch (chatError: any) {
      debugInfo.chatError = chatError.message;
      debugInfo.chatErrorStatus = chatError.status;
      debugInfo.chatErrorStatusText = chatError.statusText;
      debugInfo.chatErrorDetails = chatError.errorDetails;
      throw chatError;
    }
  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    console.error('[CHATBOT] Error processing message:', {
      error: error.message,
      status: error.status,
      statusText: error.statusText,
      model: debugInfo.usingModel || debugInfo.attemptedModel,
      processingTime,
    });
    
    debugInfo.finalError = error.message;
    debugInfo.finalErrorStatus = error.status;
    debugInfo.finalErrorStatusText = error.statusText;
    debugInfo.processingTime = processingTime;
    
    res.status(500).json({
      error: 'Failed to process message',
      message: error.message || 'An unexpected error occurred',
      debug: debugInfo,
      suggestion: error.status === 404 
        ? 'Model not found. Try calling GET /api/chatbot/diagnostics to find available models.'
        : 'Check API key and model availability.',
    });
  }
});

  return router;
}
