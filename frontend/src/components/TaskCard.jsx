export default function TaskCard({ todo, onToggle, onDelete, isCompleted = false }) {
  const createdDate = new Date(todo.createdAt).toLocaleDateString('en-GB');

  return (
    <div className="border border-[#a1a3ab]/30 rounded-2xl p-4 bg-white relative group">
      {/* Delete button */}
      <button
        onClick={onDelete}
        title="Delete task"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>

      <div className="flex items-start gap-3 pr-6">
        {/* Toggle circle */}
        <button
          onClick={onToggle}
          title={isCompleted ? 'Mark as pending' : 'Mark as done'}
          className="mt-0.5 w-3 h-3 rounded-full border-2 shrink-0 transition-colors"
          style={{
            borderColor: isCompleted ? '#22c55e' : '#a1a3ab',
            backgroundColor: isCompleted ? '#22c55e' : 'transparent',
          }}
        />

        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-lg text-gray-800 leading-snug ${
              isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.title}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span>
              Status:{' '}
              <span
                className="font-medium"
                style={{ color: isCompleted ? '#05a301' : '#f21e1e' }}
              >
                {isCompleted ? 'Completed' : 'Not Started'}
              </span>
            </span>
            <span>Created on: {createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
