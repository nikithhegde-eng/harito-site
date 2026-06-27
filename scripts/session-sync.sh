#!/usr/bin/env sh
set -eu

note="${*:-Session progress updated.}"
today="$(date +%Y-%m-%d)"

cat >> PROJECT_LOG.md <<EOF

## ${today}

- ${note}
EOF

cat > HANDOFF.md.tmp <<EOF
# Harito Handoff

Last updated: ${today}

## Current State

- The project is connected to GitHub at \`https://github.com/nikithhegde-eng/harito-site\`.
- Use \`PROJECT_CONTEXT.md\`, \`PROJECT_LOG.md\`, \`SYNC_PROTOCOL.md\`, \`CLAUDE.md\`, and \`AGENTS.md\` to sync Codex and Claude work.
- Runtime order data is ignored through \`data/*.json\`.

## Latest Session Note

${note}

## Next Recommended Work

- Pull latest \`main\` before starting in Codex or Claude.
- Keep checkout, payment, vendor, delivery, and return changes aligned with backend APIs.
- Commit and push after each meaningful session when GitHub authentication is available.

## Session Rule

At the end of every Codex or Claude session, update this file and \`PROJECT_LOG.md\`.
Do not paste full chat transcripts into the repo.
EOF

mv HANDOFF.md.tmp HANDOFF.md

echo "Updated HANDOFF.md and PROJECT_LOG.md"
