import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Package, ShoppingBag } from 'lucide-react';
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

      {/* Products Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(products.length / itemsPerView) * 100}%`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / products.length}%` }}
            >
              <div className="rounded-lg overflow-hidden soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
                <div className="relative h-64 overflow-hidden group" style={{backgroundColor: 'var(--beige-200)'}}>
                  <img
                    src={product.image_url ? `http://localhost:3001${product.image_url}` : '/images/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.is_featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wide beige-border soft-shadow" style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)'}}>
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>{product.name}</h3>
                  <p className="text-sm mb-4 line-clamp-2 font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>{product.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm" style={{color: 'var(--text-color)'}}>
                      <Package size={16} className="mr-2" style={{color: 'var(--beige-700)'}} />
                      <span className="font-medium">{product.material}</span>
                    </div>
                    {product.specifications?.dimensions && (
                      <div className="flex items-center text-sm" style={{color: 'var(--text-color)'}}>
                        <ShoppingBag size={16} className="mr-2" style={{color: 'var(--beige-700)'}} />
                        <span className="font-medium">{product.specifications.dimensions}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t-2 pt-4 beige-border" style={{borderColor: 'var(--beige-300)'}}>
                    <p className="text-xs mb-3 font-medium" style={{color: 'var(--text-color)'}}>
                      <span className="font-bold">MOQ:</span> {product.moq}
                    </p>
                    <button
                      onClick={onRequestSample}
                      className="w-full py-2.5 rounded-lg transition-all duration-300 font-bold uppercase tracking-wide soft-shadow beige-border"
                      style={{backgroundColor: 'var(--beige-200)', color: 'var(--text-color)', borderColor: 'var(--beige-400)'}}
                      onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-300)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                      onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-400)'}}
                    >
                      Request Sample
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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