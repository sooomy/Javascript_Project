/* ---------- Configuration ---------- */
const accessKey = '_y1-O02CJCr_7RtT_7f6V5m-snWFt7QCIt-g37Zqb4k';  // 🔑 ta clé Unsplash
const PER_PAGE  = 15;         // images par page
/* ----------------------------------- */

let page = 1, query = '';
const input   = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const moreBtn     = document.getElementById('loadMoreBtn');
const grid        = document.getElementById('imageResults');
const loader      = document.getElementById('loader');

searchBtn.addEventListener('click', handleSearch);
input.addEventListener('keydown', e => e.key === 'Enter' && handleSearch());
moreBtn.addEventListener('click', loadMore);

async function fetchImages(q, p = 1) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}`
                 + `&page=${p}&per_page=${PER_PAGE}&orientation=landscape&client_id=${accessKey}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const { results } = await res.json();
  return results;
}

function renderImages(arr, reset = false) {
  if (reset) grid.innerHTML = '';
  arr.forEach(({ urls, alt_description }) => {
    const img = document.createElement('img');
    img.src   = urls.small;      // 400px wide
    img.alt   = alt_description || 'Unsplash';
    grid.appendChild(img);
  });
  // toggle bouton « Charger plus »
  moreBtn.classList.toggle('hidden', arr.length < PER_PAGE);
}

async function handleSearch() {
  query = input.value.trim();
  if (!query) return;
  page = 1;
  try {
    toggleLoader(true);
    const imgs = await fetchImages(query, page);
    renderImages(imgs, true);
  } catch (err) {
    alert('Erreur : ' + err.message);
  } finally {
    toggleLoader(false);
  }
}

async function loadMore() {
  page++;
  try {
    toggleLoader(true);
    const imgs = await fetchImages(query, page);
    renderImages(imgs);
  } catch (err) {
    alert('Erreur : ' + err.message);
  } finally {
    toggleLoader(false);
  }
}

function toggleLoader(show){ loader.classList.toggle('hidden', !show); }
