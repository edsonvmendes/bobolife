"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
} from "react";
import { CONVERSATION_REFRESH_MS } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { CharacterWithAvatar, MessageRecord } from "@/lib/types";
import { useChatStore } from "@/store/chat-store";

interface UseConversationFeedOptions {
  conversationId: string;
  initialMessages: MessageRecord[];
  participants: CharacterWithAvatar[];
}

export function useConversationFeed({
  conversationId,
  initialMessages,
  participants,
}: UseConversationFeedOptions) {
  const {
    activeConversationId,
    messageCache,
    typingByConversation,
    hydrateConversation,
    appendMessage,
    setActiveConversation,
    setTyping,
  } = useChatStore();
  const timersRef = useRef<number[]>([]);
  const latestTimestampRef = useRef(initialMessages.at(-1)?.created_at ?? undefined);
  const participantMap = useMemo(
    () => new Map(participants.map((participant) => [participant.id, participant])),
    [participants],
  );

  useEffect(() => {
    hydrateConversation(conversationId, initialMessages);
    latestTimestampRef.current = initialMessages.at(-1)?.created_at;
    setActiveConversation(conversationId);

    return () => {
      if (activeConversationId === conversationId) {
        setActiveConversation(undefined);
      }
    };
  }, [
    activeConversationId,
    conversationId,
    hydrateConversation,
    initialMessages,
    setActiveConversation,
  ]);

  const queueMessages = useEffectEvent((incoming: MessageRecord[]) => {
    incoming.forEach((message, index) => {
      const existingTyping = typingByConversation[conversationId] ?? [];
      const nextTyping = Array.from(new Set([...existingTyping, message.sender_id]));
      setTyping(conversationId, nextTyping);

      const timer = window.setTimeout(() => {
        startTransition(() => {
          appendMessage(conversationId, message);
          const reducedTyping = (typingByConversation[conversationId] ?? [])
            .filter((senderId) => senderId !== message.sender_id);
          setTyping(conversationId, reducedTyping);
          latestTimestampRef.current = message.created_at;
        });
      }, 800 + index * 1050);

      timersRef.current.push(timer);
    });
  });

  useEffect(() => {
    const fetchNewMessages = async () => {
      const search = latestTimestampRef.current
        ? `?since=${encodeURIComponent(latestTimestampRef.current)}`
        : "";
      const response = await fetch(`/api/conversations/${conversationId}${search}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) return;
      const data = (await response.json()) as { messages: MessageRecord[] };
      if (data.messages.length > 0) {
        queueMessages(data.messages);
      }
    };

    void fetchNewMessages();

    const interval = window.setInterval(() => {
      void fetchNewMessages();
    }, CONVERSATION_REFRESH_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [conversationId]);

  useEffect(() => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      return;
    }

    const channel = client
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const nextMessage = payload.new as MessageRecord;
          queueMessages([nextMessage]);
        },
      )
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const messages = messageCache[conversationId] ?? initialMessages;
  const typingIds = typingByConversation[conversationId] ?? [];
  const typingParticipants = typingIds
    .map((senderId) => participantMap.get(senderId))
    .filter((participant): participant is CharacterWithAvatar => Boolean(participant));

  return {
    messages,
    typingParticipants,
  };
}
