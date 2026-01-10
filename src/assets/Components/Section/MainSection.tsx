import { useContext } from "react";
import { TabNumberContext } from "./TasksBar.tsx";

function ProgressTracker({ title, current, total }) {
    const percentage = Math.min(Math.round((current / total) * 100), 100);
    
    return (
        <div className="w-full">
            <div className="flex ">
                {/* Right side - Progress bar */}
                <div className="w-[15%] h-[80vh] bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden relative ml-auto mr-10">
                    {/* Progress pill at top */}
                    <div className="w-[40%] h-[10%] bg-gray-800 rounded-full px-8 py-6 border-2 border-gray-700 mx-auto flex flex-row justify-center items-center mt-5 relative z-10">
                        <div className="text-center">
                            <span className="font-bold text-white">{current}</span>
                            <span className="text-gray-400 mx-2">/</span>
                            <span className="font-bold text-gray-400">{total}</span>
                        </div>
                    </div>

                    {/* Water fill - starts from bottom */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 transition-all duration-500 ease-out"
                        style={{ height: `${percentage}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
                    </div>
                    
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MainSection() {
    const { currentTab, setCurrentTab, tabs } = useContext(TabNumberContext);
    
    return (
        <section className="w-full h-[90vh] py-16 bg-gray-900">
{tabs.map((e) =>
  currentTab === e.id ? (
    <ProgressTracker
      key={e.id}
      title="Water"
      current={e.id}
      total={1}
    />
  ) : null
)}

        </section>
    );
}

export default MainSection;