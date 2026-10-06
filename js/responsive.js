/* ═══════════════════════════════════════════════════════════════
   TITOLI SEMPRE INTERI — a qualsiasi larghezza, zoom e browser
   I titoli del sito sono molto grandi e le parole non si spezzano
   mai (regola del progetto). Su schermi stretti, o con lo zoom del
   browser, una parola lunga ("PRENDIAMOCI", "Instagram"…) può
   essere più larga della sua colonna e uscire dallo schermo.
   Qui, per ogni titolo, si misura se il testo sta nella sua
   scatola; se non ci sta, il corpo si riduce solo quanto basta
   perché la parola più lunga entri. Il corpo di partenza resta
   quello del CSS: sugli schermi dove il titolo ci sta non cambia
   nulla. Si ricalcola a ogni ridimensionamento e cambio di zoom.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const SEL = [
    'h1', 'h2', 'h3',
    '[class*="__title"]', '[class*="-title"]', '[class*="__big"]',
    '[class*="__heading"]', '.hc-title'
  ].join(',');
  const SKIP = '.nav, [aria-hidden="true"], .sr-reel, [class*="ticker"], [class*="marquee"], [class*="__track"], .svc-card, .svc-fx-ghost, script, style';
  const MIN_RATIO = 0.45;   // mai sotto il 45% del corpo previsto

  function candidates() {
    return [...document.querySelectorAll(SEL)].filter(el =>
      !el.closest(SKIP) && el.textContent.trim().length > 0);
  }

  // larghezza utile: la scatola del titolo, ma mai oltre il bordo
  // destro dello schermo (meno il margine laterale del contenuto)
  function room(el) {
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    return Math.min(el.clientWidth, vw - Math.max(0, r.left) - 8);
  }
  function overflows(el) {
    if (!el.clientWidth) return false;
    // Sfora davvero solo se il testo e piu largo della sua scatola, o
    // se la scatola esce dallo schermo. Confrontare scrollWidth con
    // room() faceva scattare i titoli a tutta larghezza (scrollWidth
    // == clientWidth) per via del margine di 8px, riducendoli senza
    // motivo e rendendo diversi corpi che dovevano essere uguali.
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    return el.scrollWidth > el.clientWidth + 1 || r.left + el.scrollWidth > vw + 1;
  }

  // dentro uno scorrimento orizzontale (le tab delle pagine servizi) gli
  // elementi fuori schermo sono fuori di proposito: ridurli li lasciava a
  // 7px, illeggibili
  function inScroller(el) {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const ox = getComputedStyle(a).overflowX;
      if (ox === 'auto' || ox === 'scroll') return true;
    }
    return false;
  }

  function fit() {
    // pagina caricata con viewport nullo (scheda nascosta): non c'è
    // nulla da misurare, e ridurre i titoli qui li lascerebbe piccoli
    if (document.documentElement.clientWidth < 200) return;
    const list = candidates();
    // 1) si torna al corpo del CSS
    list.forEach(el => { if (el.dataset.fitDone) { el.style.removeProperty('font-size'); delete el.dataset.fitDone; } });
    // 2) si stringono solo i titoli che sforano
    list.forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      if (inScroller(el)) return;
      if (!overflows(el)) return;
      const base = parseFloat(cs.fontSize);
      let size = base;
      for (let i = 0; i < 6 && overflows(el); i++) {
        const k = room(el) / el.scrollWidth;
        size = Math.max(base * MIN_RATIO, size * Math.min(0.98, k * 0.99));
        // important: diversi titoli hanno il corpo fissato con
        // !important nel CSS, che vincerebbe su uno stile normale
        el.style.setProperty('font-size', size.toFixed(2) + 'px', 'important');
      }
      el.dataset.fitDone = '1';
    });
  }

  let t = 0;
  const later = () => { clearTimeout(t); t = setTimeout(fit, 120); };
  addEventListener('resize', later, { passive: true });
  if (window.visualViewport) visualViewport.addEventListener('resize', later, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  addEventListener('load', fit);
  if (document.readyState !== 'loading') fit();
  else document.addEventListener('DOMContentLoaded', fit);
}());

/* ═══════════════════════════════════════════════════════════════
   CASELLA MESSAGGIO DEL FORM NELLA HERO — niente scroll
   La textarea cresce con quello che si scrive (e al cambio di
   larghezza/zoom, quando il testo va a capo in modo diverso).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  function grow(el) {
    el.style.height = 'auto';
    // scrollHeight non conta il bordo: con border-box va aggiunto, altrimenti
    // restano un paio di pixel di testo tagliati in fondo
    const border = el.offsetHeight - el.clientHeight;
    el.style.height = Math.max(el.scrollHeight + border, 96) + 'px';
  }
  function init() {
    const list = [...document.querySelectorAll('.svc-hero__form textarea')];
    list.forEach(el => {
      grow(el);
      el.addEventListener('input', () => grow(el));
    });
    if (!list.length) return;
    let t = 0;
    const later = () => { clearTimeout(t); t = setTimeout(() => list.forEach(grow), 120); };
    addEventListener('resize', later, { passive: true });
    if (window.visualViewport) visualViewport.addEventListener('resize', later, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
}());

/* ── Contorno che gira intorno alle card Tips della home ──
   Stessa tecnica della pagina Tips & Tricks: un rect SVG lungo quanto il
   perimetro vero, scoperto in hover tramite stroke-dashoffset. */
