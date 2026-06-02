

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