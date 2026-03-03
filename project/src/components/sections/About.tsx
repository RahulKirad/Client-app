import { Target, BookOpen, Leaf, ShieldCheck, Globe2, HandHeart } from 'lucide-react';

const mainContentHeaderColor = '#4A352F';
const mainContentIconBg = '#F3EDDC';
const mainContentBulletColor = '#4A352F';

export default function About() {
  return (
    <section id="about" className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2
            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-3"
            style={{ color: '#1a1a1a', fontFamily: 'var(--heading-font)' }}
          >
            ABOUT US
          </h2>
          <p
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: '#1a1a1a', fontFamily: 'var(--heading-font)' }}
          >
            Premium Sustainable Tote Bags
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* Left column - Modern Elegance + image */}
          <div>
            {/* Modern Elegance block */}
            <div className="mb-6">
              <p className="font-semibold mb-3 leading-snug" style={{ color: '#1a1a1a', fontFamily: 'var(--heading-font)' }}>
                Modern Elegance:{' '}
                <span className="font-normal" style={{ fontFamily: 'var(--body-font)', color: '#4b4338' }}>
                  Designs featuring clean lines, sustainable materials, and premium quality.
                </span>
              </p>
              <ul className="space-y-3 pl-0 list-none" style={{ fontFamily: 'var(--body-font)', color: '#4b4338' }}>
                <li className="flex gap-3 text-sm sm:text-base leading-relaxed">
                  <span className="flex-shrink-0 mt-0.5 text-[var(--beige-700)]" aria-hidden>•</span>
                  <span>We create tote bags that combine style with environmental responsibility.</span>
                </li>
                <li className="flex gap-3 text-sm sm:text-base leading-relaxed">
                  <span className="flex-shrink-0 mt-0.5 text-[var(--beige-700)]" aria-hidden>•</span>
                  <span>Crafted for businesses and individuals who value both aesthetics and sustainability.</span>
                </li>
              </ul>
            </div>

            {/* Image under Modern Elegance */}
            <img
              src="/images/aboutus/about2.png"
              alt="Cottonunique organic cotton tote bags with GOTS certification"
              className="w-full h-72 md:h-80 object-contain object-center -ml-4 lg:-ml-6"
            />
          </div>

          {/* Right column - top image + Main Content (Our Philosophy, Our Mission, Our Values) */}
          <div className="space-y-6 lg:-mt-56">
            {/* Top image */}
            <img
              src="/images/aboutus/about1.png"
              alt="Cottonunique sustainable tote bags and certifications"
              className="w-full h-80 md:h-96 object-cover"
            />

            <div>
              {/* Our Philosophy */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: mainContentIconBg }}
                  >
                    <BookOpen size={18} style={{ color: mainContentHeaderColor }} />
                  </div>
                  <h4
                    className="text-base sm:text-lg font-bold"
                    style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
                  >
                    Our Philosophy
                  </h4>
                </div>
                <div className="pl-12">
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: '#2d2d2d', fontFamily: 'var(--body-font)' }}
                  >
                    Creating luxurious, sustainable products that reflect our commitment to quality. Every tote bag is
                    designed with care and attention to detail.
                  </p>
                </div>
              </div>

              <div className="h-px w-full mb-6" style={{ backgroundColor: '#e5e0d8' }} />

              {/* Our Mission */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: mainContentIconBg }}
                  >
                    <Target size={18} style={{ color: mainContentHeaderColor }} />
                  </div>
                  <h4
                    className="text-base sm:text-lg font-bold"
                    style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
                  >
                    Our Mission
                  </h4>
                </div>
                <ul className="space-y-3 pl-12" style={{ fontFamily: 'var(--body-font)', color: '#2d2d2d' }}>
                  <li className="flex gap-3 text-xs sm:text-sm">
                    <span
                      className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: mainContentBulletColor }}
                    />
                    <span>Deliver premium, sustainable tote bags that meet the highest global standards.</span>
                  </li>
                  <li className="flex gap-3 text-xs sm:text-sm">
                    <span
                      className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: mainContentBulletColor }}
                    />
                    <span>Ethically sourced, intelligently designed, and export-ready products.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Our Values - four cards in one row on large screens */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 items-stretch">
          {/* Sustainability card */}
          <div
            className="rounded-lg px-4 py-3 flex flex-col items-center justify-center text-center min-h-[150px]"
            style={{ backgroundColor: '#FFF9F0' }}
          >
            <div className="flex justify-center mb-1.5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                style={{ backgroundColor: '#F3EDDC' }}
              >
                <Leaf size={16} style={{ color: mainContentHeaderColor }} />
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold mb-1 leading-tight"
              style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
            >
              Sustainability First
            </h3>
            <p
              className="text-xs sm:text-sm max-w-[240px] mx-auto leading-snug"
              style={{ color: '#4A352F', fontFamily: 'var(--body-font)' }}
            >
              100% organic cotton with GOTS certification.
            </p>
          </div>

          {/* Quality card */}
          <div
            className="rounded-lg px-4 py-3 flex flex-col items-center justify-center text-center min-h-[150px]"
            style={{ backgroundColor: '#FFF9F0' }}
          >
            <div className="flex justify-center mb-1.5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                style={{ backgroundColor: '#F3EDDC' }}
              >
                <ShieldCheck size={16} style={{ color: mainContentHeaderColor }} />
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold mb-1 leading-tight"
              style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
            >
              Quality Excellence
            </h3>
            <p
              className="text-xs sm:text-sm max-w-[240px] mx-auto leading-snug"
              style={{ color: '#4A352F', fontFamily: 'var(--body-font)' }}
            >
              Premium materials and craftsmanship in every product.
            </p>
          </div>

          {/* Export-ready card */}
          <div
            className="rounded-lg px-4 py-3 flex flex-col items-center justify-center text-center min-h-[150px]"
            style={{ backgroundColor: '#FFF9F0' }}
          >
            <div className="flex justify-center mb-1.5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                style={{ backgroundColor: '#F3EDDC' }}
              >
                <Globe2 size={16} style={{ color: mainContentHeaderColor }} />
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold mb-1 leading-tight"
              style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
            >
              Export Ready
            </h3>
            <p
              className="text-xs sm:text-sm max-w-[240px] mx-auto leading-snug"
              style={{ color: '#4A352F', fontFamily: 'var(--body-font)' }}
            >
              Designed for international markets with consistent quality control.
            </p>
          </div>

          {/* Ethical sourcing card */}
          <div
            className="rounded-lg px-4 py-3 flex flex-col items-center justify-center text-center min-h-[150px]"
            style={{ backgroundColor: '#FFF9F0' }}
          >
            <div className="flex justify-center mb-1.5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                style={{ backgroundColor: '#F3EDDC' }}
              >
                <HandHeart size={16} style={{ color: mainContentHeaderColor }} />
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold mb-1 leading-tight"
              style={{ color: mainContentHeaderColor, fontFamily: 'var(--heading-font)' }}
            >
              Ethical Sourcing
            </h3>
            <p
              className="text-xs sm:text-sm max-w-[240px] mx-auto leading-snug"
              style={{ color: '#4A352F', fontFamily: 'var(--body-font)' }}
            >
              Fair, transparent supply chains from farm to finished tote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
