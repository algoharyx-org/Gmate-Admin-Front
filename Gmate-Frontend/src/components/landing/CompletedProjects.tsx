import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    id: "1",
    name: "Vision OS Update",
    progress: 100,
    status: "completed",
  },
  {
    id: "2",
    name: "Neural Engine Core",
    progress: 100,
    status: "completed",
  },
];

export default function CompletedProjects() {
  return (
    <div className="bg-card border border-border p-8 rounded-[2rem] shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Success</h3>
        <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest h-8 px-3">View Archive</Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <FolderKanban className="text-emerald-600 dark:text-emerald-400 size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{project.name}</h4>
              <Progress value={100} className="h-1 mt-2" />
            </div>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[8px] font-black uppercase tracking-widest">Done</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
