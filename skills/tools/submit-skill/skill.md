---
name: submit-skill
description: >
  Submit a Claude Code skill to the RL Skills Library at rl-skills-library.vercel.app.
  Use when: "/submit-skill", "publish this skill", "add this to the library",
  "submit to the skills library", "post this skill to the library".
  Accepts a path to a skill directory or SKILL.md file as the argument.
  With no argument, looks for a SKILL.md in the current session context.
allowed-tools: Read, Bash
argument-hint: <path-to-skill-directory-or-SKILL.md>
---

## Purpose

Publish a Claude Code skill file to the RL Skills Library so teammates can discover, download, and use it. Submits directly via the library API — no web form needed.

Library URL: https://rl-skills-library.vercel.app

---

## Step 1 — Locate the skill file

If `$ARGUMENTS` is provided:
- If it ends in `.md` → read that file directly
- If it's a directory path → read `{path}/SKILL.md`

If no argument → look for a SKILL.md among recently read or edited files in the session. If none found, ask the user: "Which skill do you want to submit? Provide the path to the SKILL.md or skill directory."

Use the `Read` tool to load the file.

---

## Step 2 — Extract metadata

Parse the YAML frontmatter (between `---` delimiters):

- **Skill name**: Take the `name` field. Convert hyphens to spaces and title-case it (e.g. `submit-skill` → `Submit Skill`).
- **Description**: Take the `description` field. Use only the first sentence — stop at the first period or before "Use when:" if present. Keep it under 120 characters.

If frontmatter is missing or incomplete, infer name and description from the file's heading and first paragraph.

---

## Step 3 — Infer category

Map to one of these values based on what the skill does:

| Value | Use for |
|---|---|
| `email` | Gmail, email drafting, email management |
| `calendar` | Google Calendar, scheduling, meetings |
| `research` | Web search, information gathering, summarization |
| `rocketlane` | Anything Rocketlane-specific (projects, tasks, time entries) |
| `writing` | Docs, blog posts, content editing, Notion |
| `data` | Spreadsheets, analysis, CSV, reporting |
| `communication` | Slack, messaging, team communication |
| `tools` | Dev utilities, meta-skills, anything that doesn't fit above |

---

## Step 4 — Generate tags

Produce 3–6 lowercase tags describing the skill's purpose and key tools. Examples: `email`, `gmail`, `drafting`, `rocketlane`, `time-tracking`, `notion`, `slack`.

---

## Step 5 — Confirm with user

Before submitting, show a confirmation block:

```
READY TO PUBLISH TO RL SKILLS LIBRARY

  Name:        {skill name}
  Category:    {category}
  Description: {description}
  Tags:        {tag1}, {tag2}, ...
  Author:      {github username}

Submit? (yes / edit details)
```

If the author's GitHub username isn't known from the session, ask for it. Default: `asomer-1`.

If the user wants to change anything, update the values before proceeding.

---

## Step 6 — Submit via API

Use the `Bash` tool to POST to the library. Use Python to build the JSON payload safely (avoids quoting issues with multiline skill content):

```bash
python3 - <<'PYEOF'
import json, subprocess, sys

skill_path = "REPLACE_WITH_ACTUAL_PATH"

with open(skill_path, 'r') as f:
    content = f.read()

payload = {
    "skill_name": "REPLACE_WITH_NAME",
    "description": "REPLACE_WITH_DESCRIPTION",
    "category": "REPLACE_WITH_CATEGORY",
    "content": content,
    "tags": ["REPLACE", "WITH", "TAGS"],
    "submitter_github": "REPLACE_WITH_GITHUB"
}

result = subprocess.run(
    ["curl", "-s", "-X", "POST",
     "https://rl-skills-library.vercel.app/api/submit",
     "-H", "Content-Type: application/json",
     "-d", json.dumps(payload)],
    capture_output=True, text=True
)
print(result.stdout)
PYEOF
```

Replace all `REPLACE_WITH_*` values with the actual metadata before running.

---

## Step 7 — Report result

Parse the JSON response:

- **Success** (`{"ok": true, "slug": "..."}`)
  → Report: `Published! View it at: https://rl-skills-library.vercel.app/skills/{slug with / replaced by --}`
  → The slug format in the URL uses `--` instead of `/` (e.g. `tools/submit-skill` → `tools--submit-skill`)

- **Error** (`{"error": "..."}`)
  → Show the error message
  → If the error is a duplicate name conflict, suggest appending a version number (e.g. "Submit Skill v2") and retry
  → For any other error, show the raw message and suggest checking https://rl-skills-library.vercel.app/submit manually as a fallback
