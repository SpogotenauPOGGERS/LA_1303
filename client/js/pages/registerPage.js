const main = document.querySelector("#main");
import { setToken, getToken, logOut } from "../userManager.js";

export default function renderRegisterPage() {
  clearElement(main);
  let regText = document.createElement("p");
  regText.textContent = "Register";
  regText.classList.add("regText");
  main.append(regText);
  let form = document.createElement("form");
  form.classList.add("registerPage");
  form.addEventListener("submit", crack);
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
  submitBTN.textContent = "Register";
  form.append(submitBTN);
  main.append(form);
  console.log("hallo");
  if (getToken() !== null) {
    clearElement(main);
    console.log("regi");
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

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function crack(e) {
  e.preventDefault();
  const user = {
    name: e.target[0].value,
    password: e.target[1].value,
  };
  console.log(user);
  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.register) {
        location.hash = "login";
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
