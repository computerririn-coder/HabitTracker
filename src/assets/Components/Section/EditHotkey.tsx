// @ts-nocheck
import { useState, useContext } from "react";
import { set, useForm } from "react-hook-form";
import { TabNumberContext } from "./TasksBar";

function EditHotkey( ) {
    const { currentTab, setTabs, setComponentVisibility } = useContext(TabNumberContext);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            hotKey0: "1",
            hotKey1: "W",
        },
    });

    const onSubmit = (data) => {
        const newHotKey = `${data.hotKey0}+${data.hotKey1}`
        console.log(newHotKey)
        setTabs((prev) =>
    prev.map((tab, index) => 
        index === currentTab 
            ? { ...tab, hotKey: newHotKey }
            : tab
    )
)
    }
    
    return ( 
        <section className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-md mx-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="relative p-6 border-b border-cyan-500/20">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        Edit Hotkey
                    </h2>
                    <button 
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 transition-all duration-200 hover:scale-110"
                        onClick={() => setComponentVisibility(prev => ({...prev, editHotKey: false}))}
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-cyan-300 text-center">
                            Hotkey Combination
                        </label>
                        <div className="flex items-center gap-5">
                            <input 
                                {...register("hotKey0")}
                                placeholder="1" 
                                className="w-10 flex-1 px-4 py-3 bg-slate-900/50 border border-cyan-700/50 rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all text-center font-mono"
                            />
                            <span className="text-cyan-400 font-bold text-lg">+</span>
                            <input 
                                {...register("hotKey1")}
                                placeholder="Q" 
                                className="w-10 flex-1 px-4 py-3 bg-slate-900/50 border border-cyan-700/50 rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all text-center font-mono"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
}

export default EditHotkey;