function Footer() {
    return (
        <footer className="w-full min-h-[4vh] bg-gradient-to-r from-slate-900 to-slate-950 text-cyan-50 flex flex-col md:flex-row items-center justify-center border-t border-cyan-500/30">
            {/* Left: copyright */}
            <span className="text-sm text-cyan-300">&copy;2026 TaskTracker. All rights reserved.</span>

            {/* Right: links */}
            <div className="flex space-x-4 mt-4 md:mt-0 md:ml-6">
                <a href="#" className="hover:text-cyan-400 text-sm text-cyan-300 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 text-sm text-cyan-300 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 text-sm text-cyan-300 transition-colors">Contact</a>
            </div>
        </footer>
    );
}

export default Footer;