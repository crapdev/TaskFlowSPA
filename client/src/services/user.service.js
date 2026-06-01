import { alertaError } from "../utils/alert";

const endpoint = 'http://localhost:3000/';

export async function getUsers() {
    try {
        const response = await fetch(`${endpoint}users`)
        
        if (response.ok == false) {
            throw new Error("Error al obtener los usuarios")
        } else {
            return await response.json()
        }

    } catch (error) {
        console.error("Error en obtenerUsuarios:", error)
        throw error
    }

}


export async function createUser(user) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    // try {
    //     await crearProducto(producto)
    //     traeDatos()
    //     alertaExitosa("Producto agregado exitosamente")
    //     formulario.reset()
    // } catch (error) {
    //     console.error("Error al agregar:", error)
    //     alertaError("Hubo un error al guardar el producto")
    // }

    if(!response.ok){
        throw new Error('Error al momento de crear un usuario')
    }
    return await response.json();
}
// GET http://localhost:3000/tasks?_expand=user





