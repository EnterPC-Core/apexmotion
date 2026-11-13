// ========================================================
// APEXMOTION // CODE SNIPPETS DICTIONARY FOR MODAL
// ========================================================
window.APEX_CODE_SNIPPETS = {
  'three-particles': {
    title: 'Three.js 3D Particle Galaxy & Geometry Morphing',
    category: 'WebGL & 3D',
    description: 'Интерактивная 3D сцена на WebGL с 2000 частиц и морфингом геометрии (Сфера Фибоначчи, Тор-узел, Двойная спираль ДНК, Волна).',
    code: `// Three.js Particle Morphing
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const count = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
const targets = new Float32Array(count * 3);

// Generate Fibonacci Sphere coordinates
for (let i = 0; i < count; i++) {
  const phi = Math.acos(-1 + (2 * i) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  positions[i * 3]     = 100 * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = 100 * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = 100 * Math.cos(phi);
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
  size: 2.2,
  color: 0x00f5d4,
  blending: THREE.AdditiveBlending,
  transparent: true
});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// GSAP Morph between shapes
function morphTo(newPositions) {
  const posAttr = geometry.attributes.position;
  gsap.to(posAttr.array, {
    endArray: newPositions,
    duration: 1.6,
    ease: 'power3.inOut',
    onUpdate: () => posAttr.needsUpdate = true
  });
}`
  },

  'three-polyhedron': {
    title: '3D Polyhedron Crystal with Mouse Inertia',
    category: 'WebGL & 3D',
    description: 'Парящий 3D-многогранник с физическим вращением, инерцией трекинга мыши и градиентным каркасом (wireframe + glass).',
    code: `// 3D Crystal Polyhedron with Lerp Rotation
const geo = new THREE.IcosahedronGeometry(35, 1);
const wireMat = new THREE.MeshStandardMaterial({
  color: 0x00f5d4,
  wireframe: true,
  emissive: 0x7b2cbf,
  emissiveIntensity: 0.4
});
const mesh = new THREE.Mesh(geo, wireMat);
scene.add(mesh);

// Mouse inertia lerp
let targetRotX = 0, targetRotY = 0;
window.addEventListener('mousemove', (e) => {
  targetRotY = (e.clientX / window.innerWidth - 0.5) * Math.PI;
  targetRotX = (e.clientY / window.innerHeight - 0.5) * Math.PI;
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
  mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05;
  mesh.position.y = Math.sin(Date.now() * 0.002) * 5; // Floating levitation
  renderer.render(scene, camera);
}`
  },

  'blackhole-gravity': {
    title: 'Gravity Well & Black Hole 2D Canvas Physics',
    category: 'Физика & Canvas 2D',
    description: 'Гравитационный колодец Ньютона: притяжение и орбитальный разгон сотен частиц вокруг сингулярности с реакцией на клик (отталкивание).',
    code: `// Newton Gravity Well Simulation
class Particle {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }
  update(wellX, wellY, repel = false) {
    const dx = wellX - this.x;
    const dy = wellY - this.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq) || 1;
    const force = Math.min(1500 / distSq, 3.5);
    const sign = repel ? -2.5 : 1;

    this.vx += (dx / dist) * force * sign;
    this.vy += (dy / dist) * force * sign;
    this.vx *= 0.985; // Drag/friction
    this.vy *= 0.985;
    this.x += this.vx;
    this.y += this.vy;
  }
}`
  },

  'elastic-mesh': {
    title: 'Spring & Elastic Cloth Mesh Physics',
    category: 'Физика & Canvas 2D',
    description: 'Эластичная сетка узлов, соединенных пружинами Гука с затуханием (Damped Harmonic Oscillator).',
    code: `// Hooke's Law Elastic Node
class SpringPoint {
  constructor(origX, origY) {
    this.x = origX; this.y = origY;
    this.origX = origX; this.origY = origY;
    this.vx = 0; this.vy = 0;
    this.k = 0.08; // Spring stiffness
    this.damp = 0.88; // Damping factor
  }
  update(mouseX, mouseY) {
    // Distance to mouse pointer
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 80) {
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * (80 - dist) * 0.15;
      this.vy -= Math.sin(angle) * (80 - dist) * 0.15;
    }
    // Return spring force
    this.vx += (this.origX - this.x) * this.k;
    this.vy += (this.origY - this.y) * this.k;
    this.vx *= this.damp;
    this.vy *= this.damp;
    this.x += this.vx;
    this.y += this.vy;
  }
}`
  },

  'soundwave-eq': {
    title: 'Interference Sine Wave Visualizer',
    category: 'Физика & Canvas 2D',
    description: 'Интерференция синусоидальных гармоник на Canvas 2D в реальном времени с неоновым свечением.',
    code: `// Multi-harmonic Sine Wave Interference
const ctx = canvas.getContext('2d');
let time = 0;

function draw() {
  ctx.clearRect(0, 0, width, height);
  const layers = [
    { freq: 0.015, amp: 28, speed: 0.04, color: '#00f5d4' },
    { freq: 0.022, amp: 20, speed: -0.03, color: '#7b2cbf' },
    { freq: 0.009, amp: 35, speed: 0.02, color: '#f72585' }
  ];

  layers.forEach(({ freq, amp, speed, color }) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin(x * freq + time * speed) * amp 
                           * Math.cos(x * 0.005 + time * 0.01);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  time++;
  requestAnimationFrame(draw);
}`
  },

  'hacker-scramble': {
    title: 'Hacker Text Scramble Decoder',
    category: 'GSAP 3 & Advanced Motion',
    description: 'Киберпанк декодер глифов с постепенным проявлением целевого текста по итерациям.',
    code: `// Hacker Text Scramble Decoder
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      queue.push({
        from: oldText[i] || '',
        to: newText[i] || '',
        start: Math.floor(Math.random() * 20),
        end: Math.floor(Math.random() * 20) + 20
      });
    }
    this.queue = queue;
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
        output += '<span class=\"text-brand-cyan\">' + char + '</span>';
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
}`
  },

  'magnetic-button': {
    title: 'Magnetic Button Pull with Spring Return',
    category: 'GSAP 3 & Advanced Motion',
    description: 'Магнитная кнопка, плавно притягивающаяся к курсору в радиусе действия и возвращающаяся с упругим отскоком.',
    code: `// Magnetic Button with GSAP Elastic Return
const btn = document.querySelector('#magnetic-btn');

btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = (e.clientX - centerX) * 0.45;
  const deltaY = (e.clientY - centerY) * 0.45;

  gsap.to(btn, {
    x: deltaX,
    y: deltaY,
    duration: 0.3,
    ease: 'power2.out'
  });
});

btn.addEventListener('mouseleave', () => {
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: 'elastic.out(1.2, 0.4)'
  });
});`
  },

  'svg-morph': {
    title: 'SVG Path Morphing Animation',
    category: 'GSAP 3 & Advanced Motion',
    description: 'Плавная интерполяция кривых Безье между разными векторными контурами (Star, Shield, Hexagon, Circle).',
    code: `// SVG Path Morphing via CSS / JS
const paths = {
  star: "M 50 5 L 63 35 L 95 38 L 71 60 L 78 92 L 50 75 L 22 92 L 29 60 L 5 38 L 37 35 Z",
  circle: "M 50 10 C 72 10 90 28 90 50 C 90 72 72 90 50 90 C 28 90 10 72 10 50 C 10 28 28 10 50 10 Z",
  shield: "M 50 5 L 85 20 C 85 60 50 90 50 95 C 50 90 15 60 15 20 Z"
};

let current = 'star';
function morphNext() {
  const next = current === 'star' ? 'shield' : current === 'shield' ? 'circle' : 'star';
  gsap.to('#morph-path', {
    attr: { d: paths[next] },
    duration: 0.9,
    ease: 'power3.inOut'
  });
  current = next;
}`
  },

  'tilt-glare': {
    title: '3D Parallax Tilt with Angle-based Glare',
    category: 'Modern CSS3 & Shaders',
    description: 'Инерционный наклон 3D карточки с расчетом угла и голографическим бликом.',
    code: `// 3D Tilt with Holographic Glare
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  const rotateX = (0.5 - y) * 25; // max 25deg
  const rotateY = (x - 0.5) * 25;
  
  inner.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.03, 1.03, 1.03)\`;
  
  // Angle glare calculation
  glare.style.background = \`radial-gradient(circle at \${x * 100}% \${y * 100}%, rgba(255,255,255,0.25), transparent 60%)\`;
});

card.addEventListener('mouseleave', () => {
  inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
});`
  },

  'liquid-gooey': {
    title: 'Liquid SVG Gooey Metaballs',
    category: 'Modern CSS3 & Shaders',
    description: 'Жидкое слияние капель через SVG feGaussianBlur и контрастную feColorMatrix.',
    code: `<!-- SVG Filter definition -->
<svg style="visibility: hidden; position: absolute;" width="0" height="0">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
      <feColorMatrix in="blur" mode="matrix" 
        values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 22 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>

<!-- Container styled with filter: url('#gooey') -->
<div class="gooey-container" style="filter: url('#gooey');">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
</div>`
  },

  'conic-trail': {
    title: 'Chromatic Conic Border Glow (100% GPU)',
    category: 'Modern CSS3 & Shaders',
    description: 'Анимированная неоновая рамка на коническом градиенте с нулевой нагрузкой на CPU.',
    code: `/* Pure GPU Conic Gradient Trail */
.conic-card {
  position: relative;
  border-radius: 16px;
  background: #0d0e1b;
  overflow: hidden;
}
.conic-card::before {
  content: '';
  position: absolute;
  inset: -150%;
  background: conic-gradient(from 0deg, transparent 0%, transparent 65%, #00f5d4 85%, #f72585 100%);
  animation: rotateBorder 4s linear infinite;
  z-index: 1;
}
.conic-card-inner {
  position: relative;
  inset: 2px;
  background: #090a12;
  border-radius: 14px;
  z-index: 2;
}
@keyframes rotateBorder {
  to { transform: rotate(360deg); }
}`
  },

  'web-audio-synth': {
    title: 'Procedural Web Audio API Sound Synthesizer',
    category: 'Микро-взаимодействия & UI',
    description: 'Процедурная генерация звуков кликов, наведений и взрывов без единого внешнего MP3/WAV файла.',
    code: `// Pure Procedural AudioContext Synthesizer
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioCtx();

// Cyber Click Sound (High-pitch blip with quick decay)
function playBlip(freq = 880, duration = 0.06) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + duration);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// Sub Bass Explosion
function playBoom() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}`
  }
};
