// --- Sélecteurs DOM ---
const form        = document.getElementById('qrForm');
const input       = document.getElementById('qrText');
const sizeSelect  = document.getElementById('qrSize');
const qrcodeBox   = document.getElementById('qrcode');
const preview     = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const historySec  = document.getElementById('historySection');
const historyList = document.getElementById('historyList');
const themeBtn    = document.getElementById('themeToggle');

// --- Storage clés ---
const HIST_KEY  = 'qrHistory';
const THEME_KEY = 'qrTheme';

// --- QRCode instance ---
let qr;

// Chargement historique et thème
initTheme();
loadHistory();
if (historyList.children.length) historySec.hidden = false;

// --- Écouteurs ---
form.addEventListener('submit', e => {
  e.preventDefault();
  generateQR(input.value.trim(), Number(sizeSelect.value));
});
downloadBtn.addEventListener('click', downloadQR);
historyList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (li) generateQR(li.dataset.text, Number(sizeSelect.value));
});
themeBtn.addEventListener('click', toggleTheme);

// ---------------- Fonctions ----------------
function generateQR(text, size) {
  if (text.length === 0) return alert('Veuillez saisir un texte ou une URL.');
  qrcodeBox.innerHTML = ''; // reset

  qr = new QRCode(qrcodeBox, {
    text,
    width : size,
    height: size,
    colorDark : "#000000",
    colorLight: "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  preview.hidden = false;
  saveToHistory(text);
  downloadBtn.focus();
}

function downloadQR() {
  if (!qr) return;
  const canvas = qrcodeBox.querySelector('canvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'qrcode.png';
  link.click();
}

function saveToHistory(text) {
  let hist = JSON.parse(localStorage.getItem(HIST_KEY)) || [];
  if (!hist.includes(text)) {
    hist.unshift(text);
    hist = hist.slice(0, 10); // max 10 entrées
    localStorage.setItem(HIST_KEY, JSON.stringify(hist));
    renderHistory(hist);
    historySec.hidden = false;
  }
}

function loadHistory() {
  const hist = JSON.parse(localStorage.getItem(HIST_KEY)) || [];
  renderHistory(hist);
}

function renderHistory(arr) {
  historyList.innerHTML = '';
  arr.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.dataset.text = item;
    historyList.appendChild(li);
  });
}

// ---------- Thème clair / sombre ----------
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
}
function toggleTheme() {
  const newT = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newT);
  localStorage.setItem(THEME_KEY, newT);
}
function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
