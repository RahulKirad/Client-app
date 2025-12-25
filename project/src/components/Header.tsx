import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Products', path: '#products' },
    { name: 'Corporate Solutions', path: '#corporate' },
    { name: 'Sustainability', path: '#sustainability' },
    { name: 'Export', path: '#export' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (path: string) => {
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-[var(--beige-300)] transition-all duration-300 animate-fade-in soft-shadow" style={{fontFamily: 'var(--body-font)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('#home')}>
            <img
              src="/images/WhatsApp Image 2025-11-01 at 11.44.47 PM.jpeg"
              alt="Cottoniq Logo"
              className="h-12 w-auto transform group-hover:scale-110 transition-transform duration-300 rounded-lg p-1"
            />
            <span className="text-2xl font-bold" style={{color: 'var(--beige-700)', fontFamily: 'var(--heading-font)'}}>COTTONIQ</span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className="text-[var(--text-color)] hover:text-[var(--beige-700)] font-medium text-sm transition-all duration-200 relative group animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`, fontFamily: 'var(--body-font)'}}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--beige-600)'}}></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-6 py-2.5 rounded transition-all duration-200 flex items-center space-x-2 soft-shadow font-medium"
              style={{backgroundColor: 'var(--beige-400)', color: 'var(--text-color)', fontFamily: 'var(--body-font)'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-500)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--beige-400)'}
            >
              <ShoppingBag size={18} />
              <span>Get a Quote</span>
            </button>
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--beige-100)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} style={{color: 'var(--text-color)'}} /> : <Menu size={24} style={{color: 'var(--text-color)'}} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--beige-300)] soft-shadow">
          <nav className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className="block w-full text-left px-4 py-3 text-[var(--text-color)] hover:bg-[var(--beige-100)] hover:text-[var(--primary-color)] rounded-lg transition-all duration-200 font-medium text-sm"
                style={{fontFamily: 'var(--body-font)'}}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded hover:bg-[var(--primary-dark-color)] transition-all duration-200 flex items-center justify-center space-x-2 font-medium soft-shadow"
              style={{fontFamily: 'var(--body-font)'}}
            >
              <ShoppingBag size={18} />
              <span>Get a Quote</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
