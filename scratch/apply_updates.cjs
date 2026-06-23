const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Turnstile Script
html = html.replace('</head>', '  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>\n</head>');

// 2. Add Turnstile Widget
html = html.replace('<!-- Submit -->', `<!-- Cloudflare Turnstile -->
          <div class="cf-turnstile flex justify-center pb-2" data-sitekey="1x00000000000000000000AA" data-callback="onTurnstileSuccess"></div>
          
          <!-- Submit -->`);

// 3. Add Captcha JS Logic
html = html.replace('async function handleFormSubmit(e) {', `let isCaptchaSolved = false;
    window.onTurnstileSuccess = function() {
      isCaptchaSolved = true;
    };

    async function handleFormSubmit(e) {`);

// 4. Captcha Validation check
html = html.replace(`// Front-end email check`, `if (!isCaptchaSolved) {
        errorBanner.classList.remove('hidden');
        errorText.innerText = "Veuillez valider le Captcha anti-robot.";
        submitBtn.disabled = false;
        submitBtnText.innerText = "🚀 Je m'inscris maintenant";
        return;
      }

      // Front-end email check`);

// 5. Update Services Grid for Mobile
html = html.replace('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', 'grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6');

// 6. Make Services Cards Square and adjust mobile text size
html = html.replace(/p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2 cursor-default flex flex-col justify-between/g, 'p-3 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2 cursor-default flex flex-col justify-between aspect-square overflow-hidden');

html = html.replace(/w-16 h-16 mx-auto mb-6/g, 'w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-6');
html = html.replace(/class="w-8 h-8"/g, 'class="w-5 h-5 sm:w-8 sm:h-8"');
html = html.replace(/text-lg font-serif/g, 'text-sm sm:text-lg font-serif');
html = html.replace(/text-sm font-sans leading-relaxed mb-4/g, 'text-[9px] sm:text-sm font-sans leading-tight mb-2 sm:mb-4');
html = html.replace(/text-xs rounded-lg/g, 'text-[8px] sm:text-xs rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5');
html = html.replace(/text-xs py-2\.5 px-4 rounded/g, 'text-[9px] sm:text-xs py-1.5 px-2 sm:py-2.5 sm:px-4 rounded');

fs.writeFileSync('index.html', html);
console.log('Done modifying index.html');
