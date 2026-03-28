import { useState, memo } from "react";
import { CalendarDays, MoreHorizontal } from "lucide-react";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/project";

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
    case "review":
      return "border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
    case "to-do":
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

type TaskCardProps = {
  task: Task; 
};

function TaskCardComponent({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <article
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setIsEditOpen(true)}
        className="universal-card group flex flex-col gap-4 hover:shadow-xl cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2 flex-1">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-black tracking-widest uppercase transition-all duration-500 ${getStatusStyles(
                task.status,
              )}`}
            >
              {task.tag || task.status}
            </span>
            <h2 className="text-foreground line-clamp-2 text-base font-bold leading-tight group-hover:text-primary transition-colors">
              {task.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 text-[13px] font-medium leading-relaxed opacity-70">
              {task.description}
            </p>
          </div>
          <div className="bg-muted/50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal size={14} className="text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
          <p className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
            <CalendarDays className="opacity-50 h-3.5 w-3.5" />
            <span>{task.dueDate || task.createdAt}</span>
          </p>
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
            Edit
          </span>
        </div>
      </article>

      {isEditOpen && (
        <EditTaskDialog
          task={task}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}
    </>
  );
}

export default memo(TaskCardComponent);
