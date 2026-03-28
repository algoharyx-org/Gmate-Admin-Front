import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "@/types/project";
import { KanbanTaskCard } from "./KanbanTaskCard";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface Props {
  status: TaskStatus;
  tasks: Task[];
  label: string;
  onTaskClick?: (task: Task) => void;
}

export function KanbanColumn({ status, tasks, label, onTaskClick }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      type: "Column",
      status,
    },
  });

  const taskIds = tasks.map((t) => t._id);

  return (
    <div
      ref={setNodeRef}
      className={`bg-muted/30 border border-border/50 flex w-[300px] shrink-0 flex-col rounded-2xl p-4 transition-colors ${
        isOver ? "bg-muted/50 border-primary/20" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground text-[11px] font-bold uppercase tracking-widest opacity-70">
            {label}
          </h3>
          <Badge
            variant="secondary"
            className="bg-muted/50 text-muted-foreground border-transparent h-5 min-w-[20px] px-1.5 text-[9px] font-bold"
          >
            {tasks.length}
          </Badge>
        </div>
        <button className="text-muted-foreground hover:bg-muted rounded-md p-1 transition-all hover:text-primary">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTaskCard 
              key={task._id} 
              task={task} 
              onClick={() => onTaskClick?.(task)}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="border-border/40 flex flex-1 items-center justify-center rounded-xl border border-dashed py-10 opacity-30">
            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest italic">
              Empty
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
