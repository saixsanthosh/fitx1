import { apiSuccess, apiError, requireAuth } from "@/lib/api";

// In production this proxies to OpenAI GPT-4 with the user's fitness context injected.
const cannedResponses: Record<string, string> = {
  workout: "Here's a 45-min dumbbell workout: DB Bench 4×10, DB Row 4×10, Shoulder Press 3×12, Lunges 3×12, Hammer Curls 3×12, Skull Crushers 3×12.",
  weight: "Looking at your data, your average intake is slightly above your cutting target. Tighten up logging for 2 weeks and reassess — weight loss isn't linear.",
  overtraining: "Your recovery score is 78/100 and volume is up a healthy 8% this week. You're not overtraining — keep progressing.",
};

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  try {
    const body = await request.json();
    const message: string = (body.message ?? "").toLowerCase();
    if (!message) return apiError("VALIDATION_ERROR", "Message is required", { field: "message" });

    let reply = "Based on your current training data and goals, focus on consistency with progressive overload. You're making solid progress!";
    if (message.includes("workout") || message.includes("dumbbell")) reply = cannedResponses.workout;
    else if (message.includes("weight") || message.includes("losing")) reply = cannedResponses.weight;
    else if (message.includes("overtrain")) reply = cannedResponses.overtraining;

    return apiSuccess({ role: "assistant", content: reply, timestamp: new Date().toISOString() });
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
