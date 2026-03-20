export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <span
        className={`flex-1 text-gray-800 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo._id)}
        className="text-red-400 hover:text-red-600 text-sm transition-colors"
      >
        Delete
      </button>
    </li>
  );
}
