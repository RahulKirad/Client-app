import { Target, Award } from 'lucide-react';

export default function About() {

  return (
    <section id="about" className="pt-32 pb-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Text Content */}
          <div className="space-y-10">
            {/* Large Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-8xl font-bold leading-tight mb-4" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
                ABOUT US
              </h2>
              <p className="text-xl sm:text-2xl font-semibold mb-8" style={{color: '#1a1a1a', fontFamily: 'var(--heading-font)'}}>
                Premium Sustainable Tote Bags
              </p>
            </div>

            {/* Main Description */}
            <div className="space-y-4">
              <p className="body-text-lg" style={{color: 'var(--text-primary)'}}>
                <strong>Modern Elegance:</strong> Designs featuring clean lines, sustainable materials, and premium quality.
              </p>
              <ul className="space-y-2 pl-4">
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>We create tote bags that combine style with environmental responsibility</span>
                </li>
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>Crafted for businesses and individuals who value both aesthetics and sustainability</span>
                </li>
              </ul>
            </div>

            {/* Our Mission */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Target size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h3 className="heading-h4" style={{color: 'var(--heading-color)'}}>Our Mission</h3>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>Deliver premium, sustainable tote bags that meet the highest global standards</span>
                </li>
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>Ethically sourced, intelligently designed, and export-ready products</span>
                </li>
              </ul>
            </div>

            {/* Our Values */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'var(--beige-200)'}}>
                  <Award size={24} style={{color: 'var(--beige-700)'}} />
                </div>
                <h3 className="heading-h4" style={{color: 'var(--heading-color)'}}>Our Values</h3>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span><strong>Sustainability First:</strong> 100% organic cotton with GOTS certification</span>
                </li>
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span><strong>Quality Excellence:</strong> Premium materials and craftsmanship in every product</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Side - Images and Philosophy */}
          <div className="space-y-6">
            {/* Smaller Image at Top */}
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/new/WhatsApp Image 2025-12-27 at 6.17.04 PM.jpeg"
                  alt="Cottoniq Products"
                  className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="space-y-4">
              <h3 className="heading-h3" style={{color: 'var(--heading-color)'}}>
                Our Philosophy
              </h3>
              <ul className="space-y-2">
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>Creating luxurious, sustainable products that reflect our commitment to quality</span>
                </li>
                <li className="body-text flex items-start gap-2" style={{color: 'var(--text-primary)'}}>
                  <span className="text-[var(--beige-700)] mt-1">•</span>
                  <span>Every tote bag is designed with care and attention to detail</span>
                </li>
              </ul>
            </div>

            {/* Larger Main Image */}
            <div className="relative group mt-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/new/WhatsApp Image 2025-12-27 at 6.17.03 PM (2).jpeg"
                  alt="About Cottoniq"
                  className="w-full h-[300px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
