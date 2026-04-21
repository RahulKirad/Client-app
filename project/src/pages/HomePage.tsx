import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import EcoToteDuoPack from '../components/sections/EcoToteDuoPack';
import Products from '../components/sections/Products';
import Corporate from '../components/sections/Corporate';
import Sustainability from '../components/sections/Sustainability';
import Export from '../components/sections/Export';
import TrustStrip from '../components/sections/TrustStrip';
import Contact from '../components/sections/Contact';
import ProductsPage from './ProductsPage';
import ProductDetailPage from './ProductDetailPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';

function MainPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      <Header />
      <main>
        <Hero />
        <About />
        {/* Section divider to prevent visual merging */}
        <div className="bg-white py-4 sm:py-6">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-px w-full bg-[var(--beige-300)] opacity-70" />
          </div>
        </div>
        <EcoToteDuoPack />
        <Products />
        <Corporate />
        <Sustainability />
        <Export />
        <TrustStrip />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}