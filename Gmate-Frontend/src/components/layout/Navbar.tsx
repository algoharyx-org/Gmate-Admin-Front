import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useDarkMode } from "@/context/ThemeContext";

export default function Navbar() {
  const { isDarkMode } = useDarkMode();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden border border-white/20 shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-indigo-500/30">
            <img 
              src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"} 
              alt="GMATE Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-slate-900 dark:text-white font-black tracking-tighter text-lg uppercase transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">GMATE</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({isActive}) => `text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({isActive}) => `text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => `text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            Contact
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1" />
          <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest px-2 transition-colors">
            Login
          </Link>
          <Link to="/register" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all active:scale-95 shadow-lg">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
