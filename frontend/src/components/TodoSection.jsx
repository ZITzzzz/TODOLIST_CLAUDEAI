import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function TodoSection({ todos, onAdd, onToggle, onDelete }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(title.trim());
      setTitle('');
      setShowInput(false);
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

  return (
    <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6767" strokeWidth="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <span className="text-[#ff6767] font-medium text-lg">To-Do</span>
        </div>
        <button
          onClick={() => setShowInput((v) => !v)}
          className="flex items-center gap-1 text-gray-400 text-base hover:text-[#ff6767] transition-colors"
        >
          <span className="text-base leading-none font-light">+</span>
          <span>Add task</span>
        </button>
      </div>

      {/* Inline add form */}
      {showInput && (
        <form onSubmit={handleAdd} className="px-5 pb-3 flex gap-2 shrink-0">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-base outline-none focus:border-[#ff6767] bg-white"
          />
          <button
            type="submit"
            disabled={!title.trim() || submitting}
            className="bg-[#ff6767] text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 transition-opacity"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => { setShowInput(false); setTitle(''); }}
            className="px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Date line */}
      <div className="px-5 pb-3 flex items-center gap-2 text-xs shrink-0">
        <span className="text-gray-600 font-normal text-base">{today}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <span className="text-gray-400 text-base">Today</span>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">
            No pending tasks. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TaskCard
              key={todo._id}
              todo={todo}
              onToggle={() => onToggle(todo._id, todo.completed)}
              onDelete={() => onDelete(todo._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
