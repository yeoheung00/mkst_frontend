import { fetchClient } from './client';
import { ApiResponse, Category, CreatePostInput, Post, PostSummary, ResCreatePost, Comment, CreateCommentInput, EditCommentInput } from '@/types';

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const res = await fetchClient(`/api/blog/categories`, {
      cache: 'no-store',
      skipAuth: true,
    });
    if (!res.ok)return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Category[] = await res.json();
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get all categories." };
  }
};

export const getCategoryBySlug = async (categorySlug: string): Promise<ApiResponse<Category>> => {
  try {
    const res = await fetchClient(`/api/blog/category/${categorySlug}`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Category = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get category by slug." };
  }
};

export const getPosts = async (categorySlug?: string): Promise<ApiResponse<PostSummary[]>> => {
  try {
    const res = await fetchClient(`/api/blog/posts?categorySlug=${categorySlug ? categorySlug : "all"}`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: PostSummary[] = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get posts from category." };
  }
};

export const getPost = async (postSlug: string): Promise<ApiResponse<Post>> => {
  try {
    const res = await fetchClient(`/api/blog/post/${postSlug}`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Post = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get post." };
  }
}

export const createPost = async (post: CreatePostInput): Promise<ApiResponse<ResCreatePost>> => {
  try {
    const res = await fetchClient(`/api/blog/posting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: ResCreatePost = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to create post." };
  }
};

export const editPost = async (postId: number, post: CreatePostInput): Promise<ApiResponse<ResCreatePost>> => {
  try {
    console.log(postId);
    const res = await fetchClient(`/api/blog/posting/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: ResCreatePost = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to update post." };
  }
};

export const deletePost = async (postId: number): Promise<ApiResponse<{goto: string}>> => {
  try {
    const res = await fetchClient(`/api/blog/posting/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete post." };
  }
};

export const getComments = async (postId: number): Promise<ApiResponse<Comment[]>> => {
  try {
    const res = await fetchClient(`/api/blog/comments/${postId}`, {skipAuth: true});
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Comment[] = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get comments." };
  }
}

export const createComment = async (comment: CreateCommentInput): Promise<ApiResponse> => {
  try {
    const res = await fetchClient(`/api/blog/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: {id: number} = await res.json();
    return { success: true, data: data.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to create comment." };
  }
}

export const editComment = async (originId: number, comment: EditCommentInput): Promise<ApiResponse<void>> => {
  try {
    const res = await fetchClient(`/api/blog/comment/${originId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to update comment." };
  }
}

export const deleteComment = async (commentId: number): Promise<ApiResponse<{ deletedIds: number[] }>> => {
  try {
    const res = await fetchClient(`/api/blog/comment/${commentId}`, {
      method: "DELETE",
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: {deletedIds: number[]} = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete comment." };
  }
}

export const toggleLike = async (postId: number): Promise<ApiResponse<void>> => {
  try {
    const res = await fetchClient(`/api/blog/post/${postId}/like`, {
      method: "POST",
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to toggle like." };
  }
}
