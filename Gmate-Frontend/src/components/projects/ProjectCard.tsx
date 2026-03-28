import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Project } from "@/types/project";
import { projectService } from "@/services/project.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProjectDialog } from "./ProjectDialogs";

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  planning: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  active: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  completed: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
  "on-hold": "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => projectService.deleteProject(project._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <div
        onClick={() => navigate(`/dashboard/projects/${project._id}`)}
        className="group relative flex flex-col justify-between rounded-xl border border-muted-foreground/10 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer"
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <Badge variant="secondary" className={statusColors[project.status] || statusColors.active}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setIsEditDialogOpen(true); }}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <EditProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={project}
      />
    </>
  );
};
