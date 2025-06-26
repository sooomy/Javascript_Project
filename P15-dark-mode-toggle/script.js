const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const storedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

let theme = storedTheme ?? (systemPrefersDark ? 'dark' : 'light');

root.setAttribute('data-theme', theme);
updateToggle();

themeToggle.addEventListener('click', () => {
  theme = (theme === 'dark') ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateToggle();
});

function updateToggle() {
  if (theme === 'dark') {
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}
