import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  ufr: string;
}

export default function Temoignages() {
  const testimonials: Testimonial[] = [
    {
      quote: "Participer aux séances d'éloquence du Club CE DEAO a transformé ma façon de m'exprimer. Ce concours est l'occasion rêvée d'extérioriser nos idées et d'apprendre à structurer une argumentation solide devant un vrai public.",
      author: "Fatou Bineta Diop",
      role: "Licence 3, Économie Appliquée",
      ufr: "UFR-SES"
    },
    {
      quote: "En tant qu'étudiant en sciences, on pense souvent que l'éloquence est réservée aux juristes. C'est faux. Savoir défendre un projet, convaincre des investisseurs ou vulgariser un sujet complexe est une compétence cruciale pour tout ingénieur.",
      author: "Mouhamadou Mansour Sy",
      role: "Master 1, Génie Logiciel",
      ufr: "UFR-SI"
    },
    {
      quote: "L'art oratoire est une thérapie contre la timidité. Ce concours donne la parole aux étudiants de toutes les facultés de l'UIDT. Une initiative inspirante qui renforce la cohésion universitaire et l'excellence académique.",
      author: "Aïssatou Kane",
      role: "Licence 2, Médecine",
      ufr: "UFR-SANTE"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-20 md:py-24 bg-[#0A1F5C] text-white relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-blue-medium/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="text-brand-gold-premium font-sans font-semibold tracking-widest text-xs uppercase block">
            TÉMOIGNAGES D'ÉTUDIANTS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">
            Ce qu'en disent nos pairs
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-brand-blue-medium/15 border border-brand-gold-premium/15 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl min-h-[320px] sm:min-h-[260px] flex flex-col justify-between">
          
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-brand-gold-premium/10 rounded-full text-brand-gold-premium">
              <Quote className="w-6 h-6 transform rotate-180" />
            </div>
          </div>

          {/* Testimonial Slides */}
          <div className="relative overflow-hidden flex-grow flex items-center justify-center">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ease-in-out absolute w-full ${
                  idx === currentIndex 
                    ? 'opacity-100 translate-x-0 relative pointer-events-auto' 
                    : 'opacity-0 translate-x-12 pointer-events-none'
                }`}
              >
                <p className="text-white/90 font-serif italic text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                  “ {testimonial.quote} ”
                </p>
                <div className="mt-8 space-y-1">
                  <div className="font-sans font-bold text-brand-gold-light text-base tracking-wide">
                    {testimonial.author}
                  </div>
                  <div className="font-sans text-xs text-white/50">
                    {testimonial.role} • <span className="text-brand-gold-premium/70 font-semibold">{testimonial.ufr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Manual controls (Arrows) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-16 z-20">
            <button
              onClick={handlePrev}
              className="p-2 bg-brand-blue-dark/80 hover:bg-brand-gold-premium border border-brand-gold-premium/30 hover:border-brand-gold-premium hover:text-brand-blue-dark text-white rounded-full transition-all duration-300 shadow cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-16 z-20">
            <button
              onClick={handleNext}
              className="p-2 bg-brand-blue-dark/80 hover:bg-brand-gold-premium border border-brand-gold-premium/30 hover:border-brand-gold-premium hover:text-brand-blue-dark text-white rounded-full transition-all duration-300 shadow cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators (Dots) */}
          <div className="flex justify-center space-x-2.5 mt-8 z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? 'bg-brand-gold-premium w-6' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
