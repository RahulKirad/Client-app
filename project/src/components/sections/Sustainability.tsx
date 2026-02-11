import { Leaf, Recycle, Droplets, TreePine, TrendingDown, Users, Download, Package, Factory, CheckCircle } from 'lucide-react';

export default function Sustainability() {
  const materials = [
    {
      icon: Leaf,
      title: '100% GOTS-Certified Cotton',
      description: 'Organically grown without harmful pesticides or chemicals',
    },
    {
      icon: Recycle,
      title: 'Recycled Stitching Threads',
      description: 'Post-consumer recycled materials for all stitching',
    },
    {
      icon: TreePine,
      title: 'Biodegradable Packaging',
      description: 'FSC-certified materials that return to nature',
    },
    {
      icon: Droplets,
      title: 'Water-Based Inks',
      description: 'Non-toxic, eco-friendly printing solutions',
    },
  ];

  const impacts = [
    {
      icon: TrendingDown,
      metric: '60%',
      label: 'Reduced Carbon Footprint',
      description: 'Compared to conventional cotton production',
    },
    {
      icon: Users,
      metric: '100%',
      label: 'Ethical Labor',
      description: 'Fair wages and safe working conditions',
    },
    {
      icon: Leaf,
      metric: '500+',
      label: 'Trees Saved',
      description: 'Through plastic-free packaging annually',
    },
    {
      icon: Droplets,
      metric: '90%',
      label: 'Water Conservation',
      description: 'Compared to traditional dyeing methods',
    },
  ];

  return (
    <section id="sustainability" className="py-20 bg-[#FDF6E3] paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-h2 mb-4 uppercase tracking-tight" style={{color: 'var(--heading-color)'}}>
            More Than Just a Bag
          </h2>
          <p className="body-text-lg max-w-3xl mx-auto" style={{color: 'var(--heading-color)'}}>
            Every Cottoniq product tells a story of sustainable practices and positive impact
          </p>
        </div>

        {/* Sustainability Image Section */}
        <div className="mb-12 rounded-lg overflow-hidden soft-shadow-lg">
          <div className="relative h-64 md:h-96">
            <img
              src="/images/new/WhatsApp Image 2025-12-27 at 6.17.05 PM.jpeg"
              alt="Sustainable Practices"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-wide" style={{fontFamily: 'var(--heading-font)'}}>Sustainable by Design</h3>
              <p className="text-lg font-medium" style={{fontFamily: 'var(--heading-font)'}}>Every product tells a story of sustainable practices and positive impact</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Leaf className="mr-3" size={36} style={{color: '#78350F'}} />
            <h3 className="text-3xl font-black text-[#78350F] uppercase tracking-wide" style={{fontFamily: 'var(--heading-font)'}}>Our Materials</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--beige-300)] group"
              >
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110" style={{backgroundColor: 'var(--beige-200)'}}>
                  <material.icon size={36} style={{color: '#78350F'}} />
                </div>
                <h4 className="text-base font-bold text-[#78350F] text-center mb-3 uppercase tracking-wide leading-tight" style={{fontFamily: 'var(--heading-font)'}}>{material.title}</h4>
                <p className="text-sm text-[#5a4a3a] text-center leading-relaxed" style={{fontFamily: 'var(--body-font)'}}>{material.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <TrendingDown className="mr-3" size={36} style={{color: '#78350F'}} />
            <h3 className="text-3xl font-black text-[#78350F] uppercase tracking-wide" style={{fontFamily: 'var(--heading-font)'}}>Our Impact</h3>
          </div>
          <div className="relative overflow-x-auto pb-8">
            <div className="flex items-center justify-center gap-16 sm:gap-20 lg:gap-24 xl:gap-32 min-w-max px-4">
              {impacts.map((impact, index) => {
                return (
                  <div key={index} className="flex flex-col items-center relative">
                    {/* Icon */}
                    <div className="mb-3">
                      <impact.icon size={48} style={{color: '#1a1a1a'}} />
                    </div>
                    
                    {/* Metric */}
                    <p className="text-4xl font-bold mb-2" style={{color: 'var(--beige-600)'}}>{impact.metric}</p>
                    
                    {/* Label */}
                    <p className="text-sm font-bold text-[#78350F] mb-1 uppercase tracking-wide text-center max-w-[180px]" style={{fontFamily: 'var(--heading-font)'}}>
                      {impact.label}
                    </p>
                    
                    {/* Description */}
                    <p className="text-xs text-[#5a4a3a] text-center max-w-[180px] leading-relaxed" style={{fontFamily: 'var(--body-font)'}}>
                      {impact.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-lg p-8 sm:p-12 relative overflow-hidden" style={{backgroundColor: 'var(--beige-200)'}}>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{color: '#78350F', fontFamily: 'var(--heading-font)'}}>Traceable Supply Chain</h3>
            
            {/* Three Step Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative py-8">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs mx-auto relative">
                <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{backgroundColor: 'var(--beige-300)'}}>
                  <Package size={56} style={{color: '#78350F'}} />
                </div>
                <h4 className="text-base font-bold mb-3 uppercase tracking-wide" style={{color: '#78350F'}}>Organic Cotton Farms</h4>
                <p className="text-sm leading-relaxed text-center" style={{color: '#5a4a3a'}}>
                  From farm to finished product, every step in our supply chain is documented and verified. We believe in complete transparency, so you can trust that your tote bags are truly sustainable.
                </p>
              </div>

              {/* Arrow 1 - Between Step 1 and Step 2 */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0 px-4">
                <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
                  <path
                    d="M 10 40 Q 40 10, 60 40 T 110 40"
                    stroke="#78350F"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="6,6"
                  />
                  <polygon
                    points="105,37 110,40 105,43"
                    fill="#78350F"
                  />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs mx-auto relative">
                <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{backgroundColor: 'var(--beige-300)'}}>
                  <Factory size={56} style={{color: '#78350F'}} />
                </div>
                <h4 className="text-base font-bold mb-3 uppercase tracking-wide" style={{color: '#78350F'}}>Ethical Manufacturing</h4>
                <p className="text-sm leading-relaxed text-center" style={{color: '#5a4a3a'}}>
                  From farm to finished product, every step in our supply chain is documented and verified. We believe in complete transparency, so you can trust that your tote bags are truly sustainable.
                </p>
              </div>

              {/* Arrow 2 - Between Step 2 and Step 3 */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0 px-4">
                <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
                  <path
                    d="M 10 40 Q 40 10, 60 40 T 110 40"
                    stroke="#78350F"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="6,6"
                  />
                  <polygon
                    points="105,37 110,40 105,43"
                    fill="#78350F"
                  />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center max-w-xs mx-auto relative">
                <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{backgroundColor: 'var(--beige-300)'}}>
                  <CheckCircle size={56} style={{color: '#78350F'}} />
                </div>
                <h4 className="text-base font-bold mb-3 uppercase tracking-wide" style={{color: '#78350F'}}>Quality Assurance</h4>
                <p className="text-sm leading-relaxed text-center" style={{color: '#5a4a3a'}}>
                  From farm to finished product, every step in our supply chain is documented and verified. We believe in complete transparency, so you can trust that your tote bags are truly sustainable.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-12 text-center">
              <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 font-medium soft-shadow mx-auto beige-border"
                style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)', borderColor: 'var(--beige-500)'}}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-400)'; e.currentTarget.style.borderColor = 'var(--beige-600)'}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-300)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
              >
                <Download size={20} />
                <span>View Our Sustainability Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
