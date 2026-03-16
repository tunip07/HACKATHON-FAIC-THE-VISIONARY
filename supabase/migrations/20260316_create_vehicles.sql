create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  vehicle_name text not null,
  license_plate text not null,
  license_plate_normalized text not null,
  status text not null default 'active',
  face_photo_path text,
  face_photo_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.vehicles add column if not exists vehicle_name text;
alter table public.vehicles add column if not exists license_plate text;
alter table public.vehicles add column if not exists license_plate_normalized text;
alter table public.vehicles add column if not exists status text default 'active';
alter table public.vehicles add column if not exists face_photo_path text;
alter table public.vehicles add column if not exists face_photo_url text;
alter table public.vehicles add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.vehicles add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.vehicles
set
  vehicle_name = coalesce(nullif(vehicle_name, ''), 'Xe cua toi'),
  license_plate_normalized = upper(regexp_replace(coalesce(license_plate, ''), '[^A-Za-z0-9]', '', 'g')),
  status = case
    when status in ('active', 'inactive') then status
    else 'active'
  end
where
  vehicle_name is null
  or vehicle_name = ''
  or license_plate_normalized is null
  or license_plate_normalized = ''
  or status is null
  or status not in ('active', 'inactive');

alter table public.vehicles
  alter column vehicle_name set not null,
  alter column license_plate set not null,
  alter column license_plate_normalized set not null,
  alter column status set not null,
  alter column status set default 'active';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vehicles_status_check'
  ) then
    alter table public.vehicles
      add constraint vehicles_status_check check (status in ('active', 'inactive'));
  end if;
end
$$;

create index if not exists vehicles_user_id_idx on public.vehicles (user_id);
create index if not exists vehicles_license_plate_normalized_idx on public.vehicles (license_plate_normalized);

alter table public.vehicles enable row level security;

drop trigger if exists set_vehicles_updated_at on public.vehicles;
create trigger set_vehicles_updated_at
before update on public.vehicles
for each row
execute function public.set_current_timestamp_updated_at();

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'vehicles'
      and policyname = 'vehicles_select_own'
  ) then
    create policy vehicles_select_own
      on public.vehicles
      for select
      to authenticated
      using (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'vehicles'
      and policyname = 'vehicles_insert_own'
  ) then
    create policy vehicles_insert_own
      on public.vehicles
      for insert
      to authenticated
      with check (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'vehicles'
      and policyname = 'vehicles_update_own'
  ) then
    create policy vehicles_update_own
      on public.vehicles
      for update
      to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'vehicles'
      and policyname = 'vehicles_delete_own'
  ) then
    create policy vehicles_delete_own
      on public.vehicles
      for delete
      to authenticated
      using (auth.uid() = user_id);
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'face-photo',
  'face-photo',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'face_photo_upload_own'
  ) then
    create policy face_photo_upload_own
      on storage.objects
      for insert
      to authenticated
      with check (
        bucket_id = 'face-photo'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'face_photo_update_own'
  ) then
    create policy face_photo_update_own
      on storage.objects
      for update
      to authenticated
      using (
        bucket_id = 'face-photo'
        and (storage.foldername(name))[1] = auth.uid()::text
      )
      with check (
        bucket_id = 'face-photo'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'face_photo_delete_own'
  ) then
    create policy face_photo_delete_own
      on storage.objects
      for delete
      to authenticated
      using (
        bucket_id = 'face-photo'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end
$$;
