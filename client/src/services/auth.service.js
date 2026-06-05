import { renderRoute } from "../router/router";


const SESSION_STORAGE_KEY = "CURRENT_SESSION"

export function createSession(user) {
    const userSession = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        roles: user.roles ?? []
    }


    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userSession));
}

export function getSession() {
    const currentSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!currentSession) {
        return null;
    }

    try {
        return JSON.parse(currentSession)

    } catch (error) {
        console.error('Error al parsear la session: ', error);
        return null;
    }
}

export function deleteSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY)
}

// If I'm already logged in, redirect me
export function redirectIfAuthenticated(route, sessionUser) {

    if (route.redirectIfAuthenticated && sessionUser) {
        window.history.replaceState({}, "", "/dashboard");
        renderRoute();
        return true
    }
    return false
}
// Redirect to the login page if you want to access pages that require authentication
export function isLogin(route,sessionUser) {

    if (route.requiresAuth && !sessionUser) {
        window.history.replaceState({}, "", "/login");
        renderRoute()
        return true
    }
    return false

}
// Do not allow it to be visible to the admin if the user has the “user” role
export function isAdmin(route, sessionUser) {

    if (route.allowedRoles && !route.allowedRoles.some((rol) => sessionUser?.roles?.includes(rol))) {
        window.history.replaceState({}, "", "/dashboard");
        renderRoute();
        return true
    }
    return false

}

// when you clicked the log out button
export function logOut(link) {
    if(link.textContent === 'Logout'){
            deleteSession();
        }
}