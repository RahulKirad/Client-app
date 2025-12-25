import { Briefcase, Users, Building2, Heart, Calendar, FileCheck } from 'lucide-react';

export default function Corporate() {
  const services = [
    {
      icon: Briefcase,
      title: 'Custom Logo Printing',
      description: 'High-quality, eco-friendly printing with your brand identity',
    },
    {
      icon: Users,
      title: 'Co-branded Gifting Programs',
      description: 'Collaborative designs that elevate your brand story',
    },
    {
      icon: Building2,
      title: 'White-label Export Support',
      description: 'Complete documentation and compliance for global delivery',
    },
    {
      icon: FileCheck,
      title: 'ESG Sustainability Reports',
      description: 'Detailed impact reports for your corporate sustainability goals',
    },
  ];

  const industries = [
    {
      icon: Building2,
      name: 'Retail & Fashion',
      description: 'Branded bags for stores, events, and customer appreciation',
    },
    {
      icon: Calendar,
      name: 'Hospitality & Events',
      description: 'Premium welcome gifts and conference merchandise',
    },
    {
      icon: Briefcase,
      name: 'Tech & Startups',
      description: 'Modern designs for onboarding kits and swag boxes',
    },
    {
      icon: Heart,
      name: 'NGOs & CSR Programs',
      description: 'Ethical products that align with social impact initiatives',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="corporate" className="py-20 bg-[#FDF6E3] paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-[#78350F] mb-4 uppercase tracking-tight" style={{fontFamily: 'serif', textShadow: '3px 3px 0px rgba(220, 38, 38, 0.3)'}}>
            Smart Branding for Global Teams
          </h2>
          <p className="text-xl text-[#78350F] max-w-3xl mx-auto font-medium" style={{fontFamily: 'serif'}}>
            Transform your corporate gifting with sustainable, custom-branded solutions
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-black text-[#78350F] text-center mb-12 uppercase tracking-wide" style={{fontFamily: 'serif'}}>What We Offer</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#FDF6E3] rounded-none p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 vintage-border"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
                  <service.icon size={28} style={{color: 'var(--text-color)'}} />
                </div>
                <h4 className="text-xl font-black text-[#78350F] mb-3 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{service.title}</h4>
                <p className="text-[#78350F] leading-relaxed font-medium" style={{fontFamily: 'serif'}}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FDF6E3] rounded-none p-8 sm:p-12 mb-12 shadow-lg vintage-border">
          <h3 className="text-3xl font-black text-[#78350F] text-center mb-12 uppercase tracking-wide" style={{fontFamily: 'serif'}}>Industries We Serve</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-[#FEF3C7] rounded-none p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 vintage-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg flex-shrink-0 beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
                    <industry.icon size={28} style={{color: 'var(--text-color)'}} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#78350F] mb-2 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{industry.name}</h4>
                    <p className="text-[#78350F] font-medium" style={{fontFamily: 'serif'}}>{industry.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-8 sm:p-12 soft-shadow-lg beige-border" style={{backgroundColor: 'var(--beige-300)'}}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Ready to Elevate Your Brand?</h3>
            <p className="text-lg mb-8 font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
              Let's create sustainable, custom-branded solutions that reflect your company's values
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="px-8 py-3 rounded-lg transition-all duration-300 font-medium soft-shadow beige-border"
                style={{backgroundColor: 'var(--beige-100)', color: 'var(--text-color)', borderColor: 'var(--beige-400)'}}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-100)'; e.currentTarget.style.borderColor = 'var(--beige-400)'}}
              >
                Book a Consultation
              </button>
              <button className="px-8 py-3 rounded-lg transition-all duration-300 font-medium soft-shadow beige-border"
                style={{backgroundColor: 'var(--beige-400)', color: 'var(--text-color)', borderColor: 'var(--beige-500)'}}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-500)'; e.currentTarget.style.borderColor = 'var(--beige-600)'}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-400)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
