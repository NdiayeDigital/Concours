import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Target Date: 10 Juillet 2026 at 23h59
    const targetDate = new Date('2026-07-10T23:59:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately on mount
    calculateTime();
    
    // Set interval to update every second
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  const timerItems = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-blue-dark relative overflow-hidden text-white border-y border-brand-gold-premium/10">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,58,143,0.4)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-gold-premium font-sans text-sm font-semibold uppercase tracking-widest bg-brand-gold-premium/5 border border-brand-gold-premium/20 px-4 py-1.5 rounded-full">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Clôture des inscriptions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">
              Le temps presse. Saisissez votre chance !
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base max-w-lg mx-auto">
              Les candidatures seront closes le 10 Juillet 2026 à 23h59 précises.
            </p>
          </div>

          {/* Countdown Display */}
          {isExpired ? (
            <div className="p-8 bg-red-950/20 border border-red-500/20 rounded-2xl max-w-xl">
              <span className="text-2xl md:text-3xl font-serif font-bold text-red-400 block tracking-wide uppercase">
                Les inscriptions sont closes
              </span>
              <p className="text-white/60 font-sans text-sm mt-2">
                Le délai de dépôt des candidatures est dépassé. Merci à tous les participants.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl w-full pt-4">
              {timerItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-brand-blue-medium/30 border border-brand-gold-premium/15 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden group hover:border-brand-gold-premium/40 transition-all duration-300 shadow-lg"
                >
                  {/* Glowing background card element */}
                  <div className="absolute -inset-px bg-gradient-to-t from-brand-gold-premium/0 to-brand-gold-premium/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white block tracking-tight">
                    {formatNumber(item.value)}
                  </span>
                  
                  <span className="text-brand-gold-premium font-sans text-xs sm:text-sm font-medium uppercase tracking-widest block mt-3">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Small reminder tag */}
          {!isExpired && (
            <div className="text-white/40 font-sans text-xs">
              Heure locale de Thiès (GMT) • UTC+0
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
