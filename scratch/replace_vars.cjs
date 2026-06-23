const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace IDs, variables, and property names
html = html.replace(/\bufr\b/g, 'module_choisi');
html = html.replace(/\bfiliere\b/g, 'objectif');
html = html.replace(/\bniveau\b/g, 'experience');

// We also need to replace the labels in the success section and admin dashboard table
html = html.replace(/Formation souhaitée/g, "Module choisi");
// We already changed labels in HTML but let's make sure.

fs.writeFileSync('index.html', html);
console.log('Replaced variables successfully.');
