-- Cantonese Trip Prep — review/progress state per phrase.
-- Phrase content itself lives in the app bundle (src/data), not the DB,
-- since it's static seed content you edit in code, not user-generated.
-- This table only stores your SRS scheduling + star state per phrase id.

create table if not exists review_state (
  user_id uuid not null default auth.uid(),
  phrase_id text not null,
  repetitions integer not null default 0,
  interval_days integer not null default 0,
  ease_factor numeric not null default 2.5,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  correct_count integer not null default 0,
  seen_count integer not null default 0,
  starred boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, phrase_id)
);

alter table review_state enable row level security;

create policy "Users manage their own review state"
  on review_state
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at fresh on every write.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger review_state_set_updated_at
  before update on review_state
  for each row
  execute function set_updated_at();
