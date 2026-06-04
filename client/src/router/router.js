import { deleteSession, getSession, isAdmin, isLogin, logOut, redirectIfAuthenticated } from "../services/auth.service";
import { noFoundView, routes } from "./routes";

export function renderRoute() {
    const app = document.getElementById('app');

    const currentPath = window.location.pathname;
    // If exists the current path, display it, else display noFoundView
    const route = routes[currentPath] ?? { render: noFoundView };

    // Si cualquiera de las tres devuelve true, se activa el return y detiene el router
    const sessionUser = getSession();
    if (redirectIfAuthenticated(route,sessionUser) || isLogin(route,sessionUser) || isAdmin(route, sessionUser)) return;


    app.innerHTML = route.render();

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
        logOut(link);

        const href = link.getAttribute('href');
        if (!href || !href.startsWith("/")) {
            return
        }

        event.preventDefault();
        window.history.pushState({}, "", href)
        renderRoute();
    });
    window.addEventListener('popstate', renderRoute)
    // renderRoute();
}