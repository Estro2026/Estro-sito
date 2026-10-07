---
name: ux-architecture
description: Definisce information architecture, sitemap, funnel, user journey, navigazione, gerarchia, CTA e form collegando obiettivi business e bisogni utente.
---

# UX Architecture Skill

## Scopo

Usare questa skill quando bisogna:

- definire sitemap;
- progettare information architecture;
- organizzare contenuti;
- costruire user journey;
- definire funnel;
- progettare navigazione;
- definire CTA;
- progettare form;
- verificare struttura di pagina.

---

# 1. Principio

La struttura deve aiutare l'utente a capire:

- dove si trova;
- cosa può fare;
- dove trovare l'informazione;
- quale azione compiere;
- cosa succederà dopo.

Non progettare l'architettura seguendo solo l'organizzazione interna del cliente.

---

# 2. Obiettivi

Separare:

## Business
-

## Utente
-

## Conversione principale
-

## Conversioni secondarie
-

Ogni decisione UX dovrebbe supportare almeno uno di questi obiettivi.

---

# 3. Target

Per ogni target identificare quando possibile:

- bisogno;
- motivazione;
- frizione;
- livello di conoscenza;
- domanda principale;
- informazione necessaria;
- azione desiderata.

---

# 4. Intent

Classificare quando utile:

- informational;
- exploratory;
- commercial;
- transactional;
- navigational;
- support.

---

# 5. User Journey

Definire:

1. entry point;
2. orientamento;
3. informazione;
4. proof;
5. approfondimento;
6. decisione;
7. conversione.

Segnalare:

- dead end;
- passaggi inutili;
- loop;
- CTA mancanti;
- dipendenze.

---

# 6. Funnel

Non assumere che ogni progetto abbia un funnel lineare.

Valutare:

- awareness;
- consideration;
- proof;
- decision;
- conversion;
- post-conversion.

Supportare percorsi alternativi quando realistici.

---

# 7. Sitemap

Se esiste una sitemap cliente:

- conservarla come fonte;
- analizzarla;
- non sovrascriverla;
- evidenziare criticità;
- proporre modifiche separatamente.

Se non esiste:

costruire una proposta basata su:

- obiettivi;
- contenuti;
- intent;
- SEO;
- target;
- scope.

---

# 8. Information Architecture

Definire:

- pagine principali;
- pagine secondarie;
- livelli;
- cluster;
- categorie;
- relazioni;
- template;
- contenuti condivisi.

Evitare livelli inutili.

---

# 9. Navigation

Valutare:

- header;
- menu;
- dropdown;
- mega menu;
- breadcrumb;
- sidebar;
- footer;
- mobile navigation;
- sticky CTA.

La navigazione deve essere prevedibile senza essere rigida.

---

# 10. Hierarchy

Per ogni pagina definire:

1. messaggio principale;
2. informazione essenziale;
3. proof;
4. approfondimento;
5. CTA;
6. contenuto secondario.

Segnalare:

`HIERARCHY_PROBLEM`

quando contenuti secondari dominano quelli principali.

---

# 11. Hero

La hero deve chiarire quando possibile:

- cosa offre la pagina;
- per chi;
- valore principale;
- azione successiva.

Non caricarla di elementi se il messaggio perde priorità.

---

# 12. CTA Strategy

Definire:

- primaria;
- secondaria;
- contestuale;
- persistente.

Controllare:

- posizione;
- frequenza;
- coerenza;
- relazione col contenuto;
- competizione tra CTA.

---

# 13. Forms

Per ogni form definire:

- obiettivo;
- momento del journey;
- campi necessari;
- campi opzionali;
- validation;
- error;
- success;
- follow-up.

Ridurre attrito evitando campi non necessari.

---

# 14. Progressive Disclosure

Non mostrare tutto subito quando:

- il contenuto è complesso;
- l'utente non ne ha ancora bisogno;
- la densità compromette comprensione.

Usare:

- accordion;
- tab;
- step;
- detail;
- reveal;

solo quando migliorano realmente la fruizione.

---

# 15. Content Architecture

Organizzare contenuti considerando:

- priorità;
- dipendenze;
- progressione;
- proof;
- FAQ;
- supporto alla conversione.

---

# 16. Search

Quando il volume di contenuto lo richiede valutare:

- search;
- filter;
- category;
- tag;
- sorting.

Non introdurre filtri se il dataset è troppo piccolo per giustificarli.

---

# 17. Mobile UX

Verificare:

- priorità;
- ordine contenuti;
- navigation;
- CTA;
- form;
- sticky elements;
- componenti complessi;
- touch.

Mobile non deve essere una versione impoverita.

---

# 18. Responsive Hierarchy

Il cambio viewport può modificare:

- ordine;
- disposizione;
- dimensione;
- densità.

Non deve modificare la priorità concettuale senza motivo.

---

# 19. Accessibility

Considerare:

- ordine DOM;
- heading;
- focus;
- keyboard;
- form;
- touch;
- reflow;
- dynamic content.

---

# 20. SEO

Coordinare UX e SEO per:

- sitemap;
- intent;
- cluster;
- heading;
- internal linking;
- page purpose.

Segnalare:

`SEO_UX_CONFLICT`

quando le esigenze entrano in tensione.

---

# 21. Existing Site

In un redesign verificare:

- percorsi utili esistenti;
- contenuti forti;
- URL importanti;
- convenzioni apprese dagli utenti;
- problemi attuali.

Non cambiare tutto per principio.

---

# 22. Complexity

Preferire la soluzione più semplice che soddisfa:

- bisogno utente;
- obiettivo business;
- contenuto;
- requisiti tecnici.

Non aggiungere livelli, step o componenti per sembrare più sofisticati.

---

# 23. Source Labels

Distinguere:

- CLIENTE
- MATERIALE
- RICERCA
- INFERENZA
- PROPOSTA
- APPROVATO

---

# 24. Quality Gate

Prima di considerare l'architettura pronta verificare:

- [ ] obiettivi
- [ ] target
- [ ] intent
- [ ] user journey
- [ ] funnel
- [ ] sitemap
- [ ] navigation
- [ ] hierarchy
- [ ] CTA
- [ ] forms
- [ ] mobile
- [ ] accessibility
- [ ] SEO
- [ ] nessun dead end evidente
- [ ] assunzioni marcate

---

# 25. Regola finale

Una buona architettura deve sembrare semplice all'utente anche quando il progetto è complesso.

La complessità organizzativa non deve essere trasferita all'interfaccia.
