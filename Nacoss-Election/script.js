const matricNumber = document.querySelector("#matric-number");
const password = document.querySelector("#password");
const matricNumberError = document.querySelector(
  ".matric-number-error-message"
);
const passwordError = document.querySelector(".password-error-message");

document.querySelector(".btn-submit").addEventListener("click", (e) => {
  // matric number validation
  if (!matricNumber.value.length) {
    // EMPTY CASE
    matricNumberError.innerText = "matric number is required";
    matricNumberError.classList.add("error-message");
  } else if (matricNumber.value.length < 9) {
    // LESS THAN 9 CHARACTERS
    matricNumberError.innerText =
      "matric number must not be less than 9 characters";
    matricNumberError.classList.add("error-message");
  } else if (matricNumber.value.length > 9) {
    // MORE THAN 9 CHARACTERS
    matricNumberError.innerText =
      "matric number must not be more than 9 characters";
    matricNumberError.classList.add("error-message");
  } else {
    matricNumberError.innerText = "";
  }

  // password validation
  if (!password.value.length) {
    passwordError.textContent = "password is required";
    passwordError.classList.add("error-message");
  } else if (password.value.length < 10) {
    passwordError.textContent = "password must not be less than 10 characters";
    passwordError.classList.add("error-message");
  } else if (password.value.length > 10) {
    passwordError.textContent = "password must not be more than 10 characters";
    passwordError.classList.add("error-message");
  } else {
    passwordError.textContent = "";
  }
});
