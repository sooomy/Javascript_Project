const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const togglePasswordBtn = document.getElementById('togglePassword');

const criteria = {
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  number: document.getElementById('number'),
  special: document.getElementById('special')
};

togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.innerHTML = type === 'password'
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
});

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let score = 0;

  // Validate each criterion
  if (val.length >= 8) {
    criteria.length.classList.add('met');
    score += 1;
  } else {
    criteria.length.classList.remove('met');
  }

  if (/[A-Z]/.test(val)) {
    criteria.uppercase.classList.add('met');
    score += 1;
  } else {
    criteria.uppercase.classList.remove('met');
  }

  if (/[a-z]/.test(val)) {
    criteria.lowercase.classList.add('met');
    score += 1;
  } else {
    criteria.lowercase.classList.remove('met');
  }

  if (/\d/.test(val)) {
    criteria.number.classList.add('met');
    score += 1;
  } else {
    criteria.number.classList.remove('met');
  }

  if (/[\W_]/.test(val)) {
    criteria.special.classList.add('met');
    score += 1;
  } else {
    criteria.special.classList.remove('met');
  }

  updateStrengthBar(score);
});

function updateStrengthBar(score) {
  const percent = (score / 5) * 100;
  strengthBar.style.width = percent + '%';

  let color = '#e74c3c';
  let text = 'Very Weak';

  if (score === 5) {
    color = '#1db954';
    text = 'Very Strong';
  } else if (score >= 4) {
    color = '#27ae60';
    text = 'Strong';
  } else if (score >= 3) {
    color = '#f39c12';
    text = 'Medium';
  } else if (score >= 2) {
    color = '#e67e22';
    text = 'Weak';
  }

  strengthBar.style.backgroundColor = color;
  strengthText.textContent = text;
}
