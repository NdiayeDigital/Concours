import { Mic, Scale, Trophy, GraduationCap, Star } from 'lucide-react';

export default function Pourquoi() {
  const reasons = [
    {
      icon: <Mic className="w-6 h-6 text-brand-gold-premium" />,
      title: "Développer l'art oratoire",
      desc: "Apprenez à maîtriser votre voix, votre gestuelle, votre posture et votre souffle pour captiver un auditoire exigeant."
    },
    {
      icon: <Scale className="w-6 h-6 text-brand-gold-premium" />,
      title: "Valoriser ses compétences juridiques & argumentatives",
      desc: "Structurez des plaidoiries rigoureuses, mobilisez le droit et la logique, et apprenez à réfuter les objections avec finesse."
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-gold-premium" />,
      title: "Gagner des récompenses prestigieuses",
      desc: "Tentez de remporter des prix exceptionnels : enveloppes financières, ordinateurs portables, tablettes tactiles et trophées d'excellence."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-gold-premium" />,
      title: "Représenter fièrement son UFR",
      desc: "Portez haut les couleurs de votre département d'études (SES, SET, SANTE, SI ou IUT) face à la concurrence inter-UFR."
    },
    {
      icon: <Star className="w-6 h-6 text-brand-gold-premium" />,
      title: "Participer à un événement de haut niveau",
      desc: "Inscrivez votre nom dans l'histoire de l'UIDT en participant à la première édition de cette joute intellectuelle organisée par le Club CE DEAO."
    }
  ];

  return (
    <section id="pourquoi" className="py-20 md:py-28 bg-[#F8F6F0] border-t border-brand-blue-dark/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Header & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-brand-gold-premium font-sans font-semibold tracking-widest text-xs uppercase block">
              POURQUOI REJOINDRE L'AVENTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue-dark leading-tight">
              Osez prendre la parole en public
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-brand-blue-dark/75 font-sans text-base leading-relaxed md:pt-6">
              Que vous visiez une carrière d'avocat, de leader, d'ingénieur ou d'entrepreneur, l'art oratoire est la compétence transversale la plus puissante. Ce concours est le tremplin parfait pour tester vos limites, dépasser le trac et briller.
            </p>
          </div>
        </div>

        {/* Reasons Grid (5 cards layout: e.g., 3-column then 2-column or simply an elegant custom grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(0, 3).map((reason, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-brand-gold-premium hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4"
            >
              <div className="p-3 bg-brand-cream rounded-lg w-fit">
                {reason.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-brand-blue-dark leading-snug">
                {reason.title}
              </h3>
              <p className="text-brand-blue-dark/70 font-sans text-sm leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}

          {/* Centralize the remaining two cards on large screens */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-4xl lg:mx-auto lg:w-full">
            {reasons.slice(3, 5).map((reason, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-brand-gold-premium hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4"
              >
                <div className="p-3 bg-brand-cream rounded-lg w-fit">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-blue-dark leading-snug">
                  {reason.title}
                </h3>
                <p className="text-brand-blue-dark/70 font-sans text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
