---
name: motion-microinteractions
description: Progetta e verifica motion, hover, transizioni, scroll, microinterazioni e stati animati in modo coerente, accessibile e performante.
---

# Motion & Microinteractions Skill

## Scopo

Usare questa skill quando bisogna:

- definire animazioni;
- progettare hover;
- progettare microinterazioni;
- gestire scroll effects;
- creare page transition;
- verificare motion esistente;
- adattare motion a touch e mobile.

---

# 1. Principio

Ogni animazione deve avere una funzione.

Possibili funzioni:

- feedback;
- orientamento;
- gerarchia;
- relazione causa-effetto;
- continuità;
- enfasi;
- transizione di stato.

Evitare motion puramente decorativa se introduce rumore o costo tecnico inutile.

---

# 2. Motion Language

Definire un linguaggio coerente per:

- velocità;
- intensità;
- easing;
- direzione;
- distanza;
- scala;
- opacity;
- delay.

Le animazioni non devono sembrare provenire da librerie differenti.

---

# 3. Timing

Classificare quando utile:

## FAST
Microfeedback.

## MEDIUM
Transizioni ordinarie.

## SLOW
Reveal o transizioni narrative.

Non usare durate lunghe per interazioni frequenti.

---

# 4. Easing

Usare easing coerenti.

Evitare:

- bounce casuale;
- overshoot continuo;
- elastic effect non motivato;
- easing differenti senza ragione.

---

# 5. Hover

L'hover deve comunicare:

- interattività;
- stato;
- gerarchia;
- feedback.

Non cambiare radicalmente layout al passaggio del mouse se non necessario.

---

# 6. Touch

Ogni comportamento hover importante deve avere una soluzione equivalente su touch.

Non dipendere da:

- cursor proximity;
- hover continuo;
- mouse tracking;
- precisione del puntatore.

---

# 7. Click / Tap

Prevedere feedback per:

- button;
- card;
- navigation;
- toggle;
- accordion;
- form.

L'utente deve percepire che l'azione è stata ricevuta.

---

# 8. Focus

Non sostituire focus accessibile con animazioni hover.

Focus e hover sono stati differenti.

---

# 9. Scroll Reveal

Usare con moderazione.

Controllare:

- trigger;
- distanza;
- opacity;
- delay;
- stagger;
- contenuti già visibili;
- ripetizione.

Evitare che ogni elemento entri dal basso nello stesso modo.

---

# 10. Scroll-driven Motion

Prima di usarla valutare:

- utilità;
- performance;
- browser support;
- fallback;
- mobile;
- reduced motion.

Non trasformare lo scroll in un ostacolo.

---

# 11. Sticky / Pinned Sections

Verificare:

- altezza viewport;
- mobile;
- zoom;
- contenuti lunghi;
- keyboard;
- orientation;
- reduced motion.

---

# 12. Page Transitions

Devono:

- mantenere orientamento;
- non rallentare navigazione;
- avere fallback;
- rispettare reduced motion.

---

# 13. Text Animation

Usare con cautela:

- split text;
- word reveal;
- character reveal;
- kinetic typography.

Non sacrificare:

- leggibilità;
- selezione testo;
- accessibility;
- performance.

---

# 14. Images

Per motion su immagini verificare:

- crop;
- scale;
- transform origin;
- parallax;
- focal point;
- overflow;
- mobile behavior.

---

# 15. Video

Controllare:

- autoplay;
- loop;
- poster;
- pause;
- scroll control;
- mobile;
- reduced motion;
- performance.

---

# 16. Cards

Possibili feedback:

- subtle translation;
- scale;
- border;
- shadow;
- image movement;
- content reveal.

Non usare simultaneamente tutti gli effetti.

---

# 17. CTA

Il feedback della CTA deve essere:

- immediato;
- leggibile;
- coerente;
- accessibile.

Evitare effetti che spostano troppo il target sotto il cursore.

---

# 18. Forms

Animazioni consentite quando migliorano:

- validation;
- success;
- error;
- loading;
- progress;
- focus.

Non nascondere errori dietro animazioni decorative.

---

# 19. Reduced Motion

Supportare:

`prefers-reduced-motion`

Quando attivo:

- ridurre movimento non essenziale;
- eliminare parallax;
- evitare grandi scale;
- evitare scroll-linked motion invasiva;
- mantenere feedback funzionali.

---

# 20. Performance

Preferire quando possibile animazioni su:

- transform;
- opacity.

Valutare attentamente animazioni di:

- width;
- height;
- top;
- left;
- filter;
- blur;
- box-shadow complessi.

---

# 21. Browser Compatibility

Per tecniche recenti verificare:

- supporto;
- fallback;
- progressive enhancement.

Non assumere compatibilità senza verifica.

---

# 22. Cross-page Consistency

Confrontare:

- hover;
- duration;
- easing;
- reveal;
- CTA;
- card;
- menu;
- modal;
- page transition.

---

# 23. Anti-pattern

Segnalare:

- tutto animato;
- reveal identico ovunque;
- magnetic button gratuito;
- 3D tilt su ogni card;
- parallax continuo;
- cursor custom invasivo;
- infinite marquee non necessario;
- effetti che rallentano l'accesso al contenuto.

---

# 24. Validation

Prima di chiudere verificare:

- [ ] funzione chiara
- [ ] timing coerente
- [ ] easing coerente
- [ ] hover
- [ ] touch
- [ ] focus
- [ ] reduced motion
- [ ] mobile
- [ ] performance
- [ ] browser
- [ ] cross-page consistency

---

# 25. Regola finale

La motion deve far percepire l'interfaccia come più chiara e intenzionale.

Se l'utente nota soprattutto l'effetto e non ciò che sta facendo, probabilmente l'animazione è troppo invasiva.
