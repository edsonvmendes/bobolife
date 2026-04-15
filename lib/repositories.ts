import { randomUUID } from "crypto";
import { BOB_CHARACTER_ID } from "@/lib/constants";
import {
  addDemoDirective,
  applyDemoSimulation,
  getDemoSnapshot,
} from "@/lib/demoStore";
import { isSupabaseConfigured } from "@/lib/env";
import { tickSimulation } from "@/lib/simulationEngine";
import { getSupabaseServerClient } from "@/lib/supabase";
import type {
  AdminDeskSnapshot,
  AdminDirectiveRecord,
  AvatarRecord,
  CharacterWithAvatar,
  ConversationDetail,
  ConversationRecord,
  ConversationSummary,
  DataSnapshot,
  MessageRecord,
  RelationshipRecord,
  SimulationResult,
} from "@/lib/types";

function normalizeSnapshot(snapshot: DataSnapshot): DataSnapshot {
  return {
    ...snapshot,
    adminDirectives: [...snapshot.adminDirectives].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
    messages: [...snapshot.messages].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    ),
  };
}

export function attachAvatars(snapshot: DataSnapshot) {
  const avatarMap = new Map<string, AvatarRecord>();
  for (const avatar of snapshot.avatars) {
    if (avatar.is_active) {
      avatarMap.set(avatar.character_id, avatar);
    }
  }

  return snapshot.characters.map(
    (character): CharacterWithAvatar => ({
      ...character,
      activeAvatar: avatarMap.get(character.id),
    }),
  );
}

function buildConversationTitle(
  conversation: ConversationRecord,
  participants: CharacterWithAvatar[],
) {
  if (conversation.type === "group") {
    return conversation.title ?? "Untitled group";
  }

  const counterpart =
    participants.find((participant) => participant.id !== BOB_CHARACTER_ID) ?? participants[0];

  return counterpart?.name ?? "Conversation";
}

function findConversationCover(participants: CharacterWithAvatar[]) {
  const nonBob = participants.find((participant) => participant.id !== BOB_CHARACTER_ID);
  return nonBob?.activeAvatar ?? participants[0]?.activeAvatar;
}

function computeUnreadCount(messages: MessageRecord[]) {
  const lastBobMessage = [...messages]
    .filter((message) => message.sender_id === BOB_CHARACTER_ID)
    .at(-1);

  if (!lastBobMessage) {
    return messages.filter((message) => message.sender_id !== BOB_CHARACTER_ID).length;
  }

  return messages.filter(
    (message) =>
      message.sender_id !== BOB_CHARACTER_ID &&
      new Date(message.created_at).getTime() >
        new Date(lastBobMessage.created_at).getTime(),
  ).length;
}

