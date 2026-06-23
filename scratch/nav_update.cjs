const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. UPDATE PRELOADER IMAGE
const preloaderOld = `<!-- Anneau orange tournant -->
      <div
        class="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dashed border-brand-gold-premium/45 animate-[spin_10s_linear_infinite]">
      </div>
      <div
        class="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-brand-gold-premium/20 animate-[spin_15s_linear_infinite_reverse]">
      </div>
      <!-- Nom de Ecom Academie stylisé au centre -->
      <div class="text-brand-gold-premium font-serif font-bold text-3xl sm:text-4xl tracking-wider select-none drop-shadow-[0_0_15px_rgba(249,115,22,0.55)] animate-pulse">
        EA
      </div>`;
const preloaderNew = `<img src="/Logo.webp" alt="Ecom Academie Loading" class="w-32 h-32 sm:w-40 sm:h-40 object-contain animate-pulse drop-shadow-[0_0_15px_rgba(249,115,22,0.55)]" />`;
html = html.replace(preloaderOld, preloaderNew);

// Remove the text below preloader image since the logo contains it or to make it cleaner
html = html.replace(/<div class="mt-8 text-brand-gold-premium font-serif font-bold text-xl tracking-widest uppercase text-center">\s*ECOM ACADEMIE\s*<\/div>/g, '');

// 2. RESTRUCTURE NAVBAR
// We will replace the entire <div class="flex items-center justify-between h-16"> block
const oldNavStart = `<div class="flex items-center justify-between h-16">`;

const newNav = `<div class="flex items-center justify-between h-16 relative">
        <!-- Left: Dark Mode Toggle & Desktop Nav -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Dark Mode Toggle -->
          <button onclick="toggleDarkMode()" id="theme-toggle" class="text-brand-blue-dark dark:text-white hover:text-brand-gold-premium p-1 sm:p-2 transition-colors relative w-8 h-8 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full">
            <i data-lucide="sun" id="theme-toggle-light-icon" class="w-5 h-5 hidden dark:block"></i>
            <i data-lucide="moon" id="theme-toggle-dark-icon" class="w-5 h-5 block dark:hidden"></i>
          </button>
          
          <!-- Desktop Navigation -->
          <div class="hidden xl:flex items-center space-x-6">
            <a href="#presentation" class="text-black/80 dark:text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors">Présentation</a>
            <a href="#formations" class="text-black/80 dark:text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors">Formations</a>
            <a href="#services" class="text-black/80 dark:text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors">Services</a>
            <a href="#pourquoi" class="text-black/80 dark:text-white/80 hover:text-brand-gold-light font-sans text-sm font-medium tracking-wide transition-colors">Pourquoi</a>
          </div>
        </div>

        <!-- Center: Logo -->
        <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
          <img src="/Logo.webp" alt="Logo Ecom Academie" class="h-12 sm:h-16 w-auto object-contain" />
        </div>

        <!-- Right: CTA & Mobile Menu Trigger -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center space-x-4">
            <a href="#inscription" class="bg-gradient-to-r from-brand-gold-premium to-brand-gold-light hover:from-brand-gold-light hover:to-brand-gold-premium text-brand-blue-dark font-sans font-bold text-sm py-2 px-5 rounded shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <span>S'inscrire</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
          <!-- Mobile Menu Trigger -->`;

// We have to carefully splice the html to replace the old nav structure.
// Let's find the indices.
const navStartIdx = html.indexOf('<div class="flex items-center justify-between h-16">');
const mobileMenuTriggerIdx = html.indexOf('<!-- Mobile Menu Trigger -->', navStartIdx);

if (navStartIdx !== -1 && mobileMenuTriggerIdx !== -1) {
  const beforeNav = html.substring(0, navStartIdx);
  // Also, the old dark mode toggle is somewhere between navStartIdx and mobileMenuTriggerIdx, so replacing this whole chunk removes the duplicate.
  const afterTrigger = html.substring(mobileMenuTriggerIdx + '<!-- Mobile Menu Trigger -->'.length);
  html = beforeNav + newNav + '\n          <!-- Mobile Menu Trigger -->' + afterTrigger;
}

fs.writeFileSync('index.html', html);
console.log('Navbar and Preloader updated successfully.');
