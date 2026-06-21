# VYNO — DB_SCHEMA.md
### Schema bazei de date Supabase · Stare curentă + Plan extindere

**Data audit:** 2026-06-19  
**Baza de date:** Supabase PostgreSQL  
**Metodologie:** Schema inferată din codul aplicației (nu am acces direct la Supabase Dashboard). Toate tabelele și coloanele sunt deduse din query-urile din cod.

---

## LEGENDA

```
✅ Tabelă existentă (confirmată din cod)
🔧 Tabelă existentă — necesită extindere
❌ Tabelă nouă — necesară pentru planul USER_FLOWS.md
⚠️  Coloană inferată (poate să nu existe fizic în DB)
```

---

## STAREA CURENTĂ — TABELE EXISTENTE

---

### ✅ `locations` (M03 — Crame)

Inferată din: `CramaScreen.tsx`, `MapScreen.tsx`, `EventScreen.tsx`

```sql
locations (
  id          uuid / serial   PRIMARY KEY,
  name        text            NOT NULL,
  region      text,
  description text,
  image_url   text,
  lat         float,          -- folosit în MapScreen
  lng         float,          -- folosit în MapScreen
  created_at  timestamptz     DEFAULT now()
)
```

**Coloane LIPSĂ** (necesare pentru M03 extins):
```sql
-- de adăugat în Faza 1:
country_id        uuid  REFERENCES countries(id),
region_id         uuid  REFERENCES regions(id),
subregion_id      uuid  REFERENCES subregions(id),
center_id         uuid  REFERENCES centers(id),
has_restaurant    boolean DEFAULT false,
has_accommodation boolean DEFAULT false,
has_tastings      boolean DEFAULT false,
visit_duration    integer,         -- ore estimate vizită
phone             text,
website           text,
owner_user_id     uuid  REFERENCES auth.users(id)  -- pentru M16
```

---

### ✅ `wines` (M04 — Vinuri)

Inferată din: `WineDetailScreen.tsx`, `AddWineScreen.tsx`, `ScanScreen.tsx`, `CramaScreen.tsx`

```sql
wines (
  id          uuid / serial   PRIMARY KEY,
  name        text            NOT NULL,
  type        text,           -- 'Rosu'|'Alb'|'Rose'|'Spumant'|'Desert'|'Necunoscut'
  year        integer,
  description text,
  image_url   text,
  scan_count  integer DEFAULT 0,
  score_avg   float   DEFAULT 0,
  location_id integer REFERENCES locations(id),
  created_at  timestamptz DEFAULT now()
)
```

**Coloane LIPSĂ** (necesare pentru M04 extins):
```sql
-- de adăugat în Faza 1:
grape_variety_id  uuid  REFERENCES grape_varieties(id),  -- M02
region_id         uuid  REFERENCES regions(id),          -- M01
subregion_id      uuid  REFERENCES subregions(id),
added_by_user_id  uuid  REFERENCES auth.users(id),       -- cine a adăugat
```

**Tabelă auxiliară pentru blend-uri** (Faza 2):
```sql
-- ❌ de creat:
wine_grape_varieties (
  wine_id           uuid REFERENCES wines(id),
  grape_variety_id  uuid REFERENCES grape_varieties(id),
  percentage        integer,   -- procent din blend (optional)
  PRIMARY KEY (wine_id, grape_variety_id)
)
```

---

### ✅ `events` (M06 — Evenimente)

Inferată din: `CramaScreen.tsx`, `EventScreen.tsx`

```sql
events (
  id          uuid / serial   PRIMARY KEY,
  title       text            NOT NULL,
  date        text,           -- ⚠️ stocat ca text, nu date — risc de sorting incorect
  time        text,
  price       integer,
  spots_left  integer,
  spots_total integer,
  description text,
  location_id integer REFERENCES locations(id),
  created_at  timestamptz DEFAULT now()
)
```

**Problemă:** `date` stocat ca `text` în loc de `date` sau `timestamptz`. Sorting cronologic va fi incorect dacă formatul nu este consistent (YYYY-MM-DD).

**Coloane LIPSĂ:**
```sql
-- de adăugat:
experience_id uuid REFERENCES experiences(id),  -- pentru M17 extins (rezervare experiență)
is_published  boolean DEFAULT true,
```

---

### ✅ `users` (M22 — Utilizatori)

Inferată din: `ProfileScreen.tsx`, `FeedScreen.tsx`, `PostDetailScreen.tsx`, `notifications.ts`

