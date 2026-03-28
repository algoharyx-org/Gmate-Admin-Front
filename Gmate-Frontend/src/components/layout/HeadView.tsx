import { useLocation, Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Bell, ChevronRight, Zap } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function HeadView() {
  const { pathname } = useLocation();
  const { unreadCount } = useNotifications();
  
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || "Dashboard";
  const formattedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace(/-/g, " ");

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 px-6 md:px-10">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- Clickable Gmate Logo --- */}
        <Link to="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <div className="relative">
            <div className="absolute -inset-1 bg-indigo-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg transition-transform group-hover:scale-105 duration-500">
              <img 
                src="/assets/logo-light.png" 
                alt="Gmate" 
                className="h-full w-full object-cover dark:hidden"
              />
              <img 
                src="/assets/logo-dark.png" 
                alt="Gmate" 
                className="h-full w-full object-cover hidden dark:block"
              />
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-foreground text-sm font-black tracking-tighter uppercase leading-none">GMATE</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-500">Workspace</span>
          </div>
        </Link>

        {/* --- Premium Breadcrumb --- */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 group hover:border-primary/30 transition-all duration-500 cursor-default shadow-inner">
            <Zap size={14} className="text-primary animate-pulse" />
            <span className="text-slate-400 dark:text-slate-500 nav-font opacity-70">
              Navigation
            </span>
            <ChevronRight size={12} className="text-slate-300 dark:text-slate-700" />
            <h2 className="text-slate-900 dark:text-white nav-font leading-none">
              {formattedPageName}
            </h2>
          </div>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/notifications" 
            className="relative h-11 w-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary dark:hover:text-white transition-all shadow-sm hover:shadow-xl group"
            aria-label="Notifications"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform duration-500" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-indigo-600 rounded-full border-[3px] border-white dark:border-slate-950 animate-pulse" />
            )}
          </Link>
          
          <ThemeToggle />
          
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10 ml-2">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Pro Status</span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Verified</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap size={16} className="text-emerald-500 fill-emerald-500/20" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
