import {
  useState,
  createContext,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';
import MainSection from './MainSection';
import AddNewTab from './AddNewTab';
import EditHotkey from './EditHotkey';
import {
  useComponentVisibility,
  type ComponentVisibilityState,
  type Tab,
  type TabNumberContextValue,
  type TabBarProps,
} from './store';

export const TabNumberContext = createContext<TabNumberContextValue | null>(
  null
);

function TabBar({
  id,
  name,
  isActive,
  tabs,
  setTabs,
  currentTab,
  setCurrentTab,
}: TabBarProps) {
  function deleteItem(
    id: number,
    tabs: Tab[],
    setTabs: Dispatch<SetStateAction<Tab[]>>,
    currentTab: number,
    setCurrentTab: Dispatch<SetStateAction<number>>
  ): void {
    console.log(id);
    console.log(currentTab);
    try {
      const newTabs: Tab[] = tabs
        .filter((tab: Tab) => tab.id !== id)
        .map((tab: Tab, index: number): Tab => ({ ...tab, id: index }));

      if (newTabs.length === 0) {
        throw new Error('Cannot delete the last tab');
      }

      if (currentTab === id && id >= 1) {
        setCurrentTab((e: number) => e - 1);
      }

      if (id <= currentTab) {
        setCurrentTab((prev: number) => Math.max(0, prev - 1));
      }

      setTabs(newTabs);
    } catch (error) {
      console.error('Error deleting tab:', error);
      alert('Cannot delete the last remaining tab!');
      setCurrentTab(0);
      return;
    }
  }

  return (
    <>
      <div className="relative flex flex-row items-center max-w-48 h-8 px-4 rounded-t-xl bg-linear-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-cyan-500/30 shadow-lg transition-colors cursor-pointer">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-4 h-4 rounded-full bg-cyan-500 shrink-0"></div>
          <span className="ml-2 text-sm font-medium text-cyan-50 truncate">
            {id + 1}: {name}
          </span>
        </div>

        <button
          className="flex items-center justify-center ml-2 w-5 h-5 rounded-full hover:bg-red-500/20 shrink-0 transition-all"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            deleteItem(id, tabs, setTabs, currentTab, setCurrentTab);
          }}
        >
          <span className="text-lg text-red-400 hover:text-red-300 leading-none">
            ×
          </span>
        </button>
      </div>

      <div
        className={`w-[110%] h-2 p-1 ml-[-5%] rounded-t-md bg-linear-to-r from-cyan-600 to-blue-600 transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </>
  );
}

function TasksBar() {
  // from store(zustand)
  const componentVisibility: ComponentVisibilityState = useComponentVisibility(
    (state) => state.componentVisibility
  );
  const setComponentVisibility: (
    visibility:
      | ComponentVisibilityState
      | ((prev: ComponentVisibilityState) => ComponentVisibilityState)
  ) => void = useComponentVisibility((state) => state.setComponentVisibility);

  const [currentTab, setCurrentTab] = useState<number>(() => {
    const saveCurrentTab: string | null =
      localStorage.getItem('saveCurrentTab');
    return saveCurrentTab ? (JSON.parse(saveCurrentTab) as number) : 0;
  });

  const [tabCount, setTabCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saveTabs: string | null = localStorage.getItem('tabs');
    return saveTabs
      ? (JSON.parse(saveTabs) as Tab[])
      : [
          {
            id: 0,
            current: 0,
            max: 10,
            name: 'Drink Water',
            hotKey: '2+k',
            dateHistory: ['Sample', 'Sample2'],
            completionCount: 1,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('saveCurrentTab', JSON.stringify(currentTab));
  }, [currentTab]);

  const handleTabClick = (tabId: number) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
  };

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
      <section className="flex items-center justify-between w-full h-[5vh] px-4 md:px-10 md:gap-10 bg-linear-to-r from-slate-900 to-slate-950 border-b border-cyan-500/20">
        {/* Desktop view - show all tabs */}
        <div className="hidden md:flex items-center gap-10 flex-1">
          {tabs.map((e: Tab) => (
            <div
              key={e.id}
              onClick={() => setCurrentTab(e.id)}
              className="pt-2 w-45"
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
        </div>

        {/* Mobile view - show only current tab */}
        <div className="flex md:hidden items-center justify-between px-2">
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentTab((prev) => Math.max(0, prev - 1))}
            disabled={currentTab === 0}
            className="p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous tab"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Current Tab */}
          <div className="pt-2 flex-1 w-45">
            <TabBar
              id={tabs[currentTab]?.id ?? 0}
              name={tabs[currentTab]?.name ?? 'Task'}
              isActive={true}
              tabs={tabs}
              setTabs={setTabs}
              tabCount={tabCount}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentTab((prev) => Math.min(tabs.length - 1, prev + 1))
            }
            disabled={currentTab === tabs.length - 1}
            className="p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next tab"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Hamburger menu button - mobile only */}
        <button
          className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 transition-all order-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span className="w-5 h-0.5 bg-cyan-400 rounded"></span>
            <span className="w-5 h-0.5 bg-cyan-400 rounded"></span>
            <span className="w-5 h-0.5 bg-cyan-400 rounded"></span>
          </div>
        </button>

        {/* Add new tab button */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-cyan-600 to-blue-600
           hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-110 order-1"
          onClick={() =>
            setComponentVisibility({
              ...componentVisibility,
              addNewTab: true,
            })
          }
        >
          +
        </button>
      </section>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[5vh] left-0 w-full bg-slate-900 border-b border-cyan-500/20 shadow-lg z-50 max-h-[60vh] overflow-y-auto">
          {tabs.map((tab: Tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-between px-4 py-3 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors ${
                currentTab === tab.id ? 'bg-slate-800/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-sm font-medium text-cyan-50">
                  {tab.id + 1}: {tab.name}
                </span>
              </div>
              {currentTab === tab.id && (
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="absolute w-screen h-1 bg-linear-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/30"></div>
      <MainSection />
      {componentVisibility.addNewTab && <AddNewTab />}
      {componentVisibility.editHotKey && <EditHotkey />}
    </TabNumberContext.Provider>
  );
}

export default TasksBar;
