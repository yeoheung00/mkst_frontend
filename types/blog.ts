export interface Category {
  id: string;
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
  id: string;
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
  id: string;
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
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  _count: {
    likes: number;
  }
}

export interface CreateCommentInput {
  postId: string;
  content: string;
  parentId: string | null;
}

export interface EditCommentInput {
  content: string;
}

export interface Comment {
  id: string;
  status?: "pending" | "confirmed";
  content: string;
  parentId: string | null;
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
