import { CheckCircle, ShoppingBag, Package, Leaf } from 'lucide-react';

export default function EcoToteDuoPack() {
  return (
    <section id="ecotote-duopack" className="pt-20 pb-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section: Image on Left, Text on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-12 md:mb-16">
          {/* Left Side - Image */}
          <div className="relative order-1 md:order-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/banner/d.png"
                alt="EcoTote DuoPack - Sustainable Garment Packaging"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
                  shapeOutside: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                }}
              />
            </div>
          </div>

          {/* Right Side - Hero Content */}
          <div className="space-y-6 md:space-y-8 order-2 md:order-2">
            {/* Large Heading */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight" style={{color: '#9ca3af', fontFamily: 'var(--heading-font)'}}>
              ECOTOTE
            </h2>
            
            {/* Our Competitive Edge Section */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
                Our Competitive Edge
              </h3>
              <p className="body-text text-sm sm:text-base md:text-lg leading-relaxed" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                We provide lower than industry standard MOQ's to help test markets and refine products at competitive prices.
              </p>
            </div>

            {/* Why Choose EcoTote DuoPack - Beige Box */}
            <div className="rounded-xl p-3 md:p-4" style={{
              background: 'linear-gradient(to bottom, rgba(245, 238, 220, 0.5), rgba(235, 220, 195, 0.4))',
              border: '1px solid rgba(235, 220, 195, 0.5)'
            }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
                Why Choose EcoTote DuoPack
              </h3>
              <p className="body-text text-xs sm:text-sm mb-2 md:mb-3" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                Over 20 years of sustainable packaging experience with leading fashion brands and global exporters.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                    Zero-waste: Reusable + compostable packaging
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                    EU compliant: Plastic-free export ready
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                    Flexible MOQ: Starting from 500 units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications Section - Outer Bag and Inner Bag */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Outer Bag */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b border-[var(--beige-300)]">
                <div className="p-1.5 md:p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Package size={20} className="md:w-6 md:h-6" style={{color: 'var(--beige-700)'}} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Outer Bag
                </h3>
              </div>
              <div className="space-y-2 md:space-y-2.5">
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Material:</strong> 100% cotton, 180 GSM
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Size:</strong> 38 × 42 cm
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Printing:</strong> Water-based (1–3 colors)
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Certification:</strong> GOTS compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Inner Bag */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b border-[var(--beige-300)]">
                <div className="p-1.5 md:p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Leaf size={20} className="md:w-6 md:h-6" style={{color: 'var(--beige-700)'}} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Inner Bag
                </h3>
              </div>
              <div className="space-y-2 md:space-y-2.5">
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Material:</strong> PLA/PBAT blend
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Size:</strong> 12 × 16 inches
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Finish:</strong> Transparent or frosted
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-2.5">
                  <CheckCircle size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs sm:text-sm">
                    <strong>Certification:</strong> ISO/IEC17025, ASTM D6866
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-cta-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-300"
            style={{backgroundColor: 'var(--beige-700)', color: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-800)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-700)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}}
          >
            <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
            <span>Request Quote for EcoTote DuoPack</span>
          </button>
        </div>
      </div>
    </section>
  );
}

