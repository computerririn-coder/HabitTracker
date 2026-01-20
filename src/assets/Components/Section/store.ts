//Note: i only know zustand at the higher level and basics only  and this is mostly ai generated
import { create } from 'zustand'
import { Target } from 'lucide-react' // Changed from 'import type'
import type { LucideIcon } from 'lucide-react' // Keep type-only import for LucideIcon


interface Achievement {
  id: number
  name: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  bgGradient: string
  borderColor: string
  iconColor: string
}


interface AchievementStore {
  achievements: Achievement[]
  unlock: (id: number) => void
}

const useStore = create<AchievementStore>((set) => ({
  achievements: (() => {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const parsed = JSON.parse(saved);

      return parsed.map((achievement: Achievement) => ({
        ...achievement,
        icon: Target 
      }));
    }
    return [
      {
        id: 1,
        name: "1st Timer",
        description: "Create your first task",
        icon: Target,
        unlocked: false,
        bgGradient: "from-cyan-500/20 to-cyan-600/20",
        borderColor: "border-cyan-500/30",
        iconColor: "text-cyan-400",
      },
            {
        id: 2,
        name: "Task Complete",
        description: "Finish A Task",
        icon: Target,
        unlocked: false,
        bgGradient: "from-cyan-500/20 to-cyan-600/20",
        borderColor: "border-cyan-500/30",
        iconColor: "text-cyan-400",
      },
    ];
  })(),
  
  unlock: (id) => set((state) => {
    const newAchievements = state.achievements.map(achievement => 
      achievement.id === id 
        ? { ...achievement, unlocked: true }
        : achievement
    );

    const toSave = newAchievements.map(({icon, ...rest}) => rest);
    localStorage.setItem('achievements', JSON.stringify(toSave));
    return { achievements: newAchievements };
  }),
}))
export { useStore }

const useComponentVisibility = create((set) => ({
  componentVisibility: {
    addNewTab: false,
    editHotKey: false,
    achievementsVisibility: false,
  },
  
  setComponentVisibility: (visibility) => set({ componentVisibility: visibility }),
}))

export { useComponentVisibility }

const useTotalTabCreatedCount = create((set) => ({
  totalTabCreatedCount: (() => {
    const saved = localStorage.getItem('totalTabCreatedCount');
    return saved ? JSON.parse(saved) : 0;
  })(),
  
  incrementTabCount: () => set((state) => {
    const newCount = state.totalTabCreatedCount + 1;
    localStorage.setItem('totalTabCreatedCount', JSON.stringify(newCount));
    return { totalTabCreatedCount: newCount };
  }),
}))

export { useTotalTabCreatedCount }

const useCompletedTasksCount = create((set) => ({
  completedTasksCount: 0,
  incrementCompletedTasksCount: () => set((state) => ({ variableName: state.variableName + 1 })),
}))

export { useCompletedTasksCount }