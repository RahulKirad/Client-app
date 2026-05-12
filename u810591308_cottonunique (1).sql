-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 12, 2026 at 05:25 AM
-- Server version: 11.8.6-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u810591308_cottonunique`
--
-- Portable import (MySQL 5.7+ / MariaDB):
--   * No DEFAULT uuid() on varchar id columns (not valid on older MySQL; INSERTs always set id).
--   * utf8mb4_general_ci instead of utf8mb4_0900_ai_ci (MySQL 8-only collation).
-- Re-import: DROP TABLE IF EXISTS below, then CREATE + INSERT as usual.

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `smtp_settings`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `inquiries`;
DROP TABLE IF EXISTS `content_sections`;
DROP TABLE IF EXISTS `chatbot_settings`;
DROP TABLE IF EXISTS `admin_users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`) VALUES
('401845a4-b7c5-11f0-a83e-9c5a446d56b7', 'admin', '$2a$10$K..nJIcmVu33I8pb1CPeb.DMbB.JcjGTD33crWbO6I8wNhsEw23nC', '2025-11-02 08:23:46'),
('49f3cffc-3d75-11f1-8d18-00155d333729', 'abhishek.deolalikar@gmail.com', '$2a$10$.8cNDpC81jXzlOfV6ZTQquK6jDze8rxZKZcHV4q8zpGcDoSzMmNc6', '2026-04-21 11:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_settings`
--

CREATE TABLE `chatbot_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `custom_instructions` text DEFAULT NULL,
  `disallowed_topics` text DEFAULT NULL,
  `welcome_message` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `preferred_model` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatbot_settings`
--

