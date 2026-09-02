
/* ═══════════════════════════════════════════════════════
   AVATAR PHOTOS (copyright-free via randomuser.me)
═══════════════════════════════════════════════════════ */
(function () {
  const photos = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/men/54.jpg',
    'https://randomuser.me/api/portraits/women/28.jpg',
  ];
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav__avatar').forEach((av, i) => {
      av.style.backgroundImage = `url(${photos[i % photos.length]})`;
      av.classList.add('has-photo');
    });
  });
})();

// ─── Services fan → grid ──────────────────────────────
(function () {
  const list  = document.querySelector('.svc-grid__list');
  const closeBtn = document.querySelector('.svc-grid__close');
  if (!list) return;

  list.addEventListener('click', function openFan() {
    list.classList.add('open');
    if (closeBtn) closeBtn.hidden = false;
  }, { once: true });

  closeBtn?.addEventListener('click', () => {
    list.classList.remove('open');
    closeBtn.hidden = true;
    // re-enable the open click
    list.addEventListener('click', function openFan() {
      list.classList.add('open');
      closeBtn.hidden = false;
    }, { once: true });
  });
})();

// ─── Nav auto-contrast (dark sections) ───────────────
document.addEventListener('DOMContentLoaded', function () {
  const navEl = document.querySelector('.nav');
  if (!navEl) return;

  const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
  if (!darkSections.length) return;

  let darkCount = 0;

  function updateNav() {
    navEl.classList.toggle('nav--on-dark', darkCount > 0);
  }

  function makeObserver() {
    const navH = navEl.getBoundingClientRect().height || 80;
    const margin = Math.round(-(window.innerHeight - navH));
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        darkCount += e.isIntersecting ? 1 : -1;
        if (darkCount < 0) darkCount = 0;
        updateNav();
      });
    }, {
      rootMargin: '0px 0px ' + margin + 'px 0px',
      threshold: 0,
    });
  }

  // Check sincrono: applica lo stato corretto prima del primo frame
  // (evita il flickering tra colore di default e nav--on-dark)
  (function () {
    const navH = navEl.getBoundingClientRect().height || 80;
    darkSections.forEach(function (el) {
      const r = el.getBoundingClientRect();
      if (r.top < navH && r.bottom > 0) darkCount++;
    });
    updateNav();
  })();

  let obs = makeObserver();
  darkSections.forEach(function (el) { obs.observe(el); });

  window.addEventListener('resize', function () {
    obs.disconnect();
    darkCount = 0;
    obs = makeObserver();
    darkSections.forEach(function (el) { obs.observe(el); });
    updateNav();
  }, { passive: true });
});

// ─── Nav .scrolled (logo black → color) ──────────────
(function () {
  const navEl = document.querySelector('.nav');
  if (!navEl) return;
  const hero = document.querySelector('.hero-svc-scene, .hero-video');
  if (hero) {
    const io = new IntersectionObserver(function (entries) {
      navEl.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
  } else {
    navEl.classList.add('scrolled');
  }
})();

// ─── Scroll progress bar ──────────────────────────────
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.prepend(progressBar);

const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ─── Mega menu toggle ─────────────────────────────────
const nav        = document.querySelector('.nav');
const menuBtn    = document.querySelector('.nav__menu-btn');
const megaWrapper = document.querySelector('.nav__mega-wrapper');
const overlay    = document.querySelector('.nav__overlay');

const openMega  = () => {
  nav.classList.add('menu-open');
  menuBtn.setAttribute('aria-expanded', 'true');
  megaWrapper.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeMega = () => {
  nav.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  megaWrapper.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

menuBtn?.addEventListener('click', () => {
  nav.classList.contains('menu-open') ? closeMega() : openMega();
});

overlay?.addEventListener('click', closeMega);

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMega(); });

megaWrapper?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMega));


// ─── Logo ticker — scroll continuo pixel-perfect ──────
(function () {
  const track = document.querySelector('.logo-ticker__track');
  if (!track) return;
  const original = track.querySelector('.logo-ticker__set');
  if (!original) return;

  // Clona finché il track è almeno 3x largo rispetto alla viewport
  while (track.offsetWidth < window.innerWidth * 3) {
    const clone = original.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }

  const SPEED = 32; // px/s
  let pos = 0, raf, lastTime;

  function setW() { return original.offsetWidth; }

  function tick(ts) {
    if (lastTime === undefined) { lastTime = ts; }
    const dt = Math.min((ts - lastTime) / 1000, 0.05); // max 50ms per frame
    lastTime = ts;
    pos += SPEED * dt;
    if (pos >= setW()) pos -= setW(); // salta esattamente un set — nessun vuoto
    track.style.transform = `translateX(-${pos}px)`;
    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);

  track.parentElement.addEventListener('mouseenter', () => {
    cancelAnimationFrame(raf); lastTime = undefined;
  });
  track.parentElement.addEventListener('mouseleave', () => {
    lastTime = undefined;
    raf = requestAnimationFrame(tick);
  });
})();

