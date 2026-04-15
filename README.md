# Bob Inbox

Bob Inbox is a Next.js MVP that simulates the WhatsApp-like digital life of a fictional character named Bob. Users browse his chats, watch relationships shift, and see a lightweight social engine generate new beats over time.

## Overview

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Zustand
- Backend contract: Supabase Postgres, Realtime-ready schema, Supabase JS client
- Supporting libs: Zod for validation, date-fns for time formatting
- Deployment target: Vercel

The app is intentionally runnable in two modes:

1. Demo mode
   The app boots with an in-memory fallback dataset so the MVP works immediately without local Supabase credentials.
2. Supabase mode
   When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present, the app reads from Supabase and writes simulation ticks back to the database.

### Language model decision

The inbox now uses a user-selected viewing language instead of mixing languages per character inside the same session. Internally the simulation can keep canonical message content, but the UI projects all chat content into one chosen language at a time: Portuguese, English, Spanish, or French.

## Architecture

### Product surfaces

- `/chats`
  Inbox overview with timestamps, unread markers, and active conversation ordering.
- `/chat/[id]`
  Message detail page with grouped bubbles, typing simulation, and a live-updating feed.
- `/admin`
  Separate operator surface for editorial control: whispering in Bob's ear, planting new themes, and forcing simulation ticks. It is intentionally decoupled from the public inbox navigation.

### App layers

- `app/`
  Routes, layout, and API endpoints for conversations and simulation ticks.
- `components/`
  Messaging shell, conversation list, live conversation view, typing indicator, and the private editorial console.
- `hooks/`
  Client feed hook that handles polling, Supabase Realtime, and delayed incremental message reveal.
- `store/`
  Zustand cache for active conversation, message cache, and typing state.
- `lib/`
  Seed universe, Supabase access, repository layer, avatar engine, text engine, validators, and simulation engine.
- `supabase/`
  SQL migration and seed data for the production database shape.

### Architectural decisions

- Demo-first fallback
  The repository layer can switch between Supabase and an in-memory snapshot so the MVP is always runnable.
- Readable simulation over opaque AI
  The current `TextEngine` is deterministic enough to feel distinct per character without requiring an LLM.
- Server-owned world mutation
  The simulation tick runs on the server through `/api/simulation/tick`, keeping relationship and event changes out of the client.
- Incremental reveal on the client
  New messages are staged with fake typing delays even when they arrive instantly from polling or Realtime.
- Public/private UI split
  End users only see the inbox experience. Editorial controls and simulation steering stay in a separate admin route with no public entry point.
- Avatar logic stored as prompts
  The MVP uses placeholder photo URLs now, but stores prompt intent so image generation can be swapped in later.
- Soul-layered simulation
  Bob now has seven recurring personal threads that can surface organically in chats, so conversations feel less like pure plot and more like fragments of a lived life.

## Database model

The Supabase schema includes:

- `users`
- `characters`
- `conversations`
- `conversation_participants`
- `messages`
- `events`
- `relationships`
- `avatars`
- `system_state`

Enums are used for language, conversation type, relationship type, message type, event type, and relationship status. Realtime is enabled for `messages`, `system_state`, and `avatars`.

## Seed universe

The initial seed includes:

- Bob
- Mother
- Father
- 3 siblings
- 2 crushes
- 1 girlfriend
- 1 ex
- 1 teacher
- 4 friends
- 3 groups: family, college, friends

Every seeded character includes:

- distinct personality data
- a primary language
- a response style
- a visual profile
- an active avatar record

## Local run

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/chats
```

### Optional Supabase setup

1. Copy `.env.example` to `.env.local`
2. Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... # optional but recommended for server-side writes
```

3. Apply the SQL files:

- `supabase/migrations/20260414153000_bob_inbox_schema.sql`
- `supabase/seed.sql`

If you use the Supabase CLI, a typical flow is:

```bash
supabase db push
psql "$SUPABASE_DB_URL" -f supabase/seed.sql
```

Adjust that to your own environment if you use hosted Supabase directly.

## How simulation works

The core loop lives in `lib/simulationEngine.ts`.

Each tick:

1. Loads the current world state
2. Reads `drama_level`
3. Converts that into a multiplier via `getDramaMultiplier(level)`
4. Decides whether an event fires
5. Chooses an event type such as `conflict`, `romance`, `group_event`, `check_in`, `academic`, or `new_contact`
6. Generates a burst of new messages
7. Updates relationship trust, affinity, jealousy, and status
8. Optionally rotates an avatar
9. Updates `last_simulation_tick`

### Bob soul threads

The simulation can pull from seven low-key recurring details about Bob's life:

- an old guitar he plays late at night when anxious
- a borrowed book he still has not returned
- his habit of vanishing from chat while still watching stories
- the fact that he almost changed majors once
- a small secret place in the city where he always ends up
- a childhood memory that returns on rainy days
- an archive of old screenshots, voice notes, and photos he never deletes

Effects of `drama_level`:

- higher event frequency
- larger message bursts
- higher conflict intensity
- faster relationship volatility
- slightly higher avatar update chance

## Realtime and update model

- When Supabase is configured, the client subscribes to `messages` inserts through Realtime.
- A polling fallback still runs so the app works in demo mode and stays resilient if Realtime is unavailable.
- Incoming messages are not dumped into the UI immediately. The client shows a typing state and reveals them in sequence.

## AI integration points

This MVP is structured so AI can be added cleanly later:

- `lib/textEngine.ts`
  Replace the stub generator with an LLM-backed narrative engine while preserving the same interface.
- `lib/avatarEngine.ts`
  Swap placeholder URLs for generated media and keep prompt history in `avatars.prompt_used`.
- `lib/simulationEngine.ts`
  Use an AI planner to propose higher-level social events, then validate and persist them deterministically.
- `characters.personality_profile` and `response_style`
  These JSON fields are ready to become prompt context for richer generations.
- `events.payload`
  Can store structured agent decisions, moderation notes, or chain-of-thought summaries that are safe to persist.
- `admin_directives`
  Gives an admin lane for injecting whispers and topical themes, including current-event hooks, without polluting the end-user inbox surface.

## Useful scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`

## Current MVP boundaries

- Read-only inbox experience
- Bob does not manually send messages from the UI yet
- Auth is not required for the MVP, even though the database shape is compatible with adding it
- The simulation engine is rule-based, not LLM-powered
- Admin directives are global for now, not scoped per conversation or per character
- The public UX is intentionally restrained and school-life oriented; avoid turning the seed universe toward heavy or adult-coded topics without adding moderation rules first
