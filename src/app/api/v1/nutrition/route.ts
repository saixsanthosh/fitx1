import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoMeals } from "@/data/seed";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  const totals = demoMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  return apiSuccess(
    { meals: demoMeals, totals, targets: { calories: 2400, protein: 180, carbs: 260, fat: 70 } },
    { total: demoMeals.length }
  );
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  try {
    const body = await request.json();
    if (!body.foodName) return apiError("VALIDATION_ERROR", "Food name is required", { field: "foodName" });
    return apiSuccess({ id: `meal-${Date.now()}`, ...body, xpEarned: 30 }, undefined, 201);
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
