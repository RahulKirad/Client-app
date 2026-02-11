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
import Contact from '../components/sections/Contact';
import ProductsPage from './ProductsPage';

function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <EcoToteDuoPack />
        <Products />
        <Corporate />
        <Sustainability />
        <Export />
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
    </Routes>
  );
}