import api, { handleApiError } from "../api/axios";
import type { Task } from "../types/project";

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const taskService = {
  async getTasks(projectId?: string): Promise<Task[]> {
    try {
      const response = await api.get<ApiResponse<Task[] | { tasks: Task[] }>>("/tasks", {
        params: projectId ? { project: projectId } : {},
      });
      const data = response.data.data;
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object" && "tasks" in data && Array.isArray(data.tasks)) {
        return data.tasks;
      }
      return [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getMyTasks(): Promise<Task[]> {
    try {
      const response = await api.get<ApiResponse<Task[] | { tasks: Task[] }>>("/tasks/me");
      const data = response.data.data;
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object" && "tasks" in data && Array.isArray(data.tasks)) {
        return data.tasks;
      }
      return [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.post<ApiResponse<Task>>("/tasks", data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async assignTask(id: string, assigneeId: string): Promise<Task> {
    try {
      const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}/assign`, {
        assignee: assigneeId,
      });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
