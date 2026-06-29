# RL Skills Library

A browseable library of Claude Code skills for the Rocketlane team. Browse, submit, vote, download, and version-track skills — all without logging in.

**Live:** <https://rl-skills-library.vercel.app>

---

## What it is

Internal tool for sharing Claude Code skill files across the team. Skills are SKILL.md files that teach Claude how to perform a specific task. The library makes them discoverable, downloadable, and versioned.

---

## Features

- **Browse** — search, filter by category and tag, sort by upload date / downloads / votes / A–Z
- **Skill detail** — view full skill file content, download .md, copy to clipboard
- **Submit** — web form or `/submit-skill` Claude Code skill publishes directly to the library (live immediately)
- **Versioning** — updating an existing skill bumps the minor version and preserves all prior releases in a Version History table on the skill page
- **Voting** — anonymous upvote per skill (localStorage-based, no login required)
- **Download counter** — every .md download increments the skill's download count
- **Light/dark mode** — pill toggle in nav bar, persists to localStorage
- **How to Install Skills** — dedicated guide page at `/how-to-install`

---

## Stack

| Layer      | Tool                                                 |
| ---------- | ---------------------------------------------------- |
| Frontend   | Next.js 16.2.9 (App Router) on Vercel                |
| Database   | Supabase (Postgres) — skills, tags, votes, versions  |
| Deployment | Vercel — manual deploy via CLI (`npx vercel --prod`) |

---

## Submitting a skill

**Option 1 — Web form**
Go to <https://rl-skills-library.vercel.app/submit> and fill in the form. If a skill with that name already exists, you'll be prompted to update it (creates a new version, preserves the old one).

**Option 2 — `/submit-skill` Claude Code skill**
Install the skill from the library, then run `/submit-skill` from any session with a SKILL.md file in context. Handles conflict detection and version bumping automatically.

---

## Supabase schema

Key tables:

| Table                 | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `skills`              | Current version of every skill (metadata + content) |
| `skill_versions`      | Snapshot of each prior version on update            |
| `tags` / `skill_tags` | Many-to-many tag relationship                       |
| `votes`               | One vote per localStorage ID per skill              |

View: `skills_with_tags` — used by all read queries, includes `download_count`.

---

## Local development

```bash
cp .env.example .env.local
# fill in:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY

npm install
npm run dev
```

---

## Deployment

```bash
cd /Users/austinsomer/rl-skills-library
npx vercel --prod
```

Vercel project: <https://vercel.com/rocketlane1/rl-skills-library>

---

## Categories

`email` · `calendar` · `research` · `rocketlane` · `writing` · `data` · `communication` · `tools`

---

## Design

BMW M design system — near-black canvas (`#000`), Inter 700/300, M tricolor stripe (blue → blue → red) as 4px brand dividers, 0px radius everywhere, uppercase 1.5px letterspaced labels.
