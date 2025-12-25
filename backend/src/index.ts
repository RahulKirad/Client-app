import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import rateLimit from 'express-rate-limit';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// MySQL connection configuration
const dbConfig: any = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'cottoniq_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Force no password for root user
console.log('🔧 Forcing no password for MySQL connection');

console.log('🔧 Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  hasPassword: !!dbConfig.password
});

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// Routes

// Get all products
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE is_active = TRUE ORDER BY is_featured DESC, created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get featured products
app.get('/api/products/featured', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE is_active = TRUE AND is_featured = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    );
    
    if (Array.isArray(rows) && rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Submit inquiry
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, company, email, region, order_type, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO inquiries (name, company, email, region, order_type, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, company, email, region, order_type, message]
    );
    
    res.status(201).json({ 
      message: 'Inquiry submitted successfully',
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// Get content sections
app.get('/api/content/:sectionKey', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM content_sections WHERE section_key = ? AND is_active = TRUE',
      [req.params.sectionKey]
    );
    
    if (Array.isArray(rows) && rows.length === 0) {
      return res.status(404).json({ error: 'Content section not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Admin routes
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  testConnection();
});

export default app;