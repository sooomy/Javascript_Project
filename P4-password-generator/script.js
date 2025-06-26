const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const includeLower = document.getElementById("include-lower");
const includeUpper = document.getElementById("include-upper");
const includeNumber = document.getElementById("include-number");
const includeSymbol = document.getElementById("include-symbol");

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+{}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const length = parseInt(lengthEl.value);
  const hasLower = includeLower.checked;
  const hasUpper = includeUpper.checked;
  const hasNumber = includeNumber.checked;
  const hasSymbol = includeSymbol.checked;

  const typesArr = [
    { fn: getRandomLower, active: hasLower },
    { fn: getRandomUpper, active: hasUpper },
    { fn: getRandomNumber, active: hasNumber },
    { fn: getRandomSymbol, active: hasSymbol }
  ].filter(t => t.active);

  if (typesArr.length === 0) {
    passwordEl.value = "Please select at least one option.";
    return;
  }

  let generatedPassword = "";

  while (generatedPassword.length < length) {
    for (let i = 0; i < typesArr.length && generatedPassword.length < length; i++) {
      generatedPassword += typesArr[i].fn();
    }
  }

  passwordEl.value = generatedPassword;
}

function copyPassword() {
  if (passwordEl.value.trim() === "" || passwordEl.value.startsWith("Please")) {
    alert("Nothing to copy!");
    return;
  }

  passwordEl.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}
