export const BOB_USER_ID = "4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1";
export const BOB_CHARACTER_ID = "4f7e2d27-9aa0-4a98-8e9f-98ad66f3c2d1";

export const SIMULATION_INTERVAL_MS = 25000;
export const CONVERSATION_REFRESH_MS = 7000;

export const RELATIONSHIP_TYPES = [
  "self",
  "mother",
  "father",
  "friend",
  "girlfriend",
  "crush",
  "ex",
  "teacher",
  "sibling",
] as const;

export const CHARACTER_LANGUAGES = ["pt", "es", "en", "fr"] as const;
export const CONVERSATION_TYPES = ["direct", "group"] as const;
export const MESSAGE_TYPES = ["text", "system"] as const;
export const EVENT_TYPES = [
  "conflict",
  "romance",
  "group_event",
  "new_contact",
  "check_in",
  "academic",
] as const;
export const RELATIONSHIP_STATUS = ["active", "broken", "unstable"] as const;
export const ADMIN_DIRECTIVE_TYPES = ["whisper", "theme"] as const;
export const ADMIN_DIRECTIVE_STATUS = ["pending", "used", "archived"] as const;
