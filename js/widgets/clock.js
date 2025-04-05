// clock.js - Clock widget for ModuPage

import { saveLayout } from '../storage.js';

export function createClockWidget() {
  const container = document.createElement('div');
  container.className = 'widget';
  container.dataset.widgetType = 'clock';

  const title = document.createElement('h3');
  title.textContent = '🕒 Clock';

  const timeEl = document.createElement('div');
  timeEl.style.fontSize = '1.5rem';
  timeEl.style.marginTop = '0.5rem';
  timeEl.style.fontFamily = 'monospace';

  const btn = document.createElement('button');
  btn.className = 'remove-btn';
  btn.textContent = '✖';
  btn.addEventListener('click', () => {
    container.remove();
    const dashboard = document.getElementById('dashboard');
    const layout = Array.from(dashboard.children).map(child => ({
      type: child.dataset.widgetType
    }));
    saveLayout(layout);
  });

  container.appendChild(title);
  container.appendChild(timeEl);
  container.appendChild(btn);

  function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    timeEl.textContent = time;
  }

  updateTime();
  const interval = setInterval(updateTime, 1000);

  container.addEventListener('remove', () => clearInterval(interval));

  return container;
}