import { CheckCircle, Package, Leaf, ShoppingBag } from 'lucide-react';

export default function EcoToteDuoPack() {
  return (
    <section id="ecotote-duopack" className="pt-20 pb-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Section: Image on Left, Text on Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Image with Decorative Elements */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/banner/d.png"
                alt="EcoTote DuoPack - Sustainable Garment Packaging"
                className="w-full h-[400px] md:h-[500px] object-cover"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
                  shapeOutside: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                }}
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-6">
            {/* Large Heading (Light Grey) */}
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight" style={{color: '#9ca3af', fontFamily: 'var(--heading-font)'}}>
              ECOTOTE
            </h2>
            
            {/* Subheading (Dark Grey, Bold) */}
            <h3 className="text-3xl sm:text-4xl font-bold" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
              Our Competitive Edge
            </h3>
            
            {/* Paragraph - Shortened */}
            <p className="text-lg sm:text-xl body-text leading-relaxed" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
              We provide lower than industry standard MOQ's to help test markets and refine products at competitive prices.
            </p>

            {/* Why Choose EcoTote DuoPack Section - Below Competitive Edge */}
            <div className="rounded-xl p-2.5 md:p-3 mt-3" style={{
              background: 'linear-gradient(to bottom, rgba(245, 238, 220, 0.4), rgba(235, 220, 195, 0.3))',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 className="text-base sm:text-lg font-bold mb-1.5" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
                Why Choose EcoTote DuoPack
              </h3>
              <p className="body-text text-xs mb-2" style={{color: '#1a1a1a', fontFamily: 'var(--body-font)'}}>
                Over 20 years of sustainable packaging experience with leading fashion brands and global exporters.
              </p>
              
              {/* Key Features - Shortened */}
              <div className="space-y-1">
                <div className="flex items-start gap-1.5">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs" style={{color: 'var(--text-primary)'}}>
                    Zero-waste: Reusable + compostable packaging
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs" style={{color: 'var(--text-primary)'}}>
                    EU compliant: Plastic-free export ready
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-xs" style={{color: 'var(--text-primary)'}}>
                    Flexible MOQ: Starting from 500 units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications Section - Clean Design */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Outer Bag */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--beige-200)]">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Package size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h4 className="text-xl font-bold" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Outer Bag
                </h4>
              </div>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Material:</strong> 100% cotton, 180 GSM
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Size:</strong> 38 × 42 cm
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Printing:</strong> Water-based (1–3 colors)
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Certification:</strong> GOTS compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Inner Bag */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--beige-200)]">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Leaf size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h4 className="text-xl font-bold" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Inner Bag
                </h4>
              </div>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Material:</strong> PLA/PBAT blend
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Size:</strong> 12 × 16 inches
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Finish:</strong> Transparent or frosted
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="body-text text-sm leading-relaxed">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Certification:</strong> ISO/IEC17025, ASTM D6866
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
            className="btn-cta-primary px-8 py-4 text-lg"
            style={{backgroundColor: 'var(--beige-700)', color: 'white'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-800)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-700)'}}
          >
            <ShoppingBag size={20} />
            <span>Request Quote</span>
          </button>
        </div>
      </div>
    </section>
  );
}

