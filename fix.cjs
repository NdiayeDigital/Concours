const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix remaining text-white
html = html.replace(/class="([^"]*)"/g, (match, classes) => {
  let classList = classes.split(/\s+/);
  let newClassList = classList.map(c => {
    if (c === 'text-white' && !classList.includes('dark:text-white')) {
      return 'text-brand-blue-dark dark:text-white';
    }
    if (c.startsWith('text-white/')) {
      const opacity = c.split('/')[1];
      if (!classList.includes(`dark:text-white/${opacity}`)) {
        return `text-black/${opacity} dark:text-white/${opacity}`;
      }
    }
    if (c === 'text-white/85') {
      return 'text-black/80 dark:text-white/85'; // Custom mapping
    }
    return c;
  });
  return 'class="' + [...new Set(newClassList)].join(' ') + '"';
});

// 2. Formations grid: 2 per line on mobile
html = html.replace('grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch pt-6', 'grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto items-stretch pt-6');
html = html.replace(/text-sm sm:text-lg font-serif font-bold text-brand-blue-dark dark:text-white/g, 'text-xs sm:text-lg font-serif font-bold text-brand-blue-dark dark:text-white');
html = html.replace(/text-xs font-sans mb-4 leading-relaxed/g, 'text-[10px] sm:text-xs font-sans mb-2 sm:mb-4 leading-relaxed');
html = html.replace(/text-xs text-black\/70 dark:text-white\/70/g, 'text-[10px] sm:text-xs text-black/70 dark:text-white/70');

// 3. Pourquoi Rejoindre Ecom Academy - Carousel Auto
const gridStr = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">';
const marqueeStr = `<div class="overflow-hidden w-full relative max-w-7xl mx-auto group">
      <div class="flex animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] gap-6 w-max">`;
if (html.includes(gridStr)) {
  html = html.replace(gridStr, marqueeStr);
  
  // Clone the items in JS when the page loads
  const jsMarquee = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const marqueeContainer = document.querySelector('.animate-\\\\[marquee_25s_linear_infinite\\\\]');
      if (marqueeContainer) {
        // Clone items to create a seamless loop
        const items = Array.from(marqueeContainer.children);
        items.forEach(item => {
          const clone = item.cloneNode(true);
          marqueeContainer.appendChild(clone);
        });
      }
    });
  </script>
</body>`;
  html = html.replace('</body>', jsMarquee);
}

// Ensure the items inside marquee have a fixed width otherwise they will shrink
html = html.replace(/class="bg-brand-blue-dark\/60 border-l-4/g, 'class="w-[280px] sm:w-[350px] shrink-0 bg-brand-blue-dark/60 border-l-4');

// 4. Update tailwind config to add marquee animation
if (!html.includes('marquee: {')) {
  html = html.replace("extend: {", "extend: {\n          keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } },\n          animation: { marquee: 'marquee 25s linear infinite' },");
}

fs.writeFileSync('index.html', html);
console.log('Fixes applied.');
