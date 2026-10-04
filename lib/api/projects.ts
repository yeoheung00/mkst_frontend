import { ApiResponse, Project, CreateProjectInput, Post, ProjectSummary, ResCreatePost, Comment, CreateCommentInput, EditCommentInput } from '@/types';


export const getProjects = async (): Promise<ApiResponse<ProjectSummary[]>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectSlug}`);
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Project = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get project." };
  }
}

export const createProject = async (project: CreateProjectInput, token: string): Promise<ApiResponse<ResCreatePost>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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

export const editProject = async (projectId: number, project: CreateProjectInput, token: string): Promise<ApiResponse<ResCreatePost>> => {
  try {
    console.log(projectId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
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

export const deleteProject = async (projectId: number, token: string): Promise<ApiResponse<{goto: string}>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete project." };
  }
};

export const syncProject = async (projectId: number, token: string): Promise<ApiResponse<{goto: string}>> => {
  try {
    console.log("syncProject", `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/sync`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/sync`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to sync project." };
  }
};