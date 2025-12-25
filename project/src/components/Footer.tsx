import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#78350F] text-white paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/WhatsApp Image 2025-11-01 at 11.44.47 PM.jpeg"
                alt="Cottoniq Logo"
                className="h-10 w-auto bg-white rounded-none p-1 border-2 border-white"
              />
              <span className="text-xl font-black uppercase tracking-wider" style={{fontFamily: 'serif', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'}}>COTTONIQ</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed font-medium" style={{fontFamily: 'serif'}}>
              Premium sustainable tote bags that meet the highest global standards—ethically sourced, intelligently designed, and export-ready.
            </p>
          </div>

          <div>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide" style={{fontFamily: 'serif'}}>Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>About Us</a></li>
              <li><a href="#products" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>Products</a></li>
              <li><a href="#corporate" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>Corporate Solutions</a></li>
              <li><a href="#sustainability" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide" style={{fontFamily: 'serif'}}>Certifications</h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--beige-600)'}}></span>
                <span className="font-medium uppercase tracking-wide" style={{fontFamily: 'var(--body-font)'}}>GOTS Certified</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--beige-600)'}}></span>
                <span className="font-medium uppercase tracking-wide" style={{fontFamily: 'var(--body-font)'}}>FSC Compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--beige-600)'}}></span>
                <span className="font-medium uppercase tracking-wide" style={{fontFamily: 'var(--body-font)'}}>MSME Registered</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--beige-600)'}}></span>
                <span className="font-medium uppercase tracking-wide" style={{fontFamily: 'var(--body-font)'}}>Export Compliant</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-lg mb-4 text-white uppercase tracking-wide" style={{fontFamily: 'serif'}}>Contact Info</h3>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0 text-[#FBBF24]" />
                <span className="text-sm font-medium" style={{fontFamily: 'serif'}}>info@cottoniq.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0 text-[#FBBF24]" />
                <span className="text-sm font-medium" style={{fontFamily: 'serif'}}>+91 (xxx) xxx-xxxx</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#FBBF24]" />
                <span className="text-sm font-medium" style={{fontFamily: 'serif'}}>Export-ready facility, India</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 bg-white/10 p-2 rounded-none border-2 border-white/20">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 bg-white/10 p-2 rounded-none border-2 border-white/20">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 bg-white/10 p-2 rounded-none border-2 border-white/20">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/90 hover:text-[#FBBF24] transition-colors duration-200 bg-white/10 p-2 rounded-none border-2 border-white/20">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/90 text-sm font-medium" style={{fontFamily: 'serif'}}>
            © {currentYear} Cottoniq. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/90 hover:text-[#FBBF24] text-sm transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>Privacy Policy</a>
            <a href="#" className="text-white/90 hover:text-[#FBBF24] text-sm transition-colors duration-200 font-medium uppercase tracking-wide" style={{fontFamily: 'serif'}}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
