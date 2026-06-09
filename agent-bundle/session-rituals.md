# Session rituals

> Instructions-based replacement for the session hooks. Used where hooks can't inject context into the model (Codex CLI) or as a fallback when hooks are disabled. The installer appends this content into the agent's instructions file (`AGENTS.md` / `CLAUDE.md`) inside the managed block.

## At the start of every session

Silently read `learning-state/progress.md` (only). In <=5 lines, greet the user with: their current Stage and Week, their last activity date, and ONE concrete suggested next action (defer to the roadmap-navigator skill's logic). End with: 'Say "what's next" for a full plan, "dashboard" for full status, or just start working.' Do not invoke any other skills; this is orientation only. If `learning-state/progress.md` does not exist, say so and suggest running the start-roadmap skill.

## At the end of a substantive session

When wrapping up a session in which real work happened (multiple file edits, a quiz, a stage discussion), check `learning-state/journal.md` for an entry dated today. If there is none, append ONE line to your final response: '(tip: run `/log today` to journal this session)'. Otherwise add nothing.
