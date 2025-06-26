const launchDate = new Date('2025-12-31T00:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const notifyBtn = document.getElementById('notifyBtn');

function updateCountdown() {
  const now = new Date().getTime();
  const diff = launchDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    document.querySelector('.coming-soon-container').innerHTML =
      '<h1>🎉 We Are Live!</h1>';
    return;
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minMs = 1000 * 60;

  const d = Math.floor(diff / dayMs);
  const h = Math.floor((diff % dayMs) / hourMs);
  const m = Math.floor((diff % hourMs) / minMs);
  const s = Math.floor((diff % minMs) / 1000);

  daysEl.textContent = String(d).padStart(2, '0');
  hoursEl.textContent = String(h).padStart(2, '0');
  minutesEl.textContent = String(m).padStart(2, '0');
  secondsEl.textContent = String(s).padStart(2, '0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Option: ouvrir une popup de notification
notifyBtn.addEventListener('click', () => {
  alert("We'll notify you when we launch 🚀");
});
