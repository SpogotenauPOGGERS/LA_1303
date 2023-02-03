const main = document.querySelector("#main");
import { getToken } from "../userManager.js";

export default function renderShoesPage() {
  main.innerHTML = "<h1>All shoes</h1>";
  if (getToken() !== null) {
    let addShoe = document.createElement("div");
    addShoe.classList.add("addShoe");
    addShoe.innerHTML = `
  <p class="addText">Add new shoe</p>
  <button class="add"><i class="fa-regular fa-square-plus"></i></button>
  `;
    main.append(addShoe);
    document.querySelector(".add").addEventListener("click", (e) => {
      clearElement(main);
      let addForm = document.createElement("form");
      addForm.classList.add("addShoeForm");
      addForm.addEventListener("submit", handleAdd);
      let createNameInputField = document.createElement("input");
      createNameInputField.classList.add("createNameInputField");
      createNameInputField.required = true;
      createNameInputField.type = "text";
      createNameInputField.placeholder = "Name";
      addForm.append(createNameInputField);
      let createYearInputField = document.createElement("input");
      createYearInputField.classList.add("createYearInputField");
      createYearInputField.required = true;
      createYearInputField.type = "text";
      createYearInputField.placeholder = "Release year";
      addForm.append(createYearInputField);
      let createColorWayInputField = document.createElement("input");
      createColorWayInputField.classList.add("createColorWayInputField");
      createColorWayInputField.required = true;
      createColorWayInputField.type = "text";
      createColorWayInputField.placeholder = "Color way";
      addForm.append(createColorWayInputField);
      let createPriceInputField = document.createElement("input");
      createPriceInputField.classList.add("createPriceInputField");
      createPriceInputField.required = true;
      createPriceInputField.type = "text";
      createPriceInputField.placeholder = "Price";
      addForm.append(createPriceInputField);
      let createBTN = document.createElement("button");
      createBTN.classList.add("createBTN");
      createBTN.type = "submit";
      createBTN.textContent = "Add Shoe";
      addForm.append(createBTN);
      main.append(addForm);
    });
  }
  fetch("http://localhost:5000/allShoes")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((shoe) => {
        const shoeDiv = document.createElement("div");
        shoeDiv.innerHTML = `
          <div class ="shoeNames">${shoe.name}</div>
        `;
        main.appendChild(shoeDiv);
      });
      const shoeNames = document.querySelectorAll(".shoeNames");
      shoeNames.forEach((name) => {
        name.addEventListener("click", (e) => {
          const shoe = data.find((shoe) => shoe.name == e.target.textContent);
          displayShoe(shoe);
        });
      });
    });
}

function displayShoe(shoe) {
  removeHash();
  clearElement(main);
  console.log(shoe);
  let shoeInfo = document.createElement("div");
  shoeInfo.classList.add("shoeInfo");
  shoeInfo.innerHTML = `
        <p><span>Name:</span> ${shoe.name}</p>
        <p><span>Release year:</span> ${shoe.release}</p>
        <p><span>Colorway:</span> ${shoe.colorWay}</p>
        <p><span>Price:</span> ${shoe.price}</p>
      `;
  console.log(shoe.id);
  main.append(shoeInfo);
  let selection = document.createElement("div");
  selection.classList.add("selection");
  selection.innerHTML = ` 
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-regular fa-trash-can"></i></button>`;
  if (getToken() !== null) {
    main.append(selection);
    document.querySelector(".delete").addEventListener("click", (e) => {
      fetch(`http://localhost:5000/deleteShoe/${shoe.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          removeHash();
          location.hash = "shoes";
        });
    });
    document.querySelector(".edit").addEventListener("click", (e) => {
      clearElement(main);
      let editForm = document.createElement("form");
      editForm.classList.add("addShoeForm");
      editForm.addEventListener("submit", (e) => handleEdit(e, shoe));
      let NameInputField = document.createElement("input");
      NameInputField.classList.add("NameInputField");
      NameInputField.required = true;
      NameInputField.type = "text";
      NameInputField.placeholder = "Name";
      editForm.append(NameInputField);
      let YearInputField = document.createElement("input");
      YearInputField.classList.add("YearInputField");
      YearInputField.required = true;
      YearInputField.type = "text";
      YearInputField.placeholder = "Release year";
      editForm.append(YearInputField);
      let ColorWayInputField = document.createElement("input");
      ColorWayInputField.classList.add("ColorWayInputField");
      ColorWayInputField.required = true;
      ColorWayInputField.type = "text";
      ColorWayInputField.placeholder = "Color way";
      editForm.append(ColorWayInputField);
      let PriceInputField = document.createElement("input");
      PriceInputField.classList.add("PriceInputField");
      PriceInputField.required = true;
      PriceInputField.type = "text";
      PriceInputField.placeholder = "Price";
      editForm.append(PriceInputField);
      let editBTN = document.createElement("button");
      editBTN.classList.add("editBTN");
      editBTN.type = "submit";
      editBTN.textContent = "Edit Shoe";
      editForm.append(editBTN);
      main.append(editForm);
    });
  }
}

function handleAdd(e) {
  e.preventDefault();
  const dataAd = {
    name: e.target[0].value,
    release: e.target[1].value,
    colorWay: e.target[2].value,
    price: e.target[3].value,
  };
  fetch("http://localhost:5000/addShoe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataAd),
  })
    .then((res) => res.json())
    .then((data) => {
      removeHash();
      location.hash = "shoes";
    });
}

function handleEdit(e, shoe) {
  e.preventDefault();
  const dataEd = {
    name: e.target[0].value,
    release: e.target[1].value,
    colorWay: e.target[2].value,
    price: e.target[3].value,
  };
  fetch(`http://localhost:5000/changeShoe/${shoe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataEd),
  })
    .then((res) => res.json())
    .then((data) => {
      removeHash();
      location.hash = "shoes";
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
