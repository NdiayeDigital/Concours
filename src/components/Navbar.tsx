import { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-blue-dark/90 backdrop-blur-md border-b border-brand-gold-premium/20 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Round Gold Seal */}
            <div className="w-10 h-10 rounded-full border-2 border-brand-gold-premium flex items-center justify-center bg-brand-blue-dark/50 relative overflow-hidden group">
              <span className="text-brand-gold-premium font-serif font-bold text-xs tracking-wider group-hover:rotate-360 transition-transform duration-1000">CE</span>
              <div className="absolute inset-0 border border-brand-gold-light/20 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-white font-serif font-bold text-lg tracking-wide block leading-none">
                CE DEAO
              </span>
              <span className="text-brand-gold-premium font-sans text-xxs tracking-widest uppercase block mt-1">
                Université Iba Der Thiam
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('presentation')}
              className="text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer"
            >
              Présentation
            </button>
            <button
              onClick={() => scrollToSection('recompenses')}
              className="text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer"
            >
              Récompenses
            </button>
            <button
              onClick={() => scrollToSection('pourquoi')}
              className="text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer"
            >
              Pourquoi participer
            </button>
            <button
              onClick={() => scrollToSection('inscription')}
              className="text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer"
            >
              Inscription
            </button>
            
            <button
              onClick={onOpenAdmin}
              className="text-white/40 hover:text-brand-gold-premium font-sans text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Espace Administrateur"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('inscription')}
              className="bg-gradient-to-r from-brand-gold-premium to-brand-gold-light hover:from-brand-gold-light hover:to-brand-gold-premium text-brand-blue-dark font-sans font-bold text-sm py-2.5 px-6 rounded shadow-md hover:shadow-lg hover:shadow-brand-gold-premium/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
            >
              <span>Participer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onOpenAdmin}
              className="text-white/40 hover:text-brand-gold-premium p-1 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded text-white hover:text-brand-gold-light focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-blue-dark border-b border-brand-gold-premium/20 transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('presentation')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-brand-blue-medium hover:text-brand-gold-light font-sans text-base font-medium rounded transition-colors"
            >
              Présentation
            </button>
            <button
              onClick={() => scrollToSection('recompenses')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-brand-blue-medium hover:text-brand-gold-light font-sans text-base font-medium rounded transition-colors"
            >
              Récompenses
            </button>
            <button
              onClick={() => scrollToSection('pourquoi')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-brand-blue-medium hover:text-brand-gold-light font-sans text-base font-medium rounded transition-colors"
            >
              Pourquoi participer
            </button>
            <button
              onClick={() => scrollToSection('inscription')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-brand-blue-medium hover:text-brand-gold-light font-sans text-base font-medium rounded transition-colors"
            >
              Inscription
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left px-3 py-2 text-white/50 hover:text-brand-gold-premium font-sans text-sm flex items-center gap-2 transition-colors border-t border-white/5 mt-2 pt-3"
            >
              <Shield className="w-4 h-4" />
              <span>Espace Admin</span>
            </button>
            <div className="px-3 pt-3">
              <button
                onClick={() => scrollToSection('inscription')}
                className="w-full bg-gradient-to-r from-brand-gold-premium to-brand-gold-light text-brand-blue-dark font-sans font-bold text-center py-2.5 rounded shadow flex items-center justify-center space-x-2"
              >
                <span>S'inscrire au concours</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
