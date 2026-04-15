create extension if not exists pgcrypto;

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country text not null,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null,
  title text not null,
  url text not null unique,
  summary text,
  source_name text,
  published_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references cities(id) on delete cascade,
  article_id uuid references articles(id) on delete set null,
  category text,
  severity_score int not null default 20,
  confidence numeric(4,3),
  summary text,
  created_at timestamptz not null default now()
);

create table if not exists city_snapshots (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references cities(id) on delete cascade,
  score int not null,
  level text not null check (level in ('low','medium','high')),
  summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists rumor_checks (
  id uuid primary key default gen_random_uuid(),
  claim text not null,
  verdict text not null,
  confidence numeric(4,3),
  explanation text not null,
  created_at timestamptz not null default now()
);

create or replace view city_snapshots_view as
select
  c.id,
  c.slug,
  c.name,
  c.country,
  s.level,
  s.score,
  s.summary,
  s.created_at as updated_at
from cities c
join lateral (
  select * from city_snapshots cs
  where cs.city_id = c.id
  order by cs.created_at desc
  limit 1
) s on true;

create or replace view updates_view as
select
  a.id,
  a.city_slug,
  a.title,
  coalesce(e.summary, a.summary) as summary,
  a.source_name,
  a.url as source_url,
  a.published_at,
  case
    when coalesce(e.severity_score, 20) >= 70 then 'high'
    when coalesce(e.severity_score, 20) >= 35 then 'medium'
    else 'low'
  end as severity
from articles a
left join events e on e.article_id = a.id;
