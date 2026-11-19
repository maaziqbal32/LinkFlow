
import type { AuthUser } from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export type BackendURL = {
  _id?: string;
  shortId: string;
  redirectUrl: string;
  status?: "active" | "inactive";
  userId?: string;
  visitHistory?: {
    _id?: string;
    timestamp: number;
  }[];
  createdAt?: string;
};

async function handleResponse<T>(
  response: Response,
): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data as T;
}

// ============================
// AUTHENTICATION
// ============================

export async function registerUser(values: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string; user: AuthUser }> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return handleResponse(response);
}

export async function loginUser(values: {
  email: string;
  password: string;
}): Promise<{ message: string; user: AuthUser }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return handleResponse(response);
}

export async function logoutUser(): Promise<{
  message: string;
}> {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse(response);
}

export async function getCurrentUser(): Promise<{
  user: AuthUser;
}> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function updateProfile(
  name: string,
): Promise<{ message: string; user: AuthUser }> {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return handleResponse(response);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  return handleResponse(response);
}

// ============================
// URL MANAGEMENT
// ============================

export async function getAllURLs(): Promise<BackendURL[]> {
  const response = await fetch(`${API_BASE_URL}/url`, {
    credentials: "include",
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function createShortURL(
  url: string,
): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE_URL}/url`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  return handleResponse(response);
}

export async function deleteShortURL(
  shortId: string,
): Promise<{ message: string }> {
  const response = await fetch(
    `${API_BASE_URL}/url/${encodeURIComponent(shortId)}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  return handleResponse(response);
}

export async function updateShortURLStatus(
  shortId: string,
  status: "active" | "inactive",
): Promise<{
  message: string;
  shortId: string;
  status: string;
}> {
  const response = await fetch(
    `${API_BASE_URL}/url/${encodeURIComponent(shortId)}/status`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  return handleResponse(response);
}
