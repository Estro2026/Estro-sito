---
name: image-media-direction
description: Analizza, seleziona e specifica immagini e media coerenti con contenuto, brand e art direction, controllando crop, ratio, qualità, peso, responsive e rischio di visual generici o artificiali.
---

# Image & Media Direction Skill

## Scopo

Usare questa skill quando bisogna:

- scegliere immagini;
- verificare asset;
- definire crop;
- impostare ratio;
- ottimizzare formati;
- adattare immagini a desktop/mobile;
- valutare coerenza visiva;
- individuare visual troppo generici o artificiali.

---

# 1. Principio

Un'immagine deve avere una funzione.

Possibili funzioni:

- spiegare;
- contestualizzare;
- emozionare;
- dare identità;
- mostrare prodotto;
- creare ritmo;
- supportare gerarchia.

Non inserire immagini solo per riempire spazio.

---

# 2. Coerenza con Art Direction

Verificare:

- luce;
- colore;
- contrasto;
- soggetto;
- ambiente;
- composizione;
- trattamento;
- livello di spontaneità;
- realismo;
- texture;
- profondità.

---

# 3. Relazione con il contenuto

L'immagine deve avere relazione concreta con:

- titolo;
- sezione;
- messaggio;
- target;
- servizio;
- prodotto.

Segnalare:

`IMAGE_CONTENT_MISMATCH`

quando il visual è solo decorativo ma sembra comunicare contenuto.

---

# 4. Hero Images

Controllare:

- focal point;
- aree libere per testo;
- aree libere per form;
- crop desktop;
- crop mobile;
- leggibilità;
- contrasto;
- responsive behavior.

---

# 5. Crop

Definire:

- aspect ratio;
- object-position;
- focal point;
- comportamento su viewport diversi.

Non usare un unico crop se compromette il soggetto su mobile.

---

# 6. Aspect Ratio

Mantenere ratio coerenti per componenti equivalenti.

Esempi:

- card;
- case study;
- testimonial;
- gallery;
- hero;
- team.

---

# 7. Qualità

Controllare:

- risoluzione;
- nitidezza;
- compressione;
- artefatti;
- upscale evidente;
- pixelation;
- blur involontario.

---

# 8. Formati

Preferire quando appropriato:

- WebP;
- AVIF;
- SVG;
- PNG solo quando necessario;
- JPG per fallback o casi specifici.

Non convertire indiscriminatamente.

---

# 9. Peso

Ottimizzare senza degradare visibilmente.

Controllare:

- dimensioni reali;
- risoluzione servita;
- compressione;
- lazy loading;
- responsive sources.

---

# 10. Responsive Images

Quando pertinente usare:

- srcset;
- sizes;
- source;
- breakpoint crop;
- mobile-specific asset.

---

# 11. Background Images

Verificare:

- leggibilità testo;
- contrasto;
- crop;
- performance;
- overlay;
- comportamento su zoom;
- mobile.

---

# 12. Video

Controllare:

- peso;
- codec;
- poster;
- autoplay;
- loop;
- mute;
- playsinline;
- mobile;
- reduced motion;
- fallback.

---

# 13. SVG

Verificare:

- viewBox;
- scaling;
- stroke;
- fill;
- accessibilità;
- peso;
- uso inline vs file.

---

# 14. Icone

Controllare:

- coerenza;
- peso;
- famiglia;
- stroke/fill;
- dimensione;
- optical alignment.

---

# 15. AI Visual Pattern

Segnalare:

`AI_VISUAL_PATTERN`

quando un'immagine presenta segnali come:

- pelle troppo perfetta;
- luce generica cinematic;
- mani anomale;
- testo impossibile;
- dettagli incoerenti;
- pattern ripetuti;
- soggetti troppo levigati;
- composizione da prompt;
- eccesso di simboli;
- stile stock artificiale.

Non dichiarare con certezza che un'immagine è AI se non verificabile.

---

# 16. Visual Genericità

Chiedere:

- potrebbe stare sul sito di qualunque brand?
- comunica davvero qualcosa di specifico?
- è coerente con il materiale cliente?
- deriva dal progetto o da un trend?

Segnalare:

`GENERIC_VISUAL`

quando manca specificità.

---

# 17. Duplicazioni

Controllare:

- stessa immagine riutilizzata;
- varianti quasi identiche;
- crop duplicati;
- asset ridondanti.

Non eliminare file senza approvazione.

---

# 18. Alt Text

Per immagini informative:

- descrivere funzione o contenuto.

Per decorative:

- alt vuoto.

Non riempire alt con keyword.

---

# 19. Testo dentro immagini

Evitare quando possibile contenuti essenziali dentro immagini.

Problemi:

- accessibilità;
- responsive;
- SEO;
- traduzioni;
- leggibilità.

---

# 20. Cross-page Consistency

Confrontare:

- trattamento;
- ratio;
- crop;
- saturazione;
- luce;
- radius;
- distanza;
- stile.

---

# 21. Asset mancanti

Segnalare:

`IMAGE_MISSING`

indicando:

- pagina;
- sezione;
- tipo immagine;
- ratio suggerito;
- orientamento;
- funzione;
- priorità.

---

# 22. Quality Gate

Prima di considerare gli asset pronti verificare:

- [ ] coerenza art direction
- [ ] relazione col contenuto
- [ ] crop
- [ ] ratio
- [ ] desktop
- [ ] mobile
- [ ] qualità
- [ ] peso
- [ ] formato
- [ ] responsive sources
- [ ] alt
- [ ] anti-generic review
- [ ] AI visual review

---

# 23. Regola finale

Le immagini devono sembrare scelte per quel progetto.

Non semplicemente abbastanza belle da poterci stare.
