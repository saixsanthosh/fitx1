import { apiSuccess, apiError, requireAuth } from "@/lib/api";
import { demoLeaderboard } from "@/data/seed";

const feed = [
  { id: "1", user: "Alex Knight", level: 24, time: "2h ago", content: "Just hit a new PR on bench press — 100 kg!", type: "PR", reactions: 42, comments: 8 },
  { id: "2", user: "Sarah Chen", level: 31, time: "4h ago", content: "Completed my 30-day streak!", type: "Streak", reactions: 67, comments: 12 },
  { id: "3", user: "Marcus Johnson", level: 28, time: "6h ago", content: "Leg day was brutal but hit 140 kg squat for 3.", type: "Workout", reactions: 38, comments: 5 },
];

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (!auth) return apiError("UNAUTHORIZED", "Authentication required", undefined, 401);
  return apiSuccess({ feed, leaderboard: demoLeaderboard });
}
