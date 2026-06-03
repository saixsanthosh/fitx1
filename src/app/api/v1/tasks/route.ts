import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoTasks } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let result = demoTasks;
  if (category && category !== "All") result = result.filter((t) => t.category === category);
  return apiSuccess(result, { total: result.length });
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  try {
    const body = await request.json();
    if (!body.title) return apiError("VALIDATION_ERROR", "Task title is required", { field: "title" });
    return apiSuccess(
      { id: `task-${Date.now()}`, completed: false, createdAt: new Date().toISOString(), ...body },
      undefined,
      201
    );
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
