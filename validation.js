// Validates one field and toggles Bootstrap is-valid / is-invalid classes
function validateField(field) {
  if (field.checkValidity()) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    return true;
  }
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");
  return false;
}

function initLiveValidation(formId, resultId, successText) {
  const form = document.getElementById(formId);
  const result = document.getElementById(resultId);
  const fields = form.querySelectorAll("input, textarea, select");

  fields.forEach(f => f.addEventListener("input", () => validateField(f)));

  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    fields.forEach(f => { if (!validateField(f)) ok = false; });
    result.innerHTML = ok
      ? `<div class="alert alert-success">${successText}</div>`
      : `<div class="alert alert-danger">Please fix the errors above.</div>`;
  });
}
