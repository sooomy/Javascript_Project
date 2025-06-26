const form = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const messageEl = document.getElementById('message');

// Script Web App déployé
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyV3CmAynlif4fQySgPP6JbOqLC0ipmweoi3D197E2-iS9tC9b8Gf-rOd1WC4qLXNhMaw/exec';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    return showMessage('❌ Invalid email address', 'error');
  }

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `Email=${encodeURIComponent(email)}`
  })
    .then(() => {
      showMessage('✅ Successfully subscribed!', 'success');
      form.reset();
    })
    .catch(() => {
      showMessage('⚠️ Error occurred. Try again.', 'error');
    });
});

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function showMessage(msg, type) {
  messageEl.textContent = msg;
  messageEl.className = `small ${type}`;
}
