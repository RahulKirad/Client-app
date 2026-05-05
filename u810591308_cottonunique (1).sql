-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 05, 2026 at 04:26 PM
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
('401845a4-b7c5-11f0-a83e-9c5a446d56b7', 'admin', '$2a$10$K..nJIcmVu33I8pb1CPeb.DMbB.JcjGTD33crWbO6I8wNhsEw23nC', '2025-11-02 08:23:46'),
('49f3cffc-3d75-11f1-8d18-00155d333729', 'abhishek.deolalikar@gmail.com', '$2a$10$.8cNDpC81jXzlOfV6ZTQquK6jDze8rxZKZcHV4q8zpGcDoSzMmNc6', '2026-04-21 11:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_settings`
--

CREATE TABLE IF NOT EXISTS `chatbot_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `custom_instructions` text DEFAULT NULL,
  `disallowed_topics` text DEFAULT NULL,
  `welcome_message` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `preferred_model` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


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
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT uuid(),
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
('18cedbc7-3d79-11f1-8d18-00155d333729', 'ecotote_duopack', 'EcoTote DuoPack Section', '{\"heading\":\"ECOTOTE\",\"subheading\":\"Our Competitive Edge\",\"description\":\"Introducing the EcoTote DuoPack—a revolutionary, dual-layered packaging solution specifically designed for the forward-thinking garment industry. This pack combines a lightweight, low-GSM reusable organic cotton bag with a 100% corn starch-based bioplastic bag, offering a powerful way to reduce your brand\'s carbon footprint without compromising on protection.Perfect for clothing brands, the DuoPack ensures garments stay pristine during transit in the compostable inner layer, while providing customers with a premium, multi-use cotton tote they’ll keep long after the unboxing.Sustainable Synergy: The ultimate blend of compostable protection and reusable cotton utility.Fully Customizable: Tailor the dimensions and colors of both layers to perfectly fit your garment line and brand aesthetic.Industry-Ready: An eco-conscious alternative to traditional poly-bags that enhances your brand’s sustainability credentials.Earth-First Design: Dramatically reduces single-use plastic waste from factory to front door.\",\"cta\":\"Request Quote for EcoTote DuoPack\"}', 1, '2026-04-29 12:44:27'),
('18cf1f88-3d79-11f1-8d18-00155d333729', 'products_home', 'Homepage Products Section', '{\"heading\":\"Eco Totes for Every Market\",\"subheading\":\"Premium sustainable bags designed for global commerce\",\"cta_primary\":\"View All Products\",\"cta_secondary\":\"Request Samples\"}', 1, '2026-04-21 11:56:14'),
('18cf37ec-3d79-11f1-8d18-00155d333729', 'corporate', 'Corporate Solutions Section', '{\"heading\":\"Smart Branding for Global Teams\",\"subheading\":\"Transform your corporate gifting with sustainable, custom-branded solutions\",\"cta\":\"Book a Consultation\"}', 1, '2026-04-21 11:56:14'),
('18cf5119-3d79-11f1-8d18-00155d333729', 'sustainability', 'Sustainability Section', '{\"heading\":\"More Than Just a Bag\",\"subheading\":\"Every Cottonunique product tells a story of sustainable practices and positive impact\",\"report_cta\":\"View Our Sustainability Report\"}', 1, '2026-04-21 11:56:14'),
('18cf8163-3d79-11f1-8d18-00155d333729', 'export', 'Export & Compliance Section', '{\"heading\":\"Export & Compliance\",\"subheading\":\"Seamless global delivery with complete regulatory compliance\",\"cta_primary\":\"Download Export Pack\",\"cta_secondary\":\"Talk to Our Compliance Team\"}', 1, '2026-04-21 11:56:14'),
('18cf9d71-3d79-11f1-8d18-00155d333729', 'trust_strip', 'Trust Strip', '{\"headline\":\"Certified sustainable · Trusted by businesses worldwide\",\"items\":[\"GOTS Certified\",\"FSC Compliant\",\"MSME Registered\",\"Export Ready\"]}', 1, '2026-04-21 11:56:14'),
('18cfb6e9-3d79-11f1-8d18-00155d333729', 'contact', 'Contact Section', '{\"heading\":\"Get in Touch\",\"subheading\":\"Ready to start your sustainable journey? Let\'s create something amazing together.\",\"email_primary\":\"sales@cottonunique.com \",\"email_secondary\":\"abhishek.deolalikar@gmail.com\",\"phone\":\"+919028560335\"}', 1, '2026-04-26 06:18:36'),
('34cdb083-b7a1-11f0-a83e-9c5a446d56b7', 'hero', 'Homepage Hero', '{\"headline\": \"Where intelligent design meets ethical craftsmanship\", \"subheadline\": \"Smart. Sustainable. Global.\", \"cta_primary\": \"Explore Our Totes\", \"cta_secondary\": \"Corporate Solutions\"}', 1, '2025-11-02 04:05:45'),
('34cdb2e8-b7a1-11f0-a83e-9c5a446d56b7', 'highlights', 'Key Highlights', '{\"items\": [\"GOTS-certified cotton\", \"FSC-compliant packaging\", \"Export-ready documentation\", \"Custom branding for corporate gifting\"]}', 1, '2025-11-02 04:05:45'),
('34cdb3d6-b7a1-11f0-a83e-9c5a446d56b7', 'about_mission', 'Our Mission', '{\"content\": \"To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.\"}', 1, '2025-11-02 04:05:45'),
('34cdb4fb-b7a1-11f0-a83e-9c5a446d56b7', 'about_story', 'Our Story', '{\"content\": \"Born from a passion for sustainability and global commerce, Cottonunique blends natural materials with modern branding to serve clients across continents.\"}', 1, '2025-11-02 04:05:45'),
('34cdb5e7-b7a1-11f0-a83e-9c5a446d56b7', 'certifications', 'Certifications', '{\"items\": [\"GOTS\", \"FSC\", \"MSME & export compliance\"]}', 1, '2025-11-02 04:05:45'),
('6872b605-3d79-11f1-8d18-00155d333729', 'about', 'About Us Section', '{\"heading\":\"\",\"subheading\":\"\",\"description\":\"We create beautiful, eco-friendly tote bags that meet the highest global standards. Every piece is ethically sourced, GOTS-certified, and designed for businesses and individuals who value quality and sustainability.\"}', 1, '2026-04-21 12:01:12'),
('68732629-3d79-11f1-8d18-00155d333729', 'get_in_touch', 'Get in Touch Section', '{\"heading\":\"Get in Touch\",\"subheading\":\"Ready to start your sustainable journey? Let\'s create something amazing together.\",\"cta\":\"Send Inquiry\"}', 1, '2026-04-21 11:58:27');

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
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT uuid(),
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
('4b5712ca-3f7d-11f1-96b9-375f35ebfb28', 'Live Simple Life Canvas Tote Bag', 'Classic Cotton Totes', 'A charming natural canvas tote featuring a vibrant floral print with the inspiring \"Live Simple Life\" message in an elegant script. Adorned with colorful blooms in coral, orange, and yellow tones with lush green leaves, this lightweight everyday bag pairs style with sustainability. Long shoulder straps make it perfect for shopping, the farmers market, or daily errands.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100 units', 0.00, '/uploads/product-1777189373490-662203768.png', '[\"/uploads/product-1777189373490-662203768.png\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-24 01:31:19', '2026-04-26 07:42:53'),
('50a77ccd-4134-11f1-96b9-375f35ebfb28', 'Classic Cotton Unique Bag', 'Classic Cotton Totes', 'Looking for a blend of style and utility? Our Classic Cotton Tote is the perfect eco-friendly companion for your daily essentials.\r\nTimeless Design: Features a beautiful, elegant floral effect that adds a touch of nature to any outfit.\r\nFully Tailored: Available in customised sizes to fit everything from your laptop to your farmer\'s market finds.\r\nYour Color, Your Style: Choose from a wide palette of custom colors to match your personal brand or wardrobe.\r\nDurable & Sustainable: Crafted from high-quality, breathable cotton designed for long-lasting use', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100', 100.00, '/uploads/product-1777182837220-399856790.png', '[\"/uploads/product-1777182837220-399856790.png\",\"/uploads/product-1777182837230-953513982.png\",\"/uploads/product-1777182837237-866806663.png\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":false},\"usd\":{\"amount\":0,\"enabled\":true},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-26 05:53:57', '2026-04-29 11:32:33'),
('c0e3948d-4130-11f1-96b9-375f35ebfb28', 'Eco-Friendly Cotton Tiffin Tote', 'Branded Corporate Totes', 'Carry your meals with style and conscience. This premium cotton tote is specifically designed to fit your lunch boxes securely while maintaining a sleek, professional look. Crafted from heavy-duty, sustainable fibers, it offers a durable and reusable alternative to plastic bags.\r\n\r\nProduct Highlights\r\n100% Organic Cotton: Made from GOTS-certified fiber that is gentle on the planet and built to last.\r\n\r\nSpacious & Sturdy: Reinforced stitching and a wide-base design ensure your tiffin stays upright and secure during your commute.\r\n\r\nMinimalist Aesthetic: A clean, heritage-inspired look that transitions perfectly from the office to a weekend outing.\r\n\r\nEco-Conscious Choice: Fully biodegradable and shipped in compostable packaging to reduce your environmental footprint.\r\n\r\nCare Instructions\r\nTo keep your tote looking fresh, simply spot clean with a damp cloth or hand wash in cold water and air dry.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 300.00, '/uploads/product-1777182482630-586695215.jpeg', '[\"/uploads/product-1777182482630-586695215.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 0, 1, '2026-04-26 05:28:27', '2026-04-27 15:13:04'),
('c1ba27ab-43c7-11f1-96b9-375f35ebfb28', 'Wine Bottle Holder Tote', 'Seasonal Gift Editions', 'Wine more, carry less. Say hello to your new go-to tote!\r\nEffortlessly blend style and utility with our Cotton Wine Bottle Holder Bag. Featuring a charming vineyard-inspired floral design and a modern \"Chill. Pour. Repeat.\" motif, this tote is the ultimate accessory for wine enthusiasts.Crafted from durable, premium cotton with sturdy rope handles, it’s designed to securely carry your favorite bottles with ease. Whether you’re heading to a picnic or looking for a thoughtful gifting option, this bag is as practical as it is beautiful.Customizable: Available in a variety of sizes and colors to suit your brand or personal style.Durable Design: Reinforced stitching and thick cotton material ensure longevity.Perfect for Gifting: Elevate any wine gift with this eco-friendly, reusable carrier.', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '', 0.00, '/uploads/product-1777466065287-689676259.jpeg', '[\"/uploads/product-1777466065287-689676259.jpeg\",\"/uploads/product-1777466065290-633124750.jpeg\",\"/uploads/product-1777466065291-242600700.jpeg\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":true},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 1, 1, '2026-04-29 12:34:25', '2026-04-29 12:34:25'),
('fb1268d6-4078-11f1-96b9-375f35ebfb28', 'Cotton Bag ', 'Classic Cotton Totes', 'Its new cotton bag', '100% GOTS-certified cotton', 'Water-based inks', 'FSC-certified hangtags and labels', '100', 10.00, '/uploads/product-1777102377752-533575482.png', '[\"/uploads/product-1777102377752-533575482.png\",\"/uploads/product-1777102377753-288751757.png\",\"/uploads/product-1777102377755-169633617.png\"]', '{\"pricing\":{\"inr\":{\"amount\":0,\"enabled\":false},\"usd\":{\"amount\":0,\"enabled\":false},\"eur\":{\"amount\":0,\"enabled\":false},\"gbp\":{\"amount\":0,\"enabled\":false},\"aed\":{\"amount\":0,\"enabled\":false},\"sar\":{\"amount\":0,\"enabled\":false},\"qar\":{\"amount\":0,\"enabled\":false},\"kwd\":{\"amount\":0,\"enabled\":false}}}', 1, 1, '2026-04-25 07:32:57', '2026-04-27 15:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `smtp_settings`
--

CREATE TABLE `smtp_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `email_user` varchar(255) NOT NULL DEFAULT '',
  `app_password_ciphertext` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--s
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
