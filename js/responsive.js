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
    return el.scrollWidth > room(el) + 1;
  }

  function fit() {
    const list = candidates();
    // 1) si torna al corpo del CSS
    list.forEach(el => { if (el.dataset.fitDone) { el.style.removeProperty('font-size'); delete el.dataset.fitDone; } });
    // 2) si stringono solo i titoli che sforano
    list.forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
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