export function buildConversationSummaries(snapshot: DataSnapshot): ConversationSummary[] {
  const normalized = normalizeSnapshot(snapshot);
  const characters = attachAvatars(normalized);
  const characterMap = new Map(characters.map((character) => [character.id, character]));
  const participantsByConversation = new Map<string, CharacterWithAvatar[]>();

  for (const participant of normalized.conversationParticipants) {
    const character = characterMap.get(participant.character_id);
    if (!character) continue;
    const group = participantsByConversation.get(participant.conversation_id) ?? [];
    group.push(character);
    participantsByConversation.set(participant.conversation_id, group);
  }

  return normalized.conversations
    .map((conversation) => {
      const participants = participantsByConversation.get(conversation.id) ?? [];
      const conversationMessages = normalized.messages.filter(
        (message) => message.conversation_id === conversation.id,
      );
      const lastMessage = conversationMessages.at(-1);

      return {
        id: conversation.id,
        type: conversation.type,
        title: buildConversationTitle(conversation, participants),
        lastMessage,
        lastMessagePreview:
          lastMessage?.message_type === "system"
            ? "System update"
            : lastMessage?.content ?? "No messages yet",
        lastMessageAt: lastMessage?.created_at ?? conversation.created_at,
        unreadCount: computeUnreadCount(conversationMessages),
        participants,
        coverAvatar: findConversationCover(participants),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
    );
}

export function buildConversationDetail(
  snapshot: DataSnapshot,
  conversationId: string,
): ConversationDetail | null {
  const conversation = snapshot.conversations.find((entry) => entry.id === conversationId);

  if (!conversation) {
    return null;
  }

  const summaries = buildConversationSummaries(snapshot);
  const summary = summaries.find((entry) => entry.id === conversationId);
  const messages = normalizeSnapshot(snapshot).messages.filter(
    (message) => message.conversation_id === conversationId,
  );

  return {
    conversation,
    participants: summary?.participants ?? [],
    messages,
    unreadCount: summary?.unreadCount ?? 0,
    systemState: snapshot.systemState,
  };
}

async function loadSnapshotFromSupabase(): Promise<DataSnapshot> {
  const client = getSupabaseServerClient();

  if (!client) {
    return getDemoSnapshot();
  }

  const [
    usersResult,
    charactersResult,
    conversationsResult,
    participantsResult,
    messagesResult,
    eventsResult,
    relationshipsResult,
    avatarsResult,
    adminDirectivesResult,
    systemStateResult,
  ] = await Promise.all([
    client.from("users").select("*"),
    client.from("characters").select("*"),
    client.from("conversations").select("*"),
    client.from("conversation_participants").select("*"),
    client.from("messages").select("*"),
    client.from("events").select("*"),
    client.from("relationships").select("*"),
    client.from("avatars").select("*"),
    client.from("admin_directives").select("*"),
    client.from("system_state").select("*").limit(1).maybeSingle(),
  ]);

  if (
    usersResult.error ||
    charactersResult.error ||
    conversationsResult.error ||
    participantsResult.error ||
    messagesResult.error ||
    eventsResult.error ||
    relationshipsResult.error ||
    avatarsResult.error ||
    adminDirectivesResult.error ||
    systemStateResult.error
  ) {
    throw new Error(
      [
        usersResult.error?.message,
        charactersResult.error?.message,
        conversationsResult.error?.message,
        participantsResult.error?.message,
        messagesResult.error?.message,
        eventsResult.error?.message,
        relationshipsResult.error?.message,
        avatarsResult.error?.message,
        adminDirectivesResult.error?.message,
        systemStateResult.error?.message,
      ]
        .filter(Boolean)
        .join(" | "),
    );
  }

  return normalizeSnapshot({
    users: usersResult.data ?? [],
    characters: charactersResult.data ?? [],
    conversations: conversationsResult.data ?? [],
    conversationParticipants: participantsResult.data ?? [],
    messages: messagesResult.data ?? [],
    events: eventsResult.data ?? [],
    relationships: relationshipsResult.data ?? [],
    avatars: avatarsResult.data ?? [],
    adminDirectives: adminDirectivesResult.data ?? [],
    systemState:
      systemStateResult.data ?? {
        id: randomUUID(),
        drama_level: 0,
        last_simulation_tick: new Date().toISOString(),
      },
  });
}

export async function getDataSnapshot() {
  if (!isSupabaseConfigured) {
    return getDemoSnapshot();
  }

  try {
    return await loadSnapshotFromSupabase();
  } catch {
    return getDemoSnapshot();
  }
}

export async function listConversations() {
  const snapshot = await getDataSnapshot();
  return buildConversationSummaries(snapshot);
}

export async function getAdminDeskSnapshot(): Promise<AdminDeskSnapshot> {
  const snapshot = await getDataSnapshot();
  return {
    directives: snapshot.adminDirectives,
    systemState: snapshot.systemState,
  };
}

export async function getConversation(conversationId: string) {
  const snapshot = await getDataSnapshot();
  return buildConversationDetail(snapshot, conversationId);
}

export async function getConversationMessages(conversationId: string, since?: string) {
  const detail = await getConversation(conversationId);

  if (!detail) {
    return [];
  }

  if (!since) {
    return detail.messages;
  }

  return detail.messages.filter(
    (message) =>
      new Date(message.created_at).getTime() > new Date(since).getTime(),
  );
}

async function persistSimulationToSupabase(result: SimulationResult) {
  const client = getSupabaseServerClient();

  if (!client) {
    applyDemoSimulation(result);
    return;
  }

  if (result.newCharacters?.length) {
    await client.from("characters").insert(result.newCharacters);
  }

  if (result.newConversations?.length) {
    await client.from("conversations").insert(result.newConversations);
  }

  if (result.newParticipants?.length) {
    await client.from("conversation_participants").insert(result.newParticipants);
  }

  if (result.events.length) {
    await client.from("events").insert(result.events);
  }

  if (result.messages.length) {
    await client.from("messages").insert(result.messages);
  }

  if (result.updatedRelationships.length) {
    await client
      .from("relationships")
      .upsert(result.updatedRelationships, { onConflict: "id" });
  }

  if (result.newAvatars.length) {
    const owners = result.newAvatars.map((avatar) => avatar.character_id);
    await client.from("avatars").update({ is_active: false }).in("character_id", owners);
    await client.from("avatars").insert(result.newAvatars);
  }

  if (result.updatedAdminDirectives?.length) {
    await client
      .from("admin_directives")
      .upsert(result.updatedAdminDirectives, { onConflict: "id" });
  }

  await client.from("system_state").upsert(result.systemState, { onConflict: "id" });
}

export async function runSimulationTick(force = false) {
  const snapshot = await getDataSnapshot();
  const result = tickSimulation(snapshot, { force });

  if (!result) {
    return null;
  }

  if (isSupabaseConfigured) {
    await persistSimulationToSupabase(result);
  } else {
    applyDemoSimulation(result);
  }

  return result;
}

export async function createAdminDirective(input: {
  directiveType: AdminDirectiveRecord["directive_type"];
  title: string;
  prompt: string;
  priority?: number;
}) {
  const directive: AdminDirectiveRecord = {
    id: randomUUID(),
    directive_type: input.directiveType,
    title: input.title,
    prompt: input.prompt,
    status: "pending",
    source: "admin",
    priority: input.priority ?? 3,
    created_at: new Date().toISOString(),
    used_at: null,
  };

  if (!isSupabaseConfigured) {
    addDemoDirective(directive);
    return directive;
  }

  const client = getSupabaseServerClient();
  if (!client) {
    addDemoDirective(directive);
    return directive;
  }

  const result = await client.from("admin_directives").insert(directive).select().single();
  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data as AdminDirectiveRecord;
}

export function findRelationship(relationships: RelationshipRecord[], firstId: string, secondId: string) {
  return relationships.find(
    (entry) =>
      (entry.character_a === firstId && entry.character_b === secondId) ||
      (entry.character_a === secondId && entry.character_b === firstId),
  );
}
