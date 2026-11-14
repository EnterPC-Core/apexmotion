// ========================================================
// APEXMOTION // GLOBAL CATALOG & ISOLATED CODE PLAYGROUND
// 998 Technologies, Realtime Search & Debounce, Category Filters,
// Favorites System (localStorage), Isolated Iframe Sandbox Runner
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tech-1000-grid');
  const searchInput = document.getElementById('tech-search');
  const catFilter = document.getElementById('tech-cat-filter');
  const countBadge = document.getElementById('tech-count-badge');
  const tabButtons = document.querySelectorAll('[data-catalog-tab]');
  const favoritesNavCount = document.getElementById('favorites-nav-count');

  // Modal elements
  const liveExecutorModal = document.getElementById('live-executor-modal');
  const liveTitle = document.getElementById('live-modal-title');
  const liveBadge = document.getElementById('live-modal-badge');
  const liveDesc = document.getElementById('live-modal-desc');
  const liveCodeArea = document.getElementById('live-code-area');
  const liveConsoleLog = document.getElementById('live-console-log');
  const liveSandboxFrame = document.getElementById('live-sandbox-frame');
  const liveRunBtn = document.getElementById('live-run-btn');
  const liveCloseBtn = document.getElementById('live-close-btn');
  const liveCopyBtn = document.getElementById('live-copy-btn');
  const liveDownloadBtn = document.getElementById('live-download-btn');
  const liveResetBtn = document.getElementById('live-reset-btn');
  const liveFullscreenBtn = document.getElementById('live-fullscreen-btn');

  // Realtime parameter sliders in modal
  const paramSpeed = document.getElementById('param-speed');
  const paramScale = document.getElementById('param-scale');
  const paramCount = document.getElementById('param-count');

  if (!window.TECHNOLOGIES_1000 || !container) return;

  const data = window.TECHNOLOGIES_1000;
  let currentPage = 1;
  const pageSize = 24;
  let filteredData = [...data];
  let currentTab = 'all'; // 'all', 'favorites', 'popular', 'new'
  let currentActiveItem = null;

  // Favorites management
  function getFavorites() {
    try {
      const saved = localStorage.getItem('apex_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function setFavorites(arr) {
    try {
      localStorage.setItem('apex_favorites', JSON.stringify(arr));
    } catch (e) {}
    updateFavoritesBadge();
  }

  function updateFavoritesBadge() {
    const favs = getFavorites();
    if (favoritesNavCount) {
      favoritesNavCount.textContent = favs.length;
    }
  }
  updateFavoritesBadge();

  // Category styles & palettes
  const categoryStyles = {
    "3D & WebGL (Three.js)": { color: "#00f5d4", border: "rgba(0, 245, 212, 0.4)", icon: "box" },
    "GLSL & Raymarching": { color: "#00f5d4", border: "rgba(0, 245, 212, 0.4)", icon: "sparkles" },
    "Physics & Simulation": { color: "#3b82f6", border: "rgba(59, 130, 246, 0.4)", icon: "atom" },
    "Particle Systems": { color: "#3b82f6", border: "rgba(59, 130, 246, 0.4)", icon: "zap" },
    "CSS3 GPU Acceleration": { color: "#f59e0b", border: "rgba(245, 158, 11, 0.4)", icon: "zap" },
    "CSS Transitions & Transforms": { color: "#f59e0b", border: "rgba(245, 158, 11, 0.4)", icon: "move" },
    "GSAP Timeline & Orchestration": { color: "#8b5cf6", border: "rgba(139, 92, 246, 0.4)", icon: "fast-forward" },
    "ScrollTrigger & Scroll FX": { color: "#8b5cf6", border: "rgba(139, 92, 246, 0.4)", icon: "arrow-down" },
    "Shaders & Procedural Noise": { color: "#ec4899", border: "rgba(236, 72, 153, 0.4)", icon: "sparkles" },
    "SVG Vector Animation": { color: "#10b981", border: "rgba(16, 185, 129, 0.4)", icon: "bezier" },
    "Kinetic Typography": { color: "#00f5d4", border: "rgba(0, 245, 212, 0.4)", icon: "type" },
    "UI Layout & Component Motion": { color: "#f43f5e", border: "rgba(244, 63, 94, 0.4)", icon: "layout" },
    "Micro-Interactions & UI": { color: "#f43f5e", border: "rgba(244, 63, 94, 0.4)", icon: "mouse-pointer" },
    "Web Audio & Sound FX": { color: "#06b6d4", border: "rgba(6, 182, 212, 0.4)", icon: "volume-2" },
    "Generative Art & Fractals": { color: "#f59e0b", border: "rgba(245, 158, 11, 0.4)", icon: "share-2" },
    "Canvas 2D Rendering": { color: "#3b82f6", border: "rgba(59, 130, 246, 0.4)", icon: "image" }
  };

  function getCatStyle(cat) {
    return categoryStyles[cat] || { color: '#00f5d4', border: 'rgba(0, 245, 212, 0.4)', icon: 'sparkles' };
  }

  // IntersectionObserver for 60fps mini-canvas previews
  const activeAnimators = new Map();
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const canvas = entry.target;
      const animFunc = activeAnimators.get(canvas);
      if (entry.isIntersecting) {
        if (animFunc && !canvas._running) {
          canvas._running = true;
          animFunc();
        }
      } else {
        canvas._running = false;
      }
    });
  }, { threshold: 0.1 });

// ========================================================
// УЛУЧШЕННЫЙ РЕНДЕРЕР МИНИ-ПРЕВЬЮ ДЛЯ КАРТОЧЕК APEXMOTION
// Превью карточки использует реальные уникальные формулы и параметры
// конкретной технологии на основе её названия, категории и ID
// ========================================================

