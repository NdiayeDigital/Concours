import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Shopify
shopify_old = '''<div class="mt-auto bg-brand-gold-premium/15 border border-brand-gold-premium/40 rounded-xl p-3 text-center">
            <p class="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-widest font-sans mb-1">Groupe</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium">25 000 FCFA</p>
            <div class="w-full h-px bg-white/10 my-2"></div>
            <p class="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-widest font-sans mb-1">Individuel</p>
            <p class="text-xl font-serif font-bold text-brand-gold-light">45 000 FCFA</p>
          </div>'''
shopify_new = '''<div class="mt-auto flex flex-col gap-2">
            <a href="https://wa.me/221756490565?text=Bonjour%20Ecom%20Academie%20!%20Je%20souhaite%20m%27inscrire%20%C3%A0%20la%20formation%20Shopify%20(Groupe)." target="_blank" class="w-full bg-brand-gold-premium/15 hover:bg-brand-gold-premium hover:text-white border border-brand-gold-premium/40 rounded-xl p-3 text-center transition-all duration-300 group/btn">
              <p class="text-[10px] text-black/50 dark:text-white/50 group-hover/btn:text-white/90 uppercase tracking-widest font-sans mb-1">Groupe</p>
              <p class="text-xl font-serif font-bold text-brand-gold-premium group-hover/btn:text-white">25 000 FCFA</p>
            </a>
            <a href="https://wa.me/221756490565?text=Bonjour%20Ecom%20Academie%20!%20Je%20souhaite%20m%27inscrire%20%C3%A0%20la%20formation%20Shopify%20(Individuel)." target="_blank" class="w-full bg-brand-gold-premium/15 hover:bg-brand-gold-premium hover:text-white border border-brand-gold-premium/40 rounded-xl p-3 text-center transition-all duration-300 group/btn">
              <p class="text-[10px] text-black/50 dark:text-white/50 group-hover/btn:text-white/90 uppercase tracking-widest font-sans mb-1">Individuel</p>
              <p class="text-xl font-serif font-bold text-brand-gold-premium group-hover/btn:text-white">45 000 FCFA</p>
            </a>
          </div>'''
content = content.replace(shopify_old, shopify_new)

# Alibaba
alibaba_old = '''<div class="mt-auto bg-brand-gold-premium/15 border border-brand-gold-premium/40 rounded-xl p-3 text-center">
            <p class="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium">5 000 FCFA</p>
          </div>'''
alibaba_new = '''<a href="https://wa.me/221756490565?text=Bonjour%20Ecom%20Academie%20!%20Je%20souhaite%20m%27inscrire%20%C3%A0%20la%20formation%20Alibaba." target="_blank" class="mt-auto bg-brand-gold-premium/15 hover:bg-brand-gold-premium hover:text-white border border-brand-gold-premium/40 rounded-xl p-3 text-center transition-all duration-300 group/btn block">
            <p class="text-[10px] text-black/50 dark:text-white/50 group-hover/btn:text-white/90 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium group-hover/btn:text-white">5 000 FCFA</p>
          </a>'''
content = content.replace(alibaba_old, alibaba_new)

# Marketing Digital
marketing_old = '''<div class="mt-auto bg-brand-gold-premium/15 border border-brand-gold-premium/40 rounded-xl p-3 text-center">
            <p class="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium">15 000 FCFA</p>
          </div>'''
marketing_new = '''<a href="https://wa.me/221756490565?text=Bonjour%20Ecom%20Academie%20!%20Je%20souhaite%20m%27inscrire%20%C3%A0%20la%20formation%20Marketing%20Digital." target="_blank" class="mt-auto bg-brand-gold-premium/15 hover:bg-brand-gold-premium hover:text-white border border-brand-gold-premium/40 rounded-xl p-3 text-center transition-all duration-300 group/btn block">
            <p class="text-[10px] text-black/50 dark:text-white/50 group-hover/btn:text-white/90 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium group-hover/btn:text-white">15 000 FCFA</p>
          </a>'''
content = content.replace(marketing_old, marketing_new)

# Vente en ligne
vente_old = '''<div class="mt-auto bg-brand-gold-premium/15 border border-brand-gold-premium/40 rounded-xl p-3 text-center">
            <p class="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium">10 000 FCFA</p>
          </div>'''
vente_new = '''<a href="https://wa.me/221756490565?text=Bonjour%20Ecom%20Academie%20!%20Je%20souhaite%20m%27inscrire%20%C3%A0%20la%20formation%20Vente%20en%20ligne." target="_blank" class="mt-auto bg-brand-gold-premium/15 hover:bg-brand-gold-premium hover:text-white border border-brand-gold-premium/40 rounded-xl p-3 text-center transition-all duration-300 group/btn block">
            <p class="text-[10px] text-black/50 dark:text-white/50 group-hover/btn:text-white/90 uppercase tracking-widest font-sans mb-1">Tarif unique</p>
            <p class="text-xl font-serif font-bold text-brand-gold-premium group-hover/btn:text-white">10 000 FCFA</p>
          </a>'''
content = content.replace(vente_old, vente_new)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Prices transformed into whatsapp links")
