# TodoList App — Claude AI

A full-stack Todo List web application built with Node.js, Express, MongoDB, React, and TailwindCSS. The UI is designed based on a Figma dashboard design.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![React](https://img.shields.io/badge/React-18-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

---

## Features

- Add, complete, and delete todos
- **Edit tasks** — update title, date, priority, and description via modal
- **Image upload** — attach an image to any task (drag & drop or browse, max 5MB)
- Dashboard layout with sidebar navigation
- Task Status charts (Completed / Remaining) using animated SVG donut rings
- Separate To-Do and Completed Task panels
- My Task and Vital Task pages with task detail panel
- Task Categories page
- Live date and day display in the navbar

---

## Tech Stack

| Layer     | Technology                               |
|-----------|------------------------------------------|
| Backend   | Node.js, Express 4, Mongoose 8 (MongoDB) |
| Frontend  | React 18, Vite 5, TailwindCSS 3          |
| Runner    | `concurrently` (runs both servers)       |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)

### Installation

```bash
# Install all dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env and set your MONGODB_URI
```

### Running the App

```bash
# Start backend + frontend together
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## REST API

All endpoints are under `/api/todos`.

| Method | Path                    | Description                                                       |
|--------|-------------------------|-------------------------------------------------------------------|
| GET    | `/api/todos`            | List all todos (newest first)                                     |
| POST   | `/api/todos`            | Create todo — body: `{ title, description?, priority?, dueDate? }`|
| PATCH  | `/api/todos/:id`        | Update todo fields — any model field                              |
| PATCH  | `/api/todos/:id/image`  | Upload task image — multipart `image` field (max 5MB)            |
| DELETE | `/api/todos/:id`        | Delete todo                                                       |

### Response Format

```json
{ "data": <payload or null>, "error": <error name or null>, "message": "<human string>" }
```

---

## Project Structure

```
├── backend/
│   └── src/
│       ├── index.js          # Express entry point
│       ├── routes/           # API routes
│       ├── controllers/      # Route handlers
│       ├── models/           # Mongoose models (Todo)
│       └── middleware/       # Error handler, upload (multer)
│   └── uploads/              # Uploaded task images (served as static)
├── frontend/
│   └── src/
│       ├── App.jsx           # Root layout + client-side routing
│       ├── api/todos.js      # API client (only file that calls fetch)
│       ├── hooks/useTodos.js # Global todo state hook
│       ├── pages/
│       │   ├── MyTaskPage.jsx
│       │   ├── VitalTaskPage.jsx
│       │   └── CategoriesPage.jsx
│       └── components/
│           ├── Sidebar.jsx / Navbar.jsx
│           ├── AddTaskModal.jsx / EditTaskModal.jsx
│           ├── TaskDetailPanel.jsx
│           ├── TaskCard.jsx / TodoSection.jsx
│           ├── StatusSection.jsx / StatusChart.jsx
│           └── CompletedSection.jsx
└── package.json              # Root scripts
```

---

## Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Start backend + frontend together  |
| `npm run build`  | Production build of the frontend   |
| `npm run lint`   | Lint backend and frontend          |

---

## License

MIT
