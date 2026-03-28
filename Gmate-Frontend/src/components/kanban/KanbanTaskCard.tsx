import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, LayoutDashboard } from "lucide-react";
import type { Task } from "@/types/project";
import { Badge } from "@/components/ui/badge";

interface Props {
  task: Task;
  onClick?: () => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "important":
      return "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
    case "inProgress":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "upcoming":
      return "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
    case "completed":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

function KanbanTaskCardComponent({ task, onClick }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-muted border border-dashed border-muted-foreground/30 h-[140px] w-full rounded-xl"
      />
    );
  }

  const assigneeName = typeof task.assignee === 'object' ? task.assignee.name : (task.assignee || 'Unassigned');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="universal-card flex flex-col gap-3 group"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all duration-500 ${getStatusStyles(task.priority)}`}
        >
          {task.priority}
        </Badge>
        <LayoutDashboard size={14} className="text-muted-foreground opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all" />
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-normal font-medium opacity-70">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-1">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full border border-border bg-muted overflow-hidden">
            <img src={typeof task.assignee === 'object' && task.assignee.avatar ? task.assignee.avatar : "/assets/avatar.jpg"} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            {assigneeName.split(' ')[0]}
          </span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
            <Calendar size={12} className="opacity-50" />
            <span>{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export const KanbanTaskCard = memo(KanbanTaskCardComponent);
