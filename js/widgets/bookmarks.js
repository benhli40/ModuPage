// bookmarks.js - Bookmarks widget for ModuPage

import { saveLayout } from '../storage.js';

export function createBookmarksWidget() {
  const container = document.createElement('div');
  container.className = 'widget';
  container.dataset.widgetType = 'bookmarks';

  const title = document.createElement('h3');
  title.textContent = '🔗 Bookmarks';

  const input = document.createElement('input');
  input.type = 'url';
  input.placeholder = 'Paste URL and press Enter';
  input.style.width = '100%';
  input.style.marginBottom = '0.5rem';

  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';
  list.style.marginTop = '0.5rem';

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

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const url = input.value.trim();
      const link = document.createElement('li');
      link.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
      link.style.padding = '2px 0';
      link.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
        link.remove();
      });
      list.appendChild(link);
      input.value = '';
    }
  });

  container.appendChild(title);
  container.appendChild(input);
  container.appendChild(list);
  container.appendChild(btn);

  return container;
}