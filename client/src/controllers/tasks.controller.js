import { getSession } from "../services/auth.service";


export function renderMyTasks() {
    const sessionUser = getSession();

    if(sessionUser.roles.includes('ADMIN')){
        console.log('Eres Admin')
    }
}