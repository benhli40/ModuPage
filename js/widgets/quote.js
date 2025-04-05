// quote.js - Quote widget for ModuPage

import { saveLayout } from '../storage.js';

const quotes = [
  "The best way to predict the future is to invent it.",
  "Simplicity is the soul of efficiency.",
  "Do something great today, even if it’s small.",
  "Creativity is intelligence having fun.",
  "You don’t have to be extreme, just consistent."
];

export function createQuoteWidget() {
  const container = document.createElement('div');
  container.className = 'widget';
  container.dataset.widgetType = 'quote';

  const title = document.createElement('h3');
  title.textContent = '📜 Quote';

  const quoteText = document.createElement('blockquote');
  quoteText.textContent = getRandomQuote();
  quoteText.style.fontStyle = 'italic';
  quoteText.style.marginTop = '0.5rem';

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
  container.appendChild(quoteText);
  container.appendChild(btn);

  return container;
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}