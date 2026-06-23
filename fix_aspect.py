import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove sm:aspect-square to allow cards to be rectangles
content = content.replace('sm:aspect-square overflow-hidden min-h-[250px]', 'overflow-hidden min-h-[300px]')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Aspect ratio fixed")
