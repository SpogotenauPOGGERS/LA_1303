const main = document.querySelector("#main");

import { setToken, getToken, logOut } from "../userManager.js";

export default function renderLoginPage() {
  clearElement(main);
  if (getToken() == null) {
    let logText = document.createElement("p");
    logText.textContent = "Login";
    logText.classList.add("logText");
    main.append(logText);
    let form = document.createElement("form");
    form.classList.add("loginPage");
    form.addEventListener("submit", handleLogin);
    let usernameInputField = document.createElement("input");
    usernameInputField.classList.add("usernameInputField");
    usernameInputField.required = true;
    usernameInputField.type = "text";
    usernameInputField.placeholder = "Username";
    form.append(usernameInputField);
    let passwordInputField = document.createElement("input");
    passwordInputField.classList.add("passwordInputField");
    passwordInputField.required = true;
    passwordInputField.type = "password";
    passwordInputField.placeholder = "Password";
    form.append(passwordInputField);
    let submitBTN = document.createElement("button");
    submitBTN.classList.add("submitBTN");
    submitBTN.type = "submit";
    submitBTN.textContent = "Log in";
    form.append(submitBTN);
    main.append(form);
  }
  if (getToken() !== null) {
    clearElement(main);
    console.log("einge");
    let userLogged = document.createElement("p");
    let logOutBTN = document.createElement("button");
    logOutBTN.classList.add("logOut");
    logOutBTN.textContent = "Log out";
    logOutBTN.addEventListener("click", (e) => {
      logOut();
      removeHash();
      location.hash = "login";
    });
    userLogged.classList.add("userLogged");
    userLogged.textContent = "Already logged in";

    main.append(userLogged);
    main.append(logOutBTN);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const dataPe = {
    name: e.target[0].value,
    password: e.target[1].value,
  };
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataPe),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.login) {
        setToken(data.token);
        location.hash = "shoes";
        console.log("YEAH");
      } else {
        const wrongLogin = document.createElement("p");
        wrongLogin.classList.add("wrongLogin");
        wrongLogin.textContent = "Falsches Passwort oder Nutzername";
        document.querySelector(".loginPage").append(wrongLogin);
        console.log("NAH");
      }
    });
}

function removeHash() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
