// weather.js - Weather widget for ModuPage

import { saveLayout } from '../storage.js';

const OPENWEATHER_API_KEY = 'd33b5dad9f8779faaf1248945394b88f';

export function createWeatherWidget() {
  const container = document.createElement('div');
  container.className = 'widget';
  container.dataset.widgetType = 'weather';

  const title = document.createElement('h3');
  title.textContent = '☁️ Weather';

  const location = document.createElement('input');
  location.type = 'text';
  location.placeholder = 'Enter city...';
  location.style.width = '100%';
  location.style.marginBottom = '0.5rem';

  const unitToggle = document.createElement('button');
  unitToggle.textContent = '°F';
  unitToggle.style.float = 'right';
  unitToggle.style.marginBottom = '0.5rem';
  unitToggle.style.fontSize = '0.8rem';
  let currentUnit = 'imperial';

  const info = document.createElement('div');
  info.textContent = 'Fetching weather...';
  info.style.fontSize = '0.9rem';

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

  location.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && location.value.trim()) {
      fetchWeatherByCity(location.value.trim(), info, currentUnit);
    }
  });

  unitToggle.addEventListener('click', () => {
    currentUnit = currentUnit === 'imperial' ? 'metric' : 'imperial';
    unitToggle.textContent = currentUnit === 'imperial' ? '°F' : '°C';
    if (location.value.trim()) {
      fetchWeatherByCity(location.value.trim(), info, currentUnit);
    }
  });

  container.appendChild(title);
  container.appendChild(unitToggle);
  container.appendChild(location);
  container.appendChild(info);
  container.appendChild(btn);

  // Try to auto-fetch by geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude, info, currentUnit);
    }, () => {
      info.textContent = 'Location permission denied.';
    });
  } else {
    info.textContent = 'Geolocation not supported.';
  }

  return container;
}

function fetchWeatherByCity(city, displayEl, units = 'imperial') {
  displayEl.textContent = 'Loading...';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      const symbol = units === 'imperial' ? '°F' : '°C';
      displayEl.textContent = `${data.name}: ${Math.round(data.main.temp)}${symbol}, ${data.weather[0].description}`;
    })
    .catch(() => {
      displayEl.textContent = 'Could not fetch weather.';
    });
}

function fetchWeatherByCoords(lat, lon, displayEl, units = 'imperial') {
  displayEl.textContent = 'Loading...';
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      const symbol = units === 'imperial' ? '°F' : '°C';
      displayEl.textContent = `${data.name}: ${Math.round(data.main.temp)}${symbol}, ${data.weather[0].description}`;
    })
    .catch(() => {
      displayEl.textContent = 'Could not fetch weather.';
    });
}