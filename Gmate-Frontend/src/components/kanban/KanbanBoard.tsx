import { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import type { Task, TaskStatus } from "@/types/project";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanTaskCard } from "./KanbanTaskCard";
import { KanbanColumnSkeleton } from "@/components/ui/Skeleton";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import { useKanbanBoard } from "@/hooks/kanban/useKanbanBoard";

interface Props {
  projectId: string;
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "to-do", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "In Review" },
  { id: "completed", label: "Completed" },
  { id: "important", label: "Important" },
  { id: "upcoming", label: "Upcoming" },
];

export default function KanbanBoard({ projectId }: Props) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => taskService.getTasks(projectId),
  });

  const { activeTask, sensors, onDragStart, onDragEnd } = useKanbanBoard(projectId);

  const tasksByStatus = useMemo(() => {
    return COLUMNS.reduce(
      (acc, col) => {
        acc[col.id] = tasks.filter((t) => t.status === col.id);
        return acc;
      },
      {} as Record<TaskStatus, Task[]>
    );
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full gap-6 overflow-x-auto pb-6">
        <KanbanColumnSkeleton />
        <KanbanColumnSkeleton />
        <KanbanColumnSkeleton />
        <KanbanColumnSkeleton />
        <KanbanColumnSkeleton />
        <KanbanColumnSkeleton />
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex h-full w-full items-start gap-6 overflow-x-auto pb-6">
          <SortableContext
            items={COLUMNS.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                status={col.id}
                label={col.label}
                tasks={tasksByStatus[col.id]}
                onTaskClick={(task) => setEditingTask(task)}
              />
            ))}
          </SortableContext>
        </div>

        {isMounted &&
          createPortal(
            <DragOverlay
              dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: "0.5",
                    },
                  },
                }),
              }}
            >
              {activeTask ? <KanbanTaskCard task={activeTask} /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>

      {editingTask && (
        <EditTaskDialog 
          task={editingTask} 
          open={!!editingTask} 
          onOpenChange={(open) => !open && setEditingTask(null)} 
        />
      )}
    </>
  );
}
