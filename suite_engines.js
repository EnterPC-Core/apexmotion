// ========================================================
// APEXMOTION // SUITE ENGINES: GENERATORS, WORKSPACE, AI, COMMAND PALETTE, PERF HUD
// ========================================================

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. TOAST NOTIFICATIONS ENGINE
     -------------------------------------------------------- */
  window.ApexToast = {
    show(message, type = 'info', iconName = 'sparkles') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast-item';

      let colorClass = 'text-brand-cyan';
      if (type === 'success') colorClass = 'text-emerald-400';
      if (type === 'error') colorClass = 'text-rose-400';
      if (type === 'warning') colorClass = 'text-amber-400';

      toast.innerHTML = `
        <div class="${colorClass} flex-shrink-0">
          <i data-lucide="${iconName}" class="w-4 h-4"></i>
        </div>
        <div class="flex-1">${message}</div>
      `;

      container.appendChild(toast);
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        toast.classList.add('toast-leave');
        setTimeout(() => toast.remove(), 250);
      }, 2600);
    }
  };

  /* --------------------------------------------------------
     2. MOTION GENERATORS SUITE
     -------------------------------------------------------- */
  function setupMotionGenerators() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.gen-tab-btn');
    const panels = {
      css: document.getElementById('gen-panel-css'),
      bezier: document.getElementById('gen-panel-bezier'),
      particles: document.getElementById('gen-panel-particles'),
      shader: document.getElementById('gen-panel-shader')
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.ApexSoundFX) ApexSoundFX.click();
        const gen = btn.dataset.gen;

        tabBtns.forEach(b => {
          b.className = 'gen-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all glass-panel text-gray-300 hover:text-white border border-white/10 flex items-center gap-2';
        });
        btn.className = 'gen-tab-btn active px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all bg-brand-cyan text-black border border-brand-cyan shadow-lg shadow-brand-cyan/20 flex items-center gap-2';

        Object.keys(panels).forEach(key => {
          if (panels[key]) {
            if (key === gen) {
              panels[key].classList.remove('hidden');
            } else {
              panels[key].classList.add('hidden');
            }
          }
        });
      });
    });

    // 2.1 CSS Keyframes Generator
    const cssTarget = document.getElementById('cssgen-target');
    const cssType = document.getElementById('cssgen-type');
    const cssDuration = document.getElementById('cssgen-duration');
    const cssDurVal = document.getElementById('cssgen-dur-val');
    const cssTiming = document.getElementById('cssgen-timing');
    const cssIteration = document.getElementById('cssgen-iteration');
    const cssDirection = document.getElementById('cssgen-direction');
    const cssCodeOutput = document.getElementById('cssgen-code-output');
    const cssCopyBtn = document.getElementById('cssgen-copy-btn');

    let dynamicStyleTag = document.getElementById('apex-dynamic-cssgen-style');
    if (!dynamicStyleTag) {
      dynamicStyleTag = document.createElement('style');
      dynamicStyleTag.id = 'apex-dynamic-cssgen-style';
      document.head.appendChild(dynamicStyleTag);
    }

    const keyframeDefs = {
      'pulse-glow': `@keyframes apexCustomAnim {
  0% { transform: scale(0.92); box-shadow: 0 0 0 rgba(0, 245, 212, 0); }
  50% { transform: scale(1.12); box-shadow: 0 0 35px rgba(0, 245, 212, 0.7); }
  100% { transform: scale(0.92); box-shadow: 0 0 0 rgba(0, 245, 212, 0); }
}`,
      'float-3d': `@keyframes apexCustomAnim {
  0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  50% { transform: translateY(-22px) rotateX(15deg) rotateY(20deg); }
  100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
}`,
      'shimmer-sweep': `@keyframes apexCustomAnim {
  0% { transform: rotate(0deg) scale(1); filter: brightness(1) hue-rotate(0deg); }
  50% { transform: rotate(8deg) scale(1.08); filter: brightness(1.6) hue-rotate(90deg); }
  100% { transform: rotate(0deg) scale(1); filter: brightness(1) hue-rotate(0deg); }
}`,
      'rubber-bounce': `@keyframes apexCustomAnim {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.25, 0.75); }
  40% { transform: scale(0.75, 1.25); }
  50% { transform: scale(1.15, 0.85); }
  65% { transform: scale(0.95, 1.05); }
  75% { transform: scale(1.05, 0.95); }
  100% { transform: scale(1, 1); }
}`,
      'spin-orbit': `@keyframes apexCustomAnim {
  0% { transform: rotate(0deg) translateY(0px) scale(0.85); }
  50% { transform: rotate(180deg) translateY(-14px) scale(1.1); }
  100% { transform: rotate(360deg) translateY(0px) scale(0.85); }
}`
    };

    function updateCssGenerator() {
      if (!cssType || !cssDuration || !cssTarget) return;
      const type = cssType.value;
      const dur = cssDuration.value + 's';
      if (cssDurVal) cssDurVal.textContent = dur;
      const timing = cssTiming.value;
      const iter = cssIteration.value;
      const dir = cssDirection.value;

      const kf = keyframeDefs[type] || keyframeDefs['pulse-glow'];
      const cssRules = `${kf}

.apex-animated-element {
  animation: apexCustomAnim ${dur} ${timing} 0s ${iter} ${dir};
  transform-origin: center center;
  will-change: transform, box-shadow;
}`;

      dynamicStyleTag.textContent = cssRules;
      cssTarget.style.animation = `apexCustomAnim ${dur} ${timing} 0s ${iter} ${dir}`;
      if (cssCodeOutput) cssCodeOutput.textContent = cssRules;
    }

    [cssType, cssDuration, cssTiming, cssIteration, cssDirection].forEach(el => {
      if (el) el.addEventListener('input', updateCssGenerator);
    });

    if (cssCopyBtn) {
      cssCopyBtn.addEventListener('click', () => {
        if (cssCodeOutput) {
          navigator.clipboard.writeText(cssCodeOutput.textContent).then(() => {
            ApexToast.show('CSS-анимация скопирована в буфер обмена!', 'success', 'check');
            if (window.ApexSoundFX) ApexSoundFX.click();
          });
        }
      });
    }

    updateCssGenerator();

    // 2.2 Cubic Bezier Editor
    const bCanvas = document.getElementById('bezier-canvas');
    const p1Label = document.getElementById('bezier-p1-label');
    const p2Label = document.getElementById('bezier-p2-label');
    const bCopyBtn = document.getElementById('bezier-copy-btn');
    const bTestRun = document.getElementById('bezier-test-run');
    const bCustomRunner = document.getElementById('bezier-runner-custom');
    const bLinearRunner = document.getElementById('bezier-runner-linear');

    let p1 = { x: 0.25, y: 0.1 };
    let p2 = { x: 0.25, y: 1.0 };
    let draggingPoint = null;

    if (bCanvas) {
      const bCtx = bCanvas.getContext('2d');
      const padding = 45;

      function toScreen(nx, ny) {
        const w = bCanvas.width - padding * 2;
        const h = bCanvas.height - padding * 2;
        return {
          x: padding + nx * w,
          y: bCanvas.height - padding - ny * h
        };
      }

      function toNorm(sx, sy) {
        const w = bCanvas.width - padding * 2;
        const h = bCanvas.height - padding * 2;
        const nx = Math.max(0, Math.min(1, (sx - padding) / w));
        const ny = (bCanvas.height - padding - sy) / h;
        return { x: parseFloat(nx.toFixed(2)), y: parseFloat(ny.toFixed(2)) };
      }

      function drawBezier() {
        bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);

        // Grid lines & bounding box
        bCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        bCtx.lineWidth = 1;
        const w = bCanvas.width - padding * 2;
        const h = bCanvas.height - padding * 2;
        bCtx.strokeRect(padding, padding, w, h);

        // Diagonal reference
        bCtx.beginPath();
        bCtx.setLineDash([4, 4]);
        bCtx.moveTo(padding, bCanvas.height - padding);
        bCtx.lineTo(bCanvas.width - padding, padding);
        bCtx.stroke();
        bCtx.setLineDash([]);

        const start = toScreen(0, 0);
        const end = toScreen(1, 1);
        const sP1 = toScreen(p1.x, p1.y);
        const sP2 = toScreen(p2.x, p2.y);

        // Handle lines
        bCtx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
        bCtx.beginPath();
        bCtx.moveTo(start.x, start.y);
        bCtx.lineTo(sP1.x, sP1.y);
        bCtx.stroke();

        bCtx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
        bCtx.beginPath();
        bCtx.moveTo(end.x, end.y);
        bCtx.lineTo(sP2.x, sP2.y);
        bCtx.stroke();

        // Bezier curve
        bCtx.strokeStyle = '#ffffff';
        bCtx.lineWidth = 3;
        bCtx.beginPath();
        bCtx.moveTo(start.x, start.y);
        bCtx.bezierCurveTo(sP1.x, sP1.y, sP2.x, sP2.y, end.x, end.y);
        bCtx.stroke();

        // Control point P1
        bCtx.fillStyle = '#00f5d4';
        bCtx.beginPath();
        bCtx.arc(sP1.x, sP1.y, 8, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.strokeStyle = '#ffffff';
        bCtx.lineWidth = 2;
        bCtx.stroke();

        // Control point P2
        bCtx.fillStyle = '#f43f5e';
        bCtx.beginPath();
        bCtx.arc(sP2.x, sP2.y, 8, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.strokeStyle = '#ffffff';
        bCtx.lineWidth = 2;
        bCtx.stroke();

        if (p1Label) p1Label.textContent = `${p1.x}, ${p1.y}`;
        if (p2Label) p2Label.textContent = `${p2.x}, ${p2.y}`;
      }

      function getDist(x1, y1, x2, y2) {
        return Math.hypot(x1 - x2, y1 - y2);
      }

      function getCanvasMouse(e) {
        const rect = bCanvas.getBoundingClientRect();
        const scaleX = bCanvas.width / rect.width;
        const scaleY = bCanvas.height / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
      }

      bCanvas.addEventListener('mousedown', (e) => {
        const pos = getCanvasMouse(e);
        const sP1 = toScreen(p1.x, p1.y);
        const sP2 = toScreen(p2.x, p2.y);

        if (getDist(pos.x, pos.y, sP1.x, sP1.y) < 16) {
          draggingPoint = 'p1';
        } else if (getDist(pos.x, pos.y, sP2.x, sP2.y) < 16) {
          draggingPoint = 'p2';
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (!draggingPoint) return;
        const pos = getCanvasMouse(e);
        const norm = toNorm(pos.x, pos.y);
        if (draggingPoint === 'p1') {
          p1 = norm;
        } else if (draggingPoint === 'p2') {
          p2 = norm;
        }
        drawBezier();
      });

      window.addEventListener('mouseup', () => {
        draggingPoint = null;
      });

      drawBezier();

      // Bezier presets
      document.querySelectorAll('.bezier-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.ApexSoundFX) ApexSoundFX.click();
          const parts = btn.dataset.curve.split(',').map(s => parseFloat(s.trim()));
          p1 = { x: parts[0], y: parts[1] };
          p2 = { x: parts[2], y: parts[3] };
          drawBezier();
          ApexToast.show(`Применён пресет: ${btn.textContent}`, 'info', 'spline');
        });
      });

      // Bezier copy button
      if (bCopyBtn) {
        bCopyBtn.addEventListener('click', () => {
          const str = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`;
          navigator.clipboard.writeText(str).then(() => {
            ApexToast.show(`Скопировано: ${str}`, 'success', 'check');
            if (window.ApexSoundFX) ApexSoundFX.click();
          });
        });
      }

      // Test run animation
      if (bTestRun && bCustomRunner && bLinearRunner) {
        bTestRun.addEventListener('click', () => {
          if (window.ApexSoundFX) ApexSoundFX.click();
          const bezierTiming = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`;

          bCustomRunner.style.transition = 'none';
          bLinearRunner.style.transition = 'none';
          bCustomRunner.style.transform = 'translateX(0px)';
          bLinearRunner.style.transform = 'translateX(0px)';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const maxDist = bCustomRunner.parentElement.clientWidth - 70;
              bCustomRunner.style.transition = `transform 1.4s ${bezierTiming}`;
              bLinearRunner.style.transition = `transform 1.4s linear`;
              bCustomRunner.style.transform = `translateX(${maxDist}px)`;
              bLinearRunner.style.transform = `translateX(${maxDist}px)`;
            });
          });
        });
      }
    }

    // 2.3 Particle FX Studio
    const pCanvas = document.getElementById('pgen-canvas');
    const pCountSlider = document.getElementById('pgen-count');
    const pCountVal = document.getElementById('pgen-count-val');
    const pGravitySlider = document.getElementById('pgen-gravity');
    const pGravityVal = document.getElementById('pgen-gravity-val');
    const pSpeedSlider = document.getElementById('pgen-speed');
    const pSpeedVal = document.getElementById('pgen-speed-val');
    const pSizeSlider = document.getElementById('pgen-size');
    const pSizeVal = document.getElementById('pgen-size-val');
    const pPalette = document.getElementById('pgen-palette');
    const pBurstBtn = document.getElementById('pgen-burst-btn');
    const pExportBtn = document.getElementById('pgen-export-btn');

    if (pCanvas) {
      const pCtx = pCanvas.getContext('2d');
      let pWidth = (pCanvas.width = pCanvas.parentElement.clientWidth || 600);
      let pHeight = (pCanvas.height = pCanvas.parentElement.clientHeight || 384);

      window.addEventListener('resize', () => {
        if (pCanvas.parentElement) {
          pWidth = pCanvas.width = pCanvas.parentElement.clientWidth || 600;
          pHeight = pCanvas.height = pCanvas.parentElement.clientHeight || 384;
        }
      });

      let particles = [];
      const palettes = {
        'cyan-blue': ['#00f5d4', '#3b82f6', '#8b5cf6', '#38bdf8'],
        'neon-fire': ['#f43f5e', '#f59e0b', '#fb923c', '#ff0055'],
        'matrix-emerald': ['#10b981', '#34d399', '#059669', '#6ee7b7'],
        'rainbow-glow': ['#00f5d4', '#f43f5e', '#f59e0b', '#3b82f6', '#a855f7']
      };

      function spawnParticle(x, y) {
        const speedFactor = pSpeedSlider ? parseFloat(pSpeedSlider.value) : 3.0;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * speedFactor + 1;
        const colors = palettes[pPalette ? pPalette.value : 'cyan-blue'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseSize = pSizeSlider ? parseFloat(pSizeSlider.value) : 3.0;

        return {
          x: x !== undefined ? x : Math.random() * pWidth,
          y: y !== undefined ? y : Math.random() * pHeight,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * baseSize + 1,
          color: color,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.005
        };
      }

      function initParticles() {
        const count = pCountSlider ? parseInt(pCountSlider.value) : 120;
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(spawnParticle());
        }
      }

      function createBurst(x, y) {
        const count = 40;
        for (let i = 0; i < count; i++) {
          particles.push(spawnParticle(x, y));
        }
        if (particles.length > 350) particles.splice(0, 50);
      }

      pCanvas.addEventListener('click', (e) => {
        const rect = pCanvas.getBoundingClientRect();
        createBurst(e.clientX - rect.left, e.clientY - rect.top);
        if (window.ApexSoundFX) ApexSoundFX.hover();
      });

      if (pBurstBtn) {
        pBurstBtn.addEventListener('click', () => {
          createBurst(pWidth / 2, pHeight / 2);
          if (window.ApexSoundFX) ApexSoundFX.blast();
        });
      }

      if (pExportBtn) {
        pExportBtn.addEventListener('click', () => {
          const jsSnippet = `// ApexMotion Particle System Export
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const gravity = ${pGravitySlider ? pGravitySlider.value : 0.05};
const speed = ${pSpeedSlider ? pSpeedSlider.value : 3.0};
const colors = ${JSON.stringify(palettes[pPalette ? pPalette.value : 'cyan-blue'])};

function loop() {
  ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.vy += gravity;
    p.x += p.vx;
    p.y += p.vy;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  requestAnimationFrame(loop);
}
loop();`;
          navigator.clipboard.writeText(jsSnippet).then(() => {
            ApexToast.show('JS код генератора частиц скопирован!', 'success', 'download');
          });
        });
      }

      [pCountSlider, pGravitySlider, pSpeedSlider, pSizeSlider].forEach(slider => {
        if (!slider) return;
        slider.addEventListener('input', () => {
          if (pCountVal && slider === pCountSlider) pCountVal.textContent = slider.value;
          if (pGravityVal && slider === pGravitySlider) pGravityVal.textContent = slider.value;
          if (pSpeedVal && slider === pSpeedSlider) pSpeedVal.textContent = slider.value;
          if (pSizeVal && slider === pSizeSlider) pSizeVal.textContent = slider.value + 'px';
          if (slider === pCountSlider) initParticles();
        });
      });

      function renderParticles() {
        pCtx.fillStyle = 'rgba(5, 5, 8, 0.25)';
        pCtx.fillRect(0, 0, pWidth, pHeight);

        const grav = pGravitySlider ? parseFloat(pGravitySlider.value) : 0.05;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.vy += grav;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > pWidth) p.vx *= -0.8;
          if (p.y < 0 || p.y > pHeight) p.vy *= -0.8;

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          pCtx.fillStyle = p.color;
          pCtx.shadowBlur = 10;
          pCtx.shadowColor = p.color;
          pCtx.fill();
          pCtx.shadowBlur = 0;
        }

        requestAnimationFrame(renderParticles);
      }

      initParticles();
      renderParticles();
    }

    // 2.4 GLSL Fragment Shader Playground
    const glslCanvas = document.getElementById('glsl-canvas');
    const shaderSelect = document.getElementById('shader-preset-select');
    const shaderEditor = document.getElementById('shader-code-editor');
    const shaderCompileBtn = document.getElementById('shader-compile-btn');
    const shaderCopyBtn = document.getElementById('shader-copy-btn');
    const shaderStatus = document.getElementById('shader-status-badge');

    const shaderPresets = {
      plasma: `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  float d = length(uv);
  float c = sin(uv.x * 6.0 + u_time * 2.0) + cos(uv.y * 6.0 - u_time * 2.0);
  c += sin(d * 8.0 - u_time * 3.0);
  vec3 col = vec3(0.5 + 0.5 * sin(c + vec3(0.0, 2.0, 4.0)));
  col *= (1.0 - d * 0.4);
  gl_FragColor = vec4(col, 1.0);
}`,
      'sdf-ring': `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  float d = length(uv);
  float ring = abs(sin(d * 12.0 - u_time * 3.5));
  float glow = 0.04 / (ring + 0.01);
  vec3 col = vec3(0.0, 0.96, 0.83) * glow + vec3(0.95, 0.24, 0.37) * (1.0 - d);
  gl_FragColor = vec4(col, 1.0);
}`,
      tunnel: `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  vec2 p = vec2(0.3 / r + u_time * 0.6, a / 3.14159);
  float pattern = sin(p.x * 20.0) * sin(p.y * 10.0);
  vec3 col = vec3(0.2, 0.5, 1.0) * pattern / r;
  gl_FragColor = vec4(col, 1.0);
}`,
      gyroid: `precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
  vec3 p = vec3(uv * 3.0, u_time * 0.5);
  float g = abs(dot(sin(p), cos(p.zxy))) - 0.2;
  vec3 col = vec3(0.1, 0.8, 0.9) * (0.05 / (g + 0.05));
  gl_FragColor = vec4(col, 1.0);
}`
    };

    if (glslCanvas) {
      const gl = glslCanvas.getContext('webgl') || glslCanvas.getContext('experimental-webgl');
      let currentProgram = null;
      let startTime = performance.now();

      if (gl) {
        const vsSource = `
          attribute vec2 position;
          void main() {
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        function compileShader(src, type) {
          const s = gl.createShader(type);
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            const err = gl.getShaderInfoLog(s);
            gl.deleteShader(s);
            throw new Error(err);
          }
          return s;
        }

        function createGLSLProgram(fsSource) {
          const vs = compileShader(vsSource, gl.VERTEX_SHADER);
          const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
          const prog = gl.createProgram();
          gl.attachShader(prog, vs);
          gl.attachShader(prog, fs);
          gl.linkProgram(prog);
          if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(prog));
          }
          return prog;
        }

        // Screen quad buffer
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1
        ]), gl.STATIC_DRAW);

        function updateShader(source) {
          try {
            const newProg = createGLSLProgram(source);
            if (currentProgram) gl.deleteProgram(currentProgram);
            currentProgram = newProg;
            if (shaderStatus) {
              shaderStatus.className = 'absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-black/75 px-2.5 py-1 rounded-md border border-emerald-500/30';
              shaderStatus.textContent = 'Shader Compiled (Active)';
            }
          } catch (err) {
            if (shaderStatus) {
              shaderStatus.className = 'absolute top-3 right-3 text-[10px] font-mono text-rose-400 bg-black/75 px-2.5 py-1 rounded-md border border-rose-500/30';
              shaderStatus.textContent = 'Ошибка GLSL компиляции';
            }
          }
        }

        if (shaderSelect && shaderEditor) {
          shaderEditor.value = shaderPresets[shaderSelect.value] || shaderPresets.plasma;
          updateShader(shaderEditor.value);

          shaderSelect.addEventListener('change', () => {
            const s = shaderPresets[shaderSelect.value];
            if (s) {
              shaderEditor.value = s;
              updateShader(s);
              if (window.ApexSoundFX) ApexSoundFX.click();
            }
          });
        }

        if (shaderCompileBtn && shaderEditor) {
          shaderCompileBtn.addEventListener('click', () => {
            updateShader(shaderEditor.value);
            if (window.ApexSoundFX) ApexSoundFX.click();
            ApexToast.show('Фрагментный шейдер перекомпилирован!', 'success', 'play');
          });
        }

        if (shaderCopyBtn && shaderEditor) {
          shaderCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shaderEditor.value).then(() => {
              ApexToast.show('Код шейдера скопирован!', 'info', 'copy');
            });
          });
        }

        function renderGLSL() {
          glslCanvas.width = glslCanvas.parentElement.clientWidth || 600;
          glslCanvas.height = glslCanvas.parentElement.clientHeight || 384;
          gl.viewport(0, 0, glslCanvas.width, glslCanvas.height);

          if (currentProgram) {
            gl.useProgram(currentProgram);

            const posAttr = gl.getAttribLocation(currentProgram, 'position');
            gl.enableVertexAttribArray(posAttr);
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

            const resLoc = gl.getUniformLocation(currentProgram, 'u_resolution');
            const timeLoc = gl.getUniformLocation(currentProgram, 'u_time');

            if (resLoc) gl.uniform2f(resLoc, glslCanvas.width, glslCanvas.height);
            if (timeLoc) gl.uniform1f(timeLoc, (performance.now() - startTime) * 0.001);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
          }
          requestAnimationFrame(renderGLSL);
        }
        renderGLSL();
      }
    }
  }

  /* --------------------------------------------------------
     3. USER WORKSPACE (FAVORITES, HISTORY, JSON EXPORT/IMPORT)
     -------------------------------------------------------- */
  function setupUserWorkspace() {
    const favGrid = document.getElementById('ws-favorites-grid');
    const favEmpty = document.getElementById('ws-favorites-empty');
    const favBadge = document.getElementById('ws-favs-count-badge');
    const statFavs = document.getElementById('ws-stat-favs');
    const statHistory = document.getElementById('ws-stat-history');
    const statStorage = document.getElementById('ws-stat-storage');
    const exportBtn = document.getElementById('ws-export-json-btn');
    const importFile = document.getElementById('ws-import-json-file');
    const clearAllBtn = document.getElementById('ws-clear-all-btn');
    const historyList = document.getElementById('ws-history-list');
    const clearHistoryBtn = document.getElementById('ws-clear-history-btn');

    function getStorageSize() {
      let total = 0;
      for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          total += (localStorage[x].length * 2);
        }
      }
      return (total / 1024).toFixed(1) + ' KB';
    }

    function getHistory() {
      try {
        const h = localStorage.getItem('apex_history');
        return h ? JSON.parse(h) : [];
      } catch (e) {
        return [];
      }
    }

    window.addApexHistory = function (item) {
      if (!item || !item.id) return;
      let h = getHistory();
      h = h.filter(x => x.id !== item.id);
      h.unshift({ id: item.id, title: item.title, category: item.category, time: Date.now() });
      if (h.length > 20) h.pop();
      try {
        localStorage.setItem('apex_history', JSON.stringify(h));
      } catch (e) {}
      renderWorkspace();
    };

    function renderWorkspace() {
      const data = window.TECHNOLOGIES_1000 || [];
      const favIds = (function () {
        try {
          const s = localStorage.getItem('apex_favorites');
          return s ? JSON.parse(s) : [];
        } catch (e) {
          return [];
        }
      })();

      const favItems = data.filter(item => favIds.includes(item.id));

      if (statFavs) statFavs.textContent = favItems.length;
      if (favBadge) favBadge.textContent = `${favItems.length} сохранено`;
      if (statStorage) statStorage.textContent = getStorageSize();

      if (favGrid && favEmpty) {
        if (favItems.length === 0) {
          favEmpty.classList.remove('hidden');
          favGrid.innerHTML = '';
        } else {
          favEmpty.classList.add('hidden');
          favGrid.innerHTML = favItems.slice(0, 12).map(item => `
            <div class="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between hover:border-brand-cyan/40 transition-all">
              <div class="truncate mr-3">
                <span class="text-[10px] font-mono text-brand-cyan uppercase">${item.category}</span>
                <div class="text-xs font-bold text-white truncate">${item.title}</div>
              </div>
              <a href="#effect/${item.id}" class="px-3 py-1.5 rounded-lg bg-brand-cyan/20 text-brand-cyan text-xs font-mono border border-brand-cyan hover:bg-brand-cyan hover:text-black transition-all flex items-center gap-1">
                <span>Открыть</span>
              </a>
            </div>
          `).join('');
        }
      }

      // History
      const history = getHistory();
      if (statHistory) statHistory.textContent = history.length;
      if (historyList) {
        if (history.length === 0) {
          historyList.innerHTML = '<span class="text-gray-500 text-xs font-mono py-2">История пуста. Откройте любой алгоритм в каталоге!</span>';
        } else {
          historyList.innerHTML = history.slice(0, 10).map(h => `
            <a href="#effect/${h.id}" class="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              <span>${h.title}</span>
            </a>
          `).join('');
        }
      }
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const payload = {
          version: '5.0',
          exportedAt: new Date().toISOString(),
          favorites: JSON.parse(localStorage.getItem('apex_favorites') || '[]'),
          history: JSON.parse(localStorage.getItem('apex_history') || '[]'),
          theme: localStorage.getItem('apex_theme') || 'luxury'
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `apexmotion-workspace-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        ApexToast.show('Workspace JSON успешно экспортирован!', 'success', 'download');
      });
    }

    if (importFile) {
      importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.favorites && Array.isArray(data.favorites)) {
              localStorage.setItem('apex_favorites', JSON.stringify(data.favorites));
            }
            if (data.history && Array.isArray(data.history)) {
              localStorage.setItem('apex_history', JSON.stringify(data.history));
            }
            if (data.theme) {
              localStorage.setItem('apex_theme', data.theme);
              document.body.setAttribute('data-theme', data.theme);
            }
            renderWorkspace();
            ApexToast.show('Коллекции и настройки успешно импортированы!', 'success', 'upload');
          } catch (err) {
            ApexToast.show('Ошибка формата JSON файла', 'error', 'alert-triangle');
          }
        };
        reader.readAsText(file);
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('Очистить все сохранённые эффекты и историю в localStorage?')) {
          localStorage.removeItem('apex_favorites');
          localStorage.removeItem('apex_history');
          renderWorkspace();
          ApexToast.show('Все данные очищены', 'warning', 'trash-2');
        }
      });
    }

    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        localStorage.removeItem('apex_history');
        renderWorkspace();
        ApexToast.show('История очищена', 'info', 'history');
      });
    }

    window.refreshApexWorkspace = renderWorkspace;
    renderWorkspace();
  }

  /* --------------------------------------------------------
     4. AI MOTION ASSISTANT & CODE OPTIMIZER
     -------------------------------------------------------- */
  function setupAIAssistant() {
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send-btn');
    const messages = document.getElementById('ai-chat-messages');
    const clearBtn = document.getElementById('ai-clear-chat-btn');
    const optInput = document.getElementById('ai-opt-input');
    const optAnalyzeBtn = document.getElementById('ai-opt-analyze-btn');
    const optReport = document.getElementById('ai-opt-report');

    // Prompt templates
    document.querySelectorAll('.ai-prompt-tpl').forEach(btn => {
      btn.addEventListener('click', () => {
        if (chatInput) {
          chatInput.value = btn.dataset.prompt;
          chatInput.focus();
        }
        if (window.ApexSoundFX) ApexSoundFX.hover();
      });
    });

    function appendMessage(sender, text, isBot) {
      if (!messages) return;
      const bubble = document.createElement('div');
      bubble.className = isBot ? 'ai-bubble-bot p-4 rounded-xl leading-relaxed' : 'ai-bubble-user p-4 rounded-xl leading-relaxed self-end max-w-[85%]';
      bubble.innerHTML = `
        <span class="${isBot ? 'text-brand-cyan' : 'text-brand-blue'} font-bold block mb-1">${sender}:</span>
        <div>${text.replace(/\n/g, '<br>')}</div>
      `;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    function generateAIResponse(query) {
      const q = query.toLowerCase();

      if (q.includes('three') || q.includes('3d') || q.includes('webgl')) {
        return `Рекомендации по Three.js & WebGL:\n1. Для частиц используйте THREE.BufferGeometry с типизированными Float32Array.\n2. Включайте depthWrite: false и blending: THREE.AdditiveBlending для неонового свечения без артефактов.\n3. Морфинг координат выполняйте прямо в vertex shader через uniform float u_progress или интерполяцией в GSAP 3.\n4. Не инстанциируйте материалы в цикле requestAnimationFrame.`;
      }
      if (q.includes('glsl') || q.includes('шейдер') || q.includes('sdf') || q.includes('тоннель')) {
        return `Архитектура GLSL Raymarching:\n1. SDF-функция сферы: length(p) - r;\n2. SDF тора: length(vec2(length(p.xz) - r1, p.y)) - r2;\n3. Процедурный гироид: dot(sin(p), cos(p.zxy));\n4. Для предотвращения артефактов на границах используйте шаг raymarching t += d * 0.7 и не превышайте 64-100 итераций.`;
      }
      if (q.includes('оптимиз') || q.includes('fps') || q.includes('тормоз') || q.includes('лага')) {
        return `Чек-лист аппаратной оптимизации под 120 FPS:\n• Исключите анимацию layout-свойств: top, left, width, height, margin.\n• Анимируйте исключительно GPU-композитные свойства: transform (translate3d, scale, rotate) и opacity.\n• Задайте will-change: transform точечно на анимируемые ноды.\n• В Canvas 2D избегайте ctx.shadowBlur на мобильных GPU — используйте радиальные спрайты.`;
      }
      if (q.includes('стариков') || q.includes('автор') || q.includes('создател')) {
        return `Проект ApexMotion создан ведущим фронтенд-архитектором Дмитрием Сергеевичем Стариковым в 2026 году. Концепция объединяет 998 чистых математических алгоритмов визуализации, Three.js 3D сцены, GSAP и Web Audio в единую коммерческую дизайн-систему.`;
      }

      return `Анализ запроса: "${query}"\nДля реализации данного эффекта рекомендуется архитектура WebGL + GSAP Timeline. Для обеспечения 60 FPS вынесите математический расчет фаз в Web Worker или GPU Shader. В каталоге ApexMotion доступны готовые аналоги в категориях "GLSL & Raymarching" и "Physics & Simulation".`;
    }

    if (sendBtn && chatInput) {
      const handleSend = () => {
        const val = chatInput.value.trim();
        if (!val) return;
        appendMessage('Вы', val, false);
        chatInput.value = '';

        if (window.ApexSoundFX) ApexSoundFX.click();

        setTimeout(() => {
          const resp = generateAIResponse(val);
          appendMessage('Apex AI Assistant', resp, true);
          if (window.ApexSoundFX) ApexSoundFX.hover();
        }, 400);
      };

      sendBtn.addEventListener('click', handleSend);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    if (clearBtn && messages) {
      clearBtn.addEventListener('click', () => {
        messages.innerHTML = `
          <div class="ai-bubble-bot p-4 rounded-xl leading-relaxed">
            <span class="text-brand-cyan font-bold block mb-1">Apex AI Assistant:</span>
            Диалог очищен. Задайте новый вопрос или выберите готовый архитектурный шаблон слева!
          </div>
        `;
      });
    }

    // Code Optimizer
    if (optAnalyzeBtn && optInput && optReport) {
      optAnalyzeBtn.addEventListener('click', () => {
        const code = optInput.value;
        if (!code.trim()) {
          ApexToast.show('Вставьте код для анализа', 'warning', 'alert-circle');
          return;
        }

        const issues = [];
        if (code.includes('top:') || code.includes('left:') || code.includes('margin')) {
          issues.push('⚠️ Обнаружена анимация layout-свойств (top/left/margin). Это вызывает принудительный Reflow/Layout на каждом кадре. Замените на transform: translate3d().');
        }
        if (code.includes('width:') || code.includes('height:')) {
          issues.push('⚠️ Анимация размеров (width/height) пересчитывает DOM-дерево. Рекомендуется использовать scaleX/scaleY.');
        }
        if (code.includes('shadowBlur') || code.includes('box-shadow')) {
          issues.push('💡 Дорогой рендеринг размытия теней (shadowBlur/box-shadow). На мобильных чипсетах может приводить к просадке до 30 FPS.');
        }
        if (!code.includes('will-change') && !code.includes('translate3d')) {
          issues.push('⚡ Отсутствует явный триггер создания GPU Composite Layer (will-change: transform или transform: translateZ(0)).');
        }
        if (issues.length === 0) {
          issues.push('✅ Код оптимизирован! Критических GPU узких мест не обнаружено.');
        }

        optReport.classList.remove('hidden');
        optReport.innerHTML = `
          <div class="font-bold text-emerald-400 mb-2">Отчет GPU Profiler:</div>
          <div class="flex flex-col gap-1.5 leading-relaxed">${issues.join('<br>')}</div>
        `;
        if (window.ApexSoundFX) ApexSoundFX.click();
      });
    }
  }

  /* --------------------------------------------------------
     5. REALTIME PERFORMANCE MONITOR (FPS & HARDWARE HUD)
     -------------------------------------------------------- */
  function setupPerformanceMonitor() {
    const hudFps = document.getElementById('hud-fps');
    const hudFrameTime = document.getElementById('hud-frametime');
    const heroFps = document.getElementById('fps-counter');
    const profileSelect = document.getElementById('perf-profile-select');

    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;

    function updatePerfHUD(now) {
      frameCount++;
      const delta = now - lastTime;

      if (delta >= 1000) {
        fps = Math.round((frameCount * 1000) / delta);
        frameCount = 0;
        lastTime = now;

        const ft = (1000 / Math.max(fps, 1)).toFixed(1) + 'ms';
        if (hudFps) {
          hudFps.textContent = fps;
          if (fps >= 55) hudFps.className = 'text-emerald-400 font-bold font-mono text-sm';
          else if (fps >= 35) hudFps.className = 'text-amber-400 font-bold font-mono text-sm';
          else hudFps.className = 'text-rose-400 font-bold font-mono text-sm';
        }
        if (hudFrameTime) hudFrameTime.textContent = ft;
        if (heroFps) heroFps.textContent = fps;
      }

      requestAnimationFrame(updatePerfHUD);
    }

    requestAnimationFrame(updatePerfHUD);

    if (profileSelect) {
      profileSelect.addEventListener('change', () => {
        const prof = profileSelect.value;
        ApexToast.show(`Профиль производительности переключен: ${prof.toUpperCase()}`, 'info', 'gauge');
      });
    }
  }

  /* --------------------------------------------------------
     6. COMMAND PALETTE (CTRL+K / CMD+K)
     -------------------------------------------------------- */
  function setupCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    const triggerBtn = document.getElementById('cmd-palette-btn');
    const closeBtn = document.getElementById('cmd-close-btn');
    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');

    if (!modal) return;

    const quickCommands = [
      { title: 'Генераторы: CSS Animation Generator', icon: 'layers', link: '#motion-generators' },
      { title: 'Генераторы: Cubic Bezier Editor', icon: 'spline', link: '#motion-generators' },
      { title: 'Генераторы: GLSL Shader Playground', icon: 'code', link: '#motion-generators' },
      { title: 'Интерактивная физическая лаборатория', icon: 'atom', link: '#interactive-lab' },
      { title: 'Каталог 998 технологий', icon: 'database', link: '#catalog-1000' },
      { title: 'User Workspace (Избранное & Экспорт JSON)', icon: 'folder-git-2', link: '#user-workspace' },
      { title: 'AI Motion Assistant & Code Optimizer', icon: 'sparkles', link: '#ai-assistant' },
      { title: 'Тема: Dark Luxury', icon: 'palette', action: () => setTheme('luxury') },
      { title: 'Тема: Deep Cyber', icon: 'palette', action: () => setTheme('cyber') },
      { title: 'Тема: Monokai Minimal', icon: 'palette', action: () => setTheme('monokai') },
      { title: 'Тема: Midnight Obsidian', icon: 'palette', action: () => setTheme('obsidian') }
    ];

    function setTheme(t) {
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('apex_theme', t);
      ApexToast.show(`Тема оформления: ${t}`, 'info', 'palette');
    }

    function openPalette() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (input) {
        input.value = '';
        input.focus();
      }
      renderPaletteResults('');
      if (window.ApexSoundFX) ApexSoundFX.hover();
    }

    function closePalette() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function renderPaletteResults(query) {
      if (!results) return;
      const q = query.toLowerCase().trim();
      let matches = [];

      if (!q) {
        matches = quickCommands.slice(0, 8);
      } else {
        // Match system commands
        const cmdMatches = quickCommands.filter(c => c.title.toLowerCase().includes(q));
        // Match 998 catalog items
        const data = window.TECHNOLOGIES_1000 || [];
        const techMatches = data.filter(t => 
          t.title.toLowerCase().includes(q) || 
          t.category.toLowerCase().includes(q) ||
          (t.engine && t.engine.toLowerCase().includes(q))
        ).slice(0, 10).map(t => ({
          title: `#${t.id} ${t.title} [${t.category}]`,
          icon: 'play',
          link: `#effect/${t.id}`
        }));

        matches = [...cmdMatches, ...techMatches];
      }

      if (matches.length === 0) {
        results.innerHTML = '<div class="py-6 text-center text-gray-500 font-mono text-xs">Ничего не найдено по запросу</div>';
        return;
      }

      results.innerHTML = matches.map((m, idx) => `
        <div class="cmd-item p-2.5 rounded-xl border border-white/5 bg-black/40 hover:bg-white/10 flex items-center justify-between cursor-pointer ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
          <div class="flex items-center gap-2.5 truncate">
            <i data-lucide="${m.icon}" class="w-3.5 h-3.5 text-brand-cyan flex-shrink-0"></i>
            <span class="text-gray-200 truncate">${m.title}</span>
          </div>
          <span class="text-[10px] text-gray-500 font-mono">↵ Открыть</span>
        </div>
      `).join('');

      if (window.lucide) lucide.createIcons();

      // Click bindings
      results.querySelectorAll('.cmd-item').forEach((itemEl, i) => {
        itemEl.addEventListener('click', () => {
          const m = matches[i];
          closePalette();
          if (m.action) {
            m.action();
          } else if (m.link) {
            window.location.hash = m.link.replace('#', '');
            const targetEl = document.querySelector(m.link.startsWith('#effect/') ? '#catalog-1000' : m.link);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    if (input) {
      input.addEventListener('input', () => {
        renderPaletteResults(input.value);
      });
    }

    // Keyboard shortcuts: Ctrl+K / Cmd+K / Esc
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('hidden')) {
          openPalette();
        } else {
          closePalette();
        }
      } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closePalette();
      }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });
  }

  /* --------------------------------------------------------
     INIT ALL SUITE ENGINES
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupMotionGenerators();
    setupUserWorkspace();
    setupAIAssistant();
    setupPerformanceMonitor();
    setupCommandPalette();
  });

})();
