import { getSession, isAdmin, isLogin, redirectIfAuthenticated } from "../services/auth.service";
import { noFoundView, routes } from "./routes";

export function renderRoute() {
    const app = document.getElementById('app');

    const currentPath = window.location.pathname;
    // If exists the current path, display it, else display noFoundView
    const route = routes[currentPath] ?? { render: noFoundView };

    // Si cualquiera de las tres devuelve true, se activa el return y detiene el router
    if (redirectIfAuthenticated(route) || isLogin(route) || isAdmin(route)) return;


    app.innerHTML = route.render();

    const adminButton = document.getElementById('adminTag');
    // Si el botón de admin existe en la vista actual, y no tiene rol de admin, remover
    if (adminButton && !sessionUser?.roles?.includes('ADMIN')) {
        adminButton.remove();
    }

    // then when the route exists, display its setUp
    if (route.setUp) {
        route.setUp();
    }

}

export function initRouter() {
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a'); // Get the tag a clicked
        if (!link) {
            return
        }

        const href = link.getAttribute('href');
        if (!href || !href.startsWith("/")) {
            return
        }

        event.preventDefault();
        window.history.pushState({}, "", href)
        renderRoute();
    });
    window.addEventListener('popstate', renderRoute)
    renderRoute();
}