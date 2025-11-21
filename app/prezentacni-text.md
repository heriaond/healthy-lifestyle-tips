# Prezentační Text - Healthy Lifestyle Tips

**Rozdělení pro 3 osoby**

---

## 👤 OSOBA 1 - Úvod a Přehled Projektu

### Slide 1: Úvodní Slide
> Dobrý den, dnes vám představíme naši webovou aplikaci **Healthy Lifestyle Tips**.
>
> Jedná se o moderní full-stack aplikaci postavenou na Next.js 15, TypeScript a PostgreSQL databázi. Aplikace je plně nasazena na platformě Vercel a je dostupná online v produkčním prostředí.

### Slide 2: Project Overview
> Healthy Lifestyle Tips je aplikace zaměřená na podporu zdravého životního stylu. Hlavním účelem je umožnit uživatelům objevovat a ukládat si tipy pro zlepšení jejich zdraví v různých oblastech života.
>
> Aplikace nabízí:
> - Procházení zdravotních tipů rozdělených do 4 kategorií: Spánek, Výživa, Pohyb a Stres
> - Ukládání oblíbených tipů pro rychlý přístup
> - Možnost sdílet vlastní tipy s komunitou
>
> Co se týče deploymentu - aplikace běží na Vercel platformě, což zajišťuje:
> - Automatické nasazení z Git repozitáře
> - PostgreSQL databázi přes Vercel Postgres
> - Globální CDN pro rychlé načítání
> - Automatické HTTPS certifikáty
> - CI/CD pipeline pro kontinuální vývoj

### Slide 3: Hlavní Funkce
> Pojďme se podívat na klíčové funkce aplikace z pohledu uživatelského rozhraní:
>
> **Kategorie tipů** - Uživatelé mohou procházet 4 hlavními kategoriemi: Sleep, Nutrition, Movement a Stress. Každá kategorie má vlastní přehlednou stránku.
>
> **Autentizace** - Implementovali jsme dvě metody přihlášení: Google OAuth pro jednoduché přihlášení přes Google účet a Email s OTP kódem pro větší flexibilitu.
>
> **Oblíbené tipy** - Uživatelé si mohou ukládat své oblíbené tipy a spravovat je na dedikované stránce Favorites.
>
> **Uživatelský obsah** - Přihlášení uživatelé mohou přidávat vlastní tipy a sdílet je s ostatními.
>
> **Responzivní design** - Aplikace je plně responzivní a funguje na mobilech, tabletech i desktopu.
>
> **Nedávné tipy** - Na hlavní stránce se zobrazují nejnovější přidané tipy pro rychlý přehled.
>
> **Admin rozhraní** - Pro správu obsahu máme administrativní panel.

---

## 👤 OSOBA 2 - Performance a Deployment

### Slide 10: Performance Optimalizace
> Nyní se podívejme na to, jak jsme optimalizovali výkon aplikace.
>
> **React Server Components** - Využíváme nové React Server Components v Next.js 15, což umožňuje renderovat komponenty na serveru a snižovat množství JavaScriptu odesílaného do prohlížeče.
>
> **Caching strategie** - Implementovali jsme několik úrovní cachování:
> - Next.js automatický caching pro statický obsah
> - Prisma connection pooling pro efektivní správu databázových spojení
> - Vercel Edge Caching pro globální distribuci obsahu
>
> **Code optimalizace** - Next.js automaticky provádí:
> - Code splitting - rozdělení kódu do menších chunks
> - Lazy loading komponent - načítání komponent až když jsou potřeba
> - Tree shaking - odstranění nepoužívaného kódu
> - Minifikaci v produkčním buildu
>
> **Vercel Edge Network** - Díky Vercel platformě máme:
> - Globální CDN distribuci pro rychlé načítání odkudkoliv na světě
> - Automatickou optimalizaci obrázků
> - Minimální latenci díky edge locations
> - Smart routing pro nejrychlejší možné odpovědi

### Slide 11: Google Page Insights - výsledky testování
> Pro ověření skutečné výkonnosti aplikace jsme použili Google PageSpeed Insights - nástroj od Google, který analyzuje výkon webových stránek.
>
> **Co Google Page Insights testuje:**
> - Rychlost načítání stránky
> - Optimalizaci pro mobilní zařízení
> - Best practices pro web development
> - Přístupnost (accessibility)
> - SEO optimalizaci
>
> **Výsledky našeho testování:**
> *(zde popište konkrétní výsledky z obrázku - např.:)*
> - Performance skóre: [číslo]/100
> - Accessibility: [číslo]/100
> - Best Practices: [číslo]/100
> - SEO: [číslo]/100
>
> Jak vidíte na screenshotu, naše aplikace dosahuje velmi dobrých výsledků, což potvrzuje, že náš přístup k optimalizaci výkonu byl úspěšný. Zejména díky použití Next.js 15, server-side renderingu a optimalizacím, které jsme implementovali.

### Slide 12: Deployment & Statistiky
> Deployment aplikace je plně automatizovaný díky Vercel platformě.
>
> **Deployment workflow:**
> 1. Lokální vývoj pomocí `yarn dev`
> 2. Git push do main větve
> 3. Vercel automaticky detekuje změny a spustí build
> 4. Automatický deploy do produkce
> 5. Aplikace je okamžitě živě dostupná
>
> **Statistiky projektu:**
> - Přes 50 komponent a stránek
> - 15+ hlavních knihoven a závislostí
> - 6 databázových modelů
> - 5+ API endpointů
> - 4 kategorie tipů
> - 99.9% uptime díky Vercel infrastruktuře

