import React from 'react';
import type { Box4Props } from '../store';

/* Bottom full-width box */
const Box4 = React.memo(({ tabs, currentTab, }: Box4Props) => {
  const isEmpty = tabs?.length === 1;

  return (
    <div className="flex flex-col gap-3 min-h-40 md:h-full p-4 rounded-lg overflow-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10 from-slate-800 via-slate-900 to-slate-950">
      <h1 className="pb-2 text-sm text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20">
        All Tasks List
      </h1>
      {!isEmpty ? (
        <div className="flex flex-col gap-2">
          {tabs!
            .filter((e) => e.id !== currentTab)
            .map((e, i) => {
              const percentage = Math.min(
                Math.round((e.current / e.max) * 100),
                100
              );
              const isCompleted = e.totalCompletionColor;

              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1 w-full p-2 rounded-lg transition-all duration-700 ${
                    isCompleted
                      ? 'border border-blue-400 shadow-2xl shadow-blue-500/80 scale-101 bg-blue-800/50'
                      : 'border border-cyan-700/50 bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] text-cyan-300">Name:</span>
                    <span className="text-xs font-semibold text-cyan-50 truncate">
                      {e.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] text-cyan-300">Hotkey:</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-50 rounded border border-cyan-700/50 bg-slate-900/70">
                      {e.hotKey}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] text-cyan-300">Progress:</span>
                    <span className="text-xs font-semibold text-cyan-400">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text-center my-auto text-[6px] md:text-[1em] 2xl:text-[2em] text-cyan-300/70">
          Create More Tasks Using The "+" Button On The Tab Bar
        </p>
      )}
    </div>
  );
});

export default Box4;