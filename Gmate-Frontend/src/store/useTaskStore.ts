import { create } from "zustand";
import { tasks as initialTasks } from "@/data/tasks";
import type { Task } from "@/types/project";

// Convert initial tasks to string IDs for consistency
const normalizedTasks = initialTasks.map(t => ({...t, _id: String(t._id)}));

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: normalizedTasks as Task[],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => {
      return { tasks: [...state.tasks, task] };
    }),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        String(task._id) === String(id) ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => String(task._id) !== String(id)),
    })),
}));
