import { useTodos } from './hooks/useTodos.js';
import { TodoForm } from './components/TodoForm.jsx';
import { TodoList } from './components/TodoList.jsx';

export default function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Todo App</h1>
        <p className="text-sm text-gray-500 mb-6">
          {loading ? 'Loading...' : `${remaining} task${remaining !== 1 ? 's' : ''} remaining`}
        </p>

        <TodoForm onAdd={addTodo} />

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading todos...</p>
        ) : (
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  );
}
