export default function StatusChart({ percentage, color, label }) {
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = ((100 - Math.min(Math.max(percentage, 0), 100)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[90px] h-[90px]">
        <svg width="90" height="90" className="-rotate-90">
          <circle cx="45" cy="45" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-xl text-gray-800 select-none">
          {percentage}%
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-base font-medium text-gray-700">{label}</span>
      </div>
    </div>
  );
}
