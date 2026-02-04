import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { ProgressTrackerProps } from '../store.ts';

function ProgressTracker({
  current,
  max,
  incrementProgressBar,
  hotKey,
}: ProgressTrackerProps) {
  const percentage = useMemo(
    () => Math.min(Math.round((current / max) * 100), 100),
    [current, max]
  );
  const [quotes, setQuotes] = useState('');
  const randomNum = Math.floor(Math.random() * 3);
  const fallbackQuotes = [
    'The secret of getting ahead is getting started.',
    'Small progress is still progress. Keep going!',
    "Don't watch the clock; do what it does. Keep going.",
  ];

  useEffect(() => {
    async function getMotivationalQuotes() {
      try {
        const response = await axios.get(
          'https://quoteslate.vercel.app/api/quotes/random/Disabled'
        );
        setQuotes(response.data.quote);
      } catch (error) {
        setQuotes(fallbackQuotes[randomNum]);
      }
    }
    getMotivationalQuotes();

    const interval = setInterval(() => {
      getMotivationalQuotes();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col w-full h-96 md:h-full rounded-lg overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950">
      {/* Progress pill at top */}
      <div className="relative flex flex-row items-center justify-center w-[60%] px-4 py-4 mt-4 mx-auto rounded-full border border-cyan-700/50 bg-slate-900/50 z-10">
        <div className="text-center">
          <span className="font-bold text-cyan-50 text-[1em] xl:text-[1.5em]">
            {current}
          </span>
          <span className="mx-2 text-cyan-400 text-[1em] xl:text-[1.5em]">
            /
          </span>
          <span className="font-bold text-cyan-400 text-[1em] xl:text-[1.5em]">
            {max}
          </span>
        </div>
      </div>

      {/* Water fill */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out bg-linear-to-r from-cyan-600 to-blue-600"
        style={{ height: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-blue-600/30 to-transparent" />
      </div>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-bold text-cyan-50 drop-shadow-lg text-[2em] xl:text-[3em]">
          {percentage}%
        </span>
      </div>

      {/* Motivational Quote */}
      <div className="absolute bottom-16 left-0 right-0 px-4 z-10">
        <p className="font-medium text-center italic leading-relaxed text-cyan-50 drop-shadow-lg text-[0.875em] xl:text-[1.25em] mb-10">
          "{quotes}"
        </p>
      </div>

      {/* Manual Increase button */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <button
          className="px-4 py-2 font-semibold text-cyan-50 rounded-lg border border-cyan-400 shadow-lg transition-all duration-300 transform bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 hover:scale-105 text-[1em] xl:text-[1.5em]"
          onClick={() => incrementProgressBar(hotKey)}
        >
          Manual Increase
        </button>
      </div>
    </div>
  );
}

export default ProgressTracker;
