document.addEventListener('DOMContentLoaded', () => {
  const selectBtn = document.querySelector('.select-btn');
  const optionsContainer = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');
  const searchInput = document.querySelector('.search-input');
  const customSelect = document.querySelector('.custom-select');

  // Liste des pays avec drapeaux
  const countries = [
    { name: 'France', code: 'fr' },
    { name: 'Allemagne', code: 'de' },
    { name: 'Espagne', code: 'es' },
    { name: 'Italie', code: 'it' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Royaume-Uni', code: 'gb' },
    { name: 'États-Unis', code: 'us' },
    { name: 'Canada', code: 'ca' },
    { name: 'Japon', code: 'jp' },
    { name: 'Chine', code: 'cn' },
    { name: 'Brésil', code: 'br' },
  ];

  // Générer les options dans la liste
  function renderOptions(filter = '') {
    optionsContainer.innerHTML = '';
    const filtered = countries.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      optionsContainer.innerHTML = '<li class="option no-result">Aucun résultat trouvé</li>';
      return;
    }

    filtered.forEach((country, index) => {
      const li = document.createElement('li');
      li.classList.add('option');
      li.setAttribute('role', 'option');
      li.setAttribute('data-value', country.name);
      li.setAttribute('tabindex', '-1');
      li.innerHTML = `
        <img src="https://flagcdn.com/w40/${country.code}.png" alt="Drapeau ${country.name}" loading="lazy" />
        ${country.name}
      `;
      optionsContainer.appendChild(li);
    });
  }

  // Initialisation
  renderOptions();

  // Ouvrir / Fermer menu
  selectBtn.addEventListener('click', () => {
    const expanded = selectBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeSelect();
    } else {
      openSelect();
    }
  });

  function openSelect() {
    customSelect.classList.add('active');
    selectBtn.setAttribute('aria-expanded', 'true');
    searchInput.hidden = false;
    searchInput.focus();
  }

  function closeSelect() {
    customSelect.classList.remove('active');
    selectBtn.setAttribute('aria-expanded', 'false');
    searchInput.value = '';
    searchInput.hidden = true;
    renderOptions();
  }

  // Sélection d’une option
  optionsContainer.addEventListener('click', (e) => {
    const option = e.target.closest('.option');
    if (option && !option.classList.contains('no-result')) {
      selectedOption.textContent = option.dataset.value;
      closeSelect();
    }
  });

  // Recherche dynamique
  searchInput.addEventListener('input', () => {
    renderOptions(searchInput.value);
  });

  // Fermer le menu si clic en dehors
  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      closeSelect();
    }
  });

  // Gestion clavier (navigation)
  let focusedIndex = -1;
  searchInput.addEventListener('keydown', (e) => {
    const options = optionsContainer.querySelectorAll('.option:not(.no-result)');
    if (options.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = (focusedIndex + 1) % options.length;
      options[focusedIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = (focusedIndex - 1 + options.length) % options.length;
      options[focusedIndex].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0) {
        selectedOption.textContent = options[focusedIndex].dataset.value;
        closeSelect();
      }
    } else if (e.key === 'Escape') {
      closeSelect();
      selectBtn.focus();
    }
  });

  // Reset focus index quand on clique sur le bouton
  selectBtn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSelect();
    }
  });
});
