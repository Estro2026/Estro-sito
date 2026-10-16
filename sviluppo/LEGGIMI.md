# ESTRO · cartella di sviluppo

Sito statico (50 pagine html) pronto da pubblicare: caricare il contenuto di `sito/` nella radice del dominio.

## Struttura
- `sito/` — il sito. `index.html` + pagine principali nella radice; `servizi/`, `news/`, `tips-tricks/`, `case-studies/`; `css/`, `js/`; `assets/` (`img/`, `video/`, `fonts/vanguard/`, `docs/`, `favicon/`); `favicon.ico`.
- `integrazioni/ghl/` — CSS dei form GoHighLevel (non caricati dal sito: da incollare in GHL).
- `docs/` — `mappa-rinomina-asset.csv` (vecchio nome → nuovo), `file-non-usati.csv` (188 file del progetto di lavoro non richiamati da nessuna pagina, non copiati), `inventario-originale.csv`, `verifica-collegamenti.md`, `DESIGN_SYSTEM.md`, `ESTRO_UI_MOTION_RULES.md`.
- `strumenti/` — script PowerShell: `costruisci-sviluppo.ps1` (rigenera `sito/` dal progetto di lavoro), `verifica-collegamenti.ps1`, `inventario.ps1`.

## Regole sugli asset
- Immagini: solo webp (eccezioni: svg, `favicon.ico`, 3 png in `assets/favicon/` per le icone app).
- Nomi: minuscolo, solo `a-z 0-9 -`, nessuno spazio o simbolo; nome file unico in tutto il sito (prefisso di categoria: `cs-`, `cslogo-`, `brand-`, `tips-`…). File identici unificati (9).
- Percorsi relativi, con le maiuscole esatte (compatibili con server Linux).

## Verifiche eseguite
- `verifica-collegamenti.ps1` su `sito/`: 57 file di codice, 5268 riferimenti → 0 mancanti, 0 nomi non puliti, 0 immagini non webp, 0 id duplicati, 0 img senza alt, 0 ancore rotte.
- Browser (13 pagine): nessuna immagine, font o risorsa locale in errore.

## Da risolvere prima della pubblicazione
- Mancano i PDF di `case-studies/dama24.html`: caricare `assets/docs/dama24-presentazione.pdf` e `assets/docs/dama24-linee-guida.pdf`.
- Recensioni della homepage: testi segnaposto da sostituire.
- Peso: `showreel-estro-25-a7.mp4` 87 MB, `gattoabout.webm` 31 MB, brochure PDF 23 MB: valutare compressione.
- Dipendenze esterne: Google Fonts, Vimeo, CloudFront (mp4), tally.so, iubenda, form GHL.
