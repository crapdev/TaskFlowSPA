import { renderLogin, setUpLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister, setUpRegister } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderTaskForm, setUpTaskForm } from "../views/task/task-form";
import { renderTasks, setUpTasks } from "../views/task/tasks";
import { renderAdmin, setUpAdmin } from "../views/users/admin";
import { renderDashboard, setUpDashboard } from "../views/users/dashboard";
import { renderProfile, setUpProfile } from "../views/users/profile";

export const routes = {
    "/": {
        render: renderHome,
        requiresAuth: false,
    },
    "/login": {
        render: renderLogin,
        setUp: setUpLogin,
        requiresAuth: false,
        redirectIfAuthenticated: true,
    },
    "/register": {
        render: renderRegister,
        setUp: setUpRegister,
        requiresAuth: false,
        redirectIfAuthenticated: true,
    },
    "/dashboard": {
        render: renderDashboard,
        setUp: setUpDashboard,
        requiresAuth: true
    },
    "/admin": {
        render: renderAdmin,
        setUp: setUpAdmin,
        requiresAuth: true,
        allowedRoles: ["ADMIN"]
    },
    "/profile": {
        render: renderProfile,
        setUp: setUpProfile,
        requiresAuth: true,
    },
    "/tasks": {
        render: renderTasks,
        setUp: setUpTasks,
        requiresAuth: true,
    },
    "/taskForm": {
        render: renderTaskForm,
        setUp: setUpTaskForm,
        requiresAuth: true,
    },
}

export const noFoundView = renderNotFound;