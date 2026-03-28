"use client"

import { useDarkMode } from "@/app/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center justify-center rounded-2xl w-10 h-10 text-slate-500 dark:text-slate-400 transition-all duration-500 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 shadow-sm active:scale-95 group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          size={20} 
          className={`absolute transition-all duration-700 ease-out ${
            !isDarkMode 
              ? "rotate-0 scale-100 opacity-100 text-indigo-600 dark:text-indigo-400" 
              : "-rotate-90 scale-0 opacity-0"
          }`} 
        />
        <Moon 
          size={20} 
          className={`absolute transition-all duration-700 ease-out ${
            isDarkMode 
              ? "rotate-0 scale-100 opacity-100 text-indigo-400" 
              : "rotate-90 scale-0 opacity-0"
          }`} 
        />
      </div>
      
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
        !isDarkMode ? "bg-indigo-600" : "bg-indigo-500"
      }`} />
    </button>
  );
}