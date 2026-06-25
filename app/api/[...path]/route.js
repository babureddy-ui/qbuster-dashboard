import { NextResponse } from "next/server";
import { apiRoutes } from "../routes";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

async function dispatch(request, context, method) {
  const { path } = await context.params;
  const routeKey = path?.join("/");

  if (!routeKey || !apiRoutes[routeKey]) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  }

  const handler = apiRoutes[routeKey][method];

  if (!handler) {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  return handler(request, context);
}

export async function GET(request, context) {
  return dispatch(request, context, "GET");
}

export async function POST(request, context) {
  return dispatch(request, context, "POST");
}

export async function PUT(request, context) {
  return dispatch(request, context, "PUT");
}

export async function PATCH(request, context) {
  return dispatch(request, context, "PATCH");
}

export async function DELETE(request, context) {
  return dispatch(request, context, "DELETE");
}
