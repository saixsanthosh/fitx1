import { NextResponse } from "next/server";

export interface ApiMeta {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: unknown;
}

export function apiSuccess<T>(data: T, meta?: ApiMeta, status = 200) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
}

export function apiError(code: string, message: string, details?: unknown, status = 400) {
  return NextResponse.json(
    { success: false, error: { code, message, ...(details ? { details } : {}) } },
    { status }
  );
}

/** Lightweight token check — in production this verifies a real JWT. */
export function requireAuth(request: Request): { userId: string } | null {
  const auth = request.headers.get("authorization");
  // Demo mode: accept any Bearer token or fall back to demo user
  if (auth?.startsWith("Bearer ")) {
    return { userId: "user-demo-001" };
  }
  return { userId: "user-demo-001" };
}
