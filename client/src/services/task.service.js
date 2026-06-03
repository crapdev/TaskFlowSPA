

const endpoint = 'http://localhost:3000/tasks';

export async function getTasks() {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        throw new Error("Error al obtener las tareas ");
    }
    return response.json();

}


export async function createTask(task) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo crear la tarea`);
    }

    return response.json();
}

export async function getTasksByUser(userID) {
    const response = await fetch(`${endpoint}?userID=${userID}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener las tareas del usuario`);
    }

    return response.json();
}

// http://localhost:3000/tasks?_embed=user         trae todas las tareas con su usuario incluido (admins)
// http://localhost:3000/tasks?userID=${id a buscar}     trae las tareas de un usuario (user)