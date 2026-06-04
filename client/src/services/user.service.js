import { alertaError } from "../utils/alert";

const endpoint = 'http://localhost:3000/users';

export async function getUsers() {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return response.json();
}

export async function createUser(user) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo crear el usuario`);
    }

    return response.json();
}

export async function updateUser(userId, updatedUser) {
    const response = await fetch(`${endpoint}/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo actualizar el usuario`);
    }

    return response.json();
}

export async function deleteUser(userId) {
    const response = await fetch(`${endpoint}/${userId}`, {
        method: 'DELETE'
    }); 

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo eliminar el usuario`);
    }

    return response.json();
}


export async function findUser(email, password = null) {
    const emailClean = encodeURIComponent(email.toLowerCase().trim());
    const passwordClean = password ? encodeURIComponent(password.trim()) : null;
    
    // Si se tiene contraseña, se busca por email y password, si no, solo por email
    const url = passwordClean ? `${endpoint}?email=${emailClean}&password=${passwordClean}` : `${endpoint}?email=${emailClean}`;
    

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo buscar el usuario`);
    }

    const users = await response.json();
    
    // Si encuentra usuarios, retorna el primero, si no, retorna null
    return users.length > 0 ? users[0] : null;
}


