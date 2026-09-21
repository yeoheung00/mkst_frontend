export interface Category {
  id: number;
  slug: string;
  name: string;
}

export interface UploadedImage {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PostImage {
  url: string;
  width: number;
  height: number;
  displayOrder: number;
}

export interface PostSummary {
  id: number;
  slug: string;
  category: Category;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  images: PostImage[];
  _count: {
    likes: number;
    comments: number;
  }
}

export interface Like {
  userId: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface CreatePostInput {
  title: string;
  summary: string;
  content: Record<string, unknown>;
  categoryName: string;
  images: PostImage[];
}

export interface ResCreatePost {
  slug: string;
  category: {
    slug: string;
  }
}

export interface Post {
  id: number;
  author: {
    id: string;
    name: string;
    image: string;
  }
  category: { name: string };
  title: string;
  toc: TocItem[];
  content: Record<string, unknown>;
  images: UploadedImage[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface CreateCommentInput {
  postId: number;
  content: string;
  parentId: number | null;
}

export interface EditCommentInput {
  content: string;
}

export interface Comment {
  id: number;
  status?: "pending" | "confirmed";
  content: string;
  parentId: number | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}
