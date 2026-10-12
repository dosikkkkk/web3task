const form = document.getElementById("regForm");
const result = document.getElementById("result");
const password = document.getElementById("password");
const confirmPw = document.getElementById("confirmPassword");
const genderError = document.querySelector(".gender-error");
const textFields = form.querySelectorAll(
  "#firstName, #lastName, #email, #password, #confirmPassword, #country"
);

function checkPasswordMatch() {
  // Custom validity so HTML5 and Bootstrap work together
  if (confirmPw.value && confirmPw.value !== password.value) {
    confirmPw.setCustomValidity("Passwords do not match");
  } else {
    confirmPw.setCustomValidity("");
  }
  const fb = document.getElementById("confirmFeedback");
  fb.textContent = confirmPw.value === "" ? "Please confirm your password." : "Passwords do not match.";
}

function checkGender() {
  const chosen = form.querySelector('input[name="gender"]:checked');
  genderError.hidden = !!chosen;
  return !!chosen;
}

textFields.forEach(f => {
  f.addEventListener("input", () => {
    checkPasswordMatch();
    validateField(f);
    if (f === password && confirmPw.value) validateField(confirmPw);
  });
});
form.querySelectorAll('input[name="gender"]').forEach(r =>
  r.addEventListener("change", checkGender)
);

form.addEventListener("submit", e => {
  e.preventDefault();
  checkPasswordMatch();
  let ok = true;
  textFields.forEach(f => { if (!validateField(f)) ok = false; });
  if (!checkGender()) ok = false;

  if (ok) {
    const hobbies = [...form.querySelectorAll('input[name="hobbies"]:checked')].map(h => h.value);
    result.innerHTML = `<div class="alert alert-success">Registration successful! Hobbies: ${hobbies.join(", ") || "none"}.</div>`;
  } else {
    result.innerHTML = `<div class="alert alert-danger">Please fix the errors above.</div>`;
  }
});

form.addEventListener("reset", () => {
  form.querySelectorAll(".is-valid, .is-invalid").forEach(el => el.classList.remove("is-valid", "is-invalid"));
  genderError.hidden = true;
  confirmPw.setCustomValidity("");
  result.innerHTML = "";
});
