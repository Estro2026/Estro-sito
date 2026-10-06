# ESTRO — Design System (source of truth)

Ricavato dal codice reale (`css/tokens.css`, `css/base.css`, `css/components.css`, `css/responsive.css`, blocchi inline di `index.html` e delle pagine). Nessun valore è inventato: dove il codice ha più valori per la stessa cosa è segnalato in **Incoerenze**.

**Prima di toccare UI o stile consulta questo file** e `ESTRO_UI_MOTION_RULES.md` (regole di struttura e motion delle pagine servizi). Se cambi un valore di sistema, aggiorna qui.

Ordine dei file CSS: `tokens → base → components → hero → (inline pagina) → responsive`. `css/responsive.css` è l'ultimo e vince (selettori `html body .x:not(#_):not(#__) {… !important}`). Titoli "fit": `js/responsive.js`.

---

## 1. Font

| Uso | Famiglia |
|---|---|
| Titoli (`--font-primary`) | `'Special Gothic Expanded One', 'TitleFallback', 'VanguardCF', 'Impact', sans-serif` |
| Testo (`--font-secondary`) | `'DM Sans', 'Helvetica Neue', Arial, sans-serif` |

Form GHL: DM Sans 400/500/600 (importata nel foglio da incollare in GHL).

## 2. Scala tipografica

Token (`tokens.css`):

| Token | Valore | Uso |
|---|---|---|
| `--text-xs` | 0.6875rem | label, didascalie (base di `.btn`) |
| `--text-sm` | 0.8125rem | testo secondario |
| `--text-base` | 1rem | corpo |
| `--text-md` | clamp(1.125rem,1.5vw,1.25rem) | intro |
| `--text-lg` | clamp(1.25rem,2vw,1.5rem) | titoli card |
| `--text-xl` | clamp(1.5rem,2.5vw,2rem) | sottotitoli |
| `--text-2xl` | clamp(2rem,4vw,3rem) | titoli sezione |
| `--text-3xl … --text-9xl` | 2.5→13rem clamp | titoli grandi |
| `--text-hero` | clamp(3rem,8vw,7rem) | hero |

Minimi di leggibilità (blocco inline `index.html`): `--text-body` 1rem (16px, body), `--text-ui` 0.875rem (14px: CTA, tagline, eyebrow, privacy), `--text-min` 1rem (alias legacy). Body mai sotto 16px; microcopy 14px; header/footer esclusi.

**Tier dei titoli** (un solo sistema, `tokens.css`):

| Token | Valore | Dove |
|---|---|---|
| `--t-hero` | clamp(3rem,7vw,9rem) | hero homepage |
| `--t-svc` | clamp(1.75rem,6.2vw,7.4rem) | "Servizi" (una parola, più grande) |
| `--t-sub` | clamp(1.75rem,5.2vw,5.1rem) | titoli lunghi/frasi, intestazioni di sezione (servizi, FAQ, Lavora con noi, form) |
| `--t-h1` | clamp(2.2rem,6.2vw,5.6rem) | H1 delle pagine servizi e testate di pagina |
| `--t-xl` | min(150px,10vw) (9.6vw ≤600px) | titoli brevi di una parola: Case studies, Tips, FAQ, Contatti |
| `--t-amici` | clamp(1rem,5.2vw,5.1rem) | "Alcuni amici…" sempre su 2 righe, nowrap |

Pesi titoli: 900, `letter-spacing` −0.03em (−0.02em in `.hc-title`), `line-height` 1 (0.95 in alcuni titoli locali), maiuscolo. Titoli: mai spezzare le parole.

Body (riferimento About home): 16px, `line-height` 1.6, peso 400, nero al 70% su bianco (`--ink-body`), bianco all'80% su nero (`--ink-body-dark`). `strong` nero/bianco pieno.

CTA `.btn`: DM Sans 600, `--text-xs` (forzato a 14px da `main .btn`), `letter-spacing` 0.12em, maiuscolo.

## 3. Colori

| Token | Valore |
|---|---|
| `--primary` | #DB005A (fucsia ESTRO) |
| `--primary-hover` | #a8003f |
| `--bg` / `--surface` / `--white` | #FFFFFF |
| `--surface2` | #F5F5F5 |
| `--black` | #000000 |
| `--black-04/06/08/10/20/40/50/60/75` | rgba(0,0,0, .04 … .75) |
| `--white-06/10/20/55/90` | rgba(255,255,255, .06 / .10 / .20 / .55 / .92) |

