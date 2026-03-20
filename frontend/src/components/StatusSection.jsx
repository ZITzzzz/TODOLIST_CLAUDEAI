import StatusChart from './StatusChart.jsx';

export default function StatusSection({ completedPct, pendingPct, total }) {
  return (
    <div className="bg-[#f5f8ff] rounded-2xl shadow-md p-5 shrink-0">
      <div className="flex items-center gap-2 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6767" strokeWidth="2">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <h2 className="text-[#ff6767] font-medium text-lg">Task Status</h2>
      </div>

      {total === 0 ? (
        <p className="text-center text-gray-400 text-sm py-4">No tasks yet</p>
      ) : (
        <div className="flex justify-around py-2">
          <StatusChart percentage={completedPct} color="#22c55e" label="Completed" />
          <StatusChart percentage={pendingPct} color="#3b82f6" label="Remaining" />
        </div>
      )}
    </div>
  );
}
