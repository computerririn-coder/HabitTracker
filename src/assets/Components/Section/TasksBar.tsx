// @ts-nocheck

import { useState, createContext, useEffect } from "react";
import MainSection from "./MainSection";
import AddNewTab from "./addNewTab";
import EditHotkey from "./editHotkey";

export const TabNumberContext = createContext(null);

function TabBar({
    id,
    name,
    isActive,
    tabs,
    setTabs,
    tabCount,
    currentTab,
    setCurrentTab,
}) {
    function deleteItem(id, tabs, setTabs, currentTab, setCurrentTab) {
        console.log(id)
        console.log(currentTab)
        try {
            const newTabs = tabs
                .filter(tab => tab.id !== id)
                .map((tab, index) => ({ ...tab, id: index }));

            if (newTabs.length === 0) {
                throw new Error("Cannot delete the last tab");
            }

            if(currentTab === id && id >= 1){
                setCurrentTab(e => e - 1)
            }

            if (id <= currentTab) {
            setCurrentTab(prev => Math.max(0, prev - 1));
            } 

            setTabs(newTabs);
        } catch (error) {
            console.error("Error deleting tab:", error);
            alert("Cannot delete the last remaining tab!");
            setCurrentTab(0);
            return;
        }
    }

    return (
        <>
            <div className="relative px-4 rounded-t-xl max-w-48 h-8 flex flex-row items-center bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 transition-colors cursor-pointer shadow-lg border border-cyan-500/30">
                <div className="flex items-center flex-1 min-w-0">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-cyan-50 truncate ml-2">
                        {id + 1}: {name}
                    </span>
                </div>

                <button
                    className="ml-2 w-5 h-5 rounded-full hover:bg-red-500/20 flex items-center justify-center flex-shrink-0 transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(id, tabs, setTabs, currentTab, setCurrentTab);
                    }}
                >
                    <span className="text-red-400 hover:text-red-300 text-lg leading-none">×</span>
                </button>
            </div>

            <div
                className={`w-[110%] h-2 rounded-t-md p-1 ml-[-5%] bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                }`}
            ></div>
        </>
    );
}

function TasksBar() {
    const [componentVisibility, setComponentVisibility] = useState({
        addNewTab: false,
        editHotKey: false,
    });
    const [currentTab, setCurrentTab] = useState(() => {
        const saveCurrentTab = localStorage.getItem("saveCurrentTab");
        return saveCurrentTab ? JSON.parse(saveCurrentTab) : 0
    });
    const [tabCount, setTabCount] = useState(0);
const [tabs, setTabs] = useState(() => {
    const saveTabs = localStorage.getItem("tabs");
    return saveTabs ? JSON.parse(saveTabs) : [
        {
            id: 0,
            current: 0,
            max: 10,
            name: "Water",
            hotKey: "2+k",
            dateHistory: ["Sample", "Sample2"],
        },
    ];
});

useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
}, [tabs]);

useEffect(() => {
    localStorage.setItem("saveCurrentTab", JSON.parse(currentTab));
}, [currentTab])

    return (
        <TabNumberContext.Provider
            value={{
                currentTab,
                setCurrentTab,
                tabs,
                setTabs,
                tabCount,
                setTabCount,
                setComponentVisibility,
            }}
        >
            <section className="w-full h-[5vh] bg-gradient-to-r from-slate-900 to-slate-950 flex items-center justify-start pl-10 gap-10 border-b border-cyan-500/20">
                {tabs.map(e => (
                    <div
                        key={e.id}
                        onClick={() => setCurrentTab(e.id)}
                        className="pt-2"
                    >
                        <TabBar
                            id={e.id}
                            name={e.name}
                            isActive={currentTab === e.id}
                            tabs={tabs}
                            setTabs={setTabs}
                            tabCount={tabCount}
                            currentTab={currentTab}
                            setCurrentTab={setCurrentTab}
                        />
                    </div>
                ))}

                <button 
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-110" 
                    onClick={() => setComponentVisibility((prev) => ({
                        ...prev,
                        addNewTab: true,
                    }))}
                >
                    +
                </button>
                <p className="text-cyan-300">{currentTab}</p>
            </section>

            <div className="w-screen h-1 bg-gradient-to-r from-cyan-600 to-blue-600 absolute shadow-lg shadow-cyan-500/30"></div>

            <MainSection />
            {componentVisibility.addNewTab && (<AddNewTab setComponentVisibility={setComponentVisibility}/>)}
            {componentVisibility.editHotKey && (<EditHotkey/>)}
        </TabNumberContext.Provider>
    );
}

export default TasksBar;