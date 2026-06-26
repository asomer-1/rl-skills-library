# RL Skills Library

A browseable library of Claude Code skills for the Rocketlane team. Built with Next.js, Supabase, and deployed on Vercel.

## Stack

- **Frontend**: Next.js 16 (App Router) on Vercel
- **Database**: Supabase (Postgres) — skill metadata, tags, votes, submissions
- **Storage**: GitHub repo — skill files are the source of truth
- **Auth**: GitHub usernames (no login required for browsing or voting)

## Adding a Skill

1. Create a folder under `skills/[category]/[skill-name]/`
2. Add two files:
   - `meta.yaml` — metadata (name, description, category, author, tags, version)
   - `skill.md` — the actual skill instructions
3. Open a PR. On merge to `main`, a GitHub Action syncs the skill to Supabase and it appears in the library.

See `skills/email/email-drafter/` for an example.

## Categories

`email` · `calendar` · `research` · `rocketlane` · `writing` · `data` · `communication` · `tools`

## Local Development

```bash
cp .env.example .env.local
# fill in Supabase keys
npm install
npm run dev
```

## Database Setup

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor once.

## Deployment

Vercel auto-deploys on push to `main`. Environment variables are set in the Vercel dashboard.
