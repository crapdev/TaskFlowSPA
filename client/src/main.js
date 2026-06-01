import "./styles/global.css";
import { renderLogin } from "./views/auth/login";
import { renderRegister, setUpRegister } from "./views/auth/register";
import { renderHome } from "./views/home";



const app = document.getElementById('app')

app.innerHTML = renderLogin(); 