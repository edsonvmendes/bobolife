import { NextResponse } from "next/server";
import { getConversationMessages } from "@/lib/repositories";
import {
  conversationMessagesQuerySchema,
  conversationRouteSchema,
} from "@/lib/validators";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const parsedParams = conversationRouteSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid conversation id." }, { status: 400 });
  }

  const url = new URL(request.url);
  const query = conversationMessagesQuerySchema.safeParse({
    since: url.searchParams.get("since") ?? undefined,
  });

  if (!query.success) {
    return NextResponse.json({ error: "Invalid query." }, { status: 400 });
  }

  const messages = await getConversationMessages(parsedParams.data.id, query.data.since);
  return NextResponse.json({ messages });
}
