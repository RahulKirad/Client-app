import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import mysql from 'mysql2/promise';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Database connection (reuse from main app)
const dbConfig: any = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'cottoniq_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

if (process.env.DB_PASSWORD !== undefined && process.env.DB_PASSWORD.trim() !== '') {
  dbConfig.password = process.env.DB_PASSWORD;
}

const pool = mysql.createPool(dbConfig);

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Check if admin user exists (create default if not)
    const [rows] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    let user: any;
    if (Array.isArray(rows) && rows.length === 0) {
      // Create default admin user if none exists
      if (username === 'admin') {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
          'INSERT INTO admin_users (username, password) VALUES (?, ?)',
          [username, hashedPassword]
        );
        const [newRows] = await pool.execute('SELECT id, username FROM admin_users WHERE username = ?', [username]);
        user = Array.isArray(newRows) && newRows.length > 0 ? (newRows as any[])[0] : { id: 1, username };
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      user = (rows as any[])[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    let msg = 'Login failed';
    if (error?.code === 'ER_NO_SUCH_TABLE' || error?.sqlMessage?.includes('admin_users')) {
      msg = 'Database not set up. Run the schema: backend/database/mysql_schema.sql';
    } else if (error?.code === 'ECONNREFUSED' || error?.code === 'ER_ACCESS_DENIED_ERROR') {
      msg = 'Database connection failed. Check MySQL is running and backend .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).';
    } else if (error?.sqlMessage) {
      msg = error.sqlMessage;
    } else if (error?.message) {
      msg = error.message;
    }
    res.status(500).json({ error: msg });
  }
});

