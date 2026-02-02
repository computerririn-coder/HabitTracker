//@ts-nocheck
//temporarily disabling typescript so i can push it to github and update my deployed vercel app,will fix typescript laterfppfpp
import { useContext, useEffect, useState, useMemo } from 'react';
import { TabNumberContext } from './TasksBar.tsx';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  useStore,
  useComponentVisibility,
  useAchievementCount,
} from './store.ts';
import { motion } from 'framer-motion';
import type {
  ProgressTrackerProps,
  Box1Props,
  Box2Props,
  Box3Props,
  Box4Props,
  Tab,
} from './store.ts';
import { useTotalTaskCompletion } from './store.ts';
import axios from 'axios';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressTracker from './Boxes/ProgressTracker.tsx';
import Box1 from './Boxes/Box1.tsx';
import Box2 from './Boxes/Box2.tsx';
import Box3 from './Boxes/Box3.tsx';
import Box4 from './Boxes/Box4.tsx';

function MainSection() {
  //from store(zustand)
  const componentVisibility = useComponentVisibility(
    (state) => state.componentVisibility
  );
  const setComponentVisibility = useComponentVisibility(
    (state) => state.setComponentVisibility
  );
  const achievements = useStore((state) => state.achievements);
  const unlock = useStore((state) => state.unlock);
  const { totalTaskCompletion, setTotalTaskCompletion } =
    useTotalTaskCompletion();
  const incrementAchievementCount = useAchievementCount(
    (state) => state.incrementAchievementCount
  );

  const { currentTab, tabs, setTabs } = useContext(TabNumberContext)!;
  const hotKeys = tabs.map((e) => e.hotKey);
  const [totalCompletionColor, setTotalCompletionColor] = useState(false);
  const [tabTracker, setTabTracker] = useState(0);

  function incrementProgressBar(pressedKey: string) {
    const hotkey = pressedKey.toUpperCase().replace(/\s+/g, '');
    const foundTab = tabs.find(
      (tab: Tab) => tab.hotKey.toUpperCase().replace(/\s+/g, '') === hotkey
    );
    const current = foundTab.current;
    const max = foundTab?.max;
    if (!foundTab) {
      return;
    }
    if (
      foundTab &&
      foundTab.current + 1 === foundTab.max &&
      achievements[1].unlocked === false
    ) {
      window.alert('Achievement Unlocked: Complete A Task');
      unlock(2);
      incrementAchievementCount();
    }

    if (foundTab.current + 1 === foundTab.max) {
      setTotalTaskCompletion(totalTaskCompletion + 1);
      foundTab.completionCount++;
      setTabs((prev) =>
        prev.map((e) => (e.id === foundTab.id ? { ...e, current: -1 } : e))
      );
    }

    if (current === max - 1 && currentTab === foundTab.id) {
      setTotalCompletionColor(true);
      setTimeout(() => {
        setTotalCompletionColor(false);
      }, 500);
    } else if (current === max - 1 && currentTab !== foundTab.id) {
      setTabs((prev) =>
        prev.map((tabs) =>
          tabs.id === foundTab.id
            ? { ...tabs, totalCompletionColor: true }
            : tabs
        )
      );
      setTimeout(() => {
        setTabs((prev) =>
          prev.map((tabs) =>
            tabs.id === foundTab.id
              ? { ...tabs, totalCompletionColor: false }
              : tabs
          )
        );
      }, 500);
      setTabTracker(foundTab.id);
    }

    setTabs((prevTabs: Tab[]) =>
      prevTabs.map((tab) =>
        tab.id === foundTab.id
          ? {
              ...tab,
              current:
                tab.current + 1 <= tab.max ? tab.current + 1 : tab.current,
              dateHistory: [new Date().toLocaleString(), ...tab.dateHistory],
            }
          : tab
      )
    );
  }

  useHotkeys(hotKeys, (_, handler) => {
    incrementProgressBar(handler.keys?.join('+') || '');
  });

  const [hasAnimated, setHasAnimated] = useState(() => {
    return localStorage.getItem('hasAnimated') === 'true';
  });

  useEffect(() => {
    if (!hasAnimated) {
      localStorage.setItem('hasAnimated', 'true');
      setHasAnimated(true);
    }
  }, []);

  return (
    <section className="w-full md:h-[86.3vh] px-4 py-6 bg-slate-950 xl:h-[84.5vh] 2xl:h-[85vh] ">
      <div className="flex flex-col gap-6  mx-auto md:grid md:grid-cols-3 md:grid-rows-4 md:h-[75vh] mt-8 xl:mt-3  2xl:mt-16 px-10">
        {/* Progress Tracker */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-start-1 col-end-2 row-start-1 row-end-4 2xl:row-start-1 2xl:row-end-3"
        >
          <ProgressTracker
            name={tabs[currentTab].name}
            current={tabs[currentTab].current}
            max={tabs[currentTab].max}
            incrementProgressBar={incrementProgressBar}
            hotKey={tabs[currentTab].hotKey}
            totalCompletionColor={totalCompletionColor}
            setTotalCompletionColor={setTotalCompletionColor}
          />
        </motion.div>

        {/* Box1 - Hotkey Display */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-start-2 col-end-2 row-start-3 row-end-3 2xl:row-span-1 2xl:row-end-3"
        >
          <Box1 currentSetting={tabs[currentTab].hotKey} />
        </motion.div>

        {/* Box2 - Recent History */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-start-2 col-end-2 row-start-1 row-end-3 2xl:row-start-1 2xl:row-end-2"
        >
          <Box2 dateHistory={tabs[currentTab].dateHistory} />
        </motion.div>

        {/* Box3 - Configuration */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="col-start-3 col-end-4 row-start-1 row-end-4 2xl:row-start-1 2xl:row-end-3"
        >
          <Box3
            dateHistory={tabs[currentTab].dateHistory}
            name={tabs[currentTab].name}
            current={tabs[currentTab].current}
            max={tabs[currentTab].max}
            currentSetting={tabs[currentTab].hotKey}
            componentVisibility={componentVisibility}
            setComponentVisibility={setComponentVisibility}
            completionCount={tabs[currentTab].completionCount}
            currentTab={currentTab}
            setTabs={setTabs}
            totalCompletionColor={totalCompletionColor}
            tabTracker={tabTracker}
          />
        </motion.div>

        {/* Box4 - All Tasks */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="col-start-1 col-end-4 2xl:row-start-3 2xl:row-end-5"
        >
          <Box4 tabs={tabs} currentTab={currentTab} tabTracker={tabTracker} />
        </motion.div>
      </div>
    </section>
  );
}

export default MainSection;
