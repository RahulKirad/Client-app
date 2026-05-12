import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useManagedSectionContent } from '../../hooks/useManagedSectionContent';
import { resolveMediaUrl } from '../../lib/api';

const heroContentFallback = {
  headline: 'Where intelligent design meets ethical craftsmanship',
  subheadline: 'Smart. Sustainable. Global.',
  cta_primary: 'Contact Us',
  cta_secondary: 'View Products',
  slides: [
    {
      title: 'ECOTOTE DUOPACK',
      subtitle: 'Sustainable Packaging',
      description: 'Reusable Cotton Tote + Compostable Inner Bag. Plastic-free packaging for fashion brands and exporters.',
      image: '/images/banner/baner5.png',
      badge: 'Premium. Sustainable. Zero-Waste.',
    },
    {
      title: 'FLORAL ELEGANCE',
      subtitle: 'Premium Canvas Totes',
      description: 'Beautiful cream canvas tote bags featuring vibrant floral designs. Perfect blend of style and sustainability for your everyday needs.',
      image: '/images/banner/baner1.jpeg',
      badge: 'Elegant. Stylish. Sustainable.',
    },
    {
      title: 'FIND JOY',
      subtitle: 'In The Ordinary',
      description: 'Light beige canvas tote with cheerful bee design. Spread positivity and joy with our beautifully crafted, eco-friendly tote bags.',
      image: '/images/banner/baner2.jpeg',
      badge: 'Joyful. Inspiring. Eco-Friendly.',
    },
    {
      title: 'WATERCOLOR COLLECTION',
      subtitle: 'Artistic Designs',
      description: 'Stunning watercolor floral prints on premium canvas. Each tote is a work of art, combining functionality with beautiful aesthetics.',
      image: '/images/banner/baner3.jpeg',
      badge: 'Artistic. Unique. Premium.',
    },
    {
      title: 'SUNFLOWER EMBROIDERED',
      subtitle: 'Handcrafted Excellence',
      description: 'Exquisite embroidered sunflower design on natural canvas. Handcrafted with attention to detail for a truly special tote bag.',
      image: '/images/banner/baner4.jpeg',
      badge: 'Handcrafted. Detailed. Special.',
    },
  ],
};

export default function Hero() {
  const heroContent = useManagedSectionContent('hero', heroContentFallback);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = Array.isArray(heroContent.slides) && heroContent.slides.length > 0
    ? heroContent.slides
    : heroContentFallback.slides;

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <section id="home" className="relative w-full max-w-[100vw] flex flex-col overflow-hidden pt-20">
      {/* Shorter band; mobile height uses svh + caps so the image fills this box edge-to-edge */}
      <div
        className="relative isolate w-full min-h-[260px] h-[38svh] max-h-[340px] sm:min-h-[300px] sm:h-[42svh] sm:max-h-[400px] md:min-h-[320px] md:h-[46svh] md:max-h-[460px] lg:h-[min(48vh,32rem)] lg:max-h-[500px]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Full Width Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--beige-100)' }}>
              <img
                src={resolveMediaUrl(slide.image)}
                alt={`${slide.title} - ${slide.subtitle}. ${slide.description}`}
                className="block h-full w-full min-h-0 object-cover object-center"
                sizes="100vw"
                decoding="async"
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Text Content Overlay */}
            <div className="relative z-10 flex h-full min-h-0 items-center py-6 sm:py-12 md:py-16">
              <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full text-xs font-medium animate-bounce-subtle soft-shadow bg-white/90 backdrop-blur-sm">
                    <Sparkles size={14} className="animate-spin-slow" style={{color: 'var(--beige-700)'}} aria-hidden />
                    <span style={{color: 'var(--beige-700)'}}>{slide.badge}</span>
                  </div>

                  <h1 className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white drop-shadow-lg" style={{fontFamily: 'var(--heading-font)'}}>
                    {slide.title}{' '}
                    <span className="block mt-2 text-white/95">
                      {slide.subtitle}
                    </span>
                  </h1>

                  <p className="line-clamp-3 text-xs sm:text-base lg:text-lg leading-relaxed font-normal text-white/90 drop-shadow-md max-w-xl sm:line-clamp-none" style={{fontFamily: 'var(--body-font)'}}>
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 sm:gap-3 sm:pt-2">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded font-semibold text-xs sm:text-sm transition-all duration-200 bg-white text-[#78350F] hover:bg-[var(--beige-100)] shadow-lg"
                      style={{ fontFamily: 'var(--heading-font)' }}
                    >
                      {String(heroContent.cta_primary || heroContentFallback.cta_primary)}
                    </a>
                    <a
                      href="/#products"
                      className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded font-semibold text-xs sm:text-sm transition-all duration-200 border-2 border-white text-white hover:bg-white/10"
                      style={{ fontFamily: 'var(--heading-font)' }}
                    >
                      {String(heroContent.cta_secondary || heroContentFallback.cta_secondary)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 group hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} className="text-slate-900 group-hover:opacity-80" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 group hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight size={22} className="text-slate-900 group-hover:opacity-80" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 space-x-2 sm:bottom-6 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
