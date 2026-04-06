import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Product } from '../../lib/api';

interface ProductCarouselProps {
  products: Product[];
  onRequestSample: () => void;
}

export default function ProductCarousel({ products, onRequestSample }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Show 4 products at a time on desktop, 2 on tablet, 1 on mobile
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || products.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, products.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length, itemsPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <Package className="mx-auto text-slate-400 mb-4" size={48} />
          <p className="text-slate-600">No products available</p>
        </div>
      </div>
    );
  }

  const maxIndex = Math.max(0, products.length - itemsPerView);
  const showNavigation = products.length > itemsPerView;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 shadow-lg rounded-lg p-3 transition-all duration-300 group soft-shadow beige-border"
            style={{backgroundColor: 'var(--beige-100)'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-200)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-100)'}
            aria-label="Previous products"
          >
            <ChevronLeft size={20} style={{color: 'var(--beige-700)'}} className="group-hover:opacity-80" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 shadow-lg rounded-lg p-3 transition-all duration-300 group soft-shadow beige-border"
            style={{backgroundColor: 'var(--beige-100)'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-200)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-100)'}
            aria-label="Next products"
          >
            <ChevronRight size={20} style={{color: 'var(--beige-700)'}} className="group-hover:opacity-80" />
          </button>
        </>
      )}

      {/* Products Container - Carousel */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(products.length / itemsPerView) * 100}%`
          }}
        >
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / products.length}%` }}
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[500px] flex flex-col group cursor-pointer"
                  >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={product.image_url 
                        ? (product.image_url.startsWith('http') || product.image_url.startsWith('/images') 
                            ? product.image_url 
                            : `http://localhost:3001${product.image_url}`)
                        : '/images/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Dark Gradient Overlay - Lighter by default, darker on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/85 group-hover:via-black/70 group-hover:to-transparent transition-all duration-500 pointer-events-none" 
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)'
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="relative z-10 flex flex-col h-full justify-end p-6">
                    {/* Title - Always Visible */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                      {product.name}
                    </h3>

                    {/* Description - Hidden by default, appears on hover */}
                    <div className="overflow-hidden">
                      <p className="text-white/90 text-sm sm:text-base mb-4 drop-shadow-md leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-h-0 group-hover:max-h-32">
                        {product.description}
                      </p>
                    </div>

                    {/* Info Pills - Always Visible but more prominent on hover */}
                    <div className="flex items-center gap-3 mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {/* Rating Pill */}
                      <div className="bg-gray-800/60 backdrop-blur-sm group-hover:bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-500">
                        <span className="font-bold">4.5</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          <span className="text-yellow-400/50">★</span>
                        </div>
                      </div>

                      {/* MOQ Pill */}
                      <div className="bg-gray-800/60 backdrop-blur-sm group-hover:bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-500">
                        {product.moq}
                      </div>
                    </div>

                    {/* Call to Action Button - Always Visible */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRequestSample();
                      }}
                      className="w-full btn-cta-primary"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#78350F'}}
                      onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.transform = 'translateY(-2px)';}}
                      onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; e.currentTarget.style.transform = 'translateY(0)';}}
                      aria-label="Request Sample"
                    >
                      Request Sample
                    </button>
                  </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      {showNavigation && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 beige-border ${
                index === currentIndex
                  ? 'scale-110'
                  : 'opacity-50 hover:opacity-80'
              }`}
              style={index === currentIndex ? {backgroundColor: 'var(--beige-600)', borderColor: 'var(--beige-400)'} : {backgroundColor: 'var(--beige-300)', borderColor: 'var(--beige-400)'}}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}