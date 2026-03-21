import { useState, useRef, useEffect } from 'react';

const pageTitles = {
  dashboard:  { prefix: 'Dash',  suffix: 'board' },
  vital:      { prefix: 'Vital', suffix: ' Task' },
  mytask:     { prefix: 'My',    suffix: ' Task' },
  categories: { prefix: 'Task',  suffix: ' Categories' },
  settings:   { prefix: 'Set',   suffix: 'tings' },
  help:       { prefix: 'He',    suffix: 'lp' },
};

function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) return false;
  return new Date(todo.dueDate) < new Date(new Date().toDateString());
}

function isDueToday(todo) {
  if (!todo.dueDate || todo.completed) return false;
  const due = new Date(todo.dueDate).toDateString();
  return due === new Date().toDateString();
}

export default function Navbar({ activePage, searchQuery, onSearchChange, todos = [] }) {
  const [showNotif, setShowNotif] = useState(false);
  const bellRef = useRef(null);
  const dropRef = useRef(null);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-GB');
  const title = pageTitles[activePage] || pageTitles.dashboard;

  const overdue  = todos.filter(isOverdue);
  const dueToday = todos.filter(isDueToday);
  const alerts   = [...overdue.map((t) => ({ ...t, _alert: 'overdue' })),
                    ...dueToday.map((t) => ({ ...t, _alert: 'today' }))];
  const badgeCount = alerts.length;

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (
        bellRef.current && !bellRef.current.contains(e.target) &&
        dropRef.current && !dropRef.current.contains(e.target)
      ) {
        setShowNotif(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-[80px] bg-white shadow-sm flex items-center px-8 gap-4 shrink-0 relative">
      <h1 className="text-2xl font-bold min-w-fit">
        <span className="text-[#ff6767]">{title.prefix}</span>
        {title.suffix}
      </h1>

      {/* Search bar */}
      <div className="flex-1 mx-8 max-w-2xl">
        <div className="bg-[#f5f8ff] rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search your task here..."
            className="flex-1 bg-transparent text-base font-semibold text-gray-700 placeholder-gray-400 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button className="bg-[#ff6767] rounded-lg p-1.5 text-white shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="8" cy="8" r="6" />
              <path d="m14 14 4 4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <div className="relative">
          <button
            ref={bellRef}
            onClick={() => setShowNotif((v) => !v)}
            className="bg-[#ff6767] rounded-xl p-2 text-white relative"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {badgeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                {badgeCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div
              ref={dropRef}
              className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">Thông báo</p>
              </div>
              {alerts.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">
                  Không có thông báo mới 🎉
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                  {alerts.map((t) => (
                    <div key={t._id + t._alert} className="px-4 py-3 flex gap-3 items-start hover:bg-gray-50">
                      <span className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${t._alert === 'overdue' ? 'bg-red-500' : 'bg-yellow-400'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{t.title}</p>
                        <p className={`text-xs mt-0.5 ${t._alert === 'overdue' ? 'text-red-500' : 'text-yellow-600'}`}>
                          {t._alert === 'overdue'
                            ? `Đã quá hạn: ${new Date(t.dueDate).toLocaleDateString('en-GB')}`
                            : 'Đến hạn hôm nay'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button className="bg-[#ff6767] rounded-xl p-2 text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>

        <div className="ml-3 text-right">
          <p className="text-lg font-medium text-gray-800 leading-tight">{dayName}</p>
          <p className="text-base font-medium text-[#3abeff] leading-tight">{dateStr}</p>
        </div>
      </div>
    </header>
  );
}
