const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regexFallback = /\/\/\s*Credentials fallback\s*if\s*\(\(username === 'AdminEcom' && password === 'Ecom2026'\)\)\s*\{\s*isValid = true;\s*\}/;
const regexFallback2 = /\/\/\s*Credentials fallback\s*if\s*\(\(username === 'AdminEcom' && password === 'Ecom2026'\) \|\| \(username === 'ThiesResto' && password === 'Resto221'\)\)\s*\{\s*isValid = true;\s*\}/;

if (regexFallback.test(html) || regexFallback2.test(html) || html.includes("username === 'AdminEcom'")) {
  html = html.replace(/\/\/\s*Credentials fallback\s*if\s*\(.*?\{\s*isValid = true;\s*\}/g, '');
  html = html.replace(/if\s*\(\(username === 'AdminEcom' && password === 'Ecom2026'\)\)\s*\{\s*isValid = true;\s*\}/g, '');
  html = html.replace(/if\s*\(username === 'AdminEcom' && password === 'Ecom2026'\)\s*\{\s*isValid = true;\s*\}/g, '');
  
  fs.writeFileSync('index.html', html);
  console.log('Removed all admin fallbacks from index.html');
} else {
  console.log('No fallbacks found. Maybe already removed or regex missed.');
}
