import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "ECOTOTE DUOPACK",
      subtitle: "Sustainable Packaging",
      description: "Reusable Cotton Tote + Compostable Inner Bag. Plastic-free packaging for fashion brands and exporters.",
      image: "/images/banner/baner5.png",
      badge: "Premium. Sustainable. Zero-Waste.",
      gradient: "from-[#A7C957] to-[#6B8E23]"
    },
    {
      title: "FLORAL ELEGANCE",
      subtitle: "Premium Canvas Totes",
      description: "Beautiful cream canvas tote bags featuring vibrant floral designs. Perfect blend of style and sustainability for your everyday needs.",
      image: "/images/banner/baner1.jpeg",
      badge: "Elegant. Stylish. Sustainable.",
      gradient: "from-[#A7C957] to-[#6B8E23]"
    },
    {
      title: "FIND JOY",
      subtitle: "In The Ordinary",
      description: "Light beige canvas tote with cheerful bee design. Spread positivity and joy with our beautifully crafted, eco-friendly tote bags.",
      image: "/images/banner/baner2.jpeg",
      badge: "Joyful. Inspiring. Eco-Friendly.",
      gradient: "from-[#FFD700] to-[#FFA500]"
    },
    {
      title: "WATERCOLOR COLLECTION",
      subtitle: "Artistic Designs",
      description: "Stunning watercolor floral prints on premium canvas. Each tote is a work of art, combining functionality with beautiful aesthetics.",
      image: "/images/banner/baner3.jpeg",
      badge: "Artistic. Unique. Premium.",
      gradient: "from-[#B8E0D2] to-[#95D5C4]"
    },
    {
      title: "SUNFLOWER EMBROIDERED",
      subtitle: "Handcrafted Excellence",
      description: "Exquisite embroidered sunflower design on natural canvas. Handcrafted with attention to detail for a truly special tote bag.",
      image: "/images/banner/baner4.jpeg",
      badge: "Handcrafted. Detailed. Special.",
      gradient: "from-[#FFB4A2] to-[#FF9A85]"
    }
  ];

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
    <section id="home" className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
      {/* Carousel Container - Full Width */}
      <div 
        className="relative w-full h-[70vh] min-h-[500px] max-h-[700px]"
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
            <div className="absolute inset-0 w-full h-full overflow-hidden" style={{backgroundColor: 'var(--beige-100)'}}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  width: '100%',
                  height: '100%'
                }}
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Text Content Overlay */}
            <div className="relative z-10 h-full flex items-center py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-10">
                  <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full text-xs font-medium animate-bounce-subtle soft-shadow bg-white/90 backdrop-blur-sm">
                    <Sparkles size={14} className="animate-spin-slow" style={{color: 'var(--beige-700)'}} />
                    <span style={{color: 'var(--beige-700)'}}>{slide.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white drop-shadow-lg" style={{fontFamily: 'var(--heading-font)'}}>
                    {slide.title}{' '}
                    <span className="block mt-2 text-white/95">
                      {slide.subtitle}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg leading-relaxed font-normal text-white/90 drop-shadow-md max-w-xl" style={{fontFamily: 'var(--body-font)'}}>
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 group hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-slate-900 group-hover:opacity-80" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 group hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-slate-900 group-hover:opacity-80" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
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
