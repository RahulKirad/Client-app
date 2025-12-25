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
        const [result] = await pool.execute(
          'INSERT INTO admin_users (username, password) VALUES (?, ?)',
          [username, hashedPassword]
        );
        user = { id: (result as any).insertId, username };
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
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

// Create new product
router.post('/products', authenticateToken, upload.single('image'), async (req: AuthRequest, res) => {
  try {
    const { name, category, description, material, print_type, packaging, moq, price, specifications, is_featured } = req.body;
    
    if (!name || !category || !description) {
      return res.status(400).json({ error: 'Name, category, and description are required' });
    }

    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const [result] = await pool.execute(
      `INSERT INTO products (name, category, description, material, print_type, packaging, moq, price, image_url, specifications, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        description,
        material || '100% GOTS-certified cotton',
        print_type || 'Water-based inks',
        packaging || 'FSC-certified hangtags and labels',
        moq || 'Flexible for pilot programs',
        parseFloat(price) || 0,
        image_url,
        specifications ? JSON.stringify(specifications) : '{}',
        is_featured === 'true' || is_featured === true
      ]
    );

    res.status(201).json({
      message: 'Product created successfully',
      id: (result as any).insertId
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/products/:id', authenticateToken, upload.single('image'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, material, print_type, packaging, moq, price, specifications, is_featured } = req.body;

    let updateQuery = `
      UPDATE products SET 
        name = ?, category = ?, description = ?, material = ?, print_type = ?, 
        packaging = ?, moq = ?, price = ?, specifications = ?, is_featured = ?, 
        updated_at = CURRENT_TIMESTAMP
    `;
    
    let queryParams = [
      name,
      category,
      description,
      material,
      print_type,
      packaging,
      moq,
      parseFloat(price) || 0,
      specifications ? JSON.stringify(specifications) : '{}',
      is_featured === 'true' || is_featured === true
    ];

    if (req.file) {
      updateQuery += ', image_url = ?';
      queryParams.push(`/uploads/${req.file.filename}`);
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

export default router;