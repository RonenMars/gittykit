(function () {
  'use strict';

  const STORAGE_KEY = 'gitty-a11y';
  const FONT_STEPS = [0, 2, 4]; // px added to root font-size

  const defaults = {
    fontStep: 0,
    highContrast: false,
    underlineLinks: false,
    reduceMotion: false,
  };

  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch {
      return Object.assign({}, defaults);
    }
  }

  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  function apply(state) {
    const root = document.documentElement;
    const base = 16 + FONT_STEPS[state.fontStep];
    root.style.fontSize = base + 'px';
    root.classList.toggle('a11y-high-contrast', state.highContrast);
    root.classList.toggle('a11y-underline-links', state.underlineLinks);
    root.classList.toggle('a11y-reduce-motion', state.reduceMotion);
  }

  function injectStyles() {
    if (document.getElementById('a11y-widget-styles')) return;
    const style = document.createElement('style');
    style.id = 'a11y-widget-styles';
    style.textContent = `
      /* Widget button */
      #a11y-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #f97316;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        transition: background 0.15s, transform 0.15s;
      }
      #a11y-btn:hover { background: #fb923c; transform: scale(1.08); }
      #a11y-btn:focus-visible { outline: 3px solid #fed7aa; outline-offset: 3px; }
      #a11y-btn svg { width: 26px; height: 26px; fill: #fff; }

      /* Panel */
      #a11y-panel {
        position: fixed;
        bottom: 86px;
        right: 24px;
        z-index: 9998;
        width: 260px;
        background: #1c2128;
        border: 1px solid #30363d;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 14px;
        color: #cdd9e5;
        display: none;
      }
      #a11y-panel.open { display: block; }

      #a11y-panel h2 {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #f0f6fc;
        margin: 0 0 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #30363d;
      }

      .a11y-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #21262d;
      }
      .a11y-row:last-child { border-bottom: none; }

      .a11y-label { color: #cdd9e5; font-size: 13px; }

      /* Font size controls */
      .a11y-font-btns { display: flex; gap: 6px; }
      .a11y-font-btns button {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        border: 1px solid #30363d;
        background: #161b22;
        color: #cdd9e5;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .a11y-font-btns button:hover { border-color: #f97316; color: #f97316; }
      .a11y-font-btns button:disabled { opacity: 0.35; cursor: not-allowed; }

      /* Toggle switch */
      .a11y-toggle {
        position: relative;
        width: 40px;
        height: 22px;
        flex-shrink: 0;
      }
      .a11y-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }
      .a11y-slider {
        position: absolute;
        inset: 0;
        background: #30363d;
        border-radius: 22px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .a11y-slider::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        left: 3px;
        top: 3px;
        background: #fff;
        border-radius: 50%;
        transition: transform 0.2s;
      }
      .a11y-toggle input:checked + .a11y-slider { background: #f97316; }
      .a11y-toggle input:checked + .a11y-slider::before { transform: translateX(18px); }
      .a11y-toggle input:focus-visible + .a11y-slider { outline: 2px solid #fed7aa; outline-offset: 2px; }

      /* Reset button */
      #a11y-reset {
        width: 100%;
        margin-top: 12px;
        padding: 7px;
        border-radius: 6px;
        border: 1px solid #30363d;
        background: transparent;
        color: #8b949e;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;
      }
      #a11y-reset:hover { border-color: #8b949e; color: #cdd9e5; }

      /* Global accessibility classes */
      html.a11y-high-contrast { filter: contrast(1.25); }
      html.a11y-underline-links a { text-decoration: underline !important; }
      html.a11y-reduce-motion *, html.a11y-reduce-motion *::before, html.a11y-reduce-motion *::after {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  function injectHTML() {
    if (document.getElementById('a11y-btn')) return;

    // Button
    const btn = document.createElement('button');
    btn.id = 'a11y-btn';
    btn.setAttribute('aria-label', 'Accessibility options');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'a11y-panel');
    btn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="3.5" r="1.5"/>
      <path d="M5 8.5l7-1 7 1M12 7.5v5l-3 5M12 12.5l3 5"/>
      <path stroke-width="1.8" stroke="#fff" stroke-linecap="round" fill="none"
        d="M5 8.5l7-1 7 1M12 7.5v5l-3 5M12 12.5l3 5"/>
      <circle cx="12" cy="3.5" r="1.5" fill="#fff"/>
    </svg>`;

    // Panel
    const panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility options');
    panel.innerHTML = `
      <h2>Accessibility</h2>

      <div class="a11y-row">
        <span class="a11y-label">Text size</span>
        <div class="a11y-font-btns">
          <button id="a11y-font-dec" aria-label="Decrease text size">A−</button>
          <button id="a11y-font-inc" aria-label="Increase text size">A+</button>
        </div>
      </div>

      <div class="a11y-row">
        <label class="a11y-label" for="a11y-contrast">High contrast</label>
        <label class="a11y-toggle">
          <input type="checkbox" id="a11y-contrast" />
          <span class="a11y-slider"></span>
        </label>
      </div>

      <div class="a11y-row">
        <label class="a11y-label" for="a11y-links">Underline links</label>
        <label class="a11y-toggle">
          <input type="checkbox" id="a11y-links" />
          <span class="a11y-slider"></span>
        </label>
      </div>

      <div class="a11y-row">
        <label class="a11y-label" for="a11y-motion">Reduce motion</label>
        <label class="a11y-toggle">
          <input type="checkbox" id="a11y-motion" />
          <span class="a11y-slider"></span>
        </label>
      </div>

      <button id="a11y-reset">Reset to defaults</button>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);
  }

  function syncUI(state) {
    const decBtn = document.getElementById('a11y-font-dec');
    const incBtn = document.getElementById('a11y-font-inc');
    if (decBtn) decBtn.disabled = state.fontStep === 0;
    if (incBtn) incBtn.disabled = state.fontStep === FONT_STEPS.length - 1;

    const contrast = document.getElementById('a11y-contrast');
    const links    = document.getElementById('a11y-links');
    const motion   = document.getElementById('a11y-motion');
    if (contrast) contrast.checked = state.highContrast;
    if (links)    links.checked    = state.underlineLinks;
    if (motion)   motion.checked   = state.reduceMotion;
  }

  function bindEvents(state) {
    const btn   = document.getElementById('a11y-btn');
    const panel = document.getElementById('a11y-panel');

    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });

    document.getElementById('a11y-font-inc').addEventListener('click', () => {
      if (state.fontStep < FONT_STEPS.length - 1) {
        state.fontStep++;
        apply(state); save(state); syncUI(state);
      }
    });

    document.getElementById('a11y-font-dec').addEventListener('click', () => {
      if (state.fontStep > 0) {
        state.fontStep--;
        apply(state); save(state); syncUI(state);
      }
    });

    document.getElementById('a11y-contrast').addEventListener('change', (e) => {
      state.highContrast = e.target.checked;
      apply(state); save(state);
    });

    document.getElementById('a11y-links').addEventListener('change', (e) => {
      state.underlineLinks = e.target.checked;
      apply(state); save(state);
    });

    document.getElementById('a11y-motion').addEventListener('change', (e) => {
      state.reduceMotion = e.target.checked;
      apply(state); save(state);
    });

    document.getElementById('a11y-reset').addEventListener('click', () => {
      Object.assign(state, defaults);
      apply(state); save(state); syncUI(state);
    });
  }

  function init() {
    const state = load();
    injectStyles();
    injectHTML();
    apply(state);
    syncUI(state);
    bindEvents(state);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
