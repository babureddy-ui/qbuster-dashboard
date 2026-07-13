import { useMutation } from "@tanstack/react-query";
import { NextResponse } from "next/server";
import { apiClient, API_BASE_URL } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { handleApiError } from "@/api/utils/errors";
import { SESSION_COOKIE } from "@/api/utils/session";
import { JSON_HEADERS } from "@/lib/jsonHeaders";

export const authApi = {
  login: (data) =>
    apiClient(ENDPOINTS.login, {
      method: "POST",
      local: true,
      body: data,
    }),
};

/** Server handler — POST /api/login */
export async function login(request) {
  const { username: rawUser, user_name, password } = await request.json();
  const username = (rawUser || user_name || "").trim();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required" },
      { status: 400 }
    );
  }

  let upstream;
  try {
    upstream = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reach content server" },
      { status: 503 }
    );
  }

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok || data.success === false) {
    return NextResponse.json(
      { success: false, message: data.message || "Login failed" },
      { status: upstream.status || 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: data.message || "Login successful",
    user: { username },
  });

  response.cookies.set(SESSION_COOKIE, username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export function useLogin(options = {}) {
  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onError: (error) => handleApiError(error, "Login failed"),
    ...options,
  });
}
