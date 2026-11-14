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

  function attachMiniPreview(canvas, item) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 320;
    canvas.height = 130;
    const idx = item.id;
    const style = getCatStyle(item.category);
    let t = (idx * 0.15) % 10;

    function render() {
      if (!canvas._running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.035;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const mode = idx % 10;

      if (mode === 0) {
        // Lissajous Knot
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const u = (i / 60) * Math.PI * 2;
          const x = cx + Math.cos(2 * u + t) * 55;
          const y = cy + Math.sin(3 * u) * 40;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = style.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
      } else if (mode === 1) {
        // Spiral of points
        for (let i = 0; i < 24; i++) {
          const a = i * 0.4 + t;
          const r = Math.sqrt(i) * 11;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? style.color : '#f8fafc';
          ctx.fill();
        }
      } else if (mode === 2) {
        // DNA Double Helix
        for (let i = 0; i < 14; i++) {
          const x = cx - 70 + i * 11;
          const p = x * 0.04 + t;
          const y1 = cy + Math.sin(p) * 28;
          const y2 = cy + Math.sin(p + Math.PI) * 28;
          ctx.beginPath();
          ctx.moveTo(x, y1); ctx.lineTo(x, y2);
          ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y1, 3, 0, Math.PI * 2);
          ctx.fillStyle = style.color; ctx.fill();
          ctx.beginPath(); ctx.arc(x, y2, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6'; ctx.fill();
        }
      } else if (mode === 3) {
        // Equalizer Wave
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = cy + Math.sin(x * 0.04 + t * 2) * 22 * Math.sin(t * 0.8);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 2; ctx.stroke();
      } else if (mode === 4) {
        // Orbitals
        ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = style.color; ctx.fill();
        for (let i = 1; i <= 4; i++) {
          const r = i * 13;
          const a = t * (2 / Math.sqrt(r)) + i;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * (r * 0.6);
          ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6'; ctx.fill();
        }
      } else if (mode === 5) {
        // Rotating Polygon
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t);
        ctx.beginPath();
        const sides = 6;
        for (let i = 0; i <= sides; i++) {
          const a = (i / sides) * Math.PI * 2;
          const x = Math.cos(a) * 32;
          const y = Math.sin(a) * 32;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 1.8; ctx.stroke();
        ctx.restore();
      } else if (mode === 6) {
        // Concentric Rings
        for (let r = 8; r < 52; r += 11) {
          const rad = (r + t * 14) % 52;
          ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 245, 212, ${1 - rad / 52})`; ctx.stroke();
        }
      } else if (mode === 7) {
        // Matrix Stream
        ctx.font = '11px JetBrains Mono';
        ctx.fillStyle = style.color;
        for (let c = 0; c < 8; c++) {
          const y = (t * 35 + c * 22) % canvas.height;
          ctx.fillText(String.fromCharCode(65 + ((idx + c) % 26)), cx - 60 + c * 16, y);
        }
      } else if (mode === 8) {
        // Spring Points Grid
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 5; c++) {
            const x = cx - 40 + c * 20 + Math.sin(t + r) * 4;
            const y = cy - 20 + r * 20 + Math.cos(t + c) * 4;
            ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = style.color; ctx.fill();
          }
        }
      } else {
        // Kinematic Arm
        ctx.beginPath(); ctx.moveTo(cx, cy + 28);
        let curX = cx, curY = cy + 28;
        for (let i = 0; i < 5; i++) {
          const a = Math.sin(t * 2 + i * 0.5) * 0.8 - Math.PI / 2;
          curX += Math.cos(a) * 13; curY += Math.sin(a) * 13;
          ctx.lineTo(curX, curY);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 2.5; ctx.stroke();
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
  function openPlayground(item) {
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

  if (liveCloseBtn) {
    liveCloseBtn.addEventListener('click', () => {
      liveSandboxFrame.srcdoc = '';
      liveExecutorModal.classList.add('hidden');
      liveExecutorModal.classList.remove('flex');
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
});
