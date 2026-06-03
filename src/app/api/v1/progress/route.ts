import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoProgress } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  return apiSuccess(demoProgress);
}
