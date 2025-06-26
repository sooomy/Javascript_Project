const clockEl = document.getElementById('clock');
const dateEl  = document.getElementById('date');
const themeBtn = document.getElementById('theme-toggle');

// ---------- Horloge ----------
function pad(n) { return n.toString().padStart(2, '0'); }

function updateTime() {
  const now = new Date();

  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  /* Deux points séparés pour clignotement contrôlé par CSS */
  clockEl.innerHTML = `${hh}<span class="sep">:</span>${mm}<span class="sep">:</span>${ss}`;

  /* Date locale longue (ex : jeudi 26 juin 2025) */
  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

setInterval(updateTime, 1000);
updateTime(); // premier affichage immédiat

// ---------- Thème clair / sombre ----------
const THEME_KEY = 'digital-clock-theme';

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
}

function toggleTheme() {
  const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

themeBtn.addEventListener('click', toggleTheme);
applyTheme(localStorage.getItem(THEME_KEY) || 'light');
