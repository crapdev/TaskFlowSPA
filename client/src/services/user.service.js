export async function crearUsuario(usuario) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if(!response.ok){
        throw new Error('Error al momento de crear un usuario')
    }
    return await response.json();
}