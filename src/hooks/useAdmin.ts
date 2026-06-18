import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface AdminUser {
  username: string;
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return !!sessionStorage.getItem('admin_username') && !!sessionStorage.getItem('admin_password');
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const username = sessionStorage.getItem('admin_username');
    return username ? { username } : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state with storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const username = sessionStorage.getItem('admin_username');
      const password = sessionStorage.getItem('admin_password');
      setIsAdmin(!!username && !!password);
      setAdminUser(username ? { username } : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      // Call the Supabase RPC verify_admin
      const { data: isValid, error: rpcError } = await supabase.rpc('verify_admin', {
        p_username: username,
        p_password: password,
      });

      if (rpcError) {
        throw new Error(rpcError.message);
      }

      if (isValid) {
        sessionStorage.setItem('admin_username', username);
        sessionStorage.setItem('admin_password', password);
        setIsAdmin(true);
        setAdminUser({ username });
        return true;
      } else {
        setError('Nom d\'administrateur ou mot de passe incorrect.');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      const error = err as Error;
      setError(error.message || 'Une erreur est survenue lors de la connexion.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_password');
    setIsAdmin(false);
    setAdminUser(null);
  };

  // Helper to get active credentials
  const getCredentials = () => {
    const username = sessionStorage.getItem('admin_username');
    const password = sessionStorage.getItem('admin_password');
    return { username, password };
  };

  return {
    isAdmin,
    adminUser,
    loading,
    error,
    login,
    logout,
    getCredentials,
  };
}