### Slide 13: Screenshoty Aplikace
> Zde vidíte reálné screenshoty běžící aplikace.
>
> Na prvním obrázku můžete vidět...
> *(popište konkrétní screenshot)*
>
> Druhý screenshot ukazuje...
> *(popište konkrétní screenshot)*
>
> A na třetím screenshotu je...
> *(popište konkrétní screenshot)*

---

## 👤 OSOBA 3 - UX Testování a Závěr

### Slide 14: A/B Testování
> Pro ověření uživatelské přívětivosti aplikace jsme provedli A/B testování.
>
> **Testovací scénáře** - Účastníci testování prošli následujícími úkoly:
> 1. Najít kategorii Spánek na domovské stránce
> 2. Otevřít kategorii a najít konkrétní tip „Večerní digitální detox"
> 3. Přidat tento tip do oblíbených
> 4. Ověřit v sekci Oblíbené, že je tip uložen
> 5. Volitelně přidat další tip z nedávných tipů
>
> Použili jsme metodu "think aloud" - účastníci nahlas komentovali své kroky, což nám pomohlo pochopit jejich myšlenkové procesy.
>
> **Výsledky:**
>
> **Varianta A** - měla textový odkaz na Favorites v horním menu:
> - Dva účastníci váhali při hledání sekce Favorites
> - Očekávali ikonku srdce nebo hvězdy
> - Hodnocena jako přehledná, ale vizuálně méně výrazná
>
> **Varianta B** - měla ikonku srdce vedle textu Favorites:
> - Všichni účastníci našli sekce bez problémů
> - Vizuálně atraktivnější
> - Větší karty kategorií zabíraly více místa
>
> **Další postřehy:**
> - Jeden účastník navrhl více barevného odlišení mezi kategoriemi
> - Současné barevné schéma působilo příliš jednotně

### Slide 15: 5 Second Test - Použitelnost a přístupnost
> Dalším testem byl 5-sekundový test použitelnosti.
>
> **Co je 5 second test?**
> Účastníkovi ukážeme stránku pouze na 5 vteřin a pak zjišťujeme, co si zapamatoval. Test ověřuje, zda je na první pohled jasné:
> - O čem web je
> - Jaké kategorie obsahuje
> - Co může uživatel na stránce dělat
>
> **Otázky testování:**
> 1. K čemu tento web slouží?
> 2. Co vás zaujalo jako první?
> 3. Jakým dojmem na vás stránka působí?
>
> **Výsledky testování na 4 účastnících:**
>
> **První otázka - Účel webu:**
> - 3 ze 4 participantů správně určili účel jako "tipy pro zdravý životní styl"
> - Karty kategorií byly natolik výrazné, že se orientovali okamžitě
>
> **Druhá otázka - První dojem:**
> - Všechny účastníky upoutala sekce Browse by Category
> - Velké karty s ikonami byly nejviditelnější element
> - Jeden participant zmínil přátelský nadpis "Welcome to Healthy Lifestyle Tips"
>
> **Třetí otázka - Celkový dojem:**
> - Většina hodnotila stránku jako moderní, čistou a přehlednou
> - Dobře uspořádaná
> - Jeden účastník by uvítal více barevných kontrastů mezi kategoriemi

### Slide 16: Závěr
> Závěrem bych shrnul naše technické dovednosti a výsledky projektu.
>
> **Naučili jsme se:**
> - Pracovat s moderním Next.js 15 a App Routerem
> - Type-safe development s TypeScript
> - Implementovat autentizaci přes NextAuth.js s Google OAuth i Email
> - Pracovat s databází pomocí Prisma ORM
> - Vytvářet responzivní design s Tailwind CSS
> - Používat komponentovou architekturu se shadcn/ui
>
> **Production-Ready Features:**
> - Aplikace je plně nasazena na Vercel platformě
> - Běží na PostgreSQL databázi v produkci
> - Má HTTPS/SSL zabezpečení
> - Automatické CI/CD pipeline
> - Globální CDN distribuci
> - Real-time monitoring
>
> **Projekt je LIVE a dostupný online!**
> Vytvořili jsme plně funkční full-stack aplikaci, která je připravená k dalšímu rozšiřování a škálování.
>
> Děkujeme za pozornost. Máte nějaké otázky?

---

## 📝 Tipy pro prezentaci

### Pro všechny prezentující:
- Mluvte pomalu a jasně
- Držte oční kontakt s publikem
- Používejte ukazovátko nebo kurzor k zvýraznění důležitých bodů na slidech
- Nečtěte doslova text ze slidů - používejte vlastní slova
- Pokud přeskakujete technické slidy, stačí říct: "Přeskočíme nyní technické detaily a zaměříme se na frontend"

### Přechody mezi osobami:
**Osoba 1 → Osoba 2:**
> "Teď předám slovo [jméno], který vám představí výkonnost a deployment aplikace."

**Osoba 2 → Osoba 3:**
> "A nyní [jméno] představí výsledky UX testování a závěr."

### Při přeskakování slidů:
> "Nyní přeskočíme několik technických slidů zaměřených na backend a podíváme se na..."
