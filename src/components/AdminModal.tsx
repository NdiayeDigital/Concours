import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { X, ShieldAlert, KeyRound, User, Loader2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const { login, loading } = useAdmin();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Veuillez renseigner tous les champs.');
      return;
    }

    const success = await login(username.trim(), password);
    if (success) {
      onClose();
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      setErrorMsg('Nom d\'administrateur ou mot de passe incorrect.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-blue-dark/85 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="bg-brand-blue-dark border-2 border-brand-gold-premium/40 rounded-2xl max-w-md w-full p-8 shadow-2xl relative z-10 text-white animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/45 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 space-y-2.5">
          <div className="mx-auto w-12 h-12 rounded-xl bg-brand-gold-premium/10 border border-brand-gold-premium/30 flex items-center justify-center text-brand-gold-premium">
            <KeyRound className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl font-serif font-bold tracking-wide">
            Connexion Administrateur
          </h3>
          <p className="text-white/45 font-sans text-xs">
            Veuillez entrer vos identifiants pour accéder au tableau de bord.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Error Banner */}
          {errorMsg && (
            <div className="flex items-start space-x-2.5 bg-red-950/40 border border-red-500/35 text-red-300 p-3.5 rounded-xl text-xs font-sans">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="admin-username" className="block text-[10px] font-semibold uppercase tracking-wider text-white/60 font-sans">
              Identifiant Admin
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/30">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="admin-username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg(null);
                }}
                required
                placeholder="Ex: Mouhamadou Al Amin Ndiaye"
                className="w-full bg-brand-blue-medium/30 border border-white/10 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-xl py-3 pl-10 pr-4 outline-none font-sans text-sm text-white transition-all placeholder-white/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="block text-[10px] font-semibold uppercase tracking-wider text-white/60 font-sans">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/30">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                required
                placeholder="••••••••"
                className="w-full bg-brand-blue-medium/30 border border-white/10 focus:border-brand-gold-premium focus:ring-1 focus:ring-brand-gold-premium rounded-xl py-3 pl-10 pr-4 outline-none font-sans text-sm text-white transition-all placeholder-white/20"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-gold-premium to-brand-gold-light hover:from-brand-gold-light hover:to-brand-gold-premium text-brand-blue-dark font-sans font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-brand-gold-premium/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validation...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </div>

        </form>

        {/* Small Notice */}
        <div className="text-center mt-6 text-[10px] font-sans text-white/35">
          Espace sécurisé • Club CE DEAO UIDT
        </div>

      </div>
    </div>
  );
}
