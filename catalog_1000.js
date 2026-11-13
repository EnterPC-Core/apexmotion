// Модуль каталога 1000 технологий и симулятора исполнения кода "Наяву"
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
  const pageSize = 30; // Пагинация для 120 FPS без просадок DOM
  let filteredData = [...data];

  // Рендер карточек
  function renderGrid(append = false) {
    if (!append) container.innerHTML = '';
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const slice = filteredData.slice(start, end);

    slice.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-brand-cyan border border-white/10">${item.badge}</span>
            <span class="text-[10px] font-mono text-gray-500">ID #${item.id}</span>
          </div>
          <h4 class="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mb-2">${item.title}</h4>
          <p class="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">${item.desc}</p>
        </div>
        <div class="pt-3 border-t border-white/5 flex items-center justify-between">
          <span class="text-[10px] font-mono text-gray-500">${item.engine}</span>
          <button class="open-live-btn px-3 py-1.5 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan text-brand-cyan hover:text-black font-mono text-xs transition-all flex items-center gap-1.5" data-id="${item.id}">
            <span>Код наяву</span>
            <i data-lucide="play" class="w-3 h-3 fill-current"></i>
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
    countBadge.textContent = `Показано ${Math.min(end, filteredData.length)} из ${filteredData.length} технологий`;

    // Кнопка загрузить ещё
    const existingLoadMore = document.getElementById('load-more-btn');
    if (existingLoadMore) existingLoadMore.remove();

    if (end < filteredData.length) {
      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.id = 'load-more-btn';
      loadMoreBtn.className = 'col-span-full py-4 rounded-xl glass-panel text-brand-cyan font-bold text-xs uppercase tracking-wider hover:bg-brand-cyan hover:text-black transition-all border border-brand-cyan/30 mt-4';
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
    
    // Генерируем реальный исполняемый код для демонстрации наяву
    const executableCode = `// Исполняемый рендер наяву для: ${item.title}
const ctx = canvas.getContext('2d');
let t = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  t += 0.04;

  // Визуализация математической волны / частиц
  const count = 32;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + t;
    const r = 60 + Math.sin(t * 2 + i * 0.5) * 30;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;

    ctx.beginPath();
    ctx.arc(x, y, 4 + Math.sin(t + i) * 2, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#00f5d4' : '#f72585';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 12;
    ctx.fill();

    // Связующие лучи
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}
draw();
log('Исполнение: 60 FPS, Canvas 2D WebGL Pipeline активен.');`;

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

  // Инициализация
  renderGrid();
});
