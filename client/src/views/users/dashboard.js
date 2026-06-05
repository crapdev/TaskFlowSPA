import { getSession } from "../../services/auth.service";
import { getAllTasks, getTasksByUser } from "../../services/task.service";

export function renderDashboard() {
    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
            <nav class="hidden gap-3 md:flex">
            <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/dashboard">Dashboard</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
            <a id="adminTag" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
            <a class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
            </nav>
        </div>
        </header>

        <main class="mx-auto max-w-6xl px-6 py-10">
        <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
            <h1 id='name' class="mt-3 text-4xl font-black tracking-tight">Bienvenido/a, </h1>
            <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
        </section>

        <section class="mt-8 grid gap-4 md:grid-cols-3">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
            <p class="text-sm text-slate-500">Tareas activas</p>
            <p id='tasks-active' class="mt-3 text-4xl font-black text-blue-700"></p>
            </article>
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
            <p class="text-sm text-slate-500">Completadas</p>
            <p id='tasks-completed' class="mt-3 text-4xl font-black text-blue-700"></p>
            </article>
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
            <p class="text-sm text-slate-500">Pendientes hoy</p>
            <p id='tasks-pending' class="mt-3 text-4xl font-black text-blue-700"></p>
            </article>
        </section>

        <section class="mt-8">
            <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
                <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
            </div>
            <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/taskForm">
                <p class="text-sm font-semibold text-blue-600">Crear</p>
                <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
                </a>
                <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
                <p class="text-sm font-semibold text-blue-600">Cuenta</p>
                <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
                </a>
            </div>
            </article>
        </section>
        </main>
    `
}


export async function setUpDashboard() {
    const name = document.getElementById('name');
    const active = document.getElementById('tasks-active');
    let tasksActive = 0;
    const completed = document.getElementById('tasks-completed');
    let tasksCompleted = 0;
    const pending  = document.getElementById('tasks-pending');
    let tasksPending = 0;

    const currentUser = getSession();
    name.textContent += currentUser.name;

    const adminButton = document.getElementById('adminTag');
    // If you do not have admin privileges, remove button and display the tasks for the user role
    if (!currentUser?.roles?.includes('ADMIN')) {
        adminButton.remove();

        const tasks = await getTasksByUser(currentUser.id);
        for (const task of tasks) {
            
            if (task.status === 'Completada') {
                tasksCompleted++;
            }else if (task.status === 'Pendiente') {
                tasksPending++;
            }else{
                tasksActive++;
            }
        }
        
        active.textContent = tasksActive;
        completed.textContent = tasksCompleted;
        pending.textContent = tasksPending;
        
        return
    }
    // shows the number of tasks for the admin role and the status of tasks for all users
    const tasks = await getAllTasks();;
        for (const task of tasks) {
            
            if (task.status === 'Completada') {
                tasksCompleted++;
            }else if (task.status === 'Pendiente') {
                tasksPending++;
            }else{
                tasksActive++;
            }
        }
        // 
        active.textContent = tasksActive;
        completed.textContent = tasksCompleted;
        pending.textContent = tasksPending;
    
}