Usati nel codice fuori token: #0b0b0b / #080808 (nero testi), #141414/#141416 (pannelli scuri), #1b141b→#0d0a11 (card testo case studies home), #b8004b (hover CTA news, vedi incoerenze), #ff2e7e (settore case study), #ffd1e3 (errori su fucsia).
Tema scuro: `[data-theme="dark"]` ridefinisce i token (bg #111111, black #f0f0f0).

## 4. Spaziature

- Sezione verticale: `--section-py` clamp(4rem, 8vw, 7rem). Orizzontale: `--section-px` clamp(1.5rem,6vw,7rem).
- Margine laterale unico di sito: `--gutter` clamp(1.5rem, 5vw, 6rem) (definito in `tokens.css` e ribadito in `responsive.css`).
- Ritmo titoli (responsive.css): `--gap-lead` 16px (titolo→testo), `--gap-block` 48px (titolo→contenuto), `--gap-items` 24px. Scale: `--gap-xs…xl` 0.5/1/1.5/2.5/4rem; `--stack-xs…xl`; `--space-1…48` (0.25→12rem).
- Clearance nav: `max(var(--section-py), calc(var(--nav-h) + .75rem))`; `--nav-h` 82px (`tokens.css`).
- Hero FAQ/News/Tips: `padding-top: max(140px, nav+3rem)`, `padding-bottom: clamp(5rem,9vw,8rem)`, `min-height: max(34rem, 72dvh)`.

## 5. Layout

- `.container`: width 100%, `max-width: var(--max-w)` 1440px, centrato, `padding-inline-start: var(--gutter)`, fine 0.
- `--col-gap` clamp(0.75rem,1.5vw,1.5rem).
- Griglie principali: servizi home 5 col; card Tips pagina 4 col (3 fra 1025–1439px, 2 ≤1024, 1 ≤600); News lista a righe (categoria | titolo+estratto | freccia); form `.hc-row` 2 colonne (1 ≤700/860px); caffè 1.12fr/.88fr ≥769px; AI approccio 1.08fr/.92fr ≥1025px.
- Pannelli sticky 100dvh nelle sezioni home (about, amici, case studies, tips, faq, contatti): `.xxx-sticky`, corsa = sezione.

## 6. Breakpoint (per frequenza)

`max-width`: 768 (36 usi), 900, 600, 1024, 640, 480, 700, 1100, 560; `min-width`: 769, 820 (+ `min-height:560`), 1400/1401. Altri: `(hover:none)`, `(prefers-reduced-motion: reduce)`. Mega menu: ≥1401 originale; 769–1400, ≤960, ≤768 regole dedicate.

## 7. Radius (`responsive.css`, "ARROTONDAMENTI UNIFORMI")

`--r-pill: 999px` (CTA, pulsanti, tab, tag, campi a una riga, voci sidebar) · `--r-box: 36px` (card, pannelli, immagini, video, aree di testo, angoli delle sezioni che salgono `.sx-rise` = `calc((1 - var(--sxi)) * 36px)`). 50% per cerchi (frecce, icone). 2px solo per barrette decorative. Nav: pillola alta ~72px.

## 8. Bordi, stroke, ombre, opacità

- `--border` 1px solid `--black-10`; `--border-hover` 1px solid `--black-40` (scuro: bianco .10/.30).
- Card chiare: bordo 1px rgba(0,0,0,.07) → hover rgba(0,0,0,.12).
- Ombre: `--shadow-sm/md/lg` (vedi tokens). Card Tips/News: riposo `0 1px 2px rgba(0,0,0,.05), 0 8px 20px -10px rgba(0,0,0,.16)`; hover `0 2px 4px rgba(0,0,0,.06), 0 16px 34px -14px rgba(0,0,0,.24)`.
- Contorno che gira (`.nw-trace`): stroke fucsia 3px, `stroke-linecap: round`, 0.55s `cubic-bezier(.35,0,.25,1)`.
- Opacità testo: nero .6 body chiaro, bianco .72 body scuro; bianco .35–.55 solo per elementi decorativi/secondari.
- Form pagina Contatti: pannello #0b0b0d con bordo #2c2c33, celle #1b1a22 bordo #3a3946 (focus #24222e/bianco). Form GHL: campi 55px, label 16/500, pulsante 14/600 bordo 2px (vedi `css/ghl-form.README.md`).

## 9. Transizioni e hover

`--ease-out` cubic-bezier(.16,1,.3,1) · `--ease-in-out` cubic-bezier(.45,0,.55,1) · `--dur-fast` 180ms · `--dur-base` 320ms · `--dur-slow` 550ms · `--dur-enter` 800ms.

- **CTA** `.btn`: padding `--space-4 --space-8`; `--primary` = fucsia → hover nero con riempimento da sinistra (`::before translateX`), `translateY(-2px)` + `--shadow-md`. `--outline`: trasparente, bordo `--black-20`, hover nero. Su fondo scuro/fucsia: bianco, hover invertito. Form submit scuro: contorno bianco 2px, hover pieno bianco/testo fucsia.
- **Card News/Tips** (riferimento pagina Tips & Tricks): bordo+ombra si alzano, contorno fucsia che gira, freccia/`gap` della CTA +; nessun tilt. La home Tips usa la stessa logica (`a.tip-card`, `js/responsive.js`).
- **Card Servizi (home)**: freccia `.svc-card__go` cerchio fucsia 34px, compare in hover (`scale(.6) rotate(-45deg)` → none, .45s `cubic-bezier(.34,1.56,.64,1)`); riusata da `.cst-info__go` (case studies home).
- Nessun effetto forte estraneo: niente glow, niente tilt, niente deriva immagine.

## 10. Componenti

- **Header/nav**: pillola trasparente con blur (`backdrop-filter: blur(28px) saturate(185%)`), `--nav-h` 82px; temi `nav--on-dark` / `.scrolled` gestiti da `js/main.js`. Mega menu a pannelli (Team rosa nascosta <960px).
- **Footer**: `.site-footer` con `.sf-ghost` (ESTRO gigante), stessa `--gutter` laterale.
- **Hero**: homepage `--t-hero`; servizi H1 `--t-h1`; pagine di lista (FAQ/News/Tips) altezza comune; Case studies / Dama hero a viewport piena.
- **Sezioni che salgono**: classi `sx-rise` / `sx-sweep`, variabili `--sxi/--sxo`, raggio 36px in cima.
- **Titoli con effetto acqua**: `waterTitle()` condiviso.
- **Form**: pagine con form nativo (`hc-form`, `svc-caffe__form`, `lcn-apply__form`, `svc-hero__form`) sono segnaposto; in produzione sono GHL (CSS in GHL, sorgenti in `css/ghl-form*.css`).
- **Case studies home**: tab a pillola, card immagine + card testo nera (`.cst-info`, ora `<a>` verso `case-studies/<brand>.html`) con freccia hover; loghi tarati per scala per file (prada 1.65, miumiu 1.62, fanuc 1.65, ariston 1.54, biorepair 1.65, bravo .77).

## 11. Responsive

Layer unico di correzioni: `css/responsive.css` + `js/responsive.js` (fit dei titoli, auto-grow textarea). Regole: niente overflow orizzontale (`html/body` in `base.css`), parole mai spezzate, hero sempre dentro la viewport, zoom 200% (960×540) da verificare. Sotto 600px `--t-xl` scende a 9.6vw.

## 12. Copy

Niente trattini lunghi come separatore di frase: usare `:`, `,` o punto. Restano gli intervalli numerici ("250.000 € – 300.000 €"), i trattini semantici, gli elementi UI e i placeholder.

## 13. Eccezioni note

- `servizi.html` (pagina orfana): scala titoli propria (13px/11px), non allineata.
- Hover News "righe" (senza immagini) vs card con foto (Tips): stessa famiglia, layout diverso.
- Case study senza pagina: Prada, Miu Miu, Ariston, Biorepair, Bravo, e gli articoli Tips 2 e 3 hanno link predisposti ma file ancora da creare.

## 14. Incoerenze: stato

Risolte nel codice:
1. `--gutter` ora vale `clamp(1.5rem, 5vw, 6rem)` anche in `tokens.css` (una sola definizione).
2. `--nav-h: 82px` definito in `tokens.css`; tutti i fallback (80/82/88px) sono stati sostituiti da `var(--nav-h)`.
3. Hover CTA: la CTA della card in evidenza di News segue `.btn--primary` (fucsia → nero). Le inversioni su fondo fucsia/scuro (bianco) sono la regola documentata al punto 9, non un'eccezione.
4. Opacità del body: due soli token, `--ink-body` (nero 70%) e `--ink-body-dark` (bianco 80%), usati dal layer leggibilità e dall'About.
5. Body About: `0.95rem` / interlinea 1.85 in `hero.css` portati a `var(--text-body)` (16px) / 1.6; `--text-body` e `--text-ui` ora sono in `tokens.css`.
6. Versioni `?v=`: `sh bump-version.sh <versione>` le aggiorna tutte insieme.

Mitigata, non riscritta:
7. Raggi vecchi nei file sorgente (4–32px): annullati dal layer finale (`--r-pill` / `--r-box`) in `responsive.css`. Cambiarli uno per uno nei sorgenti rischia di toccare elementi piccoli (checkbox, barrette di 2px) e non cambia il risultato visibile: ogni nuovo componente deve usare i token, non un raggio proprio.

## 15. Componenti aggiunti (passata finale)

- **Allegati case study** `.cs-attach` (`css/responsive.css`): `<section class="cs-attach">` > `<ul class="cs-attach__list">` > `<a class="cs-attach__item" data-type="pdf|slides|doc|file">` con `.cs-attach__icon`, `.cs-attach__title`, `.cs-attach__meta`, `.cs-attach__go`. Hover come le card Tips. File in `/allegati`. Prima implementazione: `case-studies/dama24.html`.
- **Hero di lista** (FAQ, News, Tips & Tricks): altezza identica `--hero-min: max(34rem, 72dvh)` (`height` e `min-height`); titoli News/Tips `min(var(--t-h1), 9vh)`.
- **Contorno che gira** `.nw-trace`: aggiunto da `js/responsive.js` a `.tip-card` e `.contact-hub__col` (stesso della pagina Tips).
- **Voce attiva FAQ**: `.faq-nav__list a.is-active`, aggiornata da uno script in `faq.html` (MutationObserver sugli accordion).
- **Footer**: Privacy e Cookie su iubenda (`target="_blank" rel="noopener noreferrer"`), social Instagram, LinkedIn, Facebook, YouTube (@estroagency3497).

## 16. Aggiornamenti successivi

- `--t-cta: clamp(1.9rem, 4.6vw, 5.5rem)`: titolo di tutti i blocchi CTA/form di chiusura (Case Studies, FAQ, News, Tips, Lavora con noi, Dama, articoli, servizi). Le colonne titolo+form usano `minmax(min-content, 1fr)` così lo script di adattamento non rimpicciolisce il titolo.
- CTA "Leggi l'articolo": su fondo scuro = "Scopri tutti i Tips & Tricks" (bordo 2px, hover bianco/nero, −3px, .32s); su fondo chiaro = `.btn--primary` della brochure (hover nero/bianco, −2px, `--shadow-md`, 180ms). Markup `btn btn--primary` + classe `.nw-featured__cta`.
- Timeline SMM: `.svc-tabs__media` ha `aspect-ratio: 5/4` (rapporto reale delle immagini in `/SMM`, 1500×1200).
- Case Studies: `#cs-works` e `.cs-cta` non usano più pannelli sticky più alti della viewport.
- Join Us "Chi siamo": titolo `--t-sub` senza icona, body `clamp(1.0625rem, 1.35vw, 1.3rem)`, colonne a pari altezza.
- Icone Contatti: un solo set SVG 24px, stroke 1.8, linecap/linejoin round.

## 17. Timeline servizi (`.svc-path` / `.svc-tabs`)

Un solo blocco in `css/responsive.css` ("TIMELINE PAGINE SERVIZI"), valido per le 10 pagine servizi: linea con binario rosato e riempimento fucsia→`#ff2e7e` con punta luminosa; nodi 46px (fatto = rosa chiaro, attivo = fucsia con alone e anello che pulsa); etichetta fucsia e barretta sotto il passo attivo; card con bordo rosato, filo fucsia in alto, ombra a due livelli e alone dietro; immagine con cornice rosata sfalsata (5:4, nessun crop). Ingresso a cascata di barra, immagine e testi. Pannello fisso (112dvh di corsa, 100dvh di schermata) solo se tutti i riquadri ci stanno: lo decide `js/responsive.js` (classe `.svc-path--flow`); sotto 1101px o 700px di altezza la sezione scorre normalmente.

Aggiornamento timeline: ombra della card neutra (`0 1px 2px rgba(0,0,0,.05), 0 14px 32px -22px rgba(0,0,0,.28)`, niente alone fucsia); nodi con anello dello sfondo (`box-shadow: 0 0 0 6px var(--tl-bg)`) così la linea non li tocca; barra senza ritaglio su desktop (`overflow: visible`) e con padding 16/18/14 sotto i 1101px; nessun sottolineato sui passi; riquadro immagine alto `clamp(320px, 45dvh, 600px)` con immagine 5:4 che lo riempie.