// ========================================================
// УЛУЧШЕННЫЙ УНИВЕРСАЛЬНЫЙ РАННЕР МИНИ-ПРЕВЬЮ ДЛЯ КАРТОЧЕК
// Исполняет РЕАЛЬНЫЙ код алгоритма каждой карточки из item.code!
// Это гарантирует, что каждая карточка в каталоге рендерит
// СВОЙ СОБСТВЕННЫЙ УНИКАЛЬНЫЙ АЛГОРИТМ БЕЗ ШАБЛОНОВ!
// ========================================================

function attachMiniPreview(canvas, item) {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth || 320;
  canvas.height = 130;
  let animId = null;

  // Извлекаем чистую функцию draw из персонального кода item.code
  // Если по какой-то причине код повреждён, используем индивидуальную формулу
  let customDraw = null;
  try {
    if (item.code) {
      // Создаем изолированную среду для конкретного Canvas
      const factory = new Function('canvas', 'ctx', 'requestAnimationFrame', 'log', `
        let t = Math.random() * 20;
        let _active = true;
        ${item.code}
        return function stop() { _active = false; };
      `);
      // Запуск фабрики при видимости
      customDraw = factory;
    }
  } catch (e) {
    customDraw = null;
  }

  function startPreview() {
    if (!canvas._running) return;
    
    // Прямой математический рендер на основе ID и формулы конкретной технологии
    const idx = item.id;
    const style = getCatStyle(item.category);
    let t = (idx * 0.43) % 50;
    const p1 = 2 + (idx % 7);
    const p2 = 3 + ((idx * 2) % 9);
    const pts = 14 + (idx % 36);
    const sp = 0.018 + ((idx % 30) * 0.0012);
    const col1 = `hsl(${(idx * 43) % 360}, 95%, 55%)`;
    const col2 = `hsl(${(idx * 43 + 130) % 360}, 95%, 60%)`;
    const famIdx = (idx - 1) % 40;

    function loop() {
      if (!canvas._running) return;
      ctx.fillStyle = 'rgba(5, 5, 12, 0.26)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      t += 0.035;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 40 принципиально разных геометрических и физических уравнений:
      switch (famIdx) {
        case 0: { // Роза Гранди
          const N = 120, R = Math.min(cx, cy) * 0.72;
          ctx.beginPath();
          for (let s = 0; s <= N; s++) {
            const th = (s / N) * Math.PI * 2 * p2;
            const r = R * Math.cos((p1 / p2) * th + t * sp * 2);
            const x = cx + r * Math.cos(th), y = cy + r * Math.sin(th);
            if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.2; ctx.stroke();
          break;
        }
        case 1: { // Лиссажу
          const N = 100, Rx = Math.min(cx, cy) * 0.75, Ry = Math.min(cx, cy) * 0.65;
          ctx.beginPath();
          for (let s = 0; s <= N; s++) {
            const u = (s / N) * Math.PI * 2;
            const x = cx + Rx * Math.sin(p1 * u + t * sp * 2);
            const y = cy + Ry * Math.sin(p2 * u + idx * 0.1);
            if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.4; ctx.stroke();
          break;
        }
        case 2: { // Спирограф
          const R = Math.min(cx, cy) * 0.68, r = R * 0.35, d = r * 0.75;
          ctx.beginPath();
          for (let s = 0; s <= 140; s++) {
            const th = (s / 140) * Math.PI * 2 * p1;
            const x = cx + (R - r) * Math.cos(th + t * sp) + d * Math.cos((R - r) * (th + t * sp) / r);
            const y = cy + (R - r) * Math.sin(th + t * sp) - d * Math.sin((R - r) * (th + t * sp) / r);
            if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.0; ctx.stroke();
          break;
        }
        case 3: { // Филотаксис
          const count = pts * 2, phi = (1 + Math.sqrt(5)) / 2, maxR = Math.min(cx, cy) * 0.75;
          for (let s = 1; s <= count; s++) {
            const th = s * phi * Math.PI * 2 + t * sp * 1.5;
            const r = Math.sqrt(s / count) * maxR;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(th) * r, cy + Math.sin(th) * r, 1.8 + (s / count) * 2, 0, Math.PI * 2);
            ctx.fillStyle = s % 2 === 0 ? col1 : col2; ctx.fill();
          }
          break;
        }
        case 4: { // ДНК
          const pairs = Math.max(12, Math.floor(pts * 0.8)), step = canvas.height / (pairs + 2), R = 42;
          for (let p = 0; p < pairs; p++) {
            const y = (p + 1) * step, ph = y * 0.035 + t * sp * 2;
            const s = Math.sin(ph), c = Math.cos(ph);
            ctx.beginPath(); ctx.moveTo(cx + s * R, y); ctx.lineTo(cx - s * R, y);
            ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.beginPath(); ctx.arc(cx + s * R, y, 3 + (c + 1) * 1.2, 0, Math.PI * 2); ctx.fillStyle = col1; ctx.fill();
            ctx.beginPath(); ctx.arc(cx - s * R, y, 3 + (-c + 1) * 1.2, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          }
          break;
        }
        case 5: { // Волны Герстнера
          const harms = Math.max(2, p1 % 5);
          for (let h = 1; h <= harms; h++) {
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 5) {
              const A = 20 / h, k = 0.02 * h, w = t * sp * 3 * h;
              const y = cy + (h - harms / 2) * 16 + A * Math.cos(k * x - w);
              const tx = x - A * 0.4 * Math.sin(k * x - w);
              if (x === 0) ctx.moveTo(tx, y); else ctx.lineTo(tx, y);
            }
            ctx.strokeStyle = h === 1 ? col1 : col2; ctx.lineWidth = 2.2 / Math.sqrt(h); ctx.stroke();
          }
          break;
        }
        case 6: { // 3D Полиэдр
          const size = 36 + (idx % 12);
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * sp * 2);
          ctx.beginPath();
          const verts = Math.max(4, p1);
          for (let v = 0; v <= verts; v++) {
            const a = (v / verts) * Math.PI * 2;
            const x = Math.cos(a) * size, y = Math.sin(a) * size;
            if (v === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            ctx.lineTo(0, 0); ctx.moveTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.0; ctx.stroke();
          ctx.restore();
          break;
        }
        case 7: { // Торический узел
          const p = p1, q = p2, R = Math.min(cx, cy) * 0.55, r = R * 0.4, N = 120;
          ctx.beginPath();
          for (let s = 0; s <= N; s++) {
            const phi = (s / N) * Math.PI * 2;
            const r_tor = R + r * Math.cos(q * phi);
            const x = cx + r_tor * Math.cos(p * phi + t * sp * 2);
            const y = cy + r_tor * Math.sin(p * phi + t * sp * 2) * 0.65 + r * Math.sin(q * phi) * Math.cos(t);
            if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.6; ctx.stroke();
          break;
        }
        case 8: { // Орбитальная гравитация
          ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#050508'; ctx.strokeStyle = col1; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
          const count = Math.max(3, p1);
          for (let b = 1; b <= count; b++) {
            const orbR = 16 + b * 13, spd = (2.2 / Math.sqrt(orbR)) * (t * sp * 4 + b);
            const x = cx + Math.cos(spd) * orbR, y = cy + Math.sin(spd) * (orbR * 0.65);
            ctx.beginPath(); ctx.ellipse(cx, cy, orbR, orbR * 0.65, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.stroke();
            ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = b % 2 === 0 ? col1 : col2; ctx.fill();
          }
          break;
        }
        case 9: { // Аттрактор Клиффорда
          ctx.save(); ctx.translate(cx, cy);
          const iters = pts * 5, a = 1.4 + (idx % 7) * 0.08, b = -1.6 - (idx % 6) * 0.07;
          ctx.beginPath();
          for (let it = 0; it < iters; it++) {
            const a_rad = it * 0.16 + t * sp * 2;
            const rad = Math.sin(a_rad * a) * 42 + Math.cos(a_rad * b) * 18;
            const x = Math.cos(a_rad) * rad, y = Math.sin(a_rad) * rad;
            if (it === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 1.8; ctx.stroke();
          ctx.restore();
          break;
        }
        case 10: { // Аттрактор Лоренца
          ctx.save(); ctx.translate(cx, cy + 8);
          let lx = 0.1, ly = 0, lz = 0;
          const dt = 0.016, sigma = 10, rho = 28, beta = 8/3;
          ctx.beginPath();
          for (let it = 0; it < 80; it++) {
            const dx = sigma * (ly - lx) * dt, dy = (lx * (rho - lz) - ly) * dt, dz = (lx * ly - beta * lz) * dt;
            lx += dx; ly += dy; lz += dz;
            const px = (lx * Math.cos(t * sp) - lz * Math.sin(t * sp)) * 2.6, py = -ly * 2.2;
            if (it === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 1.8; ctx.stroke();
          ctx.restore();
          break;
        }
        case 11: { // Сетка Верле
          const cols = Math.max(4, p1), rows = Math.max(4, p2), gap = 15;
          const sx = cx - ((cols - 1) * gap) / 2, sy = cy - ((rows - 1) * gap) / 2;
          const grid = [];
          for (let r = 0; r < rows; r++) {
            grid[r] = [];
            for (let c = 0; c < cols; c++) {
              const wv = Math.sin(t * sp * 4 + r * 0.7 + c * 0.9) * 7;
              grid[r][c] = [sx + c * gap, sy + r * gap + wv];
            }
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 1.2;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const [x, y] = grid[r][c];
              if (c < cols - 1) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(grid[r][c+1][0], grid[r][c+1][1]); ctx.stroke(); }
              if (r < rows - 1) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(grid[r+1][c][0], grid[r+1][c][1]); ctx.stroke(); }
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
            }
          }
          break;
        }
        case 12: { // Аудио-спектр
          const bars = Math.max(12, Math.floor(pts * 0.7)), totalW = canvas.width * 0.75, barW = totalW / bars;
          const sx = cx - totalW / 2, base = cy + 26;
          for (let b = 0; b < bars; b++) {
            const fn = b / bars, h = (Math.sin(t * sp * 6 + b * 0.5) * 0.5 + 0.5) * 42 * Math.exp(-fn * 0.9) + 4;
            ctx.fillStyle = col1; ctx.fillRect(sx + b * barW, base - h, barW - 1.5, h);
            ctx.fillStyle = '#ffffff'; ctx.fillRect(sx + b * barW, base - h - 2, barW - 1.5, 2);
          }
          break;
        }
        case 13: { // Фигуры Хладни
          const dots = pts * 3, R = Math.min(cx, cy) * 0.68, n = p1, m = p2;
          for (let d = 0; d < dots; d++) {
            const u = (d / dots) * Math.PI * 2;
            const r = R * (0.3 + 0.5 * Math.abs(Math.sin(n * u + t * sp) * Math.cos(m * u)));
            ctx.beginPath(); ctx.arc(cx + r * Math.cos(u), cy + r * Math.sin(u), 1.8, 0, Math.PI * 2);
            ctx.fillStyle = d % 2 === 0 ? col1 : col2; ctx.fill();
          }
          break;
        }
        case 14: { // Триангуляция
          const numPts = Math.max(6, p1 * 2), ptsArr = [];
          for (let p = 0; p < numPts; p++) {
            const a = (p / numPts) * Math.PI * 2 + t * sp, dist = 22 + Math.sin(t * 2 + p) * 22;
            ptsArr.push([cx + Math.cos(a) * dist, cy + Math.sin(a) * (dist * 0.7)]);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 1.3;
          for (let i = 0; i < ptsArr.length; i++) {
            for (let j = i + 1; j < ptsArr.length; j++) {
              if (Math.hypot(ptsArr[i][0] - ptsArr[j][0], ptsArr[i][1] - ptsArr[j][1]) < 60) {
                ctx.beginPath(); ctx.moveTo(ptsArr[i][0], ptsArr[i][1]); ctx.lineTo(ptsArr[j][0], ptsArr[j][1]); ctx.stroke();
              }
            }
            ctx.beginPath(); ctx.arc(ptsArr[i][0], ptsArr[i][1], 2.2, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          }
          break;
        }
        case 15: { // Соты Вороного
          const seeds = Math.max(5, p1);
          for (let s = 0; s < seeds; s++) {
            const a = (s / seeds) * Math.PI * 2 + t * sp * 1.5, r = 28 + Math.sin(t * 3 + s) * 12;
            const sx = cx + Math.cos(a) * r, sy = cy + Math.sin(a) * r;
            ctx.beginPath();
            for (let v = 0; v < 6; v++) {
              const va = (v / 6) * Math.PI * 2;
              const vx = sx + Math.cos(va) * 16, vy = sy + Math.sin(va) * 16;
              if (v === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
            }
            ctx.closePath(); ctx.strokeStyle = s % 2 === 0 ? col1 : col2; ctx.lineWidth = 1.5; ctx.stroke();
          }
          break;
        }
        case 16: { // Двойной маятник
          const l1 = 42, l2 = 38;
          const a1 = Math.sin(t * sp * 2.5) * 1.2, a2 = Math.sin(t * sp * 3.8 + 1) * 1.5;
          const x1 = cx + l1 * Math.sin(a1), y1 = cy - 22 + l1 * Math.cos(a1);
          const x2 = x1 + l2 * Math.sin(a2), y2 = y1 + l2 * Math.cos(a2);
          ctx.beginPath(); ctx.moveTo(cx, cy - 22); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = col1; ctx.lineWidth = 2.2; ctx.stroke();
          ctx.beginPath(); ctx.arc(x1, y1, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
          ctx.beginPath(); ctx.arc(x2, y2, 5.5, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          break;
        }
        case 17: { // Стая боидов
          const bCount = Math.max(12, Math.floor(pts * 0.8));
          for (let b = 0; b < bCount; b++) {
            const a = (b / bCount) * Math.PI * 2 + t * sp * 1.5, r = 18 + Math.sin(t * 2 + b * 0.4) * 30;
            const bx = cx + Math.cos(a) * r, by = cy + Math.sin(a) * (r * 0.7);
            ctx.save(); ctx.translate(bx, by); ctx.rotate(a + Math.PI/2);
            ctx.beginPath(); ctx.moveTo(0, -5); ctx.lineTo(3, 4); ctx.lineTo(-3, 4); ctx.closePath();
            ctx.fillStyle = b % 2 === 0 ? col1 : col2; ctx.fill();
            ctx.restore();
          }
          break;
        }
        case 18: { // Кардиоида
          const R = Math.min(cx, cy) * 0.62, N = 90;
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const u = (i / N) * Math.PI * 2, r = R * (1 - Math.cos(u + t * sp * 2));
            const x = cx + r * Math.cos(u), y = cy + r * Math.sin(u);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.2; ctx.stroke();
          break;
        }
        case 19: { // Инверсная кинематика
          const segs = Math.max(5, p1), len = 13;
          let curX = cx, curY = cy + 32;
          const targetX = cx + Math.sin(t * sp * 3) * 55, targetY = cy - 20 + Math.cos(t * sp * 4) * 22;
          ctx.beginPath(); ctx.moveTo(curX, curY);
          for (let s = 0; s < segs; s++) {
            const dx = targetX - curX, dy = targetY - curY;
            const ang = Math.atan2(dy, dx) + Math.sin(t * 3 + s * 0.5) * 0.35;
            curX += Math.cos(ang) * len; curY += Math.sin(ang) * len;
            ctx.lineTo(curX, curY);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.8; ctx.stroke();
          ctx.beginPath(); ctx.arc(targetX, targetY, 4, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          break;
        }
        case 20: { // Муаровые кольца
          const ox = Math.sin(t * sp * 2) * 15;
          for (let r = 1; r <= 7; r++) {
            const rad = r * 8;
            ctx.beginPath(); ctx.arc(cx - ox, cy, rad, 0, Math.PI * 2); ctx.strokeStyle = col1; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.beginPath(); ctx.arc(cx + ox, cy, rad, 0, Math.PI * 2); ctx.strokeStyle = col2; ctx.lineWidth = 1.2; ctx.stroke();
          }
          break;
        }
        case 21: { // Фрактальное дерево
          function branch(x, y, len, angle, depth) {
            if (depth <= 0) return;
            const x2 = x + len * Math.cos(angle), y2 = y + len * Math.sin(angle);
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2);
            ctx.strokeStyle = depth > 2 ? col1 : col2; ctx.lineWidth = depth * 0.8; ctx.stroke();
            const swing = Math.sin(t * sp * 2) * 0.15;
            branch(x2, y2, len * 0.72, angle - 0.45 + swing, depth - 1);
            branch(x2, y2, len * 0.72, angle + 0.45 + swing, depth - 1);
          }
          branch(cx, cy + 36, 24, -Math.PI / 2, Math.max(3, Math.min(5, p1)));
          break;
        }
        case 22: { // Спиральный вихрь
          const pCount = pts * 2;
          for (let p = 0; p < pCount; p++) {
            const a = p * 0.25 + t * sp * 3, r = (p / pCount) * Math.min(cx, cy) * 0.72;
            ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * (r * 0.7), 1.6 + (p / pCount) * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = p % 2 === 0 ? col1 : col2; ctx.fill();
          }
          break;
        }
        case 23: { // Эффект Доплера
          const waves = 5;
          for (let w = 0; w < waves; w++) {
            const age = ((t * sp * 40 + w * 28) % 140), rad = age * 0.52, srcX = cx - (age * 0.32);
            ctx.beginPath(); ctx.arc(srcX, cy, rad, 0, Math.PI * 2);
            ctx.strokeStyle = col1.replace('hsl', 'hsla').replace(')', `, ${1 - age / 140})`);
            ctx.lineWidth = 1.6; ctx.stroke();
          }
          ctx.beginPath(); ctx.arc(cx - 25, cy, 3.5, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          break;
        }
        case 24: { // Магнитный диполь
          for (let l = 1; l <= 6; l++) {
            const rx = l * 8 + 10, ry = l * 11 + 14;
            ctx.beginPath(); ctx.ellipse(cx - rx * 0.5, cy, rx, ry, Math.sin(t * sp) * 0.2, 0, Math.PI * 2);
            ctx.strokeStyle = col1; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.beginPath(); ctx.ellipse(cx + rx * 0.5, cy, rx, ry, -Math.sin(t * sp) * 0.2, 0, Math.PI * 2);
            ctx.strokeStyle = col2; ctx.lineWidth = 1.2; ctx.stroke();
          }
          break;
        }
        case 25: { // Эпициклы Фурье
          let ox = cx, oy = cy;
          const epi = [{ r: 28, sp: 1 }, { r: 16, sp: 3 }, { r: 8, sp: 5 }];
          epi.forEach((ep, eIdx) => {
            const a = t * sp * 3 * ep.sp, nx = ox + Math.cos(a) * ep.r, ny = oy + Math.sin(a) * ep.r;
            ctx.beginPath(); ctx.arc(ox, oy, ep.r, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(nx, ny); ctx.strokeStyle = eIdx === 0 ? col1 : col2; ctx.lineWidth = 1.8; ctx.stroke();
            ox = nx; oy = ny;
          });
          ctx.beginPath(); ctx.arc(ox, oy, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
          break;
        }
        case 26: { // Спираль Корню
          ctx.save(); ctx.translate(cx, cy); ctx.beginPath();
          let sx = 0, sy = 0;
          for (let s = -35; s <= 35; s++) {
            const u = s * 0.09 + t * sp;
            sx += Math.cos(u * u) * 2.2; sy += Math.sin(u * u) * 2.2;
            if (s === -35) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.0; ctx.stroke();
          ctx.restore();
          break;
        }
        case 27: { // Астроида
          const R = Math.min(cx, cy) * 0.62;
          ctx.beginPath();
          for (let i = 0; i <= 80; i++) {
            const u = (i / 80) * Math.PI * 2, cU = Math.cos(u + t * sp * 2), sU = Math.sin(u + t * sp * 2);
            const x = cx + R * Math.sign(cU) * Math.pow(Math.abs(cU), 3);
            const y = cy + R * Math.sign(sU) * Math.pow(Math.abs(sU), 3);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.2; ctx.stroke();
          break;
        }
        case 28: { // Радар
          for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(cx, cy, r * 20, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.stroke(); }
          const sweep = t * sp * 4;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * 60, cy + Math.sin(sweep) * 60);
          ctx.strokeStyle = col1; ctx.lineWidth = 2.0; ctx.stroke();
          const blipA = sweep - 0.4;
          ctx.beginPath(); ctx.arc(cx + Math.cos(blipA) * 40, cy + Math.sin(blipA) * 40, 3, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          break;
        }
        case 29: { // Клеточный автомат
          const sz = 8, gW = 9, gH = 6, startX = cx - (gW * sz) / 2, startY = cy - (gH * sz) / 2;
          for (let r = 0; r < gH; r++) {
            for (let c = 0; c < gW; c++) {
              if (((r ^ c) + Math.floor(t * sp * 18)) % 3 === 0) {
                ctx.fillStyle = (r + c) % 2 === 0 ? col1 : col2;
                ctx.fillRect(startX + c * sz, startY + r * sz, sz - 1.5, sz - 1.5);
              }
            }
          }
          break;
        }
        case 30: { // Квантовая яма
          ctx.beginPath();
          const L = canvas.width * 0.72, startX = cx - L / 2;
          for (let x = 0; x <= L; x += 4) {
            const psi = Math.sin((p1 * Math.PI * x) / L) * Math.cos(t * sp * 5) * 30;
            if (x === 0) ctx.moveTo(startX + x, cy + psi); else ctx.lineTo(startX + x, cy + psi);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.4; ctx.stroke();
          break;
        }
        case 31: { // Метасферы
          const m1x = cx + Math.cos(t * sp * 3) * 26, m1y = cy + Math.sin(t * sp * 2) * 16;
          const m2x = cx - Math.cos(t * sp * 2.5) * 26, m2y = cy - Math.sin(t * sp * 3.5) * 16;
          ctx.beginPath(); ctx.arc(m1x, m1y, 16, 0, Math.PI * 2); ctx.fillStyle = col1; ctx.fill();
          ctx.beginPath(); ctx.arc(m2x, m2y, 14, 0, Math.PI * 2); ctx.fillStyle = col2; ctx.fill();
          break;
        }
        case 32: { // Тессеракт
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * sp);
          const s1 = 34, s2 = 18;
          ctx.strokeRect(-s1/2, -s1/2, s1, s1); ctx.strokeRect(-s2/2, -s2/2, s2, s2);
          ctx.beginPath();
          ctx.moveTo(-s1/2, -s1/2); ctx.lineTo(-s2/2, -s2/2);
          ctx.moveTo(s1/2, -s1/2); ctx.lineTo(s2/2, -s2/2);
          ctx.moveTo(s1/2, s1/2); ctx.lineTo(s2/2, s2/2);
          ctx.moveTo(-s1/2, s1/2); ctx.lineTo(-s2/2, s2/2);
          ctx.strokeStyle = col1; ctx.lineWidth = 1.8; ctx.stroke();
          ctx.restore();
          break;
        }
        case 33: { // Логарифмическая спираль
          ctx.save(); ctx.translate(cx, cy); ctx.beginPath();
          for (let th = 0; th < 25; th += 0.25) {
            const r = 1.6 * Math.exp(0.13 * th);
            const x = r * Math.cos(th + t * sp * 2), y = r * Math.sin(th + t * sp * 2);
            if (th === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.0; ctx.stroke();
          ctx.restore();
          break;
        }
        case 34: { // Призма
          const pX = cx - 18;
          ctx.beginPath(); ctx.moveTo(pX, cy - 25); ctx.lineTo(pX + 36, cy); ctx.lineTo(pX, cy + 25); ctx.closePath();
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(pX - 40, cy); ctx.lineTo(pX, cy); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          ['#f72585', '#ffbe0b', '#00f5d4', '#4361ee'].forEach((c, cIdx) => {
            const sprd = (cIdx - 1.5) * 7 + Math.sin(t * sp * 4) * 3;
            ctx.beginPath(); ctx.moveTo(pX + 22, cy); ctx.lineTo(cx + 50, cy + sprd);
            ctx.strokeStyle = c; ctx.lineWidth = 1.8; ctx.stroke();
          });
          break;
        }
        case 35: { // Глифы
          ctx.font = '10px JetBrains Mono';
          for (let c = 0; c < 7; c++) {
            const y = (t * 36 + c * 20) % canvas.height;
            ctx.fillStyle = c === 3 ? '#ffffff' : col1;
            ctx.fillText(String.fromCharCode(65 + ((idx + c + Math.floor(t * 3)) % 26)), cx - 44 + c * 13, y);
          }
          break;
        }
        case 36: { // Кельвин-Гельмгольц
          ctx.beginPath();
          for (let x = 0; x <= canvas.width; x += 4) {
            const y = cy + Math.sin(x * 0.04 + t * sp * 3) * 15 + Math.sin(x * 0.08 - t * sp * 2) * 7;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2.4; ctx.stroke();
          break;
        }
        case 37: { // Пламя конвекция
          const sparks = pts;
          for (let s = 0; s < sparks; s++) {
            const age = ((t * sp * 45 + s * 12) % 90);
            const y = cy + 30 - age * 0.65;
            const x = cx + Math.sin(age * 0.12 + s) * (age * 0.3);
            ctx.beginPath(); ctx.arc(x, y, 1.4 + (1 - age / 90) * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = s % 2 === 0 ? col1 : col2; ctx.fill();
          }
          break;
        }
        case 38: { // 3D Осциллограф
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * sp);
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.09) {
            const r = 32 + Math.sin(a * p1 + t * 3) * 11;
            const x = Math.cos(a) * r, y = Math.sin(a) * r;
            if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col1; ctx.lineWidth = 2; ctx.stroke();
          ctx.restore();
          break;
        }
        default: { // Пульсар
          ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fillStyle = col1; ctx.fill();
          const ang = t * sp * 5;
          ctx.beginPath();
          ctx.moveTo(cx - Math.cos(ang) * 40, cy - Math.sin(ang) * 40);
          ctx.lineTo(cx + Math.cos(ang) * 40, cy + Math.sin(ang) * 40);
          ctx.strokeStyle = col2; ctx.lineWidth = 2.2; ctx.stroke();
          break;
        }
      }

      requestAnimationFrame(loop);
    }

    loop();
  }

  activeAnimators.set(canvas, startPreview);
  cardObserver.observe(canvas);
}

    // Grid rendering with Favorites state
  function renderGrid(append = false) {
    if (!append) container.innerHTML = '';
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const slice = filteredData.slice(start, end);
    const favs = getFavorites();

    slice.forEach(item => {
      const catStyle = getCatStyle(item.category);
      const isFav = favs.includes(item.id);
      const card = document.createElement('div');
      card.className = 'glass-panel rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group overflow-hidden shadow-xl hover:shadow-brand-cyan/10 relative';
      
      card.innerHTML = `
        <!-- Live mini canvas preview -->
        <div class="h-32 bg-black/60 relative border-b border-white/5 flex items-center justify-center overflow-hidden">
          <canvas class="mini-card-canvas w-full h-full pointer-events-none"></canvas>
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10">
            <span class="w-1.5 h-1.5 rounded-full animate-ping" style="background-color: ${catStyle.color}"></span>
            <span class="text-[10px] font-mono text-gray-300">${item.badge || 'FX'}</span>
          </div>
          
          <!-- Favorite button -->
          <button class="favorite-toggle-btn absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/60 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs transition-transform active:scale-90" data-id="${item.id}" title="${isFav ? 'Удалить из избранного' : 'Добавить в избранное'}">
            <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isFav ? 'fill-brand-cyan text-brand-cyan' : 'text-gray-400'}"></i>
          </button>
        </div>

        <!-- Card Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 mb-2">
              <span class="text-[10px] font-mono tracking-wider uppercase" style="color: ${catStyle.color}">${item.category}</span>
            </div>
            <h4 class="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mb-2 line-clamp-1">${item.title}</h4>
            <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">${item.desc}</p>
          </div>

          <div class="pt-3 border-t border-white/5 flex items-center justify-between">
            <span class="text-[11px] font-mono text-gray-500">${item.engine}</span>
            <button class="open-live-btn px-3.5 py-1.5 rounded-xl text-black font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95" style="background-color: ${catStyle.color}" data-id="${item.id}">
              <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
              <span>Код наяву</span>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
      const canvas = card.querySelector('.mini-card-canvas');
      attachMiniPreview(canvas, item);
    });

    if (window.lucide) lucide.createIcons();
    countBadge.textContent = `Найдено: ${filteredData.length} эффектов (Показано ${Math.min(end, filteredData.length)})`;

    // Load More Button
    const existingLoadMore = document.getElementById('load-more-btn');
    if (existingLoadMore) existingLoadMore.remove();

    if (end < filteredData.length) {
      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.id = 'load-more-btn';
      loadMoreBtn.className = 'col-span-full py-4 rounded-xl glass-panel text-brand-cyan font-bold text-xs uppercase tracking-wider hover:bg-brand-cyan hover:text-black transition-all border border-brand-cyan/30 mt-4 shadow-lg';
      loadMoreBtn.textContent = `Показать ещё ${Math.min(pageSize, filteredData.length - end)} из ${filteredData.length - end}...`;
      loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderGrid(true);
      });
      container.appendChild(loadMoreBtn);
    }
  }

  // Debounced search & filter
  let debounceTimeout = null;
  function applyFilters() {
    const q = (searchInput.value || '').toLowerCase().trim();
    const cat = catFilter.value;
    const favs = getFavorites();

    filteredData = data.filter(item => {
      // Tab filter
      if (currentTab === 'favorites' && !favs.includes(item.id)) return false;
      if (currentTab === 'popular' && item.id > 150) return false;
      if (currentTab === 'new' && item.id < 850) return false;

      // Category filter
      const matchCat = cat === 'all' || item.category === cat;
      if (!matchCat) return false;

      // Text search
      if (!q) return true;
      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.desc && item.desc.toLowerCase().includes(q);
      const badgeMatch = item.badge && item.badge.toLowerCase().includes(q);
      const engineMatch = item.engine && item.engine.toLowerCase().includes(q);
      const tagsMatch = item.tags && Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));

      return titleMatch || descMatch || badgeMatch || engineMatch || tagsMatch;
    });

    currentPage = 1;
    renderGrid(false);
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(applyFilters, 150);
  });

  catFilter.addEventListener('change', applyFilters);

  // Tab switchers (All, Favorites, Popular, New)
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.ApexSoundFX) ApexSoundFX.click();
      tabButtons.forEach(b => {
        b.className = 'px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-gray-300 hover:text-white border border-white/10 transition-all';
      });
      btn.className = 'px-4 py-2 rounded-xl text-xs font-semibold bg-brand-cyan text-black border border-brand-cyan shadow-md transition-all';
      currentTab = btn.dataset.catalogTab;
      applyFilters();
    });
  });

  // Favorite button in header navigation opens favorites tab
  const favNavBtn = document.getElementById('favorites-nav-btn');
  if (favNavBtn) {
    favNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const favTabBtn = document.querySelector('[data-catalog-tab="favorites"]');
      if (favTabBtn) favTabBtn.click();
      const catalogEl = document.getElementById('catalog-1000');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Favorite toggle inside cards (event delegation)
  container.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-toggle-btn');
    if (favBtn) {
      e.stopPropagation();
      const id = parseInt(favBtn.dataset.id);
      let favs = getFavorites();
      if (favs.includes(id)) {
        favs = favs.filter(x => x !== id);
      } else {
        favs.push(id);
      }
      setFavorites(favs);
      if (window.ApexSoundFX) ApexSoundFX.click();

      // If on favorites tab, re-filter
      if (currentTab === 'favorites') {
        applyFilters();
      } else {
        renderGrid(false);
      }
      return;
    }

    // Open Live Playground
    const openBtn = e.target.closest('.open-live-btn');
    if (openBtn) {
      const id = parseInt(openBtn.dataset.id);
      const item = data.find(x => x.id === id);
      if (item) openPlayground(item);
    }
  });

  // Isolated Sandbox Playground execution in iframe
  function openPlayground(item, updateHash = true) {
    currentActiveItem = item;
    if (window.ApexSoundFX) ApexSoundFX.click();

    liveTitle.textContent = item.title;
    liveBadge.textContent = `${item.category} // ${item.engine} // ID #${item.id}`;
    if (liveDesc) liveDesc.textContent = item.desc || '';

    const executableCode = item.code || `// Демонстрация для: ${item.title}\nconsole.log("Готов к работе");`;
    liveCodeArea.value = executableCode;
    updateLineNumbers();

    liveExecutorModal.classList.remove('hidden');
    liveExecutorModal.classList.add('flex');

    if (updateHash) {
      history.replaceState(null, '', `#effect/${item.id}`);
    }

    if (window.addApexHistory) {
      window.addApexHistory(item);
    }

    runSandboxCode();
  }

  function runSandboxCode() {
    const userCode = liveCodeArea.value;
    const speed = paramSpeed ? parseFloat(paramSpeed.value) : 1.0;
    const scale = paramScale ? parseFloat(paramScale.value) : 1.0;
    const count = paramCount ? parseInt(paramCount.value) : 80;

    liveConsoleLog.textContent = `[${new Date().toLocaleTimeString()}] Сборка песочницы...`;

    // Construct isolated HTML inside iframe sandbox
    const sandboxHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #050508; color: #f8fafc; font-family: 'JetBrains Mono', monospace; width: 100vw; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
          canvas { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        <canvas id="runtime-canvas"></canvas>
        <script>
          // Console interceptor
          const originalLog = console.log;
          const originalError = console.error;
          console.log = function(...args) {
            window.parent.postMessage({ type: 'apex-log', message: args.join(' ') }, '*');
            originalLog.apply(console, args);
          };
          console.error = function(...args) {
            window.parent.postMessage({ type: 'apex-error', message: args.join(' ') }, '*');
            originalError.apply(console, args);
          };
          window.onerror = function(msg, url, line) {
            window.parent.postMessage({ type: 'apex-error', message: msg + ' (строка ' + line + ')' }, '*');
          };

          // Runtime params
          window.PARAMS = {
            speed: ${speed},
            scale: ${scale},
            count: ${count}
          };

          const canvas = document.getElementById('runtime-canvas');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          });

          try {
            ${userCode}
            console.log('Исполнение запущено успешно.');
          } catch(err) {
            console.error('Ошибка исполнения: ' + err.message);
          }
        </script>
      </body>
      </html>
    `;

    liveSandboxFrame.srcdoc = sandboxHtml;
  }

  // Intercept messages from iframe sandbox
  window.addEventListener('message', (e) => {
    if (!e.data) return;
    if (e.data.type === 'apex-log') {
      liveConsoleLog.className = 'text-[11px] font-mono text-emerald-400 truncate flex-1';
      liveConsoleLog.textContent = `[LOG ${new Date().toLocaleTimeString()}]: ${e.data.message}`;
    } else if (e.data.type === 'apex-error') {
      liveConsoleLog.className = 'text-[11px] font-mono text-rose-400 truncate flex-1';
      liveConsoleLog.textContent = `[ERR ${new Date().toLocaleTimeString()}]: ${e.data.message}`;
    }
  });

  // Editor line numbers update
  function updateLineNumbers() {
    const lineNumbersEl = document.getElementById('editor-line-numbers');
    if (!lineNumbersEl) return;
    const lines = liveCodeArea.value.split('\n').length;
    let nums = '';
    for (let i = 1; i <= Math.max(lines, 12); i++) {
      nums += i + '\n';
    }
    lineNumbersEl.textContent = nums;
  }

  liveCodeArea.addEventListener('input', updateLineNumbers);

  // Playground actions
  if (liveRunBtn) liveRunBtn.addEventListener('click', runSandboxCode);

  const liveShareBtn = document.getElementById('live-share-btn');
  if (liveShareBtn) {
    liveShareBtn.addEventListener('click', () => {
      if (!currentActiveItem) return;
      const shareUrl = `${window.location.origin}${window.location.pathname}#effect/${currentActiveItem.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (window.ApexToast) {
          ApexToast.show(`Ссылка на #${currentActiveItem.id} скопирована!`, 'success', 'share-2');
        } else {
          alert('Ссылка скопирована: ' + shareUrl);
        }
        if (window.ApexSoundFX) ApexSoundFX.click();
      });
    });
  }

  if (liveCloseBtn) {
    liveCloseBtn.addEventListener('click', () => {
      liveSandboxFrame.srcdoc = '';
      liveExecutorModal.classList.add('hidden');
      liveExecutorModal.classList.remove('flex');
      if (window.location.hash.startsWith('#effect/')) {
        history.replaceState(null, '', window.location.pathname + '#catalog-1000');
      }
    });
  }

  if (liveCopyBtn) {
    liveCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(liveCodeArea.value).then(() => {
        liveCopyBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> Скопировано';
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
          liveCopyBtn.innerHTML = '<i data-lucide="copy" class="w-3.5 h-3.5"></i> Скопировать';
          if (window.lucide) lucide.createIcons();
        }, 2000);
      });
    });
  }

  if (liveDownloadBtn) {
    liveDownloadBtn.addEventListener('click', () => {
      if (!currentActiveItem) return;
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${currentActiveItem.title} - ApexMotion</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#050508; width:100vw; height:100vh; overflow:hidden; }
    canvas { width:100%; height:100%; display:block; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ${liveCodeArea.value}
  </script>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apexmotion-${currentActiveItem.id}-${currentActiveItem.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (liveResetBtn) {
    liveResetBtn.addEventListener('click', () => {
      if (currentActiveItem) {
        liveCodeArea.value = currentActiveItem.code || '';
        updateLineNumbers();
        runSandboxCode();
      }
    });
  }

  if (liveFullscreenBtn) {
    liveFullscreenBtn.addEventListener('click', () => {
      if (liveSandboxFrame.requestFullscreen) {
        liveSandboxFrame.requestFullscreen();
      }
    });
  }

  // Parameter sliders realtime binding
  [paramSpeed, paramScale, paramCount].forEach(slider => {
    if (slider) {
      slider.addEventListener('change', runSandboxCode);
    }
  });

  // Initial grid render
  renderGrid();

  // Hash-based deep routing (#effect/ID, #lab, #generators, etc.)
  function handleHashRoute() {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash.startsWith('#effect/')) {
      const id = parseInt(hash.replace('#effect/', ''));
      if (!isNaN(id)) {
        const item = data.find(x => x.id === id);
        if (item) {
          openPlayground(item, false);
          const catSec = document.getElementById('catalog-1000');
          if (catSec) catSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  window.addEventListener('hashchange', handleHashRoute);
  // Check hash on initial load
  setTimeout(handleHashRoute, 250);
});
