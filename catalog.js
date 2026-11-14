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

function attachMiniPreview(canvas, item) {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth || 320;
  canvas.height = 130;
  const idx = item.id;
  const style = getCatStyle(item.category);
  const title = (item.title || '').toLowerCase();
  let t = (idx * 0.37) % 20;

  // Определение визуального типа на основе реального названия технологии
  let fxType = 'poly';
  if (title.includes('knot') || title.includes('узел') || title.includes('torus') || title.includes('тор')) fxType = 'knot';
  else if (title.includes('dna') || title.includes('днк') || title.includes('helix') || title.includes('спирал')) fxType = 'dna';
  else if (title.includes('wave') || title.includes('волна') || title.includes('gerstner') || title.includes('герстнер') || title.includes('ocean')) fxType = 'wave';
  else if (title.includes('pendulum') || title.includes('маятник') || title.includes('chaos') || title.includes('хаос') || title.includes('attractor') || title.includes('клиффорд')) fxType = 'chaos';
  else if (title.includes('gravity') || title.includes('гравитац') || title.includes('black hole') || title.includes('дыра') || title.includes('orbit') || title.includes('орбит')) fxType = 'orbit';
  else if (title.includes('sdf') || title.includes('raymarch') || title.includes('noise') || title.includes('шум') || title.includes('voronoi') || title.includes('mandelbrot')) fxType = 'noise';
  else if (title.includes('text') || title.includes('текст') || title.includes('font') || title.includes('scramble') || title.includes('глиф') || title.includes('matrix')) fxType = 'matrix';
  else if (title.includes('audio') || title.includes('звук') || title.includes('sound') || title.includes('частот') || title.includes('синтез') || title.includes('эквалайзер') || title.includes('спектр')) fxType = 'audio';
  else if (title.includes('cloth') || title.includes('ткань') || title.includes('spring') || title.includes('пруж') || title.includes('сетка') || title.includes('решетка')) fxType = 'cloth';
  else if (title.includes('particle') || title.includes('частиц') || title.includes('boids') || title.includes('стая') || title.includes('салют') || title.includes('взрыв')) fxType = 'particles';
  else if (title.includes('morph') || title.includes('морфинг') || title.includes('bezier') || title.includes('крив') || title.includes('svg')) fxType = 'morph';
  else {
    // Детерминированный выбор из богатого набора по ID
    const types = ['poly', 'knot', 'dna', 'wave', 'chaos', 'orbit', 'matrix', 'audio', 'cloth', 'particles', 'morph'];
    fxType = types[idx % types.length];
  }

  // Индивидуальные коэффициенты для каждой из 998 технологий
  const seed = (idx * 9301 + 49297) % 233280;
  const p1 = 2 + (idx % 5);
  const p2 = 3 + (idx % 7);
  const speed = 0.02 + ((seed % 100) / 100) * 0.025;
  const particleColor = (idx % 2 === 0) ? style.color : '#f72585';
  const secondaryColor = (idx % 3 === 0) ? '#ffbe0b' : '#3b82f6';

  function render() {
    if (!canvas._running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += speed;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    switch (fxType) {
      case 'knot': {
        // Торический узел с уникальными p, q
        ctx.beginPath();
        const N = 80;
        const R = 38 + (idx % 12);
        const r = R * 0.4;
        for (let i = 0; i <= N; i++) {
          const phi = (i / N) * Math.PI * 2;
          const r_torus = R + r * Math.cos(p2 * phi);
          const x = cx + r_torus * Math.cos(p1 * phi + t);
          const y = cy + r_torus * Math.sin(p1 * phi + t) * 0.65 + r * Math.sin(p2 * phi) * Math.cos(t * 0.5);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = style.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;
      }

      case 'dna': {
        // Двойная спираль
        const count = 16;
        const R = 32 + (idx % 10);
        for (let i = 0; i < count; i++) {
          const x = cx - 65 + i * 9;
          const p = x * 0.045 + t;
          const y1 = cy + Math.sin(p) * R;
          const y2 = cy + Math.sin(p + Math.PI) * R;
          ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2);
          ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y1, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = style.color; ctx.fill();
          ctx.beginPath(); ctx.arc(x, y2, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = particleColor; ctx.fill();
        }
        break;
      }

      case 'wave': {
        // Трохоидальные гидродинамические волны
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = cy + Math.sin(x * 0.035 * (1 + (idx % 3) * 0.2) + t * 1.5) * 22 + Math.cos(x * 0.015 - t) * 8;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = style.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;
      }

      case 'orbit': {
        // Черная дыра и орбитальные частицы
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#000000'; ctx.fill();
        ctx.strokeStyle = style.color; ctx.lineWidth = 1.5; ctx.stroke();
        const bodies = 4 + (idx % 4);
        for (let i = 1; i <= bodies; i++) {
          const r = 16 + i * 11;
          const a = t * (2.2 / Math.sqrt(r)) + (i * 1.4 + idx);
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * (r * 0.62);
          ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = (i % 2 === 0) ? style.color : secondaryColor;
          ctx.fill();
        }
        break;
      }

      case 'matrix': {
        // Матричный декодер глифов
        ctx.font = '10px JetBrains Mono';
        const cols = 7;
        for (let c = 0; c < cols; c++) {
          const y = (t * 40 + c * 20 + (idx * 5)) % canvas.height;
          ctx.fillStyle = (c === 3) ? '#ffffff' : style.color;
          ctx.fillText(String.fromCharCode(65 + ((idx + c + Math.floor(t * 3)) % 26)), cx - 45 + c * 15, y);
        }
        break;
      }

      case 'audio': {
        // Спектрограмма аудио-эквалайзера
        const bars = 18;
        const barW = 7;
        const startX = cx - (bars * barW) / 2;
        for (let i = 0; i < bars; i++) {
          const h = (Math.sin(t * 3.5 + i * 0.5) * 0.5 + 0.5) * 45 + 5;
          ctx.fillStyle = style.color;
          ctx.fillRect(startX + i * barW, cy + 22 - h, barW - 2, h);
        }
        break;
      }

      case 'chaos': {
        // Двойной хаотический маятник / аттрактор
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        for (let i = 0; i < 40; i++) {
          const a = i * 0.18 + t;
          const r = Math.sin(a * p1) * 35;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
        break;
      }

      case 'cloth': {
        // Эластичная пружинная сетка
        const rCols = 5, rRows = 3;
        for (let r = 0; r < rRows; r++) {
          for (let c = 0; c < rCols; c++) {
            const x = cx - 36 + c * 18 + Math.sin(t * 2 + r * 0.8) * 4;
            const y = cy - 18 + r * 18 + Math.cos(t * 2 + c * 0.8) * 4;
            ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = (r + c) % 2 === 0 ? style.color : secondaryColor;
            ctx.fill();
          }
        }
        break;
      }

      case 'particles': {
        // Эмиттер частиц с разлетом
        const pCount = 14;
        for (let i = 0; i < pCount; i++) {
          const a = (i / pCount) * Math.PI * 2 + t * 0.5;
          const dist = ((t * 28 + i * 7) % 45);
          const x = cx + Math.cos(a) * dist;
          const y = cy + Math.sin(a) * dist;
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = style.color; ctx.fill();
        }
        break;
      }

      case 'morph': {
        // Морфинг замкнутого полигона
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        const sides = 3 + (idx % 5);
        for (let i = 0; i <= sides; i++) {
          const a = (i / sides) * Math.PI * 2 + t;
          const r = 26 + Math.sin(t * 3 + i) * 8;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();
        break;
      }

      default: {
        // 3D Каркасный икосаэдр/куб
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.8);
        ctx.beginPath();
        const size = 26;
        ctx.strokeRect(-size/2, -size/2, size, size);
        ctx.rotate(t * 0.5);
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
        break;
      }
    }

    requestAnimationFrame(render);
  }

  activeAnimators.set(canvas, render);
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
