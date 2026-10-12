import { ApiResponse, Project, CreateProjectInput, ProjectSummary, ResCreatePost } from '@/types';
import { fetchClient } from './client';


export const getProjects = async (): Promise<ApiResponse<ProjectSummary[]>> => {
  try {
    const res = await fetchClient(`/api/projects`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: ProjectSummary[] = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get projects." };
  }
};

export const getProject = async (projectSlug: string): Promise<ApiResponse<Project>> => {
  try {
    const res = await fetchClient(`/api/projects/${projectSlug}`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Project = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get project." };
  }
}

export const createProject = async (project: CreateProjectInput): Promise<ApiResponse<ResCreatePost>> => {
  try {
    const res = await fetchClient(`/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: ResCreatePost = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to create project." };
  }
};

export const editProject = async (projectId: number, project: CreateProjectInput): Promise<ApiResponse<ResCreatePost>> => {
  try {
    console.log(projectId);
    const res = await fetchClient(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: ResCreatePost = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to update project." };
  }
};

export const deleteProject = async (projectId: number): Promise<ApiResponse<{goto: string}>> => {
  try {
    const res = await fetchClient(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete project." };
  }
};

export const syncProject = async (projectId: number): Promise<ApiResponse<{goto: string}>> => {
  try {
    const res = await fetchClient(`/api/projects/${projectId}/sync`, {
      method: "PATCH",
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to sync project." };
  }
};
