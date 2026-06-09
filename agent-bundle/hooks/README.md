# Hooks

Per-agent hook wiring is described in [../README.md](../README.md) (install matrix). This folder holds the one shared script.

## Cursor (default: prompt hooks, in `../cursor/hooks.json`)

| Event | Type | What it does |
|---|---|---|
| `sessionStart` | `prompt` | Reads `progress.md` and gives you a 5-line orientation when a chat opens |
| `stop` | `prompt` | If you didn't journal today and did substantive work, suggests `/log today` |

Prompt-type hooks don't spawn a process, so they're portable across Windows / mac / Linux and never break because something isn't on `PATH`. They cost one extra LLM call per fire (~10-15 sec); the deterministic alternative is `load-progress.mjs` (below).

## `load-progress.mjs` — deterministic, cross-platform, cross-agent

One Node script (Node is guaranteed: the package was installed via `npx skills`). It reads `learning-state/progress.md` and emits session-start context in the shape the calling agent expects:

| Invocation | Output shape | Consumed by |
|---|---|---|
| `node <path>/load-progress.mjs --agent=cursor` | `{"additional_context": "..."}` | `.cursor/hooks.json` |
| `node <path>/load-progress.mjs --agent=claude` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "..."}}` | `.claude/settings.json` |

### Switching Cursor's `sessionStart` to the deterministic script (optional)

Replace the `sessionStart` block in `.cursor/hooks.json` with:

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [
      {
        "command": "node .cursor/hooks/load-progress.mjs --agent=cursor",
        "timeout": 5
      }
    ]
  }
}
```

(The installer copies `load-progress.mjs` into `.cursor/hooks/` either way, so this is a one-line swap.)

### Claude Code

`../claude/settings-hooks.json` already wires `SessionStart` to `node .claude/hooks/load-progress.mjs --agent=claude`. Claude Code will ask you to trust the hook on first run — that's expected.

### Codex CLI

No hook wiring: Codex hooks are experimental and their output is not injected into model context. The equivalent behavior is installed as instructions in `AGENTS.md` (see `../session-rituals.md`).

## Adding more hooks (Cursor)

See `~/.cursor/skills-cursor/create-hook/SKILL.md` for the full event catalog and output schemas. Good candidates for this project:

- `afterFileEdit` matched on `learning-state/progress.md` → automatically `git diff` and require a journal entry.
- `beforeShellExecution` matched on `git commit` → enforce that any commit references a roadmap stage/section.
- `subagentStop` → if you delegated a long task to a subagent (e.g. `mock-interviewer`), automatically run `quiz-grader` next.
