import { useState } from 'react';
import TaskDetailPanel from '../components/TaskDetailPanel.jsx';

const PRIORITY_CONFIG = {
  extreme: { label: 'Extreme', color: '#f21e1e', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  moderate: { label: 'Moderate', color: '#42ade2', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-400' },
  low: { label: 'Low', color: '#22c55e', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
};

function CategoryCard({ todo, isSelected, onClick, onDelete, onToggle }) {
  const cfg = PRIORITY_CONFIG[todo.priority || 'moderate'];
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-3.5 cursor-pointer transition-all group relative ${
        isSelected ? `${cfg.border} ${cfg.bg} shadow-sm` : 'border-gray-200 bg-white hover:shadow-sm'
      }`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>

      <div className="flex items-start gap-2.5 pr-5">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="mt-1 w-2.5 h-2.5 rounded-full border-2 shrink-0"
          style={{
            borderColor: todo.completed ? '#22c55e' : cfg.color,
            backgroundColor: todo.completed ? '#22c55e' : 'transparent',
          }}
        />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm text-gray-800 leading-snug ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </p>
          {todo.description && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{todo.description}</p>
          )}
          <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-400">
            <span style={{ color: todo.completed ? '#22c55e' : cfg.color }} className="font-medium">
              {todo.completed ? 'Done' : 'Pending'}
            </span>
            <span>•</span>
            <span>{new Date(todo.createdAt).toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityColumn({ priorityKey, todos, selectedId, onSelect, onDelete, onToggle }) {
  const cfg = PRIORITY_CONFIG[priorityKey];
  return (
    <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex flex-col overflow-hidden flex-1 min-w-0">
      {/* Column header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
            <h3 className="font-bold text-base text-gray-800">{cfg.label}</h3>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: cfg.color }}
          >
            {todos.length}
          </span>
        </div>
        <div className="mt-1.5 h-0.5 rounded-full w-10" style={{ backgroundColor: cfg.color }} />
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-6">No tasks</p>
        ) : (
          todos.map((todo) => (
            <CategoryCard
              key={todo._id}
              todo={todo}
              isSelected={selectedId === todo._id}
              onClick={() => onSelect(todo._id)}
              onDelete={() => onDelete(todo._id)}
              onToggle={() => onToggle(todo._id, todo.completed)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function CategoriesPage({ todos, onToggle, onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  const byPriority = {
    extreme: todos.filter((t) => t.priority === 'extreme'),
    moderate: todos.filter((t) => !t.priority || t.priority === 'moderate'),
    low: todos.filter((t) => t.priority === 'low'),
  };

  const selectedTodo = todos.find((t) => t._id === selectedId) || null;

  function handleDelete(id) {
    onDelete(id);
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="flex gap-5 flex-1 min-h-0">
      {/* Three priority columns */}
      <div className="flex gap-4 flex-1 min-h-0 min-w-0">
        {Object.keys(byPriority).map((key) => (
          <PriorityColumn
            key={key}
            priorityKey={key}
            todos={byPriority[key]}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={handleDelete}
            onToggle={onToggle}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div className="w-[340px] shrink-0 flex flex-col min-h-0">
        <TaskDetailPanel
          todo={selectedTodo}
          onDelete={() => selectedTodo && handleDelete(selectedTodo._id)}
        />
      </div>
    </div>
  );
}
