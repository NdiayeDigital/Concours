import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

offline_script = '''
    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker PWA enregistré');
        }).catch(err => {
          console.log('Erreur PWA ServiceWorker: ', err);
        });
      });
    }

    // Gestion de la connexion internet
    window.addEventListener('offline', () => {
      showNotificationToast("Hors ligne", "Vous avez perdu votre connexion internet. La page reste consultable en cache.", "error");
    });
    
    window.addEventListener('online', () => {
      showNotificationToast("En ligne", "Votre connexion internet est de retour !", "success");
    });
'''

# Find the old PWA registration block and replace it
old_pwa_regex = r"// Register PWA Service Worker\s*if \('serviceWorker' in navigator\) \{.*?\}\s*\)\s*;\s*\}"

if re.search(old_pwa_regex, content, re.DOTALL):
    content = re.sub(old_pwa_regex, offline_script, content, flags=re.DOTALL)
else:
    # If not found, just append it before closing script
    content = content.replace('  </script>\n</body>', offline_script + '\n  </script>\n</body>')


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Offline detection added")
