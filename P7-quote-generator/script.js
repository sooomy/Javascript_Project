// ----- Sélecteurs -----
const quoteEl  = document.getElementById('quote');
const authorEl = document.getElementById('author');
const tagSel   = document.getElementById('tagSelect');
const newBtn   = document.getElementById('newBtn');
const copyBtn  = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const favBtn   = document.getElementById('favBtn');
const favSec   = document.getElementById('favSection');
const favList  = document.getElementById('favList');
const themeBtn = document.getElementById('themeToggle');

// ----- Stockage -----
const FAV_KEY  = 'quoteFavs';
const THM_KEY  = 'quoteTheme';
let favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

// ----- Citations locales fallback -----
const localQuotes = [
  {content:'Le succès est la somme de petits efforts répétés jour après jour.', author:'Leo Robert Collier'},
  {content:'La meilleure façon de prédire l’avenir, c’est de le créer.', author:'Peter Drucker'},
  {content:'Le seul endroit où le succès vient avant le travail est le dictionnaire.', author:'Vidal Sassoon'}
];

// ----- Fonctions principales -----
async function fetchQuote(tag='') {
  quoteEl.textContent = 'Chargement…';
  authorEl.textContent = '—';
  try {
    const url = tag ? `https://api.quotable.io/random?tags=${tag}` : 'https://api.quotable.io/random';
    const r = await fetch(url);
    if(!r.ok) throw new Error(r.status);
    const data = await r.json();
    displayQuote(data.content, data.author);
  } catch (e) {
    console.warn('API indisponible, fallback local', e);
    const rand = localQuotes[Math.floor(Math.random()*localQuotes.length)];
    displayQuote(rand.content, rand.author);
  }
}

function displayQuote(txt, auth) {
  quoteEl.textContent  = txt;
  authorEl.textContent = `— ${auth}`;
  favBtn.classList.toggle('faved', isFav(txt));
}

// ----- Favoris -----
function isFav(text){return favs.some(q=>q.content===text);}
function toggleFav(){
  const current = {content:quoteEl.textContent, author:authorEl.textContent.slice(2)};
  const idx = favs.findIndex(q=>q.content===current.content);
  if(idx>=0) favs.splice(idx,1);
  else favs.unshift(current);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs.slice(0,20)));
  renderFavs();
  favBtn.classList.toggle('faved', idx<0);
}
function renderFavs(){
  favList.innerHTML='';
  if(favs.length){favSec.hidden=false;}else{favSec.hidden=true;}
  favs.forEach(q=>{
    const li=document.createElement('li');
    li.textContent=`${q.content} — ${q.author}`;
    li.title='Cliquer pour afficher';
    li.addEventListener('click',()=>displayQuote(q.content,q.author));
    favList.appendChild(li);
  });
}

// ----- Copie, Tweet -----
function copyQuote(){
  navigator.clipboard.writeText(`${quoteEl.textContent} ${authorEl.textContent}`)
    .then(()=>alert('Citation copiée !'))
    .catch(()=>alert('Copie impossible.'));
}
function tweetQuote(){
  const url=`https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteEl.textContent+' '+authorEl.textContent)}`;
  window.open(url,'_blank');
}

// ----- Thème -----
function applyTheme(t){document.body.classList.toggle('dark',t==='dark');themeBtn.textContent=t==='dark'?'☀️':'🌙';}
function initTheme(){
  const saved=localStorage.getItem(THM_KEY)||(
    window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  applyTheme(saved);
}
function toggleTheme(){
  const n=document.body.classList.contains('dark')?'light':'dark';
  applyTheme(n);localStorage.setItem(THM_KEY,n);
}

// ----- Événements -----
newBtn .addEventListener('click', ()=>fetchQuote(tagSel.value));
copyBtn.addEventListener('click', copyQuote);
tweetBtn.addEventListener('click', tweetQuote);
favBtn .addEventListener('click', toggleFav);
tagSel.addEventListener('change', ()=>fetchQuote(tagSel.value));
themeBtn.addEventListener('click', toggleTheme);

// ----- Init -----
initTheme();
renderFavs();
fetchQuote();

