

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


export async function updateTask(taskId, updatedTask) {
    const response = await fetch(`${endpoint}/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo actualizar la tarea`);
    }

    return response.json();
}

export async function deleteTask(taskId) {
    const response = await fetch(`${endpoint}/${taskId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo eliminar la tarea`);
    }

    return response.json();
}

// retrieves a user's tasks
export async function getTasksByUser(userID) {
    const response = await fetch(`${endpoint}?userId=${userID}`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener las tareas del usuario`);
    }

    return response.json();
}


// retrieves all tasks along with their users (admins)
export async function getAllTasks() {
    const response = await fetch(`${endpoint}?_embed=user`);

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener las tareas del usuario`);
    }

    return response.json();
}
