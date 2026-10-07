---
name: accessibility
description: Progetta e verifica accessibilità di struttura, contenuti, interazioni, form, focus, contrasto, tastiera, touch, zoom, reflow e motion secondo pratiche web correnti.
---

# Accessibility Skill

## Scopo

Usare questa skill quando bisogna:

- progettare componenti accessibili;
- revisionare interfacce;
- verificare codice frontend;
- controllare form;
- controllare motion;
- verificare responsive e reflow.

---

# 1. Principio

L'accessibilità deve essere considerata durante la progettazione, non aggiunta alla fine.

Non trattarla come checklist puramente tecnica.

---

# 2. Semantic HTML

Preferire elementi nativi:

- header;
- nav;
- main;
- section;
- article;
- aside;
- footer;
- button;
- form;
- label;
- input;
- details;
- summary.

Non usare `div` interattivi quando esiste un elemento semantico adatto.

---

# 3. Heading

Controllare:

- H1 principale;
- gerarchia logica;
- ordine comprensibile;
- heading realmente descrittivi.

Non usare heading solo per ottenere uno stile grafico.

---

# 4. Keyboard

Ogni interazione importante deve essere utilizzabile da tastiera.

Controllare:

- Tab;
- Shift+Tab;
- Enter;
- Space;
- Escape;
- arrow keys quando appropriate.

---

# 5. Focus

Il focus deve essere:

- visibile;
- coerente;
- non rimosso;
- sufficientemente distinguibile.

Controllare il focus su:

- link;
- button;
- form;
- menu;
- modal;
- carousel;
- custom controls.

---

# 6. Focus Order

L'ordine di focus deve seguire l'ordine logico della pagina.

Evitare `tabindex` positivi.

---

# 7. Contrast

Verificare contrasto per:

- testo;
- CTA;
- link;
- input;
- placeholder rilevanti;
- icone funzionali;
- focus;
- stati.

Non affidarsi solo alla percezione visiva.

---

# 8. Color Independence

Non comunicare informazioni esclusivamente tramite colore.

Esempi:

- error;
- success;
- selected;
- required;
- status.

Aggiungere testo, icona o altro segnale.

---

# 9. Forms

Controllare:

- label reale;
- required;
- autocomplete;
- istruzioni;
- error message;
- associazione errore/campo;
- focus error;
- success state;
- grouping;
- checkbox;
- radio.

Placeholder non sostituisce la label.

---

# 10. Links

Il testo dei link deve essere comprensibile nel contesto.

Evitare quando possibile:

- clicca qui;
- scopri di più;
- leggi altro;

se non è chiaro cosa succede.

---

# 11. Buttons

Un button deve rappresentare un'azione.

Un link deve rappresentare una navigazione.

Non scambiarli solo per comodità CSS.

---

# 12. Images

Definire:

- alt descrittivo per immagini informative;
- alt vuoto per immagini decorative;
- evitare duplicazione del testo vicino;
- non inserire informazioni essenziali solo dentro un'immagine.

---

# 13. Icons

Se un'icona è interattiva:

- nome accessibile;
- touch target adeguato;
- focus;
- stato.

Le icone decorative non devono creare rumore per screen reader.

---

# 14. Touch Target

Controllare dimensione e distanza dei target interattivi.

Evitare elementi troppo piccoli o troppo ravvicinati.

---

# 15. Zoom

L'interfaccia deve restare utilizzabile con zoom elevato.

Controllare:

- reflow;
- overflow;
- contenuti tagliati;
- fixed height;
- modali;
- navigation;
- form.

---

# 16. Reflow

Il contenuto deve poter adattarsi senza richiedere scroll orizzontale non necessario.

Eccezioni solo per contenuti che lo richiedono realmente.

---

# 17. Text Spacing

Il layout deve tollerare variazioni di:

- line-height;
- letter spacing;
- word spacing;
- paragraph spacing.

Evitare container rigidi che rompono il contenuto.

---

# 18. Motion

Supportare:

`prefers-reduced-motion`

Ridurre o rimuovere animazioni non essenziali quando richiesto.

Evitare motion che può causare:

- disorientamento;
- nausea;
- perdita di contesto.

---

# 19. Autoplay

Audio e video non devono creare disturbo o perdita di controllo.

Quando necessario prevedere:

- pause;
- stop;
- mute;
- controls.

---

# 20. Modal

Controllare:

- focus iniziale;
- focus trap;
- Escape;
- ritorno focus;
- titolo;
- relazione semantica;
- background non interattivo.

---

# 21. Carousel

Prevedere:

- controlli comprensibili;
- pausa;
- tastiera;
- touch;
- focus;
- reduced motion.

Non rendere informazioni importanti accessibili solo tramite autoplay.

---

# 22. Dynamic Content

Per contenuti aggiornati dinamicamente valutare:

- focus management;
- live region;
- feedback;
- stato loading;
- stato error;
- stato success.

---

# 23. Tables

Usare tabelle solo per dati tabellari.

Controllare:

- header;
- scope;
- caption quando utile;
- responsive behavior.

---

# 24. Mobile

Verificare:

- touch;
- zoom;
- orientation;
- form;
- keyboard virtuale;
- sticky element;
- viewport.

---

# 25. Responsive

L'accessibilità va verificata su:

- desktop;
- zoom;
- tablet;
- mobile;
- touch.

Un componente accessibile desktop può non esserlo su mobile.

---

# 26. Content

Il testo deve essere:

- comprensibile;
- leggibile;
- sufficientemente specifico;
- coerente.

Accessibilità non significa solo codice.

---

# 27. ARIA

Prima regola:

preferire HTML nativo.

Usare ARIA solo quando necessaria e corretta.

ARIA non corregge una struttura HTML sbagliata.

---

# 28. Validation

Prima di chiudere una verifica controllare almeno:

- [ ] semantic HTML
- [ ] heading
- [ ] keyboard
- [ ] focus
- [ ] contrast
- [ ] forms
- [ ] links/buttons
- [ ] images
- [ ] touch
- [ ] zoom
- [ ] reflow
- [ ] motion
- [ ] responsive

---

# 29. Severity

Usare:

## BLOCKER
Impedisce utilizzo o accesso a contenuti/funzioni essenziali.

## HIGH
Problema importante di accessibilità.

## MEDIUM
Problema significativo ma aggirabile.

## LOW
Miglioramento.

## VERIFY
Richiede test o verifica specifica.

---

# 30. Regola finale

Non dichiarare conformità completa basandosi solo su controlli automatici.

Accessibilità richiede anche verifica manuale e uso reale dell'interfaccia.
