import { useState, useEffect } from 'react';
import { ArrowRight, Globe, Award, Package, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AMERICAN FOOD",
      subtitle: "The Best Taste Food",
      description: "Premium GOTS-certified cotton tote bags for global markets. From sustainable sourcing to export-ready documentation, we handle it all.",
      image: "/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (1).jpeg",
      badge: "Smart. Sustainable. Global.",
      gradient: "from-[#A7C957] to-[#6B8E23]"
    },
    {
      title: "ECO-FRIENDLY",
      subtitle: "Sustainable Solutions",
      description: "100% organic cotton with GOTS certification. Our eco-friendly tote bags are perfect for businesses committed to sustainability and quality.",
      image: "/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (1).jpeg",
      badge: "Certified. Organic. Premium.",
      gradient: "from-[#B8E0D2] to-[#95D5C4]"
    },
    {
      title: "GLOBAL EXPORT",
      subtitle: "Worldwide Delivery",
      description: "Export-ready documentation and compliance for 50+ countries. We handle all the paperwork so you can focus on growing your business.",
      image: "/images/products/WhatsApp Image 2025-11-01 at 11.44.47 PM (1).jpeg",
      badge: "Export. Compliant. Reliable.",
      gradient: "from-[#FFB4A2] to-[#FF9A85]"
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pastel-beige-bg pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(212, 165, 116, 0.1)'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(201, 168, 130, 0.1)', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(232, 212, 184, 0.1)', animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Carousel Container */}
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
                index === currentSlide 
                  ? 'opacity-100 relative' 
                  : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 px-6 py-2 rounded text-sm font-medium animate-bounce-subtle soft-shadow" style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)'}}>
                  <Sparkles size={16} className="animate-spin-slow" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>
                  {slide.title}{' '}
                  <span className="block" style={{color: 'var(--beige-600)'}}>
                    {slide.subtitle}
                  </span>
                </h1>

                <p className="text-lg leading-relaxed font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('#products')}
                    className="group px-8 py-4 rounded flex items-center justify-center space-x-2 font-medium transform hover:scale-105 smooth-transition soft-shadow"
                    style={{backgroundColor: 'var(--beige-400)', color: 'var(--text-color)'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-500)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-400)'}
                  >
                    <span>ORDER NOW</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="px-8 py-4 rounded flex items-center justify-center space-x-2 font-medium transform hover:scale-105 smooth-transition soft-shadow beige-border"
                    style={{backgroundColor: 'var(--beige-100)', color: 'var(--beige-700)', borderColor: 'var(--beige-300)'}}
                    onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                    onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-100)'; e.currentTarget.style.borderColor = 'var(--beige-300)'}}
                  >
                    <span>SEE THE MENU</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-lg overflow-hidden soft-shadow-lg transform hover:scale-105 transition-all duration-500 beige-border">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t" style={{background: 'linear-gradient(to top, rgba(232, 212, 184, 0.2), transparent)'}}></div>
                </div>
                <div className="absolute -bottom-4 -left-4 p-4 rounded-lg soft-shadow-lg animate-float beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
                  <p className="text-2xl font-bold" style={{color: 'var(--beige-700)'}}>100%</p>
                  <p className="text-sm font-medium" style={{color: 'var(--text-color)'}}>Sustainable</p>
                </div>
                <div className="absolute -top-4 -right-4 p-4 rounded-lg soft-shadow-lg animate-float beige-border" style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)', animationDelay: '1s'}}>
                  <p className="text-2xl font-bold">Global</p>
                  <p className="text-sm font-medium">Export Ready</p>
                </div>
                
                {/* Decorative floating elements */}
                <div className="absolute top-1/4 -left-8 w-16 h-16 rounded-full blur-xl animate-float-slow" style={{backgroundColor: 'rgba(232, 212, 184, 0.3)'}}></div>
                <div className="absolute bottom-1/4 -right-8 w-20 h-20 rounded-full blur-xl animate-float-slow" style={{backgroundColor: 'rgba(224, 212, 194, 0.3)', animationDelay: '1.5s'}}></div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 group"
            style={{backgroundColor: 'var(--beige-100)'}}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} style={{color: 'var(--beige-700)'}} className="group-hover:opacity-80" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 group"
            style={{backgroundColor: 'var(--beige-100)'}}
            aria-label="Next slide"
          >
            <ChevronRight size={24} style={{color: 'var(--beige-700)'}} className="group-hover:opacity-80" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-12 h-3'
                    : 'w-3 h-3 opacity-50 hover:opacity-80'
                }`}
                style={index === currentSlide ? {backgroundColor: 'var(--beige-600)'} : {backgroundColor: 'var(--beige-300)'}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Feature Cards - Below Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          <div className="flex flex-col items-center p-4 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up beige-border" style={{backgroundColor: 'var(--beige-100)', animationDelay: '0.6s'}}>
            <Award className="mb-2 animate-bounce-subtle" size={32} style={{color: 'var(--beige-700)'}} />
            <span className="text-xs font-medium text-center" style={{color: 'var(--text-color)'}}>GOTS Certified</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up beige-border" style={{backgroundColor: 'var(--beige-100)', animationDelay: '0.7s'}}>
            <Package className="mb-2 animate-bounce-subtle" size={32} style={{color: 'var(--beige-600)'}} />
            <span className="text-xs font-medium text-center" style={{color: 'var(--text-color)'}}>FSC Packaging</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up beige-border" style={{backgroundColor: 'var(--beige-100)', animationDelay: '0.8s'}}>
            <Globe className="mb-2 animate-bounce-subtle" size={32} style={{color: 'var(--beige-500)'}} />
            <span className="text-xs font-medium text-center" style={{color: 'var(--text-color)'}}>Export Ready</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up beige-border" style={{backgroundColor: 'var(--beige-100)', animationDelay: '0.9s'}}>
            <Sparkles className="mb-2 animate-bounce-subtle" size={32} style={{color: 'var(--beige-700)'}} />
            <span className="text-xs font-medium text-center" style={{color: 'var(--text-color)'}}>Custom Branding</span>
          </div>
        </div>
      </div>
    </section>
  );
}
