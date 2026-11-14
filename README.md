# ApexMotion // Creative Developer FX & Web Motion Architecture

<div align="center">

```
   ___    ____  _______  __ __  _______  __________  _  __
  /   |  / __ \/ ____/ |/ //  |/  / __ \/_  __/  _/ __ \/ |/ /
 / /| | / /_/ / __/  |   // /|_/ / / / / / /  / / / / / /    / 
/ ___ |/ ____/ /___ /   |/ /  / / /_/ / / / _/ / / /_/ / /| |  
/_/  |_/_/   /_____//_/|_/_/  /_/\____/ /_/ /___/ \____/_/ |_|  
```

### Флагманская энциклопедия веб-анимаций, WebGL-шейдеров и физических симуляций

[![Live Demo](https://img.shields.io/badge/Demo-enterpc--core.github.io%2Fapexmotion-00f5d4?style=for-the-badge&logo=githubpages&logoColor=black)](https://enterpc-core.github.io/apexmotion/)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Engine](https://img.shields.io/badge/Engines-Three.js%20%7C%20GSAP%203%20%7C%20Canvas%202D-7b2cbf?style=for-the-badge)](https://github.com/EnterPC-Core/apexmotion)
[![Technologies](https://img.shields.io/badge/Catalog-998%20Unique%20FX-f72585?style=for-the-badge)](https://github.com/EnterPC-Core/apexmotion)
[![Author](https://img.shields.io/badge/Creator-Dmitry%20Starikov-4361ee?style=for-the-badge)](https://github.com/EnterPC-Core)

<br />

**[🌐 Запустить интерактивную витрину](https://enterpc-core.github.io/apexmotion/)** • **[📚 Документация](#-архитектура-библиотеки)** • **[🧪 Лаборатория](#-интерактивная-физическая-лаборатория)** • **[💻 Исходный код](#-структура-проекта)**

</div>

---

## 🏛 Авторский манифест

> **ApexMotion** спроектирован как исчерпывающий визуальный полигон и архитектурная среда для глубокого исследования веб-анимаций, графических пайплайнов и вычислительной геометрии наяву.
>
> Проект создан **Стариковым Дмитрием Сергеевичем** в 2026 году. Главная цель — дать frontend-инженерам и креативным разработчикам не поверхностные концепты, а прозрачный исполняемый математический код: от уравнений Навье-Стокса и квантования по матрице Байера до SDF-полей и процедурного звука.

---

## ✨ Ключевые возможности

### 🌌 1. 3D WebGL Particle Core (Three.js)
- Галактика из **2200 частиц** с плавной аналитической интерполяцией между 4 топологиями:
  - **Сфера Фибоначчи** (равномерное распределение на золотом угле $\phi$).
  - **Тор Клейна** (параметрическая тороидальная геометрия).
  - **Двойная спираль ДНК** (полинуклеотидный шаг с водородными связями).
  - **Интерференционная волна** (суперпозиция синусоидальных фаз).
- Реактивный параллакс по координатам курсора и тач-событиям.
- Монитор производительности кадров (60 FPS Render).

### ⚡ 2. Флагманские модули взаимодействия
- **3D Parallax Tilt with Glare**: кинематический расчет угла наклона карточки с динамической световой маской отражения.
- **GSAP 3 Elastic Magnetic Pull**: притяжение интерактивных триггеров к вектору курсора с затухающим гармоническим возвратом (`elastic.out`).
- **Hacker Glyph Scramble Decoder**: киберпанк-дешифратор строк со случайной генерацией матрицы символов.
- **Liquid Gooey Metaballs**: физическое слияние капель ртути на базе шейдерных фильтров `feGaussianBlur` и `feColorMatrix`.
- **Sonar Wave Radar**: процедурная интерференция звуковых волн на Canvas 2D.
- **Bi-directional Kinetic Marquee**: бесшовные аппаратные бегущие строки 120 FPS.

### 🧪 3. Интерактивная физическая лаборатория
Полноценный симулятор взаимодействия частиц на Canvas 2D с реальными физическими параметрами:
- **Particles Count**: плотность ансамбля от 20 до 500 узлов.
- **Flow Velocity**: скорость симуляции от $0.5\times$ до $5.0\times$.
- **Gravity Field**: вектор гравитации от $-2.0G$ (антигравитация) до $+2.0G$.
- **Repel Force**: радиус и сила импульсного расталкивания.
- **Node Connection Radius**: дистанция построения молекулярной сетки.
- **Particle Size**: масштабирование диаметра тел.
- **Color Profiles**: пресеты *Cyber Cyan*, *Neon Pink*, *Matrix Green*, *Solar Gold*, *Monochrome*.
- **Управление**: *Пауза / Старт*, *Импульсный взрыв*, *Сброс*, *Fullscreen*.

### 📚 4. Энциклопедический каталог 998 технологий
- **100% уникальность**: 998 самостоятельных эффектов без дубликатов, циклических шаблонов или заглушек.
- **Живое превью в каждой карточке**: каждая технология снабжена персональным мини-холстом (Лиссажу, странные аттракторы, клеточные автоматы, волны Герстнера, спектрограммы).
- **GPU-оптимизация (`IntersectionObserver`)**: рендеринг активен только для видимых карточек.
- **Мгновенный поиск & Фильтры**: debounce-поиск по формулам, тегам, движкам и категориям.
- **Система избранного (`localStorage`)**: сохранение понравившихся решений в один клик.

### 💻 5. Безопасный Code Playground
- Сплит-интерфейс: редактируемый код слева, изолированный `<iframe>` sandbox справа.
- Перехват `console.log` и синтаксических ошибок в статусную консоль.
- Возможность экспорта готового `.html` файла в один клик.

### 🔊 6. Процедурный Web Audio API Синтезатор
- Встроенный звуковой движок без тяжелых аудио-файлов.
- Процедурный синтез кликов, наведений, лазерных импульсов и взрывов через модули `OscillatorNode`, `GainNode` и `BiquadFilter`.

---

## 🗂 Структура репозитория

```
apexmotion/
├── index.html            # Семантическая разметка, Luxury Dark UI, Header, Hero, Lab, Modals
├── style.css             # Glassmorphism 2.0, CSS-токены, 4 цветовые темы, микросетка
├── app.js                # Three.js рантайм, физические модули, Web Audio API, GSAP 3
├── catalog.js            # Каталог 998 технологий, живые Canvas-превью, система Избранного
├── technologies_data.js  # База данных 998 уникальных технологий с математическими алгоритмами
├── snippets.js           # Репозиторий чистого кода для экспорта
├── LICENSE               # Лицензия MIT
└── README.md             # Документация проекта
```

---

## 📊 Распределение технологий по направлениям

| Категория | Количество | Используемые алгоритмы и движки |
|---|:---:|---|
| **3D & WebGL / WebGPU** | **100** | Raymarching SDF, SSAO, PBR Cook-Torrance, GPGPU FBO, Fresnel, Volumetric Fog |
| **Физика & Симуляции (Canvas 2D)** | **100** | Verlet Cloth, Navier-Stokes Grid, SPH Fluid, Boids Flocking, FABRIK IK |
| **CSS3 Hardware Acceleration** | **100** | 3D Parallax Tilt, Conic Gradients, Glare Masks, Gooey Filters, Keyframe Shimmers |
| **GSAP 3 & Кинетика** | **99** | FLIP Transitions, Dynamic Pinning, MorphSVG, SplitText Scramble, Staggers |
| **Шейдеры GLSL & Процедурный шум** | **100** | Gray-Scott Reaction-Diffusion, Mandelbrot, Caustics, Chromatic Glitch, Dithering |
| **SVG & Векторный морфинг** | **100** | Cubic Splines Interpolation, Dasharray Stroke, Path Extrusions, Clip-path Masks |
| **Кинетическая типографика** | **100** | Matrix Glyph Streams, Kinetic Wave Types, Variable Font Weight Tracking |
| **Микро-взаимодействия & UI** | **100** | LERP Magnetic Follower, Dynamic Ripple, Morphing Toggles, Glass Modals |
| **Web Audio API & Процедурный звук** | **100** | FM Synthesis, Sub-Bass Drops, Karplus-Strong Strings, 3D Spatial HRTF |
| **Генеративное искусство & Фракталы** | **99** | Strange Attractors (Lorenz, Clifford), L-Systems, Fermat Spiral, Fourier Epicycles |
| **ИТОГО** | **998** | **Строго уникальные математические модели и исполняемые алгоритмы** |

---

## 🚀 Быстрый запуск локально

Проект не требует сложных сборщиков (`webpack`/`vite`) и запускается автономно:

```bash
# Клонировать репозиторий
git clone https://github.com/EnterPC-Core/apexmotion.git

# Перейти в директорию
cd apexmotion

# Запустить любой локальный веб-сервер (например, Python 3)
python3 -m http.server 8080
```

После этого откройте в браузере: `http://localhost:8080`

---

## 🛠 Технологический стек

<div align="left">
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Canvas" />
  <img src="https://img.shields.io/badge/Web_Audio_API-4361EE?style=for-the-badge&logo=web-audio&logoColor=white" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

---

## 📄 Лицензия

Распространяется под лицензией **MIT**. Подробности в файле [LICENSE](LICENSE).

---

<div align="center">

**Дмитрий Сергеевич Стариков © 2026** • Архитектура интерактивных веб-систем

</div>
