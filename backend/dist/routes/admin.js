"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../middleware/auth");
const promise_1 = __importDefault(require("mysql2/promise"));
const smtpConfigStore_1 = require("../services/smtpConfigStore");
const email_1 = require("../services/email");
const router = express_1.default.Router();
const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME || 'abhishek.deolalikar@gmail.com';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'admin@Cottonunique2026';
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed'));
        }
    }
});
const dbConfig = {
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
const pool = promise_1.default.createPool(dbConfig);
const DEFAULT_CONTENT_SECTIONS = [
    {
        section_key: 'hero',
        title: 'Homepage Hero',
        content: {
            headline: 'Where intelligent design meets ethical craftsmanship',
            subheadline: 'Smart. Sustainable. Global.',
            cta_primary: 'Explore Our Totes',
            cta_secondary: 'Corporate Solutions',
        },
        is_active: true,
    },
    {
        section_key: 'highlights',
        title: 'Key Highlights',
        content: {
            items: [
                'GOTS-certified cotton',
                'FSC-compliant packaging',
                'Export-ready documentation',
                'Custom branding for corporate gifting',
            ],
        },
        is_active: true,
    },
    {
        section_key: 'about_mission',
        title: 'Our Mission',
        content: {
            content: 'To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.',
        },
        is_active: true,
    },
    {
        section_key: 'about',
        title: 'About Us Section',
        content: {
            heading: 'ABOUT US',
            subheading: 'Premium Sustainable Tote Bags',
            description: 'We create beautiful, eco-friendly tote bags that meet the highest global standards. Every piece is ethically sourced, GOTS-certified, and designed for businesses and individuals who value quality and sustainability.',
        },
        is_active: true,
    },
    {
        section_key: 'about_story',
        title: 'Our Story',
        content: {
            content: 'Born from a passion for sustainability and global commerce, Cottonunique blends natural materials with modern branding to serve clients across continents.',
        },
        is_active: true,
    },
    {
        section_key: 'certifications',
        title: 'Certifications',
        content: {
            items: ['GOTS', 'FSC', 'MSME & export compliance'],
        },
        is_active: true,
    },
    {
        section_key: 'ecotote_duopack',
        title: 'EcoTote DuoPack Section',
        content: {
            heading: 'ECOTOTE',
            subheading: 'Our Competitive Edge',
            description: "We provide lower than industry standard MOQ's to help test markets and refine products at competitive prices.",
            cta: 'Request Quote for EcoTote DuoPack',
        },
        is_active: true,
    },
    {
        section_key: 'products_home',
        title: 'Homepage Products Section',
        content: {
            heading: 'Eco Totes for Every Market',
            subheading: 'Premium sustainable bags designed for global commerce',
            cta_primary: 'View All Products',
            cta_secondary: 'Request Samples',
        },
        is_active: true,
    },
    {
        section_key: 'corporate',
        title: 'Corporate Solutions Section',
        content: {
            heading: 'Smart Branding for Global Teams',
            subheading: 'Transform your corporate gifting with sustainable, custom-branded solutions',
            cta: 'Book a Consultation',
        },
        is_active: true,
    },
    {
        section_key: 'sustainability',
        title: 'Sustainability Section',
        content: {
            heading: 'More Than Just a Bag',
            subheading: 'Every Cottonunique product tells a story of sustainable practices and positive impact',
            report_cta: 'View Our Sustainability Report',
        },
        is_active: true,
    },
    {
        section_key: 'export',
        title: 'Export & Compliance Section',
        content: {
            heading: 'Export & Compliance',
            subheading: 'Seamless global delivery with complete regulatory compliance',
            cta_primary: 'Download Export Pack',
            cta_secondary: 'Talk to Our Compliance Team',
        },
        is_active: true,
    },
    {
        section_key: 'trust_strip',
        title: 'Trust Strip',
        content: {
            headline: 'Certified sustainable · Trusted by businesses worldwide',
            items: ['GOTS Certified', 'FSC Compliant', 'MSME Registered', 'Export Ready'],
        },
        is_active: true,
    },
    {
        section_key: 'contact',
        title: 'Contact Section',
        content: {
            heading: 'Get in Touch',
            subheading: "Ready to start your sustainable journey? Let's create something amazing together.",
            email_primary: 'abhishek.deolalikar@gmail.com',
            email_secondary: '',
            phone: '+91 7020631149',
            whatsapp_number: '+91 7020631149',
            whatsapp_message: "Hi Cottonunique! I’d like to know more about your tote bags.",
            visit_heading: 'Visit Us',
            visit_line_1: 'Sr no 131, STG, Alandi Road',
            visit_line_2: 'Pune - 412105',
        },
        is_active: true,
    },
    {
        section_key: 'get_in_touch',
        title: 'Get in Touch Section',
        content: {
            heading: 'Get in Touch',
            subheading: "Ready to start your sustainable journey? Let's create something amazing together.",
            cta: 'Send Inquiry',
        },
        is_active: true,
    },
];
async function ensureDefaultContentSections() {
    for (const section of DEFAULT_CONTENT_SECTIONS) {
        await pool.execute(`INSERT INTO content_sections (id, section_key, title, content, is_active)
       SELECT UUID(), ?, ?, ?, ?
       WHERE NOT EXISTS (
         SELECT 1 FROM content_sections WHERE section_key = ?
       )`, [
            section.section_key,
            section.title,
            JSON.stringify(section.content),
            section.is_active ? 1 : 0,
            section.section_key,
        ]);
    }
}
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }
        const [rows] = await pool.execute('SELECT * FROM admin_users WHERE username = ?', [username]);
        let user;
        if (Array.isArray(rows) && rows.length === 0) {
            if (username === DEFAULT_ADMIN_USERNAME && password === DEFAULT_ADMIN_PASSWORD) {
                const hashedPassword = await bcryptjs_1.default.hash(DEFAULT_ADMIN_PASSWORD, 10);
                await pool.execute('INSERT INTO admin_users (username, password) VALUES (?, ?)', [DEFAULT_ADMIN_USERNAME, hashedPassword]);
                const [newRows] = await pool.execute('SELECT id, username FROM admin_users WHERE username = ?', [DEFAULT_ADMIN_USERNAME]);
                user = Array.isArray(newRows) && newRows.length > 0 ? newRows[0] : { id: 1, username: DEFAULT_ADMIN_USERNAME };
            }
            else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        else {
            user = rows[0];
            const validPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.json({
            token,
            user: { id: user.id, username: user.username }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        let msg = 'Login failed';
        if (error?.code === 'ER_NO_SUCH_TABLE' || error?.sqlMessage?.includes('admin_users')) {
            msg = 'Database not set up. Run the schema: backend/database/mysql_schema.sql';
        }
        else if (error?.code === 'ECONNREFUSED' || error?.code === 'ER_ACCESS_DENIED_ERROR') {
            msg = 'Database connection failed. Check MySQL is running and backend .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).';
        }
        else if (error?.sqlMessage) {
            msg = error.sqlMessage;
        }
        else if (error?.message) {
            msg = error.message;
        }
        res.status(500).json({ error: msg });
    }
});
router.get('/products', auth_1.authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
function normalizeSpecifications(specifications) {
    if (specifications == null || specifications === '')
        return '{}';
    if (typeof specifications === 'string') {
        try {
            const parsed = JSON.parse(specifications);
            return JSON.stringify(parsed);
        }
        catch {
            return '{}';
        }
    }
    try {
        return JSON.stringify(specifications);
    }
    catch {
        return '{}';
    }
}
router.post('/products', auth_1.authenticateToken, upload.any(), async (req, res) => {
    try {
        const body = req.body || {};
        const { name, category, description, material, print_type, packaging, moq, price, specifications, is_featured } = body;
        if (!name || !category || !description) {
            return res.status(400).json({ error: 'Name, category, and description are required' });
        }
        const rawFiles = req.files;
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
        let result;
        try {
            [result] = await pool.execute(`INSERT INTO products (name, category, description, material, print_type, packaging, moq, price, image_url, gallery_images, specifications, is_featured, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`, [baseParams[0], baseParams[1], baseParams[2], baseParams[3], baseParams[4], baseParams[5], baseParams[6], baseParams[7], baseParams[8], gallery_images, baseParams[9], baseParams[10]]);
        }
        catch (insertErr) {
            if (insertErr?.code === 'ER_BAD_FIELD_ERROR' && insertErr?.sqlMessage?.includes('gallery_images')) {
                [result] = await pool.execute(`INSERT INTO products (name, category, description, material, print_type, packaging, moq, price, image_url, specifications, is_featured, is_active) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`, baseParams);
            }
            else {
                throw insertErr;
            }
        }
        res.status(201).json({
            message: 'Product created successfully',
            id: result.insertId
        });
    }
    catch (error) {
        console.error('Error creating product:', error);
        const sqlMessage = error?.sqlMessage || '';
        const message = error?.code === 'ER_INVALID_JSON' || sqlMessage.includes('JSON')
            ? 'Invalid specifications format'
            : sqlMessage || error?.message || 'Failed to create product';
        res.status(500).json({ error: message, code: error?.code });
    }
});
router.put('/products/:id', auth_1.authenticateToken, upload.any(), async (req, res) => {
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
        const queryParams = [
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
        const rawFiles = req.files;
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
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});
router.delete('/products/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});
router.get('/inquiries', auth_1.authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
});
router.put('/inquiries/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await pool.execute('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Inquiry status updated successfully' });
    }
    catch (error) {
        console.error('Error updating inquiry:', error);
        res.status(500).json({ error: 'Failed to update inquiry' });
    }
});
router.get('/content', auth_1.authenticateToken, async (req, res) => {
    try {
        await ensureDefaultContentSections();
        const [rows] = await pool.execute('SELECT * FROM content_sections ORDER BY section_key');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});
router.put('/content/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, is_active } = req.body;
        await pool.execute('UPDATE content_sections SET title = ?, content = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, JSON.stringify(content), is_active, id]);
        res.json({ message: 'Content updated successfully' });
    }
    catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ error: 'Failed to update content' });
    }
});
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
    }
    catch (_) {
    }
    const [rows] = await pool.execute('SELECT COUNT(*) as c FROM chatbot_settings');
    if (rows[0].c === 0) {
        await pool.execute('INSERT INTO chatbot_settings (id, is_enabled) VALUES (1, 1)');
    }
}
router.get('/chatbot-settings', auth_1.authenticateToken, async (req, res) => {
    try {
        await ensureChatbotSettingsTable();
        const [rows] = await pool.execute('SELECT is_enabled, custom_instructions AS customInstructions, disallowed_topics AS disallowedTopics, welcome_message AS welcomeMessage, preferred_model AS preferredModel, updated_at AS updatedAt FROM chatbot_settings WHERE id = 1');
        const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        const isEnabled = row && (row.is_enabled === 1 || row.is_enabled === true || String(row.is_enabled).trim() === '1');
        res.json({
            isEnabled: Boolean(isEnabled),
            customInstructions: row?.customInstructions ?? '',
            disallowedTopics: row?.disallowedTopics ?? '',
            welcomeMessage: row?.welcomeMessage ?? '',
            preferredModel: row?.preferredModel ?? '',
            updatedAt: row?.updatedAt ?? null,
        });
    }
    catch (error) {
        console.error('Error fetching chatbot settings:', error);
        res.status(500).json({ error: 'Failed to fetch chatbot settings' });
    }
});
router.put('/chatbot-settings', auth_1.authenticateToken, async (req, res) => {
    try {
        await ensureChatbotSettingsTable();
        const { isEnabled, customInstructions, disallowedTopics, welcomeMessage, preferredModel } = req.body;
        const isEnabledNum = isEnabled === true || isEnabled === 1 || isEnabled === '1' ? 1 : 0;
        const preferredModelVal = typeof preferredModel === 'string' && preferredModel.trim() ? preferredModel.trim() : null;
        await pool.execute(`INSERT INTO chatbot_settings (id, is_enabled, custom_instructions, disallowed_topics, welcome_message, preferred_model, updated_at)
       VALUES (1, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE
         is_enabled = VALUES(is_enabled),
         custom_instructions = VALUES(custom_instructions),
         disallowed_topics = VALUES(disallowed_topics),
         welcome_message = VALUES(welcome_message),
         preferred_model = VALUES(preferred_model),
         updated_at = CURRENT_TIMESTAMP`, [isEnabledNum, customInstructions ?? null, disallowedTopics ?? null, welcomeMessage ?? null, preferredModelVal]);
        res.json({
            message: 'Chatbot settings updated successfully',
            isEnabled: isEnabledNum === 1,
        });
    }
    catch (error) {
        console.error('Error updating chatbot settings:', error);
        res.status(500).json({ error: 'Failed to update chatbot settings' });
    }
});
router.get('/smtp-settings', auth_1.authenticateToken, async (req, res) => {
    try {
        const data = await (0, smtpConfigStore_1.getSmtpSettingsForAdmin)();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching SMTP settings:', error);
        res.status(500).json({ error: 'Failed to fetch SMTP settings' });
    }
});
router.put('/smtp-settings', auth_1.authenticateToken, async (req, res) => {
    try {
        const { emailUser, appPassword, clearAppPassword } = req.body;
        const clear = clearAppPassword === true ||
            clearAppPassword === 1 ||
            (typeof clearAppPassword === 'string' && clearAppPassword.toLowerCase() === 'true');
        await (0, smtpConfigStore_1.saveSmtpSettings)({
            emailUser: typeof emailUser === 'string' ? emailUser : '',
            appPassword: appPassword !== undefined ? String(appPassword) : undefined,
            clearAppPassword: clear,
        });
        const data = await (0, smtpConfigStore_1.getSmtpSettingsForAdmin)();
        res.json({ message: 'SMTP settings saved', ...data });
    }
    catch (error) {
        console.error('Error saving SMTP settings:', error);
        res.status(500).json({ error: error?.message || 'Failed to save SMTP settings' });
    }
});
router.post('/smtp-settings/test', auth_1.authenticateToken, async (req, res) => {
    try {
        const { to } = req.body;
        const addr = typeof to === 'string' && to.trim() ? to.trim() : undefined;
        if (!addr) {
            return res.status(400).json({ error: 'Provide a "to" email address for the test message' });
        }
        await (0, email_1.sendSmtpTestEmail)(addr);
        res.json({ message: `Test email sent to ${addr}` });
    }
    catch (error) {
        console.error('SMTP test failed:', error);
        res.status(400).json({ error: error?.message || 'Failed to send test email' });
    }
});
router.get('/chatbot-settings/diagnostics', auth_1.authenticateToken, async (req, res) => {
    try {
        await ensureChatbotSettingsTable();
        const [rows] = await pool.execute('SELECT is_enabled, is_enabled AS enabled FROM chatbot_settings WHERE id = 1');
        const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
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
    }
    catch (error) {
        console.error('Chatbot diagnostics error:', error);
        res.status(500).json({
            timestamp: new Date().toISOString(),
            error: error.message,
            suggestion: 'Check backend logs and database connection.',
        });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map