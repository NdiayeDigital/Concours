import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_video_html = '''        <iframe 
          class="absolute inset-0 w-full h-full" 
          src="https://www.youtube.com/embed/BBSsaTN8hiY?si=sv0a52hF7hq8N1al" 
          title="Formation Ecom Academie Offerte" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>'''

new_video_html = '''        <a href="https://youtu.be/BBSsaTN8hiY?si=sv0a52hF7hq8N1al" target="_blank" class="absolute inset-0 w-full h-full block group cursor-pointer">
          <img src="https://img.youtube.com/vi/BBSsaTN8hiY/maxresdefault.jpg" alt="Formation Ecom Academie" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div class="w-20 h-20 bg-brand-gold-premium rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-300">
              <i data-lucide="play" class="w-8 h-8 text-brand-blue-dark ml-2"></i>
            </div>
          </div>
        </a>'''

content = content.replace(old_video_html, new_video_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Video iframe replaced with clickable image")
