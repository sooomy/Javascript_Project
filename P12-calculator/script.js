const display = document.getElementById('display');
let current = '0', previous = '', operator = null;

function updateDisplay() {
  display.textContent = current;
}

function appendNumber(num) {
  if (current === '0' && num !== '.') current = num;
  else if (num === '.' && current.includes('.')) return;
  else current += num;
}

function chooseOperator(op) {
  if (operator !== null) compute();
  previous = current;
  current = '0';
  operator = op;
}

function compute() {
  if (operator === null || previous === '') return;
  const a = parseFloat(previous), b = parseFloat(current);
  let res;
  switch (operator) {
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/':
      if (b === 0) { res = 'Error'; break; }
      res = a / b;
      break;
  }
  current = res.toString();
  operator = null;
  previous = '';
}

function clearAll() {
  current = '0'; previous = ''; operator = null;
}

function deleteLast() {
  if (current.length > 1) current = current.slice(0, -1);
  else current = '0';
}

document.querySelectorAll('.num').forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    chooseOperator(button.dataset.op);
    updateDisplay();
  });
});

document.getElementById('equals').addEventListener('click', () => {
  compute();
  updateDisplay();
});

document.getElementById('clear').addEventListener('click', () => {
  clearAll();
  updateDisplay();
});

document.getElementById('back').addEventListener('click', () => {
  deleteLast();
  updateDisplay();
});

window.addEventListener('keydown', e => {
  if (/\d/.test(e.key)) appendNumber(e.key);
  else if (e.key === '.') appendNumber('.');
  else if (['+', '-', '*', '/'].includes(e.key)) chooseOperator(e.key);
  else if (e.key === 'Enter' || e.key === '=') compute();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key.toLowerCase() === 'c') clearAll();
  updateDisplay();
});

updateDisplay();
