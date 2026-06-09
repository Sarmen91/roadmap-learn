# agent-bundle

The non-skill half of the platform: rules (always-on behavioral guidance) and session hooks. The `skills` CLI does **not** install this folder — the `start-roadmap` skill materializes it into your agent's native format on first run.

## Single source of truth, per-agent adapters

There is exactly one copy of every rule and one hook script. No symlinks (they require admin/Developer Mode on Windows and can't transform formats anyway). Instead, the installing skill — which is an LLM — copies or transforms at install time:

```
agent-bundle/
  rules/                  canonical rules (.mdc = markdown + frontmatter)
  session-rituals.md      instructions-based replacement for hooks
  hooks/
    load-progress.mjs     cross-platform Node hook script (deterministic option)
  cursor/hooks.json       Cursor hook config (prompt hooks, default)
  claude/settings-hooks.json   Claude Code hook config (SessionStart command hook)
```

## Install matrix

| | Cursor | Claude Code | Codex CLI |
|---|---|---|---|
| **Rules** | `rules/*.mdc` → `.cursor/rules/` (verbatim copy) | rule bodies (frontmatter stripped) → managed block in `CLAUDE.md` | rule bodies (frontmatter stripped) → managed block in `AGENTS.md` |
| **Session-start orientation** | `cursor/hooks.json` → `.cursor/hooks.json` (prompt hook) | `claude/settings-hooks.json` merged into `.claude/settings.json` + `hooks/load-progress.mjs` → `.claude/hooks/` | `session-rituals.md` → managed block in `AGENTS.md` |
| **Journal nudge on stop** | `cursor/hooks.json` (prompt hook) | `session-rituals.md` "end of session" section → `CLAUDE.md` block | same `AGENTS.md` block |

Why the differences:

- **Cursor** supports prompt-type hooks — portable, no process spawned, no runtime dependency.
- **Claude Code** `SessionStart` hooks only support `command` type, so it runs the Node script (`--agent=claude` switches the output JSON shape). Its `Stop` hooks are allow/block decisions that can't surface a message to the user, so the journal nudge lives in `CLAUDE.md` instead. (Cursor's `stop` hook can't append to the just-finished response either — stop hooks fire after it — but it can send the nudge as a one-line follow-up message, which is why the hook still carries it on Cursor.)
- **Codex CLI** hooks are experimental (feature-flagged) and their output is not injected into model context — so both rituals are plain instructions in `AGENTS.md`.

The managed blocks in `CLAUDE.md` / `AGENTS.md` are delimited with `<!-- roadmap-learn:start -->` / `<!-- roadmap-learn:end -->` markers so re-installs replace the block without touching your own content.

## Why Node for the hook script?

The package is installed via `npx skills`, so Node is guaranteed present on every machine that got this far — unlike PowerShell on mac/Linux or bash on Windows. One script, three OSes, two agents.
