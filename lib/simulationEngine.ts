import { randomUUID } from "crypto";
import { addMinutes, differenceInSeconds } from "date-fns";
import { BOB_CHARACTER_ID } from "@/lib/constants";
import { updateAvatar } from "@/lib/avatarEngine";
import { BOB_SOUL_FACTS, pickSoulTopic } from "@/lib/bobSoul";
import { seedIds } from "@/lib/seedData";
import { TextEngine } from "@/lib/textEngine";
import { clamp, pickOne } from "@/lib/utils";
import type {
  AdminDirectiveRecord,
  CharacterRecord,
  ConversationParticipantRecord,
  ConversationRecord,
  DataSnapshot,
  EventRecord,
  EventType,
  MessageRecord,
  RelationshipRecord,
  SimulationResult,
} from "@/lib/types";

export function getDramaMultiplier(level: number) {
  return clamp(1 + level * 0.35, 0.35, 2.2);
}

function eventWeights(level: number) {
  return {
    conflict: 1.15 + Math.max(level, 0) * 0.6,
    romance: 1 + Math.max(level, 0) * 0.35,
    group_event: 1.1 + Math.abs(level) * 0.15,
    new_contact: 0.18 + Math.max(level, 0) * 0.1,
    check_in: 0.9 - Math.max(level, 0) * 0.1,
    academic: 0.55,
  } satisfies Record<EventType, number>;
}

function chooseDirective(snapshot: DataSnapshot) {
  return [...snapshot.adminDirectives]
    .filter((directive) => directive.status === "pending")
    .sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })[0];
}

function directiveEventType(directive: AdminDirectiveRecord): EventType {
  if (directive.directive_type === "theme") {
    return pickOne(
      ["group_event", "check_in", "romance", "conflict"] as EventType[],
      directive.title.length + directive.prompt.length,
    );
  }

  return pickOne(
    ["check_in", "romance", "conflict", "academic"] as EventType[],
    directive.title.length + directive.prompt.length,
  );
}

function encodeDirectiveMessage(directive: AdminDirectiveRecord) {
  return `[[admin:${directive.directive_type}]]${directive.title}||${directive.prompt}`;
}

function weightedEvent(level: number): EventType {
  const weights = eventWeights(level);
  const entries = Object.entries(weights) as Array<[EventType, number]>;
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let cursor = Math.random() * total;

  for (const [eventType, weight] of entries) {
    cursor -= weight;
    if (cursor <= 0) {
      return eventType;
    }
  }

  return "check_in";
}

function pickConversation(snapshot: DataSnapshot, eventType: EventType) {
  const directs = snapshot.conversations.filter((conversation) => conversation.type === "direct");
  const groups = snapshot.conversations.filter((conversation) => conversation.type === "group");

  if (eventType === "group_event") {
    return pickOne(groups, snapshot.messages.length);
  }

  if (eventType === "academic") {
    return (
      directs.find((conversation) =>
        snapshot.conversationParticipants.some(
          (participant) =>
            participant.conversation_id === conversation.id &&
            participant.character_id === seedIds.characters.andre,
        ),
      ) ?? directs[0]
    );
  }

  if (eventType === "check_in") {
    return (
      directs.find((conversation) =>
        snapshot.conversationParticipants.some(
          (participant) =>
            participant.conversation_id === conversation.id &&
            [seedIds.characters.helena, seedIds.characters.ravi].includes(
              participant.character_id as typeof seedIds.characters.helena,
            ),
        ),
      ) ?? directs[0]
    );
  }

  return pickOne(directs, snapshot.events.length + snapshot.messages.length);
}

function conversationCharacters(snapshot: DataSnapshot, conversationId: string) {
  const participantIds = snapshot.conversationParticipants
    .filter((participant) => participant.conversation_id === conversationId)
    .map((participant) => participant.character_id);
  return snapshot.characters.filter((character) => participantIds.includes(character.id));
}

function linkedRelationship(snapshot: DataSnapshot, firstId: string, secondId: string) {
  return snapshot.relationships.find(
    (relationship) =>
      (relationship.character_a === firstId && relationship.character_b === secondId) ||
      (relationship.character_a === secondId && relationship.character_b === firstId),
  );
}

function chooseParticipants(
  participants: CharacterRecord[],
  eventType: EventType,
  beatIndex: number,
) {
  const bob = participants.find((character) => character.id === BOB_CHARACTER_ID);
  const others = participants.filter((character) => character.id !== BOB_CHARACTER_ID);

  if (!bob) {
    return { sender: others[0] ?? participants[0], recipient: others[1] };
  }

  if (eventType === "group_event") {
    return {
      sender: others[beatIndex % others.length] ?? bob,
      recipient: bob,
    };
  }

  if ((eventType === "conflict" || eventType === "romance") && beatIndex % 2 === 1) {
    return {
      sender: bob,
      recipient: others[0],
    };
  }

  return {
    sender: others[0] ?? bob,
    recipient: bob,
  };
}

