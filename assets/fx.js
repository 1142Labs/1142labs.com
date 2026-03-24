/**
 * ════════════════════════════════════════════════════
 *  1142 LABS — FX.JS  v3.0
 *  Visual Effects Package · Production Build
 *
 *  Modules:
 *   1. MatrixRain    — Falling glyph columns (canvas)
 *   2. CrystalBurst  — Pointer-reactive particle system
 *   3. ChromaShift   — Chromatic aberration on headings
 *   4. GlitchFlicker — Random screen-wide glitch events
 *   5. VortexPulse   — Hero background radial beat
 *   6. FloatCrystals — Ambient shard particles (canvas)
 *   7. AudioReact    — Cursor beat response (no audio req)
 *   8. Init          — Auto-wires all effects
 * ════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  /* ── PALETTE (matches global.css) ── */
  const C = {
    cyan:   '#00F0FF',
    pink:   '#EC4899',
    purple: '#8B5CF6',
    green:  '#4ade80',
    void:   '#0A0A0A',
  };

  /* ══════════════════════════════════════════════
     1. MATRIX RAIN
     Full-screen canvas: falling 1142-specific
     glyph columns — katakana, numerals, lab symbols
     ══════════════════════════════════════════════ */
  const MatrixRain = (() => {
    const GLYPHS =
      '1142アイウエオカキクケコサシスセソタチツテトナニヌネノ' +
      'ハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789' +
      '∞◆▲░▒▓⚗⚡∅∂∇Ψ∑∏∫≈≠≤≥→←↑↓◉●■□';

    let canvas, ctx, cols, drops, raf, active = false;

    const colours = [C.cyan, C.purple, C.pink, C.green];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / 20);
      drops = Array(cols).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(10,10,10,0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const col = colours[Math.floor(Math.random() * colours.length)];
        const x   = i * 20;
        const y   = drops[i] * 20;

        /* bright head */
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px "Share Tech Mono", monospace';
        ctx.fillText(g, x, y);

        /* trail */
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.65;
        ctx.fillText(g, x, y + 20);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }

    return {
      init(opacity = 0.06) {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-matrix';
        Object.assign(canvas.style, {
          position:      'fixed',
          inset:         '0',
          zIndex:        '1',
          pointerEvents: 'none',
          opacity:       String(opacity),
        });
        document.body.prepend(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        draw();
        active = true;
      },
      destroy() {
        cancelAnimationFrame(raf);
        canvas?.remove();
        active = false;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     2. CRYSTAL BURST PARTICLES
     Click/tap spawns an explosion of crystal shards
     from the cursor position
     ══════════════════════════════════════════════ */
  const CrystalBurst = (() => {
    let canvas, ctx, particles = [], raf, active = false;

    class Shard {
      constructor(x, y) {
        this.x  = x;
        this.y  = y;
        this.vx = (Math.random() - 0.5) * 14;
        this.vy = (Math.random() - 0.5) * 14;
        this.life  = 1;
        this.decay = 0.02 + Math.random() * 0.025;
        this.size  = 3 + Math.random() * 6;
        this.col   = [C.cyan, C.pink, C.purple, C.green, '#ffffff'][
          Math.floor(Math.random() * 5)
        ];
        this.rot   = Math.random() * Math.PI * 2;
        this.rotV  = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.x    += this.vx;
        this.y    += this.vy;
        this.vx   *= 0.93;
        this.vy   *= 0.93;
        this.vy   += 0.25;            /* gravity */
        this.life -= this.decay;
        this.rot  += this.rotV;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.strokeStyle = this.col;
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = this.col;
        ctx.shadowBlur  = 8;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        /* diamond shard */
        ctx.beginPath();
        ctx.moveTo(0,         -this.size);
        ctx.lineTo(this.size * 0.5,  0);
        ctx.lineTo(0,          this.size * 1.4);
        ctx.lineTo(-this.size * 0.5, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      raf = requestAnimationFrame(loop);
    }

    function burst(e) {
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;
      const count = 18 + Math.floor(Math.random() * 14);
      for (let i = 0; i < count; i++) particles.push(new Shard(x, y));
    }

    return {
      init() {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-burst';
        Object.assign(canvas.style, {
          position:      'fixed',
          inset:         '0',
          zIndex:        '8990',
          pointerEvents: 'none',
        });
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('click',      burst);
        window.addEventListener('touchstart', burst, { passive: true });
        loop();
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     3. CHROMA SHIFT
     Applies animated RGB-split effect to headings
     on scroll entry — CSS approach for performance
     ══════════════════════════════════════════════ */
  const ChromaShift = (() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes chromaIn {
        0%   { text-shadow: 0 0 0 rgba(0,240,255,0), 0 0 0 rgba(236,72,153,0); }
        20%  { text-shadow: -4px 0 0 rgba(0,240,255,0.7), 4px 0 0 rgba(236,72,153,0.7); }
        40%  { text-shadow: 3px 0 0 rgba(0,240,255,0.5), -3px 0 0 rgba(236,72,153,0.5); }
        60%  { text-shadow: -2px 0 0 rgba(0,240,255,0.4), 2px 0 0 rgba(236,72,153,0.4); }
        80%  { text-shadow: 1px 0 0 rgba(0,240,255,0.2), -1px 0 0 rgba(236,72,153,0.2); }
        100% { text-shadow: 0 0 0 rgba(0,240,255,0), 0 0 0 rgba(236,72,153,0); }
      }
      .chroma-active {
        animation: chromaIn 0.6s ease-out forwards !important;
      }
      h1.section-title, h2.section-title {
        transition: text-shadow 0.3s ease;
      }
    `;
    return {
      init() {
        document.head.appendChild(style);
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.remove('chroma-active');
              void e.target.offsetWidth;
              e.target.classList.add('chroma-active');
            }
          });
        }, { threshold: 0.3 });
        document.querySelectorAll('.section-title, h1').forEach(el => obs.observe(el));
      },
    };
  })();

  /* ══════════════════════════════════════════════
     4. GLITCH FLICKER
     Random screen-wide glitch events — flashes a
     full-screen overlay with scan-jitter
     ══════════════════════════════════════════════ */
  const GlitchFlicker = (() => {
    let overlay, scheduled = false;

    const css = `
      #fx-glitch-overlay {
        position: fixed; inset: 0; z-index: 8998;
        pointer-events: none; opacity: 0;
        mix-blend-mode: screen;
      }
      @keyframes glitchFlash {
        0%   { opacity: 0; transform: translateX(0); clip-path: none; }
        10%  { opacity: 0.12; transform: translateX(-3px); background: rgba(0,240,255,0.08); }
        20%  { opacity: 0; transform: translateX(3px); }
        30%  { opacity: 0.09; transform: translateX(-2px); background: rgba(236,72,153,0.08); }
        40%  { opacity: 0; transform: translateX(0); }
        50%  { opacity: 0.07; clip-path: polygon(0 30%, 100% 30%, 100% 35%, 0 35%); background: rgba(0,240,255,0.15); }
        60%  { opacity: 0; clip-path: none; }
        100% { opacity: 0; }
      }
    `;

    function scheduleNext() {
      const delay = 6000 + Math.random() * 14000;
      setTimeout(fire, delay);
    }

    function fire() {
      overlay.style.animation = 'none';
      void overlay.offsetWidth;
      overlay.style.background = Math.random() > 0.5
        ? 'rgba(0,240,255,0.04)' : 'rgba(236,72,153,0.04)';
      overlay.style.animation = 'glitchFlash 0.35s ease-out forwards';
      scheduleNext();
    }

    return {
      init() {
        if (scheduled) return;
        const s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
        overlay = document.createElement('div');
        overlay.id = 'fx-glitch-overlay';
        document.body.appendChild(overlay);
        scheduleNext();
        scheduled = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     5. VORTEX PULSE
     Hero section: periodic radial ripple from center
     Syncs with page scroll position
     ══════════════════════════════════════════════ */
  const VortexPulse = (() => {
    let canvas, ctx, rings = [], raf, active = false;

    class Ring {
      constructor() {
        this.r     = 0;
        this.max   = Math.max(window.innerWidth, window.innerHeight) * 0.8;
        this.speed = 1.5 + Math.random() * 1.5;
        this.col   = [C.cyan, C.purple, C.pink][Math.floor(Math.random() * 3)];
        this.alpha = 0.35;
      }
      update() {
        this.r     += this.speed;
        this.alpha  = 0.35 * (1 - this.r / this.max);
      }
      draw(ctx, cx, cy) {
        ctx.beginPath();
        ctx.arc(cx, cy, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = this.col;
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.lineWidth   = 1;
        ctx.shadowColor = this.col;
        ctx.shadowBlur  = 6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      get done() { return this.r >= this.max; }
    }

    let spawnTimer = 0;
    const SPAWN_INTERVAL = 80; /* frames */

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      spawnTimer++;
      if (spawnTimer >= SPAWN_INTERVAL) { rings.push(new Ring()); spawnTimer = 0; }
      rings = rings.filter(r => !r.done);
      rings.forEach(r => { r.update(); r.draw(ctx, cx, cy); });
      raf = requestAnimationFrame(loop);
    }

    return {
      init(selector = '.vortex-hero') {
        const hero = document.querySelector(selector);
        if (!hero || active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-vortex';
        Object.assign(canvas.style, {
          position:      'absolute',
          inset:         '0',
          zIndex:        '0',
          pointerEvents: 'none',
          opacity:       '0.5',
        });
        hero.style.position = hero.style.position || 'relative';
        hero.prepend(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        loop();
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     6. FLOAT CRYSTALS
     Ambient background: slowly drifting geometric
     shards, parallax on mousemove
     ══════════════════════════════════════════════ */
  const FloatCrystals = (() => {
    let canvas, ctx, shards = [], mouse = { x: 0, y: 0 }, raf, active = false;

    class FloatShard {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x     = Math.random() * window.innerWidth;
        this.y     = initial ? Math.random() * window.innerHeight : window.innerHeight + 20;
        this.size  = 4 + Math.random() * 10;
        this.speed = 0.2 + Math.random() * 0.5;
        this.drift = (Math.random() - 0.5) * 0.4;
        this.rot   = Math.random() * Math.PI * 2;
        this.rotV  = (Math.random() - 0.5) * 0.008;
        this.alpha = 0.04 + Math.random() * 0.08;
        this.col   = [C.cyan, C.purple, C.pink, C.green][Math.floor(Math.random() * 4)];
        this.parallax = 0.01 + Math.random() * 0.03;
      }
      update(mx, my) {
        this.y   -= this.speed;
        this.x   += this.drift + (mx - window.innerWidth / 2) * this.parallax * 0.01;
        this.rot += this.rotV;
        if (this.y < -20) this.reset();
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.col;
        ctx.lineWidth   = 1;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.moveTo(0,             -this.size);
        ctx.lineTo(this.size * 0.45, 0);
        ctx.lineTo(0,              this.size * 1.3);
        ctx.lineTo(-this.size * 0.45, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shards.forEach(s => { s.update(mouse.x, mouse.y); s.draw(ctx); });
      raf = requestAnimationFrame(loop);
    }

    return {
      init(count = 60) {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-crystals';
        Object.assign(canvas.style, {
          position:      'fixed',
          inset:         '0',
          zIndex:        '2',
          pointerEvents: 'none',
        });
        document.body.prepend(canvas);
        ctx = canvas.getContext('2d');
        resize();
        for (let i = 0; i < count; i++) shards.push(new FloatShard());
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
        loop();
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     7. NEON TRAIL
     Persistent glowing cursor trail that fades out
     ══════════════════════════════════════════════ */
  const NeonTrail = (() => {
    let canvas, ctx, points = [], raf, mouse = { x: -200, y: -200 }, active = false;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points = points.filter(p => p.life > 0);
      for (let i = 1; i < points.length; i++) {
        const p = points[i], pp = points[i - 1];
        const t = p.life;
        ctx.beginPath();
        ctx.moveTo(pp.x, pp.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.col;
        ctx.globalAlpha = t * 0.6;
        ctx.lineWidth   = t * 2.5;
        ctx.shadowColor = p.col;
        ctx.shadowBlur  = 8;
        ctx.stroke();
        p.life -= 0.025;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }

    const cols = [C.cyan, C.purple, C.pink];
    let ci = 0, frame = 0;

    return {
      init() {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-trail';
        Object.assign(canvas.style, {
          position: 'fixed', inset: '0',
          zIndex: '8991', pointerEvents: 'none',
        });
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
          frame++;
          if (frame % 2 === 0) {
            ci = (ci + 1) % cols.length;
            points.push({ x: e.clientX, y: e.clientY, life: 1, col: cols[ci] });
            if (points.length > 80) points.shift();
          }
        });
        loop();
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     8. BOOT SEQUENCE
     Typewriter boot screen on first visit (session)
     ══════════════════════════════════════════════ */
  const BootSequence = (() => {
    const lines = [
      '> INITIALIZING 1142 LABS SYSTEM v4.0...',
      '> LOADING COGNITIVE LIBERATION PROTOCOLS...',
      '> ORIGIN: DEC 22, 2019 · 11:42 PM — BARRIE, ONTARIO',
      '> UNIT 1142-B :: ST. JIMMY PHENIDATE — ONLINE ✓',
      '> BLUE METH WAR :: PROTOCOL LOADED ✓',
      '> CYANS & MAGENTAS: ACTIVE ✓',
      '> NEURODIVERGENT EMPOWERMENT MODULE: LOADED ✓',
      '> CONTAINMENT STATUS: FAILED (EXPECTED) ✓',
      '> PERSONA MATRIX — 6 DIMENSIONS ACTIVE ✓',
      '> STOLEN ESSENCE RETURNING TO RIGHTFUL OWNER...',
      '> RE-ROUTING FUEL TO ANALYSIS...',
      '> FINAL CODE: 1142',
      '> AN EVERDARK PRODUCTION.',
      '> 1142 IS INEVITABLE.',
      '',
    ];

    return {
      init(onDone) {
        if (sessionStorage.getItem('1142-booted')) { onDone?.(); return; }
        const overlay = document.createElement('div');
        overlay.id = 'fx-boot';
        Object.assign(overlay.style, {
          position:        'fixed', inset: '0',
          background:      '#000',
          zIndex:          '99999',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          padding:         '10vw',
          fontFamily:      '"Share Tech Mono", monospace',
          fontSize:        'clamp(11px,1.5vw,15px)',
          color:           C.cyan,
          letterSpacing:   '.15em',
          lineHeight:      '2',
          textShadow:      `0 0 10px ${C.cyan}`,
          cursor:          'none',
        });

        /* skip button */
        const skip = document.createElement('div');
        Object.assign(skip.style, {
          position:     'absolute', bottom: '40px', right: '48px',
          fontSize:     '10px', letterSpacing: '.3em',
          color:        'rgba(0,240,255,.4)', cursor: 'pointer',
        });
        skip.textContent = '[ SKIP → ]';
        skip.addEventListener('click', finish);
        overlay.appendChild(skip);

        const terminal = document.createElement('div');
        overlay.appendChild(terminal);
        document.body.appendChild(overlay);

        let li = 0;
        function finish() {
          overlay.style.transition = 'opacity .5s';
          overlay.style.opacity    = '0';
          setTimeout(() => { overlay.remove(); onDone?.(); }, 500);
          sessionStorage.setItem('1142-booted', '1');
        }
        function nextLine() {
          if (li >= lines.length) { setTimeout(finish, 400); return; }
          const row = document.createElement('div');
          terminal.appendChild(row);
          const text = lines[li++];
          let ci = 0;
          function type() {
            if (ci <= text.length) {
              row.textContent = text.slice(0, ci++);
              setTimeout(type, text === '' ? 1 : 28 + Math.random() * 20);
            } else {
              setTimeout(nextLine, text === '' ? 80 : 120);
            }
          }
          type();
        }
        nextLine();
      },
    };
  })();

  /* ══════════════════════════════════════════════
     9. SCAN BAR
     Periodic horizontal glitch bars that sweep
     across the viewport — classic CRT distortion
     ══════════════════════════════════════════════ */
  const ScanBar = (() => {
    let active = false;

    const css = `
      .fx-scanbar {
        position: fixed;
        left: 0; right: 0;
        height: 3px;
        z-index: 8997;
        pointer-events: none;
        opacity: 0;
        mix-blend-mode: screen;
        transform: translateY(-100%);
      }
      @keyframes scanBarSweep {
        0%   { transform: translateY(-100%); opacity: 0; }
        5%   { opacity: 0.6; }
        95%  { opacity: 0.3; }
        100% { transform: translateY(calc(100vh + 100%)); opacity: 0; }
      }
    `;

    function fire() {
      const bar = document.createElement('div');
      bar.className = 'fx-scanbar';
      const cols = [C.cyan, C.pink, C.purple, '#ffffff'];
      const col = cols[Math.floor(Math.random() * cols.length)];
      const h = 1 + Math.floor(Math.random() * 4);
      bar.style.cssText = `
        background: ${col};
        box-shadow: 0 0 8px ${col}, 0 0 20px ${col};
        height: ${h}px;
        top: 0;
        opacity: 0;
        animation: scanBarSweep ${1.5 + Math.random()}s linear forwards;
      `;
      document.body.appendChild(bar);
      bar.addEventListener('animationend', () => bar.remove());
      const delay = 3000 + Math.random() * 10000;
      setTimeout(fire, delay);
    }

    return {
      init() {
        if (active) return;
        const s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
        setTimeout(fire, 2000 + Math.random() * 4000);
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     10. PIXEL DISPLACE
     On a random interval, briefly displaces a
     horizontal strip of pixels — authentic CRT glitch
     ══════════════════════════════════════════════ */
  const PixelDisplace = (() => {
    let overlay, active = false;

    return {
      init() {
        if (active) return;
        overlay = document.createElement('canvas');
        overlay.id = 'fx-displace';
        Object.assign(overlay.style, {
          position: 'fixed', inset: '0',
          zIndex: '8996', pointerEvents: 'none',
          opacity: '0',
        });
        overlay.width = window.innerWidth;
        overlay.height = window.innerHeight;
        document.body.appendChild(overlay);
        window.addEventListener('resize', () => {
          overlay.width = window.innerWidth;
          overlay.height = window.innerHeight;
        });

        function glitchPop() {
          const ctx = overlay.getContext('2d');
          const count = 2 + Math.floor(Math.random() * 4);
          overlay.style.opacity = '1';
          ctx.clearRect(0, 0, overlay.width, overlay.height);
          for (let i = 0; i < count; i++) {
            const y = Math.random() * overlay.height;
            const h = 1 + Math.random() * 4;
            const shift = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 20);
            const col = [C.cyan, C.pink, C.purple][Math.floor(Math.random() * 3)];
            ctx.fillStyle = col.replace(')', ', 0.15)').replace('rgb', 'rgba').replace('#00F0FF', 'rgba(0,240,255,0.12)').replace('#EC4899','rgba(236,72,153,0.12)').replace('#8B5CF6','rgba(139,92,246,0.12)');
            ctx.fillRect(shift, y, overlay.width, h);
          }
          setTimeout(() => { ctx.clearRect(0, 0, overlay.width, overlay.height); overlay.style.opacity = '0'; }, 80);
          const next = 4000 + Math.random() * 12000;
          setTimeout(glitchPop, next);
        }

        setTimeout(glitchPop, 3000 + Math.random() * 5000);
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     INIT — Auto-wire all effects based on page
     ══════════════════════════════════════════════ */
  /* ══════════════════════════════════════════════
     AGE GATE
     Full-screen age verification — 19+ required.
     Persists via localStorage (survives tab close).
     "NO" redirects to Google. "YES" unlocks site.
     ══════════════════════════════════════════════ */
  const AgeGate = (() => {
    const STORAGE_KEY = '1142-age-verified';

    function isVerified() {
      try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch(e) { return false; }
    }

    function setVerified() {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch(e) {}
    }

    function show(onPass) {
      if (isVerified()) { onPass?.(); return; }

      // Lock scroll
      document.documentElement.style.overflow = 'hidden';

      const overlay = document.createElement('div');
      overlay.id = 'age-gate';

      overlay.innerHTML = `
        <canvas id="age-gate-canvas"></canvas>
        <div class="ag-content">
          <div class="ag-logo-wrap">
            <img src="assets/images/1142_logo.png" alt="1142 Labs" class="ag-logo">
          </div>
          <div class="ag-eyebrow">— ACCESS VERIFICATION —</div>
          <h1 class="ag-title">
            <span class="ag-title-line">NOTICE:</span>
          </h1>
          <p class="ag-body">
            This site discusses <span class="ag-highlight-c">drugs, stimulants, and controlled substances</span> in the context of independent scientific research.<br><br>
            You must be <span class="ag-highlight-p">19 years of age or older</span> to enter.
          </p>
          <div class="ag-question">Are you 19 or older?</div>
          <div class="ag-buttons">
            <button class="ag-btn ag-btn-yes" id="ag-yes">
              <span class="ag-btn-label">YES — ENTER</span>
              <span class="ag-btn-sub">I am 19 or older</span>
            </button>
            <button class="ag-btn ag-btn-no" id="ag-no">
              <span class="ag-btn-label">NO — EXIT</span>
              <span class="ag-btn-sub">I am under 19</span>
            </button>
          </div>
          <div class="ag-legal">
            By entering you confirm you are of legal age and accept responsibility for viewing research content involving controlled substances.
          </div>
          <div class="ag-footer-brand">AN EVERDARK PRODUCTION · EST. DEC 22, 2019</div>
        </div>
      `;

      // Styles
      const style = document.createElement('style');
      style.textContent = `
        #age-gate {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          overflow: hidden;
          animation: agFadeIn 0.4s ease forwards;
        }
        @keyframes agFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        #age-gate-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.07;
        }

        /* grid overlay */
        #age-gate::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,240,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 1;
          animation: gridPulse 8s ease-in-out infinite;
        }

        /* orb glows */
        #age-gate::after {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,.18) 0, transparent 65%);
          bottom: -200px; left: -100px;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: drift2 18s ease-in-out infinite alternate;
        }

        .ag-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 60px 40px;
          max-width: 600px;
          width: 90%;
          border: 1px solid rgba(0,240,255,.25);
          background: rgba(10,10,20,.92);
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 80px rgba(0,0,0,.8),
            0 0 40px rgba(0,240,255,.06),
            inset 0 0 60px rgba(139,92,246,.04);
          animation: agSlideUp 0.5s cubic-bezier(.16,1,.3,1) forwards;
        }
        /* animated top border */
        .ag-content::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #00F0FF, #8B5CF6, #EC4899, #00F0FF);
          background-size: 200% 100%;
          animation: hueShift 3s linear infinite;
        }
        @keyframes hueShift { from{background-position:0 0} to{background-position:200% 0} }
        @keyframes agSlideUp {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .ag-logo-wrap {
          margin-bottom: 24px;
        }
        .ag-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
          display: block;
          margin: 0 auto;
          filter: drop-shadow(0 0 20px #00F0FF) drop-shadow(0 0 40px #8B5CF6);
          animation: logoPulse 3s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%,100% { filter: drop-shadow(0 0 20px #00F0FF) drop-shadow(0 0 40px #8B5CF6); }
          50%      { filter: drop-shadow(0 0 30px #EC4899) drop-shadow(0 0 50px #00F0FF); }
        }

        .ag-eyebrow {
          font-size: 9px;
          letter-spacing: .6em;
          color: rgba(0,240,255,.6);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .ag-title {
          font-family: 'Outrun Future', 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(22px, 4vw, 36px);
          text-transform: uppercase;
          letter-spacing: .06em;
          color: #F0F4FF;
          margin-bottom: 24px;
          text-shadow: 0 0 20px rgba(0,240,255,.3);
        }

        .ag-body {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 300;
          color: rgba(240,244,255,.65);
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .ag-highlight-c {
          color: #00F0FF;
          text-shadow: 0 0 8px rgba(0,240,255,.5);
        }
        .ag-highlight-p {
          color: #8B5CF6;
          text-shadow: 0 0 8px rgba(139,92,246,.5);
          font-weight: 600;
        }

        .ag-question {
          font-family: 'Outrun Future', 'Orbitron', sans-serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: #EC4899;
          text-shadow: 0 0 16px rgba(236,72,153,.6), 0 0 32px rgba(236,72,153,.3);
          margin-bottom: 32px;
          animation: questionPulse 2s ease-in-out infinite;
        }
        @keyframes questionPulse {
          0%,100% { text-shadow: 0 0 16px rgba(236,72,153,.6), 0 0 32px rgba(236,72,153,.3); }
          50%      { text-shadow: 0 0 24px rgba(236,72,153,.9), 0 0 48px rgba(236,72,153,.5); }
        }

        .ag-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .ag-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 18px 40px;
          border: 1px solid;
          background: transparent;
          cursor: pointer;
          transition: all .25s;
          position: relative;
          overflow: hidden;
          clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
          min-width: 160px;
          font-family: 'Share Tech Mono', monospace;
        }
        .ag-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
          transform: translateX(-100%);
          transition: transform .5s;
        }
        .ag-btn:hover::before { transform: translateX(100%); }

        .ag-btn-yes {
          border-color: #00F0FF;
          color: #00F0FF;
        }
        .ag-btn-yes:hover {
          background: rgba(0,240,255,.12);
          box-shadow: 0 0 24px rgba(0,240,255,.5), 0 0 48px rgba(0,240,255,.2), inset 0 0 20px rgba(0,240,255,.06);
          transform: translateY(-2px);
        }
        .ag-btn-no {
          border-color: rgba(236,72,153,.5);
          color: rgba(236,72,153,.7);
        }
        .ag-btn-no:hover {
          background: rgba(236,72,153,.08);
          box-shadow: 0 0 20px rgba(236,72,153,.3);
          transform: translateY(-2px);
          border-color: #EC4899;
          color: #EC4899;
        }
        .ag-btn-label {
          font-size: 13px;
          letter-spacing: .25em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .ag-btn-sub {
          font-size: 9px;
          letter-spacing: .2em;
          opacity: .6;
          text-transform: uppercase;
        }

        .ag-legal {
          font-size: 9px;
          letter-spacing: .08em;
          color: rgba(240,244,255,.25);
          line-height: 1.6;
          max-width: 460px;
          margin: 0 auto 20px;
        }

        .ag-footer-brand {
          font-size: 8px;
          letter-spacing: .4em;
          color: rgba(139,92,246,.4);
          text-transform: uppercase;
        }

        /* NO shake animation */
        @keyframes agShake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-8px)}
          30%{transform:translateX(8px)}
          45%{transform:translateX(-6px)}
          60%{transform:translateX(6px)}
          75%{transform:translateX(-3px)}
          90%{transform:translateX(3px)}
        }
        .ag-shake { animation: agShake .5s ease-out; }

        /* Exit animation */
        @keyframes agExit {
          0%  { opacity:1; transform:scale(1); filter:none; }
          40% { opacity:.8; transform:scale(1.02); filter:brightness(1.3); }
          60% { opacity:.6; transform:scale(0.98) skewX(-1deg); filter:hue-rotate(30deg) brightness(1.5); }
          80% { opacity:.3; transform:scale(1.01); filter:hue-rotate(60deg); }
          100%{ opacity:0; transform:scale(1.04); filter:brightness(2); }
        }
        .ag-exiting { animation: agExit .6s ease-in forwards !important; }

        @media(max-width:520px){
          .ag-content { padding:40px 24px; }
          .ag-buttons { flex-direction:column; align-items:center; }
          .ag-btn { min-width:220px; }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(overlay);

      // Matrix rain on canvas
      const canvas = document.getElementById('age-gate-canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const GLYPHS = '1142アイウエオカキクケコ0123456789∞◆▲⚗⚡∅≈≠∑→←↑↓◉■□';
        const cols = Math.floor(canvas.width / 22);
        const drops = Array(cols).fill(1);
        const matrixColors = [C.cyan, C.purple, C.pink];
        function drawMatrix() {
          ctx.fillStyle = 'rgba(0,0,0,0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < cols; i++) {
            const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            ctx.fillStyle = matrixColors[Math.floor(Math.random() * matrixColors.length)];
            ctx.font = '13px "Share Tech Mono", monospace';
            ctx.globalAlpha = 0.7;
            ctx.fillText(g, i * 22, drops[i] * 22);
            ctx.globalAlpha = 1;
            if (drops[i] * 22 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
          }
        }
        let matrixRaf;
        (function matrixLoop() { drawMatrix(); matrixRaf = requestAnimationFrame(matrixLoop); })();
        window._agMatrixRaf = matrixRaf;
      }

      // YES handler
      document.getElementById('ag-yes').addEventListener('click', () => {
        setVerified();
        overlay.classList.add('ag-exiting');
        document.documentElement.style.overflow = '';
        if (window._agMatrixRaf) cancelAnimationFrame(window._agMatrixRaf);
        setTimeout(() => {
          overlay.remove();
          onPass?.();
        }, 600);
      });

      // NO handler
      document.getElementById('ag-no').addEventListener('click', () => {
        const content = overlay.querySelector('.ag-content');
        content.classList.remove('ag-shake');
        void content.offsetWidth;
        content.classList.add('ag-shake');
        // Brief pause then redirect
        setTimeout(() => {
          window.location.href = 'https://www.google.com';
        }, 600);
      });
    }

    return { show, isVerified };
  })();

  function init() {
    const isHome  = !location.pathname.includes('research') &&
                    !location.pathname.includes('tools')    &&
                    !location.pathname.includes('about')    &&
                    !location.pathname.includes('archive');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Age gate fires first — effects launch after verification */
    function launchEffects() {
      if (reduced) return;
      CrystalBurst.init();
      ChromaShift.init();
      GlitchFlicker.init();
      NeonTrail.init();
      ScanBar.init();
      NavController.init();
      PixelDisplace.init();
      if (isHome) {
        MatrixRain.init(0.05);
        VortexPulse.init('.vortex-hero');
        FloatCrystals.init(55);
        BootSequence.init();
      } else {
        FloatCrystals.init(35);
      }
    }

    AgeGate.show(launchEffects);
  }


  /* ══ NAV CONTROLLER ══ */
  const NavController = (() => {
    function init() {
      const hud = document.getElementById('hud');
      const overlay = document.getElementById('nav-overlay');
      const drawer = document.getElementById('nav-drawer');
      const openBtn = document.getElementById('nav-open');
      const closeBtn = document.getElementById('nav-close');

      if (!hud) return;

      // Scroll: add .scrolled class
      const onScroll = () => {
        hud.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Active link highlight
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.hud-link, .drawer-link').forEach(a => {
        const href = a.getAttribute('href');
        if (href && (href === currentPage || href.startsWith(currentPage.split('#')[0]))) {
          a.classList.add('active');
        }
      });

      // Hamburger open
      if (openBtn) {
        openBtn.addEventListener('click', () => {
          openBtn.classList.add('open');
          overlay.classList.add('open');
          drawer.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }

      // Close via overlay or close btn
      const closeDrawer = () => {
        if (openBtn) openBtn.classList.remove('open');
        overlay.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      };
      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
      if (overlay) overlay.addEventListener('click', closeDrawer);

      // Close on drawer link click
      document.querySelectorAll('.drawer-link').forEach(a => {
        a.addEventListener('click', closeDrawer);
      });
    }
    return { init };
  })();

  /* ── Expose to global scope for manual control ── */
  window.FX1142 = {
    MatrixRain,
    CrystalBurst,
    ChromaShift,
    GlitchFlicker,
    VortexPulse,
    FloatCrystals,
    NeonTrail,
    BootSequence,
    ScanBar,
    PixelDisplace,
    AgeGate,
    NavController,
    init,
  };

  /* ── Auto-init on DOMContentLoaded ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
