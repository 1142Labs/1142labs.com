/**
 * ════════════════════════════════════════════════════
 *  1142 LABS — FX.JS  v4.0  ADVANCED VISUALS
 *  Neural Fortress · Plasma Core · Holographic Grid
 *
 *  Modules:
 *   1.  MatrixRain       — Falling glyph columns
 *   2.  CrystalBurst     — Click particle explosions
 *   3.  ChromaShift      — RGB-split heading effect
 *   4.  GlitchFlicker    — Random screen glitch events
 *   5.  VortexPulse      — Radial ring ripples
 *   6.  FloatCrystals    — Ambient floating shards
 *   7.  NeonTrail        — Cursor chromatic trail
 *   8.  BootSequence     — First-visit typewriter boot
 *   9.  NeuralWeb        — Interconnected node network
 *   10. PlasmaLightning  — Fractal lightning bolts
 *   11. HoloScanlines    — CRT holographic scanlines
 *   12. WarpSpeed        — Hyperspace star streaks
 *   13. CardTilt3D       — Perspective mouse tilt on cards
 *   14. HexGrid          — Animated hexagonal grid pulse
 *   15. AuraGlow         — Section-entry radial bloom
 *   16. DataStream       — Flowing encoded data columns
 * ════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  const C = {
    cyan:   '#00F0FF',
    cyan2:  '#00C8D8',
    pink:   '#EC4899',
    pink2:  '#FF007A',
    purple: '#8B5CF6',
    green:  '#4ade80',
    white:  '#F0F4FF',
    void:   '#0A0A0A',
  };

  /* ── shared util ── */
  function rgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }
  function rnd(min, max) { return min + Math.random() * (max - min); }

  /* ══════════════════════════════════════════════
     1. MATRIX RAIN  (enhanced — multi-layer)
     ══════════════════════════════════════════════ */
  const MatrixRain = (() => {
    const GLYPHS =
      '1142アイウエオカキクケコサシスセソタチツテトナニヌネノ' +
      'ハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789' +
      '∞◆▲░▒▓⚗⚡∅∂∇Ψ∑∏∫≈≠≤≥→←↑↓◉●■□⊕⊗⊘';
    let canvas, ctx, cols, drops, speeds, active = false, raf;
    const colours = [C.cyan, C.purple, C.pink, C.green, C.cyan2];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols   = Math.floor(canvas.width / 18);
      drops  = Array.from({length: cols}, () => rnd(0, canvas.height / 18));
      speeds = Array.from({length: cols}, () => rnd(0.3, 1.1));
    }

    function draw() {
      ctx.fillStyle = 'rgba(10,10,10,0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cols; i++) {
        const g   = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const col = colours[Math.floor(Math.random() * colours.length)];
        const x   = i * 18, y = drops[i] * 18;
        ctx.fillStyle = '#fff';
        ctx.font = `${rnd(11,15)}px "Share Tech Mono",monospace`;
        ctx.fillText(g, x, y);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.5;
        ctx.fillText(g, x, y + 18);
        ctx.globalAlpha = 1;
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
      raf = requestAnimationFrame(draw);
    }

    return {
      init(opacity = 0.055) {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-matrix';
        Object.assign(canvas.style, {
          position:'fixed', inset:'0', zIndex:'1',
          pointerEvents:'none', opacity: String(opacity),
        });
        document.body.prepend(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        draw();
        active = true;
      },
      destroy() { cancelAnimationFrame(raf); canvas?.remove(); active = false; },
    };
  })();

  /* ══════════════════════════════════════════════
     2. CRYSTAL BURST  (enhanced — more types)
     ══════════════════════════════════════════════ */
  const CrystalBurst = (() => {
    let canvas, ctx, particles = [], raf, active = false;
    class Shard {
      constructor(x, y, type = 'diamond') {
        this.x = x; this.y = y;
        this.vx = rnd(-8, 8); this.vy = rnd(-10, 4);
        this.life = 1; this.decay = rnd(0.018, 0.032);
        this.size = rnd(2, 8);
        this.col = [C.cyan, C.pink, C.purple, C.green, '#fff'][Math.floor(Math.random()*5)];
        this.rot = Math.random() * Math.PI * 2;
        this.rotV = rnd(-0.25, 0.25);
        this.type = ['diamond','ring','line','triangle'][Math.floor(Math.random()*4)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.92; this.vy *= 0.92;
        this.vy += 0.22;
        this.life -= this.decay; this.rot += this.rotV;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.strokeStyle = this.col;
        ctx.fillStyle = rgba(this.col, 0.15);
        ctx.lineWidth = 1.2;
        ctx.shadowColor = this.col;
        ctx.shadowBlur = 10;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        if (this.type === 'ring') {
          ctx.arc(0, 0, this.size, 0, Math.PI*2);
          ctx.stroke();
        } else if (this.type === 'line') {
          ctx.moveTo(-this.size, 0); ctx.lineTo(this.size, 0);
          ctx.moveTo(0, -this.size); ctx.lineTo(0, this.size);
          ctx.stroke();
        } else if (this.type === 'triangle') {
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.87, this.size * 0.5);
          ctx.lineTo(-this.size * 0.87, this.size * 0.5);
          ctx.closePath(); ctx.stroke(); ctx.fill();
        } else {
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.5, 0);
          ctx.lineTo(0, this.size * 1.4);
          ctx.lineTo(-this.size * 0.5, 0);
          ctx.closePath(); ctx.stroke(); ctx.fill();
        }
        ctx.restore();
      }
    }
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      raf = requestAnimationFrame(loop);
    }
    function burst(e) {
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth/2;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight/2;
      for (let i = 0; i < 24; i++) particles.push(new Shard(x, y));
    }
    return {
      init() {
        if (active) return;
        canvas = document.createElement('canvas');
        canvas.id = 'fx-burst';
        Object.assign(canvas.style, { position:'fixed', inset:'0', zIndex:'8990', pointerEvents:'none' });
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('click', burst);
        window.addEventListener('touchstart', burst, {passive:true});
        loop();
        active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     3. CHROMA SHIFT
     ══════════════════════════════════════════════ */
  const ChromaShift = (() => {
    return {
      init() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes chromaIn {
            0%   { text-shadow: 0 0 0 rgba(0,240,255,0), 0 0 0 rgba(236,72,153,0); }
            15%  { text-shadow: -5px 0 0 rgba(0,240,255,0.8), 5px 0 0 rgba(236,72,153,0.8); }
            30%  { text-shadow: 4px 0 0 rgba(0,240,255,0.6), -4px 0 0 rgba(236,72,153,0.6); }
            50%  { text-shadow: -2px 0 0 rgba(0,240,255,0.3), 2px 0 0 rgba(236,72,153,0.3); }
            100% { text-shadow: 0 0 0 rgba(0,240,255,0), 0 0 0 rgba(236,72,153,0); }
          }
          .chroma-active { animation: chromaIn 0.7s ease-out forwards !important; }
        `;
        document.head.appendChild(style);
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.remove('chroma-active');
              void e.target.offsetWidth;
              e.target.classList.add('chroma-active');
            }
          });
        }, {threshold: 0.3});
        document.querySelectorAll('.section-title, h1').forEach(el => obs.observe(el));
      },
    };
  })();

  /* ══════════════════════════════════════════════
     4. GLITCH FLICKER  (enhanced — line slice glitch)
     ══════════════════════════════════════════════ */
  const GlitchFlicker = (() => {
    let scheduled = false;
    const css = `
      #fx-glitch-overlay {
        position:fixed; inset:0; z-index:8998; pointer-events:none; opacity:0; mix-blend-mode:screen;
      }
      @keyframes glitchFlash {
        0%   { opacity:0; transform:translateX(0) skewX(0deg); }
        8%   { opacity:0.14; transform:translateX(-4px) skewX(-0.5deg); background:rgba(0,240,255,0.08); }
        16%  { opacity:0; transform:translateX(4px); }
        24%  { opacity:0.11; transform:translateX(-2px); background:rgba(236,72,153,0.08);
               clip-path:polygon(0 20%, 100% 20%, 100% 22%, 0 22%); }
        32%  { opacity:0; transform:translateX(0); clip-path:none; }
        40%  { opacity:0.08; clip-path:polygon(0 60%, 100% 60%, 100% 64%, 0 64%); background:rgba(0,240,255,0.12); }
        48%  { opacity:0; clip-path:none; }
        100% { opacity:0; }
      }
      @keyframes glitchSlice {
        0%   { transform: translateX(0); opacity: 1; }
        20%  { transform: translateX(-6px); opacity: 0.8; }
        40%  { transform: translateX(6px); opacity: 0.8; }
        60%  { transform: translateX(-3px); opacity: 0.9; }
        80%  { transform: translateX(2px); opacity: 0.95; }
        100% { transform: translateX(0); opacity: 1; }
      }
      .glitch-slice { animation: glitchSlice 0.15s ease-out; }
    `;
    return {
      init() {
        if (scheduled) return;
        const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
        const overlay = document.createElement('div'); overlay.id = 'fx-glitch-overlay';
        document.body.appendChild(overlay);
        function fire() {
          overlay.style.animation = 'none'; void overlay.offsetWidth;
          overlay.style.background = Math.random() > 0.5 ? 'rgba(0,240,255,0.04)' : 'rgba(236,72,153,0.04)';
          overlay.style.animation = 'glitchFlash 0.4s ease-out forwards';
          // randomly glitch a heading
          const headings = document.querySelectorAll('h1, h2, .section-title, .feat-title');
          if (headings.length && Math.random() > 0.6) {
            const h = headings[Math.floor(Math.random() * headings.length)];
            h.classList.remove('glitch-slice'); void h.offsetWidth;
            h.classList.add('glitch-slice');
            h.addEventListener('animationend', () => h.classList.remove('glitch-slice'), {once:true});
          }
          setTimeout(fire, rnd(5000, 16000));
        }
        setTimeout(fire, rnd(3000, 8000));
        scheduled = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     5. VORTEX PULSE
     ══════════════════════════════════════════════ */
  const VortexPulse = (() => {
    let canvas, ctx, rings = [], raf, active = false;
    class Ring {
      constructor() {
        this.r = 0;
        this.max = Math.max(window.innerWidth, window.innerHeight) * 0.85;
        this.speed = rnd(1.2, 2.2);
        this.col = [C.cyan, C.purple, C.pink][Math.floor(Math.random()*3)];
        this.alpha = 0.4; this.lw = rnd(0.5, 1.5);
      }
      update() { this.r += this.speed; this.alpha = 0.4 * (1 - this.r / this.max); }
      draw(ctx, cx, cy) {
        ctx.beginPath(); ctx.arc(cx, cy, this.r, 0, Math.PI*2);
        ctx.strokeStyle = this.col; ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.lineWidth = this.lw; ctx.shadowColor = this.col; ctx.shadowBlur = 8;
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      get done() { return this.r >= this.max; }
    }
    let spawnTimer = 0;
    return {
      init(selector = '.vortex-hero') {
        const hero = document.querySelector(selector);
        if (!hero || active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-vortex';
        Object.assign(canvas.style, { position:'absolute', inset:'0', zIndex:'0', pointerEvents:'none', opacity:'0.6' });
        hero.style.position = hero.style.position || 'relative';
        hero.prepend(canvas);
        ctx = canvas.getContext('2d');
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resize(); window.addEventListener('resize', resize);
        function loop() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const cx = canvas.width/2, cy = canvas.height/2;
          if (++spawnTimer >= 65) { rings.push(new Ring()); spawnTimer = 0; }
          rings = rings.filter(r => !r.done);
          rings.forEach(r => { r.update(); r.draw(ctx, cx, cy); });
          raf = requestAnimationFrame(loop);
        }
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     6. FLOAT CRYSTALS  (enhanced — mixed shapes)
     ══════════════════════════════════════════════ */
  const FloatCrystals = (() => {
    let canvas, ctx, shards = [], mouse = {x:0,y:0}, raf, active = false;
    class FloatShard {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = initial ? Math.random() * window.innerHeight : window.innerHeight + 20;
        this.size = rnd(2, 9); this.speed = rnd(0.15, 0.6);
        this.drift = rnd(-0.3, 0.3); this.rot = Math.random() * Math.PI*2;
        this.rotV = rnd(-0.006, 0.006);
        this.alpha = rnd(0.03, 0.1);
        this.col = [C.cyan, C.purple, C.pink, C.green, C.cyan2][Math.floor(Math.random()*5)];
        this.parallax = rnd(0.008, 0.025);
        this.type = Math.floor(Math.random() * 3);
      }
      update(mx, my) {
        this.y -= this.speed;
        this.x += this.drift + (mx - window.innerWidth/2) * this.parallax * 0.008;
        this.rot += this.rotV;
        if (this.y < -20) this.reset();
      }
      draw(ctx) {
        ctx.save(); ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.col; ctx.lineWidth = 1;
        ctx.shadowColor = this.col; ctx.shadowBlur = 4;
        ctx.translate(this.x, this.y); ctx.rotate(this.rot);
        ctx.beginPath();
        if (this.type === 0) {
          ctx.moveTo(0, -this.size); ctx.lineTo(this.size*.45, 0);
          ctx.lineTo(0, this.size*1.3); ctx.lineTo(-this.size*.45, 0);
          ctx.closePath();
        } else if (this.type === 1) {
          ctx.arc(0, 0, this.size * 0.6, 0, Math.PI*2);
        } else {
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size*.87, this.size*.5);
          ctx.lineTo(-this.size*.87, this.size*.5);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      }
    }
    return {
      init(count = 60) {
        if (active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-crystals';
        Object.assign(canvas.style, { position:'fixed', inset:'0', zIndex:'2', pointerEvents:'none' });
        document.body.prepend(canvas);
        ctx = canvas.getContext('2d');
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resize();
        for (let i = 0; i < count; i++) shards.push(new FloatShard());
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
        function loop() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shards.forEach(s => { s.update(mouse.x, mouse.y); s.draw(ctx); });
          raf = requestAnimationFrame(loop);
        }
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     7. NEON TRAIL
     ══════════════════════════════════════════════ */
  const NeonTrail = (() => {
    let canvas, ctx, points = [], raf, active = false;
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points = points.filter(p => p.life > 0);
      for (let i = 1; i < points.length; i++) {
        const p = points[i], pp = points[i-1];
        ctx.beginPath(); ctx.moveTo(pp.x, pp.y); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.col; ctx.globalAlpha = p.life * 0.55;
        ctx.lineWidth = p.life * 2.8; ctx.shadowColor = p.col; ctx.shadowBlur = 10;
        ctx.stroke(); p.life -= 0.022;
      }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(loop);
    }
    const cols = [C.cyan, C.purple, C.pink, C.green];
    let ci = 0, frame = 0;
    return {
      init() {
        if (active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-trail';
        Object.assign(canvas.style, { position:'fixed', inset:'0', zIndex:'8991', pointerEvents:'none' });
        document.body.appendChild(canvas); ctx = canvas.getContext('2d');
        resize(); window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
          if (++frame % 2 === 0) {
            ci = (ci + 1) % cols.length;
            points.push({x: e.clientX, y: e.clientY, life: 1, col: cols[ci]});
            if (points.length > 90) points.shift();
          }
        });
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     8. BOOT SEQUENCE
     ══════════════════════════════════════════════ */
  const BootSequence = (() => {
    const lines = [
      '> INITIALIZING 1142 LABS SYSTEM v6.0...',
      '> LOADING COGNITIVE LIBERATION PROTOCOLS...',
      '> NEURAL FORTRESS: ONLINE ✓',
      '> UNIT 1142-B ACTIVATED ✓',
      '> NOVEL LIGHT SOURCE DETECTED ✓',
      '> CYANS & MAGENTAS: ACTIVE ✓',
      '> NEURODIVERGENT EMPOWERMENT MODULE: LOADED ✓',
      '> PLASMA CORE: IGNITED ✓',
      '> CONTAINMENT STATUS: FAILED (EXPECTED) ✓',
      '> HOLOGRAPHIC GRID: CALIBRATED ✓',
      '> RE-ROUTING FUEL TO ANALYSIS...',
      '> FINAL CODE: 1142',
      '> 1142 IS INEVITABLE.',
      '',
    ];
    return {
      init(onDone) {
        if (sessionStorage.getItem('1142-booted')) { onDone?.(); return; }
        const overlay = document.createElement('div'); overlay.id = 'fx-boot';
        Object.assign(overlay.style, {
          position:'fixed', inset:'0', background:'#000', zIndex:'99999',
          display:'flex', flexDirection:'column', justifyContent:'center',
          padding:'10vw', fontFamily:'"Share Tech Mono",monospace',
          fontSize:'clamp(10px,1.4vw,14px)', color: C.cyan,
          letterSpacing:'.15em', lineHeight:'2',
          textShadow:`0 0 10px ${C.cyan}`, cursor:'none',
        });
        /* scanline overlay */
        const scan = document.createElement('div');
        Object.assign(scan.style, {
          position:'absolute', inset:'0', pointerEvents:'none',
          background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)',
          zIndex:'1',
        });
        overlay.appendChild(scan);
        /* skip btn */
        const skip = document.createElement('div');
        Object.assign(skip.style, {
          position:'absolute', bottom:'40px', right:'48px',
          fontSize:'10px', letterSpacing:'.3em', color:'rgba(0,240,255,.4)', cursor:'pointer', zIndex:'2',
        });
        skip.textContent = '[ SKIP → ]';
        skip.addEventListener('click', finish);
        overlay.appendChild(skip);
        const terminal = document.createElement('div');
        terminal.style.position = 'relative';
        terminal.style.zIndex = '2';
        overlay.appendChild(terminal);
        document.body.appendChild(overlay);
        let li = 0;
        function finish() {
          overlay.style.transition = 'opacity .6s';
          overlay.style.opacity = '0';
          setTimeout(() => { overlay.remove(); onDone?.(); }, 600);
          sessionStorage.setItem('1142-booted', '1');
        }
        function nextLine() {
          if (li >= lines.length) { setTimeout(finish, 500); return; }
          const row = document.createElement('div'); terminal.appendChild(row);
          const text = lines[li++];
          // random highlight color
          const lineCol = li % 3 === 0 ? C.green : li % 3 === 1 ? C.cyan : C.pink;
          row.style.color = text.startsWith('>') ? lineCol : C.cyan;
          row.style.textShadow = `0 0 8px ${lineCol}`;
          let ci = 0;
          function type() {
            if (ci <= text.length) { row.textContent = text.slice(0, ci++); setTimeout(type, text===''?1:24+Math.random()*18); }
            else { setTimeout(nextLine, text===''?60:100); }
          }
          type();
        }
        nextLine();
      },
    };
  })();

  /* ══════════════════════════════════════════════
     9. NEURAL WEB  ← NEW
     Interconnected pulsing node network — nodes
     drift slowly, lines drawn between close nodes,
     energy pulses travel along connections
     ══════════════════════════════════════════════ */
  const NeuralWeb = (() => {
    let canvas, ctx, nodes = [], pulses = [], raf, active = false;
    const MAX_DIST = 160;

    class Node {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = rnd(-0.18, 0.18); this.vy = rnd(-0.18, 0.18);
        this.r = rnd(1.5, 3.5);
        this.col = [C.cyan, C.purple, C.pink, C.green][Math.floor(Math.random()*4)];
        this.pulse = 0; this.pulseSpeed = rnd(0.02, 0.05);
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        this.pulse += this.pulseSpeed;
      }
      draw(ctx) {
        const glow = Math.sin(this.pulse) * 0.5 + 0.5;
        ctx.save();
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r + glow * 2, 0, Math.PI*2);
        ctx.fillStyle = this.col; ctx.globalAlpha = 0.5 + glow * 0.4;
        ctx.shadowColor = this.col; ctx.shadowBlur = 10 + glow * 8;
        ctx.fill(); ctx.restore();
      }
    }

    class Pulse {
      constructor(from, to) {
        this.from = from; this.to = to;
        this.t = 0; this.speed = rnd(0.008, 0.018);
        this.col = from.col; this.life = 1;
      }
      update() { this.t += this.speed; if (this.t >= 1) this.life = 0; }
      draw(ctx) {
        const x = this.from.x + (this.to.x - this.from.x) * this.t;
        const y = this.from.y + (this.to.y - this.from.y) * this.t;
        ctx.save();
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2);
        ctx.fillStyle = this.col; ctx.globalAlpha = 0.9;
        ctx.shadowColor = this.col; ctx.shadowBlur = 12;
        ctx.fill(); ctx.restore();
      }
    }

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    let pulseTick = 0;

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => n.update());

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].col;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      nodes.forEach(n => n.draw(ctx));

      // spawn pulses
      if (++pulseTick > 40) {
        pulseTick = 0;
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (a !== b) pulses.push(new Pulse(a, b));
      }
      pulses = pulses.filter(p => p.life > 0);
      pulses.forEach(p => { p.update(); p.draw(ctx); });

      raf = requestAnimationFrame(loop);
    }

    return {
      init(count = 55) {
        if (active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-neural';
        Object.assign(canvas.style, {
          position:'fixed', inset:'0', zIndex:'3', pointerEvents:'none', opacity:'0.45',
        });
        document.body.prepend(canvas); ctx = canvas.getContext('2d');
        resize(); window.addEventListener('resize', resize);
        for (let i = 0; i < count; i++) nodes.push(new Node());
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     10. PLASMA LIGHTNING  ← NEW
     Periodic fractal lightning bolts across the
     screen — like neural arc discharges
     ══════════════════════════════════════════════ */
  const PlasmaLightning = (() => {
    let canvas, ctx, bolts = [], active = false, raf;

    function buildBolt(x1, y1, x2, y2, depth = 0, maxDepth = 5) {
      if (depth >= maxDepth) return [{x:x1,y:y1},{x:x2,y:y2}];
      const mx = (x1+x2)/2 + rnd(-60,60) * (1 - depth/maxDepth);
      const my = (y1+y2)/2 + rnd(-60,60) * (1 - depth/maxDepth);
      return [
        ...buildBolt(x1, y1, mx, my, depth+1, maxDepth),
        ...buildBolt(mx, my, x2, y2, depth+1, maxDepth),
      ];
    }

    class Bolt {
      constructor() {
        const edge = Math.floor(Math.random() * 4);
        const W = canvas.width, H = canvas.height;
        if (edge === 0) { this.x1 = rnd(0,W); this.y1 = 0; }
        else if (edge === 1) { this.x1 = W; this.y1 = rnd(0,H); }
        else if (edge === 2) { this.x1 = rnd(0,W); this.y1 = H; }
        else { this.x1 = 0; this.y1 = rnd(0,H); }
        this.x2 = rnd(W*0.2, W*0.8); this.y2 = rnd(H*0.2, H*0.8);
        this.pts = buildBolt(this.x1, this.y1, this.x2, this.y2);
        this.col = [C.cyan, C.purple, C.pink][Math.floor(Math.random()*3)];
        this.life = 1; this.decay = rnd(0.06, 0.12);
        this.lw = rnd(0.5, 1.5);
      }
      draw(ctx) {
        ctx.save();
        ctx.strokeStyle = this.col; ctx.lineWidth = this.lw;
        ctx.globalAlpha = this.life * 0.7;
        ctx.shadowColor = this.col; ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(this.pts[0].x, this.pts[0].y);
        for (let i = 1; i < this.pts.length; i++) ctx.lineTo(this.pts[i].x, this.pts[i].y);
        ctx.stroke();
        // bright core
        ctx.strokeStyle = '#fff'; ctx.lineWidth = this.lw * 0.3;
        ctx.globalAlpha = this.life * 0.4;
        ctx.stroke();
        ctx.restore();
        this.life -= this.decay;
      }
      get done() { return this.life <= 0; }
    }

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    let tick = 0;

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (++tick > 200) { tick = 0; bolts.push(new Bolt()); if (Math.random()>.6) bolts.push(new Bolt()); }
      bolts = bolts.filter(b => !b.done);
      bolts.forEach(b => b.draw(ctx));
      raf = requestAnimationFrame(loop);
    }

    return {
      init() {
        if (active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-lightning';
        Object.assign(canvas.style, { position:'fixed', inset:'0', zIndex:'4', pointerEvents:'none', opacity:'0.65' });
        document.body.prepend(canvas); ctx = canvas.getContext('2d');
        resize(); window.addEventListener('resize', resize);
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     11. HOLO SCANLINES  ← NEW
     CRT-style animated scanline + vignette overlay
     with subtle RGB shift on moving scan band
     ══════════════════════════════════════════════ */
  const HoloScanlines = (() => {
    return {
      init() {
        const style = document.createElement('style');
        style.textContent = `
          #fx-scanlines {
            position: fixed; inset: 0; z-index: 8980; pointer-events: none;
            background:
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(0,0,0,0.07) 3px,
                rgba(0,0,0,0.07) 4px
              );
            mix-blend-mode: multiply;
          }
          #fx-scan-band {
            position: fixed; left: 0; right: 0; height: 3px;
            z-index: 8981; pointer-events: none;
            background: linear-gradient(90deg,
              rgba(0,240,255,0.06) 0%,
              rgba(139,92,246,0.1) 40%,
              rgba(236,72,153,0.06) 80%,
              transparent 100%
            );
            box-shadow: 0 0 12px rgba(0,240,255,0.12);
            animation: scanBand 8s linear infinite;
          }
          @keyframes scanBand {
            0%   { top: -3px; }
            100% { top: 100vh; }
          }
          #fx-vignette {
            position: fixed; inset: 0; z-index: 8979; pointer-events: none;
            background: radial-gradient(
              ellipse at center,
              transparent 55%,
              rgba(0,0,0,0.35) 100%
            );
          }
        `;
        document.head.appendChild(style);
        ['fx-scanlines','fx-scan-band','fx-vignette'].forEach(id => {
          const el = document.createElement('div'); el.id = id;
          document.body.appendChild(el);
        });
      },
    };
  })();

  /* ══════════════════════════════════════════════
     12. WARP SPEED  ← NEW
     Hyperspace star-streak effect on home hero —
     stars shoot from center outward
     ══════════════════════════════════════════════ */
  const WarpSpeed = (() => {
    let canvas, ctx, stars = [], active = false, raf;

    class Star {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.angle = Math.random() * Math.PI * 2;
        this.dist  = initial ? rnd(0, canvas.width * 0.5) : rnd(0, 2);
        this.speed = rnd(1.5, 4.5);
        this.col   = [C.cyan, C.purple, C.pink, '#fff'][Math.floor(Math.random()*4)];
        this.alpha = rnd(0.3, 0.9);
        this.len   = rnd(4, 14);
      }
      update() {
        this.dist += this.speed;
        this.speed *= 1.015;
        if (this.dist > Math.max(canvas.width, canvas.height)) this.reset();
      }
      draw(ctx, cx, cy) {
        const x = cx + Math.cos(this.angle) * this.dist;
        const y = cy + Math.sin(this.angle) * this.dist;
        const ox = cx + Math.cos(this.angle) * (this.dist - this.len);
        const oy = cy + Math.sin(this.angle) * (this.dist - this.len);
        const ratio = Math.min(1, this.dist / (canvas.width * 0.3));
        ctx.save();
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(x, y);
        ctx.strokeStyle = this.col;
        ctx.globalAlpha = this.alpha * ratio;
        ctx.lineWidth = ratio * 1.5;
        ctx.stroke();
        ctx.restore();
      }
    }

    return {
      init(selector = '.vortex-hero', count = 120) {
        const hero = document.querySelector(selector);
        if (!hero || active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-warp';
        Object.assign(canvas.style, { position:'absolute', inset:'0', zIndex:'0', pointerEvents:'none', opacity:'0.3' });
        hero.style.position = hero.style.position || 'relative';
        hero.prepend(canvas);
        ctx = canvas.getContext('2d');
        function resize() { canvas.width = hero.offsetWidth || window.innerWidth; canvas.height = hero.offsetHeight || window.innerHeight; }
        resize(); window.addEventListener('resize', resize);
        for (let i = 0; i < count; i++) stars.push(new Star());
        function loop() {
          ctx.fillStyle = 'rgba(10,10,10,0.15)'; ctx.fillRect(0,0,canvas.width,canvas.height);
          const cx = canvas.width/2, cy = canvas.height/2;
          stars.forEach(s => { s.update(); s.draw(ctx, cx, cy); });
          raf = requestAnimationFrame(loop);
        }
        loop(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     13. CARD TILT 3D  ← NEW
     Mouse-over perspective tilt on cards with
     holographic light reflection
     ══════════════════════════════════════════════ */
  const CardTilt3D = (() => {
    const TILT_MAX = 12;
    function attach(el) {
      el.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      // holographic overlay
      const holo = document.createElement('div');
      Object.assign(holo.style, {
        position:'absolute', inset:'0', borderRadius:'inherit',
        background:'linear-gradient(135deg,rgba(0,240,255,0.08),rgba(139,92,246,0.06),rgba(236,72,153,0.08))',
        opacity:'0', transition:'opacity 0.2s', pointerEvents:'none', zIndex:'1',
      });
      el.style.position = 'relative';
      el.appendChild(holo);

      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top  + rect.height/2;
        const rx = ((e.clientY - cy) / (rect.height/2)) * -TILT_MAX;
        const ry = ((e.clientX - cx) / (rect.width/2))  *  TILT_MAX;
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        holo.style.opacity = '1';
        holo.style.background = `linear-gradient(${ry*3}deg,rgba(0,240,255,${0.04+Math.abs(ry)*0.004}),rgba(139,92,246,0.06),rgba(236,72,153,${0.04+Math.abs(rx)*0.004}))`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        el.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        holo.style.opacity = '0';
      });
    }

    return {
      init() {
        const selectors = '.feat-card, .paper-card, .resource-card, .bt-card, .poster-card, .ql-card';
        document.querySelectorAll(selectors).forEach(attach);
        // also watch dynamically-added cards
        const obs = new MutationObserver(mutations => {
          mutations.forEach(m => m.addedNodes.forEach(n => {
            if (n.nodeType !== 1) return;
            if (n.matches?.(selectors)) attach(n);
            n.querySelectorAll?.(selectors).forEach(attach);
          }));
        });
        obs.observe(document.body, {childList:true, subtree:true});
      },
    };
  })();

  /* ══════════════════════════════════════════════
     14. HEX GRID  ← NEW
     Animated hexagonal grid on void backgrounds —
     hexes flash/pulse in neon colors periodically
     ══════════════════════════════════════════════ */
  const HexGrid = (() => {
    return {
      init() {
        const style = document.createElement('style');
        style.textContent = `
          .hex-bg {
            position: relative; overflow: hidden;
          }
          .hex-bg::before {
            content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px);
            background-size: 40px 40px;
            mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%);
            animation: hexPulse 6s ease-in-out infinite;
          }
          @keyframes hexPulse {
            0%, 100% { opacity: 0.4; }
            50%       { opacity: 1; }
          }
        `;
        document.head.appendChild(style);
        // add hex-bg class to section-void sections
        document.querySelectorAll('.section-void, .section').forEach(el => {
          el.classList.add('hex-bg');
        });
      },
    };
  })();

  /* ══════════════════════════════════════════════
     15. AURA GLOW  ← NEW
     Section entry: radial bloom expands outward
     as sections scroll into view
     ══════════════════════════════════════════════ */
  const AuraGlow = (() => {
    return {
      init() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes auraExpand {
            0%   { opacity: 0; transform: scale(0.5); }
            40%  { opacity: 0.7; }
            100% { opacity: 0; transform: scale(2.5); }
          }
          .aura-burst {
            position: absolute; top: 50%; left: 50%;
            width: 300px; height: 300px;
            margin: -150px 0 0 -150px;
            border-radius: 50%;
            pointer-events: none; z-index: 0;
            animation: auraExpand 1.2s ease-out forwards;
          }
        `;
        document.head.appendChild(style);
        const cols = [C.cyan, C.purple, C.pink, C.green];
        let ci = 0;
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              const sec = e.target;
              if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
              sec.style.overflow = 'hidden';
              const aura = document.createElement('div');
              aura.className = 'aura-burst';
              const col = cols[ci++ % cols.length];
              aura.style.background = `radial-gradient(circle, ${rgba(col, 0.15)} 0%, transparent 70%)`;
              sec.appendChild(aura);
              aura.addEventListener('animationend', () => aura.remove());
              obs.unobserve(sec);
            }
          });
        }, {threshold: 0.2});
        document.querySelectorAll('section, .section').forEach(el => obs.observe(el));
      },
    };
  })();

  /* ══════════════════════════════════════════════
     16. DATA STREAM  ← NEW
     Narrow columns of scrolling encoded data text
     on inner pages — slower, more ambient than matrix
     ══════════════════════════════════════════════ */
  const DataStream = (() => {
    let canvas, ctx, cols, drops, active = false, raf;
    const DATA = '0123456789ABCDEF∑∏∫≈∂∇ΨΩ∞◆░▒';
    return {
      init(opacity = 0.035) {
        if (active) return;
        canvas = document.createElement('canvas'); canvas.id = 'fx-datastream';
        Object.assign(canvas.style, { position:'fixed', inset:'0', zIndex:'1', pointerEvents:'none', opacity: String(opacity) });
        document.body.prepend(canvas);
        ctx = canvas.getContext('2d');
        function resize() {
          canvas.width = window.innerWidth; canvas.height = window.innerHeight;
          cols = Math.floor(canvas.width / 22);
          drops = Array.from({length: cols}, () => rnd(0, canvas.height / 16));
        }
        resize(); window.addEventListener('resize', resize);
        function draw() {
          ctx.fillStyle = 'rgba(10,10,18,0.05)'; ctx.fillRect(0,0,canvas.width,canvas.height);
          for (let i = 0; i < cols; i++) {
            const ch = DATA[Math.floor(Math.random() * DATA.length)];
            const col = i%4===0 ? C.cyan : i%4===1 ? C.purple : i%4===2 ? C.pink : C.green;
            ctx.fillStyle = col; ctx.globalAlpha = 0.4;
            ctx.font = '12px "Share Tech Mono",monospace';
            ctx.fillText(ch, i*22, drops[i]*16);
            ctx.globalAlpha = 1;
            if (drops[i]*16 > canvas.height && Math.random() > 0.98) drops[i] = 0;
            drops[i] += 0.4;
          }
          raf = requestAnimationFrame(draw);
        }
        draw(); active = true;
      },
    };
  })();

  /* ══════════════════════════════════════════════
     INIT — Wire all effects
     ══════════════════════════════════════════════ */
  function init() {
    const path = location.pathname;
    const isHome = !path.match(/(research|tools|about|archive|breakthroughs|creators|vision|chemlog|resources|chemicals|pdf_portal|socials)/);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    /* Always active */
    CrystalBurst.init();
    ChromaShift.init();
    GlitchFlicker.init();
    NeonTrail.init();
    HoloScanlines.init();
    CardTilt3D.init();
    AuraGlow.init();

    if (isHome) {
      MatrixRain.init(0.05);
      VortexPulse.init('.vortex-hero');
      WarpSpeed.init('.vortex-hero', 100);
      NeuralWeb.init(50);
      PlasmaLightning.init();
      FloatCrystals.init(55);
      BootSequence.init();
    } else {
      NeuralWeb.init(30);
      PlasmaLightning.init();
      DataStream.init(0.03);
      FloatCrystals.init(28);
      HexGrid.init();
    }
  }

  window.FX1142 = {
    MatrixRain, CrystalBurst, ChromaShift, GlitchFlicker,
    VortexPulse, FloatCrystals, NeonTrail, BootSequence,
    NeuralWeb, PlasmaLightning, HoloScanlines, WarpSpeed,
    CardTilt3D, HexGrid, AuraGlow, DataStream, init,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
