import { Shield, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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
    <footer className="bg-brand-blue-dark text-white/80 border-t border-brand-gold-premium/20 py-16 relative overflow-hidden">
      {/* Decorative vertical divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-brand-gold-premium to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Logo & Commission details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-brand-gold-premium flex items-center justify-center bg-brand-blue-medium/50">
                <span className="text-brand-gold-premium font-serif font-bold text-xxs">CE</span>
              </div>
              <span className="text-white font-serif font-bold text-base tracking-wide">
                Club CE DEAO · UIDT Thiès
              </span>
            </div>
            
            <p className="text-white/60 font-sans text-xs leading-relaxed max-w-sm">
              Commission des Événements et Débats d'Art Oratoire. 
              Organisateur officiel du concours d'éloquence universitaire 2026 de l'Université Iba Der Thiam de Thiès.
            </p>
            
            <div className="flex flex-col space-y-2 text-xxs font-sans text-white/45 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-premium/70" />
                <span>Université Iba Der Thiam, Thiès, Sénégal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold-premium/70" />
                <span>contact@ce-deao-uidt.sn (fictif)</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-sans">
              <li>
                <button 
                  onClick={() => scrollToSection('presentation')} 
                  className="hover:text-brand-gold-light transition-colors text-left py-1"
                >
                  Présentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('recompenses')} 
                  className="hover:text-brand-gold-light transition-colors text-left py-1"
                >
                  Récompenses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pourquoi')} 
                  className="hover:text-brand-gold-light transition-colors text-left py-1"
                >
                  Pourquoi participer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('inscription')} 
                  className="hover:text-brand-gold-light transition-colors text-left py-1"
                >
                  Formulaire d'inscription
                </button>
              </li>
            </ul>
          </div>

          {/* Administrative and quick contacts */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2">
              Partenaires & Rôles
            </h4>
            <p className="text-xxs font-sans text-white/50 leading-relaxed">
              En collaboration avec les amicales d'étudiants de toutes les UFR et Instituts (SES, SET, SI, SANTE, IUT).
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center space-x-2 text-white/35 hover:text-brand-gold-premium font-sans text-xs transition-colors border border-white/10 rounded px-3 py-1.5 hover:border-brand-gold-premium/30 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Espace Administrateur</span>
              </button>
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="h-px bg-white/15 w-full my-8"></div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between text-xxs font-sans text-white/40 space-y-4 sm:space-y-0">
          <div>
            © 2026 Club CE DEAO — Université Iba Der Thiam de Thiès. Tous droits réservés.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-brand-gold-premium transition-colors cursor-pointer">Conditions Générales</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="hover:text-brand-gold-premium transition-colors cursor-pointer">Charte Oratoire</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
