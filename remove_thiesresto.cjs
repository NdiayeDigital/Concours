const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the ThiesResto fallback
const badLine = "if ((username === 'AdminEcom' && password === 'Ecom2026') || (username === 'ThiesResto' && password === 'Resto221')) {";
const goodLine = "if (username === 'AdminEcom' && password === 'Ecom2026') {";

if (html.includes(badLine)) {
  html = html.replace(badLine, goodLine);
  fs.writeFileSync('index.html', html);
  console.log("Fixed: Removed ThiesResto fallback.");
} else {
  console.log("Could not find the exact line.");
}
