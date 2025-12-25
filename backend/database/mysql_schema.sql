-- Cottoniq MySQL Database Schema
-- This script creates the complete database schema for the Cottoniq e-commerce platform

-- Create database (run this separately if needed)
-- CREATE DATABASE cottoniq_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE cottoniq_db;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    material VARCHAR(255) DEFAULT '100% GOTS-certified cotton',
    print_type VARCHAR(255) DEFAULT 'Water-based inks',
    packaging VARCHAR(255) DEFAULT 'FSC-certified hangtags and labels',
    moq VARCHAR(255) DEFAULT 'Flexible for pilot programs',
    price DECIMAL(10,2) DEFAULT 0.00,
    image_url TEXT,
    gallery_images JSON,
    specifications JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_active (is_active)
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    order_type VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_username (username)
);

-- Create content_sections table
CREATE TABLE IF NOT EXISTS content_sections (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    section_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_section_key (section_key),
    INDEX idx_is_active (is_active)
);

-- Insert default product data (only if table is empty)
INSERT IGNORE INTO products (name, category, description, image_url, is_featured, specifications) VALUES
('Classic Cotton Tote', 'Classic Cotton Totes', 'Timeless design meets sustainability. Our classic cotton tote bags are perfect for everyday use, shopping, and casual outings.', '/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (1).jpeg', TRUE, '{"dimensions": "14x16 inches", "weight": "150g", "handle_length": "24 inches", "capacity": "10L"}'),
('Branded Corporate Tote', 'Branded Corporate Totes', 'Premium custom-branded totes for corporate gifting, events, and brand promotion. Your logo, our quality craftsmanship.', '/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (2).jpeg', TRUE, '{"dimensions": "14x16 inches", "weight": "160g", "customization": "Full-color logo printing", "min_order": "100 units"}'),
('Foldable Travel Tote', 'Foldable Travel Totes', 'Compact and convenient. Folds into a small pouch for easy carrying. Perfect for travel and on-the-go lifestyle.', '/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (1).jpeg', FALSE, '{"dimensions": "15x17 inches", "folded_size": "4x5 inches", "weight": "120g", "features": "Built-in pouch"}'),
('Seasonal Gift Edition', 'Seasonal Gift Editions', 'Special edition tote bags designed for gifting. Beautiful designs that make perfect presents for any occasion.', '/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (2).jpeg', FALSE, '{"dimensions": "14x16 inches", "weight": "150g", "packaging": "Premium gift box included", "seasonal": "Holiday collection"}');

-- Insert default content sections (only if table is empty)
INSERT IGNORE INTO content_sections (section_key, title, content) VALUES
('hero', 'Homepage Hero', '{"headline": "Where intelligent design meets ethical craftsmanship", "subheadline": "Smart. Sustainable. Global.", "cta_primary": "Explore Our Totes", "cta_secondary": "Corporate Solutions"}'),
('highlights', 'Key Highlights', '{"items": ["GOTS-certified cotton", "FSC-compliant packaging", "Export-ready documentation", "Custom branding for corporate gifting"]}'),
('about_mission', 'Our Mission', '{"content": "To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready."}'),
('about_story', 'Our Story', '{"content": "Born from a passion for sustainability and global commerce, Cottoniq blends natural materials with modern branding to serve clients across continents."}'),
('certifications', 'Certifications', '{"items": ["GOTS", "FSC", "MSME & export compliance"]}');