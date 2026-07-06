import { JSON_HEADERS } from "@/lib/jsonHeaders";

export const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchOnePageFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pages`, {
      headers: JSON_HEADERS,
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        error: data.error || data.message || "Failed to load pages",
        status: response.status,
      };
    }

    const pages = data.data || data.pages;

    if (!Array.isArray(pages) || pages.length === 0) {
      return { error: "No pages found", status: 404 };
    }

    return { page: pages[0] };
  } catch {
    return {
      error: "Unable to reach content server. Is the backend running on port 8080?",
      status: 503,
    };
  }
}
