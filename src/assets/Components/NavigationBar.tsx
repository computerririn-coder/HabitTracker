

import { Zap, Award } from 'lucide-react';
import { useComponentVisibility, useCompletedTasksCount } from './Section/store';


function NavigationBar() {
  //from store
const componentVisibility = useComponentVisibility((state) => state.componentVisibility)
const setComponentVisibility = useComponentVisibility((state) => state.setComponentVisibility)
const completedTasksCount = useCompletedTasksCount((state) => state.completedTasksCount)


  return (
    <nav className="w-full h-14 bg-linear-to-r from-slate-900 to-slate-950 flex items-center justify-between px-6 border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10">

      <div className="min-w-42 h-9 flex items-center gap-2 bg-linear-to-r from-cyan-600 to-blue-600 rounded-2xl pr-3 shadow-lg shadow-cyan-500/30">
        <div className="w-8 h-9 bg-cyan-500 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-lg">✓</span>
        </div>
        <span className="text-md md:text-xl font-extrabold text-cyan-50">Task Tracker</span>
      </div>


      <div className="flex items-center gap-4">
<button
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
  className="hidden sm:flex items-center gap-2 bg-linear-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg px-3 py-1.5 hover:from-red-500/30 hover:to-red-600/30 transition-all"
>
  <span className="text-sm font-semibold text-red-300">Reset</span>
</button>

        <div className="flex items-center gap-2 bg-linear-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg px-3 py-1.5
         hover:from-orange-500/30 hover:to-yellow-500/30 transition-all"
        onClick={() => setComponentVisibility({...componentVisibility, achievementsVisibility: true})}>
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-orange-300">Achievements Tab</span>
        </div>

      
        <div className="hidden sm:flex items-center gap-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg px-3 py-1.5 hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-semibold text-purple-300">{completedTasksCount} completions</span>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;