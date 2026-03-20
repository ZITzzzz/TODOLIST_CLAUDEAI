import { useTodos } from './hooks/useTodos.js';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import TodoSection from './components/TodoSection.jsx';
import StatusSection from './components/StatusSection.jsx';
import CompletedSection from './components/CompletedSection.jsx';

export default function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const total = todos.length;
  const completedPct = total > 0 ? Math.round((completedTodos.length / total) * 100) : 0;
  const pendingPct = total > 0 ? 100 - completedPct : 0;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f8ff]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-hidden p-6 flex flex-col">
          {/* Welcome header */}
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-4xl font-medium text-gray-800">
              Welcome back <span className="inline-block">👋</span>
            </h2>
          </div>

          {error && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm shrink-0">
              {error}
            </div>
          )}

          {/* Main grid */}
          {loading && todos.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Loading...
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
              <TodoSection
                todos={pendingTodos}
                onAdd={addTodo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
              <div className="flex flex-col gap-5 min-h-0">
                <StatusSection
                  completedPct={completedPct}
                  pendingPct={pendingPct}
                  total={total}
                />
                <CompletedSection
                  todos={completedTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
