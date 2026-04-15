import type {
  AdminDirectiveRecord,
  AvatarRecord,
  CharacterRecord,
  ConversationParticipantRecord,
  ConversationRecord,
  DataSnapshot,
  EventRecord,
  MessageRecord,
  RelationshipRecord,
  SimulationResult,
} from "@/lib/types";
import { createSeedSnapshot } from "@/lib/seedData";

let demoState = createSeedSnapshot();

export function getDemoSnapshot(): DataSnapshot {
  return structuredClone(demoState);
}

export function applyDemoSimulation(result: SimulationResult) {
  const next = structuredClone(demoState);

  if (result.newCharacters?.length) {
    next.characters.push(...result.newCharacters);
  }

  if (result.newConversations?.length) {
    next.conversations.push(...result.newConversations);
  }

  if (result.newParticipants?.length) {
    next.conversationParticipants.push(...result.newParticipants);
  }

  next.events.push(...result.events);
  next.messages.push(...result.messages);

  for (const relationship of result.updatedRelationships) {
    const index = next.relationships.findIndex((entry) => entry.id === relationship.id);
    if (index >= 0) {
      next.relationships[index] = relationship;
    } else {
      next.relationships.push(relationship);
    }
  }

  if (result.newAvatars.length) {
    const owners = new Set(result.newAvatars.map((avatar) => avatar.character_id));
    next.avatars = next.avatars.map((avatar) =>
      owners.has(avatar.character_id) ? { ...avatar, is_active: false } : avatar,
    );
    next.avatars.push(...result.newAvatars);
  }

  next.systemState = result.systemState;
  if (result.updatedAdminDirectives?.length) {
    const directiveMap = new Map(next.adminDirectives.map((entry) => [entry.id, entry]));
    for (const directive of result.updatedAdminDirectives) {
      directiveMap.set(directive.id, directive);
    }
    next.adminDirectives = Array.from(directiveMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
  demoState = next;
}

export function resetDemoStore() {
  demoState = createSeedSnapshot();
}

export function addDemoCharacter(character: CharacterRecord) {
  demoState = { ...demoState, characters: [...demoState.characters, character] };
}

export function addDemoConversation(conversation: ConversationRecord) {
  demoState = { ...demoState, conversations: [...demoState.conversations, conversation] };
}

export function addDemoParticipant(participant: ConversationParticipantRecord) {
  demoState = {
    ...demoState,
    conversationParticipants: [...demoState.conversationParticipants, participant],
  };
}

export function addDemoMessages(nextMessages: MessageRecord[]) {
  demoState = { ...demoState, messages: [...demoState.messages, ...nextMessages] };
}

export function addDemoEvents(nextEvents: EventRecord[]) {
  demoState = { ...demoState, events: [...demoState.events, ...nextEvents] };
}

export function upsertDemoRelationships(nextRelationships: RelationshipRecord[]) {
  const relationshipMap = new Map(demoState.relationships.map((entry) => [entry.id, entry]));
  for (const relationship of nextRelationships) {
    relationshipMap.set(relationship.id, relationship);
  }
  demoState = { ...demoState, relationships: Array.from(relationshipMap.values()) };
}

export function replaceActiveAvatars(nextAvatars: AvatarRecord[]) {
  const owners = new Set(nextAvatars.map((avatar) => avatar.character_id));
  demoState = {
    ...demoState,
    avatars: [
      ...demoState.avatars.map((avatar) =>
        owners.has(avatar.character_id) ? { ...avatar, is_active: false } : avatar,
      ),
      ...nextAvatars,
    ],
  };
}

export function addDemoDirective(directive: AdminDirectiveRecord) {
  demoState = {
    ...demoState,
    adminDirectives: [directive, ...demoState.adminDirectives].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  };
}

export function upsertDemoDirectives(nextDirectives: AdminDirectiveRecord[]) {
  const directiveMap = new Map(demoState.adminDirectives.map((entry) => [entry.id, entry]));
  for (const directive of nextDirectives) {
    directiveMap.set(directive.id, directive);
  }
  demoState = {
    ...demoState,
    adminDirectives: Array.from(directiveMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  };
}
