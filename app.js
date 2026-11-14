// ========================================================
// APEXMOTION // MASTER APPLICATION RUNTIME & ENGINES
// Principal Creative Developer & Frontend Architecture
// ========================================================

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. WEB AUDIO API PROCEDURAL SYNTHESIZER
     -------------------------------------------------------- */
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const SoundFX = {
    hover() {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch (e) {}
    },

    click() {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } catch (e) {}
    },

    morph() {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {}
    },

    blast() {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
    }
  };

  window.ApexSoundFX = SoundFX;

  /* --------------------------------------------------------
     2. THEME SWITCHER (Dark Luxury, Deep Cyber, Monokai Minimal, Midnight Obsidian)
     -------------------------------------------------------- */
  function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('[data-theme-btn]');
    const savedTheme = localStorage.getItem('apex_theme') || 'luxury';
    document.body.setAttribute('data-theme', savedTheme);

    themeButtons.forEach(btn => {
      const theme = btn.dataset.themeBtn;
      if (theme === savedTheme) {
        btn.classList.add('ring-2', 'ring-accent-primary');
      }

      btn.addEventListener('click', () => {
        SoundFX.click();
        const newTheme = btn.dataset.themeBtn;
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('apex_theme', newTheme);

        themeButtons.forEach(b => b.classList.remove('ring-2', 'ring-accent-primary'));
        btn.classList.add('ring-2', 'ring-accent-primary');
      });
    });

    // Sound toggle button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        SoundFX.click();
        const icon = soundBtn.querySelector('i');
        const text = soundBtn.querySelector('.sound-status');
        if (soundEnabled) {
          if (icon) icon.setAttribute('data-lucide', 'volume-2');
          if (text) text.textContent = 'Звук: ON';
          soundBtn.classList.add('text-brand-cyan');
          soundBtn.classList.remove('text-gray-500');
        } else {
          if (icon) icon.setAttribute('data-lucide', 'volume-x');
          if (text) text.textContent = 'Звук: OFF';
          soundBtn.classList.remove('text-brand-cyan');
          soundBtn.classList.add('text-gray-500');
        }
        if (window.lucide) lucide.createIcons();
      });
    }

    // Confetti button
    const confettiBtn = document.getElementById('confetti-btn');
    if (confettiBtn && window.confetti) {
      confettiBtn.addEventListener('click', () => {
        SoundFX.morph();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f5d4', '#3b82f6', '#f43f5e', '#ffffff']
        });
      });
    }
  }

  /* --------------------------------------------------------
     3. CODE MODAL FOR SHOWCASE
     -------------------------------------------------------- */
  function setupCodeModal() {
    const modal = document.getElementById('code-modal');
    if (!modal) return;
    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-category');
    const descEl = document.getElementById('modal-desc');
    const codeEl = document.getElementById('modal-code');
    const closeBtn = document.getElementById('modal-close-btn');
    const copyBtn = document.getElementById('modal-copy-btn');
    const feedback = document.getElementById('modal-copy-feedback');

    function openModal(key) {
      SoundFX.click();
      const item = (window.APEX_CODE_SNIPPETS && window.APEX_CODE_SNIPPETS[key]) || {
        title: 'Демонстрационный модуль FX',
        category: 'ApexMotion Showcase',
        description: 'Чистый производительный алгоритм визуализации.',
        code: '// Код доступен в библиотеке технологий\nconsole.log("ApexMotion Engine Active");'
      };

      if (titleEl) titleEl.textContent = item.title;
      if (catEl) catEl.textContent = item.category;
      if (descEl) descEl.textContent = item.description;
      if (codeEl) codeEl.textContent = item.code;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      if (feedback) feedback.classList.add('hidden');
    }

    document.querySelectorAll('[data-code-key]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.codeKey));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        SoundFX.click();
        if (codeEl) {
          navigator.clipboard.writeText(codeEl.textContent).then(() => {
            if (feedback) {
              feedback.classList.remove('hidden');
              setTimeout(() => feedback.classList.add('hidden'), 2500);
            }
          });
        }
      });
    }
  }

  /* --------------------------------------------------------
     4. CURSOR WITH LERP & MAGNETIC BUTTONS
     -------------------------------------------------------- */
  function setupCursorAndMagnetic() {
    const dot = document.getElementById('custom-cursor-dot');
    const ring = document.getElementById('custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverTargets = document.querySelectorAll('button, a, input, select, .glass-card-hover');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-hover');
        SoundFX.hover();
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-hover');
      });
    });

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll('.magnetic-target');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* --------------------------------------------------------
     5. 3D CARD TILT WITH PARALLAX GLARE
     -------------------------------------------------------- */
  function setupTiltCards() {
    const tiltContainers = document.querySelectorAll('.tilt-card-container');
    tiltContainers.forEach(container => {
      const inner = container.querySelector('.tilt-card-inner');
      const glare = container.querySelector('.tilt-card-glare');
      if (!inner) return;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = -((y - cy) / cy) * 12;
        const rotY = ((x - cx) / cx) * 12;

        inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          const px = (x / rect.width) * 100;
          const py = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.22), transparent 60%)`;
        }
      });

      container.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* --------------------------------------------------------
     6. HACKER SCRAMBLE TEXT DECODER
     -------------------------------------------------------- */
  function setupHackerScramble() {
    const chars = '0123456789ABCDEF$#@%&*<>~';
    document.querySelectorAll('.hacker-scramble').forEach(el => {
      const original = el.dataset.originalText || el.textContent.trim();
      el.dataset.originalText = original;

      el.addEventListener('mouseenter', () => {
        let iteration = 0;
        clearInterval(el._interval);
        SoundFX.hover();

        el._interval = setInterval(() => {
          el.textContent = original
            .split('')
            .map((char, index) => {
              if (index < iteration) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iteration >= original.length) {
            clearInterval(el._interval);
          }
          iteration += 1 / 3;
        }, 30);
      });
    });
  }

  /* --------------------------------------------------------
     7. THREE.JS HERO 3D PARTICLES GALAXY WITH GEOMETRY MORPH
     -------------------------------------------------------- */
  function setupThreeHero() {
    const container = document.getElementById('three-canvas-container');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color('#00f5d4');
    const c2 = new THREE.Color('#3b82f6');
    const c3 = new THREE.Color('#f43f5e');

    for (let i = 0; i < count; i++) {
      const mixedColor = c1.clone().lerp(c2, (i / count)).lerp(c3, (i % 5 === 0 ? 0.35 : 0));
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    // Mathematical coordinate generators
    function getSphereCoords() {
      const arr = new Float32Array(count * 3);
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        arr[i * 3] = Math.cos(theta) * radius * 75;
        arr[i * 3 + 1] = y * 75;
        arr[i * 3 + 2] = Math.sin(theta) * radius * 75;
      }
      return arr;
    }

    function getTorusCoords() {
      const arr = new Float32Array(count * 3);
      const R = 60, r = 24;
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        arr[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        arr[i * 3 + 2] = r * Math.sin(v);
      }
      return arr;
    }

    function getDnaCoords() {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const strand = i % 2 === 0 ? 1 : -1;
        const t = (i / count) * Math.PI * 12;
        const y = (i / count) * 150 - 75;
        arr[i * 3] = Math.cos(t) * 32 * strand;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = Math.sin(t) * 32 * strand;
      }
      return arr;
    }

    function getWaveCoords() {
      const arr = new Float32Array(count * 3);
      const cols = Math.floor(Math.sqrt(count));
      for (let i = 0; i < count; i++) {
        const x = ((i % cols) - cols / 2) * 5.5;
        const z = (Math.floor(i / cols) - cols / 2) * 5.5;
        const y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 25;
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      return arr;
    }

    const shapes = [
      { name: 'Сфера Фибоначчи', get: getSphereCoords },
      { name: 'Тор Клейна (Torus)', get: getTorusCoords },
      { name: 'Двойная спираль ДНК', get: getDnaCoords },
      { name: 'Волна интерференции', get: getWaveCoords }
    ];

    let currentShapeIndex = 0;
    const initialCoords = shapes[0].get();
    for (let i = 0; i < count * 3; i++) {
      positions[i] = initialCoords[i];
      targetPositions[i] = initialCoords[i];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const canvasPoint = document.createElement('canvas');
    canvasPoint.width = 32;
    canvasPoint.height = 32;
    const ctxPoint = canvasPoint.getContext('2d');
    const grad = ctxPoint.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,245,212,0.85)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctxPoint.fillStyle = grad;
    ctxPoint.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvasPoint);
    const material = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking
    let targetRotX = 0;
    let targetRotY = 0;
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.45;
    });

    // Morph transition function
    function morphToNextShape() {
      SoundFX.morph();
      currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
      const nextCoords = shapes[currentShapeIndex].get();
      for (let i = 0; i < count * 3; i++) {
        targetPositions[i] = nextCoords[i];
      }
      const modeText = document.getElementById('mode-text');
      if (modeText) modeText.textContent = shapes[currentShapeIndex].name;
    }

    const toggleBtn = document.getElementById('toggle-3d-mode');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', morphToNextShape);
    }

    // Render loop
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsCounter = document.getElementById('fps-counter');

    function animateThree() {
      requestAnimationFrame(animateThree);
      const elapsed = clock.getElapsedTime();

      // FPS Calculation
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        if (fpsCounter) fpsCounter.textContent = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;
      }

      particles.rotation.y += 0.003;
      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.04;
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.04;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count * 3; i++) {
        pos[i] += (targetPositions[i] - pos[i]) * 0.055;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animateThree();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* --------------------------------------------------------
     8. INTERACTIVE PHYSICAL LABORATORY
     Particles count, Speed, Gravity, Repel, Radius, Size
     -------------------------------------------------------- */
  function setupInteractiveLab() {
    const canvas = document.getElementById('interactive-canvas');
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    function resizeLab() {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    }
    resizeLab();
    window.addEventListener('resize', resizeLab);

    let labParticles = [];
    let labMouse = { x: null, y: null, isDown: false };
    let labColorTheme = 'cyan';
    let isPaused = false;

    const colorThemes = {
      'cyan': { primary: '#00f5d4', line: 'rgba(0, 245, 212,' },
      'neon-pink': { primary: '#f43f5e', line: 'rgba(244, 63, 94,' },
      'matrix': { primary: '#10b981', line: 'rgba(16, 185, 129,' },
      'solar-gold': { primary: '#f59e0b', line: 'rgba(245, 158, 11,' },
      'monochrome': { primary: '#f8fafc', line: 'rgba(248, 250, 252,' }
    };

    class LabParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const speedVal = document.getElementById('slider-speed') ? parseInt(document.getElementById('slider-speed').value) / 10 : 1.5;
        this.vx = (Math.random() - 0.5) * speedVal;
        this.vy = (Math.random() - 0.5) * speedVal;
        const sizeVal = document.getElementById('slider-size') ? parseFloat(document.getElementById('slider-size').value) : 2.0;
        this.radius = Math.random() * sizeVal + 1.0;
      }
      update() {
        const gravityVal = document.getElementById('slider-gravity') ? parseFloat(document.getElementById('slider-gravity').value) : 0;
        const repelVal = document.getElementById('slider-repel') ? parseFloat(document.getElementById('slider-repel').value) : 1.0;

        this.vy += gravityVal * 0.05;

        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > width) { this.x = width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        if (this.y > height) { this.y = height; this.vy *= -0.8; }

        if (labMouse.x !== null) {
          const dx = labMouse.x - this.x;
          const dy = labMouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Repel or attract
            const factor = labMouse.isDown ? (-0.25 * repelVal) : (0.05 * repelVal);
            this.vx += (dx / dist) * force * factor;
            this.vy += (dy / dist) * force * factor;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = (colorThemes[labColorTheme] || colorThemes.cyan).primary;
        ctx.fill();
      }
    }

    function initLabParticles(count) {
      labParticles = [];
      for (let i = 0; i < count; i++) {
        labParticles.push(new LabParticle());
      }
    }
    initLabParticles(140);

    function animateLab() {
      requestAnimationFrame(animateLab);
      if (!isVisible || isPaused) return;

      ctx.clearRect(0, 0, width, height);
      const maxDistEl = document.getElementById('slider-dist');
      const maxDist = maxDistEl ? parseInt(maxDistEl.value) : 100;

      for (let i = 0; i < labParticles.length; i++) {
        for (let j = i + 1; j < labParticles.length; j++) {
          const dx = labParticles[i].x - labParticles[j].x;
          const dy = labParticles[i].y - labParticles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = (colorThemes[labColorTheme] || colorThemes.cyan).line + alpha + ')';
            ctx.lineWidth = 0.8;
            ctx.moveTo(labParticles[i].x, labParticles[i].y);
            ctx.lineTo(labParticles[j].x, labParticles[j].y);
            ctx.stroke();
          }
        }
      }

      labParticles.forEach(p => {
        p.update();
        p.draw();
      });
    }
    animateLab();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      labMouse.x = e.clientX - rect.left;
      labMouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      labMouse.x = null;
      labMouse.y = null;
    });
    canvas.addEventListener('mousedown', () => labMouse.isDown = true);
    window.addEventListener('mouseup', () => labMouse.isDown = false);

    // Sliders
    const sliderParticles = document.getElementById('slider-particles');
    const valParticles = document.getElementById('val-particles');
    if (sliderParticles && valParticles) {
      sliderParticles.addEventListener('input', (e) => {
        valParticles.textContent = e.target.value;
        initLabParticles(parseInt(e.target.value));
      });
    }

    const sliderSpeed = document.getElementById('slider-speed');
    const valSpeed = document.getElementById('val-speed');
    if (sliderSpeed && valSpeed) {
      sliderSpeed.addEventListener('input', (e) => {
        valSpeed.textContent = (e.target.value / 10).toFixed(1) + 'x';
        const factor = parseInt(e.target.value) / 10;
        labParticles.forEach(p => {
          p.vx = (Math.random() - 0.5) * factor;
          p.vy = (Math.random() - 0.5) * factor;
        });
      });
    }

    const sliderDist = document.getElementById('slider-dist');
    const valDist = document.getElementById('val-dist');
    if (sliderDist && valDist) {
      sliderDist.addEventListener('input', (e) => {
        valDist.textContent = e.target.value + 'px';
      });
    }

    const sliderGravity = document.getElementById('slider-gravity');
    const valGravity = document.getElementById('val-gravity');
    if (sliderGravity && valGravity) {
      sliderGravity.addEventListener('input', (e) => {
        valGravity.textContent = (e.target.value / 10).toFixed(1) + 'G';
      });
    }

    const sliderRepel = document.getElementById('slider-repel');
    const valRepel = document.getElementById('val-repel');
    if (sliderRepel && valRepel) {
      sliderRepel.addEventListener('input', (e) => {
        valRepel.textContent = (e.target.value / 10).toFixed(1) + 'x';
      });
    }

    const sliderSize = document.getElementById('slider-size');
    const valSize = document.getElementById('val-size');
    if (sliderSize && valSize) {
      sliderSize.addEventListener('input', (e) => {
        valSize.textContent = e.target.value + 'px';
        const s = parseFloat(e.target.value);
        labParticles.forEach(p => {
          p.radius = Math.random() * s + 1.0;
        });
      });
    }

    // Color Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.click();
        document.querySelectorAll('.preset-btn').forEach(b => {
          b.className = 'preset-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all';
        });
        btn.className = 'preset-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-cyan/20 border border-brand-cyan text-brand-cyan transition-all';
        labColorTheme = btn.dataset.color;
      });
    });

    // Pause / Play Button
    const pauseBtn = document.getElementById('pause-lab-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        SoundFX.click();
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused 
          ? '<i data-lucide="play" class="w-3.5 h-3.5"></i> Старт'
          : '<i data-lucide="pause" class="w-3.5 h-3.5"></i> Пауза';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Fullscreen Button
    const fsBtn = document.getElementById('fs-lab-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        SoundFX.click();
        const container = canvas.parentElement;
        if (!document.fullscreenElement) {
          if (container.requestFullscreen) container.requestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    // Blast Button
    const blastBtn = document.getElementById('blast-lab-btn');
    if (blastBtn) {
      blastBtn.addEventListener('click', () => {
        SoundFX.blast();
        const cx = width / 2;
        const cy = height / 2;
        labParticles.forEach(p => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx = (dx / dist) * 16;
          p.vy = (dy / dist) * 16;
        });
      });
    }

    // Reset Button
    const resetBtn = document.getElementById('reset-lab-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        SoundFX.click();
        if (sliderParticles) sliderParticles.value = 140;
        if (valParticles) valParticles.textContent = '140';
        if (sliderSpeed) sliderSpeed.value = 15;
        if (valSpeed) valSpeed.textContent = '1.5x';
        if (sliderDist) sliderDist.value = 100;
        if (valDist) valDist.textContent = '100px';
        if (sliderGravity) sliderGravity.value = 0;
        if (valGravity) valGravity.textContent = '0.0G';
        if (sliderRepel) sliderRepel.value = 10;
        if (valRepel) valRepel.textContent = '1.0x';
        if (sliderSize) sliderSize.value = 2;
        if (valSize) valSize.textContent = '2.0px';
        initLabParticles(140);
      });
    }
  }

  /* --------------------------------------------------------
     INIT ALL SYSTEMS ON DOM CONTENT LOADED
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupThemeSwitcher();
    setupCodeModal();
    setupCursorAndMagnetic();
    setupTiltCards();
    setupHackerScramble();
    setupThreeHero();
    setupInteractiveLab();

    if (window.lucide) {
      lucide.createIcons();
    }
  });

})();