// ─── Reveal on scroll (reversibile: appare entrando, sparisce uscendo) ────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('visible', e.isIntersecting);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// About video scrub is handled inside scrollEffects()

// ─── Stat counter ─────────────────────────────────────
const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

const animateCounter = (el) => {
  const raw    = el.textContent.trim();
  const suffix = raw.replace(/[0-9]/g, '');
  const target = parseInt(raw, 10);
  if (isNaN(target)) return;

  const duration = 1200;
  const start    = performance.now();

  const tick = (now) => {
    const elapsed  = Math.min(now - start, duration);
    const progress = easeOutQuart(elapsed / duration);
    el.textContent = Math.round(target * progress) + suffix;
    if (elapsed < duration) requestAnimationFrame(tick);
    else el.textContent = raw;
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number').forEach(el => counterObserver.observe(el));


// ─── Hero gradient parallax (desktop) ─────────────────
const heroGradient = document.querySelector('.hero__gradient');
if (heroGradient && window.matchMedia('(pointer: fine)').matches) {
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  window.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 28;
    targetY = (e.clientY / window.innerHeight - 0.5) * 18;
  }, { passive: true });

  const animParallax = () => {
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;
    heroGradient.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animParallax);
  };
  animParallax();
}

// ─── Magnetic buttons (desktop) ───────────────────────
if (window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) {
  document.querySelectorAll('.btn--primary, .nav__cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ─── Cursor glow (desktop) ────────────────────────────
if (window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', pointerEvents: 'none', zIndex: '9999',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(219,0,90,0.07) 0%, rgba(219,0,90,0.022) 40%, transparent 70%)',
    transform: 'translate(-50%,-50%)', top: '0', left: '0',
    transition: 'opacity 0.3s',
  });
  document.body.appendChild(glow);

  let mx = 0, my = 0, gx = 0, gy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  const tick = () => {
    gx += (mx - gx) * 0.07;
    gy += (my - gy) * 0.07;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(tick);
  };
  tick();
}

// ─── Clients filter ───────────────────────────────────
(function () {
  const filters = document.querySelectorAll('.clients__filter');
  const logos   = document.querySelectorAll('.client-logo[data-category]');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      logos.forEach(logo => {
        const match = cat === 'all' || logo.dataset.category === cat;
        if (match) {
          logo.classList.remove('hidden');
          logo.classList.add('visible');
        } else {
          logo.classList.add('hidden');
          logo.classList.remove('visible');
        }
      });
    });
  });
})();