// Get all products (admin)
router.get('/products', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/** Normalize specifications for DB: always return valid JSON string for CHECK (json_valid). */
function normalizeSpecifications(specifications: unknown): string {
  if (specifications == null || specifications === '') return '{}';
  if (typeof specifications === 'string') {
    try {
      const parsed = JSON.parse(specifications);
      return JSON.stringify(parsed);
    } catch {
      return '{}';
    }
  }
  try {
    return JSON.stringify(specifications);
  } catch {
    return '{}';
  }
}

// Create new product (up to 3 images). Accept both "image" and "images" field names.
router.post('/products', authenticateToken, upload.any(), async (req: AuthRequest, res) => {
  try {
    const body = req.body || {};
    const { name, category, description, material, print_type, packaging, moq, price, specifications, is_featured } = body;

    if (!name || !category || !description) {
      return res.status(400).json({ error: 'Name, category, and description are required' });
    }

    const rawFiles = (req as any).files as Express.Multer.File[] | undefined;
    const files = Array.isArray(rawFiles) ? rawFiles.slice(0, 3) : [];
    const urls = Array.isArray(files) && files.length > 0
      ? files.map((f) => `/uploads/${f.filename}`)
      : [];
    const image_url = urls[0] || null;
    const gallery_images = JSON.stringify(urls);

    const specsStr = normalizeSpecifications(specifications);
    const isFeatured = is_featured === 'true' || is_featured === true;

    const baseParams = [
      String(name),
      String(category),
      String(description),
      material || '100% GOTS-certified cotton',
      print_type || 'Water-based inks',
      packaging || 'FSC-certified hangtags and labels',
      moq || '',
      parseFloat(price) || 0,
      image_url,
      specsStr,
      isFeatured
    ];

    let result: any;
    try {
      [result] = await pool.execute(
        `INSERT INTO products (name, category, description, material, print_type, packaging, moq, price, image_url, gallery_images, specifications, is_featured, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [baseParams[0], baseParams[1], baseParams[2], baseParams[3], baseParams[4], baseParams[5], baseParams[6], baseParams[7], baseParams[8], gallery_images, baseParams[9], baseParams[10]]
      );
    } catch (insertErr: any) {
      if (insertErr?.code === 'ER_BAD_FIELD_ERROR' && insertErr?.sqlMessage?.includes('gallery_images')) {
        [result] = await pool.execute(
          `INSERT INTO products (name, category, description, material, print_type, packaging, moq, price, image_url, specifications, is_featured, is_active) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          baseParams
        );
      } else {
        throw insertErr;
      }
    }

    res.status(201).json({
      message: 'Product created successfully',
      id: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    const sqlMessage = error?.sqlMessage || '';
    const message = error?.code === 'ER_INVALID_JSON' || sqlMessage.includes('JSON')
      ? 'Invalid specifications format'
      : sqlMessage || error?.message || 'Failed to create product';
    res.status(500).json({ error: message, code: error?.code });
  }
});

// Update product (up to 3 images). Accept both "image" and "images" field names.
router.put('/products/:id', authenticateToken, upload.any(), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, material, print_type, packaging, moq, price, specifications, is_featured } = req.body;

    const specsStr = normalizeSpecifications(specifications);

    let updateQuery = `
      UPDATE products SET 
        name = ?, category = ?, description = ?, material = ?, print_type = ?, 
        packaging = ?, moq = ?, price = ?, specifications = ?, is_featured = ?, 
        updated_at = CURRENT_TIMESTAMP
    `;
    
    const queryParams: any[] = [
      name,
      category,
      description,
      material,
      print_type,
      packaging,
      moq,
      parseFloat(price) || 0,
      specsStr,
      is_featured === 'true' || is_featured === true
    ];

    const rawFiles = (req as any).files as Express.Multer.File[] | undefined;
    const files = Array.isArray(rawFiles) ? rawFiles.slice(0, 3) : [];
    if (Array.isArray(files) && files.length > 0) {
      const urls = files.map((f) => `/uploads/${f.filename}`);
      updateQuery += ', image_url = ?, gallery_images = ?';
      queryParams.push(urls[0], JSON.stringify(urls));
    }

    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    await pool.execute(updateQuery, queryParams);

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all inquiries
router.get('/inquiries', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM inquiries ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Update inquiry status
router.put('/inquiries/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await pool.execute(
      'UPDATE inquiries SET status = ? WHERE id = ?',
      [status, id]
    );
    
    res.json({ message: 'Inquiry status updated successfully' });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Get content sections
router.get('/content', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM content_sections ORDER BY section_key'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Update content section
router.put('/content/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, content, is_active } = req.body;
    
    await pool.execute(
      'UPDATE content_sections SET title = ?, content = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, JSON.stringify(content), is_active, id]
    );
    
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// ----- Chatbot Control -----
// Ensure chatbot_settings table exists
async function ensureChatbotSettingsTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS chatbot_settings (
      id INT PRIMARY KEY DEFAULT 1,
      is_enabled TINYINT(1) NOT NULL DEFAULT 1,
      custom_instructions TEXT,
      disallowed_topics TEXT,
      welcome_message TEXT,
      preferred_model VARCHAR(128) NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  try {
    await pool.execute('ALTER TABLE chatbot_settings ADD COLUMN preferred_model VARCHAR(128) NULL');
  } catch (_) {
    // Column already exists
  }
  const [rows] = await pool.execute('SELECT COUNT(*) as c FROM chatbot_settings');
  if ((rows as any[])[0].c === 0) {
    await pool.execute('INSERT INTO chatbot_settings (id, is_enabled) VALUES (1, 1)');
  }
}

// Get chatbot settings (admin)
router.get('/chatbot-settings', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await ensureChatbotSettingsTable();
    const [rows] = await pool.execute(
      'SELECT is_enabled, custom_instructions AS customInstructions, disallowed_topics AS disallowedTopics, welcome_message AS welcomeMessage, preferred_model AS preferredModel, updated_at AS updatedAt FROM chatbot_settings WHERE id = 1'
    );
    const row = Array.isArray(rows) && rows.length > 0 ? (rows as any[])[0] : null;
    const isEnabled = row && (row.is_enabled === 1 || row.is_enabled === true || String(row.is_enabled).trim() === '1');
    res.json({
      isEnabled: Boolean(isEnabled),
      customInstructions: row?.customInstructions ?? '',
      disallowedTopics: row?.disallowedTopics ?? '',
      welcomeMessage: row?.welcomeMessage ?? '',
      preferredModel: row?.preferredModel ?? '',
      updatedAt: row?.updatedAt ?? null,
    });
  } catch (error) {
    console.error('Error fetching chatbot settings:', error);
    res.status(500).json({ error: 'Failed to fetch chatbot settings' });
  }
});

// Update chatbot settings (admin)
// Uses INSERT ... ON DUPLICATE KEY UPDATE so the row is always written (avoids UPDATE affecting 0 rows).
router.put('/chatbot-settings', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await ensureChatbotSettingsTable();
    const { isEnabled, customInstructions, disallowedTopics, welcomeMessage, preferredModel } = req.body;
    // Only true, 1, or '1' mean enabled; everything else (false, 0, undefined, null) = disabled
    const isEnabledNum = isEnabled === true || isEnabled === 1 || isEnabled === '1' ? 1 : 0;
    const preferredModelVal = typeof preferredModel === 'string' && preferredModel.trim() ? preferredModel.trim() : null;
    await pool.execute(
      `INSERT INTO chatbot_settings (id, is_enabled, custom_instructions, disallowed_topics, welcome_message, preferred_model, updated_at)
       VALUES (1, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE
         is_enabled = VALUES(is_enabled),
         custom_instructions = VALUES(custom_instructions),
         disallowed_topics = VALUES(disallowed_topics),
         welcome_message = VALUES(welcome_message),
         preferred_model = VALUES(preferred_model),
         updated_at = CURRENT_TIMESTAMP`,
      [isEnabledNum, customInstructions ?? null, disallowedTopics ?? null, welcomeMessage ?? null, preferredModelVal]
    );
    res.json({
      message: 'Chatbot settings updated successfully',
      isEnabled: isEnabledNum === 1,
    });
  } catch (error) {
    console.error('Error updating chatbot settings:', error);
    res.status(500).json({ error: 'Failed to update chatbot settings' });
  }
});

// Chatbot visibility diagnostics (admin)
router.get('/chatbot-settings/diagnostics', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await ensureChatbotSettingsTable();
    const [rows] = await pool.execute(
      'SELECT is_enabled, is_enabled AS enabled FROM chatbot_settings WHERE id = 1'
    );
    const row = Array.isArray(rows) && rows.length > 0 ? (rows as any[])[0] : null;
    const rawEnabled = row?.is_enabled;
    const rawEnabledType = rawEnabled === undefined ? 'undefined' : typeof rawEnabled;
    const publicEnabled = row != null && (rawEnabled === 1 || rawEnabled === true || String(rawEnabled).trim() === '1');
    const adminEnabled = rawEnabled === 1 || rawEnabled === true || String(rawEnabled).trim() === '1';
    res.json({
      timestamp: new Date().toISOString(),
      database: {
        rawValue: rawEnabled,
        rawType: rawEnabledType,
        rawString: rawEnabled != null ? String(rawEnabled) : 'null',
      },
      adminApiReads: {
        isEnabled: adminEnabled,
        description: 'What admin GET /chatbot-settings returns for isEnabled',
      },
      publicApiReturns: {
        enabled: Boolean(publicEnabled),
        description: 'What the website GET /api/chatbot/settings receives (this controls visibility)',
      },
      verdict: {
        chatbotWillShowOnSite: Boolean(publicEnabled),
        suggestion: publicEnabled
          ? 'Site will show the chatbot. To hide it: set toggle to Off, click Save, then refresh the website or switch back to the site tab.'
          : 'Site will hide the chatbot. Toggle is working correctly.',
      },
    });
  } catch (error: any) {
    console.error('Chatbot diagnostics error:', error);
    res.status(500).json({
      timestamp: new Date().toISOString(),
      error: error.message,
      suggestion: 'Check backend logs and database connection.',
    });
  }
});

export default router;