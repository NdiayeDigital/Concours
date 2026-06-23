import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old carousel functions
old_carousel_js_regex = r'// 5\. TESTIMONIALS CAROUSEL\s*function showSlide\(index\) \{.*?\s*function goToSlide\(index\) \{\s*showSlide\(index\);\s*\}\s*'
content = re.sub(old_carousel_js_regex, '', content, flags=re.DOTALL)

# Remove the setInterval
content = re.sub(r'// Auto-advance carousel\s*setInterval\(nextSlide, 5000\);\s*', '', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Old carousel JS removed")
