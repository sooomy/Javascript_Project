/* ---------- Sélecteurs ---------- */
const addBtn = document.getElementById('addNoteBtn');
const container = document.getElementById('notesContainer');
const searchInp = document.getElementById('searchInput');
const sortSel   = document.getElementById('sortSelect');
const toastBox  = document.getElementById('toastBox');
const themeBtn  = document.getElementById('themeToggle');

/* ---------- Storage ---------- */
const STORE_KEY='notely_notes';
const THEME_KEY='notely_theme';
let notes = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); // [{id, title, content, color, pinned, updated}]

/* ---------- Thème ---------- */
initTheme();
function initTheme(){
  const t = localStorage.getItem(THEME_KEY) || (matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  applyTheme(t);
}
function applyTheme(t){document.body.classList.toggle('dark',t==='dark');themeBtn.textContent=t==='dark'?'☀️':'🌙'}
themeBtn.onclick=()=>{const n=document.body.classList.contains('dark')?'light':'dark';applyTheme(n);localStorage.setItem(THEME_KEY,n)}

/* ---------- Toast ---------- */
function toast(msg){
  const t=document.createElement('div');t.className='toast';t.textContent=msg;toastBox.appendChild(t);
  setTimeout(()=>t.remove(),3000);
}

/* ---------- Note CRUD ---------- */
function save(){localStorage.setItem(STORE_KEY,JSON.stringify(notes))}
function createNoteObj(){
  return {id:Date.now(),title:'',content:'',color:getRandColor(),pinned:false,updated:Date.now()}
}
function getRandColor(){
  const palette=['#5f27cd','#f6b93b','#1abc9c','#eb4d4b','#e056fd'];
  return palette[Math.floor(Math.random()*palette.length)];
}

/* ---------- Rendering ---------- */
function render(){
  container.innerHTML='';
  const query=searchInp.value.toLowerCase();
  const sorted=[...notes].sort(sortFn);
  sorted.forEach(n=>{
    if(query && !n.title.toLowerCase().includes(query) && !n.content.toLowerCase().includes(query)) return;
    container.appendChild(buildNoteEl(n));
  });
}
function sortFn(a,b){
  switch(sortSel.value){
    case 'updated_asc' : return a.updated-b.updated;
    case 'updated_desc': return b.updated-a.updated;
    case 'title_asc'   : return a.title.localeCompare(b.title);
    case 'title_desc'  : return b.title.localeCompare(a.title);
  }
}

/* ---------- DOM Builders ---------- */
function buildNoteEl(n){
  const note=document.createElement('div');note.className='note';note.style.borderTopColor=n.color;

  note.innerHTML=`
    <div class="note-header">
      <input value="${n.title}" placeholder="Titre…" />
      <span class="pin" title="Épingler"> ${n.pinned?'📌':'📍'} </span>
    </div>
    <textarea>${n.content}</textarea>
  `;
  // événements
  const titleInp=note.querySelector('input');
  const area=note.querySelector('textarea');
  const pinBtn=note.querySelector('.pin');

  titleInp.oninput=area.oninput=()=>{
    n.title=titleInp.value;n.content=area.value;n.updated=Date.now();save();render();
  };
  pinBtn.onclick=()=>{
    n.pinned=!n.pinned;n.updated=Date.now();save();toast(n.pinned?'Épinglé':'Désépinglé');render();
  };
  // menu contextuel suppression
  note.addEventListener('contextmenu',e=>{
    e.preventDefault();
    if(confirm('Supprimer cette note ?')){notes=notes.filter(x=>x.id!==n.id);save();render();toast('Note supprimée');}
  });

  return note;
}

/* ---------- Events ---------- */
addBtn.onclick=()=>{
  notes.unshift(createNoteObj());save();render();toast('Note créée');
  // focus sur la nouvelle
  setTimeout(()=>container.querySelector('input')?.focus(),0);
};
searchInp.oninput=render;
sortSel.onchange=render;

/* ---------- Init ---------- */
render();
