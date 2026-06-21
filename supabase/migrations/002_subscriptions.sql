-- Subscripții utilizatori VYNO Premium
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email                  text        NOT NULL,
  stripe_customer_id     text        UNIQUE,
  stripe_subscription_id text        UNIQUE,
  plan                   text        NOT NULL DEFAULT 'premium',
  status                 text        NOT NULL DEFAULT 'active',
  current_period_end     timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscripții crame partenere
CREATE TABLE IF NOT EXISTS winery_subscriptions (
  id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email                  text        NOT NULL,
  winery_name            text,
  stripe_customer_id     text        UNIQUE,
  stripe_subscription_id text        UNIQUE,
  plan                   text        NOT NULL,
  status                 text        NOT NULL DEFAULT 'active',
  current_period_end     timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE winery_subscriptions ENABLE ROW LEVEL SECURITY;
