import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, MoreHorizontal, Settings, Calendar, Info } from "lucide-react";
import { projectService } from "@/services/project.service";
import { taskService } from "@/services/task.service";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProjectDialog } from "@/components/projects/ProjectDialogs";

const statusColors: Record<string, string> = {
  planning: "bg-blue-500/10 text-blue-500",
  active: "bg-green-500/10 text-green-500",
  completed: "bg-slate-500/10 text-slate-500",
  "on-hold": "bg-amber-500/10 text-amber-500",
};

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectService.getProjectById(projectId!),
    enabled: !!projectId,
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => taskService.getTasks(projectId),
    enabled: !!projectId,
  });

  if (isProjectLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been deleted.</p>
        <Button onClick={() => navigate("/dashboard/projects")} className="mt-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
              <Badge variant="secondary" className={statusColors[project.status] || statusColors.active}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </div>
            <p className="mt-1 text-muted-foreground">{project.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>{tasks?.length || 0} Total Tasks</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4" /> Edit Details
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Project Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Task Board</h2>
        </div>
        {isTasksLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[500px] animate-pulse rounded-xl bg-accent/30"
              />
            ))}
          </div>
        ) : (
          <KanbanBoard projectId={projectId!} />
        )}
      </div>

      <EditProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={project}
      />
    </div>
  );
};

export default ProjectDetailsPage;
