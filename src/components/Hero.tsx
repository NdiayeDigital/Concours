import { MapPin, Calendar, Trophy, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToInscription = () => {
    const element = document.getElementById('inscription');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 md:py-32 flex items-center bg-gradient-to-b from-[#0A1F5C] via-[#1A3A8F] to-[#0A1F5C] overflow-hidden">
      {/* Background abstract glowing circles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-brand-gold-premium/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[40rem] h-[40rem] bg-brand-blue-medium/30 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between px-10 md:px-20">
        <div className="w-px h-full bg-gradient-to-b from-brand-gold-premium to-transparent"></div>
        <div className="w-px h-full bg-gradient-to-b from-brand-gold-premium to-transparent hidden md:block"></div>
        <div className="w-px h-full bg-gradient-to-b from-brand-gold-premium to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-gold-premium/15 border border-brand-gold-premium/45 px-4.5 py-1.5 rounded-full text-brand-gold-light text-xs font-semibold uppercase tracking-wider animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-gold-light animate-pulse"></span>
              <span>Organisé par le Club CE DEAO — UIDT Thiès</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-wide">
                Concours de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-premium via-brand-gold-light to-brand-gold-premium">Plaidoirie</span> Universitaire
              </h1>
              <p className="text-white/80 text-base sm:text-lg md:text-xl font-sans font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Rejoignez l'arène de l'éloquence, défendez vos convictions avec rigueur, et faites briller l'art oratoire de votre UFR devant un jury prestigieux.
              </p>
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg sm:max-w-none mx-auto lg:mx-0 pt-4">
              {/* Location */}
              <div className="flex items-center space-x-3 bg-brand-blue-dark/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md hover:border-brand-gold-premium/30 transition-all duration-300">
                <div className="p-2.5 bg-brand-gold-premium/10 rounded-lg text-brand-gold-premium">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-white/50 text-xs block font-sans">📍 Lieu</span>
                  <span className="text-white text-sm font-semibold block font-sans leading-tight">Amphi Principal UIDT</span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-3 bg-brand-blue-dark/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md hover:border-brand-gold-premium/30 transition-all duration-300">
                <div className="p-2.5 bg-brand-gold-premium/10 rounded-lg text-brand-gold-premium">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-white/50 text-xs block font-sans">🗓 Clôture</span>
                  <span className="text-white text-sm font-semibold block font-sans leading-tight">10 Juillet 2026</span>
                </div>
              </div>

              {/* Prize */}
              <div className="flex items-center space-x-3 bg-brand-blue-dark/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-md hover:border-brand-gold-premium/30 transition-all duration-300">
                <div className="p-2.5 bg-brand-gold-premium/10 rounded-lg text-brand-gold-premium">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-white/50 text-xs block font-sans">🏆 Grand Prix</span>
                  <span className="text-white text-sm font-semibold block font-sans leading-tight">50 000 FCFA + Lot</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToInscription}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-gold-premium to-brand-gold-light hover:from-brand-gold-light hover:to-brand-gold-premium text-brand-blue-dark font-sans font-bold py-4 px-8 rounded shadow-lg shadow-brand-gold-premium/20 hover:shadow-brand-gold-premium/35 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span>Je m'inscris au concours</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('presentation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-sans font-medium py-4 px-8 rounded transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                Découvrir l'événement
              </button>
            </div>
          </div>

          {/* Animated Seal */}
          <div className="lg:col-span-5 flex justify-center items-center py-8 lg:py-0">
            <div className="relative group select-none">
              {/* Seal glow backdrop */}
              <div className="absolute inset-0 bg-brand-gold-premium/10 rounded-full blur-[40px] group-hover:bg-brand-gold-premium/20 transition-all duration-700"></div>
              
              {/* Rotating SVG Seal */}
              <svg 
                viewBox="0 0 200 200" 
                className="w-64 h-64 sm:w-80 sm:h-80 md:w-[24rem] md:h-[24rem] animate-spin-slow drop-shadow-[0_10px_20px_rgba(201,168,76,0.25)] filter"
              >
                {/* Circle Path for Text */}
                <path 
                  id="sealTextPath" 
                  d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" 
                  fill="none" 
                />
                
                {/* Outer concentric gold rings */}
                <circle cx="100" cy="100" r="92" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="72" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                
                {/* Inner seal body */}
                <circle cx="100" cy="100" r="70" fill="#0A1F5C" stroke="#C9A84C" strokeWidth="2" />
                <circle cx="100" cy="100" r="66" fill="none" stroke="#E8C96A" strokeWidth="0.5" />

                {/* Scales of Justice Graphic in center */}
                {/* Pedestal/Base */}
                <path d="M 85,138 L 115,138 M 90,135 L 110,135 M 95,130 L 105,130" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
                {/* Main Pillar */}
                <line x1="100" y1="78" x2="100" y2="130" stroke="#C9A84C" strokeWidth="3" />
                {/* Horizontal Beam */}
                <line x1="75" y1="84" x2="125" y2="84" stroke="#C9A84C" strokeWidth="2.5" />
                {/* Left scale string & pan */}
                <line x1="75" y1="84" x2="68" y2="108" stroke="#C9A84C" strokeWidth="1" />
                <line x1="75" y1="84" x2="82" y2="108" stroke="#C9A84C" strokeWidth="1" />
                <path d="M 65,108 Q 75,114 85,108" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                {/* Right scale string & pan */}
                <line x1="125" y1="84" x2="118" y2="108" stroke="#C9A84C" strokeWidth="1" />
                <line x1="125" y1="84" x2="132" y2="108" stroke="#C9A84C" strokeWidth="1" />
                <path d="M 115,108 Q 125,114 135,108" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                {/* Center Star / Law balance */}
                <polygon points="100,70 102,74 106,75 103,78 104,82 100,80 96,82 97,78 94,75 98,74" fill="#E8C96A" />

                {/* Circular Text */}
                <text fill="#C9A84C" className="font-serif font-bold tracking-widest text-[9.8px]">
                  <textPath href="#sealTextPath" startOffset="0%">
                    • UNIVERSITÉ IBA DER THIAM DE THIÈS • CLUB CE DEAO • 2026
                  </textPath>
                </text>
              </svg>

              {/* Decorative hovering seal badge for extra depth */}
              <div className="absolute inset-0 border border-brand-gold-premium/15 rounded-full scale-110 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
