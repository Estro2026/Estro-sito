---
name: responsive-ux-ui
description: Progetta e verifica layout responsive su desktop, laptop, zoom browser, tablet, mobile e touch preservando gerarchia, leggibilità e coerenza.
---

# Responsive UX/UI Skill

## Scopo

Usare questa skill quando bisogna progettare, correggere o verificare il comportamento responsive di un'interfaccia.

Serve per:

- desktop;
- laptop;
- browser zoom;
- tablet;
- mobile;
- touch;
- landscape;
- reflow;
- casi limite.

---

# 1. Principio

Responsive non significa semplicemente:

`mettere tutto in colonna`.

La struttura deve adattarsi preservando:

- gerarchia;
- priorità;
- leggibilità;
- funzionalità;
- relazione tra elementi.

---

# 2. Desktop

Controllare:

- container;
- max-width;
- colonne;
- whitespace;
- immagini;
- form;
- CTA;
- allineamenti;
- proporzioni.

---

# 3. Laptop

Verificare che il layout non dipenda da viewport molto larghe.

Controllare:

- compressione orizzontale;
- titoli troppo grandi;
- form troppo stretti;
- card troppo dense;
- spaziature.

---

# 4. Browser Zoom

Testare quando rilevante:

- 110%;
- 125%;
- 150%;
- 175%;
- 200%;
- reflow elevato.

Controllare:

- overflow;
- sovrapposizioni;
- elementi tagliati;
- form;
- heading;
- CTA;
- immagini.

Non trattare lo zoom come un breakpoint mobile arbitrario.

---

# 5. Tablet

Valutare:

- portrait;
- landscape;
- touch;
- densità;
- navigation;
- form;
- card;
- immagini;
- CTA.

---

# 6. Mobile

Definire:

- priorità contenuti;
- ordine;
- spacing;
- typography;
- immagini;
- CTA;
- form;
- menu;
- componenti complessi.

---

# 7. Touch

Non dipendere esclusivamente da:

- hover;
- mouse precision;
- cursor custom;
- drag non evidente.

Prevedere alternative touch.

---

# 8. Typography

Controllare:

- font-size;
- line-height;
- max-width;
- wrapping;
- titoli;
- body;
- CTA;
- label.

Evitare righe troppo corte o troppo lunghe.

---

# 9. Images

Controllare:

- crop;
- aspect ratio;
- focal point;
- object-fit;
- mobile crop;
- responsive sources;
- peso.

---

# 10. Forms

Verificare:

- larghezza;
- stacking;
- label;
- textarea;
- checkbox;
- radio;
- error;
- success;
- touch target.

---

# 11. Components

Per ogni componente definire:

- desktop;
- tablet;
- mobile;
- touch;
- stato compresso;
- eventuale trasformazione.

---

# 12. Long Content

Testare:

- titoli lunghi;
- CTA lunghe;
- testi reali;
- traduzioni;
- contenuti CMS variabili.

---

# 13. Accessibility

Supportare:

- reflow;
- zoom;
- focus;
- keyboard;
- touch target;
- reduced motion.

---

# 14. Anti-pattern

Evitare:

- breakpoint basati su singolo device;
- valori casuali;
- overflow nascosto come soluzione;
- font troppo piccoli;
- elementi importanti rimossi senza motivo;
- hover essenziale su touch;
- stack verticale prematuro quando esiste ancora spazio utile.

---

# 15. Validation

Verificare almeno:

- desktop ampio;
- laptop;
- zoom browser;
- tablet portrait;
- tablet landscape;
- mobile;
- touch.

---

# 16. Regola finale

Ogni adattamento responsive deve risolvere un problema reale di spazio, contenuto o interazione.

Non cambiare struttura solo perché il viewport è più piccolo.
