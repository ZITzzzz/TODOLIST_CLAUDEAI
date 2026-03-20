import { useState, useEffect, useCallback } from 'react';
import { todosApi } from '../api/todos.js';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function addTodo(title, opts = {}) {
    const todo = await todosApi.create(title, opts);
    setTodos((prev) => [todo, ...prev]);
  }

  async function toggleTodo(id, completed) {
    const updated = await todosApi.update(id, { completed: !completed });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function deleteTodo(id) {
    await todosApi.remove(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  }

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo };
}
