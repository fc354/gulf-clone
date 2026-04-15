# Gulfkeeper Clone Starter

A clean Next.js + Supabase starter for building a Gulfkeeper-style site with city pages, live updates, a rumor checker, and AI-assisted summaries.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres
- OpenAI API

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Configure Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/001_init.sql`.
3. Run `supabase/seed.sql`.
4. Fill in `.env.local`.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
CRON_SECRET=
SITE_URL=http://localhost:3000
```

## Useful scripts

```bash
npm run dev
npm run ingest
npm run generate:snapshots
npm run build
```

## Deploy

- Frontend and API: Vercel
- Database: Supabase
- DNS: Cloudflare

## What is included

- Homepage with city risk cards
- City detail pages
- `/api/cities`
- `/api/cities/[slug]`
- `/api/cities/[slug]/updates`
- `/api/rumor-check`
- `/api/chat`
- Supabase schema and seed data
- Ingestion and snapshot generation scripts

## What to customize next

- Replace demo article fetchers with real RSS, news, or search APIs
- Add authentication and admin tooling
- Improve scoring logic and source weighting
- Add social card generation and analytics
