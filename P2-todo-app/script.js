/* ---------- DOM ---------- */
const listEl    = qs('#list');
const form      = qs('#todoForm');
const taskInput = qs('#taskInput');
const catInput  = qs('#catInput');
const dateInput = qs('#dateInput');
const searchInp = qs('#searchInput');
const filterSel = qs('#filterCat');
const counter   = qs('#counter');

/* ---------- Storage ---------- */
const KEY='notedark_tasks';
let tasks = JSON.parse(localStorage.getItem(KEY)||'[]'); // {id,txt,cat,date,done}

/* ---------- Utils ---------- */
const save = () => localStorage.setItem(KEY, JSON.stringify(tasks));
const qs   = s => document.querySelector(s);
const id   = () => Date.now();

/* ---------- Render ---------- */
function render(){
  const q   = searchInp.value.toLowerCase();
  const cat = filterSel.value;
  listEl.innerHTML='';
  tasks.filter(t=>{
    if(cat && t.cat!==cat) return false;
    if(q && !t.txt.toLowerCase().includes(q)) return false;
    return true;
  }).forEach(t => listEl.appendChild(buildItem(t)));

  const left = tasks.filter(t=>!t.done).length;
  counter.textContent = left ? `${left} tâche${left>1?'s':''} restante${left>1?'s':''}` : '🎉 Tout est fait !';
}

function buildItem(t){
  const li = document.createElement('li');
  if(t.done) li.classList.add('done');
  li.innerHTML = `
    <div class="text">${t.txt}</div>
    <div class="meta">
      <span>📂 ${t.cat}</span>
      ${t.date ? `<span>🗓️ ${t.date}</span>` : ''}
    </div>
    <div class="actions">
      <button class="icon-btn toggle">${t.done?'↩️':'✅'}</button>
      <button class="icon-btn edit">✏️</button>
      <button class="icon-btn delete">🗑️</button>
    </div>`;
  // actions
  li.querySelector('.toggle').onclick = () => { t.done=!t.done; save(); render(); };
  li.querySelector('.delete').onclick = () => { tasks = tasks.filter(x=>x.id!==t.id); save(); render(); };
  li.querySelector('.edit').onclick   = () => editTask(t);
  return li;
}

/* ---------- CRUD ---------- */
form.addEventListener('submit', e=>{
  e.preventDefault();
  const txt = taskInput.value.trim();
  if(!txt) return;
  tasks.unshift({id:id(),txt,cat:catInput.value,date:dateInput.value,done:false});
  save(); form.reset(); render();
});

function editTask(task){
  const txt = prompt('Modifier la tâche :', task.txt);
  if(txt===null) return;
  task.txt = txt.trim()||task.txt;
  save(); render();
}

/* ---------- Filtres ---------- */
searchInp.oninput = render;
filterSel.onchange = render;

/* ---------- Init ---------- */
render();
