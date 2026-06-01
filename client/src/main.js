import { routes } from "./router/routes";
import "./styles/global.css";
import { alertaExitosa } from "./utils/alert";
import { renderLogin } from "./views/auth/login";
import { renderRegister, setUpRegister } from "./views/auth/register";
import { renderHome } from "./views/home";



const app = document.getElementById('app')

app.innerHTML = routes["/"].render();
alertaExitosa("Bienvenido a TaskFlow!");
