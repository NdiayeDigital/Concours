const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\.\/(Logo|gallery|Sceau|favicon)/g, '/$1');
fs.writeFileSync('index.html', html);
console.log('Image paths updated.');
