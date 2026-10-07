---
name: anti-ai-generic-style
description: Individua pattern testuali, visivi e comportamentali che rendono un progetto generico, template-like, artificiale o riconoscibilmente AI e propone alternative più specifiche per brand e contenuto.
---

# Anti-AI Generic Style Skill

## Scopo

Usare questa skill quando bisogna verificare se:

- copy;
- UI;
- art direction;
- immagini;
- motion;
- componenti;
- microinterazioni;

sembrano troppo generici, prevedibili o costruiti tramite pattern automatici.

---

# 1. Principio

L'obiettivo non è nascondere l'uso dell'AI.

L'obiettivo è evitare che il risultato sembri generico perché costruito con soluzioni automatiche e poco specifiche.

Ogni scelta dovrebbe derivare da:

- brand;
- contenuto;
- target;
- funzione;
- contesto;
- materiale cliente.

---

# 2. Copy

Segnalare abuso di:

- "non solo... ma anche...";
- "dove X incontra Y";
- "molto più di";
- "il futuro di";
- "un'esperienza unica";
- "soluzioni su misura";
- "innovativo";
- "dinamico";
- "immersivo";
- "autentico";
- "rivoluzionare";
- "ridefinire";
- "portare al livello successivo".

Non eliminare automaticamente se realmente appropriato.

---

# 3. Copy Structure

Segnalare:

- triadi continue;
- frasi troppo simmetriche;
- paragrafi tutti uguali;
- conclusioni ad effetto;
- eccesso di heading;
- liste continue;
- tono troppo levigato;
- marketing senza informazioni concrete.

---

# 4. UI

Segnalare uso automatico o eccessivo di:

- glassmorphism;
- blur;
- glow;
- gradienti;
- pill;
- card flottanti;
- radius molto grandi;
- mesh background;
- blob;
- elementi orbitanti;
- badge decorativi;
- dashboard aesthetic;
- sezioni composte solo da card.

---

# 5. Hero

Controllare combinazioni troppo prevedibili:

- badge;
- titolo enorme;
- parola colorata;
- sottotitolo;
- doppia CTA;
- mockup inclinato;
- floating object;
- glow;
- gradient background.

Non sono errori singolarmente.

Diventano problema quando la combinazione non deriva dal progetto.

---

# 6. Layout

Segnalare:

- alternanza immagine/testo ripetuta meccanicamente;
- sezioni tutte centrate;
- stessa griglia ovunque;
- stessa altezza card ovunque;
- simmetria eccessiva;
- composizione troppo perfetta;
- sezioni create per mostrare effetti anziché contenuti.

---

# 7. Art Direction

Segnalare uso gratuito di:

- neon tech;
- futurismo generico;
- gradienti viola/blu;
- liquid metal;
- chrome;
- grain;
- brutalism;
- editorial fashion;
- 3D abstract;
- oggetti sospesi;
- texture trendy.

Chiedere sempre:

`Perché questo appartiene a questo brand?`

---

# 8. Typography

Segnalare:

- display font scelto solo perché trendy;
- serif + sans usati automaticamente per effetto editoriale;
- maiuscole spaziate ovunque;
- italic gratuito;
- oversized typography senza gerarchia reale;
- parole isolate enormi solo decorative.

---

# 9. Images

Segnalare:

- luce cinematografica generica;
- pelle troppo perfetta;
- composizione da prompt;
- simboli eccessivi;
- persone artificialmente "diverse";
- profondità di campo irreale;
- dettagli incoerenti;
- texture perfette;
- stock aesthetic.

Usare:

`AI_VISUAL_PATTERN`

quando è un sospetto percettivo, non una prova.

---

# 10. Motion

Segnalare:

- tutto entra dal basso;
- scale hover su tutte le card;
- parallax ovunque;
- magnetic button;
- cursor custom gratuito;
- marquee continuo;
- 3D tilt;
- reveal identici;
- page transition troppo spettacolare.

---

# 11. Microinteractions

Segnalare quando:

- ogni CTA ha un effetto;
- ogni icona ruota;
- ogni card si solleva;
- ogni testo viene animato;
- troppi stati competono tra loro.

---

# 12. Brand Specificity

Per ogni scelta importante chiedere:

- potrebbe stare su un altro sito?
- sarebbe riconoscibile senza logo?
- deriva dai materiali cliente?
- deriva dal contenuto?
- deriva dal target?
- deriva dal prodotto o servizio?

Se quasi tutto è intercambiabile:

`GENERIC_BRAND_EXPRESSION`

---

# 13. Cross-page

Controllare due rischi opposti:

## Troppa uniformità
Ogni sezione sembra duplicata.

## Troppa varietà
Ogni pagina sembra appartenere a un sito diverso.

---

# 14. Reference Dependency

Segnalare quando il progetto sembra troppo vicino a una reference.

Estrarre:

- principio;
- comportamento;
- qualità;

non:

- layout completo;
- combinazione visiva;
- animazione distintiva;
- identità.

---

# 15. Trend Dependency

Non usare un trend solo perché:

- è recente;
- appare premium;
- è popolare;
- viene usato in molti showcase.

Valutare sempre pertinenza.

---

# 16. Specificità

Preferire:

- contenuto reale;
- materiale cliente;
- dettagli specifici;
- imperfezioni controllate;
- composizioni motivate;
- variazione legata al contenuto.

---

# 17. Non introdurre imperfezioni artificiali

Non rendere il progetto volutamente:

- disordinato;
- scorretto;
- incoerente;
- casuale;

solo per farlo sembrare umano.

Naturalità non significa errore volontario.

---

# 18. Severity

## HIGH
Il progetto appare chiaramente generico o template-like.

## MEDIUM
Pattern riconoscibile che riduce specificità.

## LOW
Raffinamento.

## VERIFY
Possibile scelta intenzionale.

---

# 19. Output

Per ogni problema indicare:

- Pagina:
- Sezione:
- Elemento:
- Categoria:
- Pattern rilevato:
- Perché appare generico:
- Relazione col brand:
- Severità:
- Alternativa proposta:
- Richiede approvazione:

---

# 20. Quality Gate

Verificare:

- [ ] copy
- [ ] hero
- [ ] layout
- [ ] typography
- [ ] UI
- [ ] art direction
- [ ] images
- [ ] motion
- [ ] microinteractions
- [ ] cross-page
- [ ] brand specificity
- [ ] reference dependency
- [ ] trend dependency

---

# 21. Regola finale

Una soluzione semplice ma specifica è migliore di una soluzione spettacolare ma intercambiabile.

Ogni scelta deve sembrare derivare dal progetto, non dal tool usato per generarla.
