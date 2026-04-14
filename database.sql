-- =====================================================
-- TABLE DES MESSAGES - VERSION SÉCURISÉE
-- =====================================================

-- Création de la table
CREATE TABLE IF NOT EXISTS messages (
    id         BIGSERIAL PRIMARY KEY,
    nom        TEXT NOT NULL,
    email      TEXT NOT NULL,
    service    TEXT,
    message    TEXT NOT NULL,
    lu         BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMPTZ DEFAULT NOW()
);

-- Activation de la sécurité niveau ligne
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- UNIQUEMENT cette politique - permet aux visiteurs d'envoyer des messages
CREATE POLICY "allow_insert_from_anyone" ON messages 
    FOR INSERT WITH CHECK (true);

-- PAS de politique SELECT/UPDATE/DELETE - vos données sont PROTÉGÉES
-- Pour consulter les messages, utilisez le Table Editor de Supabase
-- (vous êtes automatiquement authentifié en tant qu'admin)