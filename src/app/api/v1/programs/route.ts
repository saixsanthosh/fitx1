import { apiSuccess } from "@/lib/api";
import { demoPrograms } from "@/data/seed";

export async function GET() {
  return apiSuccess(demoPrograms, { total: demoPrograms.length });
}
