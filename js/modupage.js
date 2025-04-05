// modupage.js - Core layout logic for ModuPage

import { saveLayout, loadLayout } from './storage.js';
import { createClockWidget } from './widgets/clock.js';
import { createTodoWidget } from './widgets/todo.js';
import { createQuoteWidget } from './widgets/quote.js';
import { createBookmarksWidget } from './widgets/bookmarks.js';
import { createWeatherWidget } from './widgets/weather.js';

const dashboard = document.getElementById('dashboard');
const addBtn = document.getElementById('add-widget');
const picker = document.getElementById('widget-picker');
const closePicker = document.getElementById('close-picker');
const toggleThemeBtn = document.getElementById('toggle-theme');

const WIDGETS = {
  clock: createClockWidget,
  todo: createTodoWidget,
  quote: createQuoteWidget,
  bookmarks: createBookmarksWidget,
  weather: createWeatherWidget
};

function renderLayout() {
  const layout = loadLayout();
  layout.forEach(widget => addWidget(widget.type));
}

function addWidget(type) {
  if (!WIDGETS[type]) return;
  const widgetEl = WIDGETS[type]();
  widgetEl.dataset.widgetType = type;
  dashboard.appendChild(widgetEl);
  saveCurrentLayout();
}

function saveCurrentLayout() {
  const layout = Array.from(dashboard.children).map(child => ({
    type: child.dataset.widgetType
  }));
  saveLayout(layout);
}

// Event listeners
addBtn.addEventListener('click', () => picker.classList.remove('hidden'));
closePicker.addEventListener('click', () => picker.classList.add('hidden'));

picker.addEventListener('click', (e) => {
  if (e.target.dataset.widget) {
    addWidget(e.target.dataset.widget);
    picker.classList.add('hidden');
  }
});

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Init
renderLayout();