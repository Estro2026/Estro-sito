---
name: ux-ui-project-analysis
description: Analizza materiali di progetto UX/UI e costruisce una base strutturata distinguendo requisiti reali, inferenze, ricerca, proposte e decisioni approvate.
---

# UX/UI Project Analysis Skill

## Scopo

Usare questa skill quando bisogna analizzare materiali iniziali di un progetto prima di progettare.

Serve per:

- leggere brief;
- analizzare materiali cliente;
- sintetizzare requisiti;
- rilevare informazioni mancanti;
- distinguere fonti;
- individuare vincoli;
- preparare input affidabili per UX, UI, SEO, content e sviluppo.

---

# 1. Gerarchia delle fonti

Classificare sempre le informazioni come:

- CLIENTE
- MATERIALE
- RICERCA
- INFERENZA
- PROPOSTA
- APPROVATO

Non presentare mai un'inferenza come requisito cliente.

---

# 2. Materiali da analizzare

Quando disponibili:

- brief strategico;
- brief visuale;
- brief tecnico;
- sitemap;
- copy;
- brand identity;
- PDF;
- immagini;
- video;
- sito esistente;
- documenti Basecamp;
- feedback;
- file tecnici;
- repository.

---

# 3. Obiettivi

Separare:

## Business
-

## Utente
-

## Conversione principale
-

## Conversioni secondarie
-

---

# 4. Target

Estrarre quando disponibile:

- target principale;
- target secondario;
- bisogno;
- problema;
- motivazione;
- contesto;
- livello di conoscenza.

Se non presente:

`TARGET_MISSING`

---

# 5. Tipo di progetto

Identificare:

- multipage;
- one-page;
- landing;
- redesign;
- estensione;
- altro.

Se non certo:

`PROJECT_TYPE_TO_VERIFY`

---

# 6. Sitemap

Se presente:

- preservarla;
- registrarla come fonte;
- non modificarla automaticamente;
- passarla a UX e SEO.

---

# 7. Sito esistente

Se esiste:

registrare:

- URL;
- stato;
- elementi da mantenere;
- problemi segnalati;
- contenuti rilevanti.

Richiedere audit separato.

---

# 8. Contraddizioni

Quando due fonti sono in conflitto:

segnalare:

`SOURCE_CONFLICT`

Non scegliere arbitrariamente.

---

# 9. Informazioni mancanti

Classificare:

## BLOCKER
Impedisce di procedere.

## IMPORTANT
Serve prima di una fase successiva.

## OPTIONAL
Utile ma non bloccante.

---

# 10. Materiali obsoleti

Segnalare:

`POSSIBLY_OUTDATED`

quando un file sembra superato o incoerente con materiali più recenti.

Non cancellarlo.

---

# 11. Output

L'analisi deve essere:

- sintetica;
- verificabile;
- tracciabile;
- senza supposizioni nascoste;
- utile agli agenti successivi.

---

# 12. Regola finale

Prima di progettare bisogna sapere cosa è realmente noto.

Non completare i vuoti inventando requisiti.