```sql
users (
  id          uuid            PRIMARY KEY,  -- = auth.users.id
  email       text,
  name        text,
  avatar_url  text,
  push_token  text,           -- ⚠️ un singur token — nu suportă multi-device
  created_at  timestamptz DEFAULT now()
)
```

**Coloane LIPSĂ** (necesare):
```sql
-- de adăugat în Faza 1:
role            text DEFAULT 'tourist',  -- 'tourist'|'winery_owner'|'admin'
location_id     uuid REFERENCES locations(id),  -- dacă role='winery_owner'
```

**Problemă:** Nu există trigger `on auth.users insert → insert into public.users`. Profilul utilizatorului trebuie creat manual (există `upsert` în ProfileScreen, dar dacă utilizatorul nu vizitează profilul, `users` rămâne gol pentru acel user).

---

### ✅ `reservations` (M17 — Rezervări)

Inferată din: `EventScreen.tsx`, `ProfileScreen.tsx`

```sql
reservations (
  id          uuid / serial   PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id),
  event_id    uuid REFERENCES events(id),
  location_id integer REFERENCES locations(id),
  persons     integer,
  status      text DEFAULT 'pending',  -- 'pending'|'confirmed'|'refused'
  notes       text,
  date        text,
  time        text,
  created_at  timestamptz DEFAULT now()
)
```

**Statusuri LIPSĂ** (din USER_FLOWS M17):
```
pending → confirmed → completed
pending → rejected
confirmed → cancelled
confirmed → no_show
```

**Coloane LIPSĂ:**
```sql
-- de adăugat:
experience_id uuid REFERENCES experiences(id),  -- rezervare experiență (M05)
completed_at  timestamptz,   -- când proprietarul marchează completed
```

---

### ✅ `posts` (M25 — Feed social)

Inferată din: `FeedScreen.tsx`, `PostDetailScreen.tsx`

```sql
posts (
  id          uuid / serial   PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id),
  caption     text,
  image_url   text,
  likes_count integer DEFAULT 0,
  created_at  timestamptz DEFAULT now()
)
```

**Problemă:** `likes_count` este un contor denormalizat fără validare per-user. Nu există tabelă `post_likes`.

**Coloane LIPSĂ:**
```sql
-- de adăugat pentru M25 extins (tag-uri sociale):
wine_id       uuid REFERENCES wines(id),       -- vin menționat în postare
location_id   uuid REFERENCES locations(id),   -- cramă menționată
experience_id uuid REFERENCES experiences(id),
```

---

### ✅ `comments` (M25 — Comentarii)

Inferată din: `PostDetailScreen.tsx`

```sql
comments (
  id          uuid / serial   PRIMARY KEY,
  post_id     uuid REFERENCES posts(id),
  user_id     uuid REFERENCES auth.users(id),
  text        text            NOT NULL,
  created_at  timestamptz DEFAULT now()
)
```

Stare: ✅ Complet pentru funcționalitatea actuală.

---

### ✅ `wine_reviews` (M04 — Recenzii vinuri)

Inferată din: `WineDetailScreen.tsx`

```sql
wine_reviews (
  id          uuid / serial   PRIMARY KEY,
  wine_id     uuid REFERENCES wines(id),
  user_id     uuid REFERENCES auth.users(id),
  score       integer,        -- 1-5
  comment     text,
  created_at  timestamptz DEFAULT now()
)
```

Stare: ✅ Funcțional. Lipsă: constraint `UNIQUE(wine_id, user_id)` pentru a preveni recenzii multiple.

---

### ✅ `wine_scans` (M23 — Scanări)

Inferată din: `WineDetailScreen.tsx`, `AddWineScreen.tsx`

```sql
wine_scans (
  id          uuid / serial   PRIMARY KEY,
  wine_id     uuid REFERENCES wines(id),
  user_id     uuid REFERENCES auth.users(id),
  image_url   text,
  created_at  timestamptz DEFAULT now()
)
```

Stare: ✅ Funcțional. Aceasta este sursa de date principală pentru M12 (Taste Profile) și M13 (Wine Passport).

---

## FUNCȚII RPC EXISTENTE

### `increment_scan_count(wine_id_param integer)`
Inferată din `WineDetailScreen.tsx:72`. Funcția RPC incrementează `wines.scan_count`. Poate să nu existe — există fallback în cod.

```sql
-- Funcția ar trebui să fie:
CREATE OR REPLACE FUNCTION increment_scan_count(wine_id_param integer)
RETURNS void AS $$
  UPDATE wines SET scan_count = scan_count + 1 WHERE id = wine_id_param;
$$ LANGUAGE sql;
```

---

## STORAGE BUCKETS EXISTENTE

