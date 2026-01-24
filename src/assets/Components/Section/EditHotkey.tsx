import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TabNumberContext } from "./TasksBar";
import { type EditHotKeyFormData } from "./store";

function EditHotkey() {
    const { currentTab,tabs, setTabs, setComponentVisibility } = useContext(TabNumberContext)!;
    const [errorMsg, setErrorMsg] = useState(false)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            hotKey0: "1",
            hotKey1: "W",
        },
    });

    const onSubmit = (data: EditHotKeyFormData) => {
const newHotKey = `${data.hotKey0.toUpperCase()}+${data.hotKey1.toUpperCase()}`
const allTabsHotKey = tabs.map((e) => e.hotKey)
const hotKeysDuplicateCheck = [newHotKey, ...allTabsHotKey]
const hasDuplicate = hotKeysDuplicateCheck.some((item, index) => hotKeysDuplicateCheck.indexOf(item) !== index);
console.log(newHotKey)
if(!hasDuplicate){
        setTabs((prev) =>
            prev.map((tab, index) =>
                index === currentTab
                    ? { ...tab, hotKey: newHotKey }
                    : tab
            )
        )
        setErrorMsg(false);
        setComponentVisibility((prev) => ({
            ...prev,
            editHotKey: false
        }))
    }else {
        setErrorMsg(true)
        return;
    }
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-cyan-500/30 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="relative border-b border-cyan-500/20 p-6">
                    <h2 className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                        Edit Hotkey
                    </h2>
                    <button
                        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20 text-red-400 transition-all duration-200 hover:scale-110 hover:bg-red-500/30 hover:text-red-300"
                        onClick={() => setComponentVisibility(prev => ({ ...prev, editHotKey: false }))}
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
                    <div className="space-y-2">
                        <label className="block text-center text-sm font-medium text-cyan-300">
                            Hotkey Combination
                        </label>
                        <div className="flex items-center gap-5">
                            <input
                                {...register("hotKey0")}
                                placeholder="1"
                                className="w-10 flex-1 rounded-lg border border-cyan-700/50 bg-slate-900/50 px-4 py-3 text-center font-mono text-cyan-50 placeholder-cyan-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                            />
                            <span className="text-lg font-bold text-cyan-400">+</span>
                            <input
                                {...register("hotKey1")}
                                placeholder="Q"
                                className="w-10 flex-1 rounded-lg border border-cyan-700/50 bg-slate-900/50 px-4 py-3 text-center font-mono text-cyan-50 placeholder-cyan-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                            />
                        </div>
                    </div>

{errorMsg && (
    <p className="text-center text-red-700 text-sm">{errorMsg ? "Duplicate HotKey Detected Please Choose A Different HotKey" : ""}</p>
)}
                    <button type="submit" className=" w-full transform rounded-lg bg-linear-to-r from-cyan-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 active:scale-[0.98]">
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
}

export default EditHotkey;