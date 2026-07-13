import { NextResponse } from "next/server";
import { apiRoutes } from "../routes";

/**
 * Catch-all for /api/*.
 * Next.js only needs the HTTP methods you export — login uses POST.
 */
export async function POST(request, context) {
  const { path } = await context.params;
  const routeKey = path?.join("/");
  const handler = apiRoutes[routeKey];

  if (!routeKey || typeof handler !== "function") {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  }

  return handler(request, context);
}