INSERT INTO `chatbot_settings` (`id`, `is_enabled`, `custom_instructions`, `disallowed_topics`, `welcome_message`, `updated_at`, `preferred_model`) VALUES
(1, 0, '', '', '', '2026-04-23 05:00:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content_sections`
--

CREATE TABLE `content_sections` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `section_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `content_sections`
--

INSERT INTO `content_sections` (`id`, `section_key`, `title`, `content`, `is_active`, `updated_at`) VALUES
('18cedbc7-3d79-11f1-8d18-00155d333729', 'ecotote_duopack', 'EcoTote DuoPack Section', '{\"heading\":\"ECOTOTE\",\"subheading\":\"Our Competitive Edge\",\"description\":\"Introducing the EcoTote DuoPack—a revolutionary, dual-layered packaging solution specifically designed for the forward-thinking garment industry. This pack combines a lightweight, low-GSM reusable organic cotton bag with a 100% corn starch-based bioplastic bag, offering a powerful way to reduce your brand\'s carbon footprint without compromising on protection.Perfect for clothing brands, the DuoPack ensures garments stay pristine during transit in the compostable inner layer, while providing customers with a premium, multi-use cotton tote they’ll keep long after the unboxing.Sustainable Synergy: The ultimate blend of compostable protection and reusable cotton utility.Fully Customizable: Tailor the dimensions and colors of both layers to perfectly fit your garment line and brand aesthetic.Industry-Ready: An eco-conscious alternative to traditional poly-bags that enhances your brand’s sustainability credentials.Earth-First Design: Dramatically reduces single-use plastic waste from factory to front door.\",\"cta\":\"Request Quote for EcoTote DuoPack\"}', 1, '2026-05-11 17:30:38'),
('18cf1f88-3d79-11f1-8d18-00155d333729', 'products_home', 'Homepage Products Section', '{\"heading\":\"Eco Totes for Every Market\",\"subheading\":\"Premium sustainable bags designed for global commerce\",\"cta_primary\":\"View All Products\",\"cta_secondary\":\"Request Samples\"}', 1, '2026-04-21 11:56:14'),
('18cf37ec-3d79-11f1-8d18-00155d333729', 'corporate', 'Corporate Solutions Section', '{\"heading\":\"Smart Branding for Global Teams\",\"subheading\":\"Transform your corporate gifting with sustainable, custom-branded solutions\",\"cta\":\"Book a Consultation\"}', 1, '2026-04-21 11:56:14'),
('18cf5119-3d79-11f1-8d18-00155d333729', 'sustainability', 'Sustainability Section', '{\"heading\":\"More Than Just a Bag\",\"subheading\":\"Every Cottonunique product tells a story of sustainable practices and positive impact\",\"report_cta\":\"View Our Sustainability Report\"}', 1, '2026-04-21 11:56:14'),
('18cf8163-3d79-11f1-8d18-00155d333729', 'export', 'Export & Compliance Section', '{\"heading\":\"Export & Compliance\",\"subheading\":\"Seamless global delivery with complete regulatory compliance\",\"cta_primary\":\"Download Export Pack\",\"cta_secondary\":\"Talk to Our Compliance Team\"}', 1, '2026-04-21 11:56:14'),
('18cf9d71-3d79-11f1-8d18-00155d333729', 'trust_strip', 'Trust Strip', '{\"headline\":\"Certified sustainable · Trusted by businesses worldwide\",\"items\":[\"GOTS Certified\",\"FSC Compliant\",\"MSME Registered\",\"Export Ready\"]}', 1, '2026-04-21 11:56:14'),
('18cfb6e9-3d79-11f1-8d18-00155d333729', 'contact', 'Contact Section', '{\"heading\":\"Get in Touch\",\"subheading\":\"Ready to start your sustainable journey? Let\'s create something amazing together.\",\"email_primary\":\"sales@cottonunique.com \",\"email_secondary\":\"abhishek.deolalikar@gmail.com\",\"phone\":\"+919028560335\"}', 1, '2026-05-11 17:32:12'),
('34cdb083-b7a1-11f0-a83e-9c5a446d56b7', 'hero', 'Homepage Hero', '{\"headline\":\"Where intelligent design meets ethical craftsmanship\",\"subheadline\":\"Smart. Sustainable. Global.\",\"cta_primary\":\"Explore Our Totes\",\"cta_secondary\":\"Corporate Solutions\",\"slides\":[]}', 1, '2026-05-11 17:30:53'),
('34cdb2e8-b7a1-11f0-a83e-9c5a446d56b7', 'highlights', 'Key Highlights', '{\"items\": [\"GOTS-certified cotton\", \"FSC-compliant packaging\", \"Export-ready documentation\", \"Custom branding for corporate gifting\"]}', 1, '2025-11-02 04:05:45'),
('34cdb3d6-b7a1-11f0-a83e-9c5a446d56b7', 'about_mission', 'Our Mission', '{\"content\": \"To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.\"}', 1, '2025-11-02 04:05:45'),
('34cdb4fb-b7a1-11f0-a83e-9c5a446d56b7', 'about_story', 'Our Story', '{\"content\": \"Born from a passion for sustainability and global commerce, Cottonunique blends natural materials with modern branding to serve clients across continents.\"}', 1, '2025-11-02 04:05:45'),
('34cdb5e7-b7a1-11f0-a83e-9c5a446d56b7', 'certifications', 'Certifications', '{\"items\": [\"GOTS\", \"FSC\", \"MSME & export compliance\"]}', 1, '2025-11-02 04:05:45'),
('6872b605-3d79-11f1-8d18-00155d333729', 'about', 'About Us Section', '{\"heading\":\"\",\"subheading\":\"\",\"description\":\"We create beautiful, eco-friendly tote bags that meet the highest global standards. Every piece is ethically sourced, GOTS-certified, and designed for businesses and individuals who value quality and sustainability.\"}', 1, '2026-04-21 12:01:12'),
('68732629-3d79-11f1-8d18-00155d333729', 'get_in_touch', 'Get in Touch Section', '{\"heading\":\"Get in Touch\",\"subheading\":\"Ready to start your sustainable journey? Let\'s create something amazing together.\",\"cta\":\"Send Inquiry\"}', 1, '2026-05-11 17:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `order_type` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(50) DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `name`, `company`, `email`, `region`, `order_type`, `message`, `status`, `created_at`) VALUES
('0823d6b8-408e-11f1-96b9-375f35ebfb28', 'Shilpa Kirad', 'Test', 'shilpakirad@gmail.com', 'EU', 'bulk', 'Bags in Bulk with company logo', 'contacted', '2026-04-25 10:03:39'),
('1ffb1bcf-3ed5-11f1-8d18-00155d333729', 'Rahul Kirad', 'Test', 'rahulkirad.byline@gmail.com', 'US', 'sample', 'Test TEst Test TEst Test TEst Stuck on something in Moodle/Kodeit? Post your question here (with a screenshot if you can).\nStuck on something in Moodle/Kodeit? Post your question here (with a screenshot if you can).\n\n\n', 'completed', '2026-04-23 05:27:31'),
('6077a975-3ed2-11f1-8d18-00155d333729', 'Rahul Kirad', 'Rahul kirad ', 'rahulkirad.byline@gmail.com', '', 'sample', 'Test ghghghghhggggggggggggggggggggggggg', 'new', '2026-04-23 05:07:50'),
('c3d48cba-4135-11f1-96b9-375f35ebfb28', 'TTK BGHJ', 'axcv ', 'ttkl@gmail.co', '', 'bulk', 'bhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpw\nbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpwbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpw \nbhjbhjbn  hbsdkjasbdak sbakshauhiah cbnbjsdhisdh mcbjzcbsdh zxbczkjha sjcsahsoajxlnk ajzcbhjhagciuasdha zxhbzkjxuhaius jzxbzjhsais jcbcjhsdaihxlKXN mxbshdaiuxhkZNXlKXJ bxjhsbxaxh sbakdaksnxkX mbcxjhablaxak n cjahsbvljabakXN msaxbakjsdakbxn jvdjasdjbcjkshdkan  jadbalkdaklb c ajadsagdlia jzbjahgdsaidhakx navsdjasydgaudg navajhdgaudgal jasgaiuhgaiakjbc nncdvasduagdakdjbxca acjahsdadgakj cjavjadlajdg nadajdvajdgajl ajsahsaddgad jadhadsga jashdadgaiudf sbddbjagdiadga jahdgaisdhai jasdbagdald jadgagdia jsbisdgfisph jsdfsgoiwgf sgdisgew dfugeowfg sdgusegw8 hsvdusfduwog hsvduwgfeow hasdvuefou hvduegou hsdvsufougfwg ksdlaidgiwe sdsgiwfge sjbbdfwgefowi cagiwgfiwf cksgfwofgwfgc jsgbiwgwphw cjbwgioww9c jsbiwwy9ewyc sgiwwc jsbiwgeweg8w cugfwgewof cv ugweifgw9 uegfwgfwo8f  ufguwegfwf suwgowgfowhf gfiwfgho bsihfihiwfhowfh jscbiiwhfh eiwgiw jfbifgiwgwi bccifiwhfwhwf iwhfwheiwehf bigiwefwyhef jsbbiwhefwhfpw sbdiwfhwifwp jcbksdhfihfire jsbdigfiwhhgiwe sdbigfisgfifh jbsgisohdsphcos bbdigfiphskcbbvsygf jxvsdghczkcbsjvdfouws jxv ufgisffhozcnxcbvjhdfvwuo  sgfefgiahdlbcjhvsd vugfiuesh jvsuygoishszhcjvbji vjfgwsihcnkvb vfugishckcbbvs vuygfihoajkbchvyu fgifgishlnzcbv hfguwfgiahlanckab svugiwsfowjocdi jsugfwiefwock sjdusfgidbckj c jsvsjgishfosh vbvsjgiwgah jsdbswfgwifpw svswgfwogwp vsfgwigpwhwfh j sf;iwhfeowhef kb kshiwhfpw bsgiefhwpfo jbsgfiwogwif jgfwgfwihpw', 'new', '2026-04-26 06:04:19'),
('c5971947-3ede-11f1-96b9-375f35ebfb28', 'Test ', 'test', 'rahulkirad.byline@gmail.com', 'India', 'bulk', 'Failed to send inquiry email: Error: Invalid login: 535-5.7.8 Username and Password not accepted. For more information, go to\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-82f8ebbcfd7sm23850472b3a.32 - gsmtp\n    at SMTPConnection._formatError (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:912:19)  \n    at SMTPConnection._actionAUTHComplete (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:1722:34)\n    at SMTPConnection.<anonymous> (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:651:26)   \n    at SMTPConnection._processResponse (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:1098:20)\n    at SMTPConnection._onData (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:872:14)       \n    at TLSSocket.SMTPConnection._onSocketData (C:\\Users\\ADMIN\\Desktop\\Client-app\\backend\\node_modules\\nodemailer\\lib\\smtp-connection\\index.js:196:44)\n    at TLSSocket.emit (node:events:518:28)\n    at TLSSocket.emit (node:domain:489:12)\n    at addChunk (node:internal/streams/readable:561:12)\n    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3) {\n  code: \'EAUTH\',\n  response: \'535-5.7.8 Username and Password not accepted. For more information, go to\\n\' +\n    \'535 5.7.8  https://support.google.com/mail/?p=BadCredentials d2e1a72fcca58-82f8ebbcfd7sm23850472b3a.32 - gsmtp\',\n  responseCode: 535,\n  command: \'AUTH PLAIN\'\n}', 'new', '2026-04-23 06:36:34'),
('f49ac2c8-4134-11f1-96b9-375f35ebfb28', 'Pooja K', 'ABC Corp', 'prk11@gail.com', 'ME', 'inquiry', 'premium cotton tote is specifically designed to fit your lunch boxes securely while maintaining a sleek, professional look. Crafted from heavy-duty, sustainable fibers, it offers a durable and reusable alternative to plastic', 'new', '2026-04-26 05:58:32');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `material` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '100% GOTS-certified cotton',
  `print_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Water-based inks',
  `packaging` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'FSC-certified hangtags and labels',
  `moq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Flexible for pilot programs',
  `price` decimal(10,2) DEFAULT 0.00,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `material`, `print_type`, `packaging`, `moq`, `price`, `image_url`, `gallery_images`, `specifications`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
('012a0ef2-4a39-11f1-96b9-375f35ebfb28', 'The Cottonunique Signature Black', 'Branded Corporate Totes', 'This sleek, professional black tote is the perfect canvas for your brand’s commitment to the planet. Designed for durability and style, it features a high-contrast print that highlights the core values of the circular economy.\r\n\r\nProduct Highlights\r\nPremium Aesthetic: Deep black heavy-duty cotton for a sophisticated, modern look.\r\n\r\nEco-Messaging: Pre-printed with \"REDUCE REUSE RECYCLE REPEAT\" to inspire sustainable habits.\r\n\r\nCottonunique Branding: Features our signature organic cotton seal of quality.\r\n\r\nSpacious Design: Wide-gusset bottom provides extra room for groceries, gym gear, or daily essentials.\r\n\r\nReinforced Comfort: Long, sturdy handles designed for comfortable over-the-shoulder carrying.\r\n\r\n🌿 Make a bold statement with a bag that gives back.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778174567859-54816086.jpeg', '[\"/uploads/product-1778174567859-54816086.jpeg\",\"/uploads/product-1778174567859-884372886.jpeg\",\"/uploads/product-1778174567859-7090202.jpeg\"]', '{}', 1, 1, '2026-05-07 17:20:11', '2026-05-07 18:20:48'),
('09959f52-4a3f-11f1-96b9-375f35ebfb28', 'The Cuvée Cotton Pouch', 'Seasonal Gift Editions', 'Elevate your gifting with our premium 100% organic cotton wine tote. Designed for those who appreciate both fine vintages and sustainable luxury, this bag offers a sophisticated alternative to single-use packaging.\r\n\r\nProduct Features\r\nSuperior Protection: Heavy-weight canvas ensures bottles are cradled securely.\r\n\r\nEco-Refined: GOTS-certified cotton that aligns with a high-end, conscious lifestyle.\r\n\r\nTailored Fit: Perfectly dimensioned for standard wine, champagne, or artisanal spirit bottles.\r\n\r\nSignature Details: Features reinforced stitching and elegant, comfortable handles for effortless carrying.\r\n\r\nGift-Ready Canvas: A clean, minimalist aesthetic that serves as a premium reusable gift bag.\r\n\r\n🍷 The gold standard for sustainable gifting.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778177002905-306898339.png', '[\"/uploads/product-1778177002905-306898339.png\",\"/uploads/product-1778177002917-124275521.png\",\"/uploads/product-1778177002929-560264095.png\"]', '{}', 0, 1, '2026-05-07 18:03:22', '2026-05-07 18:15:53'),
('15b4b8ea-4a3a-11f1-96b9-375f35ebfb28', 'The Coral Earth Messenger', 'Classic Cotton Totes', 'Make a bold statement for the planet with this vibrant, coral-pink tote. Combining a pop of modern color with a timeless environmental message, this bag is designed for those who want their sustainable choices to stand out.\r\n\r\nProduct Highlights\r\nEye-Catching Color: A bright, energetic coral hue that adds a fresh look to your daily essentials.\r\n\r\nEco-Conscious Graphic: Features a \"Go Green Save Planet\" tree-and-globe emblem in contrasting forest green.\r\n\r\nLightweight & Durable: Made from high-quality cotton canvas that is easy to fold and carry but strong enough for heavy loads.\r\n\r\nOptimized Space: Side gussets provide extra depth, making it ideal for books, groceries, or a change of clothes.\r\n\r\nSeamless Finish: Tonal stitching and reinforced handles ensure a clean, premium look from every angle.\r\n\r\n🌍 Carry the message, change the world.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778174875790-678946400.jpeg', '[\"/uploads/product-1778174875790-678946400.jpeg\",\"/uploads/product-1778174875790-337843636.jpeg\",\"/uploads/product-1778174875790-457026787.jpeg\"]', '{}', 0, 1, '2026-05-07 17:27:55', '2026-05-07 18:17:55'),
('4b5712ca-3f7d-11f1-96b9-375f35ebfb28', 'Live Simple Life Canvas Tote Bag', 'Classic Cotton Totes', 'This botanical tote combines delicate floral artistry with heavy-duty construction for a bag that is as reliable as it is beautiful. The \"Live Simple Life\" design is framed by a vibrant autumnal bouquet, making it an elegant accessory for any season.\r\n\r\nProduct Highlights\r\nArtisanal Floral Print: High-definition, multi-color botanical wreath featuring warm lilies and roses.\r\n\r\nSuperior Durability: Close-up details showcase reinforced cross-stitching at the handles for maximum weight support.\r\n\r\nExpert Finish: Neat, flat-felled side seams (visible in detail) ensure a snag-free interior and long-lasting wear.\r\n\r\nGenerous Capacity: The wide-open interior provides plenty of space for everything from farmers\' market finds to daily essentials.\r\n\r\nNatural Texture: Crafted from premium, unbleached cream cotton canvas for a soft, organic feel.\r\n\r\n🌸 Strength meets simplicity in every stitch.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100 units', 0.00, '/uploads/product-1778172829923-718655347.jpeg', '[\"/uploads/product-1778172829923-718655347.jpeg\",\"/uploads/product-1778172829924-715396588.jpeg\",\"/uploads/product-1778172829924-695844972.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-24 01:31:19', '2026-05-07 18:27:06'),
('50a77ccd-4134-11f1-96b9-375f35ebfb28', 'Classic Cotton Unique Bag', 'Classic Cotton Totes', 'This minimalist tote serves as a beautiful reminder to lead with love and embrace simplicity. Crafted from ultra-clean, off-white organic cotton, it balances a bold graphic statement with the high-quality construction your daily routine deserves.\r\n\r\nProduct Highlights \r\nHeartfelt Design: Features a vibrant red heart with \"Love\" script and a \"Live Simple Life\" call-to-action.\r\n\r\nBright White Canvas: A crisp, premium finish that makes the graphic colors pop.Cottonunique Quality: Adorned with our official organic cotton seal for guaranteed sustainability.\r\n\r\nEveryday Utility: Lightweight yet strong, perfect for errands, a gym change, or carrying your favorite books.\r\n\r\nSustainable Choice: 100% biodegradable and GOTS-aligned to support a circular lifestyle.\r\n\r\n❤️ Wear your values on your shoulder.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100', 100.00, '/uploads/product-1778172244153-152750348.jpeg', '[\"/uploads/product-1778172244153-152750348.jpeg\",\"/uploads/product-1778172244154-175997833.jpeg\",\"/uploads/product-1778172244155-777166104.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":false},\"usd\":{\"amount\":0,\"enabled\":true},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-26 05:53:57', '2026-05-07 18:24:02'),
('544db0b6-4a38-11f1-96b9-375f35ebfb28', 'EcoTote DuoPack', 'EcoTote DuoPack', 'Ecotote Duo is the ultimate sustainable shipping solution for fashion e-commerce. We’ve redesigned garment packaging by replacing wasteful plastic and paper with a high-performance, dual-layer system that prioritizes both the planet and your brand’s premium feel.\r\n\r\nThe Duo Advantage\r\nDual-Layer Protection: Lightweight, low-GSM cotton outer bag paired with a corn-based compostable inner liner.\r\n\r\nEco-Replacement: Designed specifically to eliminate single-use plastic and paper in garment shipping.\r\n\r\nBrand Ready: Full-surface printing available for high-visibility company logos.\r\n\r\nReusable & Giftable: An attractive, functional bag that customers will keep and use long after delivery.\r\n\r\nCustom Specs: Available in multiple styles, colors, and dimensions to fit everything from lingerie to heavy outerwear.\r\n\r\n🌱 Unbox sustainability with every order.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778174121815-974601607.jpeg', '[\"/uploads/product-1778174121815-974601607.jpeg\",\"/uploads/product-1778174121816-526230527.jpeg\",\"/uploads/product-1778174121816-322241089.jpeg\"]', '{}', 1, 1, '2026-05-07 17:15:21', '2026-05-07 18:21:48'),
('bbfb479d-4a39-11f1-96b9-375f35ebfb28', 'The Sommelier’s Social Tote', 'Organized Living Series', 'This versatile canvas tote is the ultimate companion for wine lovers and organized shoppers alike. Combining a charming aesthetic with high-function interior dividers, it’s designed to keep your bottles safe and your essentials upright while making a beautiful, eco-friendly statement.\r\n\r\nKey Features\r\nSmart Internal Dividers: Features six dedicated pockets to securely hold wine bottles, jars, or baguettes.\r\n\r\nWhimsical Graphic Design: Adorned with heart and vine motifs, featuring the \"Live Simple Life\" and \"Simply Celebrate Life\" slogans.\r\n\r\nPremium Natural Canvas: Crafted from durable, eco-friendly off-white cotton for a clean and classic look.\r\n\r\nDecorative Straps: Includes intricately patterned handles that add a touch of boutique elegance to your carry.\r\n\r\nSpacious & Structured: A wide side profile and flat bottom ensure the bag stays stable even when fully loaded.\r\n\r\n🍷 The perfect blend of organization and celebration.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778174725256-149996373.jpeg', '[\"/uploads/product-1778174725256-149996373.jpeg\",\"/uploads/product-1778174725257-718646355.jpeg\",\"/uploads/product-1778174725257-161334362.jpeg\"]', '{}', 0, 1, '2026-05-07 17:25:25', '2026-05-07 18:18:59'),
('c0e3948d-4130-11f1-96b9-375f35ebfb28', 'Eco-Friendly Cotton Tiffin Tote', 'Branded Corporate Totes', 'Carry your meals with style and conscience. This premium cotton tote is specifically designed to fit your lunch boxes securely while maintaining a sleek, professional look. Crafted from heavy-duty, sustainable fibers, it offers a durable and reusable alternative to plastic bags.\r\n\r\nProduct Highlights\r\n100% Organic Cotton: Made from GOTS-certified fiber that is gentle on the planet and built to last.\r\n\r\nSpacious & Sturdy: Reinforced stitching and a wide-base design ensure your tiffin stays upright and secure during your commute.\r\n\r\nMinimalist Aesthetic: A clean, heritage-inspired look that transitions perfectly from the office to a weekend outing.\r\n\r\nEco-Conscious Choice: Fully biodegradable and shipped in compostable packaging to reduce your environmental footprint.\r\n\r\nCare Instructions\r\nTo keep your tote looking fresh, simply spot clean with a damp cloth or hand wash in cold water and air dry.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 300.00, '/uploads/product-1778173207434-905483471.png', '[\"/uploads/product-1778173207434-905483471.png\",\"/uploads/product-1778173207469-964998560.png\",\"/uploads/product-1778173207492-989054433.png\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-26 05:28:27', '2026-05-07 18:24:26'),
('c1ba27ab-43c7-11f1-96b9-375f35ebfb28', 'The Vintner’s Reserve Tote', 'Seasonal Gift Editions', 'his artisanal wine tote is the ultimate fusion of rustic charm and high-end functionality. Designed for the discerning host, it features a unique external holster and a playful, vineyard-inspired design that makes it an instant conversation starter at any gathering.\r\n\r\nProduct Highlights\r\nIntegrated Wine Holster: Features a dedicated external pocket for quick access to your favorite vintage.\r\n\r\nNautical Rope Handles: Heavy-duty, soft-grip cotton rope handles provide a comfortable carry and a premium, coastal-chic aesthetic.\r\n\r\nStorybook Illustration: Beautifully detailed grape vine and vineyard graphics with the \"CHILL. POUR. REPEAT.\" motto.\r\n\r\nDual-Bottle Capacity: Securely holds one bottle in the outer sleeve while leaving ample room for a second bottle or snacks inside.\r\n\r\nReinforced Structure: Crafted from heavyweight, natural cotton canvas to ensure your bottles remain upright and safe.\r\n\r\n🍷 Your favorite vintage deserves a better journey.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778172164780-210056399.jpeg', '[\"/uploads/product-1778172164780-210056399.jpeg\",\"/uploads/product-1778172164782-197883147.jpeg\",\"/uploads/product-1778172164782-869645220.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 1, 1, '2026-04-29 12:34:25', '2026-05-07 18:23:43'),
('dc3b3447-4a36-11f1-96b9-375f35ebfb28', 'Corporate Tote Bag', 'Branded Corporate Totes', 'Upgrade your brand with premium, GOTS-certified organic cotton tote bags designed for the modern enterprise. We combine professional-grade durability with a deep commitment to environmental responsibility, helping your company make a lasting impression without leaving a footprint.\r\n\r\nCorporate Solutions\r\nGOTS Certified: 100% organic cotton meeting the highest global standards.\r\n\r\nCustom Branding: High-fidelity logo printing and embroidery options.\r\n\r\nScaleable Sizes: From small event gift bags to large commuter totes.\r\n\r\nProfessional Palette: Diverse colors to perfectly align with your brand identity.\r\n\r\nEthical Sourcing: Fully sustainable supply chain for your CSR goals.\r\n\r\n🏢 The sustainable choice for events, gifting, and retail.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778173490871-855672695.jpeg', '[\"/uploads/product-1778173490871-855672695.jpeg\",\"/uploads/product-1778173490872-809486975.jpeg\",\"/uploads/product-1778173490872-889959570.jpeg\"]', '{}', 1, 1, '2026-05-07 17:04:50', '2026-05-07 18:22:49'),
('ed5b4796-4a3c-11f1-96b9-375f35ebfb28', 'The Nomad Luxe Tote', 'Foldable Travel Totes', 'This sophisticated tote blends rugged durability with a high-end aesthetic, making it the perfect professional companion. Featuring a heavy-duty canvas body paired with a reinforced base, it transitions seamlessly from the office to a weekend getaway while maintaining its structured, premium look.\r\n\r\nProduct Highlights\r\nMixed-Material Design: Durable cream cotton canvas accented with a rich, vegan leather-style base and handles.\r\n\r\nReinforced Bottom: The sturdy brown base provides extra protection and ensures the bag stands upright when set down.\r\n\r\nFoldable & Travel-Ready: Despite its structured appearance, the soft canvas allows it to fold flat for easy storage or packing.\r\n\r\nComfortable Carry: Dual-layered handles are stitched for maximum strength and a comfortable grip over the shoulder or in hand.\r\n\r\nSubtle Branding: Features a matching embossed patch for a clean, minimalist professional finish.\r\n\r\n💼 The intersection of rugged utility and refined style.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1778176096572-608039823.png', '[\"/uploads/product-1778176096572-608039823.png\",\"/uploads/product-1778176096578-85463998.png\",\"/uploads/product-1778176096582-650161881.png\"]', '{}', 0, 1, '2026-05-07 17:48:16', '2026-05-07 18:16:52'),
('fb1268d6-4078-11f1-96b9-375f35ebfb28', 'Classic Cotton Tote Bag ', 'Classic Cotton Totes', 'Elevate your daily carry with our premium collection of 100% organic cotton tote bags. Designed for the conscious shopper, our bags blend timeless style with modern sustainability to help you ditch single-use plastics for good.\r\n\r\nWhy Choose Our Totes?\r\nEco-Friendly: Made from sustainably sourced, biodegradable cotton.\r\n\r\nVersatile Styles: From classic shoppers to trendy over-the-shoulder designs.\r\n\r\nVibrant Palette: Available in a wide spectrum of colors to match any outfit.\r\n\r\nTailored Fit: Choose from multiple sizes or request a custom dimension.\r\n\r\nBuilt to Last: Reinforced stitching and heavy-duty fabric for maximum durability.\r\n\r\n💡 Sustainable living never looked this good.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100', 10.00, '/uploads/product-1778172801470-750442093.jpeg', '[\"/uploads/product-1778172801470-750442093.jpeg\",\"/uploads/product-1778172801470-536580067.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":false},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-25 07:32:57', '2026-05-07 18:27:27');

-- --------------------------------------------------------

--
-- Table structure for table `smtp_settings`
--

CREATE TABLE `smtp_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `email_user` varchar(255) NOT NULL DEFAULT '',
  `app_password_ciphertext` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `smtp_settings`
--

INSERT INTO `smtp_settings` (`id`, `email_user`, `app_password_ciphertext`, `updated_at`) VALUES
(1, 'rahulkirad.byline@gmail.com', 'ysDqXG5K80luZYsrohRyLw==.UPTk6cCcoumTf86MuUT2Aw==.Bd5uOAXkxPMyE0uzkRgYMaWauA==', '2026-04-23 05:24:55');

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
-- Indexes for table `chatbot_settings`
--
ALTER TABLE `chatbot_settings`
  ADD PRIMARY KEY (`id`);

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

--
-- Indexes for table `smtp_settings`
--
ALTER TABLE `smtp_settings`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
