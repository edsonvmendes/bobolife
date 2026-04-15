import type { ConversationDetail, ConversationSummary } from "@/lib/types";
import { ConversationList } from "@/components/conversation-list";
import { ConversationView } from "@/components/conversation-view";
import { LanguageSelector } from "@/components/language-selector";

interface AppShellProps {
  conversations: ConversationSummary[];
  activeConversationId?: string;
  detail?: ConversationDetail | null;
}

export function AppShell({
  conversations,
  activeConversationId,
  detail,
}: AppShellProps) {
  const activeSummary = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1380px] px-0 lg:px-4 lg:py-4">
      <div className="overflow-hidden border border-white/6 bg-[var(--shell)] lg:grid lg:min-h-[calc(100vh-2rem)] lg:grid-cols-[340px_1fr] lg:rounded-[2rem]">
        <aside className="glass-panel overflow-hidden border-r border-white/6">
          <div className="border-b border-white/6 px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Inbox
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Bob Inbox</h1>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">
                  Familia, escola, amigos e recados do dia.
                </p>
              </div>
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
            </div>
            <div className="mt-4 sm:hidden">
              <LanguageSelector />
            </div>
          </div>

          <ConversationList
            initialConversations={conversations}
            activeConversationId={activeConversationId}
          />
        </aside>

        <ConversationView conversation={detail} summary={activeSummary} />
      </div>
    </main>
  );
}
