import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "@/types/project";
import TaskCard from "./shared/TaskCard";
import { useTaskStore } from "@/store/useTaskStore";
import { createPortal } from "react-dom";

interface KanbanBoardProps {
  initialTasks: Task[];
}

const COLUMNS: { label: string; status: TaskStatus }[] = [
  { label: "To Do", status: "upcoming" },
  { label: "In Progress", status: "in-progress" },
  { label: "Important", status: "important" },
  { label: "Completed", status: "completed" },
];

function KanbanColumn({ label, status, tasks }: { label: string; status: TaskStatus; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      type: "Column",
      status,
    },
  });

  return (
    <div className="flex flex-col gap-4 min-w-[300px] flex-1">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground opacity-60">
          {label}
        </h3>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-black text-accent-foreground border border-border/50">
          {tasks.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={`flex flex-col gap-3 rounded-[2rem] bg-accent/20 p-2 min-h-[500px] transition-colors border border-transparent ${
          isOver ? "bg-accent/40 border-primary/20" : ""
        }`}
      >
        <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 py-10 italic">
            Empty
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveTask(event.active.data.current?.task || null);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskData = active.data.current?.task as Task;
    if (!activeTaskData) return;

    const overData = over.data.current;
    let newStatus: TaskStatus | undefined;

    if (overData?.type === "Column") {
      newStatus = overData.status as TaskStatus;
    } else if (overData?.type === "Task") {
      newStatus = overData.task.status as TaskStatus;
    }

    if (newStatus && activeTaskData.status !== newStatus) {
      updateTask(String(activeTaskData._id), { status: newStatus });
    }

    setActiveTask(null);
  }, [updateTask]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-8 items-start">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            label={column.label}
            status={column.status}
            tasks={initialTasks.filter((t) => t.status === column.status)}
          />
        ))}
      </div>

      {typeof document !== "undefined" && createPortal(
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 scale-105 opacity-80 pointer-events-none">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
