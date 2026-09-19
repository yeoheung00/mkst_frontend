import { Session } from "next-auth";

export const getRole = async (session: Session | null): Promise<string | null> => {
  console.log("getrole");
  if (!session || !session.user) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/role`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  console.log("ROLE", res.ok);
  if (!res.ok) return null;
  const data = await res.json();
  return data.role;
}
