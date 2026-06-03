import { apiSuccess, apiError } from "@/lib/api";
import { exercises } from "@/data/exercises";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = exercises.find((e) => e.id === id);
  if (!exercise) return apiError("NOT_FOUND", `Exercise ${id} not found`, undefined, 404);
  return apiSuccess(exercise);
}
