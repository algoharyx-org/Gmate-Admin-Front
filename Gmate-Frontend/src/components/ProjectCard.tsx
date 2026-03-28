import { CheckSquare, FolderKanban, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export default function ProjectCard({ project }: { project: {
  _id: string;
  title: string;
  description: string;
  tasks: number;
  completed: number;
  members: number;
  status: string;
}}) {
  return (
    <div
      className="border-border bg-card hover:border-primary/20 shadow-card cursor-pointer rounded-xl border p-5 transition-colors"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
          <FolderKanban className="text-primary h-4 w-4" />
        </div>
        <Badge
          variant="outline"
          className={
            project.status === "completed"
              ? "text-success border-success/20 bg-success/10"
              : "text-primary border-primary/20 bg-primary/10"
          }
        >
          {project.status}
        </Badge>
      </div>
      <h3 className="text-foreground mb-1 font-semibold">{project.title}</h3>
      <p className="text-muted-foreground mb-4 text-xs">{project.description}</p>

      <Progress value={(project.completed / project.tasks) * 100} className="mb-3 h-1.5" />

      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <CheckSquare className="h-3 w-3" />
          {project.completed}/{project.tasks}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {project.members}
        </div>
      </div>
    </div>
  );
}
