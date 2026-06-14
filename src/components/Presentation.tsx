import { Award, GraduationCap, Coins, Users } from 'lucide-react';

export default function Presentation() {
  const stats = [
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-gold-premium" />,
      value: "1ère Édition",
      label: "Un événement historique à l'UIDT"
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold-premium" />,
      value: "Toutes UFR",
      label: "Ouvert à tous les étudiants de Thiès"
    },
    {
      icon: <Coins className="w-6 h-6 text-brand-gold-premium" />,
      value: "75 000 FCFA",
      label: "De dotation financière totale"
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold-premium" />,
      value: "3 Podiums",
      label: "Distinctions et lots prestigieux"
    }
  ];

  return (
    <section id="presentation" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      {/* Decorative background details */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-brand-gold-premium/10 m-12 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-brand-gold-premium/10 m-12 pointer-events-none hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text & Introduction Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-brand-gold-premium font-sans font-semibold tracking-widest text-xs uppercase block">
                PRÉSENTATION DU CONCOURS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue-dark">
                L'art de convaincre, la force de l'argument
              </h2>
            </div>
            
            <div className="space-y-6 text-brand-blue-dark/80 font-sans text-base leading-relaxed">
              <p>
                Le <strong>Concours de Plaidoirie Universitaire de l'Université Iba Der Thiam de Thiès (UIDT)</strong> est bien plus qu'une simple compétition d'art oratoire. Organisé par le dynamique <strong>Club CE DEAO</strong>, il s'impose comme une tribune d'excellence pour célébrer la rhétorique, la rigueur juridique et la force de persuasion.
              </p>
              <p>
                Cette joute oratoire est une opportunité unique offerte à chaque étudiant de structurer une argumentation convaincante, de défendre une cause sociétale ou académique majeure, et de faire briller ses capacités d'expression devant ses pairs et un jury d'exception composé d'universitaires et de professionnels.
              </p>
              <p>
                Que vous soyez en droit, en médecine, en ingénierie ou en économie, venez exprimer votre passion, aiguiser votre sens critique et porter fièrement les couleurs de votre UFR ou Institut.
              </p>
            </div>
          </div>

          {/* Quote & Stats Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Blaise Pascal Quote */}
            <div className="relative p-8 md:p-10 bg-brand-blue-dark text-white rounded-2xl shadow-xl overflow-hidden group border-t-4 border-brand-gold-premium">
              {/* Subtle background seal */}
              <div className="absolute -right-8 -bottom-8 w-44 h-44 text-white/5 pointer-events-none transform rotate-12 transition-transform duration-500 group-hover:rotate-45">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 60c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z"/>
                </svg>
              </div>

              <span className="text-4xl font-serif text-brand-gold-premium leading-none block mb-2">“</span>
              <blockquote className="font-serif italic text-lg sm:text-xl text-white/90 leading-relaxed mb-6">
                L'éloquence est la peinture de la pensée.
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-px bg-brand-gold-premium"></div>
                <cite className="font-sans text-xs text-brand-gold-light uppercase tracking-widest not-italic">
                  Blaise Pascal
                </cite>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-white p-5 rounded-xl border border-brand-blue-dark/5 shadow-sm hover:shadow-md hover:border-brand-gold-premium/30 transition-all duration-300 flex flex-col items-start space-y-2.5"
                >
                  <div className="p-2 bg-brand-cream rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold font-serif text-brand-blue-dark block">
                      {stat.value}
                    </span>
                    <span className="text-xs text-brand-blue-dark/65 font-sans leading-tight block">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
