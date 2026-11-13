// Модуль каталога 1000 технологий с ЖИВЫМИ интерактивными анимациями в каждой карточке
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tech-1000-grid');
  const searchInput = document.getElementById('tech-search');
  const catFilter = document.getElementById('tech-cat-filter');
  const countBadge = document.getElementById('tech-count-badge');
  const liveExecutorModal = document.getElementById('live-executor-modal');
  const liveTitle = document.getElementById('live-modal-title');
  const liveBadge = document.getElementById('live-modal-badge');
  const liveCodeArea = document.getElementById('live-code-area');
  const liveConsoleLog = document.getElementById('live-console-log');
  const liveCanvas = document.getElementById('live-runtime-canvas');
  const liveRunBtn = document.getElementById('live-run-btn');
  const liveCloseBtn = document.getElementById('live-close-btn');

  if (!window.TECHNOLOGIES_1000 || !container) return;

  const data = window.TECHNOLOGIES_1000;
  let currentPage = 1;
  const pageSize = 24; // Оптимально для производительности
  let filteredData = [...data];

  // Цвета и иконки по категориям для визуального разнообразия
  const categoryStyles = {
    "3D & WebGL (Three.js / GLSL)": { color: "#00f5d4", border: "rgba(0, 245, 212, 0.4)", icon: "box", bg: "rgba(0, 245, 212, 0.1)" },
    "Физика & Симуляции (Canvas 2D)": { color: "#f72585", border: "rgba(247, 37, 133, 0.4)", icon: "atom", bg: "rgba(247, 37, 133, 0.1)" },
    "CSS3 Hardware Acceleration (GPU)": { color: "#ffb703", border: "rgba(255, 183, 3, 0.4)", icon: "zap", bg: "rgba(255, 183, 3, 0.1)" },
    "GSAP 3 & Timeline Orchestration": { color: "#4361ee", border: "rgba(67, 97, 238, 0.4)", icon: "fast-forward", bg: "rgba(67, 97, 238, 0.1)" },
    "Шейдеры & Процедурный шум": { color: "#7b2cbf", border: "rgba(123, 44, 191, 0.4)", icon: "sparkles", bg: "rgba(123, 44, 191, 0.1)" },
    "SVG & Векторный морфинг": { color: "#10b981", border: "rgba(16, 185, 129, 0.4)", icon: "bezier", bg: "rgba(16, 185, 129, 0.1)" },
    "Кинетическая типографика": { color: "#00f5d4", border: "rgba(0, 245, 212, 0.4)", icon: "type", bg: "rgba(0, 245, 212, 0.1)" },
    "Микро-взаимодействия & UI": { color: "#f72585", border: "rgba(247, 37, 133, 0.4)", icon: "mouse-pointer", bg: "rgba(247, 37, 133, 0.1)" },
    "Web Audio API & Процедурный звук": { color: "#3a86ff", border: "rgba(58, 134, 255, 0.4)", icon: "volume-2", bg: "rgba(58, 134, 255, 0.1)" },
    "Генеративное искусство & Фракталы": { color: "#ffb703", border: "rgba(255, 183, 3, 0.4)", icon: "share-2", bg: "rgba(255, 183, 3, 0.1)" }
  };

  // Менеджер анимаций видимых мини-холстов (IntersectionObserver)
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

  // Создание уникального живого рендера для каждой мини-карточки
  function attachMiniPreview(canvas, item) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 320;
    canvas.height = 130;
    const idx = item.id;
    const cat = item.category;
    const style = categoryStyles[cat] || { color: '#00f5d4' };
    let t = Math.random() * 10;

    function render() {
      if (!canvas._running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.04;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const mode = idx % 10;

      if (mode === 0) {
        // Лиссажу узел
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const u = (i / 60) * Math.PI * 2;
          const x = cx + Math.cos(2 * u + t) * 55;
          const y = cy + Math.sin(3 * u) * 40;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = style.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
      } else if (mode === 1) {
        // Спираль точек
        for (let i = 0; i < 24; i++) {
          const a = i * 0.4 + t;
          const r = Math.sqrt(i) * 11;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? style.color : '#ffffff';
          ctx.fill();
        }
      } else if (mode === 2) {
        // ДНК Спираль
        for (let i = 0; i < 14; i++) {
          const x = cx - 70 + i * 11;
          const p = x * 0.04 + t;
          const y1 = cy + Math.sin(p) * 30;
          const y2 = cy + Math.sin(p + Math.PI) * 30;
          ctx.beginPath();
          ctx.moveTo(x, y1); ctx.lineTo(x, y2);
          ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y1, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = style.color; ctx.fill();
          ctx.beginPath(); ctx.arc(x, y2, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#f72585'; ctx.fill();
        }
      } else if (mode === 3) {
        // Волна эквалайзера
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = cy + Math.sin(x * 0.04 + t * 2) * 25 * Math.sin(t);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 2.5; ctx.stroke();
      } else if (mode === 4) {
        // Орбитальные частицы
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = style.color; ctx.fill();
        for (let i = 1; i <= 4; i++) {
          const r = i * 14;
          const a = t * (2 / Math.sqrt(r)) + i;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * (r * 0.6);
          ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#f72585'; ctx.fill();
        }
      } else if (mode === 5) {
        // Вращающийся полигон
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t);
        ctx.beginPath();
        const sides = 5;
        for (let i = 0; i <= sides; i++) {
          const a = (i / sides) * Math.PI * 2;
          const x = Math.cos(a) * 35;
          const y = Math.sin(a) * 35;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
      } else if (mode === 6) {
        // Пульсирующие концентрические кольца
        for (let r = 10; r < 55; r += 12) {
          const rad = (r + t * 15) % 55;
          ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 245, 212, ${1 - rad / 55})`; ctx.stroke();
        }
      } else if (mode === 7) {
        // Матричный глиф
        ctx.font = '12px JetBrains Mono';
        ctx.fillStyle = style.color;
        for (let c = 0; c < 8; c++) {
          const y = (t * 40 + c * 25) % canvas.height;
          ctx.fillText(String.fromCharCode(65 + ((idx + c) % 26)), cx - 60 + c * 16, y);
        }
      } else if (mode === 8) {
        // Пружинная сетка 3x3
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 5; c++) {
            const x = cx - 40 + c * 20 + Math.sin(t + r) * 5;
            const y = cy - 20 + r * 20 + Math.cos(t + c) * 5;
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = style.color; ctx.fill();
          }
        }
      } else {
        // Кинематический луч
        ctx.beginPath(); ctx.moveTo(cx, cy + 30);
        let curX = cx, curY = cy + 30;
        for (let i = 0; i < 5; i++) {
          const a = Math.sin(t * 2 + i * 0.5) * 0.8 - Math.PI / 2;
          curX += Math.cos(a) * 14; curY += Math.sin(a) * 14;
          ctx.lineTo(curX, curY);
        }
        ctx.strokeStyle = style.color; ctx.lineWidth = 3; ctx.stroke();
      }

      requestAnimationFrame(render);
    }

    activeAnimators.set(canvas, render);
    cardObserver.observe(canvas);
  }

  // Рендер карточек с живыми превью
  function renderGrid(append = false) {
    if (!append) container.innerHTML = '';
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const slice = filteredData.slice(start, end);

    slice.forEach(item => {
      const catStyle = categoryStyles[item.category] || { color: '#00f5d4', icon: 'sparkles', bg: 'rgba(0, 245, 212, 0.1)' };
      const card = document.createElement('div');
      card.className = 'glass-panel rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group overflow-hidden shadow-xl hover:shadow-brand-cyan/10';
      
      card.innerHTML = `
        <!-- Живое мини-превью анимации -->
        <div class="h-32 bg-black/60 relative border-b border-white/5 flex items-center justify-center overflow-hidden">
          <canvas class="mini-card-canvas w-full h-full pointer-events-none"></canvas>
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10">
            <span class="w-2 h-2 rounded-full animate-ping" style="background-color: ${catStyle.color}"></span>
            <span class="text-[10px] font-mono text-gray-300">${item.badge}</span>
          </div>
          <div class="absolute top-2.5 right-2.5 text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded">
            ID #${item.id}
          </div>
        </div>

        <!-- Контент карточки -->
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
    countBadge.textContent = `Показано ${Math.min(end, filteredData.length)} из ${filteredData.length} живых технологий`;

    // Кнопка загрузить ещё
    const existingLoadMore = document.getElementById('load-more-btn');
    if (existingLoadMore) existingLoadMore.remove();

    if (end < filteredData.length) {
      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.id = 'load-more-btn';
      loadMoreBtn.className = 'col-span-full py-4 rounded-xl glass-panel text-brand-cyan font-bold text-xs uppercase tracking-wider hover:bg-brand-cyan hover:text-black transition-all border border-brand-cyan/30 mt-4 shadow-lg';
      loadMoreBtn.textContent = `Загрузить следующие ${pageSize} технологий...`;
      loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderGrid(true);
      });
      container.appendChild(loadMoreBtn);
    }
  }

  // Фильтрация и поиск
  function applyFilters() {
    const q = (searchInput.value || '').toLowerCase().trim();
    const cat = catFilter.value;

    filteredData = data.filter(item => {
      const matchQuery = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.badge.toLowerCase().includes(q);
      const matchCat = cat === 'all' || item.category === cat;
      return matchQuery && matchCat;
    });

    currentPage = 1;
    renderGrid(false);
  }

  searchInput.addEventListener('input', applyFilters);
  catFilter.addEventListener('change', applyFilters);

  // Запуск песочницы "Код наяву"
  let liveAnimId = null;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-live-btn');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const item = data.find(x => x.id === id);
    if (!item) return;

    liveTitle.textContent = item.title;
    liveBadge.textContent = `${item.category} // ${item.engine}`;
    
    // Подставляем реальный уникальный исполняемый код для конкретной технологии
    const executableCode = item.code || `// Исполнение для: ${item.title}\nlog('Алгоритм готов к работе');`;

    liveCodeArea.value = executableCode;
    liveConsoleLog.textContent = `[${new Date().toLocaleTimeString()}] Код инициализирован: ${item.title} (Движок: ${item.engine}). Нажмите "Запустить наяву".`;

    liveExecutorModal.classList.remove('hidden');
    liveExecutorModal.classList.add('flex');
    runLiveCode();
  });

  function runLiveCode() {
    if (liveAnimId) cancelAnimationFrame(liveAnimId);
    liveCanvas.width = liveCanvas.parentElement.clientWidth;
    liveCanvas.height = liveCanvas.parentElement.clientHeight;

    const log = (msg) => {
      liveConsoleLog.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    };

    try {
      const code = liveCodeArea.value;
      const fn = new Function('canvas', 'log', code);
      fn(liveCanvas, log);
    } catch (err) {
      liveConsoleLog.textContent = `[Ошибка исполнения]: ${err.message}`;
    }
  }

  liveRunBtn.addEventListener('click', runLiveCode);
  liveCloseBtn.addEventListener('click', () => {
    if (liveAnimId) cancelAnimationFrame(liveAnimId);
    liveExecutorModal.classList.add('hidden');
    liveExecutorModal.classList.remove('flex');
  });

  // Инициализация первой порции
  renderGrid();
});
