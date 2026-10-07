---
name: development-handoff-estimation
description: Documenta comportamento, responsive, motion, CMS, integrazioni, complessità e stime di sviluppo preparando un handoff chiaro e verificabile.
---

# Development Handoff & Estimation Skill

## Scopo

Usare questa skill quando bisogna:

- annotare wireframe o mockup;
- preparare note sviluppo;
- stimare complessità;
- stimare ore;
- documentare dipendenze;
- preparare handoff;
- aggiornare stime dopo feedback.

---

# 1. Principio

Una stima deve essere:

- leggibile;
- motivata;
- tracciabile;
- aggiornata;
- legata allo scope reale.

Non produrre numeri arbitrari.

---

# 2. Unità di analisi

Stimare per:

- pagina;
- template;
- componente condiviso;
- funzionalità;
- integrazione;
- motion;
- responsive;
- QA.

Evitare di conteggiare più volte lo stesso componente condiviso.

---

# 3. Complessità

Usare:

## SIMPLE
Comportamento standard, poche varianti.

## MEDIUM
Più stati, responsive articolato o logica moderata.

## HIGH
Interazioni complesse, integrazioni, CMS articolato o motion avanzata.

La complessità non coincide automaticamente con il numero di righe di codice.

---

# 4. Note di sviluppo

Per ogni elemento rilevante indicare:

- comportamento;
- desktop;
- tablet;
- mobile;
- touch;
- stati;
- contenuto dinamico;
- CMS;
- integrazioni;
- motion;
- accessibility;
- SEO tecnico se pertinente.

---

# 5. Componenti condivisi

Identificare componenti riutilizzati:

- header;
- footer;
- CTA;
- card;
- form;
- accordion;
- carousel;
- modal;
- navigation;
- section pattern.

Stimare la costruzione una volta e poi solo le varianti aggiuntive.

---

# 6. Responsive Effort

Considerare:

- desktop;
- laptop;
- zoom;
- tablet;
- mobile;
- touch;
- orientation;
- long content.

Un layout semplice desktop può richiedere più lavoro responsive.

---

# 7. Motion Effort

Valutare separatamente:

- hover;
- reveal;
- scroll;
- page transition;
- video;
- microinteraction;
- reduced motion;
- touch fallback.

---

# 8. CMS Effort

Considerare:

- content type;
- campi;
- tassonomie;
- relazioni;
- filtri;
- template dinamici;
- editor;
- variabilità dei contenuti.

---

# 9. Integration Effort

Per ogni integrazione indicare:

- servizio;
- tipo;
- API / plugin / embed;
- autenticazione;
- configurazione;
- frontend impact;
- testing;
- dipendenza esterna.

---

# 10. Form Effort

Considerare:

- campi;
- validation;
- error;
- success;
- conditional logic;
- CRM;
- newsletter;
- spam protection;
- tracking;
- privacy.

---

# 11. Accessibility Effort

Includere quando necessario:

- semantic structure;
- keyboard;
- focus;
- form;
- modal;
- carousel;
- reduced motion;
- reflow;
- testing.

Non trattarla come attività opzionale.

---

# 12. Browser QA

Considerare:

- Chrome;
- Safari;
- Firefox;
- Edge;
- iOS Safari;
- Android Chrome.

Aggiungere browser legacy solo se realmente richiesti.

---

# 13. Performance

Considerare effort per:

- image optimization;
- video;
- font;
- lazy loading;
- third-party;
- animation;
- performance tuning.

---

# 14. Assunzioni

Ogni stima deve indicare le assunzioni importanti.

Esempi:

- copy già disponibile;
- immagini già approvate;
- API funzionante;
- CMS già installato;
- nessuna migrazione dati complessa.

---

# 15. Esclusioni

Indicare esplicitamente ciò che non è incluso.

Esempi:

- copywriting;
- produzione foto;
- traduzioni;
- backend custom;
- migrazione dati;
- hosting;
- legal;
- integrazioni non ancora definite.

---

# 16. Dipendenze

Per ogni dipendenza indicare:

- responsabile;
- stato;
- blocca sviluppo: sì/no;
- impatto.

---

# 17. Range

Preferire range:

`min - max`

quando esiste incertezza.

Non usare una singola cifra falsa-precisa quando scope o dipendenze sono ancora aperti.

---

# 18. Stato stima

Usare:

## PRELIMINARY
Basata su brief o IA.

## DESIGN_BASED
Basata su wireframe/mockup.

## FINAL_ESTIMATE
Scope e comportamento sufficientemente definiti.

---

# 19. Feedback

Quando un feedback cambia:

- pagine;
- componenti;
- responsive;
- motion;
- CMS;
- integrazioni;
- funzionalità;

ricalcolare il delta.

Registrare:

- stima precedente;
- variazione;
- nuova stima;
- motivo.

---

# 20. Scope Change

Segnalare:

`SCOPE_CHANGE`

quando il lavoro richiesto non era incluso nello scope precedente.

Non nasconderlo dentro una correzione.

---

# 21. Handoff

Prima dello sviluppo documentare:

- scope;
- pagine;
- template;
- componenti;
- stati;
- responsive;
- motion;
- CMS;
- forms;
- integrations;
- SEO;
- accessibility;
- assets;
- open decisions.

---

# 22. Open Decisions

Registrare:

- decisione;
- responsabile;
- impatto;
- blocca sviluppo: sì/no.

---

# 23. Definition of Ready

Prima dello sviluppo verificare:

- [ ] scope chiaro
- [ ] design approvato
- [ ] componenti identificati
- [ ] responsive definito
- [ ] motion definita
- [ ] CMS definito
- [ ] integrazioni definite
- [ ] contenuti disponibili o marcati placeholder
- [ ] accessibilità documentata
- [ ] SEO documentato
- [ ] stima aggiornata
- [ ] blocker espliciti

---

# 24. Regola finale

Lo sviluppatore non dovrebbe dover indovinare:

- cosa costruire;
- come deve comportarsi;
- cosa è condiviso;
- cosa è variabile;
- cosa è ancora aperto.

Un buon handoff riduce interpretazioni, rilavorazioni e sorprese sulla stima.
