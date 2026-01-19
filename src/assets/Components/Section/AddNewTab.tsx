// @ts-nocheck

import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TabNumberContext } from "./TasksBar";

function AddNewTab({ setComponentVisibility }) {
    const { currentTab, tabs, setTabs, tabCount, setTabCount } = useContext(TabNumberContext);
    const [existingKeyMsg, setExistingKeyMsg] = useState(false);
    const [userInput, setUserInput] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taskName: "Default",
            current: 0,
            max: 10,
            hotKey: "1",
            hotKey2: "Q",
        },
    });

    const onSubmit = (data) => {
        const newHotKey = `${data.hotKey}+${data.hotKey2}`;
        const existingHotKeys = tabs.map(e => e.hotKey);
        
        if (existingHotKeys.includes(newHotKey)) {
            setExistingKeyMsg(true);
            return;
        } else {
            setExistingKeyMsg(false);
        }

        const newTab = {
            current: Number(data.current),
            max: Number(data.max),
            name: data.taskName,
            hotKey: newHotKey,
            dateHistory: [],
        };

        setTabs((prev) =>
            [...prev, newTab].map((tab, index) => ({ ...tab, id: index }))
        );
        setTabCount((e) => e + 1);

        setComponentVisibility((prev) => ({
            ...prev,
            addNewTab: false,
        }));
    };



    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="w-full max-w-md mx-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="relative p-6 border-b border-cyan-500/20">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        Create New Task
                    </h2>
                    <button
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 transition-all duration-200 hover:scale-110"
                        onClick={() =>
                            setComponentVisibility((prev) => ({
                                ...prev,
                                addNewTab: false,
                            }))
                        }
                    >
                        ×
                    </button>
                </div>
{/* Form */}
<form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
    {/* Task Name */}
    <div className="space-y-2">
        <label htmlFor="taskName" className="block text-sm font-medium text-cyan-300">
            Task Name
        </label>
        <input
            id="taskName"
            {...register("taskName", {
                required: "This field is required",
                minLength: {
                    value: 1,
                    message: "This field is required"
                },
                validate: {
                    notEmpty: (value) => value.trim().length > 0 || "This field is required"
                }
            })}
            placeholder="Enter task name"
            className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 transition-all ${errors.taskName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                    : 'border-cyan-700/50 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
        />
        {errors.taskName && (
            <p className="text-red-400 text-sm">{errors.taskName.message}</p>
        )}
    </div>

    {/* Current and Max */}
    <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <label htmlFor="current" className="block text-sm font-medium text-cyan-300">
                Current Progress
            </label>
            <input
                id="current"
                {...register("current", {
                    valueAsNumber: true,
                    required: "This field is required",
                    min: {
                        value: 0,
                        message: ""
                    }
                })}
                type="number"
                placeholder="0"
                className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 transition-all ${errors.current
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-cyan-700/50 focus:border-cyan-500 focus:ring-cyan-500/30'
                    }`}
            />
            {errors.current && (
                <p className="text-red-400 text-sm">{errors.current.message}</p>
            )}
        </div>

        <div className="space-y-2">
            <label htmlFor="max" className="block text-sm font-medium text-cyan-300">
                Daily Goal
            </label>
            <input
                id="max"
                {...register("max", {
                    valueAsNumber: true,
                    required: "This field is required",
                    min: {
                        value: 1,
                        message: "Must Be Equal Or Greater Than 1"
                    }
                })}
                type="number"
                placeholder="10"
                className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 transition-all ${errors.max
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-cyan-700/50 focus:border-cyan-500 focus:ring-cyan-500/30'
                    }`}
            />
            {errors.max && (
                <p className="text-red-400 text-sm">{errors.max.message}</p>
            )}
        </div>
    </div>

    {/* Hotkey */}
    <div className="space-y-2">
        <label className="block text-sm font-medium text-cyan-300 text-center">
            Hotkey Combination
        </label>
        <div className="flex items-center gap-5">
            <input
                {...register("hotKey", {
                    required: "This field is required",
                    minLength: {
                        value: 1,
                        message: "This field is required"
                    },
                    maxLength: {
                        value: 1,
                        message: "Maximun 1 Characters"
                    },
                    validate: {
                        notEmpty: (value) => value.trim().length > 0 || "This field is required"
                    }
                })}
                placeholder="F2"
                className={`w-10 flex-1 px-4 py-3 bg-slate-900/50 border rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 transition-all text-center font-mono ${errors.hotKey
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-cyan-700/50 focus:border-cyan-500 focus:ring-cyan-500/30'
                    }`}
            />

            <span className="text-cyan-400 font-bold text-lg">+</span>

            <input
                {...register("hotKey2", {
                    required: "This field is required",
                    minLength: {
                        value: 1,
                        message: "This field is required"
                    },
                    maxLength: {
                        value: 1,
                        message: "Maximun 1 Characters"
                    },
                    validate: {
                        notEmpty: (value) => value.trim().length > 0 || "This field is required"
                    }
                })}
                placeholder="K"
                className={`w-10 flex-1 px-4 py-3 bg-slate-900/50 border rounded-lg text-cyan-50 placeholder-cyan-600/50 focus:outline-none focus:ring-2 transition-all text-center font-mono ${errors.hotKey2
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-cyan-700/50 focus:border-cyan-500 focus:ring-cyan-500/30'
                    }`}
            />
        </div>
        {(errors.hotKey || errors.hotKey2) && (
            <p className="text-red-400 text-sm text-center">
                {errors.hotKey?.message || errors.hotKey2?.message}
            </p>
        )}
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
    >
        Create Tracker
    </button>
    <p className="text-center text-red-400 text-sm">{existingKeyMsg ? "Hotkey Already Exists, Please Use A Different Hotkey" : ""}</p>
</form>
            </div>
        </div>
    );
}

export default AddNewTab;