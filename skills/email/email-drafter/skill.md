# Email Drafter

Draft professional emails from a brief prompt. Handles tone, subject line, and sign-off automatically.

## Trigger

Use when the user says `/email-drafter`, "draft an email", "write an email to", or "help me email".

## Usage

```
/email-drafter [brief description of what the email should accomplish]
```

**Examples:**
- `/email-drafter follow up with John on the Q2 proposal we sent last week`
- `/email-drafter decline a meeting request politely, I'm overbooked this week`
- `/email-drafter thank the customer for the positive review they left on G2`

## Instructions

1. Read the user's prompt carefully. Extract: recipient context, intent, tone required, any specific facts to include.
2. Draft the email with:
   - **Subject line**: specific, not generic ("Following up on Q2 proposal" not "Follow up")
   - **Greeting**: match formality to context (Hi [Name] for warm, Dear [Name] for formal)
   - **Body**: 2–4 short paragraphs. Lead with the key point. No filler openers ("I hope this email finds you well").
   - **CTA**: one clear next step if appropriate
   - **Sign-off**: match tone. Default to "Best," for internal, "Thanks," for follow-ups, "Sincerely," for formal.
3. Present the draft inside a code block so the user can copy it cleanly.
4. Below the draft, offer 1–2 quick variants if the tone could reasonably go either way (e.g. more direct vs. softer).

## Output Format

```
**Subject:** [subject line]

[greeting],

[body]

[sign-off],
[Name]
```

Then: "Want me to adjust the tone, add specific details, or create a Gmail draft directly?"

## Notes

- Never write "I am writing to..." or "I hope this finds you well" — these are banned openers.
- Keep emails under 150 words unless the user explicitly needs more.
- If the user pastes an existing email thread, match the established tone of that thread.
