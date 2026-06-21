# CONTEXT PROIECT — SITE VYNO.RO

## Ce este VYNO
Aplicatie mobila de turism vitivinicol pentru Romania si Moldova, construita in React Native + Expo + Supabase + Claude API + Google Vision. Aplicatia mobila este aproape complet functionala (vezi sectiunea "Stadiul aplicatiei mobile" mai jos). Acest document descrie ce trebuie construit pentru SITE-UL WEB, proiect separat, in alt folder, cu propria sesiune Claude Code.

## Ce trebuie construit
Site web vyno.ro — cod pur HTML/CSS/JS sau Next.js (de discutat cu Claude Code la inceputul sesiunii noi), instalat pe hosting shared, separat de aplicatia mobila dar conectat la ACEEASI baza de date Supabase.

---

## STADIUL APLICATIEI MOBILE (context, nu de construit aici)

Aplicatia mobila VYNO are deja implementate (prin Claude Code, sesiune separata):

- Autentificare cu roluri (tourist / winery_owner / admin)
- Geografie completa: tari, regiuni viticole, subregiuni, centre (Romania + Moldova)
- Soiuri de struguri romanesti cu descrieri
- 6 crame reale introduse, cu facilitati (restaurant/cazare/degustari)
- Vinuri cu legatura la soiuri si regiuni
- Experiente (degustari, tururi, picnic, cina, recoltare) cu rezervare
- Evenimente (existente) + Calendar National al Vinului (festivaluri, concursuri)
- Rute vitivinicole predefinite SI generate de AI
- AI Concierge — utilizatorul descrie ce vrea (locatie, buget, zile, preferinte) si primeste un traseu complet generat de Claude AI, salvat automat ca ruta
- Profil gustativ calculat automat din comportamentul utilizatorului
- Wine Passport — insigne si gamification
- Colectie personala de vinuri
- Scanare eticheta cu OCR (Google Vision) + identificare vin + adaugare vin nou daca nu exista
- Somelier AI conversational
- Sistem complet de rezervari (pending/confirmed/completed/rejected/cancelled/no_show) cu notificari push bidirectionale
- Dashboard pentru proprietari de crame (WineryDashboardScreen) cu tab-uri: Crama (editare profil), Rezervari, Facturare, Oferte (campanii promotionale)
- Facturare automata (1 euro per rezervare finalizata)
- Campanii promotionale cu cod promo, targeting bazat pe profil gustativ, tracking (view/click/redeem)
- Feed social cu postari, like-uri idempotente, comentarii
- Securitate: toate cheile API (Anthropic, Google Vision) sunt protejate prin Supabase Edge Functions, niciodata expuse in aplicatie

Aplicatia este construita 100% prin Claude Code, in folderul C:\Users\hp\vyno.

---

## CE TREBUIE CONSTRUIT PE SITE (acest proiect nou)

### 1. Landing page publica
- Prezentare aplicatie VYNO
- Screenshot-uri din aplicatie
- Download APK Android (link direct catre fisier, odata generat build-ul)
- Sectiuni: ce face aplicatia, pentru cine e, cum functioneaza

### 2. Pagina "Devino partener" (pentru crame)
- Prezentare beneficii pentru crame
- Pachete de pret: Basic 49€/luna, Standard 99€/luna, Premium 199€/luna
- Formular inscriere SAU buton plata directa cu Stripe
- Oferta de lansare: primele 100 de crame, 12 luni gratuit

### 3. Pagina Premium (pentru utilizatori)
- Prezentare beneficii VYNO Premium — 4.99€/luna
- Plata cu Stripe

### 4. Panou Analytics — ADMIN ONLY (modulul M21 din planul complet)
Acesta e un panou intern, accesibil DOAR tie (admin VYNO), cu autentificare separata sau protejata.

Trebuie sa afiseze, citind din aceeasi baza Supabase:
- Total utilizatori inregistrati + utilizatori activi (logati in ultimele 7 zile)
- Total scanari OCR efectuate + rata de succes (vin gasit vs negasit)
- Rezervari: total, defalcate pe status (pending/confirmed/completed/rejected/cancelled/no_show)
- Cele mai populare regiuni viticole (dupa interactiuni/vizualizari)
- Cele mai populare soiuri de struguri
- Performanta campaniilor promotionale active: total views, clicks, redeems, rata de conversie
- Venituri estimate din facturare (suma billing_records pe luna curenta si istoric)
- Numar cereri catre AI Concierge si ce tip de trasee se genereaza cel mai des
- Crame active (cu owner_user_id setat) vs profiluri neclaim-uite

Format recomandat: grafice simple (bare, linii) + tabele cu cifre, organizat pe sectiuni clare. Acest panou NU trebuie sa fie public sau accesibil cramelor/turistilor — doar tie.

