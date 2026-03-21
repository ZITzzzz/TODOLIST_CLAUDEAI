import { useState } from 'react';
import EditTaskModal from './EditTaskModal.jsx';

const priorityColors = { extreme: '#f21e1e', moderate: '#42ade2', low: '#22c55e' };
const priorityLabels = { extreme: 'Extreme', moderate: 'Moderate', low: 'Low' };

export default function TaskDetailPanel({ todo, onDelete, onEdit, onUploadImage }) {
  const [showEdit, setShowEdit] = useState(false);

  if (!todo) {
    return (
      <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex-1 flex items-center justify-center min-h-0">
        <p className="text-gray-400 text-base">Select a task to view details</p>
      </div>
    );
  }

  const createdDate = new Date(todo.createdAt).toLocaleDateString('en-GB');
  const isCompleted = todo.completed;
  const priority = todo.priority || 'moderate';
  const dueDateStr = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString('en-GB')
    : null;

  return (
    <>
      <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Top: image + meta */}
        <div className="flex gap-5 p-6 shrink-0">
          <div className="w-[140px] h-[140px] rounded-2xl shrink-0 overflow-hidden bg-gradient-to-br from-orange-200 to-rose-300 flex items-center justify-center">
            {todo.imageUrl ? (
              <img src={todo.imageUrl} alt={todo.title} className="w-full h-full object-cover" />
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            )}
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-bold text-xl text-gray-800 leading-snug">{todo.title}</h2>
            <p className="text-sm">
              <span className="text-gray-600 font-medium">Priority: </span>
              <span className="font-medium" style={{ color: priorityColors[priority] }}>
                {priorityLabels[priority]}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600 font-medium">Status: </span>
              <span className="font-medium" style={{ color: isCompleted ? '#05a301' : '#f21e1e' }}>
                {isCompleted ? 'Completed' : 'Not Started'}
              </span>
            </p>
            {dueDateStr && (
              <p className="text-sm">
                <span className="text-gray-600 font-medium">Due: </span>
                <span className="text-gray-700">{dueDateStr}</span>
              </p>
            )}
            <p className="text-xs text-gray-400">Created on: {createdDate}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mx-6 shrink-0" />

        {/* Description body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-gray-600 text-base leading-relaxed">
          <p>
            <span className="font-bold text-gray-800">Task Title: </span>
            {todo.title}
          </p>
          <p className="mt-3">
            <span className="font-bold text-gray-800">Description: </span>
            {todo.description
              ? todo.description
              : <span className="text-gray-400 italic text-sm">No description provided.</span>}
          </p>
          <p className="mt-3">
            <span className="font-bold text-gray-800">Status: </span>
            {isCompleted ? 'This task has been completed.' : 'This task is pending and has not been started yet.'}
          </p>
          <p className="mt-3">
            <span className="font-bold text-gray-800">Created: </span>
            {createdDate}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 shrink-0">
          <button
            onClick={onDelete}
            className="bg-[#ff6767] text-white p-2.5 rounded-xl hover:bg-red-500 transition-colors"
            title="Delete task"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
          <button
            onClick={() => setShowEdit(true)}
            className="bg-[#ff6767] text-white p-2.5 rounded-xl hover:bg-red-500 transition-colors"
            title="Edit task"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      {showEdit && (
        <EditTaskModal
          todo={todo}
          onClose={() => setShowEdit(false)}
          onEdit={onEdit}
          onUploadImage={onUploadImage}
        />
      )}
    </>
  );
}
