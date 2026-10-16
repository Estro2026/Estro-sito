# ESTRO — istruzioni di progetto

- **Prima di modificare UI, stile, layout, copy o animazioni leggi `DESIGN_SYSTEM.md`** (source of truth: font, scale, colori, spazi, radius, CTA, hover, breakpoint) e `ESTRO_UI_MOTION_RULES.md` (struttura e motion delle pagine servizi). Riusa token e componenti esistenti, non inventare valori.
- Se cambi un valore di sistema aggiorna `DESIGN_SYSTEM.md` nello stesso intervento.
- Le correzioni per tutti gli schermi vanno in `css/responsive.css` e `js/responsive.js` (ultimo CSS caricato, pattern `html body .x:not(#_):not(#__) {…!important}`).
- Parole mai spezzate; niente trattini lunghi come separatore nei testi; niente sezioni che trattengono lo scroll.
- I form sono GHL: il loro CSS si cambia in `css/ghl-form*.css` (da incollare in GHL), non nelle pagine.
- Dopo ogni modifica CSS/JS aggiorna il numero `?v=` dei link nelle pagine.
