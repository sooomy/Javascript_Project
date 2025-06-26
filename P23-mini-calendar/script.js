const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const monthYear = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const selectedDateTitle = document.getElementById('selectedDateTitle');
const eventList = document.getElementById('eventList');
const eventForm = document.getElementById('eventForm');
const eventInput = document.getElementById('eventInput');

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

// Chargement des événements depuis localStorage
let events = JSON.parse(localStorage.getItem('miniCalendarEvents')) || {};

// Rendu du calendrier
function renderCalendar(month, year) {
  calendarDays.innerHTML = '';
  monthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0=Dimanche
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  // Jours du mois précédent (gris)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = prevLastDay - i;
    const div = createDayDiv(day, true);
    calendarDays.appendChild(div);
  }

  // Jours du mois courant
  for (let i = 1; i <= lastDay; i++) {
    const div = createDayDiv(i, false);
    calendarDays.appendChild(div);
  }

  // Jours du mois suivant (gris)
  while (calendarDays.children.length < 42) {
    const day = calendarDays.children.length - (firstDayIndex + lastDay) + 1;
    const div = createDayDiv(day, true);
    calendarDays.appendChild(div);
  }

  // Mettre à jour la sélection et la mise en surbrillance aujourd'hui
  highlightToday();
  if (selectedDate) {
    highlightSelectedDate(selectedDate);
    displayEvents(selectedDate);
  } else {
    selectedDateTitle.textContent = 'Sélectionnez une date';
    eventList.innerHTML = '';
  }
}

function createDayDiv(day, isOtherMonth) {
  const div = document.createElement('div');
  div.textContent = day;
  if (isOtherMonth) div.classList.add('other-month');

  div.setAttribute('tabindex', '0');
  div.setAttribute('role', 'gridcell');
  div.setAttribute('aria-selected', 'false');

  const dateKey = generateDateKey(currentYear, currentMonth, day, isOtherMonth);

  div.addEventListener('click', () => selectDate(div, dateKey, isOtherMonth));
  div.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectDate(div, dateKey, isOtherMonth);
    }
  });
  return div;
}

function generateDateKey(year, month, day, isOtherMonth) {
  let d = day;
  let m = month;
  let y = year;
  if (isOtherMonth) {
    if (day > 15) {
      // Date du mois précédent
      m = month - 1 < 0 ? 11 : month - 1;
      y = m === 11 ? year - 1 : year;
    } else {
      // Date du mois suivant
      m = month + 1 > 11 ? 0 : month + 1;
      y = m === 0 ? year + 1 : year;
    }
  }
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function highlightToday() {
  const days = calendarDays.querySelectorAll('div');
  days.forEach(day => {
    day.classList.remove('today');
    const dayNum = parseInt(day.textContent, 10);
    if (
      !day.classList.contains('other-month') &&
      dayNum === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      day.classList.add('today');
    }
  });
}

function highlightSelectedDate(dateKey) {
  const days = calendarDays.querySelectorAll('div');
  days.forEach(day => {
    day.classList.remove('selected');
    const dayNum = parseInt(day.textContent, 10);
    const isOtherMonth = day.classList.contains('other-month');
    const key = generateDateKey(currentYear, currentMonth, dayNum, isOtherMonth);
    if (key === dateKey) {
      day.classList.add('selected');
      day.setAttribute('aria-selected', 'true');
      day.focus();
    } else {
      day.setAttribute('aria-selected', 'false');
    }
  });
}

function selectDate(div, dateKey, isOtherMonth) {
  // Si on clique sur un jour d’un autre mois, naviguer vers ce mois
  if (isOtherMonth) {
    if (dateKey.startsWith(`${currentYear}-${String(currentMonth+1).padStart(2,'0')}`)) {
      // Si vraiment même mois, pas de changement
    } else {
      const [y,m] = dateKey.split('-');
      currentYear = parseInt(y);
      currentMonth = parseInt(m) -1;
      renderCalendar(currentMonth, currentYear);
    }
  }
  selectedDate = dateKey;
  highlightSelectedDate(dateKey);
  displayEvents(dateKey);
}

function displayEvents(dateKey) {
  eventList.innerHTML = '';
  selectedDateTitle.textContent = `Événements du ${dateKey}`;
  if (events[dateKey]) {
    events[dateKey].forEach((ev, idx) => {
      const li = document.createElement('li');
      li.textContent = ev;
      // Suppression d’un événement au clic
      li.addEventListener('click', () => {
        events[dateKey].splice(idx,1);
        if(events[dateKey].length === 0) delete events[dateKey];
        saveEvents();
        displayEvents(dateKey);
      });
      eventList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Aucun événement.';
    eventList.appendChild(li);
  }
}

function saveEvents() {
  localStorage.setItem('miniCalendarEvents', JSON.stringify(events));
}

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!selectedDate) return alert('Sélectionnez une date d’abord.');
  const val = eventInput.value.trim();
  if(val.length === 0) return;
  if(!events[selectedDate]) events[selectedDate] = [];
  events[selectedDate].push(val);
  saveEvents();
  displayEvents(selectedDate);
  eventInput.value = '';
});

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if(currentMonth < 0){
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
  selectedDate = null;
  selectedDateTitle.textContent = 'Sélectionnez une date';
  eventList.innerHTML = '';
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if(currentMonth > 11){
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
  selectedDate = null;
  selectedDateTitle.textContent = 'Sélectionnez une date';
  eventList.innerHTML = '';
});

renderCalendar(currentMonth, currentYear);
