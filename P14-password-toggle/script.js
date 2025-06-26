const pwInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

let visibilityTimeout;

toggleBtn.addEventListener('click', () => {
  const showing = pwInput.type === 'text';
  pwInput.type = showing ? 'password' : 'text';
  toggleBtn.setAttribute('aria-pressed', String(!showing));
  toggleBtn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  eyeIcon.setAttribute('fill', showing ? '#6c757d' : '#1db954');

  clearTimeout(visibilityTimeout);
  if (!showing) {
    visibilityTimeout = setTimeout(() => {
      pwInput.type = 'password';
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('aria-label', 'Show password');
      eyeIcon.setAttribute('fill', '#6c757d');
    }, 5000);
  }
});

pwInput.addEventListener('keydown', e => {
  if (e.key === ' ') e.preventDefault();
});
