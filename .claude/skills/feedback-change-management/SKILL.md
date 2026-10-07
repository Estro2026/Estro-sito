---
name: feedback-change-management
description: Analizza feedback e richieste di modifica, identifica impatti, conflitti, scope change, dipendenze e approval gate prima di applicare cambiamenti.
---

# Feedback & Change Management Skill

## Scopo

Usare questa skill quando bisogna:

- interpretare feedback cliente;
- analizzare commenti Basecamp;
- gestire correzioni;
- distinguere bug da richieste nuove;
- valutare impatti cross-page;
- rilevare scope change;
- aggiornare stime;
- decidere quali agenti attivare;
- preparare modifiche da approvare.

---

# 1. Principio

Un feedback non equivale automaticamente a una modifica da applicare.

Prima bisogna capire:

- cosa chiede;
- perché;
- dove impatta;
- cosa potrebbe rompere;
- se modifica lo scope;
- se contraddice decisioni precedenti;
- se richiede approvazione.

---

# 2. Preservare il feedback originale

Registrare sempre:

- testo originale;
- fonte;
- autore;
- data;
- allegati;
- pagina;
- sezione;
- componente.

Non sostituire il feedback originale con una parafrasi.

---

# 3. Separazione

Distinguere:

## RICHIESTA
Ciò che viene chiesto esplicitamente.

## INTERPRETAZIONE
Ciò che sembra voler ottenere.

## INFERENZA
Effetti non dichiarati.

## PROPOSTA
Soluzione suggerita.

Non mischiare questi livelli.

---

# 4. Classificazione

Possibili categorie:

- UX
- IA
- UI
- Art Direction
- Content
- Copy
- Responsive
- Mobile
- Zoom
- Precision
- Image
- Motion
- Accessibility
- SEO
- Frontend
- Technical
- CMS
- Integration
- Performance
- Bug
- Scope
- Estimate

---

# 5. Ambiguità

Se esistono interpretazioni diverse:

segnalare:

`FEEDBACK_AMBIGUOUS`

e indicare:

- interpretazione A;
- interpretazione B;
- differenza;
- decisione necessaria.

Non applicare modifiche.

---

# 6. Bug vs Change

Classificare:

## BUG
Il comportamento attuale è incoerente con una regola già definita.

## REFINEMENT
Miglioramento limitato.

## DESIGN_CHANGE
Cambio intenzionale del design.

## CONTENT_CHANGE
Cambio del contenuto.

## SCOPE_CHANGE
Nuova funzionalità, pagina, integrazione o comportamento non previsto.

---

# 7. Scope

Segnalare:

`SCOPE_CHANGE`

quando una richiesta aggiunge:

- pagina;
- template;
- componente;
- integrazione;
- funzione;
- CMS logic;
- motion significativa;
- nuova variante responsive;
- nuova produzione di contenuti.

---

# 8. Impact Mapping

Per ogni feedback verificare impatto su:

- UX;
- UI;
- content;
- responsive;
- images;
- motion;
- accessibility;
- SEO;
- frontend;
- technical;
- estimate.

---

# 9. Local vs Global

Chiedere sempre:

`Questa modifica riguarda una singola istanza o una regola condivisa?`

Se condivisa:

intervenire sulla sorgente comune.

Evitare patch duplicate pagina per pagina.

---

# 10. Cross-page Impact

Se cambia:

- CTA;
- card;
- spacing;
- typography;
- radius;
- form;
- hover;
- header;
- footer;

verificare tutte le pagine equivalenti.

---

# 11. Responsive Impact

Verificare:

- desktop;
- laptop;
- zoom;
- tablet;
- mobile;
- touch.

Una modifica desktop può creare regressioni altrove.

---

# 12. Content Impact

Se il feedback cambia copy:

verificare:

- significato;
- tono;
- lunghezza;
- wrapping;
- SEO;
- CTA;
- cross-page consistency.

---

# 13. Image Impact

Se cambia un'immagine:

verificare:

- crop;
- focal point;
- desktop;
- mobile;
- peso;
- alt;
- relazione col contenuto.

---

# 14. Motion Impact

Se cambia motion:

verificare:

- timing;
- touch;
- reduced motion;
- performance;
- browser;
- cross-page consistency.

---

# 15. Accessibility Impact

Verificare se la modifica influenza:

- contrasto;
- focus;
- keyboard;
- touch target;
- form;
- heading;
- reflow;
- motion.

---

# 16. SEO Impact

Verificare se cambia:

- URL;
- heading;
- content;
- internal linking;
- sitemap;
- metadata;
- indexability.

---

# 17. Technical Impact

Verificare:

- componenti;
- CMS;
- JS;
- API;
- integration;
- browser;
- performance;
- code structure.

---

# 18. Estimate Impact

Se cambia effort:

registrare:

- stima precedente;
- delta;
- nuova stima;
- motivo.

Non assorbire automaticamente uno scope change nella stima originale.

---

# 19. Conflitti

Confrontare il feedback con:

- brief;
- sitemap;
- wireframe approvato;
- mockup approvato;
- design system;
- feedback precedenti;
- technical constraints.

Segnalare:

`FEEDBACK_CONFLICT`

quando necessario.

---

# 20. Duplicati

Se più commenti chiedono la stessa cosa:

raggrupparli.

Non generare task duplicati.

---

# 21. Priorità

Usare:

## BLOCKER
Impedisce avanzamento.

## HIGH
Da risolvere prima della prossima consegna.

## MEDIUM
Importante ma non bloccante.

## LOW
Raffinamento.

## VERIFY
Serve chiarimento.

---

# 22. Approval Gate

Prima di modificare elementi approvati usare:

`WAITING_FOR_APPROVAL`

soprattutto per:

- struttura;
- design;
- copy;
- images;
- motion;
- scope;
- estimate;
- functionality.

---

# 23. Dopo approvazione

Procedura:

1. identificare agente competente;
2. applicare modifica;
3. aggiornare documentazione;
4. aggiornare stima se necessario;
5. eseguire QA pertinente;
6. verificare regressioni;
7. chiudere feedback.

---

# 24. Stato

Usare:

- NEW
- ANALYZING
- NEEDS_CLARIFICATION
- WAITING_FOR_APPROVAL
- APPROVED
- REJECTED
- APPLYING
- READY_FOR_QA
- VERIFIED
- DONE

---

# 25. Output

Per ogni feedback indicare:

- Fonte:
- Testo originale:
- Classificazione:
- Interpretazione:
- Scope:
- File coinvolti:
- Pagine coinvolte:
- Impatti:
- Conflitti:
- Proposta:
- Delta stima:
- Richiede approvazione:
- Stato:

---

# 26. Regola finale

Ogni modifica deve essere intenzionale, tracciabile e proporzionata.

Un commento locale non deve produrre conseguenze globali non controllate.
