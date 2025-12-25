import { useEffect, useState } from 'react';
import { ShoppingBag, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient, Product } from '../../lib/api';
import ProductCarousel from '../ui/ProductCarousel';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiClient.getFeaturedProducts();
      // Limit to 8 products for the carousel (2 full rotations of 4)
      setProducts((data || []).slice(0, 8));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 pastel-beige-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>
            Eco Totes for Every Market
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
            Premium sustainable bags designed for global commerce
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent" style={{borderColor: 'var(--beige-600)'}}></div>
          </div>
        ) : (
          <>
            {/* Product Carousel */}
            <div className="mb-12">
              <ProductCarousel 
                products={products} 
                onRequestSample={scrollToContact}
              />
            </div>

            {/* View All Products Button */}
            <div className="text-center mb-8">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg transition-all duration-300 soft-shadow group font-medium beige-border"
                style={{backgroundColor: 'var(--beige-200)', color: 'var(--text-color)', borderColor: 'var(--beige-400)'}}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-300)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-400)'}}
              >
                <span>View All Products</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 soft-shadow font-medium beige-border"
            style={{backgroundColor: 'var(--beige-100)', color: 'var(--text-color)', borderColor: 'var(--beige-300)'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-400)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-100)'; e.currentTarget.style.borderColor = 'var(--beige-300)'}}
          >
            <Download size={20} />
            <span>Download Product Catalog</span>
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 soft-shadow font-medium beige-border"
            style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)', borderColor: 'var(--beige-500)'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-400)'; e.currentTarget.style.borderColor = 'var(--beige-600)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-300)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
          >
            <ShoppingBag size={20} />
            <span>Request Samples</span>
          </button>
        </div>
      </div>
    </section>
  );
}
