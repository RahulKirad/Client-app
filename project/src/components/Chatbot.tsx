import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { apiClient } from '../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const DEFAULT_WELCOME = "Hello! I'm your Cottonunique assistant. I'm here to help you with questions about our premium sustainable tote bags, products, certifications, ordering, and more. How can I assist you today?";

export default function Chatbot() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSettings = () => {
    apiClient.getChatbotSettings().then((s) => {
      const nextEnabled = s.enabled === true;
      setEnabled(nextEnabled);
      if (!nextEnabled) setIsOpen(false);
      const welcome = s.welcomeMessage?.trim() || DEFAULT_WELCOME;
      setMessages((prev) => (prev.length === 0 ? [{ role: 'assistant', content: welcome, timestamp: new Date().toISOString() }] : prev));
    }).catch(() => {
      setEnabled(false);
      setIsOpen(false);
      setMessages((prev) => (prev.length === 0 ? [{ role: 'assistant', content: DEFAULT_WELCOME, timestamp: new Date().toISOString() }] : prev));
    });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const onFocus = () => fetchSettings();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Poll settings so toggle Off in admin hides the chatbot without refresh (30s to avoid rate limit)
  useEffect(() => {
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await apiClient.sendChatMessage(userMessage.content, conversationHistory);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      let errorContent = "I'm sorry, I'm having trouble connecting right now. Please try again later or use the contact form to reach us.";
      
      // Show debug info in development
      if (import.meta.env.DEV && error.debug) {
        errorContent += `\n\n[Debug Info]\nModel: ${error.debug.usingModel || error.debug.attemptedModel || 'unknown'}\nError: ${error.message || 'Unknown error'}`;
        if (error.debug.finalErrorStatus) {
          errorContent += `\nStatus: ${error.debug.finalErrorStatus}`;
        }
        console.log('Chatbot Debug Info:', error.debug);
      }
      
      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (enabled === null) return null;
  if (!enabled) return null;

  return (
    <>
      {/* Chatbot Toggle Button - pastel green */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:opacity-90 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16"
          style={{ backgroundColor: '#A5D6A7' }}
          aria-label="Open chatbot"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbot Window - pastel green & white */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[400px] z-50 max-w-[calc(100vw-2rem)] sm:max-w-[400px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border-2 border-[#C8E6C9]">
          {/* Header - pastel green */}
          <div
            className="px-4 py-3 flex items-center justify-between text-white"
            style={{ backgroundColor: '#7CB342' }}
          >
            <div className="flex items-center gap-2">
              <img
                src="/images/favicon.png"
                alt="Cottonunique"
                className="w-8 h-8 rounded-full object-contain bg-white flex-shrink-0"
              />
              <h3 className="font-semibold text-base sm:text-lg truncate min-w-0">Cottonunique Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-90 rounded-full p-1 transition-opacity"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages - white background */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white" style={{ maxHeight: '400px' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-[#C8E6C9] flex items-center justify-center overflow-hidden">
                    <img src="/images/favicon.png" alt="" className="w-6 h-6 object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'text-white'
                      : 'bg-white text-gray-800 border-2 border-[#C8E6C9]'
                  }`}
                  style={message.role === 'user' ? { backgroundColor: '#81C784' } : undefined}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C8E6C9' }}>
                    <User size={16} style={{ color: '#2E7D32' }} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-[#C8E6C9] flex items-center justify-center overflow-hidden">
                  <img src="/images/favicon.png" alt="" className="w-6 h-6 object-contain" />
                </div>
                <div className="bg-white text-gray-800 border-2 border-[#C8E6C9] rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#7CB342', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#7CB342', animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#7CB342', animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - white with pastel green accents */}
          <div className="p-4 border-t-2 border-[#C8E6C9] bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 px-4 py-2 border-2 border-[#C8E6C9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="text-white rounded-lg px-4 py-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: '#7CB342' }}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Google Gemini AI • Cottonunique specific assistant
            </p>
          </div>
        </div>
      )}
    </>
  );
}
