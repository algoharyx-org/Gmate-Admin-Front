import { ArrowRight, FolderKanban } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

const completedProjects = [
  {
    id: "1",
    name: "Design System",
    desc: "Component library and tokens",
    tasks: 20,
    completed: 20,
    status: "completed",
  },
  {
    id: "2",
    name: "API Integration",
    desc: "Connect progress tracking endpoints with the frontend",
    tasks: 14,
    completed: 14,
    status: "completed",
  },
  {
    id: "3",
    name: "Auth Module",
    desc: "Login, register and password reset flows",
    tasks: 8,
    completed: 8,
    status: "completed",
  },
];

export default function CompletedProjects() {
  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FolderKanban className="text-muted-foreground size-4" />
          <h2 className="text-foreground font-semibold">Completed projects</h2>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/dashboard/projects"
            className="inline-flex items-center gap-1.5"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {completedProjects.map((project) => {
          const progress = Math.round(
            (project.completed / project.tasks) * 100,
          );
          return (
            <Link
              key={project.id}
              to="/dashboard/projects"
              className="border-border bg-background/50 hover:border-primary/20 flex flex-col rounded-xl border p-4 transition-colors"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-foreground truncate text-sm font-semibold">
                  {project.name}
                </h3>
                <Badge
                  variant="outline"
                  className="text-success border-success/20 bg-success/10 shrink-0"
                >
                  Completed
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
                {project.desc}
              </p>
              <Progress value={progress} className="h-1.5" />
              <p className="text-muted-foreground mt-2 text-xs">
                {project.completed}/{project.tasks} tasks
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
