-- Migrare 001: Cereri parteneriat crame
-- Rulati in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS partner_requests (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  winery_name text        NOT NULL,
  email       text        NOT NULL,
  phone       text,
  region      text,
  package     text        NOT NULL DEFAULT 'launch_offer',
  -- 'launch_offer' | 'basic' | 'standard' | 'premium'
  notes       text,
  status      text        NOT NULL DEFAULT 'new',
  -- 'new' | 'contacted' | 'onboarded' | 'rejected'
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index pentru cautare rapida dupa status si data
CREATE INDEX IF NOT EXISTS partner_requests_status_idx ON partner_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS partner_requests_email_idx  ON partner_requests(email);

-- RLS activat — nicio politica publica => acces doar prin service_role key (admin VYNO)
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;

-- Comentariu tabel
COMMENT ON TABLE partner_requests IS
  'Cereri de parteneriat primite prin site. Gestionate manual de admin VYNO pana la integrarea Stripe.';
