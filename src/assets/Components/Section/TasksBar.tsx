// @ts-nocheck

import { useState, createContext, useEffect } from "react";
import MainSection from "./MainSection"; 
import AddNewTab from "./addNewTab";


export const TabNumberContext = createContext(null);

function TabBar({ name, id, isActive, tabCount }) {
    return (
        <>
<div className="relative px-4  rounded-t-xl max-w-48 h-8 flex flex-row items-center  bg-gray-800 hover:bg-gray-750 transition-colors cursor-pointer shadow-lg">
  <div className="flex items-center  flex-1 min-w-0">
    <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
    <span className="text-sm font-medium text-white truncate">{name}</span>
  </div>
  <button className="ml-2 w-5 h-5 rounded-full hover:bg-gray-600 flex items-center justify-center flex-shrink-0">
    <span className="text-gray-400 text-lg leading-none">×</span>
  </button>
  
</div>
<div className={`w-[110%] h-2 rounded-t-md p-1 ml-[-5%] bg-blue-500 transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
            }`}></div>
</>
    );
}

function TasksBar() {
const [currentTab, setCurrentTab] = useState(0);
const [tabCount, setTabCount] = useState(0);
const [tabs, setTabs] = useState([
  {
    id: tabCount,
    current: 0,
    max: 10,
    name: "Water",
    hotKey: "F2+k",
    dateHistory: ["Sample", "Sample2"],
  }
]);


    return (
        <TabNumberContext.Provider value={{ currentTab, setCurrentTab, tabs, setTabs, tabCount, setTabCount }}>
            <section className="w-full h-[5vh] bg-[#00008B] flex flex- items-center justify-start pl-10 gap-10">
                {tabs.map(e => (
                    <div key={e.id} onClick={() => setCurrentTab(e.id)} className="pt-2">
                        <TabBar name={e.name}  key={e.id} isActive={currentTab === e.id} tabCount={tabCount}/>
                    </div>
                ))}
                <button className="bg-orange-600 rounded-2xl w-6" >+</button>
                <p>{currentTab}</p>
            </section>
                            <div className="w-screen h-1 bg-blue-500 absolute"></div>
            <MainSection/>
            <AddNewTab/>+
        </TabNumberContext.Provider>
    );
}

export default TasksBar;