import { apiSuccess, apiError } from "@/lib/api";
import { exercises } from "@/data/exercises";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const muscle = searchParams.get("muscle");
    const equipment = searchParams.get("equipment");
    const difficulty = searchParams.get("difficulty");
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? "20");

    let result = exercises;
    if (search) result = result.filter((e) => e.name.toLowerCase().includes(search));
    if (muscle) result = result.filter((e) => e.muscleGroup === muscle);
    if (equipment) result = result.filter((e) => e.equipment.includes(equipment as never));
    if (difficulty) result = result.filter((e) => e.difficulty === difficulty);

    const total = result.length;
    const start = (page - 1) * pageSize;
    const paged = result.slice(start, start + pageSize);

    return apiSuccess(paged, { page, pageSize, total });
  } catch {
    return apiError("INTERNAL_ERROR", "Failed to fetch exercises", undefined, 500);
  }
}
