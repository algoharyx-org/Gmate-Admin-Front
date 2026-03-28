import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import HeadView from "@/components/layout/HeadView";
import AIAssistant from "@/components/ui/AIAssistant";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="bg-white dark:bg-slate-950 flex h-screen w-full overflow-hidden">
      {/* Premium Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[65] bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-mesh">
        
        {/* --- Premium Glassmorphism Toggle (Global) --- */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed bottom-8 left-8 z-[100] group transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform ${sidebarOpen ? "translate-x-72" : "translate-x-0"}`}
          aria-label="Toggle Navigation"
        >
          <div className="relative">
            {/* Dynamic Glow */}
            <div className={`absolute -inset-4 rounded-full blur-2xl opacity-40 transition-all duration-700 ${sidebarOpen ? "bg-rose-500/20" : "bg-indigo-500/20"}`} />
            
            {/* Main Glass Pill */}
            <div className="relative h-16 w-16 bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-110 active:scale-95 group-hover:rotate-12">
              {sidebarOpen ? (
                <X size={24} className="text-white dark:text-slate-100 animate-in spin-in-90 duration-300" />
              ) : (
                <Menu size={24} className="text-white dark:text-slate-100 animate-in zoom-in duration-300" />
              )}
              
              {/* Status Dot */}
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-[3px] border-slate-950 shadow-sm transition-colors duration-500 ${sidebarOpen ? "bg-rose-500" : "bg-indigo-500 animate-bounce"}`} />
            </div>
          </div>
        </button>

        <HeadView />

        <div className="w-full flex-1 overflow-x-hidden overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>

        {/* Global AI Assistant Button */}
        <AIAssistant />
      </main>
    </div>
  );
}
