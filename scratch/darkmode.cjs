const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Enable Tailwind darkMode
if (!html.includes("darkMode: 'class'")) {
  html = html.replace('theme: {', "darkMode: 'class',\n      theme: {");
}

// Add dark class to html
html = html.replace('<html lang="fr">', '<html lang="fr" class="dark">');

// We need a smart replacement function to avoid replacing already replaced classes
function replaceClass(source, target) {
  // Regex ensures we match exactly the class, not preceded or followed by dark: or other modifiers
  // This is tricky. A simple split and map over class="..." attributes is safest.
}

// Better approach: use regex to find all class="..." and replace inside them
html = html.replace(/class="([^"]*)"/g, (match, classes) => {
  let classList = classes.split(/\s+/);
  let newClassList = classList.map(c => {
    switch (c) {
      case 'bg-black': return 'bg-white dark:bg-black';
      case 'bg-brand-blue-dark': return 'bg-brand-cream dark:bg-brand-blue-dark';
      case 'text-white': return 'text-brand-blue-dark dark:text-white';
      case 'text-brand-blue-dark': return 'text-brand-blue-dark dark:text-white';
      case 'bg-white': return 'bg-white dark:bg-[#111111]'; // Use custom dark for sections
      case 'from-black': return 'from-white dark:from-black';
      case 'to-black': return 'to-white dark:to-black';
      case 'via-[#111111]': return 'via-gray-100 dark:via-[#111111]';
      case 'bg-white/5': return 'bg-black/5 dark:bg-white/5';
      case 'text-white/80': return 'text-black/80 dark:text-white/80';
      case 'text-white/60': return 'text-black/60 dark:text-white/60';
      case 'text-white/70': return 'text-black/70 dark:text-white/70';
      case 'text-white/50': return 'text-black/50 dark:text-white/50';
      case 'text-white/40': return 'text-black/40 dark:text-white/40';
      case 'text-white/20': return 'text-black/20 dark:text-white/20';
      case 'border-white/10': return 'border-black/10 dark:border-white/10';
      case 'bg-brand-blue-dark/95': return 'bg-white/95 dark:bg-brand-blue-dark/95';
      case 'bg-brand-blue-dark/5': return 'bg-black/5 dark:bg-brand-blue-dark/5';
      case 'border-brand-blue-dark/15': return 'border-black/15 dark:border-brand-blue-dark/15';
      case 'border-brand-blue-dark/5': return 'border-black/5 dark:border-brand-blue-dark/5';
      case 'divide-brand-blue-dark/5': return 'divide-black/5 dark:divide-brand-blue-dark/5';
      case 'text-brand-blue-dark/80': return 'text-brand-blue-dark dark:text-white/80';
      case 'text-brand-blue-dark/75': return 'text-brand-blue-dark dark:text-white/75';
      case 'text-brand-blue-dark/70': return 'text-brand-blue-dark dark:text-white/70';
      case 'text-brand-blue-dark/65': return 'text-brand-blue-dark dark:text-white/65';
      case 'text-brand-blue-dark/60': return 'text-brand-blue-dark dark:text-white/60';
      case 'text-brand-blue-dark/50': return 'text-brand-blue-dark dark:text-white/50';
      case 'text-brand-blue-dark/45': return 'text-brand-blue-dark dark:text-white/45';
      case 'text-brand-blue-dark/40': return 'text-brand-blue-dark dark:text-white/40';
      
      default: return c;
    }
  });
  return 'class="' + [...new Set(newClassList)].join(' ') + '"'; // Remove duplicates if any
});

// Add Toggle Button to Navbar
const btnHtml = `
          <button onclick="toggleDarkMode()" id="theme-toggle" class="text-brand-blue-dark dark:text-white hover:text-brand-gold-premium p-1 transition-colors relative w-6 h-6 flex items-center justify-center">
            <i data-lucide="sun" id="theme-toggle-light-icon" class="w-5 h-5 hidden dark:block"></i>
            <i data-lucide="moon" id="theme-toggle-dark-icon" class="w-5 h-5 block dark:hidden"></i>
          </button>
`;
// Insert before Mobile Menu Trigger
html = html.replace('<!-- Mobile Menu Trigger -->', btnHtml + '\n          <!-- Mobile Menu Trigger -->');

// Also insert into mobile menu
const mobileBtnHtml = `
        <button onclick="toggleDarkMode()" class="w-full text-left px-3 py-2 text-brand-blue-dark dark:text-white hover:text-brand-gold-premium font-sans text-sm flex items-center gap-2 border-t border-black/5 dark:border-white/5 mt-2 pt-3">
          <i data-lucide="moon" class="w-4 h-4 block dark:hidden"></i>
          <i data-lucide="sun" class="w-4 h-4 hidden dark:block"></i>
          <span class="block dark:hidden">Mode Sombre</span>
          <span class="hidden dark:block">Mode Clair</span>
        </button>
`;
// Insert before admin button in mobile menu
html = html.replace('<button onclick="toggleMobileMenu(); openAdminModal();"', mobileBtnHtml + '\n        <button onclick="toggleMobileMenu(); openAdminModal();"');


// Add toggle JS function
const jsHtml = `
    // Theme Toggle Logic
    function toggleDarkMode() {
      const htmlEl = document.documentElement;
      if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
    
    // Auto-detect theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
`;

html = html.replace('// 1. SUPABASE CLIENT CONFIGURATION', jsHtml + '\n    // 1. SUPABASE CLIENT CONFIGURATION');

fs.writeFileSync('index.html', html);
console.log('Dark mode implementation complete.');
