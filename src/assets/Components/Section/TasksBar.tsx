import { useState, createContext } from "react";
import MainSection from "./MainSection"; 

export const TabNumberContext = createContext(null);

function TabBar({ name, id }) {
    return (
        <div className="px-4 py-2 rounded-lg bg-gray-300 max-w-42 h-6 flex flex-row items-center justify-center">
            Tab:{id} Name: {name} 
        </div>
    );
}

function TasksBar() {
    const [tabs, setTabs] = useState([{ id: 1, name: "Water" }]);
    const [currentTab, setCurrentTab] = useState(1);
    
    function addItem() {
        const newItem = {
            id: tabs.length + 1,
            name: "Water"
        };
        setTabs(prev => [...prev, newItem]);
    }
    
    return (
        <TabNumberContext.Provider value={{ currentTab, setCurrentTab, tabs }}>
            <section className="w-full h-[5vh] bg-[#00008B] flex flex-row items-center justify-start pl-10 gap-10 overflow-x-auto">
                {tabs.map(e => (
                    <div key={e.id} onClick={() => setCurrentTab(e.id)}>
                        <TabBar name={e.name} id={e.id}/>
                    </div>
                ))}
                <button className="bg-orange-600 rounded-2xl w-6" onClick={addItem}>+</button>
                <p>{currentTab}</p>
            </section>
            <MainSection/>
        </TabNumberContext.Provider>
    );
}

export default TasksBar;