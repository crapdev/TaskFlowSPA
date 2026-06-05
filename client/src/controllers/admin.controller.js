import { renderRoute } from "../router/router";
import { deleteUser, findUser, getUsers, updateUser } from "../services/user.service";
import { alertaConfirmacion, alertaError, alertaExitosa } from "../utils/alert";

export async function renderAllUsers() {
    const userList = document.getElementById('user-list');
    const allUsers = await getUsers();
    
    for (const user of allUsers) {
        userList.innerHTML += `
            
             <div class="rounded-2xl bg-blue-50 p-3">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="font-bold text-slate-900">${user.name} ${user.lastname}</p>
                    <p class="text-sm text-slate-500">${user.email}</p>
                    <p class="text-sm text-slate-500">ID: ${user.id}</p>
                    </div>
                    <div class="flex gap-2">
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${user.roles}</span>
                    <button type="button" class="btn-edit rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white cursor-pointer edit-user-btn"
                    
                    data-id="${user.id}"
                    data-name="${user.name}"
                    data-lastname="${user.lastname}"
                    data-email="${user.email}"
                    data-password="${user.password}"
                    data-roles="${user.roles}"

                    >Editar</button>

                    <button type="button" class="btn-delete rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer delete-user-btn"
                    
                    data-id="${user.id}"

                    >Eliminar</button>
                </div>
            </div>
        </div>
        `
    }
}



export  function buttonsAdmins(){
    // to fish the modal and modal inputs
    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-form");
    const editName = document.getElementById("edit-name");
    const editLastname = document.getElementById("edit-lastname");
    const editEmail = document.getElementById("edit-email");
    const editPassword = document.getElementById("edit-password");
    const editRole = document.getElementById("edit-role");

    // modal buttons
    const saveModal = document.getElementById("save-modal");
    const closeModal = document.getElementById("close-modal");

    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => {
        btn.addEventListener('click', () =>{
            const dataUser = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                lastname: btn.dataset.lastname,
                email: btn.dataset.email,
                password: btn.dataset.password,
                roles: btn.dataset.roles,

            }
            // fill in some fields
            editModal.classList.remove('hidden')
            editName.value = dataUser.name;
            editLastname.value = dataUser.lastname;
            editEmail.value = dataUser.email;
            editRole.value = dataUser.roles
            // I'll send the email and then verify it
            editEmail.dataset.email = dataUser.email; 
            // and save the id for update user
            saveModal.dataset.id = btn.dataset.id;

            return
            
        });
    });

    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click', async () =>{
            const result = await alertaConfirmacion();
            if (result) {
                deleteUser(btn.dataset.id);
                alertaExitosa('Tarea eliminada exitosamente');
                renderRoute();
            }
            return

        });
    });

    // MODAL BUTTONS
    editForm.addEventListener('submit', async (event) =>{
            event.preventDefault();

            // Ensure that the email address cannot be updated to that of another existing user
            const existingUser = await findUser(editEmail.value);

            const currentEmail = editEmail.dataset.email;
            if (existingUser && existingUser.email != currentEmail) {
                alertaError('Este correo ya corresponde a otro usuario')
                return
            }
            // update, if the email != a exists user
            const dataUser = {
                name: editName.value,
                lastname: editLastname.value,
                email: editEmail.value,
                password: editPassword.value,
                roles: editRole.value,
            }
            const currentId = saveModal.dataset.id
            await updateUser(currentId, dataUser)
            editModal.classList.add('hidden');
            alertaExitosa('Se han actualizado los datos exitosamente');
            renderRoute();
            
        });


    closeModal.addEventListener('click', () =>{
        editModal.classList.add('hidden');

    });

  
}
