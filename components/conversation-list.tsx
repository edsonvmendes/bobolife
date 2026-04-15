"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONVERSATION_REFRESH_MS } from "@/lib/constants";
import { localizeMessageContent } from "@/lib/message-localization";
import type { ConversationSummary } from "@/lib/types";
import { cn, formatChatTimestamp } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";

interface ConversationListProps {
  initialConversations: ConversationSummary[];
  activeConversationId?: string;
}

export function ConversationList({
  initialConversations,
  activeConversationId,
}: ConversationListProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const preferredLanguage = useChatStore((state) => state.preferredLanguage);

  useEffect(() => {
    setConversations(initialConversations);
  }, [initialConversations]);

  useEffect(() => {
    const refresh = async () => {
      const response = await fetch("/api/conversations", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { conversations: ConversationSummary[] };
      setConversations(data.conversations);
    };

    const timer = window.setInterval(() => {
      void refresh();
    }, CONVERSATION_REFRESH_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <nav className="flex flex-col bg-[var(--panel)]">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/chat/${conversation.id}`}
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/6 px-4 py-3 transition-colors sm:px-5",
            activeConversationId === conversation.id
              ? "bg-white/7"
              : "hover:bg-white/4",
          )}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/8">
            {conversation.coverAvatar ? (
              <Image
                src={conversation.coverAvatar.image_url}
                alt={conversation.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/8 text-sm font-semibold">
                {conversation.title.slice(0, 1)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="mb-1 flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-white">
                {conversation.title}
              </span>
              <span className="shrink-0 text-[11px] text-[var(--muted)]">
                {formatChatTimestamp(conversation.lastMessageAt)}
              </span>
            </div>
            <p className="truncate text-sm text-[var(--muted)]">
              {conversation.lastMessage
                ? localizeMessageContent(conversation.lastMessage, preferredLanguage)
                : conversation.lastMessagePreview}
            </p>
          </div>

          <div className="flex min-h-10 min-w-8 items-center justify-end">
            {conversation.unreadCount > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-semibold text-slate-950">
                {conversation.unreadCount}
              </span>
            ) : null}
          </div>
        </Link>
      ))}
    </nav>
  );
}
