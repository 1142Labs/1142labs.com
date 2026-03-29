/**
 * 1142 LABS — FX-INIT.JS v3.0 [FULL COVERAGE]
 * All 13 Pages · All Element Classes · MegaSpec Complete
 */

(function () {
  'use strict';

  /* CSS injection */
  var S = document.createElement('style');
  S.id = 'fx-init-styles';
  S.textContent = [
    /* entry animations */
    '.fx-enter{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}',
    '.fx-enter.fx-visible{opacity:1;transform:translateY(0)}',
    '.fx-enter-left{opacity:0;transform:translateX(-32px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}',
    '.fx-enter-left.fx-visible{opacity:1;transform:translateX(0)}',
    '.fx-enter-scale{opacity:0;transform:scale(0.88);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}',
    '.fx-enter-scale.fx-visible{opacity:1;transform:scale(1)}',
    '.fx-enter-flip{opacity:0;transform:perspective(600px) rotateX(14deg) translateY(20px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}',
    '.fx-enter-flip.fx-visible{opacity:1;transform:perspective(600px) rotateX(0deg) translateY(0)}',
    /* stagger delays */
    '.fx-d0{transition-delay:0ms!important}.fx-d1{transition-delay:60ms!important}.fx-d2{transition-delay:120ms!important}',
    '.fx-d3{transition-delay:180ms!important}.fx-d4{transition-delay:240ms!important}.fx-d5{transition-delay:300ms!important}',
    '.fx-d6{transition-delay:360ms!important}.fx-d7{transition-delay:420ms!important}.fx-d8{transition-delay:480ms!important}',
    '.fx-d9{transition-delay:540ms!important}',
    /* hover card shimmer */
    '.feat-card,.ql-card,.paper-card,.persona-card,.chem-card,.log-entry,.ts-cell,.stat-box,.poster-item,.tnode-card,.card{transition:border-color .3s,transform .3s,box-shadow .3s!important}',
    '.feat-card:hover,.ql-card:hover{border-color:var(--cyan)!important;box-shadow:0 0 24px rgba(0,240,255,.18),0 20px 60px rgba(0,0,0,.5)!important}',
    '.paper-card:hover{border-color:var(--purple)!important;box-shadow:0 0 24px rgba(139,92,246,.18)!important}',
    '.persona-card:hover{border-color:var(--pink)!important;box-shadow:0 0 28px rgba(236,72,153,.2)!important}',
    '.log-entry:hover{border-color:var(--green)!important;box-shadow:0 0 16px rgba(74,222,128,.12)!important}',
    /* btn shine */
    '.btn-neon{overflow:hidden;position:relative}',
    '.btn-neon::after{content:"";position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transform:skewX(-20deg);transition:left .5s;pointer-events:none}',
    '.btn-neon:hover::after{left:150%}',
    /* stat glow */
    '@keyframes statGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.3) drop-shadow(0 0 12px currentColor)}}',
    '.stat-n{animation:statGlow 3s ease-in-out infinite}',
    /* icon float */
    '@keyframes iconFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}',
    '.feat-icon{display:inline-block;animation:iconFloat 3s ease-in-out infinite}',
    '.feat-card:nth-child(2) .feat-icon{animation-delay:.4s}.feat-card:nth-child(3) .feat-icon{animation-delay:.8s}',
    '.feat-card:nth-child(4) .feat-icon{animation-delay:1.2s}.feat-card:nth-child(5) .feat-icon{animation-delay:1.6s}',
    '.feat-card:nth-child(6) .feat-icon{animation-delay:2s}',
    /* marquee sep */
    '@keyframes sepGlimmer{0%,100%{color:var(--cyan);text-shadow:0 0 6px var(--cyan)}50%{color:var(--pink);text-shadow:0 0 10px var(--pink)}}',
    '.marquee-item .sep{animation:sepGlimmer 2s ease-in-out infinite}.marquee-item:nth-child(2) .sep{animation-delay:1s}',
    /* timeline dot pulse */
    '@keyframes nodePulse{0%,100%{box-shadow:0 0 6px currentColor;transform:scale(1)}50%{box-shadow:0 0 18px currentColor,0 0 32px currentColor;transform:scale(1.2)}}',
    '.tnode-dot,.mnode-dot{animation:nodePulse 2.2s ease-in-out infinite}',
    /* digit flicker */
    '@keyframes digitFlicker{0%,95%,100%{opacity:1}96%{opacity:.6}97%{opacity:1}98%{opacity:.7}99%{opacity:1}}',
    '.ttc-digit{animation:digitFlicker 8s linear infinite}',
    /* badge pulse */
    '@keyframes badgePulse{0%,100%{opacity:.8}50%{opacity:1;filter:brightness(1.3)}}',
    '.card-badge,.card-glow{animation:badgePulse 3s ease-in-out infinite}',
    /* effect tags */
    '.effect-tag,.tag-c,.tag-p,.tag-g,.tag-pk{transition:background .3s,color .3s,box-shadow .3s}',
    '.effect-tag:hover,.tag-c:hover,.tag-p:hover,.tag-g:hover,.tag-pk:hover{filter:brightness(1.4);box-shadow:0 0 12px currentColor}',
    /* duration bar */
    '@keyframes barFill{from{width:0!important;opacity:0}}',
    '.duration-fill{animation:barFill 1.5s cubic-bezier(.16,1,.3,1) both}',
    /* tab btn trace */
    '.tab-btn{position:relative;overflow:hidden}',
    '.tab-btn::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--cyan);box-shadow:0 0 8px var(--cyan);transform:scaleX(0);transition:transform .3s}',
    '.tab-btn:hover::after,.tab-btn.active::after{transform:scaleX(1)}',
    /* filter btn */
    '.filter-btn{transition:background .25s,color .25s,box-shadow .25s}',
    '.filter-btn:hover,.filter-btn.active{box-shadow:0 0 14px rgba(0,240,255,.3)}',
    /* paper finding */
    '.paper-finding{position:relative;transition:color .3s,padding-left .3s}',
    '.paper-finding:hover{color:var(--cyan)!important;padding-left:8px}',
    '.paper-finding::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--cyan);box-shadow:0 0 8px var(--cyan);transform:scaleY(0);transition:transform .3s}',
    '.paper-finding:hover::before{transform:scaleY(1)}',
    /* paper quote border */
    '@keyframes quoteBorder{0%,100%{border-color:var(--purple);box-shadow:-4px 0 12px rgba(139,92,246,.2)}50%{border-color:var(--cyan);box-shadow:-4px 0 20px rgba(0,240,255,.3)}}',
    '.paper-quote{border-left:2px solid var(--purple);animation:quoteBorder 3s ease-in-out infinite}',
    /* hero stat */
    '@keyframes heroStatPulse{0%,100%{text-shadow:0 0 15px currentColor}50%{text-shadow:0 0 30px currentColor,0 0 50px currentColor}}',
    '.hero-stat-num{animation:heroStatPulse 3s ease-in-out infinite}',
    /* memory */
    '@keyframes memoryFade{from{opacity:.8}to{opacity:1}}',
    '.memory{animation:memoryFade 5s ease-in-out infinite alternate}',
    /* drawer link */
    '.drawer-link{transition:color .2s,padding-left .2s,text-shadow .2s}',
    '.drawer-link:hover{color:var(--cyan)!important;padding-left:10px;text-shadow:0 0 10px rgba(0,240,255,.5)}',
    /* mega icon spin */
    '.mega-icon{display:inline-block;transition:transform .3s}',
    '.mega-item:hover .mega-icon{transform:rotate(15deg) scale(1.2)}',
    /* panels */
    '@keyframes panelCyan{from{box-shadow:0 0 20px rgba(0,240,255,.15)}to{box-shadow:0 0 40px rgba(0,240,255,.3),inset 0 0 20px rgba(0,240,255,.05)}}',
    '@keyframes panelMagenta{from{box-shadow:0 0 20px rgba(236,72,153,.15)}to{box-shadow:0 0 40px rgba(236,72,153,.3),inset 0 0 20px rgba(236,72,153,.05)}}',
    '.ttc-cyan-panel,.cyan-panel{animation:panelCyan 4s ease-in-out infinite alternate}',
    '.ttc-magenta-panel,.magenta-panel{animation:panelMagenta 4s ease-in-out infinite alternate;animation-delay:2s}',
    /* neon highlights */
    '@keyframes nhc{0%,100%{text-shadow:0 0 8px var(--cyan)}50%{text-shadow:0 0 18px var(--cyan),0 0 30px var(--cyan)}}',
    '@keyframes nhp{0%,100%{text-shadow:0 0 8px var(--purple)}50%{text-shadow:0 0 18px var(--purple),0 0 30px var(--purple)}}',
    '@keyframes nhm{0%,100%{text-shadow:0 0 8px var(--pink)}50%{text-shadow:0 0 18px var(--pink),0 0 30px var(--pink)}}',
    '.neon-highlight-c{animation:nhc 4s ease-in-out infinite}',
    '.neon-highlight-p{animation:nhp 4s ease-in-out infinite;animation-delay:1.3s}',
    '.neon-highlight-m{animation:nhm 4s ease-in-out infinite;animation-delay:2.6s}',
    /* glitch rgb */
    '@keyframes glitchRgb{0%,90%,100%{text-shadow:none;transform:none}92%{text-shadow:-3px 0 var(--cyan),3px 0 var(--pink);transform:skewX(-1deg)}94%{text-shadow:3px 0 var(--cyan),-3px 0 var(--pink)}96%{text-shadow:none;transform:none}}',
    '.glitch-rgb{animation:glitchRgb 7s infinite}',
    /* data badge */
    '@keyframes dataBadge{0%,100%{opacity:.85}50%{opacity:1;filter:brightness(1.25)}}',
    '.data-badge,.data-badge-c{animation:dataBadge 3.5s ease-in-out infinite}',
    '.data-badge-p{animation:dataBadge 3.5s ease-in-out infinite;animation-delay:.7s}',
    '.data-badge-g{animation:dataBadge 3.5s ease-in-out infinite;animation-delay:1.4s}',
    '.data-badge-m{animation:dataBadge 3.5s ease-in-out infinite;animation-delay:2.1s}',
    /* header line */
    '@keyframes headerLineSweep{from{transform:scaleX(0);opacity:0}to{transform:scaleX(1);opacity:1}}',
    '.header-line{animation:headerLineSweep 1.5s cubic-bezier(.16,1,.3,1) both;transform-origin:left}',
    /* phase block hover */
    '.phase-block{transition:border-color .3s,box-shadow .3s}',
    '.phase-block:hover{border-color:var(--cyan)!important;box-shadow:0 0 20px rgba(0,240,255,.1)!important}',
    /* card social */
    '.card:hover{transform:translateY(-4px)!important}',
    /* social spike */
    '@keyframes spikeGlimmer{from{filter:drop-shadow(0 0 8px rgba(0,240,255,.3))}to{filter:drop-shadow(0 0 20px rgba(236,72,153,.5))}}',
    '.card-spikes{animation:spikeGlimmer 4s ease-in-out infinite alternate}',
    /* footer orbs */
    '@keyframes footerOrb{from{opacity:.4;transform:scale(1)}to{opacity:.7;transform:scale(1.15)}}',
    '.footer-glow-c,.footer-glow-p{animation:footerOrb 6s ease-in-out infinite alternate}',
    '.footer-glow-p{animation-delay:3s}',
    /* leaf / crown */
    '@keyframes leafWave{0%,100%{opacity:.6}50%{opacity:1}}',
    '.leaf-accent,.leaf-sep{animation:leafWave 3s ease-in-out infinite}',
    '@keyframes crownGlow{0%,100%{filter:drop-shadow(0 0 6px gold)}50%{filter:drop-shadow(0 0 16px gold) brightness(1.3)}}',
    '.crown{animation:crownGlow 3s ease-in-out infinite}',
    /* btn shine variant */
    '@keyframes btnShine{0%{background-position:-200% 0}100%{background-position:200% 0}}',
    '.btn-shine{background-size:200% 100%;animation:btnShine 3s linear infinite}',
    /* tnode enter */
    '.tnode{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}',
    '.tnode.fx-visible{opacity:1;transform:translateY(0)}',
    '.mnode{opacity:0;transform:translateX(-20px);transition:opacity .6s ease,transform .6s ease}',
    '.mnode.fx-visible{opacity:1;transform:translateX(0)}',
    '.mnode-right{transform:translateX(20px)}.mnode-right.fx-visible{transform:translateX(0)}',
    /* expand btn */
    '.expand-btn{transition:background .25s,color .25s,transform .25s}',
    '.expand-btn:hover{transform:scale(1.05)}',
  ].join('\n');
  document.head.appendChild(S);

  /* ── IntersectionObserver factory ── */
  function makeObs() {
    return new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('fx-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  }
  var obs = makeObs();

  function watch(sel, cls, stagger) {
    var els = document.querySelectorAll(sel);
    els.forEach(function(el, i) {
      /* skip already-tagged */
      if (el.dataset.fxDone) return;
      el.dataset.fxDone = '1';
      /* skip if CSS will conflict — only tag non-tnode/mnode via generic */
      if ((sel === '.tnode' || sel === '.mnode' || sel.indexOf('tnode') > -1 || sel.indexOf('mnode') > -1)) {
        obs.observe(el);
        return;
      }
      if (!el.classList.contains('fx-enter') && !el.classList.contains('fx-enter-left') &&
          !el.classList.contains('fx-enter-scale') && !el.classList.contains('fx-enter-flip')) {
        el.classList.add(cls || 'fx-enter');
      }
      if (stagger !== false) el.classList.add('fx-d' + (i % 10));
      obs.observe(el);
    });
  }

  window.addEventListener('load', function() {
    var FX   = window.FX1142;
    var body = document.body;
    var page = body.getAttribute('data-page') || 'home';

    /* ══════════════════════════════
       TEXTURE LAYERS
    ══════════════════════════════ */
    if (FX) {
      var mv = {home:'Carbon Black',research:'Midnight Graphite',lore:'Cosmic Charcoal',engine:'Cryo-Steel',media:'Carbon Black'}[page]||'Carbon Black';
      var md = {home:'low',research:'medium',lore:'high',engine:'medium',media:'low'}[page]||'low';
      FX.texture.DeepLabCarbonMesh.mount(body,{variant:mv,density:md,opacity:0.6});
      FX.texture.MicroLEDPixelMatrix.mount(body,{opacity:0.1});
      FX.texture.DataStreamFilaments.mount(body,{opacity:0.38,count:8});
      FX.texture.CryoFogVapor.mount(body,{opacity:0.2});
      FX.texture.LabGlassRefraction.mount(body,{opacity:0.25});
      if (page!=='home') FX.texture.IonizedCircuitTraces.mount(body,{opacity:0.28});
      FX.texture.DiagnosticScanlines.mount(body,{opacity:0.3});
      FX.texture.ParticleIonDrift.mount(body,{opacity:0.42,count:55});
      FX.texture.PressurePlateGlow.mount(body,{opacity:0.42});

      if (page==='home')     { FX.texture.CrystalRefractionBurst.mount(body,{opacity:0.5}); FX.texture.ReactorCorePulse.mount(body,{opacity:0.32}); FX.texture.QuantumFieldRipple.mount(body,{opacity:0.28}); }
      if (page==='lore')     { FX.texture.DarkMatterLabSwirl.mount(body,{opacity:0.38}); FX.texture.CosmicDebrisConveyor.mount(body,{opacity:0.35,count:20}); FX.texture.NeonIonStorm.mount(body,{opacity:0.2}); FX.texture.CrystalRefractionBurst.mount(body,{opacity:0.28}); }
      if (page==='research') { FX.texture.HolographicNoiseField.mount(body,{opacity:0.18}); FX.texture.NanoGridOverlay.mount(body,{opacity:0.2,cell:40}); FX.texture.ThermalImagingGradient.mount(body,{opacity:0.16}); FX.texture.QuantumFieldRipple.mount(body,{opacity:0.22}); FX.texture.CrystalRefractionBurst.mount(body,{opacity:0.28}); }
      if (page==='engine')   { FX.texture.ScrollDataSweep.mount(body,{opacity:0.42}); FX.texture.MagneticAlignmentGrid.mount(body,{opacity:0.26}); FX.texture.ThermalImagingGradient.mount(body,{opacity:0.16}); FX.texture.QuantumFieldRipple.mount(body,{opacity:0.18}); FX.texture.NanoGridOverlay.mount(body,{opacity:0.18,cell:32}); }
      if (page==='media')    { FX.texture.CrystalRefractionBurst.mount(body,{opacity:0.32}); FX.texture.CosmicDebrisConveyor.mount(body,{opacity:0.25,count:14}); }

      /* ══════════════════════════════
         TEXT ANIMATION SYSTEM
      ══════════════════════════════ */

      /* H1 */
      var h1=document.querySelector('h1');
      if (h1) {
        if (page==='home')     FX.text.liquidChromaticSlide(h1,{duration:1100,delay:150});
        else if (page==='lore')     FX.text.crystalShatterIntro(h1,{duration:1200,delay:100});
        else if (page==='research') FX.text.holographicScanlineReveal(h1,{duration:1000,delay:120});
        else if (page==='engine')   FX.text.magneticPullIn(h1,{duration:900,delay:100});
        else                        FX.text.neonTraceOutline(h1,{duration:1000,delay:150});
      }

      /* H2 — staggered 4-rotation */
      document.querySelectorAll('h2').forEach(function(el,i){
        var d=180+i*85,m=i%4;
        if(m===0)      FX.text.cosmicPulseReveal(el,{duration:900,delay:d});
        else if(m===1) FX.text.neonTraceOutline(el,{duration:800,delay:d});
        else if(m===2) FX.text.timeSliceStagger(el,{duration:780,delay:d});
        else           FX.text.verticalWarp(el,{duration:850,delay:d});
      });

      /* H3 */
      document.querySelectorAll('h3').forEach(function(el,i){
        if(i<24) FX.text.glyphDecode(el,{duration:700,delay:80+i*45});
      });

      /* H4 */
      document.querySelectorAll('h4').forEach(function(el,i){
        if(i<18) FX.text.quantumFlicker(el,{duration:600,delay:60+i*35});
      });

      /* H5 */
      document.querySelectorAll('h5').forEach(function(el,i){
        if(i<14) FX.text.modularTileFlip(el,{duration:550,delay:50+i*30});
      });

      /* Section labels, feat-num, paper-id, phase-num */
      document.querySelectorAll('.section-label,.ts-label,.feat-num,.phase-num,.paper-id,.card-badge-text').forEach(function(el,i){
        if(i<28) FX.text.quantumFlicker(el,{duration:550,delay:60+i*35});
      });

      /* Section titles */
      document.querySelectorAll('.section-title').forEach(function(el,i){
        FX.text.cosmicPulseReveal(el,{duration:950,delay:140+i*60});
      });

      /* Hero eyebrow / tagline / sub */
      document.querySelectorAll('.hero-eyebrow,.hero-tagline,.page-eyebrow,.header-tag,.hero-tag,.header-sub').forEach(function(el,i){
        FX.text.solarFlareSweep(el,{duration:800,delay:60+i*40});
      });

      /* Hero mission / section-sub */
      document.querySelectorAll('.hero-mission,.hero-sub,.section-sub').forEach(function(el,i){
        FX.text.heatwaveDistortion(el,{duration:900,delay:200+i*70});
      });

      /* Manifesto / pull quotes */
      document.querySelectorAll('.mh-quote,.manifesto-quote,.paper-quote').forEach(function(el){
        FX.text.dustToForm(el,{duration:1400,delay:200});
      });

      /* mh-sub */
      document.querySelectorAll('.mh-sub').forEach(function(el){
        FX.text.timeSliceStagger(el,{duration:800,delay:300});
      });

      /* Card / tile titles */
      document.querySelectorAll('.feat-title,.ql-title,.paper-title,.persona-name,.card-name,.phase-title,.tnode-desc,.mnode-label,.poster-title,.ci-name').forEach(function(el,i){
        if(i<32) FX.text.glyphDecode(el,{duration:600,delay:50+i*28});
      });

      /* Stat numbers */
      document.querySelectorAll('.stat-n,.hero-stat-num,.ttc-days-number').forEach(function(el,i){
        FX.text.cosmicPulseReveal(el,{duration:800,delay:100+i*50});
      });

      /* Footer col titles */
      document.querySelectorAll('.footer-col-title').forEach(function(el,i){
        FX.text.quantumFlicker(el,{duration:500,delay:80+i*40});
      });

      /* Card bodies / descs */
      document.querySelectorAll('.feat-body,.card-desc,.paper-body,.ql-desc,.phase-body,.ci-desc,.log-body').forEach(function(el,i){
        if(i<24) FX.text.heatwaveDistortion(el,{duration:700,delay:80+i*22});
      });

      /* Log dates/titles */
      document.querySelectorAll('.log-title,.log-date,.top-bar').forEach(function(el,i){
        if(i<14) FX.text.starfallCascade(el,{duration:650,delay:60+i*40});
      });

      /* Persona name/role */
      document.querySelectorAll('.persona-name,.persona-role,.creator-name,.creator-role,.ename').forEach(function(el,i){
        if(i<16) FX.text.crystalShatterIntro(el,{duration:800,delay:80+i*50});
      });

      /* Feat-link / ql-arrow */
      document.querySelectorAll('.feat-link,.ql-arrow,.feat-link span,.paper-author').forEach(function(el,i){
        if(i<20) FX.text.magneticPullIn(el,{duration:600,delay:40+i*30});
      });

      /* Marquee items */
      document.querySelectorAll('.marquee-item').forEach(function(el,i){
        FX.text.liquidChromaticSlide(el,{duration:800,delay:i*200});
      });

      /* Memory tribute */
      var mem=document.querySelector('.memory');
      if(mem) FX.text.dustToForm(mem,{duration:1600,delay:400});

      /* Page-specific extras */
      if (page==='engine') {
        document.querySelectorAll('label,.ttc-digit-label,.ttc-panel h3,.ttc-panel h4').forEach(function(el,i){
          if(i<22) FX.text.magneticPullIn(el,{duration:600,delay:50+i*30});
        });
        document.querySelectorAll('.ttc-live-clock,.liveClock,.liveClock2').forEach(function(el,i){
          FX.text.cosmicPulseReveal(el,{duration:700,delay:100+i*40});
        });
        document.querySelectorAll('.ttc-days-number,.ttc-days-unit').forEach(function(el,i){
          FX.text.neonTraceOutline(el,{duration:900,delay:150+i*50});
        });
      }

      if (page==='media') {
        document.querySelectorAll('.tnode-icon,.mnode-icon').forEach(function(el,i){
          FX.text.solarFlareSweep(el,{duration:700,delay:50+i*60});
        });
        document.querySelectorAll('.tnode-ampm,.mnode-time,.mnode-label').forEach(function(el,i){
          if(i<18) FX.text.quantumFlicker(el,{duration:500,delay:40+i*35});
        });
      }

      if (page==='research') {
        document.querySelectorAll('.header-title,.header-sub,.card-alias').forEach(function(el,i){
          if(i<12) FX.text.holographicScanlineReveal(el,{duration:800,delay:80+i*50});
        });
        document.querySelectorAll('.paper-finding').forEach(function(el,i){
          if(i<20) FX.text.timeSliceStagger(el,{duration:600,delay:40+i*25});
        });
        document.querySelectorAll('.filter-btn,.filter-btns button').forEach(function(el,i){
          FX.text.quantumFlicker(el,{duration:500,delay:60+i*30});
        });
        document.querySelectorAll('.hero-stat-num,.hero-stat-label').forEach(function(el,i){
          FX.text.cosmicPulseReveal(el,{duration:800,delay:120+i*60});
        });
        document.querySelectorAll('.tab-btn').forEach(function(el,i){
          FX.text.neonTraceOutline(el,{duration:700,delay:100+i*80});
        });
      }

      if (page==='lore') {
        document.querySelectorAll('.phase-body,.archive-section p,.manifesto-section p').forEach(function(el,i){
          if(i<22) FX.text.heatwaveDistortion(el,{duration:750,delay:60+i*35});
        });
        document.querySelectorAll('.data-badge,.data-badge-c,.data-badge-p,.data-badge-g,.data-badge-m').forEach(function(el,i){
          FX.text.starfallCascade(el,{duration:600,delay:80+i*45});
        });
      }
    } // end if FX

    /* ══════════════════════════════════════════════════════
       SCROLL-OBSERVE — every animatable selector
    ══════════════════════════════════════════════════════ */

    /* Cards */
    watch('.feat-card',       'fx-enter-flip', true);
    watch('.ql-card',         'fx-enter-flip', true);
    watch('.paper-card',      'fx-enter-flip', true);
    watch('.persona-card',    'fx-enter-flip', true);
    watch('.chem-card',       'fx-enter-flip', true);
    watch('.poster-item',     'fx-enter-flip', true);
    watch('.phase-block',     'fx-enter-flip', true);
    watch('.tnode-card',      'fx-enter-flip', true);
    watch('.card',            'fx-enter-flip', true);
    watch('.res-card',        'fx-enter-flip', true);
    watch('.social-card',     'fx-enter-flip', true);

    /* Log / archive */
    watch('.log-entry',       'fx-enter-left', true);
    watch('.archive-item',    'fx-enter-left', true);
    watch('.log-block',       'fx-enter-left', true);
    watch('.manifesto-section','fx-enter-left', true);
    watch('.paper-finding',   'fx-enter-left', true);

    /* Stat / panel (scale) */
    watch('.stat-box',        'fx-enter-scale', true);
    watch('.ts-cell',         'fx-enter-scale', true);
    watch('.hero-stat',       'fx-enter-scale', true);
    watch('.ttc-panel',       'fx-enter-scale', true);
    watch('.ttc-cyan-panel',  'fx-enter-scale', true);
    watch('.ttc-magenta-panel','fx-enter-scale', true);
    watch('.cyan-panel',      'fx-enter-scale', true);
    watch('.magenta-panel',   'fx-enter-scale', true);

    /* Buttons */
    watch('.btn-neon',        'fx-enter-scale', true);
    watch('.tab-btn',         'fx-enter-scale', true);
    watch('.filter-btn',      'fx-enter',       true);
    watch('.expand-btn',      'fx-enter',       true);

    /* Text/body elements */
    watch('.section-sub',     'fx-enter', true);
    watch('.feat-body',       'fx-enter', true);
    watch('.feat-link',       'fx-enter', true);
    watch('.ql-desc',         'fx-enter', true);
    watch('.ql-arrow',        'fx-enter', true);
    watch('.paper-body',      'fx-enter', true);
    watch('.paper-tags',      'fx-enter', true);
    watch('.paper-author',    'fx-enter', true);
    watch('.paper-quote',     'fx-enter-left', false);
    watch('.log-body',        'fx-enter', true);
    watch('.card-body',       'fx-enter', true);
    watch('.card-desc',       'fx-enter', true);
    watch('.card-alias',      'fx-enter', true);
    watch('.phase-body',      'fx-enter', true);
    watch('.feat-icon',       'fx-enter-scale', true);
    watch('.feat-num',        'fx-enter', true);
    watch('.hero-tag',        'fx-enter', true);
    watch('.hero-stat-label', 'fx-enter', true);

    /* Images */
    watch('.asset-img',       'fx-enter-scale', false);
    watch('.poster-item img', 'fx-enter-scale', false);

    /* Marquee */
    watch('.marquee-strip',   'fx-enter', false);

    /* Timeline nodes */
    watch('.tnode',           '',  true);
    watch('.mnode',           '',  true);

    /* Chemical elements */
    watch('.card-badge',      'fx-enter-scale', true);
    watch('.effects-grid',    'fx-enter',       false);
    watch('.duration-bar',    'fx-enter',       false);
    watch('.effect-tag',      'fx-enter',       true);
    watch('.duration-label',  'fx-enter',       true);
    watch('.card-glow',       'fx-enter-scale', false);
    watch('.expand-btn',      'fx-enter',       true);
    watch('.filter-bar',      'fx-enter',       false);
    watch('.modal-body',      'fx-enter',       false);
    watch('.portal-toolbar',  'fx-enter',       false);
    watch('.library-filter-row','fx-enter',     false);

    /* Social */
    watch('.ent-row',         'fx-enter-left', true);
    watch('.logo-block',      'fx-enter-scale', true);
    watch('.ci-desc',         'fx-enter',       true);
    watch('.ci-plat',         'fx-enter',       true);
    watch('.badge',           'fx-enter-scale', true);
    watch('.fdot',            'fx-enter-scale', true);
    watch('.fstatus',         'fx-enter',       true);

    /* Persona / about */
    watch('.data-badge',      'fx-enter-scale', true);
    watch('.neon-highlight-c','fx-enter',       true);
    watch('.neon-highlight-p','fx-enter',       true);
    watch('.neon-highlight-m','fx-enter',       true);
    watch('.phase-timeline',  'fx-enter',       false);
    watch('.memory',          'fx-enter',       false);

    /* Footer */
    watch('.footer-brand',    'fx-enter',       false);
    watch('.footer-col',      'fx-enter',       true);
    watch('.footer-bottom',   'fx-enter',       false);

    /* Lore / archive */
    watch('.archive-section', 'fx-enter-left',  true);
    watch('.manifesto-section','fx-enter-left',  true);

    /* Research extras */
    watch('.paper-grid',      'fx-enter',       false);
    watch('.hero-stats',      'fx-enter',       false);
    watch('.paper-icon',      'fx-enter-scale', true);
    watch('.paper-card .paper-title', 'fx-enter', true);

    /* Asset showcase */
    watch('.asset-img + div', 'fx-enter-left',  false);

    /* Toke times */
    watch('.timeline-wrap',   'fx-enter',       false);
    watch('.ttc-grid',        'fx-enter',       false);
    watch('.ttc-days-hero',   'fx-enter-scale', false);

    /* Calculators */
    watch('.ttc-digit-block', 'fx-enter-scale', true);
    watch('.ttc-live-clock',  'fx-enter-scale', false);
    watch('#combo-calc',      'fx-enter',       false);
    watch('#withdrawal-calc', 'fx-enter',       false);

  }); // end load

})();
