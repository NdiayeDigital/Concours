import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change HTML login form
content = content.replace('<label for="admin-email" class="block text-sm font-sans font-medium text-brand-blue-dark dark:text-white/80 mb-2">Email d\'administrateur</label>', '<label for="admin-email" class="block text-sm font-sans font-medium text-brand-blue-dark dark:text-white/80 mb-2">Nom d\'administrateur</label>')
content = content.replace('<input type="email" id="admin-email" required', '<input type="text" id="admin-email" required')
content = content.replace('placeholder="ecomacademie.th@gmail.com"', 'placeholder="admin"')

# 2. Change handleAdminLogin
old_login = '''      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) throw error;

        if (data.session) {
          document.getElementById('admin-email').value = '';
          document.getElementById('admin-password').value = '';

          closeAdminModal();
          showAdminDashboard();
        }
      } catch (err) {
        errorBanner.classList.remove('hidden');
        errorText.innerText = "Erreur Supabase : " + (err.message || "Identifiants invalides");
      } finally {'''

new_login = '''      try {
        const { data, error } = await supabaseClient.rpc('rpc_admin_login', { p_user: email, p_pass: password });

        if (error) throw error;

        if (data === true) {
          sessionStorage.setItem('admin_pass', password);
          document.getElementById('admin-email').value = '';
          document.getElementById('admin-password').value = '';

          closeAdminModal();
          showAdminDashboard();
        } else {
          throw new Error("Identifiants invalides");
        }
      } catch (err) {
        errorBanner.classList.remove('hidden');
        errorText.innerText = "Erreur : " + (err.message || "Identifiants invalides");
      } finally {'''
content = content.replace(old_login, new_login)

# 3. Change checkSessionTimeout
old_check = '''    async function checkSessionTimeout() {
      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        adminDashboardSection.classList.add('hidden');
        adminDashboardSection.classList.remove('active-section');
        return false;
      }
      return true;
    }'''
new_check = '''    async function checkSessionTimeout() {
      if (!sessionStorage.getItem('admin_pass')) {
        adminDashboardSection.classList.add('hidden');
        adminDashboardSection.classList.remove('active-section');
        return false;
      }
      return true;
    }'''
content = content.replace(old_check, new_check)

# 4. Change logout
old_logout = '''    async function handleLogout() {
      await supabaseClient.auth.signOut();
      
      adminDashboardSection.classList.add('hidden');
      adminDashboardSection.classList.remove('active-section');
      heroSection.classList.remove('hidden');
      servicesSection.classList.remove('hidden');
      aboutSection.classList.remove('hidden');
      contactSection.classList.remove('hidden');
      pricingSection.classList.remove('hidden');
      faqSection.classList.remove('hidden');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }'''
new_logout = '''    async function handleLogout() {
      sessionStorage.removeItem('admin_pass');
      
      adminDashboardSection.classList.add('hidden');
      adminDashboardSection.classList.remove('active-section');
      heroSection.classList.remove('hidden');
      servicesSection.classList.remove('hidden');
      aboutSection.classList.remove('hidden');
      contactSection.classList.remove('hidden');
      pricingSection.classList.remove('hidden');
      faqSection.classList.remove('hidden');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }'''
content = content.replace(old_logout, new_logout)

# 5. Change fetchInscriptionsData
old_fetch = '''    async function fetchInscriptionsData() {
      const isSessionValid = await checkSessionTimeout();
      if (!isSessionValid) return;

      try {
        const { data, error } = await supabaseClient
          .from('inscriptions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }'''
new_fetch = '''    async function fetchInscriptionsData() {
      const isSessionValid = await checkSessionTimeout();
      if (!isSessionValid) return;

      try {
        const pwd = sessionStorage.getItem('admin_pass');
        const { data, error } = await supabaseClient.rpc('rpc_get_inscriptions', { p_pass: pwd });

        if (error) {
          throw error;
        }'''
content = content.replace(old_fetch, new_fetch)

# 6. Change deleteInscription
old_delete_ins = '''    async function deleteInscription(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) return;

      const isSessionValid = await checkSessionTimeout();
      if (!isSessionValid) return;

      try {
        const { error } = await supabaseClient
          .from('inscriptions')
          .delete()
          .eq('id', id);

        if (error) throw error;'''
new_delete_ins = '''    async function deleteInscription(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) return;

      const isSessionValid = await checkSessionTimeout();
      if (!isSessionValid) return;

      try {
        const pwd = sessionStorage.getItem('admin_pass');
        const { error } = await supabaseClient.rpc('rpc_delete_inscription', { p_pass: pwd, p_id: id });

        if (error) throw error;'''
content = content.replace(old_delete_ins, new_delete_ins)

# 7. Change fetchAdminTemoignages
old_fetch_tem = '''      try {
        const { data, error } = await supabaseClient.from('temoignages').select('*').order('created_at', {ascending: false});
        if(error) throw error;'''
new_fetch_tem = '''      try {
        const pwd = sessionStorage.getItem('admin_pass');
        const { data, error } = await supabaseClient.rpc('rpc_get_all_temoignages', { p_pass: pwd });
        if(error) throw error;'''
content = content.replace(old_fetch_tem, new_fetch_tem)

# 8. Change updateTemoignageStatut
old_update_tem = '''      try {
        const { error } = await supabaseClient.from('temoignages').update({statut_validation: statut}).eq('id', id);
        if(error) throw error;'''
new_update_tem = '''      try {
        const pwd = sessionStorage.getItem('admin_pass');
        const { error } = await supabaseClient.rpc('rpc_update_temoignage', { p_pass: pwd, p_id: id, p_statut: statut });
        if(error) throw error;'''
content = content.replace(old_update_tem, new_update_tem)

# 9. Change deleteTemoignage
old_delete_tem = '''      try {
        const { error } = await supabaseClient.from('temoignages').delete().eq('id', id);
        if(error) throw error;'''
new_delete_tem = '''      try {
        const pwd = sessionStorage.getItem('admin_pass');
        const { error } = await supabaseClient.rpc('rpc_delete_temoignage', { p_pass: pwd, p_id: id });
        if(error) throw error;'''
content = content.replace(old_delete_tem, new_delete_tem)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated with RPC approach")