### `images` (public)
- **Avatar utilizatori:** `avatar-{userId}-{timestamp}.{ext}`
- **Poze postări:** `post-{timestamp}.jpg`
- **Etichete vinuri scanate:** `wine-{timestamp}.jpg`

---

## PLAN EXTINDERE DB — MODULE LIPSĂ

---

### ❌ FAZA 1: Fundație geografică (M01) + Soiuri (M02)

```sql
-- M01: Ierarhie geografică
CREATE TABLE countries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  code        text,           -- 'RO', 'MD'
  description text,
  image_url   text,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE regions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id  uuid REFERENCES countries(id) ON DELETE CASCADE,
  name        text NOT NULL,
  description text,
  image_url   text,
  lat         float,
  lng         float,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE subregions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id   uuid REFERENCES regions(id) ON DELETE CASCADE,
  name        text NOT NULL,
  description text,
  image_url   text,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE centers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subregion_id  uuid REFERENCES subregions(id) ON DELETE CASCADE,
  name          text NOT NULL,
  description   text,
  lat           float,
  lng           float,
  created_at    timestamptz DEFAULT now()
);

-- M02: Soiuri de struguri
CREATE TABLE grape_varieties (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  origin_country  text,
  description     text,
  food_pairings   text,         -- recomandări culinare (text liber sau JSON)
  image_url       text,
  created_at      timestamptz DEFAULT now()
);

-- M02: Relație many-to-many soi ↔ regiune
CREATE TABLE grape_variety_regions (
  grape_variety_id uuid REFERENCES grape_varieties(id),
  region_id        uuid REFERENCES regions(id),
  PRIMARY KEY (grape_variety_id, region_id)
);
```

---

### ❌ FAZA 2: Experiențe (M05)

```sql
CREATE TABLE experiences (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  title       text NOT NULL,
  description text,
  price       integer,         -- în lei
  duration    integer,         -- în minute
  capacity    integer,
  category    text,            -- 'degustare'|'tur'|'picnic'|'brunch'|'cina'|'recoltare'
  is_published boolean DEFAULT true,
  image_url   text,
  created_at  timestamptz DEFAULT now()
);
```

---

### ❌ FAZA 3: Rute (M10)

```sql
CREATE TABLE routes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  description     text,
  days            integer,         -- durata în zile
  is_ai_generated boolean DEFAULT false,
  user_id         uuid REFERENCES auth.users(id),  -- null dacă e editorial
  region_id       uuid REFERENCES regions(id),
  image_url       text,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE route_stops (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id    uuid REFERENCES routes(id) ON DELETE CASCADE,
  location_id uuid REFERENCES locations(id),
  stop_order  integer NOT NULL,
  day_number  integer,
  notes       text,
  created_at  timestamptz DEFAULT now()
);
```

---

### ❌ FAZA 4: Profil gustativ (M12)

```sql
CREATE TABLE taste_profiles (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid REFERENCES auth.users(id) UNIQUE,
  preferred_types       jsonb DEFAULT '[]',    -- ex: ["Rosu", "Alb"]
  preferred_regions     jsonb DEFAULT '[]',    -- array de region_id
  preferred_varieties   jsonb DEFAULT '[]',    -- array de grape_variety_id
  price_range_min       integer,
  price_range_max       integer,
  scan_count_total      integer DEFAULT 0,
  review_count_total    integer DEFAULT 0,
  updated_at            timestamptz DEFAULT now()
);
```

---

### ❌ FAZA 5: Wine Passport (M13)

```sql
CREATE TABLE badges (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code        text UNIQUE NOT NULL,  -- ex: 'EXPLORER_DEALU_MARE', 'WINES_50'
  title       text NOT NULL,
  description text,
  icon        text,                  -- URL sau emoji
  category    text                   -- 'region'|'count'|'experience'|'route'
);

CREATE TABLE user_badges (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id),
  badge_id    uuid REFERENCES badges(id),
  earned_at   timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

CREATE TABLE location_checkins (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id),
  location_id uuid REFERENCES locations(id),
  reservation_id uuid REFERENCES reservations(id),
  checked_in_at  timestamptz DEFAULT now()
);
```

---

### ❌ FAZA 6: Colecție personală (M14)

```sql
CREATE TABLE personal_collection (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id),
  wine_id       uuid REFERENCES wines(id),   -- null dacă vin custom
  custom_name   text,
  custom_notes  text,
  quantity      integer DEFAULT 1,
  status        text DEFAULT 'owned',        -- 'owned'|'tasted'|'wishlist'
  date_added    timestamptz DEFAULT now(),
  UNIQUE(user_id, wine_id)
);
```

