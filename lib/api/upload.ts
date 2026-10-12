import { ApiResponse, UploadedImage } from "@/types";
import { fetchClient } from "./client";

export const uploadImageFile = async (file: File): Promise<ApiResponse<UploadedImage>> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetchClient(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/image`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return { success: false, error: "Failed to upload file" };
  const data = await res.json();
  return { success: true, data };
}
