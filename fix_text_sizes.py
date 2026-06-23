import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix small text in services section
# 1. Update descriptions: text-[9px] sm:text-sm -> text-xs sm:text-sm
content = content.replace('text-[9px] sm:text-sm', 'text-xs sm:text-sm')

# 2. Update price badges: text-[8px] sm:text-xs -> text-[10px] sm:text-xs
content = content.replace('text-[8px] sm:text-xs', 'text-[10px] sm:text-xs')

# 3. Update whatsapp buttons: text-[9px] sm:text-xs -> text-[11px] sm:text-xs
content = content.replace('text-[9px] sm:text-xs py-1.5', 'text-[11px] sm:text-xs py-2')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Text sizes fixed")
