const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export type BackendURL = {
    _id?: string;
    shortId: string;
    redirectUrl: string;
    visitHistory?: {
        timestamps: number;
    }[];
    createdAt?: string;
};


async function handleResponse<T>(response:Response): Promise<T> {
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "something went wrong");
    }
    return data as T;
}

// Fetch all URLs
export async function getAllURLs(): Promise<BackendURL[]> {
  const response = await fetch(`${API_BASE_URL}/url`, {
    cache: "no-store",
  });

  return handleResponse<BackendURL[]>(response);
}

// Create a short URL
export async function createShortURL(
  url: string,
): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE_URL}/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  return handleResponse<{ id: string }>(response);
}

// Delete a short URL
export async function deleteShortURL(
  shortId: string,
): Promise<{ message: string }> {
  const response = await fetch(
    `${API_BASE_URL}/url/${encodeURIComponent(shortId)}`,
    { method: "DELETE" },
  );

  return handleResponse<{ message: string }>(response);
}
