import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getConversation, listConversations } from "@/lib/repositories";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [conversations, detail] = await Promise.all([
    listConversations(),
    getConversation(id),
  ]);

  if (!detail) {
    notFound();
  }

  return (
    <AppShell
      conversations={conversations}
      activeConversationId={id}
      detail={detail}
    />
  );
}
