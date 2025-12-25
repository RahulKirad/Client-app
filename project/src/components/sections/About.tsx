import { Target, BookOpen, Award, CheckCircle } from 'lucide-react';

export default function About() {
  const certifications = [
    { name: 'GOTS', description: 'Global Organic Textile Standard' },
    { name: 'FSC', description: 'Forest Stewardship Council' },
    { name: 'MSME', description: 'Export Compliance Certified' },
  ];

  return (
    <section id="about" className="py-20 pastel-beige-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-float-slow" style={{backgroundColor: 'rgba(201, 168, 130, 0.1)'}}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl animate-float-slow" style={{backgroundColor: 'rgba(232, 212, 184, 0.1)', animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: 'var(--primary-dark-color)', fontFamily: 'var(--heading-font)'}}>ABOUT US</h2>
          <p className="text-xl max-w-3xl mx-auto font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
            Where sustainability meets sophistication
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-fade-in-up stagger-1">
            <div className="flex items-start space-x-4 p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 hover-lift group beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
              <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--beige-400)'}}>
                <Target size={28} style={{color: 'var(--text-color)'}} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 group-hover:opacity-80 transition-colors duration-300" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Our Mission</h3>
                <p className="leading-relaxed font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
                  To deliver premium, sustainable tote bags that meet the highest global standards—ethically sourced,
                  intelligently designed, and export-ready. We bridge the gap between conscious consumption and
                  commercial excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up stagger-2">
            <div className="flex items-start space-x-4 p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 hover-lift group beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
              <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'var(--beige-300)'}}>
                <BookOpen size={28} style={{color: 'var(--text-color)'}} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 group-hover:opacity-80 transition-colors duration-300" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Our Story</h3>
                <p className="leading-relaxed font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
                  Born from a passion for sustainability and global commerce, Cottoniq blends natural materials with
                  modern branding to serve clients across continents. We understand that today's businesses need
                  partners who can deliver both quality and compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-8 sm:p-12 soft-shadow-lg animate-fade-in-up stagger-3 beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
          <div className="flex items-center justify-center mb-8">
            <Award className="mr-3 animate-bounce-subtle" size={36} style={{color: 'var(--beige-700)'}} />
            <h3 className="text-3xl font-bold" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Our Certifications</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg p-6 soft-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 beige-border group"
                style={{backgroundColor: 'var(--beige-50)', animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 rounded-lg group-hover:scale-110 transition-transform duration-300 animate-float" style={{backgroundColor: 'var(--beige-300)'}}>
                    <CheckCircle size={32} style={{color: 'var(--text-color)'}} />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-center mb-2 group-hover:opacity-80 transition-colors duration-300" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>{cert.name}</h4>
                <p className="text-center text-sm font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift beige-border" style={{backgroundColor: 'var(--beige-200)', color: 'var(--text-color)'}}>
              <p className="text-4xl font-bold mb-2 animate-bounce-subtle">100%</p>
              <p className="font-medium">Organic Cotton</p>
            </div>
            <div className="text-center p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift beige-border" style={{backgroundColor: 'var(--beige-100)', borderColor: 'var(--beige-400)'}}>
              <p className="text-4xl font-bold mb-2 animate-bounce-subtle" style={{color: 'var(--beige-700)', animationDelay: '0.2s'}}>50+</p>
              <p className="font-medium" style={{color: 'var(--text-color)'}}>Countries Served</p>
            </div>
            <div className="text-center p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift beige-border" style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)'}}>
              <p className="text-4xl font-bold mb-2 animate-bounce-subtle" style={{animationDelay: '0.4s'}}>10K+</p>
              <p className="font-medium">Orders Fulfilled</p>
            </div>
            <div className="text-center p-6 rounded-lg soft-shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift beige-border" style={{backgroundColor: 'var(--beige-100)', borderColor: 'var(--beige-500)'}}>
              <p className="text-4xl font-bold mb-2 animate-bounce-subtle" style={{color: 'var(--beige-600)', animationDelay: '0.6s'}}>Zero</p>
              <p className="font-medium" style={{color: 'var(--text-color)'}}>Plastic Packaging</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
