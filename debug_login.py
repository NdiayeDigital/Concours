import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

debug_login = '''      try {
        const { data, error } = await supabaseClient.rpc('rpc_admin_login', { p_user: email, p_pass: password });
        
        alert("Debug -> Resultat: " + JSON.stringify(data) + "\\nErreur: " + JSON.stringify(error));

        if (error) throw error;

        if (data === true) {
          sessionStorage.setItem('admin_pass', password);'''

content = content.replace('''      try {
        const { data, error } = await supabaseClient.rpc('rpc_admin_login', { p_user: email, p_pass: password });

        if (error) throw error;

        if (data === true) {
          sessionStorage.setItem('admin_pass', password);''', debug_login)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Alert added")
