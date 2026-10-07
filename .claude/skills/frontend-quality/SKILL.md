---
name: frontend-quality
description: Verifica e migliora qualità frontend, semanticità, struttura HTML, CSS, JavaScript, componentizzazione, performance, browser compatibility e robustezza senza introdurre refactor non necessari.
---

# Frontend Quality Skill

## Scopo

Usare questa skill quando bisogna:

- sviluppare componenti frontend;
- revisionare codice;
- correggere bug;
- migliorare performance;
- verificare semanticità;
- controllare browser compatibility;
- prevenire regressioni.

---

# 1. Principio

Preferire:

- soluzioni semplici;
- CSS nativo;
- HTML semantico;
- progressive enhancement;
- componenti riutilizzabili;
- dipendenze minime.

Evitare overengineering.

---

# 2. HTML

Controllare:

- semantic elements;
- heading hierarchy;
- landmark;
- button vs link;
- form structure;
- label;
- alt;
- valid nesting;
- DOM non inutilmente complesso.

---

# 3. CSS

Controllare:

- cascade;
- specificity;
- inheritance;
- custom properties;
- layout;
- responsive;
- duplication;
- override;
- magic numbers;
- component isolation.

Preferire regole condivise a patch locali.

---

# 4. Layout

Usare quando appropriato:

- Flexbox;
- Grid;
- intrinsic sizing;
- min/max;
- clamp;
- modern responsive units.

Evitare positioning assoluto per layout ordinario.

---

# 5. JavaScript

Controllare:

- necessità reale;
- event handling;
- state;
- cleanup;
- DOM query;
- error handling;
- race condition;
- memory leak;
- progressive enhancement.

Non usare JS per problemi risolvibili bene con HTML/CSS.

---

# 6. Componentizzazione

Identificare elementi condivisi:

- header;
- CTA;
- card;
- form;
- modal;
- carousel;
- navigation;
- footer.

Evitare duplicazione di componenti equivalenti.

---

# 7. Design System

Riutilizzare quando disponibili:

- tokens;
- spacing;
- typography;
- color;
- radius;
- component rules.

Non creare valori locali se esiste già una regola globale equivalente.

---

# 8. Responsive

Verificare:

- desktop;
- laptop;
- zoom;
- tablet;
- mobile;
- touch;
- orientation;
- long content.

Non risolvere overflow nascondendolo senza capire la causa.

---

# 9. Browser Compatibility

Controllare le feature non universalmente supportate.

Quando necessario prevedere:

- fallback;
- progressive enhancement;
- graceful degradation.

---

# 10. Performance

Controllare:

- JavaScript non necessario;
- bundle;
- third-party;
- font;
- images;
- video;
- animation;
- layout shift;
- rendering;
- lazy loading.

---

# 11. Images

Verificare:

- dimensions;
- width/height;
- aspect ratio;
- responsive images;
- srcset;
- sizes;
- lazy loading;
- format;
- compression.

---

# 12. Video

Verificare:

- preload;
- autoplay;
- muted;
- playsinline;
- poster;
- responsive;
- fallback;
- peso.

---

# 13. Motion

Preferire quando possibile:

- transform;
- opacity.

Evitare animazioni che causano layout continuo se non necessarie.

Considerare:

`prefers-reduced-motion`.

---

# 14. Forms

Controllare:

- native validation;
- custom validation;
- errors;
- success;
- required;
- autocomplete;
- accessibility;
- submit state;
- loading.

---

# 15. Accessibility

Il frontend deve supportare:

- keyboard;
- focus;
- semantic HTML;
- screen reader;
- reflow;
- zoom;
- reduced motion;
- touch.

---

# 16. Errori console

Prima di considerare concluso un task verificare:

- JavaScript errors;
- warnings rilevanti;
- missing assets;
- network failures;
- failed requests.

---

# 17. Link

Controllare:

- href;
- target;
- external link;
- broken link;
- anchor;
- CTA.

---

# 18. Code Quality

Preferire codice:

- leggibile;
- prevedibile;
- coerente;
- localmente comprensibile;
- facile da mantenere.

Evitare astrazioni premature.

---

# 19. Bug Fix

Quando si corregge un bug:

1. individuare la causa;
2. verificare se è locale o sistemica;
3. correggere alla fonte;
4. evitare override non necessari;
5. verificare regressioni.

---

# 20. Anti-regression

Dopo una modifica controllare gli elementi equivalenti nelle altre pagine.

Una correzione locale non deve rompere un componente condiviso.

---

# 21. Refactor

Non effettuare refactor non richiesti salvo quando:

- sono necessari per correggere il problema;
- riducono una causa sistemica;
- evitano duplicazioni critiche.

---

# 22. Dependencies

Prima di introdurre una dipendenza verificare:

- necessità;
- peso;
- manutenzione;
- browser support;
- alternative native.

---

# 23. Validation

Prima di chiudere un task verificare almeno:

- [ ] comportamento corretto
- [ ] nessuna regressione evidente
- [ ] responsive
- [ ] browser rilevanti
- [ ] accessibility pertinente
- [ ] console
- [ ] asset
- [ ] performance ragionevole

---

# 24. Regola finale

La soluzione migliore non è quella con più codice.

È quella che risolve il problema nel modo più semplice, robusto e mantenibile possibile.
