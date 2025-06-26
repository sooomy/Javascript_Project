/* ---------- Sélecteurs ---------- */
const listEl = document.getElementById('crypto-list');
const themeBtn = document.getElementById('theme-toggle');

/* ---------- Configuration ---------- */
const COINS = ['bitcoin', 'ethereum', 'dogecoin'];
const ENDPOINT = `https://api.coingecko.com/api/v3/coins/markets
  ?vs_currency=usd
  &ids=${COINS.join(',')}
  &price_change_percentage=24h`.replace(/\s+/g,'');

const THEME_KEY = 'crypto-theme';

/* ---------- Mise à jour des prix ---------- */
async function fetchData() {
  try {
    const res = await fetch(ENDPOINT);
    const data = await res.json();
    render(data);
  } catch (e) {
    console.error('Erreur CoinGecko :', e);
  }
}

function render(coins) {
  listEl.innerHTML = '';          // on vide pour le refresh
  coins.forEach(c => {
    const change = c.price_change_percentage_24h.toFixed(2);
    const isPos  = change >= 0;
    const card = document.createElement('div');
    card.className = 'crypto-card';
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}">
      <h2>${c.name}</h2>
      <div class="price">$${c.current_price.toLocaleString()}</div>
      <div class="change" style="color:${isPos ? 'var(--accent-pos)' : 'var(--accent-neg)'}">
        ${isPos ? '▲' : '▼'} ${Math.abs(change)} %
      </div>
    `;
    listEl.appendChild(card);
  });
}

/* Premier chargement + rafraîchissement toutes les 60 s */
fetchData();
setInterval(fetchData, 60000);

/* ---------- Thème clair / sombre ---------- */
function applyTheme(th) { document.body.classList.toggle('dark', th==='dark'); }
function toggleTheme() {
  const newTh = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, newTh);
  applyTheme(newTh);
}
themeBtn.addEventListener('click', toggleTheme);
applyTheme(localStorage.getItem(THEME_KEY) || 'light');
