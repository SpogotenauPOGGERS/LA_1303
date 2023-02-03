const main = document.querySelector("#main");
const listLoader = document.querySelector("#klick");

export function renderAllShoes() {
  fetch("http://localhost:5000/allShoes")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((shoe) => {
        let div = document.createElement("div");
        console.log(div.classList);
        div.classList.add("shoeNames");
        console.log(div.classList);
        div.textContent = shoe.name;
        div.id = shoe.id;
        main.appendChild(div);
      });
      const shoeNames = document.querySelectorAll(".shoeNames");
      shoeNames.forEach((name) => {
        name.addEventListener("click", (e) => {
          const shoe = data.find((shoe) => shoe.name == e.target.textContent);
        });
      });
    });
}
