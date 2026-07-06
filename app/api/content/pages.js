import { NextResponse } from "next/server";
import { fetchOnePageFromBackend } from "@/lib/backend";

export async function GET() {
  const result = await fetchOnePageFromBackend();

  if (result.error) {
    return NextResponse.json(
      { success: false, message: result.error },
      { status: result.status || 404 }
    );
  }

  return NextResponse.json({
    success: true,
    page: result.page,
  });
}
