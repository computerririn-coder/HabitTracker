import { useEffect } from 'react';
import { useStore } from './store'
import { useComponentVisibility, type AchievementCardProps, } from './store';

// Reusable Achievement Card Component
function AchievementCard({ achievement }: AchievementCardProps) {
    const Icon = achievement.icon;
    const isUnlocked = achievement.unlocked;

    return (
        <div
            className={`relative rounded-xl border p-5 bg-linear-to-br transition-all duration-300 ${isUnlocked ? achievement.bgGradient : 'from-slate-800/50 to-slate-900/50 border-slate-700/30'} ${isUnlocked ? 'cursor-pointer hover:scale-105' : 'opacity-60'}`}
        >
            {/* Unlocked Badge */}
            {isUnlocked && (
                <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-500">
                    <span className="text-xs text-white">✓</span>
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-linear-to-br ${isUnlocked ? achievement.bgGradient : 'from-slate-700/50 to-slate-800/50'} ${isUnlocked ? achievement.borderColor : 'border-slate-600/30'}`}>
                    <Icon className={`h-7 w-7 ${isUnlocked ? achievement.iconColor : 'text-slate-500'}`} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3 className={`text-lg font-semibold ${isUnlocked ? 'text-cyan-100' : 'text-slate-400'}`}>
                        {achievement.name}
                    </h3>
                    <p className={`mt-1 text-sm ${isUnlocked ? 'text-cyan-400/70' : 'text-slate-500'}`}>
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
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    useEffect(() => {
        console.log(achievements[0].unlocked)
    }, [achievements])

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-cyan-500/30 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="relative border-b border-cyan-500/20 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                                Achievements
                            </h2>
                            <p className="mt-1 text-sm text-cyan-500/70">
                                {unlockedCount} of {totalCount}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg border border-cyan-500/30 bg-linear-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2">
                                <p className="text-lg font-semibold text-cyan-300">
                                    {Math.round((unlockedCount / totalCount) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20 text-red-400 transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:text-red-300"
                        onClick={() => setComponentVisibility(prev => ({ ...prev, achievementsVisibility: false }))}>
                        ×
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                    <div className="h-3 w-full rounded-full bg-slate-700/50">
                        <div
                            className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-cyan-500/20 bg-slate-900/50 p-4">
                    <p className="text-center text-sm text-cyan-500/70">
                        Keep completing tasks to unlock more achievements! 🏆
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Achievements;