import { useState, useEffect } from 'react';
import type { Box2Props } from '../store';

function Box2({ dateHistory }: Box2Props) {
  const colors = [
    'border-l-cyan-500 bg-cyan-500/10',
    'border-l-blue-500 bg-blue-500/10',
    'border-l-purple-500 bg-purple-500/10',
  ];

  const [sliceCount, setSliceCount] = useState(2);

  useEffect(() => {
    const updateSliceCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSliceCount(2); // sm and below
      } else if (width < 1024) {
        setSliceCount(4); // md
      } else if (width < 1280) {
        setSliceCount(4); // lg
      } else {
        setSliceCount(2);
      }
    };

    updateSliceCount();
    window.addEventListener('resize', updateSliceCount);
    return () => window.removeEventListener('resize', updateSliceCount);
  }, []);

  return (
    <div className="h-full p-4 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950">
      <h1 className="pb-3 text-sm text-cyan-300 uppercase tracking-wide 2xl:text-xl">
        Recent Completions
      </h1>
      <div className="space-y-2  ">
        {dateHistory.slice(0, sliceCount).map((e, i) => (
          <div
            key={i}
            className={`2xl:-mt-2 flex items-center gap-3 p-3 md:p-6 rounded-lg border-l-4 border-y border-r  border-cyan-700/50 bg-slate-900/40 ${colors[i % colors.length]} xl:h-1`}
          >
            <span className="min-w-4 text-xs font-semibold text-cyan-400 2xl:text-xl">
              #{i + 1}
            </span>
            <p className="flex-1 text-sm font-medium text-cyan-50 truncate 2xl:text-xl">
              {e}
            </p>
            <span className="text-xs text-cyan-400 uppercase hidden 2xl:text-xl">
              time
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Box2;
