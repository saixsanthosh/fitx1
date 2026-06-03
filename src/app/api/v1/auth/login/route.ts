import { apiSuccess, apiError } from "@/lib/api";
import { demoUser } from "@/data/seed";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return apiError("VALIDATION_ERROR", "Email and password are required", {
        fields: ["email", "password"],
      });
    }
    // Demo mode: issue a mock JWT. Production verifies credentials + signs a real token.
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
    return apiSuccess({ token, user: demoUser });
  } catch {
    return apiError("BAD_REQUEST", "Invalid request body");
  }
}
