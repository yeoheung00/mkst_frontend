import { ApiResponse, UploadedImage } from "@/types";

export const uploadImageFile = async (file: File, token: string): Promise<ApiResponse<UploadedImage>> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) return { success: false, error: "Failed to upload file" };
  const data = await res.json();
  return { success: true, data };
}
