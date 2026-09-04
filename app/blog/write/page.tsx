import { getAllCategories } from "@/lib/api/blog"
import PostClient from "@/components/features/blog/PostClient";
import { auth } from "@/auth";

export default async function Write() {
  const session = await auth();
  const allCategories = await getAllCategories();
  if(!allCategories.success) return <div>Get category error</div>
  return (
    <div className="w-full flex flex-col items-center">
      <PostClient categories={allCategories.data} session={ session } />
    </div>
  )
}
