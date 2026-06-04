import { renderRoute } from "../router/router";
import { getSession } from "../services/auth.service";
import { deleteTask, getAllTasks, getTasksByUser, updateTask } from "../services/task.service";
import { alertaExitosa } from "../utils/alert";


export async function renderMyTasks(currentUser) {
    const tasksList = document.getElementById('tasksList');

    if(currentUser.roles.includes('ADMIN')){

        const tasks = await getAllTasks();
        
        for (const task of tasks) {

            const { date , description, id, status, title, user, userId} = task;
            tasksList.innerHTML += `        
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${status} - ${date} </p>
                            <h2 class="mt-2 text-2xl font-bold text-slate-900">${title}</h2>
                            <p class="mt-3 max-w-2xl text-slate-600">${description}</p>
                        </div>
                        <div class="flex flex-col items-center ">
                            <div>
                                <button class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" 
                                data-title='${title}'
                                data-description='${description}'
                                data-status='${status}'
                                data-date='${date}'
                                data-id='${id}'
                                data-userid='${userId}'
                                 '>
                                    Editar
                                </button>

                                <button class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"" 
                                data-id='${id}' >
                                    Eliminar
                                </button>
                            </div>
                            <span class="mt-3 max-w-2xl text-sm text-slate-900">Creada por <strong>${currentUser.name === user.name ? 'Tí' : user.name}</strong></span>
                        </div>
                    </div>
                </article>
                `;
            
        }
        return

    }
    const tasks = await getTasksByUser(currentUser.id);

    for (const task of tasks) {

        const {date , description, id, status, title, userId} = task;
        tasksList.innerHTML += `        
                <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
                    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${status} - ${date} </p>
                            <h2 class="mt-2 text-2xl font-bold text-slate-900">${title}</h2>
                            <p class="mt-3 max-w-2xl text-slate-600">${description}</p>
                        </div>
                        <div class="flex flex-col items-center ">
                            <div>
                                <button class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                                data-title='${title}'
                                data-description='${description}'
                                data-status='${status}'
                                data-date='${date}'
                                data-id='${id}'
                                >
                                    Editar
                                </button>

                                <button class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50""
                                data-id='${id}'>
                                    Eliminar
                                </button>
                            </div>
                            <span class="mt-3 max-w-2xl text-sm text-slate-900">Creada por <strong>Tí</strong></span>
                        </div>
                    </div>
                </article>
                `;

    }

}



export  function buttonsTask() {

    document.addEventListener('click', (event) => {
        const btn = event.target.closest('button'); // Get the tag a clicked
        if (!btn) {
            return
        }
        if (btn.textContent.trim() == 'Editar') {
            const dataTask = {
                id: btn.dataset.id,
                title: btn.dataset.title,
                description: btn.dataset.description,
                status: btn.dataset.status,
                date: btn.dataset.date,
            }
            localStorage.setItem('EDIT_TASK', JSON.stringify(dataTask))
            // redirect
            window.history.replaceState({}, "", "/taskForm");
            renderRoute();
        }

        if (btn.textContent.trim() == 'Eliminar') {
            deleteTask(btn.dataset.id);
            alertaExitosa('Tarea eliminada exitosamente');
            renderRoute();
        }

    
    });

}