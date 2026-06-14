import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { useInscriptions } from '../hooks/useInscriptions';
import { 
  LogOut, 
  Users, 
  Building2, 
  CalendarClock, 
  Search, 
  Download, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  Loader2
} from 'lucide-react';

export default function AdminPage() {
  const { isAdmin, logout, adminUser } = useAdmin();
  const { inscriptions, loading, error, removeInscription, fetchInscriptions } = useInscriptions();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const ITEMS_PER_PAGE = 50;

  // Protect route
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-gold-premium border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-brand-blue-dark/60 text-sm">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalInscriptions = inscriptions.length;
  
  const representedUFRs = new Set(inscriptions.map((i) => i.ufr)).size;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayInscriptions = inscriptions.filter((i) => {
    if (!i.created_at) return false;
    const dateStr = new Date(i.created_at).toISOString().split('T')[0];
    return dateStr === todayStr;
  }).length;

  // Filter inscriptions based on search
  const filteredInscriptions = inscriptions.filter((i) => {
    const term = searchTerm.toLowerCase();
    return (
      i.nom.toLowerCase().includes(term) ||
      i.prenom.toLowerCase().includes(term) ||
      i.email.toLowerCase().includes(term) ||
      i.ufr.toLowerCase().includes(term) ||
      i.filiere.toLowerCase().includes(term) ||
      i.niveau.toLowerCase().includes(term)
    );
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredInscriptions.length / ITEMS_PER_PAGE));
  const paginatedInscriptions = filteredInscriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = [
      'Nom',
      'Prénom',
      'Téléphone',
      'Email',
      'UFR',
      'Filière',
      'Niveau d\'études',
      'Date Inscription',
    ];
    
    const rows = inscriptions.map((i) => [
      i.nom,
      i.prenom,
      i.telephone,
      i.email,
      i.ufr,
      i.filiere,
      i.niveau,
      i.created_at ? new Date(i.created_at).toLocaleString() : '',
    ]);

    // Use BOM \uFEFF for proper UTF-8 handling in Excel (accents support)
    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent += [headers.join(','), ...rows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'candidatures_concours_plaidoirie_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await removeInscription(deleteId);
    setIsDeleting(false);
    if (success) {
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] font-sans flex flex-col">
      
      {/* Admin Navbar */}
      <header className="bg-brand-blue-dark border-b border-brand-gold-premium/30 py-5 text-white shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-gold-premium flex items-center justify-center bg-brand-blue-medium/40">
              <ShieldCheck className="w-5 h-5 text-brand-gold-premium" />
            </div>
            <div>
              <span className="text-white font-serif font-bold text-lg tracking-wide block leading-none">
                Espace Administrateur
              </span>
              <span className="text-brand-gold-premium font-sans text-xxs tracking-widest uppercase block mt-1">
                Club CE DEAO · Concours Plaidoirie
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-white/5 sm:border-none pt-4 sm:pt-0">
            <div className="text-left font-sans text-xs">
              <span className="text-white/45 block">Session active</span>
              <span className="text-brand-gold-light font-semibold block">
                {adminUser?.username || 'Mouhamadou Al Amin Ndiaye'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/5 hover:bg-red-900/40 text-white hover:text-red-200 border border-white/10 hover:border-red-500/20 py-2 px-4.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Contents */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Banner error display */}
        {error && (
          <div className="flex items-start space-x-3 bg-red-950/20 border border-red-500/20 text-red-700 p-4.5 rounded-xl text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <div className="flex-grow">
              <span className="font-semibold block">Une erreur est survenue :</span>
              <span className="text-xs">{error}</span>
            </div>
            <button 
              onClick={fetchInscriptions}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Total */}
          <div className="bg-white border border-brand-blue-dark/5 p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-brand-gold-premium/30 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-brand-blue-dark/50 text-xs font-semibold uppercase tracking-wider block font-sans">
                Total Inscriptions
              </span>
              <span className="text-3xl font-serif font-extrabold text-brand-blue-dark block">
                {loading ? '...' : totalInscriptions}
              </span>
            </div>
            <div className="p-4 bg-brand-cream rounded-2xl text-brand-blue-dark group-hover:bg-brand-gold-premium/15 group-hover:text-brand-gold-premium transition-all">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: UFRs */}
          <div className="bg-white border border-brand-blue-dark/5 p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-brand-gold-premium/30 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-brand-blue-dark/50 text-xs font-semibold uppercase tracking-wider block font-sans">
                UFR représentées
              </span>
              <span className="text-3xl font-serif font-extrabold text-brand-blue-dark block">
                {loading ? '...' : representedUFRs}
              </span>
            </div>
            <div className="p-4 bg-brand-cream rounded-2xl text-brand-blue-dark group-hover:bg-brand-gold-premium/15 group-hover:text-brand-gold-premium transition-all">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Today */}
          <div className="bg-white border border-brand-blue-dark/5 p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-brand-gold-premium/30 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-brand-blue-dark/50 text-xs font-semibold uppercase tracking-wider block font-sans">
                Inscriptions d'aujourd'hui
              </span>
              <span className="text-3xl font-serif font-extrabold text-brand-blue-dark block">
                {loading ? '...' : todayInscriptions}
              </span>
            </div>
            <div className="p-4 bg-brand-cream rounded-2xl text-brand-blue-dark group-hover:bg-brand-gold-premium/15 group-hover:text-brand-gold-premium transition-all">
              <CalendarClock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Toolbar (Search & Export) */}
        <div className="bg-white border border-brand-blue-dark/5 p-4.5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search box */}
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-blue-dark/30">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on filter
              }}
              placeholder="Rechercher par nom, prénom, email, UFR..."
              className="w-full bg-[#F8F6F0]/50 border border-brand-blue-dark/10 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-xl py-2.5 pl-9 pr-4 outline-none font-sans text-xs sm:text-sm text-brand-blue-dark transition-all"
            />
          </div>

          {/* Export and Sync Controls */}
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={fetchInscriptions}
              title="Rafraîchir les données"
              className="p-2.5 bg-[#F8F6F0]/80 hover:bg-[#F8F6F0] border border-brand-blue-dark/5 rounded-xl text-brand-blue-dark/75 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={exportToCSV}
              disabled={totalInscriptions === 0}
              className="bg-brand-blue-dark hover:bg-brand-blue-medium disabled:opacity-50 text-white font-sans text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl shadow transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exporter en CSV</span>
            </button>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-blue-dark/5 overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-brand-blue-dark text-white text-xxs sm:text-xs font-bold uppercase tracking-wider border-b border-brand-gold-premium/25">
                  <th className="py-4 px-4 sm:px-6 w-12 text-center">#</th>
                  <th className="py-4 px-4 sm:px-6">Candidat</th>
                  <th className="py-4 px-4 sm:px-6">Téléphone</th>
                  <th className="py-4 px-4 sm:px-6">Email Universitaire</th>
                  <th className="py-4 px-4 sm:px-6">UFR</th>
                  <th className="py-4 px-4 sm:px-6">Filière / Niveau</th>
                  <th className="py-4 px-4 sm:px-6 text-center">Date</th>
                  <th className="py-4 px-4 sm:px-6 text-center w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-blue-dark/5 text-xs sm:text-sm text-brand-blue-dark">
                {loading && totalInscriptions === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-brand-blue-dark/50">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-gold-premium mb-3" />
                      <span>Chargement de la liste des inscriptions...</span>
                    </td>
                  </tr>
                ) : filteredInscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-brand-blue-dark/50">
                      <span>Aucune inscription ne correspond à votre recherche.</span>
                    </td>
                  </tr>
                ) : (
                  paginatedInscriptions.map((item, idx) => {
                    const rowNumber = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                    return (
                      <tr 
                        key={item.id}
                        className="hover:bg-brand-cream/35 transition-colors"
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-center text-brand-blue-dark/45">
                          {rowNumber}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="font-bold text-brand-blue-dark leading-tight uppercase">
                            {item.nom}
                          </div>
                          <div className="text-brand-blue-dark/70 text-xs mt-0.5">
                            {item.prenom}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-brand-blue-dark/85">
                          {item.telephone}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-brand-blue-dark/75">
                          {item.email}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <span className="px-2.5 py-1 rounded-full text-xxs font-bold bg-brand-gold-premium/10 text-brand-gold-premium border border-brand-gold-premium/15 uppercase tracking-wide">
                            {item.ufr}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="font-medium">{item.filiere}</div>
                          <div className="text-brand-blue-dark/65 text-xxs mt-0.5 uppercase tracking-wider">{item.niveau}</div>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-center text-xxs font-medium text-brand-blue-dark/60">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => setDeleteId(item.id || null)}
                            className="p-2 bg-red-50 hover:bg-red-500 hover:text-white border border-red-200 text-red-500 hover:border-red-500 rounded-lg transition-all cursor-pointer"
                            title="Supprimer la candidature"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          {totalPages > 1 && (
            <div className="bg-brand-cream/25 border-t border-brand-blue-dark/5 py-4 px-6 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-brand-blue-dark/50">
                Affichage de <span className="font-semibold">{Math.min(filteredInscriptions.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}</span> à{' '}
                <span className="font-semibold">{Math.min(filteredInscriptions.length, currentPage * ITEMS_PER_PAGE)}</span> sur{' '}
                <span className="font-semibold">{filteredInscriptions.length}</span> inscriptions filtrées
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white border border-brand-blue-dark/10 rounded-lg text-brand-blue-dark/75 hover:bg-brand-cream hover:border-brand-gold-premium disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-brand-blue-dark/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold font-mono px-3 py-1 bg-white border border-brand-blue-dark/10 rounded-lg text-brand-blue-dark">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white border border-brand-blue-dark/10 rounded-lg text-brand-blue-dark/75 hover:bg-brand-cream hover:border-brand-gold-premium disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-brand-blue-dark/10 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Confirmation modal for deletions */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-blue-dark/60 backdrop-blur-xxs" onClick={() => setDeleteId(null)}></div>
          
          <div className="bg-white border border-brand-blue-dark/15 rounded-2xl max-w-md w-full p-6 shadow-2xl relative z-10 text-brand-blue-dark animate-fade-in">
            <h3 className="text-lg font-serif font-bold text-brand-blue-dark flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Confirmer la suppression</span>
            </h3>
            
            <p className="text-sm text-brand-blue-dark/75 font-sans mt-3 leading-relaxed">
              Êtes-vous certain de vouloir supprimer cette inscription définitivement ? Cette action est irréversible et supprimera le candidat de la base de données de Supabase.
            </p>
            
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold py-2 px-4.5 rounded-lg text-xs transition-colors cursor-pointer animate-fade-in"
              >
                Annuler
              </button>
              
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 px-4.5 rounded-lg text-xs shadow flex items-center gap-2 cursor-pointer transition-colors"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Suppression...</span>
                  </>
                ) : (
                  <span>Supprimer</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
