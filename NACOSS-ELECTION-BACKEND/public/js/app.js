const cardMaker = (title, name, text, image, options) => {
  const cardDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const label = document.createElement("label");

  h3.innerText = `${title}`;
  h3.classList.add("card");

  imgDiv.style.background = `${url(image)}`;
  imgDiv.classList.add("img");

  for (let option of options) {
    label.innerHTML = `<input type="radio" name=${name} />${option}`;
  }

  cardDiv.appendChild(imgDiv);
  cardDiv.appendChild(h3);
  cardDiv.appendChild(label);
  document.querySelector(".container").appendChild(cardDiv);
};

console.log(window.location.href);

if(window.location.pathname === '/auth/login') {
  const loginForm = document.getElementById('loginForm');
  loginForm.onsubmit = (ev) => {
    ev.preventDefault();
    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: { matNo: loginForm.matNo.value, password: loginForm.password.value },
      success: (response) => {
        console.log('Response: ' + response);
      },
      error: (err) => {
        if(err.status === 400 || err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Incorrect username or password'
          });
          loginForm.password.value = null;
        }
        console.log('Error: ' + err);
      }
    });
  };
}
