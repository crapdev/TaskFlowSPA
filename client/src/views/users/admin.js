import { buttonsAdmins, renderAllUsers } from "../../controllers/admin.controller"
import { getUsers } from "../../services/user.service"

export function renderAdmin() {

    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
            <nav class="hidden gap-3 md:flex">
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/dashboard">Dashboard</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/tasks">Tareas</a>
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    href="/profile">Perfil</a>
                <a id="adminTag" class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                    href="/admin">Admin</a>
            </nav>
        </div>
    </header>
    
    <main class="mx-auto max-w-7xl px-6 py-10">
        <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
            <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
            <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo
                general del sistema.</p>
        </section>

        <div id="edit-modal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 hidden">

            <div class="bg-white p-8 rounded-2xl w-[400px]">

                <h2 class="text-2xl font-bold mb-6">Editar usuario</h2>

                <form id="edit-form" class="flex flex-col gap-3">

                    <label class="block font-bold text-sm">Nombre</label>
                    <input type="text" id="edit-name" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Apellido</label>
                    <input type="text" id="edit-lastname" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Correo</label>
                    <input type="email" id="edit-email" class="border p-3 rounded-xl" required>

                    <label class="block font-bold text-sm">Contraseña</label>
                    <input type="password" id="edit-password" class="border p-3 rounded-xl" required>
                   
                    <label class="block font-bold text-sm" for="register-role">Rol</label>
                    <select id="edit-role" class="w-full rounded-2xl border border-blue-100 bg-blue-100 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                        <option>USER</option>
                        <option>ADMIN</option>
                    </select>
                            
                    <div class="flex gap-3 mt-4">

                        <button id="save-modal" type="submit" 
                        class="bg-indigo-600 text-white px-4 py-3 rounded-xl cursor-pointer">
                        Guardar
                        </button>

                        <button id="close-modal" type="button" class="bg-slate-200 px-4 py-3 rounded-xl cursor-pointer">
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
                <div class="mt-5 grid gap-4">
                    <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        href="/admin">Gestionar usuarios</a>
                    <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        href="/tasks">Ver todas las tareas</a>
                    <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        href="/dashboard">Volver al dashboard</a>
                </div>
            </article>
    
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
                    <span
                        class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Mockup</span>
                </div>

                <div id='user-list' class="mt-5 space-y-4">

                </div>
                
            </article>
        </section>
    </main>
    `
}

export async function setUpAdmin() {
    await renderAllUsers();
    buttonsAdmins();

    
}


// para cuando vaya a mostrar todos los usuarios, si dentro de los usuarios que esta recorriendo es el mismo que el que esta logueado, no mostrar la opcion de editar rol 
// y pobner algo como "YOURSELF" y mostrar al prinpicio de la lista, y para el resto de usuarios mostrar la opcion de editar rol.