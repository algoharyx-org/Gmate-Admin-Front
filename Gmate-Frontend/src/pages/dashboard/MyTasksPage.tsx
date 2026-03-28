import { useState } from "react";
import { Search, Plus, LayoutDashboard, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/shared/TaskCard";
import Empty from "@/components/shared/Empty";
import { useTaskStore } from "@/store/useTaskStore";
import type { TaskStatus } from "@/data/tasks";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import KanbanBoard from "@/components/KanbanBoard";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import { ErrorFallback } from "@/components/shared/ErrorFallback";
import { ApiError } from "@/api/axios";

const statusFilterOptions: { value: TaskStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "important", label: "Important" },
  { value: "in-progress", label: "In Progress" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

const neonStyles: Record<string, string> = {
  all: "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5",
  important: "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)] dark:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  inProgress: "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  upcoming: "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
  completed: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
};

export default function MyTasksPage() {
  const { tasks: storeTasks, setTasks } = useTaskStore();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  const { 
    data: apiTasks, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: async () => {
      const tasks = await taskService.getMyTasks();
      setTasks(tasks);
      return tasks;
    },
    retry: 1,
  });

  const taskList = Array.isArray(apiTasks) ? apiTasks : storeTasks;
  const isNetworkError = error instanceof ApiError && error.isNetworkError;

  const filtered = taskList.filter((task) => {
    const matchStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchSearch =
      !searchQuery.trim() ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.tag && task.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const isEmpty = taskList.length === 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && storeTasks.length === 0) {
    return <ErrorFallback 
      isNetworkError={isNetworkError}
      onRetry={() => refetch()}
    />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">My Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {taskList.length} tasks assigned to you.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="bg-slate-100 dark:bg-white/5 rounded-full p-1 flex items-center">
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode("board")}
              className={`p-2 rounded-full transition-all ${viewMode === "board" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <LayoutDashboard size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        {/* Neon Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilterOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  isActive 
                    ? neonStyles[opt.value] 
                    : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {isEmpty ? (
          <Empty onAdd={() => setIsAdding(true)} />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] bg-white/30 dark:bg-white/5">
            <p className="text-slate-400 font-medium mb-6">No tasks match your filter.</p>
            <Button
              variant="outline"
              className="rounded-full px-8 h-10"
              onClick={() => {
                setStatusFilter("all");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}

            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="group flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-8 transition-all hover:bg-slate-50 dark:hover:bg-white/5 hover:border-primary/40 active:scale-95"
            >
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <h2 className="text-foreground text-sm font-bold">New Task</h2>
              <p className="text-slate-500 text-[11px] font-medium text-center mt-1">Add something to your list</p>
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <KanbanBoard initialTasks={filtered} />
          </div>
        )}

        {isAdding && <AddTaskDialog onClose={() => setIsAdding(false)} />}
      </section>
    </div>
  );
}
