import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Box3Props } from '../store';

/* Top-right box */
const Box3 = React.memo(
  ({
    name,
    current,
    max,
    currentSetting,
    componentVisibility,
    setComponentVisibility,
    completionCount,
    currentTab,
    setTabs,
    totalCompletionColor,
  }: Box3Props) => {
    function decrementCurrent(currentTab: number) {
      setTabs((prev) =>
        prev.map((tabs, index) =>
          index === currentTab
            ? { ...tabs, current: current === 0 ? current : current - 1 }
            : tabs
        )
      );
    }
    return (
      <div className="flex flex-col gap-3 h-full p-3 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950">
        <div className="flex flex-row items-center gap-2 ">
          <h1 className="pb-1 text-xl text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20 flex-1">
            Configuration
          </h1>

          <button
            className="px-3 py-1 text-xl font-medium text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200 transform active:scale-95 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/40"
            onClick={() =>
              setComponentVisibility({
                ...componentVisibility,
                editHotKey: true,
              })
            }
          >
            Edit
          </button>
        </div>

        {/*Task name */}
        <div className="flex flex-col gap-3 flex-1 ">
          <div className="flex items-center justify-center px-3 py-4 md:py-3 xl:py-2 rounded-lg border border-cyan-700/50 bg-slate-900/50 ">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xl text-cyan-300 uppercase tracking-wide">
                Task Name
              </span>
              <span className="text-xl font-bold text-cyan-50 truncate max-w-full">
                {name}
              </span>
            </div>
          </div>

          {/*Current Progress & Daily Goal*/}
          <div className="flex flex-col gap-3 2xl:grid 2xl:grid-cols-2">
            <div className="flex flex-col items-center justify-center px-3 py-4 md:py-3 xl:py-2 rounded-lg border border-cyan-700/50 bg-slate-900/50">
              <span className="mb-1 text-xl text-cyan-300 uppercase tracking-wide">
                Progress
              </span>
              <div className="flex flex-row gap-2 items-center">
                <button className="p-1 rounded-lg border border-cyan-500/50 text-cyan-300 transition-all bg-linear-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/30">
                  <ChevronLeft
                    size={16}
                    strokeWidth={2.5}
                    onClick={() => decrementCurrent(currentTab)}
                  />
                </button>
                <span className="text-xl font-bold text-cyan-400 min-w-6 text-center">
                  {current}
                </span>
                <button
                  className="px-2 py-0.5 text-xl text-cyan-300 uppercase tracking-wide rounded-lg border border-cyan-500/50 transition-all bg-linear-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/30"
                  onClick={() =>
                    setTabs((prev) =>
                      prev.map((tabs, index) =>
                        index === currentTab ? { ...tabs, current: 0 } : tabs
                      )
                    )
                  }
                >
                  Reset
                </button>
              </div>
            </div>

            {/*Daily Goal / Max*/}
            <div className="flex flex-col items-center justify-center px-3 py-4 md:py-3 xl:py-2 rounded-lg border border-cyan-700/50 bg-slate-900/50">
              <span className="mb-1 text-xl text-cyan-300 uppercase tracking-wide">
                Goal
              </span>
              <div className="flex flex-row gap-2 items-center">
                <button className="p-1 rounded-lg border border-cyan-500/50 text-cyan-300 transition-all bg-linear-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/30">
                  <ChevronLeft
                    size={16}
                    strokeWidth={2.5}
                    onClick={() =>
                      setTabs((prev) =>
                        prev.map((tabs, index) =>
                          index === currentTab
                            ? { ...tabs, max: max - 1 }
                            : tabs
                        )
                      )
                    }
                  />
                </button>
                <span className="text-xl font-bold text-blue-400 min-w-6 text-center">
                  {max}
                </span>
                <button className="p-1 rounded-lg border border-cyan-500/50 text-cyan-300 transition-all bg-linear-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/30">
                  <ChevronRight
                    size={16}
                    strokeWidth={2.5}
                    onClick={() =>
                      setTabs((prev) =>
                        prev.map((tabs, index) =>
                          index === currentTab
                            ? { ...tabs, max: max + 1 }
                            : tabs
                        )
                      )
                    }
                  />
                </button>
              </div>
            </div>
          </div>

          {/*HotKey & Total Completion*/}
          <div className="flex  flex-col gap-5 mt-5 ">
            <div className="flex flex-col items-center justify-center px-3 py-4 md:py-3 xl:py-2 rounded-lg border border-cyan-700/50 bg-slate-900/50 ">
              <span className="mb-1 text-xl text-cyan-300 uppercase tracking-wide ">
                Hotkey
              </span>
              <span className="px-2 py-0.5 text-xl font-mono font-bold text-cyan-50 rounded border border-cyan-700/50 bg-slate-900/70">
                {currentSetting}
              </span>
            </div>

            {/*Total Completion */}
            <div
              className={`flex flex-col items-center justify-center px-3 py-4 md:py-3 xl:py-2 rounded-lg transition-all duration-700 h-26 ${
                totalCompletionColor
                  ? 'border border-blue-400 shadow-2xl shadow-blue-500/80 scale-101 bg-blue-800/50'
                  : 'border border-cyan-700/50 bg-slate-900/50'
              }`}
            >
              <span className="mb-1 text-xl text-cyan-300 uppercase tracking-wide text-center">
                Completions
              </span>
              <span className="text-xl font-bold text-purple-400">
                {completionCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Box3;
