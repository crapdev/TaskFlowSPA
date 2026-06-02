

const endpoint = 'http://localhost:3000/tasks';

export async function getTasks() {
    const response = await fetch(endpoint);


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
    const response = await fetch(`${endpoint}?_expand=user&userId=${userID}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener las tareas del usuario`);
    }

    return response.json();
}

// GET http://localhost:3000/tasks?_expand=user