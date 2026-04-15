"use client";

import { useEffect } from "react";
import type { CharacterLanguage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";

const options: Array<{ value: CharacterLanguage; label: string }> = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
  { value: "fr", label: "FR" },
];

const storageKey = "bob-inbox-language";

export function LanguageSelector() {
  const preferredLanguage = useChatStore((state) => state.preferredLanguage);
  const setPreferredLanguage = useChatStore((state) => state.setPreferredLanguage);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as CharacterLanguage | null;
    if (saved && options.some((option) => option.value === saved)) {
      setPreferredLanguage(saved);
    }
  }, [setPreferredLanguage]);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-1.5">
      <div className="mb-1 px-2 pt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
        Idioma
      </div>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setPreferredLanguage(option.value);
              window.localStorage.setItem(storageKey, option.value);
            }}
            className={cn(
              "rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
              preferredLanguage === option.value
                ? "bg-white text-slate-950"
                : "text-[var(--muted)] hover:bg-white/8 hover:text-white",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
