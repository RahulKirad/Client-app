import { CheckCircle, Package, Leaf, Globe, ShoppingBag } from 'lucide-react';

export default function EcoToteDuoPack() {
  return (
    <section id="ecotote-duopack" className="py-20 bg-white relative overflow-hidden">
      {/* Full Width Image with Text Overlay */}
      <div className="relative w-full mb-16">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="/images/products/product.png"
            alt="EcoTote DuoPack - Sustainable Garment Packaging"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          {/* Header Section - Left Side Overlay */}
          <div className="absolute inset-0 flex items-start z-10 pt-12 md:pt-16 lg:pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-lg" style={{fontFamily: 'var(--heading-font)'}}>
                  EcoTote DuoPack
                </h2>
                <p className="text-lg sm:text-xl font-semibold text-white drop-shadow-md" style={{fontFamily: 'var(--heading-font)'}}>
                  Sustainable Garment Packaging
                </p>
                <p className="text-base sm:text-lg font-medium text-white/95 drop-shadow-md" style={{fontFamily: 'var(--heading-font)'}}>
                  Reusable Cotton Tote + Compostable Inner Bag
                </p>
                <p className="body-text text-white drop-shadow-lg max-w-lg px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm" style={{fontFamily: 'var(--body-font)'}}>
                  A dual-layer packaging solution for fashion brands, e-commerce retailers, and garment exporters seeking plastic-free alternatives.
                </p>

                {/* Ideal For Section - Below Header Content on Left */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <ShoppingBag className="mr-2" size={20} style={{color: 'white'}} />
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white drop-shadow-lg" style={{fontFamily: 'var(--heading-font)'}}>
                      Ideal For
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg border border-white/40">
                      <p className="text-xs sm:text-sm font-semibold text-[#78350F]" style={{fontFamily: 'var(--heading-font)'}}>
                        Sustainable fashion brands
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg border border-white/40">
                      <p className="text-xs sm:text-sm font-semibold text-[#78350F]" style={{fontFamily: 'var(--heading-font)'}}>
                        Organic garment exporters
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg border border-white/40">
                      <p className="text-xs sm:text-sm font-semibold text-[#78350F]" style={{fontFamily: 'var(--heading-font)'}}>
                        Eco-conscious e-commerce platforms
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg border border-white/40">
                      <p className="text-xs sm:text-sm font-semibold text-[#78350F]" style={{fontFamily: 'var(--heading-font)'}}>
                        Corporate gifting and promotional campaigns
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Combined Product Specifications Section */}
        <div className="bg-[var(--beige-100)] rounded-xl p-6 md:p-8 soft-shadow mb-16">
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-6 text-center" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
            Product Specifications
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Outer Bag */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-300)'}}>
                  <Package size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wide" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Outer Bag: 180 GSM Cotton Tote
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Material:</strong> 100% cotton, 180 GSM
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Size:</strong> 38 × 42 cm (customizable)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Printing:</strong> Water-based screen printing (1–3 colors)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Certifications:</strong> GOTS compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Inner Bag */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-300)'}}>
                  <Leaf size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wide" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
                  Inner Bag: Corn-Based Biodegradable Polybag
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Material:</strong> PLA/PBAT blend (IS 17088 certified)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Size:</strong> 12 × 16 inches (customizable)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Finish:</strong> Transparent or frosted
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{color: 'var(--beige-700)'}} />
                  <span className="text-sm body-text">
                    <strong style={{fontFamily: 'var(--heading-font)'}}>Certifications:</strong> ISO/IEC17025, ASTM D6866
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <Globe className="mr-3" size={36} style={{color: 'var(--beige-700)'}} />
            <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide" style={{color: 'var(--heading-color)', fontFamily: 'var(--heading-font)'}}>
              Why Choose EcoTote DuoPack
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[var(--beige-200)]">
              <CheckCircle size={32} className="mb-4" style={{color: 'var(--beige-700)'}} />
              <p className="body-text font-semibold" style={{fontFamily: 'var(--heading-font)'}}>
                Dual sustainability: Reusable + compostable = zero-waste packaging
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[var(--beige-200)]">
              <CheckCircle size={32} className="mb-4" style={{color: 'var(--beige-700)'}} />
              <p className="body-text font-semibold" style={{fontFamily: 'var(--heading-font)'}}>
                Plastic-free export ready: Compliant with EU plastic bans and EPR regulations
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[var(--beige-200)]">
              <CheckCircle size={32} className="mb-4" style={{color: 'var(--beige-700)'}} />
              <p className="body-text font-semibold" style={{fontFamily: 'var(--heading-font)'}}>
                Brand-ready: Custom printing, FSC-certified tags, QR storytelling options
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[var(--beige-200)]">
              <CheckCircle size={32} className="mb-4" style={{color: 'var(--beige-700)'}} />
              <p className="body-text font-semibold" style={{fontFamily: 'var(--heading-font)'}}>
                Flexible MOQ: Starting from 500 units
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-[var(--beige-200)]">
              <CheckCircle size={32} className="mb-4" style={{color: 'var(--beige-700)'}} />
              <p className="body-text font-semibold" style={{fontFamily: 'var(--heading-font)'}}>
                Export-friendly: FOB India or CIF
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-cta-primary"
            style={{backgroundColor: 'var(--beige-700)', color: 'white'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-800)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-700)'}}
          >
            <ShoppingBag size={20} />
            <span>Request Quote for EcoTote DuoPack</span>
          </button>
        </div>
      </div>
    </section>
  );
}

