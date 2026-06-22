const fs = require('fs');

function checkHTML(html) {
  const stack = [];
  const tagRegex = /<\/?([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?>/g;
  
  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'
  ]);

  let match;
  const lines = html.split('\n');
  const getLineNumber = (index) => {
    let current = 0;
    for (let i = 0; i < lines.length; i++) {
      current += lines[i].length + 1; // +1 for newline
      if (current > index) return i + 1;
    }
    return lines.length;
  };

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidElements.has(tagName);
    const lineNum = getLineNumber(match.index);

    if (tagName.startsWith('!--')) {
      continue;
    }

    if (isSelfClosing) {
      if (isClosing) {
        console.log(`[Error] Closing void/self-closing element on line ${lineNum}: ${fullTag}`);
      }
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        console.log(`[Error] Unmatched closing tag </${tagName}> on line ${lineNum}`);
      } else {
        const last = stack.pop();
        if (last.name !== tagName) {
          console.log(`[Error] Mismatched closing tag </${tagName}> on line ${lineNum}, expected </${last.name}> (opened on line ${last.line})`);
          stack.push(last);
        }
      }
    } else {
      stack.push({ name: tagName, line: lineNum, full: fullTag });
    }
  }

  while (stack.length > 0) {
    const unclosed = stack.pop();
    console.log(`[Error] Unclosed tag <${unclosed.name}> opened on line ${unclosed.line}: ${unclosed.full}`);
  }

  console.log('HTML check finished.');
}

const htmlContent = fs.readFileSync('index.html', 'utf8');
checkHTML(htmlContent);
