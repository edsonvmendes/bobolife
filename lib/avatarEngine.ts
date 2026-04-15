import { randomUUID } from "crypto";
import type { AvatarRecord, CharacterRecord, DataSnapshot } from "@/lib/types";

const contextUrls = {
  mirror:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80",
  travel:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80",
  party:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
  gym: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=640&q=80",
  campus:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=640&q=80",
  school:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=640&q=80",
  "after-class":
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=640&q=80",
  "coffee-bar":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=640&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=640&q=80",
  default:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
} as const;

export function generateAvatarPrompt(character: CharacterRecord, context: string) {
  const photoContexts = (character.visual_profile.photo_contexts as string[]) ?? [];
  return [
    String(character.visual_profile.core_description ?? character.name),
    `Context tag: ${context}.`,
    `Visual style: ${character.visual_profile.style ?? "social_confident"}.`,
    `Optional inspirations: ${photoContexts.join(", ")}.`,
  ].join(" ");
}

export function updateAvatar(
  characterId: string,
  options?: { snapshot?: DataSnapshot; context?: string },
): AvatarRecord | undefined {
  const snapshot = options?.snapshot;
  const character = snapshot?.characters.find((entry) => entry.id === characterId);

  if (!character) {
    return undefined;
  }

  const contexts = (character.visual_profile.photo_contexts as string[]) ?? ["default"];
  const context =
    options?.context ??
    contexts[Math.floor(Math.random() * contexts.length)] ??
    "default";
  const prompt = generateAvatarPrompt(character, context);
  const imageUrl = contextUrls[context as keyof typeof contextUrls] ?? contextUrls.default;

  return {
    id: randomUUID(),
    character_id: character.id,
    image_url: imageUrl,
    prompt_used: prompt,
    context_tag: context,
    created_at: new Date().toISOString(),
    is_active: true,
  };
}
