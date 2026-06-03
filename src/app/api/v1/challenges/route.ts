import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoChallenges } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  return apiSuccess(demoChallenges, { total: demoChallenges.length });
}