function shiftRelationship(
  relationship: RelationshipRecord | undefined,
  eventType: EventType,
  dramaLevel: number,
) {
  if (!relationship) {
    return undefined;
  }

  const next = { ...relationship };
  const multiplier = getDramaMultiplier(dramaLevel);

  if (eventType === "conflict") {
    next.trust = clamp(Math.round(next.trust - 7 * multiplier), 0, 100);
    next.affinity = clamp(Math.round(next.affinity - 4 * multiplier), 0, 100);
    next.jealousy = clamp(Math.round(next.jealousy + 6 * multiplier), 0, 100);
  }

  if (eventType === "romance") {
    next.affinity = clamp(Math.round(next.affinity + 5 * multiplier), 0, 100);
    next.trust = clamp(Math.round(next.trust + 2 * multiplier), 0, 100);
    next.jealousy = clamp(Math.round(next.jealousy + 2 * multiplier), 0, 100);
  }

  if (eventType === "check_in") {
    next.trust = clamp(Math.round(next.trust + 3 * multiplier), 0, 100);
  }

  if (eventType === "group_event") {
    next.affinity = clamp(Math.round(next.affinity + 1 * multiplier), 0, 100);
  }

  next.status = next.trust < 28 || next.jealousy > 78 ? "unstable" : next.status;
  next.updated_at = new Date().toISOString();
  return next;
}

function maybeCreateNewContact(snapshot: DataSnapshot) {
  if (snapshot.characters.some((character) => character.name === "Iara")) {
    return null;
  }

  const character: CharacterRecord = {
    id: randomUUID(),
    name: "Iara",
    primary_language: "pt",
    secondary_languages: ["es"],
    relationship_type: "friend",
    personality_profile: { archetype: "new orbit connector", traits: ["curious", "bold", "precise"] },
    response_style: { tone: "confident warm-up text", pacing: "quick", slang_level: "medium", quirks: ["asks decisive questions"] },
    visual_profile: { style: "social_confident", core_description: "Creative student with bright phone photos, club posters, and after-class energy.", photo_contexts: ["school", "after-class", "coffee-bar"], update_frequency: "medium" },
    created_at: new Date().toISOString(),
  };

  const conversation: ConversationRecord = {
    id: randomUUID(),
    type: "direct",
    title: null,
    created_at: new Date().toISOString(),
  };

  const participants: ConversationParticipantRecord[] = [
    { id: randomUUID(), conversation_id: conversation.id, character_id: BOB_CHARACTER_ID },
    { id: randomUUID(), conversation_id: conversation.id, character_id: character.id },
  ];

  const relationship: RelationshipRecord = {
    id: randomUUID(),
    character_a: BOB_CHARACTER_ID,
    character_b: character.id,
    affinity: 52,
    trust: 44,
    jealousy: 7,
    status: "active",
    updated_at: new Date().toISOString(),
  };

  return { character, conversation, participants, relationship };
}

