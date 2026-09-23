import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { quizService } from "@/lib/container";
import { attemptSchema } from "@/lib/validations";

export const runtime = "nodejs";

// POST /api/attempts — persist a finished quiz (requires sign-in).
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  try {
    const input = attemptSchema.parse(await req.json());
    const attempt = await quizService.recordAttempt(userId, input);
    return NextResponse.json(attempt, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    console.error("Record attempt failed:", err);
    return NextResponse.json({ error: "Could not save attempt" }, { status: 500 });
  }
}
