const pageTitles = {
  dashboard: { prefix: 'Dash', suffix: 'board' },
  vital:     { prefix: 'Vital', suffix: ' Task' },
  mytask:    { prefix: 'My', suffix: ' Task' },
  categories:{ prefix: 'Task', suffix: ' Categories' },
  settings:  { prefix: 'Set', suffix: 'tings' },
  help:      { prefix: 'He', suffix: 'lp' },
};

export default function Navbar({ activePage }) {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-GB');
  const title = pageTitles[activePage] || pageTitles.dashboard;

  return (
    <header className="h-[80px] bg-white shadow-sm flex items-center px-8 gap-4 shrink-0">
      <h1 className="text-2xl font-bold min-w-fit">
        <span className="text-[#ff6767]">{title.prefix}</span>
        {title.suffix}
      </h1>

      {/* Search bar */}
      <div className="flex-1 mx-8 max-w-2xl">
        <div className="bg-[#f5f8ff] rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
          <input
            type="text"
            placeholder="Search your task here..."
            className="flex-1 bg-transparent text-base font-semibold text-gray-400 placeholder-gray-400 outline-none"
          />
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
        <button className="bg-[#ff6767] rounded-xl p-2 text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
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
