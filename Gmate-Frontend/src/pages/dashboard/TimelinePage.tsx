import { useTaskStore } from "@/store/useTaskStore";
import { 
  Calendar as CalendarIcon, 
  Search, 
  ArrowRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "important":
      return "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
    case "in-progress":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "upcoming":
      return "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
    case "completed":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

export default function TimelinePage() {
  const tasks = useTaskStore((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    });
  }, [tasks]);

  const filteredTasks = sortedTasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.tag && task.tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedTasks = useMemo(() => {
    const groups: Record<string, typeof tasks> = {};
    filteredTasks.forEach(task => {
      const dateStr = task.dueDate || new Date().toISOString();
      const date = new Date(dateStr);
      const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });
    return groups;
  }, [filteredTasks]);

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return { day: "N/A", month: "" };
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-10 animate-fade-in text-slate-900 dark:text-slate-100 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">Timeline</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">
            Comprehensive roadmap of all workspace activities.
          </p>
        </div>

        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </header>

      <div className="space-y-12">
        {Object.entries(groupedTasks).length > 0 ? Object.entries(groupedTasks).map(([month, tasksInMonth]) => (
          <section key={month} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary whitespace-nowrap">{month}</h2>
              <div className="h-px w-full bg-slate-200 dark:bg-white/5" />
            </div>

            <div className="relative space-y-4 ml-2 pl-8 border-l border-slate-200 dark:border-white/5">
              {tasksInMonth.map((task) => {
                const { day, month: monthStr } = formatDate(task.dueDate);
                return (
                <div key={task._id} className="group relative">
                  <div className={`absolute -left-[37px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background z-10 transition-transform group-hover:scale-125 ${
                    task.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 
                    task.status === 'important' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-indigo-500'
                  }`} />

                  <div className="universal-card p-5 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border/50 shrink-0">
                      <span className="text-[9px] font-black uppercase opacity-50">{monthStr}</span>
                      <span className="text-xl font-black leading-none">{day}</span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`px-2 py-0 text-[8px] font-black tracking-widest uppercase transition-all duration-500 ${getStatusStyles(task.status)}`}>
                          {task.status}
                        </Badge>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-50">{task.tag || "GENERAL"}</span>
                      </div>
                      <h3 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">{task.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 font-medium opacity-70">{task.description}</p>
                    </div>

                    <div className="flex items-center gap-4 sm:border-l border-border/50 sm:pl-6">
                      <div className="flex flex-col items-end sm:items-start">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Assigned To</span>
                        <span className="text-xs font-bold text-foreground">Member</span>
                      </div>
                      <Link 
                        to={`/dashboard/my-tasks`} 
                        className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </section>
        )) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] bg-white/30 dark:bg-white/5">
            <CalendarIcon className="h-16 w-16 text-slate-200 dark:text-slate-800 mb-6" />
            <h3 className="text-xl font-black tracking-tight">Timeline Empty</h3>
            <p className="text-slate-500 max-w-xs mt-2 font-medium">No tasks found for the current timeline filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
