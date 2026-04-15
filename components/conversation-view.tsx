"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useConversationFeed } from "@/hooks/use-conversation-feed";
import { BOB_CHARACTER_ID } from "@/lib/constants";
import { localizeMessageContent } from "@/lib/message-localization";
import type { ConversationDetail, ConversationSummary, MessageRecord } from "@/lib/types";
import { cn, formatChatTimestamp } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { TypingIndicator } from "@/components/typing-indicator";

function groupBoundary(messages: MessageRecord[], index: number) {
  if (index === 0) {
    return true;
  }

  return messages[index - 1]?.sender_id !== messages[index]?.sender_id;
}

export function ConversationView({
  conversation,
  summary,
}: {
  conversation?: ConversationDetail | null;
  summary?: ConversationSummary;
}) {
  if (!conversation) {
    return (
      <section className="glass-panel hidden min-h-[640px] flex-1 overflow-hidden lg:flex lg:flex-col">
        <div className="flex flex-1 flex-col justify-center p-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Inbox
            </p>
            <h2 className="max-w-sm text-4xl font-semibold leading-tight text-white">
              Escolha uma conversa para acompanhar o dia do Bob.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
              Familia, escola, amigos e pequenos recados ficam organizados aqui.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <LiveConversationView conversation={conversation} summary={summary} />;
}

function LiveConversationView({
  conversation,
  summary,
}: {
  conversation: ConversationDetail;
  summary?: ConversationSummary;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fallbackParticipants = summary?.participants ?? [];
  const participants = conversation?.participants ?? fallbackParticipants;
  const initialMessages = conversation?.messages ?? [];
  const title = summary?.title ?? "Select a chat";

  const { messages, typingParticipants } = useConversationFeed({
    conversationId: conversation?.conversation.id ?? summary?.id ?? "placeholder",
    initialMessages,
    participants,
  });

  const participantMap = useMemo(
    () => new Map(participants.map((participant) => [participant.id, participant])),
    [participants],
  );
  const preferredLanguage = useChatStore((state) => state.preferredLanguage);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages, typingParticipants]);

  return (
    <section className="glass-panel flex min-h-[72vh] flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-4 border-b border-white/6 bg-[var(--panel-strong)] px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/8">
            {summary?.coverAvatar ? (
              <Image
                src={summary.coverAvatar.image_url}
                alt={title}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/8 text-sm font-semibold">
                {title.slice(0, 1)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-white">{title}</h1>
            <p className="truncate text-sm text-[var(--muted)]">
              {participants.map((participant) => participant.name).join(", ")}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          conversa
        </span>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-1 overflow-y-auto bg-[var(--shell)] px-3 py-4 sm:px-5"
      >
        {messages.map((message, index) => {
          const sender = participantMap.get(message.sender_id);
          const isBob = message.sender_id === BOB_CHARACTER_ID;

          return (
            <div
              key={message.id}
              className={cn(
                "flex px-2",
                isBob ? "justify-end" : "justify-start",
                groupBoundary(messages, index) ? "mt-5" : "mt-1",
              )}
            >
              <div
                className={cn(
                  "max-w-[82%] rounded-[1.35rem] px-4 py-3",
                  isBob
                    ? "rounded-br-md bg-[var(--bubble-own)] text-white"
                    : "rounded-bl-md border border-white/6 bg-[var(--bubble-other)] text-white",
                )}
              >
                {!isBob && groupBoundary(messages, index) ? (
                  <p className="mb-1 text-[11px] font-semibold tracking-[0.02em] text-[var(--accent-strong)]">
                    {sender?.name}
                  </p>
                ) : null}
                <p className="text-sm leading-6">
                  {localizeMessageContent(message, preferredLanguage)}
                </p>
                <p
                  className={cn(
                    "mt-2 text-right font-mono text-[10px]",
                    isBob ? "text-white/55" : "text-[var(--muted)]",
                  )}
                >
                  {formatChatTimestamp(message.created_at)}
                </p>
              </div>
            </div>
          );
        })}

        <TypingIndicator participants={typingParticipants} />
      </div>

      <footer className="border-t border-white/6 bg-[var(--panel-strong)] px-4 py-4 sm:px-6">
        <div className="rounded-full border border-white/8 bg-[var(--bubble-other)] px-4 py-3 text-sm text-[var(--muted)]">
          Esta visualizacao e somente leitura
        </div>
      </footer>
    </section>
  );
}
