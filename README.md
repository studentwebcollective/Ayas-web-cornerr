# Aya's Web Corner

De officiële website voor **Aya's Web Corner** — webdesign op maat voor vrouwelijke ondernemers.

## 🚀 Online zetten via GitHub (Stap voor stap)

De repository is al volledig voorbereid met een automatische GitHub Actions workflow (`.github/workflows/deploy.yml`) en relatieve paden in Vite.

### Stap 1: Maak een nieuwe repository aan op GitHub
1. Ga naar [github.com/new](https://github.com/new).
2. Kies een naam voor je repository (bijvoorbeeld `ayas-web-corner` of `jouw-gebruikersnaam.github.io`).
3. Zet de zichtbaarheid op **Public** (openbaar).
4. Laat "Add a README file" **uitgevinkt**.
5. Klik op **Create repository**.

### Stap 2: Upload of push je bestanden naar GitHub
Als je Git op je computer gebruikt:
```bash
git init
git add .
git commit -m "Eerste versie van Aya's Web Corner"
git branch -M main
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/JOUW-REPO-NAAM.git
git push -u origin main
```
*(Of gebruik de GitHub Desktop app / VS Code om de map naar GitHub te publiceren).*

### Stap 3: Activeer GitHub Pages (slechts 1 klik!)
1. Ga in je repository op GitHub naar **Settings** (tabblad bovenaan).
2. Klik in het linkermenu op **Pages**.
3. Onder **Build and deployment** > **Source**, kies:
   👉 **GitHub Actions**
4. Zodra je dit instelt, start GitHub automatisch de workflow en is je website binnen ~1 minuut gratis live op:
   `https://jouw-gebruikersnaam.github.io/jouw-repo-naam/`

---

## 💻 Lokaal ontwikkelen

1. Installeer dependencies:
   ```bash
   npm install
   ```
2. Start de development server:
   ```bash
   npm run dev
   ```
3. Bouw voor productie:
   ```bash
   npm run build
   ```
