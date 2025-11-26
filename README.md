# FSK 2025 Kursusmaterialer Website

Dette er en simpel website til at dele kursusmaterialer med studerende via GitHub Pages.

## Sådan uploader du til GitHub

### Trin 1: Opret et GitHub repository

1. Gå til [GitHub](https://github.com) og log ind
2. Klik på "New repository" eller "+" i øverste højre hjørne
3. Navngiv dit repository (f.eks. "FSK-2025-Materials")
4. Vælg "Public" så dine studerende kan få adgang
5. Klik "Create repository"

### Trin 2: Upload filerne

Der er to måder at gøre dette på:

#### Metode A: Via GitHub website (nemmest)

1. I dit nye repository, klik på "uploading an existing file"
2. Træk og slip ALLE filer og mapper fra denne mappe
3. Skriv en commit besked (f.eks. "Initial upload af kursusmaterialer")
4. Klik "Commit changes"

#### Metode B: Via Git kommandolinje

Hvis du har Git installeret, kan du bruge terminalen:

```bash
cd "G:\My Drive\Documents-Work\FSK_2025\FSK-2025-Shared"
git init
git add .
git commit -m "Initial upload af kursusmaterialer"
git branch -M main
git remote add origin https://github.com/DIT-BRUGERNAVN/DIT-REPO-NAVN.git
git push -u origin main
```

Husk at erstatte `DIT-BRUGERNAVN` og `DIT-REPO-NAVN` med dine egne værdier.

### Trin 3: Aktivér GitHub Pages

1. Gå til dit repository på GitHub
2. Klik på "Settings" (tandhjul-ikonet)
3. Scroll ned til "Pages" i venstre menu
4. Under "Source", vælg "main" branch
5. Klik "Save"
6. Efter et par minutter vil din website være tilgængelig på:
   `https://DIT-BRUGERNAVN.github.io/DIT-REPO-NAVN/`

### Trin 4: Del linket med dine studerende

Din website er nu live! Del URL'en med dine studerende:
`https://DIT-BRUGERNAVN.github.io/DIT-REPO-NAVN/`

## Opdatering af materialer

Når du vil tilføje eller opdatere filer:

### Automatisk generering af index.html

**Vigtigt**: Denne website bruger nu et automatisk build-script til at opdatere index.html!

1. **Tilføj dine nye filer/mapper** til de relevante mapper
2. **Kør build-scriptet** for at opdatere index.html:
   ```bash
   node build-index.js
   ```
3. **Upload til GitHub** (både de nye filer OG den opdaterede index.html)
4. GitHub Pages vil automatisk opdatere websiten inden for 1-2 minutter

**Fordele ved build-scriptet:**
- Du behøver IKKE manuelt redigere index.html mere
- Alle nye filer bliver automatisk tilføjet til websiten
- Mapper organiseres automatisk alfabetisk
- Korrekte ikoner tildeles baseret på filtype
- Submappe-struktur bevares automatisk

**Sådan virker det:**
- Build-scriptet scanner alle mapper i projektet
- Det ignorerer system-filer (.git, .claude, osv.)
- Det genererer en frisk index.html med alle dine filer
- HTML-filer åbnes i ny fane, andre filer downloades

## Funktioner

- **Intuitivt interface**: Studerende kan nemt navigere gennem mapper
- **Download-funktion**: Klik på en fil for at downloade den
- **Responsivt design**: Virker på både computer og mobil
- **HTML-filer åbnes i browser**: Guides åbnes i en ny fane

## Filstruktur

```
FSK-2025-Shared/
├── index.html          (Hovedside - genereres automatisk!)
├── styles.css          (Styling)
├── script.js           (Interaktivitet)
├── build-index.js      (Build-script til at generere index.html)
├── README.md           (Denne fil)
├── Dag_02_opgave_01/   (Opgave mapper)
├── Dag_02_opgave_02/
├── ...
└── Guides/             (Vejledninger)
```

## Support

Hvis du har problemer, kan du:
- Tjekke [GitHub Pages dokumentation](https://docs.github.com/en/pages)
- Kontakte GitHub Support
- Spørge på Stack Overflow

## Licens

Dette materiale er til undervisningsbrug.
