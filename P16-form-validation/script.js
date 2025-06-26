const form = document.getElementById('form');
const username = document.getElementById('username');
const email    = document.getElementById('email');
const password = document.getElementById('password');
const confirm  = document.getElementById('confirm');

function showError(input, message) {
  const control = input.parentElement;
  control.classList.add('error');
  control.classList.remove('success');
  control.querySelector('small').textContent = message;
}

function showSuccess(input) {
  const control = input.parentElement;
  control.classList.add('success');
  control.classList.remove('error');
}

function checkRequired(inputs) {
  let valid = true;
  inputs.forEach(i => {
    if (!i.value.trim()) {
      showError(i, `${getFieldName(i)} is required`);
      valid = false;
    } else {
      showSuccess(i);
    }
  });
  return valid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    return false;
  }
  if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    return false;
  }
  showSuccess(input);
  return true;
}

function checkEmail(input) {
  const re = /^\S+@\S+\.\S+$/;
  if (re.test(input.value.trim())) showSuccess(input);
  else showError(input, 'Email is not valid');
}

function checkPasswordsMatch(p1, p2) {
  if (p1.value !== p2.value) showError(p2, 'Passwords do not match');
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkRequired([username, email, password, confirm])) return;
  if (!checkLength(username, 3, 15)) return;
  checkEmail(email);
  if (checkLength(password, 8, 25)) checkPasswordsMatch(password, confirm);
});
