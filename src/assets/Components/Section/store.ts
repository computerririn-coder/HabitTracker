//Note: i only know basics only and this is mostly ai generated + i also placed my  typescripts here
import { create } from 'zustand'
import { Target, type LucideIcon } from 'lucide-react'




export type Achievement = {
  id: number
  name: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  bgGradient: string
  borderColor: string
  iconColor: string
}

export type AchievementStore = {
  achievements: Achievement[]
  unlock: (id: number) => void
}

export type AchievementCardProps = {
    achievement: Achievement;
}


export type ComponentVisibilityState = {
  addNewTab: boolean
  editHotKey: boolean
  achievementsVisibility: boolean
}

export type ComponentVisibilityStore = {
  componentVisibility: ComponentVisibilityState
  setComponentVisibility: (visibility: ComponentVisibilityState | ((prev: ComponentVisibilityState) => ComponentVisibilityState)) => void
}


export type TotalTabCreatedCountStore = {
  totalTabCreatedCount: number
  incrementTabCount: () => void
}


export type CompletedTasksCountStore = {
  completedTasksCount: number
  incrementCompletedTasksCount: () => void
}

//TaskBar Typescript
export type Tab = {
    id: number;
    current: number;
    max: number;
    name: string;
    hotKey: string;
    dateHistory: string[];
    completionCount: number;
};

//MainSection Typescript
export type ProgressTrackerProps = {
    name: string;
    current: number;
    max: number;
    incrementProgressBar: (hotKey: string) => void;
    hotKey: string;
};

export type Box1Props = {
    currentSetting: string;
};

export type Box2Props = {
    dateHistory: string[];
};

export type Box3Props = {
    name: string;
    current: number;
    max: number;
    currentSetting: string;
    dateHistory: string[];
    componentVisibility: ComponentVisibilityState;
    setComponentVisibility: (
        visibility: ComponentVisibilityState | ((prev: ComponentVisibilityState) => ComponentVisibilityState)
    ) => void;
    completionCount: number;
};

export type Box4Props = {
    tabs: Tab[] | undefined;
    currentTab: number;
};

export type TabNumberContextValue = {
    currentTab: number;
    setCurrentTab: (value: number | ((prev: number) => number)) => void;
    tabs: Tab[];
    setTabs: (value: Tab[] | ((prev: Tab[]) => Tab[])) => void;
    tabCount: number;
    setTabCount: (value: number | ((prev: number) => number)) => void;
    setComponentVisibility: (visibility: ComponentVisibilityState | ((prev: ComponentVisibilityState) => ComponentVisibilityState)) => void;
};

export type TabBarProps = {
    id: number;
    name: string;
    isActive: boolean;
    tabs: Tab[];
    setTabs: (value: Tab[] | ((prev: Tab[]) => Tab[])) => void;
    tabCount: number;
    currentTab: number;
    setCurrentTab: (value: number | ((prev: number) => number)) => void;
};

//AddNewTab Typescript
export type FormData = {
    taskName: string;
    current: number;
    max: number;
    hotKey: string;
    hotKey2: string;
};

//EditHotKey Typescript
export type EditHotKeyFormData = {
    hotKey0: string;
    hotKey1: string;
};


const useStore = create<AchievementStore>((set) => ({
  achievements: (() => {
    const saved: string | null = localStorage.getItem('achievements');
    if (saved) {
      const parsed: Omit<Achievement, 'icon'>[] = JSON.parse(saved);

      return parsed.map((achievement: Omit<Achievement, 'icon'>): Achievement => ({
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

  
  unlock: (id: number) => set((state: AchievementStore) => {
    const newAchievements: Achievement[] = state.achievements.map((achievement: Achievement): Achievement => 
      achievement.id === id 
        ? { ...achievement, unlocked: true }
        : achievement
    );

    const toSave: Omit<Achievement, 'icon'>[] = newAchievements.map(({icon, ...rest}) => rest);
    localStorage.setItem('achievements', JSON.stringify(toSave));
    return { achievements: newAchievements };
  }),
}))

export { useStore }


const useComponentVisibility = create<ComponentVisibilityStore>((set) => ({
  componentVisibility: {
    addNewTab: false,
    editHotKey: false,
    achievementsVisibility: false,
  },
  
  setComponentVisibility: (visibility: ComponentVisibilityState | ((prev: ComponentVisibilityState) => ComponentVisibilityState)) => 
    set((state: ComponentVisibilityStore) => ({
      componentVisibility: typeof visibility === 'function' 
        ? visibility(state.componentVisibility) 
        : visibility
    })),
}))

export { useComponentVisibility }


const useTotalTabCreatedCount = create<TotalTabCreatedCountStore>((set) => ({
  totalTabCreatedCount: (() => {
    const saved: string | null = localStorage.getItem('totalTabCreatedCount');
    return saved ? JSON.parse(saved) as number : 0;
  })(),
  
  incrementTabCount: () => set((state: TotalTabCreatedCountStore) => {
    const newCount: number = state.totalTabCreatedCount + 1;
    localStorage.setItem('totalTabCreatedCount', JSON.stringify(newCount));
    return { totalTabCreatedCount: newCount };
  }),
}))

export { useTotalTabCreatedCount }


const useCompletedTasksCount = create<CompletedTasksCountStore>((set) => ({
  completedTasksCount: 0,
  incrementCompletedTasksCount: () => set((state: CompletedTasksCountStore) => ({ 
    completedTasksCount: state.completedTasksCount + 1
  })),
}))

export { useCompletedTasksCount }

//Total task Completion number

type TotalTaskCompletionStore = {
  totalTaskCompletion: number;
  setTotalTaskCompletion: (value: number) => void;
}

const useTotalTaskCompletion = create<TotalTaskCompletionStore>((set) => ({
  totalTaskCompletion: parseInt(localStorage.getItem('totalTaskCompletion') || '0'),
  setTotalTaskCompletion: (value: number) => {
    localStorage.setItem('totalTaskCompletion', value.toString());
    set({ totalTaskCompletion: value });
  }
}));

export { useTotalTaskCompletion }


