const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const btnOk = document.querySelector('.btn-ok');
const btnCancel = document.querySelector('.btn-cancel');

// Fonction pour ouvrir la modal
function showModal() {
  modal.classList.add('show');
}

// Fonction pour fermer la modal
function closeModal() {
  modal.classList.remove('show');
}

// Interaction clics
openBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);
btnOk.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// Fermeture en cliquant en dehors du contenu
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});
