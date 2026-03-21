import { useState } from 'react';
import TaskDetailPanel from '../components/TaskDetailPanel.jsx';

function TaskListCard({ todo, isSelected, onClick, onDelete }) {
  const isCompleted = todo.completed;
  const createdDate = new Date(todo.createdAt).toLocaleDateString('en-GB');

  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl p-4 cursor-pointer transition-all relative group ${
        isSelected
          ? 'border-[#ff6767] bg-red-50/60 shadow-sm'
          : 'border-[#a1a3ab]/30 bg-white hover:border-[#ff6767]/50 hover:shadow-sm'
      }`}
    >
      {/* Delete button */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
        title="Delete"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>

      <div className="flex items-start gap-3 pr-6">
        {/* Status circle */}
        <span
          className="mt-1 w-3 h-3 rounded-full border-2 shrink-0"
          style={{
            borderColor: isCompleted ? '#22c55e' : '#ff6767',
            backgroundColor: isCompleted ? '#22c55e' : 'transparent',
          }}
        />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-base text-gray-800 leading-snug ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </p>
          <p className="text-sm text-gray-400 mt-1 truncate">
            {isCompleted ? 'Task has been completed.' : 'This task requires immediate attention.'}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 text-xs">
            <span>
              Priority: <span className="text-[#f21e1e] font-medium">Extreme</span>
            </span>
            <span>
              Status:{' '}
              <span className="font-medium" style={{ color: isCompleted ? '#05a301' : '#f21e1e' }}>
                {isCompleted ? 'Completed' : 'Not Started'}
              </span>
            </span>
            <span className="text-gray-400">Created on: {createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VitalTaskPage({ todos, onToggle, onEdit, onUploadImage, onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  // Vital = incomplete tasks (not yet done)
  const vitalTodos = todos.filter((t) => !t.completed);
  const selectedTodo = vitalTodos.find((t) => t._id === selectedId) || null;

  function handleDelete(id) {
    onDelete(id);
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="flex gap-5 flex-1 min-h-0">
      {/* Left: vital task list */}
      <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex flex-col w-[420px] shrink-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 shrink-0">
          <h2 className="font-bold text-lg text-gray-800">Vital Tasks</h2>
          <div className="mt-1 w-10 h-0.5 bg-[#ff6767] rounded-full" />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {vitalTodos.length === 0 ? (
            <p className="text-center text-gray-400 text-base py-8">No vital tasks. All done! 🎉</p>
          ) : (
            vitalTodos.map((todo) => (
              <TaskListCard
                key={todo._id}
                todo={todo}
                isSelected={selectedId === todo._id}
                onClick={() => setSelectedId(todo._id)}
                onDelete={() => handleDelete(todo._id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right: task detail */}
      <TaskDetailPanel
        todo={selectedTodo}
        onDelete={() => selectedTodo && handleDelete(selectedTodo._id)}
        onEdit={onEdit}
        onUploadImage={onUploadImage}
      />
    </div>
  );
}
