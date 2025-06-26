
  const VARIANTS = {
    red: {
      color: '#ff4d4d',
      imgs: [
        'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      ]
    },
    blue: {
      color: '#3fa8ff',
      imgs: [
        'https://images.pexels.com/photos/1153365/pexels-photo-1153365.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/290618/pexels-photo-290618.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      ]
    },
    green: {
      color: '#29c977',
      imgs: [
        'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/60580/pexels-photo-60580.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        'https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
      ]
    }
  };
  

/* === Sélecteurs === */
const mainImg   = document.getElementById('main-img');
const thumbsBox = document.getElementById('thumbs');
const swatches  = document.getElementById('color-swatches');
const addBtn    = document.getElementById('add-cart');
const toast     = document.getElementById('toast');
const themeBtn  = document.getElementById('theme-toggle');

const THEME_KEY = 'product-theme';

/* === Initialisation === */
let currentColor = 'red';
generateSwatches();
applyVariant(currentColor);

/* ---------- Galerie & variantes ---------- */
function generateSwatches() {
  Object.keys(VARIANTS).forEach(key => {
    const b = document.createElement('button');
    b.style.background = VARIANTS[key].color;
    b.dataset.color = key;
    b.addEventListener('click', () => {
      currentColor = key;
      applyVariant(key);
    });
    swatches.appendChild(b);
  });
}

function applyVariant(colorKey) {
  [...swatches.children].forEach(b => {
    b.classList.toggle('selected', b.dataset.color === colorKey);
  });
  loadThumbnails(VARIANTS[colorKey].imgs);
  document.documentElement.style.setProperty('--accent', VARIANTS[colorKey].color);
}

function loadThumbnails(imgArr) {
  thumbsBox.innerHTML = '';
  imgArr.forEach((src,i) => {
    const t = document.createElement('img');
    t.src = src; t.alt = 'thumbnail';
    t.className = i===0 ? 'active' : '';
    t.addEventListener('click', () => {
      [...thumbsBox.children].forEach(img=>img.classList.remove('active'));
      t.classList.add('active');
      mainImg.src = src;
    });
    thumbsBox.appendChild(t);
    if(i===0) mainImg.src = src;
  });
}

/* ---------- Ajout au panier ---------- */
addBtn.addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
});

/* ---------- Thème clair / sombre ---------- */
function applyTheme(t){document.body.classList.toggle('dark',t==='dark');}
function toggleTheme(){
  const n=document.body.classList.contains('dark')?'light':'dark';
  localStorage.setItem(THEME_KEY,n);applyTheme(n);
}
themeBtn.addEventListener('click',toggleTheme);
applyTheme(localStorage.getItem(THEME_KEY)||'light');
