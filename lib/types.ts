import type {
  ADMIN_DIRECTIVE_STATUS,
  ADMIN_DIRECTIVE_TYPES,
  CHARACTER_LANGUAGES,
  CONVERSATION_TYPES,
  EVENT_TYPES,
  MESSAGE_TYPES,
  RELATIONSHIP_STATUS,
  RELATIONSHIP_TYPES,
} from "@/lib/constants";

export type CharacterLanguage = (typeof CHARACTER_LANGUAGES)[number];
export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];
export type ConversationType = (typeof CONVERSATION_TYPES)[number];
export type MessageType = (typeof MESSAGE_TYPES)[number];
export type EventType = (typeof EVENT_TYPES)[number];
export type RelationshipStatus = (typeof RELATIONSHIP_STATUS)[number];
export type AdminDirectiveType = (typeof ADMIN_DIRECTIVE_TYPES)[number];
export type AdminDirectiveStatus = (typeof ADMIN_DIRECTIVE_STATUS)[number];

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface UserRecord {
  id: string;
  name: string;
  created_at: string;
}

export interface CharacterRecord {
  id: string;
  name: string;
  primary_language: CharacterLanguage;
  secondary_languages: string[];
  relationship_type: RelationshipType;
  personality_profile: Record<string, JsonValue>;
  response_style: Record<string, JsonValue>;
  visual_profile: Record<string, JsonValue>;
  created_at: string;
}

export interface ConversationRecord {
  id: string;
  type: ConversationType;
  title: string | null;
  created_at: string;
}

export interface ConversationParticipantRecord {
  id: string;
  conversation_id: string;
  character_id: string;
}

export interface MessageRecord {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  language: CharacterLanguage;
  message_type: MessageType;
  created_at: string;
}

export interface EventRecord {
  id: string;
  type: EventType;
  payload: Record<string, JsonValue>;
  created_at: string;
}

export interface RelationshipRecord {
  id: string;
  character_a: string;
  character_b: string;
  affinity: number;
  trust: number;
  jealousy: number;
  status: RelationshipStatus;
  updated_at: string;
}

export interface AvatarRecord {
  id: string;
  character_id: string;
  image_url: string;
  prompt_used: string;
  context_tag: string;
  created_at: string;
  is_active: boolean;
}

export interface SystemStateRecord {
  id: string;
  drama_level: number;
  last_simulation_tick: string;
}

export interface AdminDirectiveRecord {
  id: string;
  directive_type: AdminDirectiveType;
  title: string;
  prompt: string;
  status: AdminDirectiveStatus;
  source: string;
  priority: number;
  created_at: string;
  used_at: string | null;
}

export interface DataSnapshot {
  users: UserRecord[];
  characters: CharacterRecord[];
  conversations: ConversationRecord[];
  conversationParticipants: ConversationParticipantRecord[];
  messages: MessageRecord[];
  events: EventRecord[];
  relationships: RelationshipRecord[];
  avatars: AvatarRecord[];
  systemState: SystemStateRecord;
  adminDirectives: AdminDirectiveRecord[];
}

export interface CharacterWithAvatar extends CharacterRecord {
  activeAvatar?: AvatarRecord;
}

export interface ConversationSummary {
  id: string;
  type: ConversationType;
  title: string;
  lastMessage?: MessageRecord;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount: number;
  participants: CharacterWithAvatar[];
  coverAvatar?: AvatarRecord;
}

export interface ConversationDetail {
  conversation: ConversationRecord;
  participants: CharacterWithAvatar[];
  messages: MessageRecord[];
  unreadCount: number;
  systemState: SystemStateRecord;
}

export interface SimulationResult {
  events: EventRecord[];
  messages: MessageRecord[];
  updatedRelationships: RelationshipRecord[];
  newAvatars: AvatarRecord[];
  systemState: SystemStateRecord;
  updatedAdminDirectives?: AdminDirectiveRecord[];
  newCharacters?: CharacterRecord[];
  newParticipants?: ConversationParticipantRecord[];
  newConversations?: ConversationRecord[];
}

export interface AdminDeskSnapshot {
  directives: AdminDirectiveRecord[];
  systemState: SystemStateRecord;
}
