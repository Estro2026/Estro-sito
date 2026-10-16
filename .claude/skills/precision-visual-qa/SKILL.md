---
name: precision-visual-qa
description: Verifica precisione visiva, allineamenti, spacing, grid, radius, stati, immagini e coerenza cross-page su tutti i breakpoint.
---

# Precision & Visual QA Skill

## Scopo

Usare questa skill quando bisogna:

- verificare precisione del layout;
- controllare coerenza cross-page;
- trovare micro-incoerenze;
- controllare componenti equivalenti;
- verificare desktop, zoom, tablet e mobile.

---

# 1. Principio

Il controllo deve distinguere tra:

- differenza intenzionale;
- incoerenza;
- errore;
- variazione necessaria per responsive.

Non uniformare tutto automaticamente.

---

# 2. Alignment

Controllare:

- left edge;
- right edge;
- center alignment;
- baseline;
- text alignment;
- icon alignment;
- image alignment;
- form alignment.

---

# 3. Container

Verificare:

- max-width;
- gutter;
- padding laterale;
- offset;
- relazione con header e footer.

Componenti equivalenti devono seguire lo stesso sistema.

---

# 4. Grid

Controllare:

- colonne;
- span;
- gap;
- allineamenti;
- nesting;
- eccezioni.

Segnalare valori apparentemente casuali.

---

# 5. Spacing

Controllare:

- section spacing;
- margin;
- padding;
- gap;
- text spacing;
- component spacing.

Confrontare elementi analoghi tra pagine.

---

# 6. Vertical Rhythm

Verificare:

- titoli;
- sottotitoli;
- paragrafi;
- CTA;
- card;
- sezioni;
- form.

Evitare sequenze visivamente irregolari senza motivo.

---

# 7. Typography

Controllare:

- font family;
- size;
- weight;
- line-height;
- tracking;
- capitalization;
- max-width;
- wrapping.

---

# 8. CTA

Confrontare:

- altezza;
- padding;
- radius;
- icon;
- font;
- border;
- default;
- hover;
- focus;
- active;
- disabled.

---

# 9. Cards

Confrontare:

- padding;
- gap;
- radius;
- border;
- shadow;
- image ratio;
- title position;
- CTA;
- hover;
- active.

---

# 10. Radius

Verificare coerenza di:

- buttons;
- cards;
- forms;
- images;
- modals;
- chips;
- containers.

Non usare radius diversi senza ragione progettuale.

---

# 11. Borders

Controllare:

- thickness;
- opacity;
- color;
- state;
- focus;
- hover.

---

# 12. Icons

Verificare:

- famiglia;
- peso;
- stroke/fill;
- dimensione;
- optical alignment;
- posizione;
- distanza dal testo.

---

# 13. Images

Controllare:

- aspect ratio;
- crop;
- focal point;
- radius;
- dimensione;
- allineamento;
- coerenza tra pagine.

---

# 14. Forms

Verificare:

- field height;
- label;
- padding;
- textarea;
- checkbox;
- radio;
- error;
- success;
- focus;
- gap.

---

# 15. Header

Controllare:

- altezza;
- logo;
- navigation;
- CTA;
- spacing;
- sticky state;
- mobile state.

---

# 16. Footer

Controllare:

- columns;
- alignment;
- spacing;
- typography;
- links;
- legal;
- mobile structure.

---

# 17. States

Verificare:

- default;
- hover;
- focus;
- active;
- selected;
- disabled;
- loading;
- error;
- success.

Non considerare completato un componente se esiste solo lo stato default.

---

# 18. Cross-page Consistency

Confrontare tra tutte le pagine equivalenti:

- CTA;
- section title;
- card;
- form;
- images;
- spacing;
- radius;
- header;
- footer;
- states;
- motion.

---

# 19. Responsive

Ripetere i controlli su:

- desktop;
- laptop;
- zoom;
- tablet;
- mobile.

Una UI precisa desktop può essere incoerente su viewport intermedi.

---

# 20. Browser Zoom

Controllare:

- overflow;
- allineamenti;
- width;
- wrapping;
- form;
- card;
- header;
- fixed/sticky element.

---

# 21. Mobile

Controllare:

- padding laterale;
- vertical rhythm;
- CTA width;
- form;
- immagini;
- card;
- touch target;
- component stacking.

---

# 22. Touch

Verificare:

- target size;
- spacing;
- hover fallback;
- active state;
- tap feedback.

---

# 23. Precision vs Intent

Prima di correggere una differenza chiedere:

`È una variazione intenzionale documentata?`

Se non è chiaro:

`VERIFY_DESIGN_INTENT`

---

# 24. Severity

## HIGH
Incoerenza evidente o problema sistemico.

## MEDIUM
Errore percepibile.

## LOW
Micro-rifinitura.

## VERIFY
Possibile scelta intenzionale.

---

# 25. Output

Per ogni problema indicare:

- Pagina:
- Sezione:
- Elemento:
- Proprietà:
- Stato attuale:
- Stato atteso:
- Severità:
- Cross-page: sì / no
- Responsive impact:
- Richiede verifica: sì / no

---

# 26. Quality Gate

Prima di considerare il visual QA completo:

- [ ] alignment
- [ ] grid
- [ ] spacing
- [ ] typography
- [ ] CTA
- [ ] cards
- [ ] radius
- [ ] icons
- [ ] images
- [ ] forms
- [ ] states
- [ ] header/footer
- [ ] responsive
- [ ] zoom
- [ ] mobile
- [ ] cross-page consistency

---

# 27. Regola finale

Precisione non significa rendere tutto identico.

Significa che ogni differenza deve sembrare intenzionale.