// ─── Accordion produzione contenuti ──────────────────────────
(function () {
  document.querySelectorAll('.svc-acc').forEach(function (acc) {
    acc.querySelectorAll('.svc-acc__trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.svc-acc__item');
        var isOpen = item.classList.contains('is-open');
        // chiudi tutti nella stessa lista
        acc.querySelectorAll('.svc-acc__item.is-open').forEach(function (open) {
          open.classList.remove('is-open');
          open.querySelector('.svc-acc__trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
})();

// ─── Zampa caffè: gestita dal RAF scroll-driven ──────────────

// ─── Coda fucsia: slide-in da sinistra ────────────────────────
(function () {
  const tail = document.querySelector('.about-section__tail');
  if (!tail) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    tail.style.transform = 'translateX(-150%) scaleX(-1) scaleY(-1)';
    tail.style.opacity = '0';
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tail.style.transform = '';
        tail.style.opacity = '';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  io.observe(tail);
})();

// (Video about gestito dal blocco scroll-scrubbed sopra)

// ─── Nav: scompare sul footer, riappare su scroll-up ─────────
(function () {
  var navEl    = document.querySelector('.nav');
  var footerEl = document.querySelector('.site-footer');
  if (!navEl || !footerEl) return;

  var footerVisible = false;
  var lastY = window.scrollY;
  var scrollingUp = false;

  var io = new IntersectionObserver(function (entries) {
    footerVisible = entries[0].isIntersecting;
    update();
  }, { threshold: 0 });
  io.observe(footerEl);

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    scrollingUp = y < lastY;
    lastY = y;
    update();
  }, { passive: true });

  function update() {
    var menuOpen = navEl.classList.contains('menu-open');
    navEl.classList.toggle('nav--footer-hidden', footerVisible && !scrollingUp && !menuOpen);
  }

  /* re-evaluate whenever menu opens or closes */
  new MutationObserver(update).observe(navEl, { attributes: true, attributeFilter: ['class'] });
})();



// ─── Icon grid produzione contenuti ──────────────────────────
(function () {
  document.querySelectorAll('.svc-icons-grid').forEach(function (grid) {
    grid.querySelectorAll('.svc-icon-card').forEach(function (card) {
      var btn = card.querySelector('.svc-icon-card__btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = card.classList.contains('is-open');
        // chiudi tutti nella stessa griglia
        grid.querySelectorAll('.svc-icon-card.is-open').forEach(function (c) {
          c.classList.remove('is-open');
        });
        if (!isOpen) card.classList.add('is-open');
      });
    });
  });
})();

// ─── Scroll Effects: scrubbed, no hijacking ───────────────────────────────
//
// Tutte le animazioni seguono direttamente window.scrollY:
//   scroll avanti  → animazione avanti
//   scroll indietro → animazione indietro
//   scroll fermo   → animazione ferma
//
// Nessun pin, snap, scrollTo automatico o blocco della viewport.
// Legge tutti i getBoundingClientRect() prima di scrivere stili → no layout thrashing.
// Rispetta prefers-reduced-motion.
(function scrollEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const c01  = v => Math.max(0, Math.min(1, v));
  const lerp = (a, b, t) => a + (b - a) * c01(t);
  const ease = t => -(Math.cos(Math.PI * t) - 1) / 2;  // ease in-out
  const vh   = () => window.innerHeight;
  const vw   = () => window.innerWidth;

  // Progresso 0→1 mentre la sezione attraversa la viewport
  // 0 = bottom della sezione tocca il fondo viewport
  // 1 = top della sezione tocca il top viewport
  function secProg(r) {
    const h = vh();
    return c01((h - r.top) / (h + r.height));
  }

  // ── 1. SCALE VISUALS: scale-in all'entrata, scale-out all'uscita ─────────
  // Esclude il video About (già gestito dallo scroll-scrub separato)

  const visuals = [];
  const visualSel = '.cs2__tile img, .tip-card__img img';

  document.querySelectorAll(visualSel).forEach(el => {
    el.style.willChange = 'transform';
    el.style.transformOrigin = 'center center';
    visuals.push(el);
  });

  // ── 2. SECTION TRANSITIONS: overlay gradiente light↔dark ─────────────────
  // Alla fine di ogni sezione un gradiente sfuma verso il colore della sezione successiva.
  // Nessun fixed overlay: ogni gradiente è interno alla propria sezione.

  function makeGradientOverlay(section, toColor, heightPct) {
    const ov = document.createElement('div');
    Object.assign(ov.style, {
      position: 'absolute',
      bottom:   '0',
      left:     '0',
      right:    '0',
      height:   (heightPct || 50) + '%',
      pointerEvents: 'none',
      zIndex:   '4',
      background: `linear-gradient(to bottom, transparent, ${toColor})`,
      opacity:  '0',
    });
    section.style.position = 'relative';
    section.appendChild(ov);
    return ov;
  }

  const transitions = [];

  // ── Utility: split element text into per-letter .tl spans ────────────────
  // Preserves <br> tags, HTML entities, spaces. Sets parent opacity:1 after split.
  function splitLetters(el) {
    if (!el) return [];
    const html = el.innerHTML;
    let result = '';
    for (let i = 0; i < html.length; i++) {
      const ch = html[i];
      if (ch === '<') {
        const end = html.indexOf('>', i);
        result += html.slice(i, end + 1); // pass through tags unchanged
        i = end;
      } else if (ch === '&') {
        const end = html.indexOf(';', i);
        const entity = html.slice(i, end + 1);
        result += `<span class="tl">${entity}</span>`;
        i = end;
      } else if (/[\s]/.test(ch)) {
        result += ch; // spaces/newlines verbatim
      } else {
        result += `<span class="tl">${ch}</span>`;
      }
    }
    el.innerHTML = result;
    el.style.opacity   = '1';
    el.style.transform = 'none';
    return [...el.querySelectorAll('.tl')];
  }

  // ── 3. ABOUT: scroll-driven reveal + video scrub ─────────────────────────

  const aboutEl = document.getElementById('chi-siamo');

  // Overlay nero sulla About (sfuma a nero durante la fase di uscita)
  const aboutDarkOverlayEl = document.getElementById('aboutDarkOverlay');

  // Sezione Amici / clienti (marquee CSS — solo titolo in JS)
  const amiciSection  = document.getElementById('amici-section');
  const amiciTitle    = document.getElementById('amici-title');

  // Elementi About — reveal scroll-driven (come svc-letter / svc-word)
  const aboutBigEl    = aboutEl?.querySelector('.about-section__big');
  const aboutKickerEl = aboutEl?.querySelector('.about-section__kicker');
  const aboutTitleEl  = aboutEl?.querySelector('.about-section__heading');
  const aboutBodyEl   = aboutEl?.querySelector('.about-section__body');
  const aboutCTAEl    = aboutEl?.querySelector('.about-section__cta');
  const aboutVideoEl  = aboutEl?.querySelector('.about-section__cat');

  // Stato iniziale: testi nascosti (JS gestisce interamente)
  [aboutKickerEl, aboutTitleEl, aboutBodyEl, aboutCTAEl].forEach(el => {
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.willChange = 'opacity, transform';
  });

  // Titolo ABOUT: split per-lettera (stesso stagger di SERVIZI)
  const aboutLetters = splitLetters(aboutBigEl);

  // Video: play reale (non scrub), si avvia con la fase sticky, si ferma al saluto
  let _vidEnded = false;
  if (aboutVideoEl) {
    aboutVideoEl.muted = true;
    aboutVideoEl.removeAttribute('loop');
    aboutVideoEl.preload = 'auto';
    aboutVideoEl.setAttribute('playsinline', '');
    aboutVideoEl.pause();
    aboutVideoEl.currentTime = 0;
    aboutVideoEl.addEventListener('ended', () => { _vidEnded = true; });
  }

  // Video column: slide-in dalla destra
  const aboutVideoColEl = aboutEl?.querySelector('.about-section__video-col');
  if (aboutVideoColEl) {
    aboutVideoColEl.style.willChange = 'transform';
  }

  // Elemento stage (fade-out mentre About si avvicina)
  const htStageEl = document.querySelector('#ht-wrapper .ht-stage');
  const clientsEl = document.querySelector('.svc-clients');
  // svc-clients (scuro) → cs2 (bianco) — schiarita progressiva scroll-driven (overlay 80%)
  if (clientsEl) transitions.push({ section: clientsEl, ov: makeGradientOverlay(clientsEl, '#ffffff', 80) });

  // Case Studies sticky refs
  const cs2SectionEl  = document.getElementById('case-studies');
  const cs2TitleEl    = document.getElementById('cs2-title');
  const cs2SubEl      = document.getElementById('cs2Sub');
  const cs2WallTiles  = cs2SectionEl ? [...cs2SectionEl.querySelectorAll('.cs2__tile')] : [];
  const cs2FooterEl   = document.getElementById('cs2Footer');

  // cta-coffee: zampa + testo + CTA → unico progress, sincroni
  const ctaCoffeeEl   = document.getElementById('cta-coffee');
  const coffeeImgEl   = ctaCoffeeEl?.querySelector('.cta-coffee__img');
  const coffeeInnerEl = ctaCoffeeEl?.querySelector('.cta-coffee__inner');
  [coffeeImgEl, coffeeInnerEl].forEach(el => {
    if (!el) return;
    el.style.transition = 'none';
    el.style.opacity    = '0';
    el.style.willChange = 'transform,opacity';
  });
  if (coffeeImgEl)   coffeeImgEl.style.transform   = 'translateX(-60%)';
  if (coffeeInnerEl) coffeeInnerEl.style.transform  = 'translateX(-60%)';

  // Tips sticky refs
  const tipsSectionEl = document.getElementById('tips-section');
  const tipsTitleEl   = document.getElementById('tipsTitle');
  const tipsCards     = tipsSectionEl ? [...tipsSectionEl.querySelectorAll('.tip-card')] : [];
  const tipsCTAEl     = document.getElementById('tipsCTA');

  // Contatti section ref
  const contattiEl = document.getElementById('contatti');

  // Tips fuchsia exit overlay (triggered when Contatti title enters viewport)
  let tipsFuchsiaOv = null;
  if (tipsSectionEl) {
    tipsFuchsiaOv = document.createElement('div');
    Object.assign(tipsFuchsiaOv.style, {
      position: 'absolute', inset: '0',
      background: 'var(--primary, #DB005A)', opacity: '0',
      pointerEvents: 'none', zIndex: '5',
    });
    tipsSectionEl.style.position = 'relative';
    tipsSectionEl.appendChild(tipsFuchsiaOv);
  }

  // ── FAQ overlays — tutte le pagine ──────────────────────────────────────────
  // Per ogni sezione .page-faq:
  //   1. Overlay nero sulla sezione precedente (sfuma mentre FAQ sale)
  //   2. Overlay fucsia sulla FAQ (sfuma mentre la sezione successiva sale)
  const faqOverlays = [...document.querySelectorAll('.page-faq')].map(faqEl => {
    let prevOv = null;
    const prevSection = faqEl.previousElementSibling;
    if (prevSection) {
      prevOv = document.createElement('div');
      Object.assign(prevOv.style, {
        position: 'absolute', inset: '0',
        background: '#ffffff', opacity: '0',
        pointerEvents: 'none', zIndex: '5',
      });
      prevSection.style.position = 'relative';
      prevSection.appendChild(prevOv);
    }
    const fuchsiaOv = document.createElement('div');
    Object.assign(fuchsiaOv.style, {
      position: 'absolute', inset: '0',
      background: 'var(--primary, #DB005A)', opacity: '0',
      pointerEvents: 'none', zIndex: '5',
    });
    faqEl.style.position = 'relative';
    faqEl.appendChild(fuchsiaOv);
    return { faqEl, prevOv, fuchsiaOv, nextEl: faqEl.nextElementSibling };
  });

  // Contatti → footer: overlay fisso sul body (non su Contatti)
  // così rimane visibile anche quando la sezione è scrollata via
  const contattiExitOv = document.createElement('div');
  Object.assign(contattiExitOv.style, {
    position: 'fixed', inset: '0',
    background: '#0e0e0e', opacity: '0',
    pointerEvents: 'none', zIndex: '200',
    transition: 'none',
  });
  document.body.appendChild(contattiExitOv);

  // ── Footer refs ───────────────────────────────────────────────────────────────
  const footerEl   = document.querySelector('.site-footer');
  const sfGhostEl  = footerEl?.querySelector('.sf-ghost');
  const sfColEls   = footerEl ? [...footerEl.querySelectorAll('.sf-col')] : [];
  const sfLegalEl  = footerEl?.querySelector('.sf-legal');

  // Footer content: starts hidden
  sfColEls.forEach(el => { el.style.opacity = '0'; el.style.willChange = 'opacity, transform'; });
  if (sfLegalEl) { sfLegalEl.style.opacity = '0'; sfLegalEl.style.willChange = 'opacity, transform'; }

  // ── Per-letter split per tutti i titoli principali (stesso stagger di SERVIZI) ──
  const amiciLetters    = splitLetters(amiciTitle);
  const tipsLetters     = splitLetters(tipsTitleEl);
  const contattiTitleEl = document.getElementById('contattiTitle');
  const contattiLetters = splitLetters(contattiTitleEl);
  const sfGhostLetters  = splitLetters(sfGhostEl);

  // ── FAQ titles: split per lettera su ogni pagina ──────────────────────────
  const faqTitleEls   = [...document.querySelectorAll('.page-faq__title')];
  const faqTitleLetters = faqTitleEls.map(el => splitLetters(el));
  const faqSections   = faqTitleEls.map(el => el.closest('.page-faq'));

  // ── RAF loop ─────────────────────────────────────────────────────────────
  // READ prima, WRITE dopo: nessun layout thrashing.

  function update() {
    const _vh = vh();

    // — Legge tutti i rect prima di qualsiasi scrittura —
    const sectionRects = new Map();
    function rect(el) {
      if (!sectionRects.has(el)) sectionRects.set(el, el.getBoundingClientRect());
      return sectionRects.get(el);
    }

    // Preload rects per sezioni di interesse
    visuals.forEach(    el        => rect(el.closest('section') || el.parentElement));
    transitions.forEach(({ section }) => rect(section));
    if (aboutEl) rect(aboutEl);
    faqSections.forEach(sec => { if (sec) rect(sec); });
    faqOverlays.forEach(({ faqEl, nextEl }) => {
      rect(faqEl);
      if (nextEl) rect(nextEl);
    });
    if (contattiEl) rect(contattiEl);

    // — WRITE: scale —
    visuals.forEach(el => {
      const sec = el.closest('section') || el.parentElement;
      const p   = secProg(rect(sec));
      // entrata: 0.94→1 nei primi 45%; uscita: 1→1.04 nell'ultimo 30%
      const scale = p < 0.5
        ? lerp(0.94, 1,    c01(p / 0.45))
        : lerp(1,    1.04, c01((p - 0.7) / 0.30));
      el.style.transform = `scale(${scale.toFixed(4)})`;
    });

    // — WRITE: About reveal + video scrub + fade sezione precedente —
    if (aboutEl) {
      const aR = rect(aboutEl);

      // ── p_about: progress unificato entry + sticky ───────────────────────
      // 0  quando About top è al 70% del viewport (30% visibile → trigger)
      // 0.28 quando sticky si attiva (About top al viewport top)
      // 1  quando sticky si rilascia (fine runway 280dvh)
      //
      // Ratio p_at_sticky_start = ENTRY_FRAC / (DVH_SECTION - 1 + ENTRY_FRAC)
      //   = 0.70 / (2.80 - 1 + 0.70) = 0.70 / 2.50 = 0.28 (costante)
      const ENTRY_RANGE = _vh * 0.70;
      const aboutTotal  = aboutEl.offsetHeight - _vh;
      const p_about     = c01((ENTRY_RANGE - aR.top) / (aboutTotal + ENTRY_RANGE));

      // ── Fade ht-stage sincronizzato con la watermark ABOUT ───────────────
      // ht-stage sfuma 1→0 mentre la watermark ABOUT appare (p_about 0→0.22)
      if (htStageEl) {
        const stageFade = 1 - ease(c01(p_about / 0.22));
        htStageEl.style.opacity = stageFade.toFixed(3);
      }

      // Entrambi i trigger (testo + overlay) basati sulla posizione fisica di amiciSection
      const amiciR_ov = amiciSection ? rect(amiciSection) : null;

      // Overlay: si scurisce da quando amiciSection entra nel viewport
      const tBgOut = amiciR_ov ? ease(c01((_vh - amiciR_ov.top) / (_vh * 0.60))) : 0;
      if (aboutDarkOverlayEl) {
        aboutDarkOverlayEl.style.opacity = tBgOut.toFixed(3);
      }

      // Testo/video: inizia a uscire solo dopo che About è fisicamente all'80% fuori viewport
      // amiciSection.top ≈ 0.20*vh quando About ha scrollato via di 0.80*vh
      const _tOutRaw = amiciR_ov ? c01((_vh * 0.20 - amiciR_ov.top) / (_vh * 0.30)) : 0;
      const tOut     = ease(_tOutRaw);

      function revealAbout(el, base, dur) {
        if (!el) return;
        const tIn = ease(c01((p_about - base) / dur));
        el.style.opacity   = (tIn * (1 - tOut)).toFixed(3);
        el.style.transform = `translateY(${((1 - tIn) * 30 - tOut * 20).toFixed(1)}px)`;
      }

      // ABOUT watermark: per-letter stagger — ingresso da p_about, uscita da amiciSection
      const _aboutN   = aboutLetters.length;
      const _aExitST  = _aboutN > 1 ? 0.45 / (_aboutN - 1) : 0;
      aboutLetters.forEach((el, i) => {
        const lP = ease(c01((p_about - i * 0.012) / 0.08));
        const eP = ease(c01((_tOutRaw - i * _aExitST) / 0.55));
        el.style.opacity   = (lP * (1 - eP)).toFixed(3);
        el.style.transform = `translateY(${((1 - lP) * 0.8 + eP * 0.8).toFixed(3)}em)`;
      });
      // Testi: iniziano insieme al video, si completano entro p≈0.75
      revealAbout(aboutKickerEl, 0.18, 0.22);
      revealAbout(aboutTitleEl,  0.26, 0.22);
      revealAbout(aboutBodyEl,   0.36, 0.25);
      revealAbout(aboutCTAEl,    0.50, 0.22);

      // Video: play quando inizia ad apparire (p=0.20), ferma e resetta allo scroll-up
      if (aboutVideoEl) {
        if (p_about < 0.20) {
          if (!aboutVideoEl.paused) aboutVideoEl.pause();
          if (aboutVideoEl.currentTime > 0) { aboutVideoEl.currentTime = 0; _vidEnded = false; }
        } else if (aboutVideoEl.paused && !_vidEnded) {
          aboutVideoEl.play().catch(() => {});
        }
      }

      // Video col: slide-in da destra (p 0.20→0.75), sincronizzato con i testi
      if (aboutVideoColEl) {
        const slideIn = ease(c01((p_about - 0.20) / 0.55));
        aboutVideoColEl.style.opacity   = (slideIn * (1 - tOut)).toFixed(3);
        aboutVideoColEl.style.transform = `translateX(${((1 - slideIn) * 80).toFixed(1)}px) translateY(${(-tOut * 20).toFixed(1)}px)`;
      }

      // Overlay nero puro: About → nero (p_about 0.70→0.90), completo prima che la sezione sotto prenda il viewport
    }

    // ── revealLetters: stagger per lettera, identico a SERVIZI ─────────────
    // pExitRaw: progresso uscita grezzo 0→1 (c01, non easato) — stagger per lettera
    function revealLetters(letters, p, base, dur, pExitRaw) {
      const n = letters.length;
      const eRaw = pExitRaw || 0;
      // Stagger uscita: distribuisce uniformemente su pExitRaw 0→1
      // ultima lettera inizia a 0.45, finisce a 1.0
      const EXIT_STAG = n > 1 ? 0.45 / (n - 1) : 0;
      const EXIT_EACH = 0.55;
      letters.forEach((el, i) => {
        const lP = ease(c01((p - base - i * 0.012) / dur));
        const eP = ease(c01((eRaw - i * EXIT_STAG) / EXIT_EACH));
        el.style.opacity   = (lP * (1 - eP)).toFixed(3);
        el.style.transform = `translateY(${((1 - lP) * 0.8 + eP * 0.8).toFixed(3)}em)`;
      });
    }

    // ── cta-coffee: unico progress → zampa + testo + CTA sincroni ───────────
    if (ctaCoffeeEl) {
      const cCR  = rect(ctaCoffeeEl);
      const ENTR = _vh * 0.70;
      // p: 0 = sezione sotto viewport, 1 = sezione top a 0. Simmetrico in reverse.
      const t = ease(c01((ENTR - cCR.top) / ENTR));
      const tx = `translateX(${((1 - t) * -60).toFixed(1)}%)`;
      if (coffeeImgEl)   { coffeeImgEl.style.opacity = t.toFixed(3);   coffeeImgEl.style.transform = tx; }
      if (coffeeInnerEl) { coffeeInnerEl.style.opacity = t.toFixed(3); coffeeInnerEl.style.transform = tx; }
    }

    // ── Reveal titolo Amici ───────────────────────────────────────────────────
    if (amiciSection) {
      const sR    = rect(amiciSection);
      const ENTRY = _vh * 0.70;
      const p_amici = c01((ENTRY - sR.top) / ENTRY);
      revealLetters(amiciLetters, p_amici, 0, 0.08);
    }

    // ── Reveal titoli FAQ (per lettera, stesso stagger di TIPS & TRICKS) ─────
    faqSections.forEach((sec, idx) => {
      if (!sec) return;
      const sR    = rect(sec);
      const ENTRY = _vh * 0.70;
      const p_faq = c01((ENTRY - sR.top) / ENTRY);
      const exitRaw = c01((sR.bottom - _vh * 0.30) / (_vh * 0.30) * -1 + 1);
      revealLetters(faqTitleLetters[idx], p_faq, 0, 0.08, exitRaw > 0.01 ? exitRaw : 0);
    });

    // ── FAQ overlays — tutte le pagine ──────────────────────────────────────
    faqOverlays.forEach(({ faqEl, prevOv, fuchsiaOv, nextEl }) => {
      const fR = rect(faqEl);
      // Overlay nero sulla sezione prima: sfuma mentre il top della FAQ sale
      if (prevOv) {
        const blackP = ease(c01((_vh - fR.top) / (_vh * 0.35)));
        prevOv.style.opacity = blackP.toFixed(3);
      }
      // Overlay fucsia sulla FAQ: sfuma mentre il top della sezione successiva sale
      if (nextEl) {
        const nR = rect(nextEl);
        const fuchsiaP = ease(c01((_vh - nR.top) / (_vh * 0.30)));
        fuchsiaOv.style.opacity = fuchsiaP.toFixed(3);
      }
    });

    // — WRITE: gradient transition overlays —
    transitions.forEach(({ section, ov }) => {
      const r = rect(section);
      const exitT = c01(((_vh * 0.65) - r.bottom) / (_vh * 0.65));
      ov.style.opacity = ease(exitT).toFixed(3);
    });

    // ── Sticky runway helper ──────────────────────────────────────────────────
    // Per sezioni 200dvh: p_at_sticky_start = 0.70 / (1.00 + 0.70) = 0.412
    // p=0 → sezione inizia a entrare dal basso
    // p=0.412 → sticky si attiva (top=0)
    // p=1 → fine runway, sticky si rilascia
    function stickyProg(sectionEl) {
      if (!sectionEl) return 0;
      const sR = rect(sectionEl);
      const ENTRY_RANGE = _vh * 0.70;
      const total = sectionEl.offsetHeight - _vh;
      return c01((ENTRY_RANGE - sR.top) / (total + ENTRY_RANGE));
    }

    // Shared reveal function (same pattern as revealAbout)
    function revealEl(el, p, base, dur, tOut) {
      if (!el) return;
      const tIn = ease(c01((p - base) / dur));
      el.style.opacity   = (tIn * (1 - tOut)).toFixed(3);
      el.style.transform = `translateY(${((1 - tIn) * 30 - tOut * 20).toFixed(1)}px)`;
    }

    // ── Case Studies (static, no scroll animation) ──────────────────────────

    // ── Tips & Tricks ─────────────────────────────────────────────────────────
    if (tipsSectionEl) {
      const p = stickyProg(tipsSectionEl);
      const EXIT_BASE = 0.95, EXIT_DUR = 0.05;
      const _tipsExitRaw = c01((p - EXIT_BASE) / EXIT_DUR);
      const tOut = ease(_tipsExitRaw);

      revealLetters(tipsLetters, p, 0.42, 0.08, _tipsExitRaw);

      tipsCards.forEach((el, i) => {
        const base = 0.52 + i * 0.08;
        const tIn = ease(c01((p - base) / 0.14));
        el.style.opacity   = (tIn * (1 - tOut)).toFixed(3);
        el.style.transform = `translateY(${((1 - tIn) * 30 - tOut * 20).toFixed(1)}px)`;
      });

      revealEl(tipsCTAEl, p, 0.73, 0.10, tOut);

      // Fuchsia overlay: rapido, si attiva quando il top di Contatti entra dal basso
      if (tipsFuchsiaOv && contattiEl) {
        const cR = rect(contattiEl);
        const fuchsiaP = ease(c01((_vh - cR.top) / (_vh * 0.30)));
        tipsFuchsiaOv.style.opacity = fuchsiaP.toFixed(3);
      }
    }

    // ── Contatti: reveal titolo per lettera (stesso stagger di Tips) ────────
    if (contattiEl && contattiLetters.length) {
      const cR = rect(contattiEl);
      const ENTRY = _vh * 0.70;
      const p_contatti = c01((ENTRY - cR.top) / ENTRY);
      revealLetters(contattiLetters, p_contatti, 0, 0.08);
    }

    // ── Contatti → footer: overlay fisso, nero — rimane pieno mentre sei sul footer
    // Inizia quando il bottom di Contatti esce dal viewport, completo in 50% vh
    // Non si azzera mai (niente outP): quando sei sul footer, Contatti è già nera
    {
      const cR = contattiEl ? rect(contattiEl) : null;
      const inP = cR ? ease(c01((_vh - cR.bottom) / (_vh * 0.50))) : 0;
      contattiExitOv.style.opacity = inP.toFixed(3);
    }

    // ── Footer scroll-driven reveal ───────────────────────────────────────────
    if (footerEl) {
      const fR       = footerEl.getBoundingClientRect();
      const p_footer = c01((_vh - fR.top) / (_vh + fR.height));

      // ESTRO ghost: stagger per lettera identico agli altri heading
      sfGhostLetters.forEach((el, i) => {
        const lP = ease(c01((p_footer - i * 0.012) / 0.08));
        el.style.opacity   = lP.toFixed(3);
        el.style.transform = `translateY(${((1 - lP) * 0.8).toFixed(3)}em)`;
      });

      // Colonne footer: stagger sequenziale
      sfColEls.forEach((el, i) => {
        const tIn = ease(c01((p_footer - (0.06 + i * 0.07)) / 0.16));
        el.style.opacity   = tIn.toFixed(3);
        el.style.transform = `translateY(${((1 - tIn) * 30).toFixed(1)}px)`;
      });

      // Legal row (ultima)
      if (sfLegalEl) {
        const tIn = ease(c01((p_footer - 0.38) / 0.16));
        sfLegalEl.style.opacity   = tIn.toFixed(3);
        sfLegalEl.style.transform = `translateY(${((1 - tIn) * 30).toFixed(1)}px)`;
      }
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}());

/* ═══════════════════════════════════════════════════════
   PAGE FAQ — titolo animato (parola per parola)
═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   PAGE FAQ — accordion
═══════════════════════════════════════════════════════ */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.page-faq__list').forEach(function (list) {
      var first = list.querySelector('.page-faq__item');
      if (first) {
        first.classList.add('open');
        first.querySelector('.page-faq__question').setAttribute('aria-expanded', 'true');
      }
    });
    var EYE_OPEN = '<svg class="eye-open" viewBox="0 0 56 52" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 26C10 13 20 8 28 8C36 8 46 13 52 26C46 39 36 44 28 44C20 44 10 39 4 26Z"/><circle cx="28" cy="26" r="9"/><circle cx="28" cy="26" r="4"/><line x1="10" y1="15" x2="7" y2="7"/><line x1="19" y1="9" x2="18" y2="1"/><line x1="28" y1="8" x2="28" y2="0"/><line x1="37" y1="9" x2="38" y2="1"/><line x1="46" y1="15" x2="49" y2="7"/><line x1="10" y1="37" x2="7" y2="45"/><line x1="19" y1="43" x2="18" y2="51"/><line x1="28" y1="44" x2="28" y2="52"/><line x1="37" y1="43" x2="38" y2="51"/><line x1="46" y1="37" x2="49" y2="45"/></svg>';
    var EYE_CLOSED = '<svg class="eye-closed" viewBox="0 0 56 52" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 26C10 39 20 44 28 44C36 44 46 39 52 26"/><line x1="10" y1="37" x2="7" y2="45"/><line x1="19" y1="43" x2="18" y2="51"/><line x1="28" y1="44" x2="28" y2="52"/><line x1="37" y1="43" x2="38" y2="51"/><line x1="46" y1="37" x2="49" y2="45"/></svg>';

    document.querySelectorAll('.page-faq__question').forEach(function (btn) {
      var icon = document.createElement('span');
      icon.className = 'page-faq__eye';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = EYE_OPEN + EYE_CLOSED;
      btn.appendChild(icon);

      btn.addEventListener('click', function () {
        var item = btn.closest('.page-faq__item');
        var isOpen = item.classList.contains('open');
        item.closest('.page-faq__list').querySelectorAll('.page-faq__item.open').forEach(function (el) {
          el.classList.remove('open');
          el.querySelector('.page-faq__question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
    });
  });
}());

/* ── Case Studies tabs ─────────────────────────────── */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var tabs   = document.querySelectorAll('.cst-tab');
    var panels = document.querySelectorAll('.cst-panel');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-cst');
        tabs.forEach(function (t) {
          t.classList.remove('on');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function (p) { p.classList.remove('on'); });
        tab.classList.add('on');
        tab.setAttribute('aria-selected', 'true');
        var panel = document.querySelector('[data-cst-panel="' + key + '"]');
        if (panel) panel.classList.add('on');
      });
    });
  });
}());

