import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white paper-texture relative overflow-hidden"
      style={{ backgroundColor: '#A9927A' }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 animate-float-slow" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float-slow" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 min-w-0">
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-4 group">
              <img
                src="/images/logo/logo.png"
                alt="Cottonunique Logo"
                className="h-14 w-auto bg-white rounded-none p-1.5 border-2 border-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed font-medium" style={{fontFamily: 'var(--heading-font)'}}>
              Premium sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide transform transition-all duration-300 hover:translate-x-2" style={{fontFamily: 'var(--heading-font)'}}>Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Products', href: '/#products' },
                { name: 'Corporate Solutions', href: '/#corporate' },
                { name: 'Sustainability', href: '/#sustainability' }
              ].map((link, index) => (
                <li key={link.name} className="transform transition-all duration-300 hover:translate-x-2" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
                  <a 
                    href={link.href} 
                    className="text-white/90 hover:text-[#FBBF24] transition-all duration-300 font-medium uppercase tracking-wide inline-block relative group" 
                    style={{fontFamily: 'var(--heading-font)'}}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FBBF24] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide transform transition-all duration-300 hover:translate-x-2" style={{fontFamily: 'var(--heading-font)'}}>Certifications</h3>
            <ul className="space-y-2 text-white/90">
              {[
                'GOTS Certified',
                'FSC Compliant',
                'MSME Registered',
                'Export Compliant'
              ].map((cert, index) => (
                <li 
                  key={cert} 
                  className="flex items-center space-x-2 transform transition-all duration-300 hover:translate-x-2 group" 
                  style={{animationDelay: `${0.4 + index * 0.1}s`}}
                >
                  <span className="w-2 h-2 rounded-full transform transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg" style={{backgroundColor: 'var(--beige-600)'}}></span>
                  <span className="font-medium uppercase tracking-wide" style={{fontFamily: 'var(--body-font)'}}>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide transform transition-all duration-300 hover:translate-x-2" style={{fontFamily: 'var(--heading-font)'}}>Contact Info</h3>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start space-x-2 group transform transition-all duration-300 hover:translate-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0 text-[#FBBF24] transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm font-medium break-all" style={{fontFamily: 'var(--heading-font)'}}>info@cottonunique.com</span>
              </li>
              <li className="flex items-start space-x-2 group transform transition-all duration-300 hover:translate-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0 text-[#FBBF24] transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm font-medium" style={{fontFamily: 'var(--heading-font)'}}>+91 (xxx) xxx-xxxx</span>
              </li>
              <li className="flex items-start space-x-2 group transform transition-all duration-300 hover:translate-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#FBBF24] transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm font-medium" style={{fontFamily: 'var(--heading-font)'}}>Export-ready facility, India</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: Facebook, name: 'Facebook' },
                { icon: Twitter, name: 'Twitter' },
                { icon: Instagram, name: 'Instagram' },
                { icon: Linkedin, name: 'LinkedIn' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href="#" 
                    className="text-white/90 hover:text-[#FBBF24] transition-all duration-300 bg-white/10 p-2 rounded-none border-2 border-white/20 transform hover:scale-110 hover:rotate-6 hover:bg-white/20 hover:border-[#FBBF24] group"
                    style={{animationDelay: `${0.5 + index * 0.1}s`}}
                  >
                    <Icon size={20} className="transform transition-all duration-300 group-hover:scale-125" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <p className="text-white/90 text-sm font-medium transform transition-all duration-300 hover:scale-105" style={{fontFamily: 'var(--heading-font)'}}>
            © {currentYear} Cottonunique. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-white/90 hover:text-[#FBBF24] text-sm transition-all duration-300 font-medium uppercase tracking-wide transform hover:scale-110 relative group" 
              style={{fontFamily: 'var(--heading-font)'}}
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FBBF24] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a 
              href="/#contact" 
              className="text-white/90 hover:text-[#FBBF24] text-sm transition-all duration-300 font-medium uppercase tracking-wide transform hover:scale-110 relative group" 
              style={{fontFamily: 'var(--heading-font)'}}
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FBBF24] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
