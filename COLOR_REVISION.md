# VYNO — REVIZUIRE IDENTITATE VIZUALA
### Schimbare fundamentala: de la dark mode la light/cream premium

## DECIZIE NOUA (inlocuieste paleta veche ca prioritate de fundal)

Vechea paleta avea negru (#0D0D0D) ca fundal principal. Aceasta s-a dovedit gresita — pare generic "tech app dark mode", nu "eticheta de vin premium". Noua directie: **crem/auriu deschis ca baza**, negru si burgundy doar ca accente.

## PALETA REVIZUITA

Culorile raman aceleasi 4 culori de baza (nu adaugam culori noi), dar IERARHIA se inverseaza:

```
Fundal principal:     #FAF6EE (crem) — era accent, devine baza
Fundal secundar:      #F5EDE0 (crem usor mai inchis, pentru variatie sectiuni)
Text principal:       #0D0D0D (negru) — era fundal, devine text
Text secundar:        rgba(13,13,13,0.6) (negru cu opacitate)
Accent/CTA:           #4A1219 (burgundy) — ramane accent principal
Accent auriu:         #C9A84C — ramane accent, dar folosit pe fundal deschis acum
```

### Cum se foloseste fiecare culoare acum:

- **#FAF6EE (crem)** — fundalul majoritatii sectiunilor, ca hartia unei etichete premium
- **#0D0D0D (negru)** — text principal, titluri, elemente de contrast puternic — NU mai e fundal global
- **#4A1219 (burgundy)** — butoane primare, accente, posibil ca fundal pentru sectiuni de contrast (ex: o sectiune inchisa intentionat pentru variatie, gen "eticheta neagra" intr-o colectie de etichete crem)
- **#C9A84C (auriu)** — linii, accente, text mic, ramane element de "lux" dar pe fundal deschis se vede diferit (mai bine ca text/linie decat ca fundal)

## CE SE PASTREAZA DIN BRIEF-UL ANTERIOR (DESIGN_BRIEF.md)

Aceste principii raman valabile, doar fundalul se schimba:
- Tipografie mare, Cormorant Garamond ca element central
- Asimetrie, spatiu editorial generos
- Animatii subtile la scroll
- Evitarea pattern-urilor generice (hero centrat, carduri identice)

## CE SE ADAUGA NOU — substanta vizuala legata de vin

Lipsa principala semnalata: design-ul anterior nu comunica vizual "vin" la prima privire. Solutii:

### Imagini (generate AI temporar, inlocuibile cu poze reale ulterior)
- Hero: imagine atmosferica de podgorie la apus/ora aurie, tonuri calde care se armonizeaza cu crem+burgundy+auriu
- Sectiune felul "Ce este VYNO": imagine cu sticle de vin stilizate sau detaliu de struguri/frunze de vita
- Sectiune crame: imagine de pivnita/butoaie de stejar

Imaginile trebuie sa aiba o tonalitate calda (auriu, burgundy, maro) ca sa se integreze cu paleta noua, nu imagini reci/albastre.

### Texturi subtile (optional, daca se poate implementa usor)
- O textura foarte subtila de hartie/panza pe fundalul crem (opacity foarte mica, doar senzatie tactila, nu vizibila explicit)

## APLICARE PE AMBELE PROIECTE

Aceasta schimbare se aplica IDENTIC pe:
1. Site-ul vyno-site (Next.js) — fundal crem, restructurare completa a paginii deja construite
2. Aplicatia mobila vyno (React Native) — schimbare in constants/colors.ts, propagata in toate ecranele existente (App.tsx, LoginScreen, CramaScreen, ScanScreen, SomelierScreen, ProfileScreen, FeedScreen, RegionsScreen, VarietiesScreen, ExperiencesScreen, RoutesScreen, ConciergeScreen, CalendarScreen, PassportScreen, CollectionScreen, WineryDashboardScreen, toate componentele)

## ATENTIE LA IMPLEMENTARE PE APLICATIA MOBILA

Aplicatia mobila are deja ZECI de ecrane functionale cu stilul vechi (dark) hardcodat in StyleSheet.create() in fiecare fisier, NU doar prin constants/colors.ts central. Schimbarea va necesita:
1. Update constants/colors.ts cu noua paleta
2. Cautare si inlocuire sistematica in fiecare ecran a culorilor hardcodate (multe fisiere folosesc direct '#0D0D0D', 'rgba(250,246,238,...)' etc in loc sa importe din colors.ts)
3. Verificare ca toate elementele raman lizibile (text negru pe fundal crem are contrast bun, dar elementele care erau "text deschis pe fundal inchis" trebuie inversate logic)
4. Testare vizuala pe MULTE ecrane, nu doar Home — risc de regresie vizuala extinsa

Recomandare: implementare graduala, ecran cu ecran, testare dupa fiecare, NU schimbare globala dintr-o singura comanda fara verificare.
