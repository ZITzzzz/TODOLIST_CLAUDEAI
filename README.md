# TodoList App — Claude AI

A full-stack Todo List web application built with Node.js, Express, MongoDB, React, and TailwindCSS. The UI is designed based on a Figma dashboard design.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![React](https://img.shields.io/badge/React-18-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

---

## Features

- Add, complete, and delete todos
- Dashboard layout with sidebar navigation
- Task Status charts (Completed / Remaining) using animated SVG donut rings
- Separate To-Do and Completed Task panels
- Live date and day display in the navbar
- Responsive two-column layout

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

| Method | Path             | Description                              |
|--------|------------------|------------------------------------------|
| GET    | `/api/todos`     | List all todos (newest first)            |
| POST   | `/api/todos`     | Create todo — body: `{ title }`          |
| PATCH  | `/api/todos/:id` | Update todo — body: `{ title?, completed? }` |
| DELETE | `/api/todos/:id` | Delete todo                              |

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
│       ├── models/           # Mongoose models
│       └── middleware/       # Error handler
├── frontend/
│   └── src/
│       ├── App.jsx           # Dashboard layout
│       ├── api/todos.js      # API client
│       ├── hooks/useTodos.js # State management hook
│       └── components/
│           ├── Sidebar.jsx
│           ├── Navbar.jsx
│           ├── TodoSection.jsx
│           ├── TaskCard.jsx
│           ├── StatusSection.jsx
│           ├── StatusChart.jsx
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
