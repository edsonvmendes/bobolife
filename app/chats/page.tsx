import { AppShell } from "@/components/app-shell";
import { listConversations } from "@/lib/repositories";

export default async function ChatsPage() {
  const conversations = await listConversations();

  return <AppShell conversations={conversations} />;
}