---

### ❌ FAZA 7: Calendar național (M15)

```sql
CREATE TABLE national_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  start_date  date NOT NULL,
  end_date    date,
  location_text text,          -- locație text liber (nu neapărat o cramă)
  location_id uuid REFERENCES locations(id),  -- null dacă eveniment național
  region_id   uuid REFERENCES regions(id),
  category    text,            -- 'festival'|'concurs'|'lansare'|'targ'
  image_url   text,
  created_at  timestamptz DEFAULT now()
);
```

---

### ❌ FAZA 8: Facturare (M18)

```sql
CREATE TABLE billing_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id     uuid REFERENCES locations(id),
  reservation_id  uuid REFERENCES reservations(id),
  amount          numeric(10,2) DEFAULT 1.00,  -- 1 euro per rezervare
  currency        text DEFAULT 'EUR',
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE monthly_invoices (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id     uuid REFERENCES locations(id),
  month           text NOT NULL,               -- format 'YYYY-MM'
  total_amount    numeric(10,2),
  records_count   integer,
  status          text DEFAULT 'pending',      -- 'pending'|'paid'|'overdue'
  generated_at    timestamptz DEFAULT now(),
  paid_at         timestamptz
);
```

---

### ❌ FAZA 9: Campanii promoționale (M19)

```sql
CREATE TABLE campaigns (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id       uuid REFERENCES locations(id),
  title             text NOT NULL,
  description       text,
  discount_percent  integer,
  promo_code        text UNIQUE,
  qr_data           text,
  start_date        date,
  end_date          date,
  target_regions    jsonb DEFAULT '[]',       -- filtrare audiență
  target_varieties  jsonb DEFAULT '[]',
  is_active         boolean DEFAULT true,
  created_at        timestamptz DEFAULT now()
);

CREATE TABLE campaign_tracking (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id),
  user_id     uuid REFERENCES auth.users(id),
  event_type  text,                           -- 'view'|'click'|'redeem'
  created_at  timestamptz DEFAULT now()
);
```

---

### ❌ TABELE AUXILIARE NECESARE (diverse faze)

```sql
-- Idempotență like-uri (fix bug B2)
CREATE TABLE post_likes (
  user_id  uuid REFERENCES auth.users(id),
  post_id  uuid REFERENCES posts(id),
  liked_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

-- Multi-device push notifications
CREATE TABLE push_tokens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id),
  token       text NOT NULL,
  platform    text,  -- 'ios'|'android'
  created_at  timestamptz DEFAULT now(),
  UNIQUE(token)
);

-- Trigger auto-create profile la înregistrare
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## DIAGRAMA RELAȚIILOR (simplificată)

```
auth.users
    │
    ├── users (profil public)
    │       └── role: tourist | winery_owner | admin
    │
    ├── wine_scans ──→ wines ──→ locations ──→ regions ──→ countries
    │                      └──→ grape_varieties
    │
    ├── wine_reviews ──→ wines
    │
    ├── reservations ──→ events ──→ locations
    │               └──→ experiences ──→ locations
    │
    ├── posts ──→ (wine_id, location_id, experience_id)
    │       └── comments
    │       └── post_likes
    │
    ├── personal_collection ──→ wines
    │
    ├── user_badges ──→ badges
    │
    ├── location_checkins ──→ locations
    │
    └── taste_profiles (derived)

locations ──→ regions ──→ subregions ──→ centers
          └──→ experiences
          └──→ events
          └──→ campaigns
          └──→ billing_records

routes ──→ route_stops ──→ locations
```

---

## ORDINE MIGRĂRI RECOMANDATE

```
Migrare 001: Trigger sync auth.users → users
Migrare 002: Adăugare role în users
Migrare 003: Creare countries, regions, subregions, centers
Migrare 004: Creare grape_varieties + grape_variety_regions
Migrare 005: Extindere locations (country_id, region_id, facilități)
Migrare 006: Extindere wines (grape_variety_id, region_id)
Migrare 007: Creare experiences
Migrare 008: Extindere reservations (experience_id, completed_at)
Migrare 009: Fix events.date → tip date
Migrare 010: Creare post_likes (fix bug B2)
Migrare 011: Creare routes + route_stops
Migrare 012: Creare taste_profiles
Migrare 013: Creare badges + user_badges + location_checkins
Migrare 014: Creare personal_collection
Migrare 015: Creare national_events
Migrare 016: Creare billing_records + monthly_invoices
Migrare 017: Creare campaigns + campaign_tracking
Migrare 018: Creare push_tokens (înlocuire users.push_token)
```
