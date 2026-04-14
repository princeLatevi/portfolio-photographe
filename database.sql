-- ── Colle ce SQL dans Supabase : Table Editor > New Query ──

CREATE TABLE messages (
    id         BIGSERIAL PRIMARY KEY,
    nom        TEXT NOT NULL,
    email      TEXT NOT NULL,
    service    TEXT,
    message    TEXT NOT NULL,
    lu         BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insert public" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Select admin"  ON messages FOR SELECT USING (true);
CREATE POLICY "Update admin"  ON messages FOR UPDATE USING (true);
CREATE POLICY "Delete admin"  ON messages FOR DELETE USING (true);
