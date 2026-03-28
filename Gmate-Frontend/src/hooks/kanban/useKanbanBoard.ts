import { useState, useCallback } from "react";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskService } from "@/services/task.service";
import type { Task, TaskStatus } from "@/types/project";

export function useKanbanBoard(projectId: string) {
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      taskService.updateTask(taskId, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      toast.success(`Task moved to ${variables.status.toUpperCase()}`);
    },
    onError: () => {
      toast.error("Failed to update task status");
    },
  });

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskData = active.data.current?.task as Task;
    const overData = over.data.current;

    let newStatus: TaskStatus | undefined;

    if (overData?.type === "Column") {
      newStatus = overData.status as TaskStatus;
    } else if (overData?.type === "Task") {
      newStatus = overData.task.status as TaskStatus;
    }

    if (newStatus && activeTaskData.status !== newStatus) {
      updateStatusMutation.mutate({
        taskId: activeTaskData._id,
        status: newStatus,
      });
    }

    setActiveTask(null);
  }, [updateStatusMutation]);

  return {
    activeTask,
    sensors,
    onDragStart,
    onDragEnd,
    isUpdating: updateStatusMutation.isPending,
  };
}
