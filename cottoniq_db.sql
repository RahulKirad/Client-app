-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2026 at 05:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cottoniq_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`) VALUES
('401845a4-b7c5-11f0-a83e-9c5a446d56b7', 'admin', '$2a$10$K..nJIcmVu33I8pb1CPeb.DMbB.JcjGTD33crWbO6I8wNhsEw23nC', '2025-11-02 08:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `content_sections`
--

CREATE TABLE `content_sections` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `section_key` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_sections`
--

INSERT INTO `content_sections` (`id`, `section_key`, `title`, `content`, `is_active`, `updated_at`) VALUES
('34cdb083-b7a1-11f0-a83e-9c5a446d56b7', 'hero', 'Homepage Hero', '{\"headline\": \"Where intelligent design meets ethical craftsmanship\", \"subheadline\": \"Smart. Sustainable. Global.\", \"cta_primary\": \"Explore Our Totes\", \"cta_secondary\": \"Corporate Solutions\"}', 1, '2025-11-02 04:05:45'),
('34cdb2e8-b7a1-11f0-a83e-9c5a446d56b7', 'highlights', 'Key Highlights', '{\"items\": [\"GOTS-certified cotton\", \"FSC-compliant packaging\", \"Export-ready documentation\", \"Custom branding for corporate gifting\"]}', 1, '2025-11-02 04:05:45'),
('34cdb3d6-b7a1-11f0-a83e-9c5a446d56b7', 'about_mission', 'Our Mission', '{\"content\": \"To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.\"}', 1, '2025-11-02 04:05:45'),
('34cdb4fb-b7a1-11f0-a83e-9c5a446d56b7', 'about_story', 'Our Story', '{\"content\": \"Born from a passion for sustainability and global commerce, Cottoniq blends natural materials with modern branding to serve clients across continents.\"}', 1, '2025-11-02 04:05:45'),
('34cdb5e7-b7a1-11f0-a83e-9c5a446d56b7', 'certifications', 'Certifications', '{\"items\": [\"GOTS\", \"FSC\", \"MSME & export compliance\"]}', 1, '2025-11-02 04:05:45');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `order_type` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(50) DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `material` varchar(255) DEFAULT '100% GOTS-certified cotton',
  `print_type` varchar(255) DEFAULT 'Water-based inks',
  `packaging` varchar(255) DEFAULT 'FSC-certified hangtags and labels',
  `moq` varchar(255) DEFAULT 'Flexible for pilot programs',
  `price` decimal(10,2) DEFAULT 0.00,
  `image_url` text DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `material`, `print_type`, `packaging`, `moq`, `price`, `image_url`, `gallery_images`, `specifications`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
('23b9ef43-c31a-11f0-a83e-9c5a446d56b7', 'test', 'Classic Cotton Totes', 'test', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', 'Flexible for pilot programs', 0.00, '/uploads/product-1763317364895-995598052.jpeg', NULL, '\"{\\\"pricing\\\":{\\\"inr\\\":{\\\"amount\\\":0,\\\"enabled\\\":true},\\\"usd\\\":{\\\"amount\\\":0,\\\"enabled\\\":false},\\\"eur\\\":{\\\"amount\\\":10,\\\"enabled\\\":true},\\\"gbp\\\":{\\\"amount\\\":0,\\\"enabled\\\":false},\\\"aed\\\":{\\\"amount\\\":0,\\\"enabled\\\":false},\\\"sar\\\":{\\\"amount\\\":0,\\\"enabled\\\":false},\\\"qar\\\":{\\\"amount\\\":0,\\\"enabled\\\":false},\\\"kwd\\\":{\\\"amount\\\":0,\\\"enabled\\\":false}}}\"', 1, 1, '2025-11-16 18:22:44', '2025-11-16 18:22:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_username` (`username`);

--
-- Indexes for table `content_sections`
--
ALTER TABLE `content_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section_key` (`section_key`),
  ADD KEY `idx_section_key` (`section_key`),
  ADD KEY `idx_is_active` (`is_active`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_is_featured` (`is_featured`),
  ADD KEY `idx_is_active` (`is_active`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
