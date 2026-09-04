import { ApiResponse, Category, CreatePostInput, Post, PostSummary, ResCreatePost } from '@/types';

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/categories`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/category/${categorySlug}`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts${categorySlug && `?categorySlug=${categorySlug}`}`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/post/${postSlug}`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/posting`, {
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
