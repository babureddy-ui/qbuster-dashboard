import { JSON_HEADERS } from "@/lib/jsonHeaders";

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

function resolveUrl(path, { local = false } = {}) {
  if (local || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/** Shared fetch helper. Use `{ local: true }` for Next.js BFF routes. */
export async function apiClient(path, options = {}) {
  const { method = "GET", body, headers, local = false, ...rest } = options;

  const response = await fetch(resolveUrl(path, { local }), {
    method,
    headers: {
      ...JSON_HEADERS,
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
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
