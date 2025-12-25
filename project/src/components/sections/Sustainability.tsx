import { Leaf, Recycle, Droplets, TreePine, TrendingDown, Users, Download } from 'lucide-react';

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
          <h2 className="text-4xl sm:text-5xl font-black text-[#78350F] mb-4 uppercase tracking-tight" style={{fontFamily: 'serif', textShadow: '3px 3px 0px rgba(220, 38, 38, 0.3)'}}>
            More Than Just a Bag
          </h2>
          <p className="text-xl text-[#78350F] max-w-3xl mx-auto font-medium" style={{fontFamily: 'serif'}}>
            Every Cottoniq product tells a story of sustainable practices and positive impact
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Leaf className="mr-3" size={36} style={{color: 'var(--beige-700)'}} />
            <h3 className="text-3xl font-black text-[#78350F] uppercase tracking-wide" style={{fontFamily: 'serif'}}>Our Materials</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <div
                key={index}
                className="bg-[#FEF3C7] rounded-none p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 vintage-border"
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
                  <material.icon size={32} style={{color: 'var(--text-color)'}} />
                </div>
                <h4 className="text-lg font-black text-[#78350F] text-center mb-3 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{material.title}</h4>
                <p className="text-[#78350F] text-center text-sm font-medium" style={{fontFamily: 'serif'}}>{material.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FEF3C7] rounded-none p-8 sm:p-12 shadow-xl mb-12 vintage-border">
          <div className="flex items-center justify-center mb-12">
            <TrendingDown className="mr-3" size={36} style={{color: 'var(--beige-700)'}} />
            <h3 className="text-3xl font-black text-[#78350F] uppercase tracking-wide" style={{fontFamily: 'serif'}}>Our Impact</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#FDF6E3] rounded-none hover:shadow-lg transition-shadow duration-300 vintage-border"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
                    <impact.icon size={24} style={{color: 'var(--text-color)'}} />
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>{impact.metric}</p>
                <p className="text-lg font-black text-[#78350F] mb-2 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{impact.label}</p>
                <p className="text-sm text-[#78350F] font-medium" style={{fontFamily: 'serif'}}>{impact.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-8 sm:p-12 relative overflow-hidden soft-shadow-lg beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Leaf className="mx-auto mb-6" size={48} style={{color: 'var(--beige-700)'}} />
              <h3 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Traceable Supply Chain</h3>
              <p className="text-lg mb-8 leading-relaxed font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
                From farm to finished product, every step in our supply chain is documented and verified. We believe
                in complete transparency, so you can trust that your tote bags are truly sustainable.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 beige-border">
                  <p className="text-2xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>Step 1</p>
                  <p className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--text-color)'}}>Organic Cotton Farms</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 beige-border">
                  <p className="text-2xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>Step 2</p>
                  <p className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--text-color)'}}>Ethical Manufacturing</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 beige-border">
                  <p className="text-2xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>Step 3</p>
                  <p className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--text-color)'}}>Quality Assurance</p>
                </div>
              </div>
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
