# 🔐 Cottoniq Admin Panel - Complete Guide

## Overview

A comprehensive admin panel has been created for managing your Cottoniq e-commerce platform with full authentication, product management, and content control.

## 🚀 Current Status

✅ **Backend API**: Running with admin routes  
✅ **Frontend Admin**: Complete admin interface  
✅ **Authentication**: JWT-based login system  
✅ **Database**: Updated with admin users table  
✅ **File Upload**: Image upload for products  

## 🔑 Access Information

### Admin Panel URL
**http://localhost:5173/admin**

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin`

*Note: The system will create the default admin user on first login*

## 🎛️ Admin Features

### 1. Dashboard
- **Overview Statistics**: Products, inquiries, featured items
- **Quick Actions**: Direct links to management sections
- **Real-time Data**: Live counts and status updates

### 2. Products Management
- ✅ **View All Products**: Complete product catalog
- ✅ **Add New Products**: Create products with images
- ✅ **Edit Products**: Update details, prices, specifications
- ✅ **Delete Products**: Remove products from catalog
- ✅ **Image Upload**: Upload product images (5MB limit)
- ✅ **Featured Products**: Mark products as featured
- ✅ **Categories**: Organize by product categories
- ✅ **Specifications**: JSON-based flexible specifications

### 3. Inquiries Management
- ✅ **View All Inquiries**: Customer contact submissions
- ✅ **Status Management**: New → Contacted → Completed
- ✅ **Filter by Status**: Quick filtering options
- ✅ **Detailed View**: Full inquiry information
- ✅ **Contact Information**: Direct email links
- ✅ **Order Type Tracking**: Sample, bulk, custom orders

### 4. Content Management
- ✅ **Dynamic Content**: Edit website sections
- ✅ **Hero Section**: Homepage banner content
- ✅ **About Sections**: Mission, story, certifications
- ✅ **Highlights**: Key feature lists
- ✅ **JSON Editor**: Flexible content structure
- ✅ **Active/Inactive**: Toggle content visibility

## 🛠️ Technical Implementation

### Backend Features
- **JWT Authentication**: Secure token-based auth
- **File Upload**: Multer for image handling
- **Rate Limiting**: API protection
- **CORS Configuration**: Frontend integration
- **MySQL Integration**: Full database operations
- **Error Handling**: Comprehensive error responses

### Frontend Features
- **React Router**: Multi-page admin interface
- **Context API**: Global authentication state
- **Axios Integration**: API communication
- **Responsive Design**: Mobile-friendly admin panel
- **Form Validation**: Input validation and error handling
- **File Upload UI**: Drag-and-drop image uploads

## 📁 File Structure

```
backend/
├── src/
│   ├── middleware/
│   │   └── auth.ts              # JWT authentication
│   ├── routes/
│   │   └── admin.ts             # Admin API routes
│   └── index.ts                 # Updated main server
├── uploads/                     # Product images storage
└── database/
    └── mysql_schema.sql         # Updated with admin_users

project/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── components/admin/
│   │   ├── AdminLogin.tsx       # Login component
│   │   ├── AdminLayout.tsx      # Admin layout
│   │   ├── Dashboard.tsx        # Admin dashboard
│   │   ├── ProductsManager.tsx  # Product management
│   │   ├── InquiriesManager.tsx # Inquiry management
│   │   └── ContentManager.tsx   # Content management
│   └── pages/
│       ├── HomePage.tsx         # Public website
│       └── AdminRoutes.tsx      # Admin routing
```

## 🔐 Security Features

### Authentication
- **JWT Tokens**: 24-hour expiration
- **Secure Storage**: LocalStorage with automatic cleanup
- **Protected Routes**: Authentication required for admin
- **Password Hashing**: bcrypt for secure password storage

### API Security
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Server-side validation
- **File Upload Security**: Type and size restrictions

## 📊 Database Schema

### New Admin Users Table
```sql
CREATE TABLE admin_users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product (with image)
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Inquiries
- `GET /api/admin/inquiries` - Get all inquiries
- `PUT /api/admin/inquiries/:id` - Update inquiry status

### Content
- `GET /api/admin/content` - Get all content sections
- `PUT /api/admin/content/:id` - Update content section

### File Serving
- `GET /uploads/:filename` - Serve uploaded images

## 🎯 Usage Instructions

### 1. First Time Setup
1. Access http://localhost:5173/admin
2. Login with `admin` / `admin`
3. System creates default admin user automatically

### 2. Managing Products
1. Go to Products section
2. Click "Add Product" to create new products
3. Upload images, set categories, prices
4. Mark products as featured for homepage display
5. Edit or delete existing products

### 3. Handling Inquiries
1. View all customer inquiries in Inquiries section
2. Click on inquiry to see full details
3. Update status: New → Contacted → Completed
4. Filter by status for better organization

### 4. Updating Content
1. Go to Content section
2. Edit website sections like hero, about, highlights
3. Use JSON editor for complex content structures
4. Toggle active/inactive status

## 🔧 Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🚨 Important Notes

### Security Considerations
- **Change Default Password**: Create new admin user in production
- **JWT Secret**: Use strong secret key in production
- **File Upload**: Images stored in backend/uploads/
- **Database Access**: Admin operations require authentication

### File Upload Limits
- **Max Size**: 5MB per image
- **Allowed Types**: JPEG, JPG, PNG, GIF, WebP
- **Storage**: Local filesystem (backend/uploads/)

## 🎉 Ready to Use!

Your admin panel is fully operational with:
- ✅ Secure authentication system
- ✅ Complete product management
- ✅ Customer inquiry handling
- ✅ Dynamic content management
- ✅ Image upload capabilities
- ✅ Responsive admin interface

**Access your admin panel at: http://localhost:5173/admin**