import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Users,
  LogOut,
  CalendarDays,
  Plus,
  Settings,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useState } from "react";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import { useLogout } from "@/hooks/useLogout";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/my-tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/timeline", label: "Timeline", icon: CalendarDays },
  { to: "/dashboard/team", label: "Team", icon: Users },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { logout, isPending } = useLogout();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleQuickTask = () => {
    setIsAddTaskOpen(true);
    if (onClose) onClose();
  };

  return (
    <>
      <aside
        className={`cubic-bezier(0.16, 1, 0.3, 1) fixed inset-y-0 left-0 z-70 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 will-change-transform dark:border-white/10 dark:bg-slate-950 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-1 flex-col overflow-hidden px-4">
          {/* --- Premium Logo Section --- */}
          <div className="flex items-center justify-between px-4 py-8">
            <Link to="/" className="group flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-indigo-500/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-active:scale-95 dark:border-white/10">
                  <img
                    src="/assets/logo-light.png"
                    alt="Gmate"
                    className="h-full w-full object-cover dark:hidden"
                  />
                  <img
                    src="/assets/logo-dark.png"
                    alt="Gmate"
                    className="hidden h-full w-full object-cover dark:block"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-lg leading-none font-black tracking-tighter uppercase">
                  GMATE
                </span>
                <span className="text-[9px] font-black tracking-[0.3em] text-indigo-500 uppercase">
                  Systems
                </span>
              </div>
            </Link>
          </div>

          {/* --- Premium Action Button --- */}
          <div className="px-4 py-6">
            <button
              onClick={handleQuickTask}
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-[1.25rem] bg-indigo-600 text-[10px] font-black tracking-[0.15em] text-white uppercase shadow-2xl shadow-indigo-500/30 transition-all duration-500 hover:scale-[1.02] hover:bg-indigo-500 active:scale-95"
            >
              <Plus
                size={16}
                className="transition-transform duration-500 group-hover:rotate-90"
              />
              Quick Task
            </button>
          </div>

          {/* --- Premium Navigation --- */}
          <nav className="custom-scrollbar flex-1 space-y-2 overflow-y-auto px-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-font group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-500 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 dark:bg-white dark:text-slate-900 dark:shadow-white/5"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-white"
                  }`
                }
              >
                <item.icon
                  size={18}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <span className="flex-1">{item.label}</span>
                <Sparkles
                  size={12}
                  className="opacity-0 transition-opacity group-hover:opacity-40"
                />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* --- Premium Footer Section --- */}
        <div className="border-t border-slate-200 bg-slate-50/50 p-6 dark:border-white/10 dark:bg-white/5">
          <Link
            to="/dashboard/profile"
            className="group mb-6 flex cursor-pointer items-center gap-4 px-2"
          >
            <div className="relative shrink-0">
              <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-slate-200 shadow-2xl transition-transform duration-500 group-hover:scale-110 dark:border-white/10">
                <img
                  src="/assets/team/mohamed_algoahry.jpg"
                  alt="Mohamed Algoahry"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-xs font-black tracking-tight uppercase">
                M. Algoahry
              </p>
              <p className="truncate text-[9px] font-black tracking-widest text-slate-500 uppercase dark:text-slate-500">
                Architect
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 flex-1 items-center justify-center">
              <ThemeToggle />
            </div>
            <button
              onClick={() => logout()}
              disabled={isPending}
              className="flex h-11 flex-2 items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 text-[10px] font-black tracking-widest text-slate-500 uppercase transition-all hover:bg-white hover:text-slate-900 active:scale-95 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <LogOut size={16} />
                  <span>Exit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {isAddTaskOpen && (
        <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />
      )}
    </>
  );
}
