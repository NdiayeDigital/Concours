-- Enable pgcrypto extension for hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create inscriptions table
CREATE TABLE IF NOT EXISTS inscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  prenom text NOT NULL,
  telephone text NOT NULL,
  email text NOT NULL UNIQUE CHECK (email LIKE '%@univ-thies.sn'),
  ufr text NOT NULL,
  filiere text NOT NULL,
  niveau text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insert admin with bcrypt hashed password 'Mouhamadou2005'
INSERT INTO admin_users (username, password_hash)
VALUES (
  'Mouhamadou Al Amin Ndiaye', 
  crypt('Mouhamadou2005', gen_salt('bf'))
)
ON CONFLICT (username) DO NOTHING;

-- Row Level Security (RLS) Configuration
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inscriptions (public policy)
CREATE POLICY "Allow public insert" 
ON inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Deny all public select/update/delete on inscriptions
CREATE POLICY "Deny public select" 
ON inscriptions 
FOR SELECT 
USING (false);

CREATE POLICY "Deny public delete" 
ON inscriptions 
FOR DELETE 
USING (false);

-- Deny all public access to admin_users
CREATE POLICY "Deny public admin access" 
ON admin_users 
USING (false);

-- SECURE FUNCTIONS (SECURITY DEFINER to bypass RLS internally for verified admins)

-- Function to verify admin credentials
CREATE OR REPLACE FUNCTION verify_admin(p_username text, p_password text)
RETURNS boolean AS $$
DECLARE
  v_match boolean;
BEGIN
  SELECT (password_hash = crypt(p_password, password_hash)) INTO v_match
  FROM admin_users
  WHERE username = p_username;
  
  RETURN COALESCE(v_match, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to fetch all inscriptions (requires valid admin credentials)
CREATE OR REPLACE FUNCTION get_all_inscriptions(p_username text, p_password text)
RETURNS TABLE (
  id uuid,
  nom text,
  prenom text,
  telephone text,
  email text,
  ufr text,
  filiere text,
  niveau text,
  created_at timestamptz
) AS $$
BEGIN
  IF verify_admin(p_username, p_password) THEN
    RETURN QUERY 
    SELECT i.id, i.nom, i.prenom, i.telephone, i.email, i.ufr, i.filiere, i.niveau, i.created_at
    FROM inscriptions i
    ORDER BY i.created_at DESC;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete an inscription (requires valid admin credentials)
CREATE OR REPLACE FUNCTION delete_inscription(p_id uuid, p_username text, p_password text)
RETURNS void AS $$
BEGIN
  IF verify_admin(p_username, p_password) THEN
    DELETE FROM inscriptions WHERE id = p_id;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
