import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoUser } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  return apiSuccess(demoUser);
}

export async function PATCH(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  try {
    const body = await request.json();
    return apiSuccess({ ...demoUser, ...body });
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
