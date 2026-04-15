"use client";

import { create } from "zustand";
import type { CharacterLanguage, MessageRecord } from "@/lib/types";

interface ChatStore {
  activeConversationId?: string;
  messageCache: Record<string, MessageRecord[]>;
  typingByConversation: Record<string, string[]>;
  preferredLanguage: CharacterLanguage;
  setActiveConversation: (conversationId?: string) => void;
  hydrateConversation: (conversationId: string, messages: MessageRecord[]) => void;
  appendMessage: (conversationId: string, message: MessageRecord) => void;
  setTyping: (conversationId: string, senderIds: string[]) => void;
  setPreferredLanguage: (language: CharacterLanguage) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeConversationId: undefined,
  messageCache: {},
  typingByConversation: {},
  preferredLanguage: "pt",
  setActiveConversation: (activeConversationId) => set({ activeConversationId }),
  hydrateConversation: (conversationId, messages) =>
    set((state) => ({
      messageCache: {
        ...state.messageCache,
        [conversationId]: messages,
      },
    })),
  appendMessage: (conversationId, message) =>
    set((state) => {
      const existing = state.messageCache[conversationId] ?? [];
      if (existing.some((entry) => entry.id === message.id)) {
        return state;
      }

      return {
        messageCache: {
          ...state.messageCache,
          [conversationId]: [...existing, message].sort(
            (a, b) =>
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
          ),
        },
      };
    }),
  setTyping: (conversationId, senderIds) =>
    set((state) => ({
      typingByConversation: {
        ...state.typingByConversation,
        [conversationId]: senderIds,
      },
    })),
  setPreferredLanguage: (preferredLanguage) => set({ preferredLanguage }),
}));
