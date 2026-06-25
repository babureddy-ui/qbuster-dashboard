import { NextResponse } from "next/server";
import { isValidCredentials, SESSION_COOKIE } from "@/api/lib/auth";

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

  if (!isValidCredentials(userName, password)) {
    return NextResponse.json(
      { success: false, message: "Invalid user name or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    user: userName,
  });

  response.cookies.set(SESSION_COOKIE, userName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
