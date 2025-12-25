import { Globe, FileText, Languages, Shield, Download, CheckCircle } from 'lucide-react';

export default function Export() {
  const regions = [
    { name: 'European Union', code: 'EU', flag: '🇪🇺' },
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'Asia Pacific', code: 'APAC', flag: '🌏' },
    { name: 'Middle East', code: 'ME', flag: '🌍' },
  ];

  const services = [
    {
      icon: FileText,
      title: 'HS Codes & Documentation',
      description: 'Complete customs documentation with accurate harmonized system codes',
    },
    {
      icon: Shield,
      title: 'Compliance Markings',
      description: 'CE markings and region-specific compliance certifications',
    },
    {
      icon: Languages,
      title: 'Localized Labeling',
      description: 'Multi-language product labels and packaging materials',
    },
    {
      icon: CheckCircle,
      title: 'GST & MSME Support',
      description: 'Full tax compliance for Indian export businesses',
    },
  ];

  const documents = [
    'Commercial Invoice',
    'Packing List',
    'Certificate of Origin',
    'Bill of Lading',
    'Export License',
    'GOTS Certificate',
    'FSC Certificate',
    'Quality Test Reports',
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="export" className="py-20 bg-[#FDF6E3] paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-[#78350F] mb-4 uppercase tracking-tight" style={{fontFamily: 'serif', textShadow: '3px 3px 0px rgba(220, 38, 38, 0.3)'}}>
            Export & Compliance
          </h2>
          <p className="text-xl text-[#78350F] max-w-3xl mx-auto font-medium" style={{fontFamily: 'serif'}}>
            Seamless global delivery with complete regulatory compliance
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <Globe className="mr-3" size={36} style={{color: 'var(--beige-700)'}} />
            <h3 className="text-3xl font-black text-[#78350F] uppercase tracking-wide" style={{fontFamily: 'serif'}}>Regions We Serve</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-[#FDF6E3] rounded-none p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 vintage-border"
              >
                <div className="text-6xl mb-4">{region.flag}</div>
                <h4 className="text-xl font-black text-[#78350F] mb-2 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{region.name}</h4>
                <p className="font-bold uppercase tracking-wide" style={{color: 'var(--beige-700)'}}>{region.code}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-black text-[#78350F] text-center mb-12 uppercase tracking-wide" style={{fontFamily: 'serif'}}>Export Support Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#FDF6E3] rounded-none p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 vintage-border"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 beige-border" style={{backgroundColor: 'var(--beige-400)'}}>
                  <service.icon size={28} style={{color: 'var(--text-color)'}} />
                </div>
                <h4 className="text-lg font-black text-[#78350F] mb-3 uppercase tracking-wide" style={{fontFamily: 'serif'}}>{service.title}</h4>
                <p className="text-[#78350F] text-sm leading-relaxed font-medium" style={{fontFamily: 'serif'}}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FDF6E3] rounded-none p-8 sm:p-12 shadow-xl vintage-border">
          <h3 className="text-3xl font-black text-[#78350F] text-center mb-12 uppercase tracking-wide" style={{fontFamily: 'serif'}}>
            Complete Documentation Package
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-[#FEF3C7] p-4 rounded-none shadow-md hover:shadow-lg transition-shadow duration-300 vintage-border"
              >
                <CheckCircle className="flex-shrink-0" size={20} style={{color: 'var(--beige-700)'}} />
                <span className="text-[#78350F] font-bold text-sm uppercase tracking-wide" style={{fontFamily: 'serif'}}>{doc}</span>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-8 beige-border soft-shadow-lg" style={{backgroundColor: 'var(--beige-300)'}}>
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="mx-auto mb-4" size={48} style={{color: 'var(--beige-700)'}} />
              <h4 className="text-2xl font-bold mb-4" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>Export-Ready From Day One</h4>
              <p className="mb-6 leading-relaxed font-normal" style={{color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}>
                We handle all the paperwork, compliance, and logistics so you can focus on growing your business.
                Every order ships with complete documentation and region-specific compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 font-medium soft-shadow beige-border"
                  style={{backgroundColor: 'var(--beige-100)', color: 'var(--text-color)', borderColor: 'var(--beige-400)'}}
                  onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                  onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-100)'; e.currentTarget.style.borderColor = 'var(--beige-400)'}}
                >
                  <Download size={20} />
                  <span>Download Export Pack</span>
                </button>
                <button
                  onClick={scrollToContact}
                  className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 font-medium soft-shadow beige-border"
                  style={{backgroundColor: 'var(--beige-400)', color: 'var(--text-color)', borderColor: 'var(--beige-500)'}}
                  onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-500)'; e.currentTarget.style.borderColor = 'var(--beige-600)'}}
                  onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-400)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
                >
                  <span>Talk to Our Compliance Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg shadow-md beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>50+</p>
            <p className="font-medium" style={{color: 'var(--text-color)'}}>Countries Delivered</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-md beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>100%</p>
            <p className="font-medium" style={{color: 'var(--text-color)'}}>Compliance Rate</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-md beige-border" style={{backgroundColor: 'var(--beige-100)'}}>
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--beige-700)'}}>24h</p>
            <p className="font-medium" style={{color: 'var(--text-color)'}}>Document Processing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
