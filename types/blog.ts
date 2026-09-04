export interface Category {
  id: string;
  slug: string;
  name: string;
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
  category: { name: string };
  title: string;
  toc: TocItem[];
  content: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  _count: {
    likes: number;
  }
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
}
