import type { Box1Props } from '../store';

/* Top-left small box */
function Box1({ currentSetting }: Box1Props) {
  return (
    <div className="flex flex-col gap-2 h-32 md:h-full p-4 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950">
      <h1 className="text-[1em] xl:text-[1.5em] text-cyan-300 uppercase tracking-wide">
        Current HotKey{' '}
        <span className="text-[8px] text-red-600 visible xl:invisible">
          *Physical Keyboard Only*
        </span>
      </h1>

      <div className="flex flex-1 items-center justify-center rounded-xl border border-cyan-700/50 bg-slate-900/50">
        <span className=" font-bold text-cyan-50 text-[1.5em] md:text-[2.5em] xl:text-[3.5em] ">
          {currentSetting}
        </span>
      </div>
    </div>
  );
}

export default Box1;
