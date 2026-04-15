create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'character_language') then
    create type public.character_language as enum ('pt', 'es', 'en', 'fr');
  end if;

  if not exists (select 1 from pg_type where typname = 'relationship_type') then
    create type public.relationship_type as enum ('self', 'mother', 'father', 'friend', 'girlfriend', 'crush', 'ex', 'teacher', 'sibling');
  end if;

  if not exists (select 1 from pg_type where typname = 'conversation_type') then
    create type public.conversation_type as enum ('direct', 'group');
  end if;

  if not exists (select 1 from pg_type where typname = 'message_kind') then
    create type public.message_kind as enum ('text', 'system');
  end if;

  if not exists (select 1 from pg_type where typname = 'event_type') then
    create type public.event_type as enum ('conflict', 'romance', 'group_event', 'new_contact', 'check_in', 'academic');
  end if;

  if not exists (select 1 from pg_type where typname = 'relationship_status') then
    create type public.relationship_status as enum ('active', 'broken', 'unstable');
  end if;
end $$;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  primary_language public.character_language not null,
  secondary_languages text[] not null default '{}',
  relationship_type public.relationship_type not null,
  personality_profile jsonb not null default '{}'::jsonb,
  response_style jsonb not null default '{}'::jsonb,
  visual_profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type public.conversation_type not null,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  character_id uuid not null references public.characters(id) on delete cascade,
  unique (conversation_id, character_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.characters(id) on delete cascade,
  content text not null,
  language public.character_language not null,
  message_type public.message_kind not null default 'text',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  type public.event_type not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.relationships (
  id uuid primary key default gen_random_uuid(),
  character_a uuid not null references public.characters(id) on delete cascade,
  character_b uuid not null references public.characters(id) on delete cascade,
  affinity integer not null default 50 check (affinity between 0 and 100),
  trust integer not null default 50 check (trust between 0 and 100),
  jealousy integer not null default 0 check (jealousy between 0 and 100),
  status public.relationship_status not null default 'active',
  updated_at timestamptz not null default now(),
  unique (character_a, character_b),
  check (character_a <> character_b)
);

create table if not exists public.avatars (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  image_url text not null,
  prompt_used text not null,
  context_tag text not null,
  created_at timestamptz not null default now(),
  is_active boolean not null default true
);

create table if not exists public.system_state (
  id uuid primary key default gen_random_uuid(),
  drama_level integer not null default 0 check (drama_level between -3 and 3),
  last_simulation_tick timestamptz not null default now()
);

create index if not exists messages_conversation_created_at_idx
  on public.messages (conversation_id, created_at desc);

create index if not exists conversation_participants_conversation_idx
  on public.conversation_participants (conversation_id);

create index if not exists avatars_character_active_idx
  on public.avatars (character_id, is_active);

create index if not exists relationships_pair_idx
  on public.relationships (character_a, character_b);

alter table public.users enable row level security;
alter table public.characters enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.events enable row level security;
alter table public.relationships enable row level security;
alter table public.avatars enable row level security;
alter table public.system_state enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'users',
    'characters',
    'conversations',
    'conversation_participants',
    'messages',
    'events',
    'relationships',
    'avatars',
    'system_state'
  ]
  loop
    execute format('drop policy if exists "%s public access" on public.%I', table_name, table_name);
    execute format(
      'create policy "%s public access" on public.%I for all using (true) with check (true)',
      table_name,
      table_name
    );
  end loop;
end $$;

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.system_state;
alter publication supabase_realtime add table public.avatars;
