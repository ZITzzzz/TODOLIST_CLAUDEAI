import { useState } from 'react';
import { useTodos } from './hooks/useTodos.js';
import { useToast } from './components/Toast.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import TodoSection from './components/TodoSection.jsx';
import StatusSection from './components/StatusSection.jsx';
import CompletedSection from './components/CompletedSection.jsx';
import AddTaskModal from './components/AddTaskModal.jsx';
import MyTaskPage from './pages/MyTaskPage.jsx';
import VitalTaskPage from './pages/VitalTaskPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import HelpPage from './pages/HelpPage.jsx';

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem('app-settings')) || { name: 'User', email: 'user@example.com' };
  } catch {
    return { name: 'User', email: 'user@example.com' };
  }
}

export default function App() {
  const [activePage, setActivePage]   = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery]  = useState('');
  const [settings, setSettings]        = useState(loadSettings);

  const showToast = useToast();
  const { todos, loading, error, addTodo, toggleTodo, editTodo, uploadImage, deleteTodo } = useTodos();

  function updateSettings(patch) {
    const next = { ...settings, ...patch };
    setSettings(next);
    localStorage.setItem('app-settings', JSON.stringify(next));
  }

  // Client-side search filter
  const q = searchQuery.trim().toLowerCase();
  const filteredTodos = q
    ? todos.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      )
    : todos;

  // Wrapped handlers with toast feedback
  async function handleAddTodo(title, opts) {
    await addTodo(title, opts);
    showToast('Task created successfully!', 'success');
  }

  async function handleToggle(id, completed) {
    await toggleTodo(id, completed);
    showToast(completed ? 'Task marked as pending.' : 'Task completed!', 'success');
  }

  async function handleEdit(id, patch) {
    await editTodo(id, patch);
    showToast('Task updated successfully!', 'success');
  }

  async function handleUploadImage(id, file) {
    await uploadImage(id, file);
    showToast('Image uploaded!', 'success');
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    showToast('Task deleted.', 'info');
  }

  const pendingTodos   = filteredTodos.filter((t) => !t.completed);
  const completedTodos = filteredTodos.filter((t) => t.completed);
  const total          = todos.length;
  const completedPct   = total > 0 ? Math.round((todos.filter((t) => t.completed).length / total) * 100) : 0;
  const pendingPct     = total > 0 ? 100 - completedPct : 0;

  function renderContent() {
    if (loading && todos.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-base">
          Loading...
        </div>
      );
    }

    if (activePage === 'vital') {
      return <VitalTaskPage todos={filteredTodos} onToggle={handleToggle} onEdit={handleEdit} onUploadImage={handleUploadImage} onDelete={handleDelete} />;
    }
    if (activePage === 'mytask') {
      return <MyTaskPage todos={filteredTodos} onToggle={handleToggle} onEdit={handleEdit} onUploadImage={handleUploadImage} onDelete={handleDelete} />;
    }
    if (activePage === 'categories') {
      return <CategoriesPage todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />;
    }
    if (activePage === 'settings') {
      return <SettingsPage settings={settings} onUpdate={updateSettings} />;
    }
    if (activePage === 'help') {
      return <HelpPage />;
    }

    // Dashboard
    return (
      <>
        <div className="mb-5 flex items-center gap-2 shrink-0">
          <h2 className="text-4xl font-medium text-gray-800">
            Welcome back, {settings.name} <span className="inline-block">👋</span>
          </h2>
        </div>

        {q && filteredTodos.length === 0 && (
          <p className="text-gray-400 text-sm mb-4 shrink-0">
            No tasks found for "<span className="font-medium">{searchQuery}</span>"
          </p>
        )}

        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          <TodoSection
            todos={pendingTodos}
            onAdd={handleAddTodo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onOpenModal={() => setShowAddModal(true)}
          />
          <div className="flex flex-col gap-5 min-h-0">
            <StatusSection completedPct={completedPct} pendingPct={pendingPct} total={total} />
            <CompletedSection todos={completedTodos} onToggle={handleToggle} onDelete={handleDelete} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f8ff]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} settings={settings} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          activePage={activePage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          todos={todos}
        />

        <div className="flex-1 overflow-hidden p-6 flex flex-col">
          {error && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm shrink-0">
              {error}
            </div>
          )}
          {renderContent()}
        </div>
      </div>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTodo}
        />
      )}
    </div>
  );
}
