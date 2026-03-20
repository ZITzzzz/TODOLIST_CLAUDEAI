# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

From **`/backend`**: `npm run dev` (nodemon), `npm start` (plain node), `npm run lint`

From **`/frontend`**: `npm run dev` (Vite port 5173), `npm run build`, `npm run preview`, `npm run lint`

### First-time setup

```bash
npm install && npm install --prefix backend && npm install --prefix frontend
cp backend/.env.example backend/.env   # fill in MONGODB_URI
npm run dev
```

There are no tests in this project.

---

## REST API

All endpoints are under `/api/todos`. Responses follow the envelope `{ data, error, message }`.

| Method   | Path              | Description          |
|----------|-------------------|----------------------|
| GET      | `/api/todos`      | List all todos (sorted newest first) |
| POST     | `/api/todos`      | Create todo — body: `{ title }` |
| PATCH    | `/api/todos/:id`  | Partial update — body: `{ title?, completed? }` |
| DELETE   | `/api/todos/:id`  | Delete todo          |

### Todo model fields

```
_id        ObjectId
title      String (required, trimmed)
completed  Boolean (default: false)
createdAt  Date (auto)
updatedAt  Date (auto)
```

---

## API Response Format

```json
{ "data": <payload or null>, "error": <error name or null>, "message": "<human string>" }
```

- **Success**: `error` is `null`, `data` holds the result.
- **Error**: `data` is `null`, `error` is the error name (e.g. `"ValidationError"`), `message` explains it.

HTTP status codes are always meaningful (200, 201, 404, 500, etc.).

---

## Code Style Rules

### General
- Use **ES Modules** (`import`/`export`) throughout — both backend (`"type": "module"`) and frontend.
- Prefer **`async/await`** over `.then()/.catch()` chains. Never leave unhandled promise rejections.
- No `var`. Use `const` by default, `let` only when reassignment is needed.

### Backend
- All route handler async errors must be passed to `next(err)` — never `res.json(...)` inside a catch block directly.
- Attach `err.status` (e.g. `404`) before calling `next(err)` to control the HTTP response code; `errorHandler` reads `err.status`.
- Validation errors surface naturally from Mongoose; let the `errorHandler` middleware format them.
- Keep controllers thin: one responsibility per function, no business logic in routes.

### Frontend
- Data fetching belongs in `src/hooks/`. Components receive data via props.
- `src/api/todos.js` is the **only** place that calls `fetch`. All other code goes through the `todosApi` object it exports.
- Components handle their own loading/disabled states during async operations.
- `useTodos` manages all todo state and exposes `{ todos, loading, error, addTodo, toggleTodo, deleteTodo }`.
