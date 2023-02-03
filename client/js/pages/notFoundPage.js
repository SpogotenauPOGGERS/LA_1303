const main = document.querySelector("#main");

export default function renderNotFoundPage() {
  main.innerHTML = `
    <div class="not-found-page">
      <h1>404 Not Found</h1>
    </div>
  `;
}
