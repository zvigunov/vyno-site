# VYNO — DESIGN_BRIEF.md
### Brief de design pentru aplicatie mobila + site, identitate vizuala unificata

## DIRECTIE: Minimalist Editorial

Gandeste-te la reviste premium de stil de viata (Kinfolk, Cereal Magazine, Monocle) — NU la SaaS dashboard-uri sau landing page-uri de startup tech. VYNO vinde o experienta culturala (vin, tradiție, calatorie), nu un produs software.

---

## CE TREBUIE EVITAT EXPLICIT (anti-pattern AI generic)

NU folosi niciunul din urmatoarele, chiar daca par "sigure":
- Gradiente de fundal (linear-gradient pe hero sau carduri)
- Carduri toate identice ca marime, cu acelasi border-radius, in grid perfect simetric
- Hero centrat cu titlu mare + subtitlu + 2 butoane unul langa altul (pattern-ul #1 cel mai recunoscut ca "AI generated")
- Iconite in cercuri colorate identice deasupra fiecarui card de feature
- Trei coloane perfect egale pentru orice (pricing, features, testimoniale)
- Umbre (box-shadow) generice pe toate cardurile
- Texte centrate peste tot
- Sectiuni cu padding vertical identic, una dupa alta, fara ritm vizual

## CE TREBUIE FACUT IN SCHIMB

### Spatiu si ritm vizual
- Spatii albe GENEROASE, inegale intentionat — unele sectiuni foarte aerisite, altele mai compacte, creand ritm
- Margini asimetrice — continutul nu trebuie sa fie mereu centrat; las-o sa respire spre stanga sau dreapta
- Latimi de continut variabile — un text editorial poate fi ingust (60-70 caractere/linie) chiar daca ecranul e larg

### Tipografie ca element central de design
- Cormorant Garamond la dimensiuni MARI si neasteptate — titluri de 48-80px, nu doar 24-32px
- Text editorial real — nu doar "headline + 1 propozitie", ci paragrafe scurte care spun o poveste (2-3 propozitii cu personalitate, ton uman)
- Variatie de greutate — combina Cormorant regular cu italic pentru accent (deja exista in cod: CormorantGaramond_400Regular_Italic)
- Letter-spacing generos pe texte mici (labels, categorii) — deja folosit corect in aplicatie (letterSpacing 2-4px)

### Animatii si interactiune (cerinta explicita a clientului)
- Fade-in + slight translate-Y la scroll pentru sectiuni (text apare "ridicandu-se" usor, nu doar opacity)
- Parallax subtil pe imagini de fundal (daca exista) — miscare lenta la scroll, nu agresiva
- Numere care se anima crescator (counter) la statistici (ex: "200+ crame" se numara de la 0)
- Hover states cu tranzitii line, nu instant — schimbari de culoare/opacitate in 300-400ms
- Underline care se deseneaza la hover pe linkuri (width 0 → 100%), nu underline static

### Compozitie asimetrica
- Imagini/elemente vizuale NU centrate — pozitionate spre o margine, cu text care curge in jurul lor
- Suprapuneri intentionate — un element text peste marginea unei imagini/card, nu totul in cutii separate
- Linii subtiri (1px) ca elemente de separare grafica, nu doar borders pe carduri — o linie auriu care traverseaza o sectiune

### Culori — folosire rafinata, nu literala
Paleta ramane STRICT: #0D0D0D, #4A1219, #C9A84C, #FAF6EE — dar:
- Foloseste opacitati joase pentru subtilitate (rgba cu 0.03-0.1 pentru fundaluri texturate, nu culoare solida)
- Auriul (#C9A84C) ca accent RAR si precis — o linie, un cuvant, un detaliu — nu pe toate butoanele/iconitele
- Negrul (#0D0D0D) cu variatii foarte subtile de nuanta intre sectiuni, nu un singur ton plat peste tot

---

## REFERINTE DE COMPORTAMENT (nu vizuale, ci de gandire)

Cand Claude Code genereaza o sectiune noua, ar trebui sa-si puna intrebarea:
"Daca as arata asta unei persoane si as intreba 'a fost facut de AI sau de un designer uman care a petrecut ore pe detalii?', ce raspunde?"

Semnale ca ceva e prea generic:
- Daca poti descrie sectiunea in cuvinte standard ("hero cu titlu si CTA", "3 carduri cu iconite") fara nimic specific de mentionat
- Daca elimini brand-ul (VYNO) si ar putea fi orice alt produs

---

## APLICARE CONSISTENTA APP + SITE

Conform cerintei: identitate 100% identica intre aplicatia mobila si site. Asta inseamna:
- Aceleasi 4 culori, fara variatii
- Aceleasi 2 fonturi (Cormorant Garamond + Inter)
- Acelasi logo (V + punct auriu + YNO)
- Acelasi ton: elegant, calm, nu "energic startup"
- Stilul de iconite trebuie sa fie CONSISTENT intre app (Ionicons, stroke subtire) si site (Lucide cu strokeWidth 1.5, acelasi stil de linie subtire) — nu identice ca librarie, dar identice ca SENZATIE vizuala

Diferenta acceptata: layout-ul se adapteaza la mediu (mobil = vertical, single column; web = poate folosi spatiul orizontal pentru asimetrie si compozitii mai complexe), dar personalitatea vizuala ramane aceeasi.

---

## PRIORITATE DE APLICARE

1. Landing page site — cea mai vizibila, prima impresie
2. Ecranul Home din aplicatia mobila — al doilea cel mai vazut
3. Restul paginilor site (parteneri, premium)
4. Restul ecranelor aplicatiei (deja construite functional, polish vizual ulterior)
