"use client";

import { useChatStore } from "@/store/chat-store";
import type { CharacterWithAvatar } from "@/lib/types";

export function TypingIndicator({
  participants,
}: {
  participants: CharacterWithAvatar[];
}) {
  const preferredLanguage = useChatStore((state) => state.preferredLanguage);

  if (participants.length === 0) {
    return null;
  }

  const label =
    preferredLanguage === "en"
      ? "typing..."
      : preferredLanguage === "es"
        ? "escribiendo..."
        : preferredLanguage === "fr"
          ? "en train d'ecrire..."
          : "digitando...";

  return (
    <div className="px-4 py-2">
      <div className="inline-flex items-center gap-3 rounded-2xl rounded-bl-md border border-white/8 bg-[var(--bubble-other)] px-4 py-3 text-sm text-[var(--muted)]">
        <span>
          {participants.map((participant) => participant.name).join(", ")} {label}
        </span>
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}
