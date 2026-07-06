import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/api/lib/auth";
import { validateUserCredentials } from "@/lib/github";

export async function POST(request) {
  const body = await request.json();
  const userName = body.user_name?.trim();
  const password = body.password;

  if (!userName || !password) {
    return NextResponse.json(
      { success: false, message: "User name and password are required" },
      { status: 400 }
    );
  }

  const result = await validateUserCredentials(userName, password);

  if (!result.valid) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status || 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    user: result.user,
  });

  response.cookies.set(SESSION_COOKIE, result.user, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
