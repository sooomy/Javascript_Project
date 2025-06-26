const timeDisplay = document.querySelector('.time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

let timer;
let isRunning = false;
let startTime = 0;
let elapsed = 0;

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const hrs = String(Math.floor(total / 3600)).padStart(2, '0');
  const mins = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const secs = String(total % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  timeDisplay.textContent = formatTime(diff);
}

function startTimer() {
  startTime = Date.now();
  timer = setInterval(updateDisplay, 200);
  isRunning = true;
  startStopBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Stop`;
  startStopBtn.classList.add('running');
}

function stopTimer() {
  clearInterval(timer);
  elapsed += Date.now() - startTime;
  isRunning = false;
  startStopBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start`;
  startStopBtn.classList.remove('running');
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startTime = 0;
  elapsed = 0;
  timeDisplay.textContent = '00:00:00';
  startStopBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start`;
  startStopBtn.classList.remove('running');
}

startStopBtn.addEventListener('click', () => {
  isRunning ? stopTimer() : startTimer();
});

resetBtn.addEventListener('click', resetTimer);

// Initial display
timeDisplay.textContent = '00:00:00';