(function tipTrace() {
  var cards = document.querySelectorAll('.tip-card, .contact-hub__col');
  if (!cards.length) return;
  var NS = 'http://www.w3.org/2000/svg';
  cards.forEach(function (card) {
    if (card.querySelector('.nw-trace')) return;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'nw-trace');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('preserveAspectRatio', 'none');
    var rect = document.createElementNS(NS, 'rect');
    svg.appendChild(rect);
    card.appendChild(svg);
    var fit = function () {
      var r = svg.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var sw = 3, cs = getComputedStyle(card);
      var bw = parseFloat(cs.borderTopWidth) || 0;
      var rad = Math.max(0, (parseFloat(cs.borderTopLeftRadius) || 0) - bw);
      svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height);
      rect.setAttribute('x', sw / 2); rect.setAttribute('y', sw / 2);
      rect.setAttribute('width', Math.max(0, r.width - sw));
      rect.setAttribute('height', Math.max(0, r.height - sw));
      rect.setAttribute('rx', Math.max(0, rad - sw / 2));
      rect.style.setProperty('--nw-len', rect.getTotalLength());
    };
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(svg);
    else addEventListener('resize', fit, { passive: true });
  });
}());

/* ── Timeline servizi: il pannello resta fermo solo se TUTTI i riquadri ci stanno ──
   Per ogni .svc-path si mostra a turno ogni riquadro e si controlla che il suo contenuto
   non esca dal pannello; se ne esce anche uno, la sezione scorre normalmente
   (classe .svc-path--flow) invece di tagliare testo o CTA. */
(function svcPathFit() {
  var secs = document.querySelectorAll('.svc-path');
  if (!secs.length) return;
  function check(sec) {
    sec.classList.remove('svc-path--flow');
    if (innerWidth <= 1100 || innerHeight < 700) return;
    var st = sec.querySelector('.svc-path__sticky');
    if (!st) return;
    var panels = [].slice.call(sec.querySelectorAll('.svc-tabs__panel'));
    var was = panels.map(function (p) { return p.hidden; });
    var overflow = false;
    panels.forEach(function (p) { p.hidden = true; });
    panels.forEach(function (p) {
      p.hidden = false;
      var copy = p.querySelector('.svc-tabs__copy');
      if (p.scrollHeight > p.clientHeight + 2 || (copy && copy.getBoundingClientRect().bottom > p.getBoundingClientRect().bottom - 4)) overflow = true;
      if (p.getBoundingClientRect().bottom > st.getBoundingClientRect().bottom - 4) overflow = true;
      p.hidden = true;
    });
    panels.forEach(function (p, i) { p.hidden = was[i]; });
    if (overflow) sec.classList.add('svc-path--flow');
  }
  var t;
  function run() { clearTimeout(t); t = setTimeout(function () { secs.forEach(check); }, 120); }
  addEventListener('load', run);
  addEventListener('resize', run, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  run();
}());
