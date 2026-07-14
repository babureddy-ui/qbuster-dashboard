export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://content-server-cloudflare.qbuster.workers.dev";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function resolveUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/**
 * Call the content server directly.
 * Uses `credentials: "include"` so the content-server auth cookie is sent and verified there.
 */
export async function apiClient(path, options = {}) {
  const { method = "GET", body, headers, ...rest } = options;

  const response = await fetch(resolveUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...rest,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || data.error || "Request failed",
      response.status
    );
  }

  return data;
}
