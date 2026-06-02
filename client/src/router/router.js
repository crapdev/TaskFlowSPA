import { noFoundView, routes } from "./routes";

export function renderRoute() {
    const app = document.getElementById('app');

    const currentPath = window.location.pathname;
    // If exists the current path, display it, else display noFoundView
    const route = routes[currentPath] ?? { render: noFoundView };
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

        const href = link.getAttribute('href');
        if (!href || !href.startsWith("/")) {
            return
        }

        event.preventDefault();
        window.history.pushState({}, "", href)
        renderRoute();
    });
}