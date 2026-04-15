import { NextResponse } from "next/server";
import { createAdminDirective, getAdminDeskSnapshot } from "@/lib/repositories";
import { adminDirectiveCreateSchema } from "@/lib/validators";

export async function GET() {
  const desk = await getAdminDeskSnapshot();
  return NextResponse.json({
    directives: desk.directives,
    systemState: desk.systemState,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminDirectiveCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Directive invalida. Revise tipo, titulo e briefing." },
      { status: 400 },
    );
  }

  const directive = await createAdminDirective(parsed.data);
  return NextResponse.json({ directive }, { status: 201 });
}
