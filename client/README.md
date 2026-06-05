# TaskFlowSPA
Project to understand the structure of a single-page application (SPA), improve its logic and distribution of responsibilities, as well as API usage.

## 📖 Description
The goal of this project was to build a single-page application (SPA) for task management using vanilla JavaScript, HTML, CSS, and Tailwind CSS, serving as a practical exercise in modern front-end architecture, modularization, client-side routing, and access control without using SPA frameworks.

### 🕵️ Features:
- **Routing SPA** 
- **CRUD for tasks and users** 
- **Route protection** 
- **modularization** 
- **privileged actions via roles** 

## 📂 Project Structure

The project is divided in two main parts:

- **`/client`**: Contains the user interface built with **Vite** and **Tailwind CSS**.
- **`/server`**: Contains the backend, simulating the data server using JSON Server. **json-server**.

```bash
.
├── server
│   ├── database.json
├── client
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── components/
│   │   ├── controllers/
│   │   ├── router/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── views/
│   │   └── main.js
│   ├── index.html
│   ├── README.md
│   └── vite.config.ts
├── LICENSE
└── README.md

```

## ⚙️ Stack Tech

- **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS.
- **Backend :** JSON Server.
- **Build Tools:** Vite.

## 🚀 Installation

1.  Install the dependencies in the folder `client`:
    ```bash
    cd client
    npm i
    npm run dev
    ```
2.  Set up and start your server in the folder `server`:
    ```bash
    cd server
    npm i
    npx json-server database.json
    ```

## 👨‍💻 Author

- GitHub: **[Cristian Albor](https://github.com/Danilo-Doria)**
- Mail: **calborparra@gmail.com**

## 📄 License

This project was created for educational purposes and personal learning.