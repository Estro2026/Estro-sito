// ── Titoli: fade/reveal standard al posto dell'effetto acqua ──
// I titoli che prima "ondeggiavano" ora entrano con una semplice
// dissolvenza dal basso quando arrivano in vista.
(function () {
  var SEL = [
    '.vhero__title', '#svcHeader .svc-title', '.about-section__big', '[data-rv="title"]',
    '#amici-title', '#cs2-title', '#tipsTitle', '#wall-title', '#faqTitle', '#contattiTitle',
    '.svc-hero__title', '.smm-panel__big-title', '.svc-clients__title', '.svc-magic__title',
    '.svc-caffe__title', '.page-faq__title', '.svc-section-title', '.svc-tools__title',
    '.svc-channels__title', '.svc-process__title', '.svc-ai-approccio__title',
    '.svc-ai-workflow__title', '.svc-talent-pronti__title', '.imk-intro__title',
    '.cs-hero__title', '.cs-works__title', '.cs-cta__title', '.cs2-hero__title',
    '.cs2-contact__title', '.art-hero__title', '.art-contact__title', '.tt-hero__title',
    '.tt-contact__title', '.lcn-hero__title', '.lcn-positions__heading', '#lcnApplyTitle',
    '#ctTitle', '#ctHubTitle', '#faqHeroTitle', '#faqContactTitle', '#nwHeroTitle',
    '#nwContactTitle', '.sf-ghost'
  ].join(',');
  var els = document.querySelectorAll(SEL);
  if (!els.length) return;
  var still = window.__STATIC_CAPTURE__ || !('IntersectionObserver' in window);
  els.forEach(function (el) {
    el.classList.add('tr-title');
    if (!still) el.classList.add('tr-hide');
  });
  if (still) return;
  // la transizione si accende dopo il primo frame, così lo stato
  // nascosto iniziale non viene animato
  requestAnimationFrame(function () {
    els.forEach(function (el) { el.classList.add('tr-ready'); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('tr-hide');
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  });
}());
