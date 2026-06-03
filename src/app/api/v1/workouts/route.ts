import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoWorkoutHistory } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  return apiSuccess(demoWorkoutHistory, { total: demoWorkoutHistory.length });
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  try {
    const body = await request.json();
    if (!body.name) return apiError("VALIDATION_ERROR", "Workout name is required", { field: "name" });
    const created = {
      id: `wk-${Date.now()}`,
      ...body,
      date: new Date().toISOString().split("T")[0],
      xpEarned: 100 + (body.prs ?? 0) * 200,
    };
    return apiSuccess(created, undefined, 201);
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
