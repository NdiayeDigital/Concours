import { Trophy, Award } from 'lucide-react';

export default function Recompenses() {
  const prizes = [
    {
      place: 2,
      title: "2ème Lauréat",
      reward: "25 000 FCFA",
      subReward: "Tablette Tactile + Trophée d'Argent",
      icon: <Award className="w-12 h-12 text-slate-300" />,
      bgClass: "bg-slate-900/95 border-slate-400/30",
      borderGlow: "shadow-slate-500/10",
      orderClass: "order-2 md:order-1",
      badgeText: "Vice-Champion",
      badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      items: ["Enveloppe de 25 000 FCFA", "Tablette tactile haute résolution", "Trophée officiel en argent", "Attestation de mérite"]
    },
    {
      place: 1,
      title: "Grand Vainqueur",
      reward: "50 000 FCFA",
      subReward: "Ordinateur Portable + Trophée d'Or",
      icon: <Trophy className="w-16 h-16 text-brand-gold-premium" />,
      bgClass: "bg-brand-blue-dark border-brand-gold-premium/60 relative md:-translate-y-4 scale-100 md:scale-105 z-10",
      borderGlow: "shadow-brand-gold-premium/15 ring-2 ring-brand-gold-premium/20",
      orderClass: "order-1 md:order-2",
      badgeText: "🏆 1ère PLACE",
      badgeColor: "bg-brand-gold-premium/25 text-brand-gold-light border-brand-gold-premium/40",
      items: ["Enveloppe de 50 000 FCFA", "Ordinateur portable professionnel", "Trophée officiel d'or de l'UIDT", "Attestation d'excellence académique"]
    },
    {
      place: 3,
      title: "3ème Lauréat",
      reward: "Tablette Tactile",
      subReward: "Trophée de Bronze + Attestation",
      icon: <Award className="w-12 h-12 text-amber-700" />,
      bgClass: "bg-[#251A14]/95 border-amber-800/35",
      borderGlow: "shadow-amber-900/10",
      orderClass: "order-3",
      badgeText: "3ème Marche",
      badgeColor: "bg-amber-800/20 text-amber-500 border-amber-800/30",
      items: ["Tablette tactile", "Trophée officiel en bronze", "Attestation de mérite", "Lots d'ouvrages académiques"]
    }
  ];

  return (
    <section id="recompenses" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] bg-brand-gold-premium/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-brand-gold-premium font-sans font-semibold tracking-widest text-xs uppercase block">
            DISTINCTIONS ET PRIX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue-dark">
            Des récompenses à la hauteur de votre talent
          </h2>
          <div className="w-16 h-1 bg-brand-gold-premium mx-auto mt-4 rounded-full"></div>
          <p className="text-brand-blue-dark/75 font-sans text-sm sm:text-base mt-2">
            Le jury décernera trois grands prix pour récompenser l'art de l'argumentation, la prestance oratoire et l'éloquence.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-5xl mx-auto items-stretch pt-6">
          {prizes.map((prize, idx) => (
            <div
              key={idx}
              className={`flex flex-col rounded-2xl border p-8 text-white shadow-xl hover:-translate-y-1 transition-all duration-300 ${prize.bgClass} ${prize.borderGlow} ${prize.orderClass}`}
            >
              {/* Badge */}
              <div className="self-center mb-6">
                <span className={`px-4 py-1 rounded-full border text-xxs font-bold tracking-widest uppercase ${prize.badgeColor}`}>
                  {prize.badgeText}
                </span>
              </div>

              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/5 rounded-2xl relative">
                  {prize.icon}
                  {prize.place === 1 && (
                    <div className="absolute inset-0 rounded-2xl border border-brand-gold-premium/30 animate-ping opacity-35"></div>
                  )}
                </div>
              </div>

              {/* Title & Reward */}
              <div className="text-center mb-8">
                <h3 className="text-lg font-sans font-medium text-white/70 tracking-wide uppercase text-xs">
                  {prize.title}
                </h3>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-brand-gold-light mt-1.5 leading-tight">
                  {prize.reward}
                </div>
                <div className="text-sm font-sans text-white/60 mt-1">
                  {prize.subReward}
                </div>
              </div>

              {/* Separator line */}
              <div className="h-px bg-white/10 w-full mb-8"></div>

              {/* Features/Items List */}
              <ul className="space-y-4 flex-grow font-sans text-sm text-white/85">
                {prize.items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-brand-gold-premium font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Decoration for 1st Place */}
              {prize.place === 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-premium via-brand-gold-light to-brand-gold-premium rounded-b-2xl"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
