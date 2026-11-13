// ========================================================
// APEXMOTION // MASTER APPLICATION RUNTIME & ENGINES
// ========================================================

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. PROCEDURAL WEB AUDIO API SYNTHESIZER
     -------------------------------------------------------- */
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const SoundFX = {
    click: function () {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {}
    },

    hover: function () {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, audioCtx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } catch (e) {}
    },

    blast: function () {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.45);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
    },

    laser: function () {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}
    }
  };

  window.SoundFX = SoundFX;

  /* --------------------------------------------------------
     2. THEME SWITCHER
     -------------------------------------------------------- */
  function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('[data-theme-btn]');
    const savedTheme = localStorage.getItem('apex_theme') || 'cyberpunk';
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
    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        initAudio();
        const icon = soundToggle.querySelector('i');
        const text = soundToggle.querySelector('.sound-status');
        if (soundEnabled) {
          SoundFX.click();
          if (icon) icon.setAttribute('data-lucide', 'volume-2');
          if (text) text.textContent = 'Звук: ON';
          soundToggle.classList.add('text-brand-cyan');
          soundToggle.classList.remove('text-gray-400');
        } else {
          if (icon) icon.setAttribute('data-lucide', 'volume-x');
          if (text) text.textContent = 'Звук: OFF';
          soundToggle.classList.remove('text-brand-cyan');
          soundToggle.classList.add('text-gray-400');
        }
        if (window.lucide) lucide.createIcons();
      });
    }
  }

  /* --------------------------------------------------------
     3. CODE MODAL CONTROLLER
     -------------------------------------------------------- */
  function setupCodeModal() {
    const modal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalCode = document.getElementById('modal-code');
    const closeBtn = document.getElementById('modal-close-btn');
    const copyBtn = document.getElementById('modal-copy-btn');
    const copyFeedback = document.getElementById('modal-copy-feedback');

    function openModal(snippetKey) {
      const snippet = window.APEX_CODE_SNIPPETS && window.APEX_CODE_SNIPPETS[snippetKey];
      if (!snippet) return;

      SoundFX.click();
      modalTitle.textContent = snippet.title;
      modalCategory.textContent = snippet.category;
      modalDesc.textContent = snippet.description;
      modalCode.textContent = snippet.code;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      SoundFX.click();
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      if (copyFeedback) copyFeedback.classList.add('hidden');
    }

    document.querySelectorAll('[data-code-key]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.codeKey);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        SoundFX.laser();
        const codeText = modalCode.textContent;
        navigator.clipboard.writeText(codeText).then(() => {
          if (copyFeedback) {
            copyFeedback.classList.remove('hidden');
            setTimeout(() => copyFeedback.classList.add('hidden'), 2200);
          }
        }).catch(() => {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = codeText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          if (copyFeedback) {
            copyFeedback.classList.remove('hidden');
            setTimeout(() => copyFeedback.classList.add('hidden'), 2200);
          }
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------
     4. CATEGORY FILTER & LIVE SEARCH
     -------------------------------------------------------- */
  function setupFilterAndSearch() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('[data-card-category]');

    let activeFilter = 'all';
    let searchQuery = '';

    function filterCards() {
      cards.forEach(card => {
        const category = card.dataset.cardCategory;
        const text = card.textContent.toLowerCase();

        const matchCategory = (activeFilter === 'all' || category === activeFilter);
        const matchSearch = (!searchQuery || text.includes(searchQuery));

        if (matchCategory && matchSearch) {
          card.style.display = '';
          gsap.fromTo(card, { opacity: 0.4, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.25 });
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.click();
        filterBtns.forEach(b => {
          b.classList.remove('bg-brand-cyan', 'text-black', 'border-brand-cyan');
          b.classList.add('glass-panel', 'text-gray-300');
        });
        btn.classList.add('bg-brand-cyan', 'text-black', 'border-brand-cyan');
        btn.classList.remove('glass-panel', 'text-gray-300');

        activeFilter = btn.dataset.filter;
        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterCards();
      });
    }
  }

  /* --------------------------------------------------------
     5. LERP CUSTOM CURSOR & MAGNETIC BUTTON
     -------------------------------------------------------- */
  function setupCursorAndMagnetic() {
    const dot = document.getElementById('custom-cursor-dot');
    const ring = document.getElementById('custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover expanders
    document.querySelectorAll('a, button, input, .cursor-hoverable').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-hover');
        SoundFX.hover();
      });
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });

    // Magnetic Button
    const magneticBtn = document.getElementById('magnetic-btn');
    if (magneticBtn) {
      magneticBtn.addEventListener('mousemove', (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.45;
        const dy = (e.clientY - cy) * 0.45;
        gsap.to(magneticBtn, { x: dx, y: dy, duration: 0.2, ease: 'power2.out' });
      });
      magneticBtn.addEventListener('mouseleave', () => {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.2, 0.4)' });
      });
      magneticBtn.addEventListener('click', () => SoundFX.laser());
    }
  }

  /* --------------------------------------------------------
     6. 3D TILT CARDS WITH HOLOGRAPHIC GLARE
     -------------------------------------------------------- */
  function setupTiltCards() {
    document.querySelectorAll('.tilt-card-container').forEach(card => {
      const inner = card.querySelector('.tilt-card-inner');
      const glare = card.querySelector('.tilt-card-glare');
      if (!inner) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotX = (0.5 - y) * 22;
        const rotY = (x - 0.5) * 22;

        inner.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.22), transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* --------------------------------------------------------
     7. HACKER TEXT SCRAMBLE DECODER
     -------------------------------------------------------- */
  function setupHackerScramble() {
    const el = document.getElementById('scramble-text');
    const btn = document.getElementById('re-scramble-btn');
    if (!el) return;

    const words = [
      'QUANTUM_CYBER_MATRIX',
      'NEURAL_SYNAPSE_GRID',
      'THREE_JS_HERO_RENDER',
      'HARDWARE_GPU_60FPS',
      'ENTERPRISE_CORE_APEX'
    ];
    let wordIndex = 0;

    class TextScramble {
      constructor(element) {
        this.el = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        this.queue = [];
        for (let i = 0; i < length; i++) {
          this.queue.push({
            from: oldText[i] || '',
            to: newText[i] || '',
            start: Math.floor(Math.random() * 20),
            end: Math.floor(Math.random() * 20) + 20
          });
        }
        this.frame = 0;
        cancelAnimationFrame(this.frameReq);
        this.update();
      }
      update() {
        let output = '';
        let complete = 0;
        for (let i = 0; i < this.queue.length; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.chars[Math.floor(Math.random() * this.chars.length)];
              this.queue[i].char = char;
            }
            output += `<span class="text-brand-cyan">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete < this.queue.length) {
          this.frame++;
          this.frameReq = requestAnimationFrame(this.update);
        }
      }
    }

    const scrambler = new TextScramble(el);

    if (btn) {
      btn.addEventListener('click', () => {
        SoundFX.click();
        wordIndex = (wordIndex + 1) % words.length;
        scrambler.setText(words[wordIndex]);
      });
    }
  }

  /* --------------------------------------------------------
     8. SVG PATH MORPHING
     -------------------------------------------------------- */
  function setupSvgMorph() {
    const btn = document.getElementById('morph-btn');
    const pathEl = document.getElementById('morph-path');
    const label = document.getElementById('morph-shape-label');
    if (!btn || !pathEl) return;

    const shapes = [
      { name: 'Звезда (Star)', d: 'M 50 5 L 63 35 L 95 38 L 71 60 L 78 92 L 50 75 L 22 92 L 29 60 L 5 38 L 37 35 Z' },
      { name: 'Круг (Circle)', d: 'M 50 10 C 72 10 90 28 90 50 C 90 72 72 90 50 90 C 28 90 10 72 10 50 C 10 28 28 10 50 10 Z' },
      { name: 'Щит (Shield)', d: 'M 50 5 L 85 20 C 85 60 50 90 50 95 C 50 90 15 60 15 20 Z' },
      { name: 'Шестигранник (Hexagon)', d: 'M 50 5 L 90 27 L 90 73 L 50 95 L 10 73 L 10 27 Z' }
    ];
    let idx = 0;

    btn.addEventListener('click', () => {
      SoundFX.click();
      idx = (idx + 1) % shapes.length;
      gsap.to(pathEl, {
        attr: { d: shapes[idx].d },
        duration: 0.75,
        ease: 'elastic.out(1, 0.45)'
      });
      if (label) label.textContent = shapes[idx].name;
    });
  }

  /* --------------------------------------------------------
     9. LIQUID GOOEY MERGE
     -------------------------------------------------------- */
  function setupLiquidGooey() {
    const trigger = document.getElementById('trigger-goo');
    const follower = document.getElementById('goo-follower');
    if (!trigger || !follower) return;

    let merged = false;
    trigger.addEventListener('click', () => {
      SoundFX.click();
      merged = !merged;
      if (merged) {
        follower.style.transform = 'translateX(-36px)';
        trigger.textContent = 'Разъединить капли';
      } else {
        follower.style.transform = 'translateX(0px)';
        trigger.textContent = 'Слить капли';
      }
    });
  }

  /* --------------------------------------------------------
     10. RIPPLE AND MORPHING TOGGLES
     -------------------------------------------------------- */
  function setupMicroInteractions() {
    // Ripple effect
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        SoundFX.click();
        const rect = this.getBoundingClientRect();
        const wave = document.createElement('span');
        wave.classList.add('ripple-wave');
        const size = Math.max(rect.width, rect.height);
        wave.style.width = wave.style.height = `${size}px`;
        wave.style.left = `${e.clientX - rect.left - size / 2}px`;
        wave.style.top = `${e.clientY - rect.top - size / 2}px`;
        this.appendChild(wave);
        setTimeout(() => wave.remove(), 600);
      });
    });

    // Morphing toggle
    const toggle = document.getElementById('demo-morph-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        SoundFX.click();
        toggle.classList.toggle('active');
      });
    }
  }

  /* --------------------------------------------------------
     11. THREE.JS 3D PARTICLE GALAXY & GEOMETRY MORPHING
     -------------------------------------------------------- */
  function setupThreeHero() {
    const container = document.getElementById('three-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Shapes generators
    function getSphereCoords() {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 90 + (Math.random() - 0.5) * 12;
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      return arr;
    }

    function getTorusCoords() {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 85;
        const tube = 32 + (Math.random() - 0.5) * 8;
        arr[i * 3] = (R + tube * Math.cos(v)) * Math.cos(u);
        arr[i * 3 + 1] = (R + tube * Math.cos(v)) * Math.sin(u);
        arr[i * 3 + 2] = tube * Math.sin(v);
      }
      return arr;
    }

    function getDnaCoords() {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const strand = i % 2 === 0 ? 1 : -1;
        const t = (i / count) * Math.PI * 8;
        const radius = 45;
        arr[i * 3] = Math.cos(t) * radius * strand;
        arr[i * 3 + 1] = (i / count - 0.5) * 180;
        arr[i * 3 + 2] = Math.sin(t) * radius * strand;
      }
      return arr;
    }

    function getWaveCoords() {
      const arr = new Float32Array(count * 3);
      const cols = 50;
      const rows = Math.floor(count / cols);
      for (let i = 0; i < count; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const x = (c - cols / 2) * 5;
        const z = (r - rows / 2) * 5;
        const y = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 28;
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      return arr;
    }

    const shapes = {
      sphere: getSphereCoords(),
      torus: getTorusCoords(),
      dna: getDnaCoords(),
      wave: getWaveCoords()
    };
    const shapeKeys = ['sphere', 'torus', 'dna', 'wave'];
    const shapeNames = {
      sphere: 'Сфера Фибоначчи',
      torus: 'Тор-узел (Donut)',
      dna: 'Спираль ДНК',
      wave: 'Волна интерференции'
    };
    let currentShapeIndex = 0;

    // Initial positions
    const initialCoords = shapes.sphere;
    for (let i = 0; i < count * 3; i++) {
      positions[i] = initialCoords[i];
    }

    // Color gradient
    const c1 = new THREE.Color('#00f5d4');
    const c2 = new THREE.Color('#7b2cbf');
    const c3 = new THREE.Color('#f72585');
    for (let i = 0; i < count; i++) {
      const factor = (positions[i * 3 + 1] + 100) / 200;
      const mixed = c1.clone().lerp(c2, Math.random()).lerp(c3, factor);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse & Touch tracking
    let targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0012;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0012;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX - window.innerWidth / 2) * 0.0012;
        targetY = (e.touches[0].clientY - window.innerHeight / 2) * 0.0012;
      }
    }, { passive: true });

    // Morph transition function
    function morphToNextShape() {
      SoundFX.laser();
      currentShapeIndex = (currentShapeIndex + 1) % shapeKeys.length;
      const key = shapeKeys[currentShapeIndex];
      const targetCoords = shapes[key];

      const posAttr = geometry.attributes.position;
      const currentPos = posAttr.array;

      gsap.to(currentPos, {
        endArray: targetCoords,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          posAttr.needsUpdate = true;
        }
      });

      const modeText = document.getElementById('mode-text');
      if (modeText) modeText.textContent = shapeNames[key];
    }

    const toggleBtn = document.getElementById('toggle-3d-mode');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', morphToNextShape);
    }

    // Animation Loop with FPS Counter
    let lastTime = performance.now();
    let frameCount = 0;
    const fpsEl = document.getElementById('fps-counter');

    function animateThree() {
      requestAnimationFrame(animateThree);
      if (!isVisible) return;

      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        if (fpsEl) fpsEl.textContent = frameCount;
        frameCount = 0;
        lastTime = now;
      }

      particleSystem.rotation.y += 0.0028;
      particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;
      particleSystem.rotation.z += (targetX - particleSystem.rotation.z) * 0.05;

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
     12. THREE.JS 3D CRYSTAL POLYHEDRON WITH INERTIA
     -------------------------------------------------------- */
  function setupPolyhedronCrystal() {
    const canvas = document.getElementById('crystal-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const width = canvas.parentElement.clientWidth || 300;
    const height = canvas.parentElement.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer wireframe icosahedron
    const geoOuter = new THREE.IcosahedronGeometry(28, 1);
    const matOuter = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      wireframe: true,
      emissive: 0x4361ee,
      emissiveIntensity: 0.6
    });
    const meshOuter = new THREE.Mesh(geoOuter, matOuter);
    scene.add(meshOuter);

    // Inner glowing core
    const geoInner = new THREE.OctahedronGeometry(14, 0);
    const matInner = new THREE.MeshStandardMaterial({
      color: 0xf72585,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x7b2cbf,
      emissiveIntensity: 0.8
    });
    const meshInner = new THREE.Mesh(geoInner, matInner);
    scene.add(meshInner);

    // Lighting
    const light = new THREE.PointLight(0x00f5d4, 2, 200);
    light.position.set(40, 40, 50);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222244));

    let rotTargetX = 0, rotTargetY = 0;
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      rotTargetY = ((e.clientX - rect.left) / rect.width - 0.5) * Math.PI;
      rotTargetX = ((e.clientY - rect.top) / rect.height - 0.5) * Math.PI;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      rotTargetX = 0;
      rotTargetY = 0;
    });

    function animateCrystal() {
      requestAnimationFrame(animateCrystal);
      if (!isVisible) return;

      meshOuter.rotation.y += (rotTargetY - meshOuter.rotation.y) * 0.05 + 0.008;
      meshOuter.rotation.x += (rotTargetX - meshOuter.rotation.x) * 0.05 + 0.004;

      meshInner.rotation.y -= 0.012;
      meshInner.rotation.z += 0.008;

      meshOuter.position.y = Math.sin(Date.now() * 0.002) * 3;
      meshInner.position.y = meshOuter.position.y;

      renderer.render(scene, camera);
    }
    animateCrystal();
  }

  /* --------------------------------------------------------
     13. BLACK HOLE & GRAVITY WELL PHYSICS (CANVAS 2D)
     -------------------------------------------------------- */
  function setupGravityWell() {
    const canvas = document.getElementById('gravity-canvas');
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    let wellX = width / 2;
    let wellY = height / 2;
    let isRepelling = false;

    class GravityParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
        this.hue = Math.random() > 0.5 ? '#00f5d4' : '#f72585';
      }
      update() {
        const dx = wellX - this.x;
        const dy = wellY - this.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq) || 1;

        const force = Math.min(1200 / distSq, 3.2);
        const sign = isRepelling ? -3.5 : 1;

        this.vx += (dx / dist) * force * sign;
        this.vy += (dy / dist) * force * sign;

        // Tangential orbital velocity component
        this.vx += (-dy / dist) * 0.15;
        this.vy += (dx / dist) * 0.15;

        // Air resistance drag
        this.vx *= 0.985;
        this.vy *= 0.985;

        this.x += this.vx;
        this.y += this.vy;

        // Reset if sucked in or out of bounds
        if (dist < 10) this.reset();
        if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.hue;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 120 }, () => new GravityParticle());

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      wellX = e.clientX - rect.left;
      wellY = e.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', () => {
      isRepelling = true;
      SoundFX.laser();
    });
    window.addEventListener('mouseup', () => isRepelling = false);

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        wellX = e.touches[0].clientX - rect.left;
        wellY = e.touches[0].clientY - rect.top;
        isRepelling = true;
        SoundFX.laser();
      }
    }, { passive: true });

    window.addEventListener('touchend', () => isRepelling = false);

    function animateGravity() {
      requestAnimationFrame(animateGravity);
      if (!isVisible) return;

      ctx.fillStyle = 'rgba(5, 5, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw singularity center
      ctx.beginPath();
      ctx.arc(wellX, wellY, isRepelling ? 14 : 8, 0, Math.PI * 2);
      ctx.fillStyle = isRepelling ? '#f72585' : '#00f5d4';
      ctx.shadowColor = isRepelling ? '#f72585' : '#00f5d4';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      particles.forEach(p => {
        p.update();
        p.draw();
      });
    }
    animateGravity();
  }

  /* --------------------------------------------------------
     14. ELASTIC MESH / SPRING CLOTH (CANVAS 2D)
     -------------------------------------------------------- */
  function setupElasticMesh() {
    const canvas = document.getElementById('elastic-canvas');
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
        initPoints();
      }
    });

    let pointer = { x: -1000, y: -1000 };

    class SpringNode {
      constructor(origX, origY) {
        this.origX = origX;
        this.origY = origY;
        this.x = origX;
        this.y = origY;
        this.vx = 0;
        this.vy = 0;
        this.k = 0.08;
        this.damp = 0.88;
      }
      update() {
        const dx = pointer.x - this.x;
        const dy = pointer.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 75) {
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * (75 - dist) * 0.18;
          this.vy -= Math.sin(angle) * (75 - dist) * 0.18;
        }

        // Hooke's return spring
        this.vx += (this.origX - this.x) * this.k;
        this.vy += (this.origY - this.y) * this.k;
        this.vx *= this.damp;
        this.vy *= this.damp;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    let nodes = [];
    const cols = 12;
    const rows = 8;

    function initPoints() {
      nodes = [];
      const cellW = width / (cols + 1);
      const cellH = height / (rows + 1);
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          nodes.push(new SpringNode(c * cellW, r * cellH));
        }
      }
    }
    initPoints();

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      pointer.x = -1000;
      pointer.y = -1000;
    });

    function animateElastic() {
      requestAnimationFrame(animateElastic);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach(n => n.update());

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.28)';
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const node = nodes[r * cols + c];
          if (c === 0) ctx.moveTo(node.x, node.y);
          else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const node = nodes[r * cols + c];
          if (r === 0) ctx.moveTo(node.x, node.y);
          else ctx.lineTo(node.x, node.y);
        }
        ctx.stroke();
      }

      // Draw nodes
      ctx.fillStyle = '#f72585';
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    animateElastic();
  }

  /* --------------------------------------------------------
     15. SOUNDWAVE RADAR INTERFERENCE (CANVAS 2D)
     -------------------------------------------------------- */
  function setupSoundwaveVisualizer() {
    const canvas = document.getElementById('soundwave-canvas');
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    let waveTime = 0;
    const waves = [
      { freq: 0.018, amp: 24, speed: 0.04, color: '#00f5d4' },
      { freq: 0.026, amp: 18, speed: -0.03, color: '#7b2cbf' },
      { freq: 0.011, amp: 30, speed: 0.02, color: '#f72585' }
    ];

    function animateWaves() {
      requestAnimationFrame(animateWaves);
      if (!isVisible) return;

      ctx.fillStyle = 'rgba(11, 12, 22, 0.35)';
      ctx.fillRect(0, 0, width, height);

      waves.forEach(({ freq, amp, speed, color }) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;

        for (let x = 0; x < width; x += 2) {
          const y = height / 2 +
            Math.sin(x * freq + waveTime * speed) * amp *
            Math.cos(x * 0.006 + waveTime * 0.012);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      waveTime++;
    }
    animateWaves();
  }

  /* --------------------------------------------------------
     16. INTERACTIVE LAB PHYSICS PARTICLES
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

    const colorThemes = {
      'cyan': { primary: '#00f5d4', line: 'rgba(0, 245, 212,' },
      'neon-pink': { primary: '#f72585', line: 'rgba(247, 37, 133,' },
      'matrix': { primary: '#00ff66', line: 'rgba(0, 255, 102,' }
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
        this.radius = Math.random() * 2 + 1.2;
      }
      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (labMouse.x !== null) {
          const dx = labMouse.x - this.x;
          const dy = labMouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            const factor = labMouse.isDown ? -0.15 : 0.035;
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
        ctx.fillStyle = colorThemes[labColorTheme].primary;
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
      if (!isVisible) return;

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
            ctx.strokeStyle = colorThemes[labColorTheme].line + alpha + ')';
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

    // Controls
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

    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.click();
        document.querySelectorAll('.preset-btn').forEach(b => {
          b.className = 'preset-btn px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 hover:text-white';
        });
        btn.className = 'preset-btn px-3 py-2 rounded-xl text-xs font-semibold bg-brand-cyan/20 border border-brand-cyan text-brand-cyan';
        labColorTheme = btn.dataset.color;
      });
    });

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
          p.vx = (dx / dist) * 14;
          p.vy = (dy / dist) * 14;
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
        initLabParticles(140);
      });
    }
  }

  /* --------------------------------------------------------
     17. CONFETTI BURST BUTTON
     -------------------------------------------------------- */
  function setupConfetti() {
    const btn = document.getElementById('confetti-btn');
    if (btn && typeof confetti !== 'undefined') {
      btn.addEventListener('click', () => {
        SoundFX.blast();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f5d4', '#7b2cbf', '#f72585', '#4361ee', '#ffb703']
        });
      });
    }
  }

  /* --------------------------------------------------------
     18. GSAP SCROLLTRIGGER STAGGER REVEAL
     -------------------------------------------------------- */
  function setupScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.gsap-reveal-card', {
      scrollTrigger: {
        trigger: '#stagger-cards-container',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      scale: 0.94,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }

  /* --------------------------------------------------------
     INITIALIZE EVERYTHING ON DOM READY
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setupThemeSwitcher();
    setupCodeModal();
    setupFilterAndSearch();
    setupCursorAndMagnetic();
    setupTiltCards();
    setupHackerScramble();
    setupSvgMorph();
    setupLiquidGooey();
    setupMicroInteractions();
    setupThreeHero();
    setupPolyhedronCrystal();
    setupGravityWell();
    setupElasticMesh();
    setupSoundwaveVisualizer();
    setupInteractiveLab();
    setupConfetti();
    setupScrollTrigger();
  });

})();
