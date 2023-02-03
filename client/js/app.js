import Router from "./Router.js";
import renderHomePage from "./pages/homePage.js";
import renderShoesPage from "./pages/shoesPage.js";
import renderRegisterPage from "./pages/registerPage.js";
import renderLoginPage from "./pages/loginPage.js";
import renderNotFoundPage from "./pages/notFoundPage.js";

const routes = {
  home: { hash: "#home", function: renderHomePage },
  shoes: { hash: "#shoes", function: renderShoesPage },
  login: { hash: "#login", function: renderLoginPage },
  register: { hash: "#register", function: renderRegisterPage },
  error: { function: renderNotFoundPage },
};

const router = new Router(routes);

router.urlResolve();
