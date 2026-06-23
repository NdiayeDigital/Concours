const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. WhatsApp link fix
content = content.replace(/https:\/\/wa\.me\/221784799882/g, 'https://wa.me/221756490565');

// 2. Preloader logo
content = content.replace(
  '<div class="text-brand-gold-premium font-serif font-bold text-3xl sm:text-4xl tracking-wider select-none drop-shadow-[0_0_15px_rgba(249,115,22,0.55)] animate-pulse"><img src="/Logo.png" alt="Ecom Academie" class="h-20 sm:h-24 w-auto object-contain dark:invert" /></div>',
  '<div class="text-brand-gold-premium font-serif font-bold tracking-wider select-none drop-shadow-[0_0_15px_rgba(249,115,22,0.55)] animate-pulse"><img src="/Logo.png" alt="Ecom Academie" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-brand-gold-premium/30 dark:border-white/10 dark:invert" /></div>'
);

// 3. Preloader Text under the logo
content = content.replace(
  '<div class="mt-2 text-black/50 dark:text-white/50 font-sans text-xs uppercase tracking-[0.3em] text-center">',
  '<div class="mt-4 text-brand-blue-dark dark:text-white font-serif font-bold text-xl sm:text-2xl tracking-wide text-center">Ecom Academie</div>\n    <div class="mt-1 text-black/50 dark:text-white/50 font-sans text-xs uppercase tracking-[0.3em] text-center">'
);

// 4. Footer contact info
content = content.replace(
  '<span class="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest font-sans">Formation E-commerce 2026 — Shopify ·\n          Alibaba · Marketing · Vente en ligne</span>\n      </div>\n\n      <div class="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-sans px-4">',
  `<span class="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest font-sans">Formation E-commerce 2026 — Shopify ·
          Alibaba · Marketing · Vente en ligne</span>
          
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 pt-4 pb-2">
          <a href="mailto:ecomacademie.th@gmail.com" class="text-black/70 dark:text-white/70 hover:text-brand-gold-premium font-sans text-xs flex items-center gap-2 transition-colors">
            <i data-lucide="mail" class="w-4 h-4"></i>
            <span>ecomacademie.th@gmail.com</span>
          </a>
          <a href="https://wa.me/221756490565" class="text-black/70 dark:text-white/70 hover:text-brand-gold-premium font-sans text-xs flex items-center gap-2 transition-colors">
            <i data-lucide="phone" class="w-4 h-4"></i>
            <span>+221 75 649 05 65</span>
          </a>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-sans px-4">`
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Update complete');
