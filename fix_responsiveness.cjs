const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Preloader Logo
const preloaderOld = `<div class="text-brand-gold-premium font-serif font-bold text-3xl sm:text-4xl tracking-wider select-none drop-shadow-[0_0_15px_rgba(249,115,22,0.55)] animate-pulse">
        EA
      </div>`;
const preloaderNew = `<div class="select-none drop-shadow-[0_0_15px_rgba(249,115,22,0.55)] animate-pulse">
        <img src="/Logo.png" alt="Ecom Academie" class="h-20 sm:h-24 w-auto object-contain dark:invert" />
      </div>`;
html = html.replace(preloaderOld, preloaderNew);
// Fallback if formatting was slightly different
if (!html.includes(preloaderNew)) {
  html = html.replace(/>\s*EA\s*<\/div>/g, `><img src="/Logo.png" alt="Ecom Academie" class="h-20 sm:h-24 w-auto object-contain dark:invert" /></div>`);
}

// 2. Fix Formations Grid Responsiveness
// I had previously changed it to grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6
html = html.replace(/grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6');
html = html.replace(/grid-cols-2 lg:grid-cols-4 gap-6/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6');

// Revert font sizes that were artificially reduced for grid-cols-2
html = html.replace(/text-xs sm:text-lg font-serif/g, 'text-lg sm:text-xl font-serif');
html = html.replace(/text-\[10px\] sm:text-xs font-sans mb-2 sm:mb-4/g, 'text-xs sm:text-sm font-sans mb-4');
html = html.replace(/text-\[10px\] sm:text-xs text-black\/70/g, 'text-xs text-black/70');

// 3. General responsiveness tweaks
// Ensure max-w-7xl has proper padding on mobile
// Make sure padding on mobile is consistent
html = html.replace(/px-4 sm:px-6/g, 'px-5 sm:px-6');
// Adjust Hero typography
html = html.replace(/text-3xl sm:text-4xl md:text-5xl lg:text-6xl/g, 'text-4xl sm:text-5xl lg:text-6xl');

// Save changes
fs.writeFileSync('index.html', html);
console.log('Responsiveness and preloader updated.');
