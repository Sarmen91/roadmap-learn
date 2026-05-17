# Hooks

Currently active hooks (in `../hooks.json`):

| Event | Type | What it does |
|---|---|---|
| `sessionStart` | `prompt` | Reads `progress.md` and gives you a 5-line orientation when a chat opens |
| `stop` | `prompt` | If you didn't journal today and did substantive work, suggests `/log today` |

## Why prompt hooks (not PowerShell)?

Prompt-type hooks don't spawn a process, so they're portable across Windows / mac / Linux and never break because `python` or `jq` isn't on `$PATH`. They cost one extra LLM call per fire (~10-15 sec); the deterministic alternative is a PowerShell command hook (see below).

## Switching `sessionStart` to a PowerShell command hook (optional, Windows)

If you want deterministic output (no LLM call), use the included `load-progress.ps1`:

1. Replace the `sessionStart` block in `hooks.json` with:

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [
      {
        "command": "powershell -ExecutionPolicy Bypass -File .cursor/hooks/load-progress.ps1",
        "timeout": 5
      }
    ]
  }
}
```

2. The script reads `learning-state/progress.md` and returns a structured `additional_context` JSON.

3. On mac/Linux, port the script to bash / python; same contract.

## Adding more hooks

See `~/.cursor/skills-cursor/create-hook/SKILL.md` for the full event catalog and output schemas. Good candidates for this project:

- `afterFileEdit` matched on `learning-state/progress.md` → automatically `git diff` and require a journal entry.
- `beforeShellExecution` matched on `git commit` → enforce that any commit references a roadmap stage/section.
- `subagentStop` → if you delegated a long task to a subagent (e.g. `mock-interviewer`), automatically run `quiz-grader` next.
