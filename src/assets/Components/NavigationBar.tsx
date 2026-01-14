function NavigationBar() {
  return (
<nav className="w-full h-14 bg-[#2196f3] flex items-center justify-between px-6">
  {/* Logo */}
<div className="min-w-42 h-9 flex items-center gap-2 bg-gradient-to-r from-blue-800 to-cyan-600 rounded-2xl pr-3">
  <div className="w-8 h-9 bg-blue-500 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-lg">✓</span>
  </div>
  <span className="text-md md:text-xl font-extrabold text-slate-100 ">Task Tracker</span>
</div>


</nav>

  );
}

export default NavigationBar;

{/*
    <ul className="flex space-x-6 text-white flex-row items-center justify-center text-sm">
    <li className="bg-white text-[#2196f3] px-4 py-1 rounded-4xl hover:bg-gray-100 border-4 border-blue-500">Customization</li>
    <li className="bg-white text-[#2196f3] px-4 py-1 rounded-2xl hover:bg-gray-100 border-4 border-blue-500">Instruction</li>
  </ul>

  <div className="flex items-center space-x-3">
    <button className="bg-white text-[#2196f3] px-4 py-1 rounded-md hover:bg-gray-100">
      Log In
    </button>
  </div>
  */} 