### 5. Panou administrare crame (optional, de discutat)
Exista deja un dashboard COMPLET FUNCTIONAL pentru crame in aplicatia mobila (WineryDashboardScreen). Posibil sa NU mai fie nevoie de varianta web separata pentru crame — de evaluat impreuna cu Claude Code daca merita duplicat efortul, sau daca cramele pot folosi exclusiv dashboard-ul mobil.

---

## DESIGN SYSTEM VYNO

### Culori
- Fundal principal: #0D0D0D
- Burgundy: #4A1219
- Wine: #6B1F2A
- Auriu: #C9A84C
- Auriu deschis: #E8C97A
- Crema: #FAF6EE
- Verde accent: #4ADE80
- Rosu eroare: #FF6B6B
- Card background: rgba(250,246,238,0.04)
- Card border: rgba(250,246,238,0.08)
- Gold border: rgba(201,168,76,0.2)

### Fonturi
- Titluri: Cormorant Garamond (Google Fonts) — serif, elegant
- UI/Body: Inter (Google Fonts) — sans-serif, clar

### Logo VYNO
- Litera V in auriu #C9A84C
- Un punct mic auriu intre V si YNO
- Literele YNO in crema #FAF6EE
- Font bold, letterSpacing 2-3px
- Sub logo: "TURISM VITIVINICOL" — litere mici, letterSpacing 4px, culoare rgba(250,246,238,0.25)

### Stil general
Dark premium, elegant, minimal. Borduri subtiri semitransparente. Butoane cu background burgundy semitransparent + border auriu. Border-radius 14-16px. Spatiere generoasa.

---

## SUPABASE — Backend comun cu aplicatia mobila

- URL: https://ifiaoezxieqkewbauusd.supabase.co
- Autentificare: Supabase Auth (email + parola), cu camp role (tourist/winery_owner/admin) pe tabela users

### Tabele principale relevante pentru site
- users (id, email, name, role, auth_id, avatar_url, push_token)
- locations (crame — id, name, region_id, owner_user_id, has_restaurant, has_accommodation, has_tastings, etc.)
- wines, events, national_events, experiences, routes, route_stops
- reservations (cu toate statusurile)
- billing_records, monthly_invoices
- campaigns, campaign_tracking
- wine_regions, wine_subregions, wine_centers, grape_varieties
- personal_collection, wine_reviews, wine_scans
- posts, comments, post_likes

Pentru schema completa si exacta, fisierul DB_SCHEMA.md exista deja in proiectul aplicatiei mobile (C:\Users\hp\vyno\DB_SCHEMA.md) — poate fi copiat sau referit la inceputul sesiunii noi de Claude Code pentru acest site.

### Edge Functions existente (NU le duplica, doar le poti apela daca e nevoie)
- somelier-chat — proxy securizat catre Claude API
- vision-analyze — proxy securizat catre Google Vision API
- ai-concierge — genereaza trasee personalizate

---

## STRIPE — Planuri de abonament

### Abonamente crame
- Basic — 49€/luna
- Standard — 99€/luna
- Premium — 199€/luna

### Abonament utilizatori
- VYNO Premium — 4.99€/luna

### Note importante
- Plata se face pe site, NU in aplicatia mobila — evitam comisionul Apple/Google 30%
- Cont Stripe nou trebuie creat (nu exista inca)
- Webhook Stripe trebuie sa actualizeze statusul in Supabase (ex: locations.subscription_tier sau users.is_premium)

---

## PRIORITATE CONSTRUIRE (recomandata)

1. Landing page cu prezentare + download APK
2. Panou Analytics (M21) — pentru tine, ca sa poti monitoriza aplicatia chiar de la primii utilizatori reali
3. Pagina "Devino partener" cu formular
4. Integrare Stripe pentru abonamente (crame + premium utilizatori)
5. Evaluare daca panoul web pentru crame e necesar (probabil nu, dashboard mobil e deja complet)

---

## NOTE TEHNICE

- Site-ul trebuie sa fie responsive (mobil + desktop), dar panoul Analytics va fi folosit in principal pe desktop
- Landing page-ul va fi vizitat mai ales de pe mobil
- APK-ul Android va fi disponibil la download direct de pe site (build-ul mobil trebuie generat separat, inca neexistent)
- iOS necesita App Store — nu se poate instala direct prin site

## RECOMANDARE DE LUCRU

La inceputul sesiunii noi de Claude Code pentru acest proiect:
1. Creeaza folder nou separat (NU in interiorul C:\Users\hp\vyno)
2. Da-i acest document ca prim context
3. Cere-i sa citeasca (daca i-l copiezi) si DB_SCHEMA.md din proiectul mobil, pentru schema exacta a tabelelor
4. Confirma cu el alegerea tehnologiei (HTML/CSS/JS simplu vs Next.js) inainte de a incepe codul
5. Foloseste acelasi pattern de migrari SQL + script de migrare automat daca sunt necesare tabele noi (ex: pentru Stripe webhooks/subscriptions)
