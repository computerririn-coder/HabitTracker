import { useEffect } from 'react';
import { useStore } from './store'
import { useComponentVisibility,type AchievementCardProps, } from './store';


// Reusable Achievement Card Component
function AchievementCard({ achievement }: AchievementCardProps) {
    const Icon = achievement.icon;
    const isUnlocked = achievement.unlocked;

    return (
        <div 
            className={`relative bg-linear-to-br ${isUnlocked ? achievement.bgGradient : 'from-slate-800/50 to-slate-900/50 border-slate-700/30'} border rounded-xl p-5 transition-all duration-300 ${isUnlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-60'}`}
        >
            {/* Unlocked Badge */}
            {isUnlocked && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${isUnlocked ? achievement.bgGradient : 'from-slate-700/50 to-slate-800/50'} border ${isUnlocked ? achievement.borderColor : 'border-slate-600/30'} flex items-center justify-center shrink-0`}>
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
//from store(zustand)
const setComponentVisibility = useComponentVisibility((state) => state.setComponentVisibility)

    const achievements = useStore((state) => state.achievements);
    const unlock = useStore((state) => state.unlock);

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

        useEffect(() => {
        console.log(achievements[0].unlocked)
    }, [achievements])

    return (
        <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex flex-col">
                {/* Header */}
                <div className="relative p-6 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
                                Achievements
                            </h2>
                            <p className="text-cyan-500/70 text-sm mt-1">
                                {unlockedCount} of {totalCount}
                            </p>
                        </div>
                        <button onClick={() => unlock(1)}>
                            Unlock
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg px-4 py-2">
                                <p className="text-cyan-300 font-semibold text-lg">
                                    {Math.round((unlockedCount / totalCount) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                    <button 
                        className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-red-300 border border-red-500/30 transition-all duration-200 hover:scale-110"
                        onClick={() => setComponentVisibility(prev => ({...prev, achievementsVisibility: false}))}>
                        ×
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                    <div className="w-full bg-slate-700/50 rounded-full h-3">
                        <div 
                            className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500"
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