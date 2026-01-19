// @ts-nocheck
import { Award, Target, Zap, TrendingUp, Star, Trophy, Crown, Flame } from 'lucide-react';
import { useState, useReducer, useEffect } from 'react';
// Reusable Achievement Card Component
function AchievementCard({ achievement }) {
    const Icon = achievement.icon;
    const isUnlocked = achievement.unlocked;

    return (
        <div 
            className={`relative bg-gradient-to-br ${isUnlocked ? achievement.bgGradient : 'from-slate-800/50 to-slate-900/50 border-slate-700/30'} border rounded-xl p-5 transition-all duration-300 ${isUnlocked ? 'hover:scale-[1.02] cursor-pointer' : 'opacity-60'}`}
        >
            {/* Unlocked Badge */}
            {isUnlocked && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${isUnlocked ? achievement.bgGradient : 'from-slate-700/50 to-slate-800/50'} border ${isUnlocked ? achievement.borderColor : 'border-slate-600/30'} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${isUnlocked ? achievement.iconColor : 'text-slate-500'}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg ${isUnlocked ? 'text-cyan-100' : 'text-slate-400'}`}>
                        {achievement.name}
                    </h3>
                    <p className={`text-sm mt-1 ${isUnlocked ? 'text-cyan-400/70' : 'text-slate-500'}`}>
                        {achievement.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Achievements() {
const [achievements, dispatch] = useReducer(reducer, [
  {
    id: 0,
    name: "1st Timer",
    description: "Create your first task",
    icon: Target,
    unlocked: true,
    bgGradient: "from-cyan-500/20 to-cyan-600/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
]);

function reducer(state, action) {
  switch (action.type) {
    case 'unlock':
      return state.map(achievement => 
        achievement.id === action.id 
          ? { ...achievement, unlocked: false }
          : achievement,
      );
    
    default:
      return state;
  }
}

useEffect(() => {
    console.log(achievements[0].unlocked)
}, [achievements])


    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    return (
        <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="relative p-6 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                Achievements
                            </h2>
                            <p className="text-cyan-500/70 text-sm mt-1">
                                {unlockedCount} of {totalCount} unlocked
                            </p>
                        </div>
                        <button onClick={() => dispatch({ type: 'unlock', id: 0 })}>
  Lock Achievement
</button>

                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg px-4 py-2">
                                <p className="text-cyan-300 font-semibold text-lg">
                                    {Math.round((unlockedCount / totalCount) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                    <button 
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 transition-all duration-200 hover:scale-110"
                    >
                        ×
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                    <div className="w-full bg-slate-700/50 rounded-full h-3">
                        <div 
                            className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-cyan-500/20 p-4 bg-slate-900/50">
                    <p className="text-center text-cyan-500/70 text-sm">
                        Keep completing tasks to unlock more achievements! 🏆
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Achievements;