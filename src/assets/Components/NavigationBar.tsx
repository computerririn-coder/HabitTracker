function NavigationBar() {
  return (
<nav className="w-full h-[6vh] bg-[#2196f3] flex items-center justify-between px-6">
  {/* Logo */}
  <div className="text-white font-bold text-xl">
    Logo
  </div>

  {/* Navigation Links */}
  <ul className="flex space-x-6 text-white">
    <li className="hover:text-gray-200 cursor-pointer">x</li>
    <li className="hover:text-gray-200 cursor-pointer">x</li>
    <li className="hover:text-gray-200 cursor-pointer">x</li>
  </ul>

  {/* Search / Action */}
  <div className="flex items-center space-x-3">
    <button className="bg-white text-[#2196f3] px-4 py-1 rounded-md hover:bg-gray-100">
      Log In
    </button>
  </div>
</nav>

  );
}

export default NavigationBar;
