# Codex And Claude Sync Protocol

Use GitHub as the shared source of truth for code and concise project memory. Do not use GitHub as a raw chat archive.

## Start Of Session

1. Pull the latest `main` branch.
2. Read `PROJECT_CONTEXT.md`, `HANDOFF.md`, `PROJECT_LOG.md`, `CLAUDE.md`, and `AGENTS.md`.
3. Check `git status` before editing.
4. If another tool has uncommitted work, inspect it and continue carefully instead of overwriting it.

## During Work

- Keep changes focused on the user request.
- Preserve the Harito visual style and mobile behavior.
- Use backend APIs for order, return, and admin behavior.
- Do not commit `data/*.json`, `.env`, raw chats, credentials, OTPs, or real buyer data.

## End Of Session

1. Update `HANDOFF.md` with the current state and next steps.
2. Add a short dated entry to `PROJECT_LOG.md`.
3. Run relevant checks, especially `node --check` for changed JavaScript files.
4. Commit with a clear message.
5. Push to GitHub when authentication is available.

## Chat Memory Rule

Only summarize decisions, blockers, files changed, and next actions. Never paste raw Codex or Claude chat transcripts into GitHub unless Nikith explicitly reviews and approves the exact content.
