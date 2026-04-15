import { NextResponse } from "next/server";
import { runSimulationTick } from "@/lib/repositories";
import { tickRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = tickRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid simulation request." }, { status: 400 });
  }

  const result = await runSimulationTick(parsed.data.force);
  return NextResponse.json({ ok: true, result });
}
