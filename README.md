# 🧩 ModuPage

A fully customizable homepage builder made with Vanilla JS.  
Drag, drop, and assemble your own modular dashboard with useful widgets — all saved locally.

---

## ✨ Features

- 🕒 **Clock Widget** – Real-time ticking clock
- ✅ **To-Do Widget** – Lightweight task list
- 📜 **Quote Widget** – Random inspiration on load
- 🔗 **Bookmarks Widget** – Save links, right-click to remove
- ☁️ **Weather Widget** – Pulls your local weather via geolocation (with °C/°F toggle)
- 🎨 **Themes** – Switch between Dark, Calm, Focused, and Stormy modes
- 💾 **LocalStorage Powered** – Your layout persists between sessions
- 📱 **Responsive** – Works on desktop and mobile

---

## 📁 Folder Structure

ModuPage/ ├── index.html ├── css/ │ ├── style.css │ ├── widgets.css │ └── themes.css ├── js/ │ ├── modupage.js │ ├── storage.js │ └── widgets/ │ ├── clock.js │ ├── todo.js │ ├── quote.js │ ├── bookmarks.js │ └── weather.js ├── assets/ │ └── icons/ (optional) └── README.md


---

## 🧠 How to Use

1. Open `index.html` in any browser
2. Click `+ Add Widget` to add tools
3. Drag and arrange (optional future feature)
4. Your layout is saved automatically

---

## 🌦 Weather API Setup

The weather widget uses [OpenWeatherMap](https://openweathermap.org/api):

- Already wired up with the API key:  
  `d33b5dad9f8779faaf1248945394b88f`

> You can replace this key with your own for production use.

---

## 🔧 Built With

- HTML, CSS, Vanilla JavaScript (no frameworks)
- OpenWeatherMap API
- LocalStorage

---

## 🚀 Future Ideas

- Drag-and-drop grid layout
- Export/import layout as JSON
- Custom widgets (Markdown, Notes, Calendar)
- Quick theme switching by time of day

---

## 📄 License

MIT — feel free to fork, remix, and evolve!

---

## 🙌 Acknowledgments

ModuPage was handcrafted by Benjamin Lisle with UI help from ChatGPT.
