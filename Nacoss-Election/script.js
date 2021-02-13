const matricNumber = document.querySelector("#matric");
const password = document.querySelector("#password");
const matricNumberError = document.querySelector(
  ".matric-number-error-message"
);
const passwordError = document.querySelector(".password-error-message");

const btnSubmit = document.querySelector(".btn-submit");

matricNumber.addEventListener("keypress", (e) => {
  if (matricNumber.value.length > 8) {
    e.preventDefault();
  }
});

password.addEventListener("keypress", (e) => {
  if (password.value.length > 9) {
    e.preventDefault();
  }
});

btnSubmit.addEventListener("click", (e) => {
  // matric number validation
  if (!matricNumber.value.length) {
    // EMPTY CASE
    matricNumberError.innerText = "matric number is required";
    matricNumberError.classList.add("error-message");
    e.preventDefault();
  } else if (matricNumber.value.length < 9) {
    // LESS THAN 9 CHARACTERS
    matricNumberError.innerText =
      "matric number must not be less than 9 characters";
    matricNumberError.classList.add("error-message");
    e.preventDefault();
  } else {
    matricNumberError.innerText = "";
  }

  // password validation
  if (!password.value.length) {
    passwordError.innerText = "password is required";
    passwordError.classList.add("error-message");
    e.preventDefault();
  } else if (password.value.length < 10) {
    passwordError.innerText = "password must not be less than 10 characters";
    passwordError.classList.add("error-message");
    e.preventDefault();
  } else {
    passwordError.innerText = "";
  }
});
