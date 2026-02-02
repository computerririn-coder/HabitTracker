import type { Box2Props } from "../store";

function Box2({ dateHistory }: Box2Props) {
  const colors = [
    'border-l-cyan-500 bg-cyan-500/10',
    'border-l-blue-500 bg-blue-500/10',
    'border-l-purple-500 bg-purple-500/10',
  ];

  return (
    <div className="h-full p-4 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950">
      <h1 className="pb-3 text-sm text-cyan-300 uppercase tracking-wide">
        Recent Completions
      </h1>

      <div className="space-y-2">
        {dateHistory.slice(0, 2).map((e, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg border-l-4 border-y border-r border-cyan-700/50 bg-slate-900/40 ${colors[i]}`}
          >
            <span className="min-w-4 text-xs font-semibold text-cyan-400">
              #{i + 1}
            </span>

            <p className="flex-1 text-sm font-medium text-cyan-50 truncate">
              {e}
            </p>

            <span className="text-xs text-cyan-400 uppercase hidden">time</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Box2;