const STORAGE_KEY = 'modupage_layout';

export function saveLayout(layout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

export function loadLayout() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse layout from storage:', e);
    return [];
  }
}

export function clearLayout() {
  localStorage.removeItem(STORAGE_KEY);
}