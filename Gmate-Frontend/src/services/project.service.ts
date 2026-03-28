import api, { handleApiError } from "../api/axios";
import type { Project, ProjectFormData } from "../types/project";

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const projectService = {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await api.get<ApiResponse<Project[] | { projects: Project[] }>>("/projects");
      const data = response.data.data;
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object" && "projects" in data && Array.isArray(data.projects)) {
        return data.projects;
      }
      return [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getMyProjects(): Promise<Project[]> {
    try {
      const response = await api.get<ApiResponse<Project[] | { projects: Project[] }>>("/projects/me");
      const data = response.data.data;
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object" && "projects" in data && Array.isArray(data.projects)) {
        return data.projects;
      }
      return [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    try {
      const response = await api.post<ApiResponse<Project>>("/projects", data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    try {
      const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await api.delete(`/projects/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async addMember(projectId: string, memberId: string, role: string): Promise<Project> {
    try {
      const response = await api.post<ApiResponse<Project>>(`/projects/${projectId}/members`, {
        userId: memberId,
        role,
      });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async removeMember(projectId: string, memberId: string): Promise<Project> {
    try {
      const response = await api.delete<ApiResponse<Project>>(`/projects/${projectId}/members/${memberId}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
