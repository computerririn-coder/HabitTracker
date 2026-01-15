// @ts-nocheck


import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TabNumberContext } from "./TasksBar";

function AddNewTab() {
const { currentTab, tabs, setTabs, tabCount, setTabCount } = useContext(TabNumberContext);

const [userInput, setUserInput] = useState({});
const {register, handleSubmit} = useForm();



const onSubmit = (data) => {
    const newTab = {
        id: tabCount,        
        current:  0,        
        max: 10,
        name: data.taskName,
        hotKey: data.hotKey,
        dateHistory: [],
    };
        setTabs((prev) => [...prev, newTab].map((tab, index) => ({ ...tab, id: index })));
        setTabCount(e => e + 1)
};



    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg border-2 border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Task</h2>
            
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <input {...register("taskName")} placeholder="TaskName" />
            <input {...register("current")} type="number" placeholder="Current" />
            <input {...register("max")} type="number" placeholder="Max" />
            <input {...register("hotKey")} placeholder="Hotkey" />
            
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default AddNewTab;

