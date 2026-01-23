import { useContext, useEffect, useState } from "react";
import { TabNumberContext } from "./TasksBar.tsx";
import { useHotkeys } from "react-hotkeys-hook";
import { useStore, useComponentVisibility } from "./store.ts";
import { motion } from "framer-motion";
import type { ProgressTrackerProps, Box1Props, Box2Props, Box3Props, Box4Props, Tab  } from './store.ts';
import { useTotalTaskCompletion } from "./store.ts";
import axios from 'axios';

function ProgressTracker({ current, max, incrementProgressBar, hotKey }: ProgressTrackerProps) {
    const percentage = Math.min(Math.round((current / max) * 100), 100);
    const [quotes, setQuotes] = useState("");
    const randomNum = Math.floor(Math.random() * 3);
const fallbackQuotes = [
    "The secret of getting ahead is getting started.",
    "Small progress is still progress. Keep going!",
    "Don't watch the clock; do what it does. Keep going."
];

    useEffect(() => {
        async function getMotivationalQuotes() {
            try {
                const response = await axios.get(
                    "https://quoteslate.vercel.app/api/quotes/random"
                );
                setQuotes(response.data.quote);
            } catch (error) {
                console.error("API fetch error:", error);
                setQuotes(fallbackQuotes[randomNum]);
            }
        }
        getMotivationalQuotes();

        const interval = setInterval(() => {
        getMotivationalQuotes(); 
    }, 60000); 
    
    return () => clearInterval(interval); 
    }, []);
    
    return (
        <div
            className="relative flex flex-col w-full md:h-full h-80 rounded-lg overflow-hidden bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
        >
            {/* Progress pill at top */}
            <div className="relative flex flex-row items-center justify-center w-[40%] px-8 py-6 mt-5 mx-auto rounded-full bg-slate-900/50 border border-cyan-700/50 z-10">
                <div className="text-center">
                    <span className="font-bold text-cyan-50">{current}</span>
                    <span className="mx-2 text-cyan-400">/</span>
                    <span className="font-bold text-cyan-400">{max}</span>
                </div>
            </div>

            {/* Water fill */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-cyan-600 to-blue-600 transition-all duration-500 ease-out"
                style={{ height: `${percentage}%` }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-blue-600/30 to-transparent" />
            </div>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-cyan-50 drop-shadow-lg">
                    {percentage}%
                </span>
            </div>

            {/* Motivational Quote - now at bottom-16 */}
            <div className="absolute bottom-16 left-0 right-0 px-6 z-10">
                <p className="text-sm md:text-base font-medium text-cyan-50 text-center italic leading-relaxed drop-shadow-lg">
                    "{quotes}"
                </p>
            </div>

            {/* Manual Increase button - now at bottom-4 */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                <button
                    className="px-4 py-2 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-cyan-50 font-semibold rounded-lg border border-cyan-400 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => incrementProgressBar(hotKey)}
                >
                    Manual Increase
                </button>
            </div>
        </div>
    );
}

/* Top-left small box */
function Box1({ currentSetting }: Box1Props) {
    return (
        <div className="flex flex-col gap-2 h-full p-4 rounded-lg bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <h1 className="text-sm text-cyan-300 uppercase tracking-wide">
                Current HotKey
            </h1>

            <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-900/50 border border-cyan-700/50">
                <span className="text-4xl font-bold text-cyan-50">
                    {currentSetting}
                </span>
            </div>
        </div>
    );
}

function Box2({ dateHistory }: Box2Props) {
    const colors = [
        "border-l-cyan-500 bg-cyan-500/10",
        "border-l-blue-500 bg-blue-500/10",
        "border-l-purple-500 bg-purple-500/10",
    ];

    return (
        <div className="h-full p-4 rounded-lg bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <h1 className="pb-4 text-sm text-cyan-300 uppercase tracking-wide">
                Most Recent Task Completion History
            </h1>

            <div className="space-y-2">
                {dateHistory.slice(0, 2).map((e, i) => (
                    <div
                        key={i}
                        className={`
                            flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 border-l-4 border-y border-r border-cyan-700/50
                            ${colors[i]}
                        `}
                    >
                        <span className="min-w-6 text-sm text-cyan-400 font-semibold">
                            #{i + 1}
                        </span>

                        <p className="flex-1 text-base text-cyan-50 font-medium">
                            {e}
                        </p>

                        <span className="text-xs text-cyan-400 uppercase">
                            time
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* Top-right box */
function Box3({
    name,
    current,
    max,
    currentSetting,
    componentVisibility,
    setComponentVisibility,
    completionCount,
}: Box3Props) {
    return (
        <div className="flex flex-col gap-4 h-full p-2 rounded-lg bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <div className="flex flex-row">
                <h1 className="pb-2 text-sm text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20">
                    Current Configuration
                </h1>

                <button
                    className="ml-auto px-4 py-1.5 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 transform  active:scale-95"
                    onClick={() =>
                        setComponentVisibility({
                            ...componentVisibility,
                            editHotKey: true,
                        })
                    }
                >
                    Edit hotkey
                </button>
            </div>

            <div className="grid grid-rows-3 gap-4 flex-1">
                <div className="flex items-center justify-center row-span-1 px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-700/50">
                    <div className="flex flex-col items-center">
                        <span className="mb-1 text-xs text-cyan-300 uppercase tracking-wide">
                            Task Name
                        </span>
                        <span className="text-2xl text-cyan-50 font-bold">
                            {name}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 row-span-1">
                    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-700/50">
                        <span className="mb-1 text-xs text-cyan-300 uppercase tracking-wide">
                            Current Progress
                        </span>
                        <span className="text-xl text-cyan-400 font-bold">
                            {current}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-700/50">
                        <span className="mb-1 text-xs text-cyan-300 uppercase tracking-wide">
                            Daily Goal
                        </span>
                        <span className="text-xl text-blue-400 font-bold">
                            {max}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 row-span-1">
                    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-700/50">
                        <span className="mb-1 text-xs text-cyan-300 uppercase tracking-wide">
                            Hotkey
                        </span>
                        <span className="px-3 py-1 text-lg text-cyan-50 font-mono font-bold rounded bg-slate-900/70 border border-cyan-700/50">
                            {currentSetting}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-slate-900/50 border border-cyan-700/50">
                        <span className="mb-1 text-xs text-cyan-300 uppercase tracking-wide">
                         Total Completions
                        </span>
                        <span className="text-xl text-purple-400 font-bold">
                            {completionCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Bottom full-width box */
function Box4({ tabs, currentTab }: Box4Props) {
    return (
        <div className="flex flex-col gap-3 h-full p-4 rounded-lg from-slate-800 via-slate-900 to-slate-950 overflow-auto border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <h1 className="pb-2 text-sm text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20">
                All Tasks List
            </h1>

            <div className="flex flex-wrap gap-3 content-start">
                {tabs!
                    .filter((e) => e.id !== currentTab)
                    .map((e, i) => {
                        const percentage = Math.min(
                            Math.round((e.current / e.max) * 100),
                            100
                        );

                        return (
                            <div
                                key={i}
                                className="flex flex-col gap-1 w-[32.3%] rounded-lg bg-slate-900/50 border border-cyan-700/50"
                            >
                                <div className="flex items-center gap-2 px-3 pt-1">
                                    <span className="text-xs text-cyan-300">
                                        Name:
                                    </span>
                                    <span className="text-sm text-cyan-50 font-semibold">
                                        {e.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 px-3">
                                    <span className="text-xs text-cyan-300">
                                        Hotkey:
                                    </span>
                                    <span className="px-2 py-0.5 text-xs text-cyan-50 font-mono font-semibold rounded bg-slate-900/70 border border-cyan-700/50">
                                        {e.hotKey}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 px-3 pb-1">
                                    <span className="text-xs text-cyan-300">
                                        Progress:
                                    </span>
                                    <span className="text-sm text-cyan-400 font-semibold">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

function MainSection() {
    //from store(zustand)
    const componentVisibility = useComponentVisibility((state) => state.componentVisibility);
    const setComponentVisibility = useComponentVisibility((state) => state.setComponentVisibility);
    const achievements = useStore((state) => state.achievements);
    const unlock = useStore((state) => state.unlock);
    const { totalTaskCompletion, setTotalTaskCompletion } = useTotalTaskCompletion();

    const { currentTab, tabs, setTabs } = useContext(TabNumberContext)!;

    const hotKeys = tabs.map((e) => e.hotKey);

function incrementProgressBar(pressedKey: string) {
    const hotkey = pressedKey.toUpperCase().replace(/\s+/g, "");
    const foundTab = tabs.find(
        (tab: Tab) =>
            tab.hotKey.toUpperCase().replace(/\s+/g, "") === hotkey
    );
    if(!foundTab) {
        return;
    }
    if (
        foundTab &&
        foundTab.current + 1 === foundTab.max &&
        achievements[1].unlocked === false
    ) {
        window.alert("Achievement Unlocked: Complete A Task");
        unlock(2);
    }

    if (foundTab.current + 1 === foundTab.max) {
        setTotalTaskCompletion(totalTaskCompletion + 1);
        foundTab.completionCount++;
        setTabs((prev) => 
            prev.map((e) =>  
                e.id === foundTab.id ? {...e, current: -1} : e  //if i use "0" im not getting zero in the progress bar im getting "1" and this is the quickest sol
            )
        )
    }

        setTabs((prevTabs: Tab[]) =>
            prevTabs.map((tab) =>
                tab.id === foundTab.id
                    ? {
                          ...tab,
                          current:
                              tab.current + 1 <= tab.max
                                  ? tab.current + 1
                                  : tab.current,
                          dateHistory: [
                              new Date().toLocaleString(),
                              ...tab.dateHistory,
                          ],
                      }
                    : tab
            )
        );
    }

    useHotkeys(hotKeys, (_, handler) => {
        incrementProgressBar(handler.keys?.join("+") || "");
    });

    const [hasAnimated, setHasAnimated] = useState(() => {
        return localStorage.getItem("hasAnimated") === "true";
    });

    useEffect(() => {
        if (!hasAnimated) {
            localStorage.setItem("hasAnimated", "true");
            setHasAnimated(true);
        }
    }, []);

    return (
        <section className="w-full min-h-[85vh] px-8 pb-6 md:pb-4 bg-slate-950">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 flex-1 gap-10 pt-10">
                    
                    <motion.div 
                        className="col-span-1 w-full md:w-[104%] xl:w-full h-60 xl:h-full mx-auto"
                        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ProgressTracker
                            name={tabs[currentTab].name}
                            current={tabs[currentTab].current}
                            max={tabs[currentTab].max}
                            incrementProgressBar={incrementProgressBar}
                            hotKey={tabs[currentTab].hotKey}
                        />
                    </motion.div>

                    <div className="grid grid-rows-2 gap-6 col-span-1 md:col-span-2 w-full h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 row-span-1">
                            <div className="grid grid-rows-3 gap-6">
                                <motion.div 
                                    className="row-span-2 pt-15 md:pt-0"
                                    initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <Box1
                                        currentSetting={
                                            tabs[currentTab].hotKey
                                        }
                                    />
                                </motion.div>

                                <motion.div 
                                    className="row-span-7"
                                    initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <Box2
                                        dateHistory={
                                            tabs[currentTab].dateHistory
                                        }
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
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
                                />
                            </motion.div>
                        </div>

                        <motion.div 
                            className="row-span-1"
                            initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Box4
                                tabs={tabs}
                                currentTab={currentTab}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainSection;