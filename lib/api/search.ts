import { ApiResponse, SearchResult } from "@/types";

export const search = async (searchTerm: string): Promise<ApiResponse<SearchResult[]>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/search/${encodeURIComponent(searchTerm)}`;
  console.log("search url", url);
  const res = await fetch(url);
  if(!res.ok) {
    return { success: false, error: "Failed to search" };
  }
  const data = await res.json();
  return { success: true, data };
}
