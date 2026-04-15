import { NextResponse } from "next/server";
import { listConversations } from "@/lib/repositories";

export async function GET() {
  const conversations = await listConversations();
  return NextResponse.json({ conversations });
}
