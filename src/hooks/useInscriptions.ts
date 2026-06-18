import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAdmin } from './useAdmin';

export interface Inscription {
  id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  ufr: string;
  filiere: string;
  niveau: string;
  created_at?: string;
}

export function useInscriptions() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, getCredentials } = useAdmin();

  // Fetch inscriptions from database using secure RPC
  const fetchInscriptions = useCallback(async () => {
    const { username, password } = getCredentials();
    if (!username || !password) {
      setError('Authentification requise pour charger les inscriptions.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: rpcError } = await supabase.rpc('get_all_inscriptions', {
        p_username: username,
        p_password: password,
      });

      if (rpcError) {
        throw new Error(rpcError.message);
      }

      setInscriptions(data || []);
    } catch (err) {
      console.error('Error fetching inscriptions:', err);
      const error = err as Error;
      setError(error.message || 'Une erreur est survenue lors de la récupération des inscriptions.');
    } finally {
      setLoading(false);
    }
  }, [getCredentials]);

  // Insert a new inscription (public)
  const addInscription = async (data: Omit<Inscription, 'id' | 'created_at'>): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    try {
      // Front-end email validation
      const email = data.email.trim().toLowerCase();
      if (!email.endsWith('@univ-thies.sn')) {
        throw new Error("L'adresse email doit obligatoirement se terminer par '@univ-thies.sn'.");
      }

      // Check if email already exists in public table (optional check, backup is DB constraint)
      const { data: existing, error: checkError } = await supabase
        .from('inscriptions')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.warn('Check email error:', checkError);
      }

      if (existing) {
        throw new Error('Cet email est déjà inscrit.');
      }

      // Insert record
      const { error: insertError } = await supabase
        .from('inscriptions')
        .insert([{ ...data, email }]);

      if (insertError) {
        // Handle duplicate key error manually if check failed or race condition
        if (insertError.code === '23505') {
          throw new Error('Cet email est déjà inscrit.');
        }
        throw new Error(insertError.message);
      }

      return { success: true, message: 'Inscription enregistrée avec succès !' };
    } catch (err) {
      console.error('Error creating inscription:', err);
      const error = err as Error;
      return { success: false, message: error.message || "Une erreur s'est produite." };
    } finally {
      setLoading(false);
    }
  };

  // Delete an inscription (requires admin)
  const removeInscription = async (id: string): Promise<boolean> => {
    const { username, password } = getCredentials();
    if (!username || !password) {
      setError('Authentification requise pour supprimer.');
      return false;
    }

    try {
      const { error: rpcError } = await supabase.rpc('delete_inscription', {
        p_id: id,
        p_username: username,
        p_password: password,
      });

      if (rpcError) {
        throw new Error(rpcError.message);
      }

      // Locally filter out the deleted item
      setInscriptions((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting inscription:', err);
      const error = err as Error;
      setError(error.message || "Une erreur est survenue lors de la suppression.");
      return false;
    }
  };

  // Real-time subscription
  useEffect(() => {
    if (!isAdmin) return;

    // Fetch initial list asynchronously to prevent calling setState synchronously in effect body
    Promise.resolve().then(() => {
      fetchInscriptions();
    });

    // Setup channel subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inscriptions',
        },
        (payload) => {
          console.log('Realtime change received:', payload);
          // Re-fetch to ensure order and exact data mapping
          fetchInscriptions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, fetchInscriptions]);

  return {
    inscriptions,
    loading,
    error,
    fetchInscriptions,
    addInscription,
    removeInscription,
  };
}
