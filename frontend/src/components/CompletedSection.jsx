import TaskCard from './TaskCard.jsx';

export default function CompletedSection({ todos, onToggle, onDelete }) {
  return (
    <div className="bg-[#f5f8ff] rounded-2xl shadow-md flex flex-col overflow-hidden flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f24e1e" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <h2 className="text-[#f24e1e] font-medium text-lg">Completed Task</h2>
        <span className="ml-auto text-base text-gray-400">{todos.length} task{todos.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-6">No completed tasks yet</p>
        ) : (
          todos.map((todo) => (
            <TaskCard
              key={todo._id}
              todo={todo}
              isCompleted
              onToggle={() => onToggle(todo._id, todo.completed)}
              onDelete={() => onDelete(todo._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
