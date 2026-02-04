import { Zap, Award } from 'lucide-react';
import {
  useComponentVisibility,
  useTotalTaskCompletion,
} from './Section/store';
import { useAchievementCount } from './Section/store';
function NavigationBar() {
  //from store
  const componentVisibility = useComponentVisibility(
    (state) => state.componentVisibility
  );
  const setComponentVisibility = useComponentVisibility(
    (state) => state.setComponentVisibility
  );
  const { totalTaskCompletion } = useTotalTaskCompletion();
  const achievementCount = useAchievementCount((state) => state.count);

  return (
    <nav className="flex items-center justify-between w-full h-21 px-6 border-b border-cyan-500/30 bg-linear-to-r from-slate-900 to-slate-950 shadow-lg shadow-cyan-500/10">
      <div className="flex items-center gap-2 h-8 sm:h-10 pr-1 sm:pr-5 rounded-2xl bg-linear-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/30">
        <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-cyan-500">
          <span className="text-xl font-bold text-white">✓</span>
        </div>
        <span className="text-base sm:text-lg md:text-xl font-extrabold text-cyan-50 whitespace-nowrap">
          Task Tracker
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="flex items-center gap-1 md:gap-3 px-2 md:px-5 py-1 md:py-3 rounded-lg border border-red-500/30 bg-linear-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 transition-all"
        >
          <span className="text-xs md:text-lg font-semibold text-red-300">
            Reset
          </span>
        </button>

        <div
          className="flex items-center gap-1 md:gap-3 px-2 md:px-5 py-1 md:py-3 rounded-lg border border-orange-500/30 bg-linear-to-r from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 cursor-pointer transition-all"
          onClick={() =>
            setComponentVisibility({
              ...componentVisibility,
              achievementsVisibility: true,
            })
          }
        >
          <Zap className="w-3 h-3 md:w-6 md:h-6 text-yellow-400" />
          <span className="text-xs md:text-lg font-semibold text-orange-300">
            Achievements ({achievementCount === 0 ? 'X' : achievementCount})
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-3 px-2 md:px-5 py-1 md:py-3 rounded-lg border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
          <Award className="w-3 h-3 md:w-6 md:h-6 text-purple-400" />
          <span className="text-xs md:text-lg font-semibold text-purple-300">
            {totalTaskCompletion}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
