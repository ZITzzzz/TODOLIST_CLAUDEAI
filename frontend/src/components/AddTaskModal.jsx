import { useState } from 'react';

const priorities = [
  { value: 'extreme', label: 'Extreme', color: '#f21e1e' },
  { value: 'moderate', label: 'Moderate', color: '#42ade2' },
  { value: 'low', label: 'Low', color: '#22c55e' },
];

export default function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('moderate');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setSubmitting(true);
    setError('');
    try {
      await onAdd(title.trim(), {
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-[900px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-16 pt-10 pb-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-lg text-gray-900">Add New Task</h2>
            <div className="mt-1 w-24 h-0.5 bg-[#ff6767] rounded-full" />
          </div>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-gray-700 underline hover:text-[#ff6767] transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-16 py-8">
          <div className="border border-gray-200 rounded-xl p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block font-semibold text-sm text-gray-800 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-[511px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff6767] transition-colors"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block font-semibold text-sm text-gray-800 mb-2">Date</label>
              <div className="relative w-[511px]">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff6767] transition-colors"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block font-semibold text-sm text-gray-800 mb-3">Priority</label>
              <div className="flex items-center gap-8">
                {priorities.map((p) => (
                  <label key={p.value} className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-sm text-gray-500">{p.label}</span>
                    <input
                      type="radio"
                      name="priority"
                      value={p.value}
                      checked={priority === p.value}
                      onChange={() => setPriority(p.value)}
                      className="w-3.5 h-3.5 accent-[#ff6767]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Description + Upload */}
            <div className="flex gap-4">
              {/* Task Description */}
              <div className="flex-1">
                <label className="block font-semibold text-sm text-gray-800 mb-2">Task Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Start writing here....."
                  rows={7}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff6767] transition-colors resize-none text-gray-500"
                />
              </div>

              {/* Upload Image */}
              <div className="w-[214px] shrink-0">
                <label className="block font-semibold text-sm text-gray-800 mb-2">Upload Image</label>
                <label className="border border-gray-300 rounded-lg h-[167px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#ff6767] transition-colors">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a1a3ab" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-xs text-gray-400">Drag&Drop files here</p>
                  <p className="text-xs text-gray-400">or</p>
                  <span className="border border-gray-300 rounded-lg px-4 py-1 text-xs text-gray-400 hover:border-[#ff6767]">
                    Browse
                  </span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#f24e1e] text-white font-semibold text-sm px-8 py-2 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Done'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
