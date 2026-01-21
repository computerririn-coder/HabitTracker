import { useContext, useEffect, useState } from "react";
import { TabNumberContext } from "./TasksBar.tsx";
import { useHotkeys } from "react-hotkeys-hook";
import axios from "axios";
import { useStore, useComponentVisibility } from "./store.ts";
import { motion } from "framer-motion";
import type { ProgressTrackerProps, Box1Props, Box2Props, Box3Props, Box4Props, Tab, TabNumberContextValue  } from './store';

function ProgressTracker({ name, current, max, incrementProgressBar, hotKey }: ProgressTrackerProps) {
    const percentage = Math.min(Math.round((current / max) * 100), 100);

    // needs fixing if api returns error use my local quotes instead
    /*
    useEffect(() => {
        async function getMotivationalQuotes() {
            try {
                const response = await axios.get(
                    "https://quoteslate.vercel.app/api/quotes/random"
                );
                console.log(response.data);
            } catch (error) {
                console.error("API fetch error:", error);
            }
        }
        getMotivationalQuotes();
    }, []);
    */

    return (
        <div
            className=" w-full md:h-full h-[20rem] rounded-lg border-4 border-cyan-500/30 overflow-hidden relative bg-gradient-to-br 
        from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/20 flex flex-col "
        >
            {/* Progress pill at top */}
            <div className="w-[40%] bg-slate-900/50 rounded-full px-8 py-6 border border-cyan-700/50 mx-auto flex flex-row justify-center items-center mt-5 relative z-10 ">
                <div className="text-center ">
                    <span className="font-bold text-cyan-50">{current}</span>
                    <span className="text-cyan-400 mx-2">/</span>
                    <span className="font-bold text-cyan-400">{max}</span>
                </div>
            </div>

            {/* Water fill */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-500 ease-out"
                style={{ height: `${percentage}%` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />
            </div>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-cyan-50 drop-shadow-lg">
                    {percentage}%
                </span>
            </div>

            {/* Manual Increase button */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center z-10">
                <button
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500
                 text-cyan-50 font-semibold rounded-lg border border-cyan-400 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => incrementProgressBar(hotKey)}
                >
                    Manual Increase
                </button>
            </div>

            {/* Tracker title */}
            <div className="absolute bottom-4 left-0 right-0">
                <h2 className="text-2xl font-bold text-cyan-50 text-center">
                    quotes
                </h2>
            </div>
        </div>
    );
}

/* Top-left small box */
function Box1({ currentSetting }: Box1Props) {
    return (
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-lg border border-cyan-500/30 h-full p-4 flex flex-col gap-2 shadow-lg shadow-cyan-500/10">
            <h1 className="text-sm text-cyan-300 uppercase tracking-wide">
                Current HotKey
            </h1>

            <div className="flex-1 flex items-center justify-center rounded-xl bg-slate-900/50 border border-cyan-700/50">
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
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-lg border border-cyan-500/30 h-full p-4 shadow-lg shadow-cyan-500/10">
            <h1 className="text-sm text-cyan-300 uppercase tracking-wide pb-4">
                Most Recent Task Completion History
            </h1>

            <div className="space-y-2">
                {dateHistory.slice(0, 2).map((e, i) => (
                    <div
                        key={i}
                        className={`
                            flex items-center gap-4 rounded-lg p-4 border-l-4 border-y border-r border-cyan-700/50
                            bg-slate-900/40
                            ${colors[i]}
                        `}
                    >
                        <span className="text-cyan-400 text-sm font-semibold min-w-[24px]">
                            #{i + 1}
                        </span>

                        <p className="text-cyan-50 text-base font-medium flex-1">
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
    dateHistory,
    componentVisibility,
    setComponentVisibility,
}: Box3Props) {
    return (
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-lg border border-cyan-500/30 h-full p-2 flex flex-col gap-4 shadow-lg shadow-cyan-500/10">
            <div className="flex flex-row">
                <h1 className="text-sm text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20 pb-2">
                    Current Configuration
                </h1>

                <button
                    className="ml-auto px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500
             text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 transform hover:scale-105 active:scale-95"
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
                <div className="row-span-1 bg-slate-900/50 rounded-lg px-4 py-3 border border-cyan-700/50 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <span className="text-cyan-300 text-xs uppercase tracking-wide mb-1">
                            Task Name
                        </span>
                        <span className="font-bold text-cyan-50 text-2xl">
                            {name}
                        </span>
                    </div>
                </div>

                <div className="row-span-1 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-lg px-4 py-3 border border-cyan-700/50 flex flex-col items-center justify-center">
                        <span className="text-cyan-300 text-xs uppercase tracking-wide mb-1">
                            Current Progress
                        </span>
                        <span className="font-bold text-cyan-400 text-xl">
                            {current}
                        </span>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg px-4 py-3 border border-cyan-700/50 flex flex-col items-center justify-center">
                        <span className="text-cyan-300 text-xs uppercase tracking-wide mb-1">
                            Daily Goal
                        </span>
                        <span className="font-bold text-blue-400 text-xl">
                            {max}
                        </span>
                    </div>
                </div>

                <div className="row-span-1 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-lg px-4 py-3 border border-cyan-700/50 flex flex-col items-center justify-center">
                        <span className="text-cyan-300 text-xs uppercase tracking-wide mb-1">
                            Hotkey
                        </span>
                        <span className="font-mono font-bold text-cyan-50 text-lg bg-slate-900/70 px-3 py-1 rounded border border-cyan-700/50">
                            {currentSetting}
                        </span>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg px-4 py-3 border border-cyan-700/50 flex flex-col items-center justify-center">
                        <span className="text-cyan-300 text-xs uppercase tracking-wide mb-1">
                            Total Completions
                        </span>
                        <span className="font-bold text-purple-400 text-xl">
                            X
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
        <div className=" from-slate-800 via-slate-900 to-slate-950 rounded-lg border border-cyan-500/30 h-full p-4 flex flex-col gap-3 overflow-auto shadow-lg shadow-cyan-500/10">
            <h1 className="text-sm text-cyan-300 uppercase tracking-wide border-b border-cyan-500/20 pb-2">
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
                                className="w-[32.3%] bg-slate-900/50 rounded-lg border border-cyan-700/50 flex flex-col gap-1"
                            >
                                <div className="flex items-center gap-2 px-3 pt-1">
                                    <span className="text-cyan-300 text-xs">
                                        Name:
                                    </span>
                                    <span className="font-semibold text-cyan-50 text-sm">
                                        {e.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 px-3">
                                    <span className="text-cyan-300 text-xs">
                                        Hotkey:
                                    </span>
                                    <span className="font-mono font-semibold text-cyan-50 text-xs bg-slate-900/70 px-2 py-0.5 rounded border border-cyan-700/50">
                                        {e.hotKey}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 px-3 pb-1">
                                    <span className="text-cyan-300 text-xs">
                                        Progress:
                                    </span>
                                    <span className="font-semibold text-cyan-400 text-sm">
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
    const componentVisibility = useComponentVisibility(
        (state) => state.componentVisibility
    );
    const setComponentVisibility = useComponentVisibility(
        (state) => state.setComponentVisibility
    );
    const achievements = useStore((state) => state.achievements);
    const unlock = useStore((state) => state.unlock);

    const { currentTab, setCurrentTab, tabs, setTabs } = useContext(TabNumberContext)!;

    const hotKeys = tabs.map((e) => e.hotKey);

    function incrementProgressBar(pressedKey: string) {
        const hotkey = pressedKey.toUpperCase().replace(/\s+/g, "");
        const foundTab = tabs.find(
            (tab: Tab) =>
                tab.hotKey.toUpperCase().replace(/\s+/g, "") === hotkey
        );
        const date = 1;
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

    useHotkeys(hotKeys, (event, handler) => {
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
       <section className="w-full min-h-[85vh] pb-6 md:pb-4 bg-slate-950 px-8 ">
    <div className="  flex flex-col gap-6 ">
        <div className="grid grid-cols-1 xl:grid-cols-3  flex-1 pt-10 gap-10">
            
            <motion.div 
                className="col-span-1 h-60   xl:h-full w-full md:w-[104%] xl:w-full mx-auto "
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

            <div className="col-span-1 md:col-span-2 grid grid-rows-2 gap-6 h-full w-full ">
                <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 gap-6  ">
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
                            setComponentVisibility={
                                setComponentVisibility
                            }
                        />
                    </motion.div>
                </div>

                <motion.div 
                    className="row-span-1 "
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

// Do not change anything else including my texts,paddings,etc
