/**
 * ════════════════════════════════════════════════════════════════
 *  1142 LABS — FX-INIT.JS  v2.0
 *  MegaSpec Unified Initializer
 *  Applies full texture + text animation stack per the
 *  ANIMATED INSTRUCTIONS spec (Sections 8–9)
 *
 *  Global export: FX1142 (from fx-megaspec.js)
 *  Runs after window load. Page type detected via
 *  <body data-page="[type]"> attribute.
 *
 *  Page types:
 *    home        → index
 *    research    → research_breakthroughs, 1142_chemicals, chemlog
 *    lore        → about, vision, creators, archive
 *    engine      → calculators
 *    media       → posters, socials, resources, 1142-toke-times
 * ════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  window.addEventListener('load', function () {
    var FX = window.FX1142;
    if (!FX) return;

    var body = document.body;
    var page = body.getAttribute('data-page') || 'home';

    /* ─────────────────────────────────────────
       LAYER 0 — GLOBAL BACKGROUND (all pages)
       Deep-Lab Carbon Mesh is the universal backbone.
       Variant and density change per page type.
    ───────────────────────────────────────── */
    var meshVariant  = 'Carbon Black';
    var meshDensity  = 'low';

    if (page === 'lore')     { meshVariant = 'Cosmic Charcoal'; meshDensity = 'high'; }
    if (page === 'research') { meshVariant = 'Midnight Graphite'; meshDensity = 'medium'; }
    if (page === 'engine')   { meshVariant = 'Cryo-Steel'; meshDensity = 'medium'; }

    FX.texture.DeepLabCarbonMesh.mount(body, { variant: meshVariant, density: meshDensity, opacity: 0.6 });

    /* Micro-LED as secondary global shimmer */
    FX.texture.MicroLEDPixelMatrix.mount(body, { opacity: 0.12 });

    /* ─────────────────────────────────────────
       LAYER 1 — MIDGROUND INTERACTIVE
    ───────────────────────────────────────── */
    FX.texture.DataStreamFilaments.mount(body, { opacity: 0.4, count: 8 });
    FX.texture.CryoFogVapor.mount(body, { opacity: 0.22 });

    /* Circuit traces — scroll-triggered, medium+ pages */
    if (page !== 'home') {
      FX.texture.IonizedCircuitTraces.mount(body, { opacity: 0.3 });
    }

    /* Glass refraction — cursor-reactive on all pages */
    FX.texture.LabGlassRefraction.mount(body, { opacity: 0.28 });

    /* ─────────────────────────────────────────
       LAYER 2 — FOREGROUND MICRO-TEXTURES
    ───────────────────────────────────────── */
    FX.texture.DiagnosticScanlines.mount(body, { opacity: 0.35 });
    FX.texture.ParticleIonDrift.mount(body, { opacity: 0.45, count: 55 });

    /* Nano-grid + thermal — research / engine / analytics pages */
    if (page === 'research' || page === 'engine') {
      FX.texture.NanoGridOverlay.mount(body, { opacity: 0.22, cell: 40 });
      FX.texture.ThermalImagingGradient.mount(body, { opacity: 0.18 });
    }

    /* Holographic noise — research / data pages */
    if (page === 'research') {
      FX.texture.HolographicNoiseField.mount(body, { opacity: 0.2 });
    }

    /* ─────────────────────────────────────────
       LAYER 3 — SIGNATURE COSMIC-LAB HYBRIDS
    ───────────────────────────────────────── */

    /* Home hero: Crystal burst + Reactor core */
    if (page === 'home') {
      FX.texture.CrystalRefractionBurst.mount(body, { opacity: 0.5 });
      FX.texture.ReactorCorePulse.mount(body, { opacity: 0.35 });
      FX.texture.QuantumFieldRipple.mount(body, { opacity: 0.3 });
    }

    /* Lore / universe pages: Dark Matter swirl + Debris conveyor */
    if (page === 'lore') {
      FX.texture.DarkMatterLabSwirl.mount(body, { opacity: 0.4 });
      FX.texture.CosmicDebrisConveyor.mount(body, { opacity: 0.38, count: 20 });
      FX.texture.NeonIonStorm.mount(body, { opacity: 0.22 });
    }

    /* Research: Quantum ripple */
    if (page === 'research') {
      FX.texture.QuantumFieldRipple.mount(body, { opacity: 0.25 });
      FX.texture.CrystalRefractionBurst.mount(body, { opacity: 0.3 });
    }

    /* Engine / calculators: Scroll data sweep + Magnetic grid */
    if (page === 'engine') {
      FX.texture.ScrollDataSweep.mount(body, { opacity: 0.45 });
      FX.texture.MagneticAlignmentGrid.mount(body, { opacity: 0.28 });
      FX.texture.QuantumFieldRipple.mount(body, { opacity: 0.2 });
    }

    /* Media pages: moderate cosmic set */
    if (page === 'media') {
      FX.texture.CrystalRefractionBurst.mount(body, { opacity: 0.35 });
      FX.texture.CryoFogVapor.mount(body, { opacity: 0.28 });
    }

    /* ─────────────────────────────────────────
       LAYER 4 — UTILITY (all pages)
    ───────────────────────────────────────── */
    FX.texture.PressurePlateGlow.mount(body, { opacity: 0.45 });

    /* ─────────────────────────────────────────
       SECTION 7 — TEXT ANIMATION SYSTEM
       Applied per heading hierarchy + page type.
    ───────────────────────────────────────── */

    /* H1 — Primary hero reveal */
    var h1 = document.querySelector('h1');
    if (h1) {
      if (page === 'home')     FX.text.liquidChromaticSlide(h1,     { duration: 1100, delay: 150 });
      else if (page === 'lore') FX.text.crystalShatterIntro(h1,    { duration: 1200, delay: 100 });
      else if (page === 'research') FX.text.holographicScanlineReveal(h1, { duration: 1000, delay: 120 });
      else if (page === 'engine') FX.text.magneticPullIn(h1,        { duration: 900, delay: 100 });
      else                     FX.text.cosmicPulseReveal(h1,        { duration: 1000, delay: 150 });
    }

    /* H2 — Section title reveals with stagger */
    var h2s = document.querySelectorAll('h2');
    h2s.forEach(function (el, i) {
      var delay = 200 + i * 90;
      if (i % 3 === 0) FX.text.cosmicPulseReveal(el,         { duration: 900, delay: delay });
      else if (i % 3 === 1) FX.text.neonTraceOutline(el,     { duration: 800, delay: delay });
      else FX.text.timeSliceStagger(el,                       { duration: 750, delay: delay });
    });

    /* H3 — Glyph decode for sub-headings */
    var h3s = document.querySelectorAll('h3');
    h3s.forEach(function (el, i) {
      if (i < 12) {
        FX.text.glyphDecode(el, { duration: 700, delay: 100 + i * 50 });
      }
    });

    /* Section labels — quantum flicker */
    var labels = document.querySelectorAll('.section-label, .ts-label, .feat-num');
    labels.forEach(function (el, i) {
      if (i < 8) FX.text.quantumFlicker(el, { duration: 600, delay: 80 + i * 40 });
    });

    /* Hero eyebrow — solar flare */
    var eyebrow = document.querySelector('.hero-eyebrow, .page-eyebrow');
    if (eyebrow) FX.text.solarFlareSweep(eyebrow, { duration: 800, delay: 60 });

    /* Manifesto / pull quotes — dust to form */
    var quotes = document.querySelectorAll('.mh-quote, .manifesto-quote');
    quotes.forEach(function (el) {
      FX.text.dustToForm(el, { duration: 1400, delay: 200 });
    });

  }); // end window load

})();
