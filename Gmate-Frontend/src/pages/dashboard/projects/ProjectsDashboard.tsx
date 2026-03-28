import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Filter, LayoutGrid, List, BarChart2, CheckCircle2, Clock, Users } from "lucide-react";
import { projectService } from "@/services/project.service";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectDialog } from "@/components/projects/ProjectDialogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ErrorFallback } from "@/components/shared/ErrorFallback";
import { ApiError } from "@/api/axios";

const ProjectsDashboard: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { 
    data: projects, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    retry: 1,
  });

  const isNetworkError = error instanceof ApiError && error.isNetworkError;
  const projectList = Array.isArray(projects) ? projects : [];

  const projectStats = [
    { label: "Total Projects", value: projectList.length, icon: <BarChart2 size={16} />, color: "text-indigo-500" },
    { label: "Active", value: projectList.filter(p => p.status === 'active').length, icon: <Clock size={16} />, color: "text-emerald-500" },
    { label: "Completed", value: projectList.filter(p => p.status === 'completed').length, icon: <CheckCircle2 size={16} />, color: "text-slate-400" },
    { label: "Team Members", value: "12", icon: <Users size={16} />, color: "text-cyan-500" },
  ];

  return (
    <div className="flex flex-col gap-10 p-6 lg:p-10 animate-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Header with Stats */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight leading-none">Projects</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Coordinate your workspace and manage high-level goals.</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            className="h-12 px-8 bg-primary hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all active:scale-95 gap-2"
          >
            <Plus size={18} /> New Project
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projectStats.map((stat, i) => (
            <div key={i} className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 transition-all hover:bg-white dark:hover:bg-slate-900/60 group">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
              </div>
              <span className="text-2xl font-black tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-white/5 pb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            placeholder="Filter projects by name or owner..."
            className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-full border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest px-5 h-10 group">
            <Filter size={14} className="mr-2 group-hover:rotate-12 transition-transform" /> Filter
          </Button>
          
          <div className="bg-slate-100 dark:bg-white/5 rounded-full p-1 flex items-center">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
            />
          ))}
        </div>
      ) : error ? (
        <ErrorFallback 
          isNetworkError={isNetworkError}
          onRetry={() => refetch()}
        />
      ) : projectList.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
          {projectList.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] bg-white/30 dark:bg-white/5">
          <Badge className="bg-indigo-500/10 text-indigo-500 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">Workspace Empty</Badge>
          <h2 className="text-2xl font-black tracking-tight">No projects found.</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mt-2 mb-8">Ready to start something new? Create your first project to begin tracking.</p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="rounded-2xl h-12 px-10 bg-primary hover:bg-indigo-500 font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20"
          >
            Create First Project
          </Button>
        </div>
      )}

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default ProjectsDashboard;
