import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export async function requirePageAuth() {
  const cookieStore = await cookies();

  const token = cookieStore.get("linkflow_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: `linkflow_token=${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    redirect("/login");
  }

  if (!response.ok) {
    throw new Error("Unable to verify authentication session.");
  }

  return response.json();
}