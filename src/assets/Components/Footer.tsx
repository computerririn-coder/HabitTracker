function Footer() {
    return (
        <footer className="w-full h-[4vh] bg-gray-800 text-white  flex flex-col md:flex-row items-center justify-between ">
            {/* Left: copyright */}
            <span className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</span>

            {/* Right: links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-400 text-sm">Privacy</a>
                <a href="#" className="hover:text-gray-400 text-sm">Terms</a>
                <a href="#" className="hover:text-gray-400 text-sm">Contact</a>
            </div>
        </footer>
    );
}

export default Footer;
