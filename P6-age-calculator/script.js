const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const resultDiv = document.getElementById("result");

ageForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const dobValue = dobInput.value;

  if (!dobValue) {
    resultDiv.textContent = "Please enter a valid date of birth.";
    return;
  }

  const today = new Date();
  const dob = new Date(dobValue);

  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  // Adjust months and years if necessary
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageYears < 0) {
    resultDiv.textContent = "The selected date is in the future!";
    return;
  }

  resultDiv.textContent = `You are ${ageYears} year(s), ${ageMonths} month(s), and ${ageDays} day(s) old.`;
});
