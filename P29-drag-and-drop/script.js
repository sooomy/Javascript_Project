/* ========= Sélecteurs ========= */
const cards      = () => document.querySelectorAll('.card');
const zones      = document.querySelectorAll('.zone');
const liveRegion = document.getElementById('live');

/* ========= Sauvegarde / Restauration ========= */
const KEY = 'dragndrop-layout';
function save() {
  const layout = [...zones].map(z => [...z.children].map(c => c.textContent.trim()));
  localStorage.setItem(KEY, JSON.stringify(layout));
}
function restore() {
  const data = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (!data.length) return;
  data.forEach((list, i) => {
    list.forEach(text => {
      const el = [...cards()].find(c => c.textContent.trim() === text);
      el && zones[i].appendChild(el);
    });
  });
}
restore();

/* ========= Fonctions utilitaires ========= */
function announce(msg) { liveRegion.textContent = msg; }
function addZoneHighlight(zone, on) { zone.classList.toggle('over', on); }

/* ========= Drag & Drop souri-/tactile ========= */
let draggedEl = null;

cards().forEach(card => {
  /* Drag API (bureau) */
  card.addEventListener('dragstart', e => {
    draggedEl = card;
    e.dataTransfer.setData('text/plain', card.textContent);
    addZoneHighlight(card.parentElement, false);
    setTimeout(() => card.style.opacity = '.4', 0);
  });
  card.addEventListener('dragend', () => {
    card.style.opacity = '';
    announce(`${card.textContent} déposé`);
    save();
  });

  /* Pointer API (mobile) */
  card.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') card.setPointerCapture(e.pointerId);
  });
});

/* Survol des zones */
zones.forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());
  zone.addEventListener('dragenter', () => addZoneHighlight(zone, true));
  zone.addEventListener('dragleave', () => addZoneHighlight(zone, false));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    if (draggedEl) zone.appendChild(draggedEl);
    addZoneHighlight(zone, false);
  });
});

/* ========= Navigation clavier ========= */
let grabbed = null;
document.addEventListener('keydown', e => {
  const target = document.activeElement;
  if (!target.classList.contains('card')) return;

  switch (e.key) {
    case ' ':
    case 'Enter':
      e.preventDefault();
      if (!grabbed) {
        grabbed = target;
        target.setAttribute('aria-grabbed', 'true');
        announce(`${target.textContent} pris. Allez dans la zone désirée et appuyez sur Entrée pour déposer.`);
      } else {
        grabbed.parentElement.removeChild(grabbed);
        target.parentElement.appendChild(grabbed);
        grabbed.removeAttribute('aria-grabbed');
        announce(`${grabbed.textContent} déposé dans la zone.`);
        grabbed.focus();
        grabbed = null;
        save();
      }
      break;
    case 'Escape':
      if (grabbed) {
        grabbed.removeAttribute('aria-grabbed');
        announce('Annulé.');
        grabbed = null;
      }
      break;
  }
});
