// @ts-nocheck
//Note: i only know zustand at the higher level and basics only  and this is mostly ai generated

import { create } from 'zustand'
import { Target } from 'lucide-react'

const useStore = create((set) => ({
  achievements: (() => {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const parsed = JSON.parse(saved);

      return parsed.map(achievement => ({
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