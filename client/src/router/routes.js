import { renderLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderAdmin } from "../views/users/admin";
import { renderDashBoard } from "../views/users/dashboard";

const routes = {
    "/": renderHome,
    "/login": renderLogin,
    "/register": renderRegister,
    "/dashboard": renderDashBoard,
    "/admin": renderAdmin,
    // ""
    // "*": renderNotFound
}

