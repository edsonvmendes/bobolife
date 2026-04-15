do $$
begin
  if not exists (select 1 from pg_type where typname = 'admin_directive_type') then
    create type public.admin_directive_type as enum ('whisper', 'theme');
  end if;

  if not exists (select 1 from pg_type where typname = 'admin_directive_status') then
    create type public.admin_directive_status as enum ('pending', 'used', 'archived');
  end if;
end $$;

create table if not exists public.admin_directives (
  id uuid primary key default gen_random_uuid(),
  directive_type public.admin_directive_type not null,
  title text not null,
  prompt text not null,
  status public.admin_directive_status not null default 'pending',
  source text not null default 'admin',
  priority integer not null default 3 check (priority between 1 and 5),
  created_at timestamptz not null default now(),
  used_at timestamptz
);

create index if not exists admin_directives_status_priority_idx
  on public.admin_directives (status, priority desc, created_at desc);

alter table public.admin_directives enable row level security;

drop policy if exists "admin_directives public access" on public.admin_directives;
create policy "admin_directives public access"
  on public.admin_directives
  for all
  using (true)
  with check (true);