export function tickSimulation(
  snapshot: DataSnapshot,
  options?: { force?: boolean },
): SimulationResult | null {
  const now = new Date();
  const secondsSinceLastTick = differenceInSeconds(
    now,
    new Date(snapshot.systemState.last_simulation_tick),
  );

  if (!options?.force && secondsSinceLastTick < 18) {
    return null;
  }

  const dramaLevel = snapshot.systemState.drama_level;
  const multiplier = getDramaMultiplier(dramaLevel);
  const adminDirective = chooseDirective(snapshot);
  const shouldTrigger =
    options?.force ||
    Boolean(adminDirective) ||
    Math.random() < clamp(0.32 * multiplier, 0.16, 0.9);

  if (!shouldTrigger) {
    return {
      events: [],
      messages: [],
      updatedRelationships: [],
      newAvatars: [],
      systemState: {
        ...snapshot.systemState,
        last_simulation_tick: now.toISOString(),
      },
    };
  }

  const eventType = adminDirective ? directiveEventType(adminDirective) : weightedEvent(dramaLevel);
  const selectedConversation = pickConversation(snapshot, eventType);
  const newCharacters: CharacterRecord[] = [];
  const newConversations: ConversationRecord[] = [];
  const newParticipants: ConversationParticipantRecord[] = [];
  const seededRelationships: RelationshipRecord[] = [];

  if (eventType === "new_contact") {
    const created = maybeCreateNewContact(snapshot);
    if (created) {
      newCharacters.push(created.character);
      newConversations.push(created.conversation);
      newParticipants.push(...created.participants);
      seededRelationships.push(created.relationship);
    }
  }

  const conversationId =
    newConversations[0]?.id ?? selectedConversation?.id ?? snapshot.conversations[0]?.id;

  if (!conversationId) {
    return null;
  }

  const participants =
    newConversations.length > 0
      ? [
          ...snapshot.characters.filter((character) => character.id === BOB_CHARACTER_ID),
          ...newCharacters,
        ]
      : conversationCharacters(snapshot, conversationId);

  if (participants.length === 0) {
    return null;
  }

  const nonBobRelationshipTypes = participants
    .filter((character) => character.id !== BOB_CHARACTER_ID)
    .map((character) => character.relationship_type);
  const soulTopic =
    Math.random() < clamp(0.28 + multiplier * 0.08, 0.18, 0.52)
      ? pickSoulTopic(
          nonBobRelationshipTypes,
          snapshot.events.length + snapshot.messages.length + dramaLevel,
        )
      : undefined;

  const lastMessage = [...snapshot.messages]
    .filter((message) => message.conversation_id === conversationId)
    .at(-1);
  const baseTime = lastMessage ? addMinutes(new Date(lastMessage.created_at), 1) : now;
  const burstSize = clamp(Math.round(1 + multiplier + Math.random() * multiplier), 1, 4);
  const messages: MessageRecord[] = [];
  const changedRelationships = new Map<string, RelationshipRecord>();
  const updatedAdminDirectives: AdminDirectiveRecord[] = [];

  for (let index = 0; index < burstSize; index += 1) {
    const { sender, recipient } = chooseParticipants(participants, eventType, index);
    const relationship =
      recipient &&
      (linkedRelationship(snapshot, sender.id, recipient.id) ??
        seededRelationships.find(
          (entry) =>
            (entry.character_a === sender.id && entry.character_b === recipient.id) ||
            (entry.character_a === recipient.id && entry.character_b === sender.id),
        ));

    messages.push({
      id: randomUUID(),
      conversation_id: conversationId,
      sender_id: sender.id,
      content:
        adminDirective && index === 0
          ? encodeDirectiveMessage(adminDirective)
          : TextEngine.generateMessage({
              sender,
              recipient,
              relationship: relationship || undefined,
              eventType,
              dramaLevel,
              beatIndex: index,
              soulTopic: soulTopic && index === 0 ? soulTopic : undefined,
            }),
      language: sender.primary_language,
      message_type: "text",
      created_at: addMinutes(baseTime, index).toISOString(),
    });

    const updatedRelationship = shiftRelationship(relationship || undefined, eventType, dramaLevel);
    if (updatedRelationship) {
      changedRelationships.set(updatedRelationship.id, updatedRelationship);
    }
  }

  const otherParticipants = participants.filter((character) => character.id !== BOB_CHARACTER_ID);
  const newAvatars =
    Math.random() < 0.18 * multiplier
      ? [
          updateAvatar(pickOne(otherParticipants, snapshot.messages.length)?.id ?? BOB_CHARACTER_ID, {
            snapshot: {
              ...snapshot,
              characters: [...snapshot.characters, ...newCharacters],
            },
          }),
        ].filter((avatar): avatar is NonNullable<typeof avatar> => Boolean(avatar))
      : [];

  const event: EventRecord = {
    id: randomUUID(),
    type: eventType,
    payload: {
      conversation_id: conversationId,
      burst_size: burstSize,
      summary: `${eventType} triggered in ${conversationId}`,
      soul_topic: soulTopic ?? null,
      soul_label: soulTopic ? BOB_SOUL_FACTS[soulTopic].label : null,
      admin_directive_id: adminDirective?.id ?? null,
      admin_directive_type: adminDirective?.directive_type ?? null,
      admin_directive_title: adminDirective?.title ?? null,
    },
    created_at: now.toISOString(),
  };

  if (adminDirective) {
    updatedAdminDirectives.push({
      ...adminDirective,
      status: "used",
      used_at: now.toISOString(),
    });
  }

  const nextDramaLevel =
    eventType === "conflict"
      ? clamp(dramaLevel + 1, -3, 3)
      : eventType === "check_in"
        ? clamp(dramaLevel - 1, -3, 3)
        : dramaLevel;

  return {
    events: [event],
    messages,
    updatedRelationships: [...seededRelationships, ...Array.from(changedRelationships.values())],
    newAvatars,
    updatedAdminDirectives,
    systemState: {
      id: snapshot.systemState.id || seedIds.systemState,
      drama_level: nextDramaLevel,
      last_simulation_tick: now.toISOString(),
    },
    newCharacters,
    newParticipants,
    newConversations,
  };
}
