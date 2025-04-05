// todo.js - To-Do widget for ModuPage

import { saveLayout } from '../storage.js';

export function createTodoWidget() {
  const container = document.createElement('div');
  container.className = 'widget';
  container.dataset.widgetType = 'todo';

  const title = document.createElement('h3');
  title.textContent = '✅ To-Do';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add a task...';
  input.style.width = '100%';
  input.style.marginBottom = '0.5rem';

  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';

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
      const item = document.createElement('li');
      item.textContent = input.value.trim();
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => item.remove());
      list.appendChild(item);
      input.value = '';
    }
  });

  container.appendChild(title);
  container.appendChild(input);
  container.appendChild(list);
  container.appendChild(btn);

  return container;
}