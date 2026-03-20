# Todo App — Claude Guide

## Stack Overview

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Backend  | Node.js, Express 4, Mongoose 8 (MongoDB ODM)    |
| Frontend | React 18, Vite 5, TailwindCSS 3                 |
| Runner   | `concurrently` (root) for running both servers  |

Backend runs on `http://localhost:5000`. Frontend runs on `http://localhost:5173` and proxies `/api/*` to the backend via Vite's `server.proxy`.

---

## Dev Commands

Run from the **root** directory unless noted.

| Command         | What it does                                      |
|-----------------|---------------------------------------------------|
| `npm install`   | Install root deps (`concurrently`)                |
| `npm run dev`   | Start backend + frontend together                 |
| `npm run build` | Production build of the frontend (Vite)           |
| `npm run lint`  | Lint both backend and frontend                    |

From **`/backend`**:

| Command             | What it does                               |
|---------------------|--------------------------------------------|
| `npm install`       | Install backend deps                       |
| `npm run dev`       | Start backend with nodemon (hot-reload)    |
| `npm start`         | Start backend without hot-reload           |
| `npm run lint`      | Lint backend source                        |

From **`/frontend`**:

| Command             | What it does                               |
|---------------------|--------------------------------------------|
| `npm install`       | Install frontend deps                      |
| `npm run dev`       | Start Vite dev server (port 5173)          |
| `npm run build`     | Build for production → `dist/`             |
| `npm run preview`   | Preview production build locally           |
| `npm run lint`      | Lint frontend source                       |

### First-time setup

```bash
# 1. Install all deps
npm install && npm install --prefix backend && npm install --prefix frontend

# 2. Copy env and fill in your MongoDB URI
cp backend/.env.example backend/.env

# 3. Start everything
npm run dev
```

---

## API Response Format

All API responses follow a consistent envelope shape:

```json
{ "data": <payload or null>, "error": <error name or null>, "message": "<human string>" }
```

- **Success**: `error` is `null`, `data` holds the result.
- **Error**: `data` is `null`, `error` is an error name (e.g. `"ValidationError"`), `message` explains what went wrong.

HTTP status codes are always meaningful (200, 201, 404, 500, etc.).

---

## Code Style Rules

### General
- Use **ES Modules** (`import`/`export`) throughout — both backend (`"type": "module"`) and frontend.
- Prefer **`async/await`** over `.then()/.catch()` chains. Never leave unhandled promise rejections.
- No `var`. Use `const` by default, `let` only when reassignment is needed.

### Backend
- All route handler async errors must be passed to `next(err)` — never `res.json(...)` inside a catch block directly.
- Validation errors surface naturally from Mongoose; let the `errorHandler` middleware format them.
- Keep controllers thin: one responsibility per function, no business logic in routes.

### Frontend
- Data fetching belongs in `src/hooks/`. Components receive data via props.
- The `src/api/todos.js` module is the **only** place that calls `fetch`. All other code goes through it.
- Components handle their own loading/disabled states during async operations.

---

## Folder Structure

```
/
├── package.json            # Root: concurrently dev script
├── .gitignore
├── CLAUDE.md
│
├── backend/
│   ├── package.json
│   ├── .env.example        # Copy to .env and fill in MONGODB_URI
│   └── src/
│       ├── index.js                  # App entry: Express setup, DB connect, listen
│       ├── models/
│       │   └── Todo.js               # Mongoose schema + model
│       ├── controllers/
│       │   └── todos.js              # CRUD handler functions
│       ├── routes/
│       │   └── todos.js              # Express Router: maps HTTP verbs to controllers
│       └── middleware/
│           ├── db.js                 # connectDB() helper
│           └── errorHandler.js       # Centralized error → { data, error, message }
│
└── frontend/
    ├── package.json
    ├── vite.config.js        # Vite + React plugin + /api proxy
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx          # React root
        ├── index.css         # Tailwind directives
        ├── App.jsx           # Root component, wires hook + UI
        ├── api/
        │   └── todos.js      # Fetch wrapper for all todo endpoints
        ├── hooks/
        │   └── useTodos.js   # State management: todos, loading, error + mutations
        └── components/
            ├── TodoForm.jsx  # Controlled input + submit
            ├── TodoList.jsx  # Renders list or empty state
            └── TodoItem.jsx  # Single todo row: checkbox + delete
```
