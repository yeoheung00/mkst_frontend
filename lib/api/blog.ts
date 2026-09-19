import { ApiResponse, Category, CreatePostInput, Post, PostSummary, ResCreatePost, Comment, CreateCommentInput, EditCommentInput, UploadedImage } from '@/types';

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/categories`, {
      cache: 'no-store',
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/category/${categorySlug}`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts?categorySlug=${categorySlug ? categorySlug : "all"}`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${postSlug}`);
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Post = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get post." };
  }
}

export const createPost = async (post: CreatePostInput, token: string): Promise<ApiResponse<ResCreatePost>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posting`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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

export const editPost = async (postId: string, post: CreatePostInput, token: string): Promise<ApiResponse<ResCreatePost>> => {
  try {
    console.log(postId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posting/${postId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
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

export const deletePost = async (postId: string, token: string): Promise<ApiResponse<{goto: string}>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posting/${postId}`, {
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
    return { success: false, error: "failed to delete post." };
  }
};

export const getComments = async (postId: string): Promise<ApiResponse<Comment[]>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/comments/${postId}`);
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: Comment[] = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to get comments." };
  }
}

export const createComment = async (comment: CreateCommentInput, token: string): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/comment`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: {id: string} = await res.json();
    return { success: true, data: data.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to create comment." };
  }
}

export const editComment = async (originId: string, comment: EditCommentInput, token: string): Promise<ApiResponse<void>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/comment/${originId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
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

export const deleteComment = async (commentId: string, token: string): Promise<ApiResponse<{ deletedIds: string[] }>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) return { success: false, error: `HTTP error! status: ${res.status}` };
    const data: {deletedIds: string[]} = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "failed to delete comment." };
  }
}
