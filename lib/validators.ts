import { z } from "zod";
import {
  ADMIN_DIRECTIVE_STATUS,
  ADMIN_DIRECTIVE_TYPES,
  CHARACTER_LANGUAGES,
  CONVERSATION_TYPES,
  EVENT_TYPES,
  MESSAGE_TYPES,
  RELATIONSHIP_STATUS,
  RELATIONSHIP_TYPES,
} from "@/lib/constants";

export const characterLanguageSchema = z.enum(CHARACTER_LANGUAGES);
export const relationshipTypeSchema = z.enum(RELATIONSHIP_TYPES);
export const conversationTypeSchema = z.enum(CONVERSATION_TYPES);
export const messageTypeSchema = z.enum(MESSAGE_TYPES);
export const eventTypeSchema = z.enum(EVENT_TYPES);
export const relationshipStatusSchema = z.enum(RELATIONSHIP_STATUS);
export const adminDirectiveTypeSchema = z.enum(ADMIN_DIRECTIVE_TYPES);
export const adminDirectiveStatusSchema = z.enum(ADMIN_DIRECTIVE_STATUS);

export const conversationMessagesQuerySchema = z.object({
  since: z.iso.datetime().optional(),
});

export const conversationRouteSchema = z.object({
  id: z.uuid(),
});

export const tickRequestSchema = z.object({
  force: z.boolean().optional(),
});

export const adminDirectiveCreateSchema = z.object({
  directiveType: adminDirectiveTypeSchema,
  title: z.string().trim().min(3).max(80),
  prompt: z.string().trim().min(6).max(240),
  priority: z.number().int().min(1).max(5).optional(),
});
