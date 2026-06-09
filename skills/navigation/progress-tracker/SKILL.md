---
name: progress-tracker
description: Updates learning-state/progress.md and journal.md when the user logs work, completes an acceptance criterion, starts a new week, or hits a blocker. Use when the user says "log today", "I just finished X", "I'm stuck on Y", "starting week N", "mark X done", or types /log.
---

# Progress tracker

Primary owner of `learning-state/progress.md`, `journal.md`, and `changed-mind.md`. A few skills write narrow, documented sections directly (`stage-gate`: stage status lines; `quiz-grader`: Latest scores; `adr-writer` / `blog-post-coach`: their deliverable lines; `weekly-review` / `feynman-coach` / `source-code-reader`: journal entries) — everything else routes through this skill.

## Routing

| User intent | Action |
|---|---|
| "log today" / "/log" / "I just did X" | → **Daily log** workflow |
| "mark <criterion> done" / "I shipped <X>" | → **Update progress.md** workflow |
| "starting week N" / "moving to stage N" | → **Stage/week transition** workflow |
| "I'm stuck on X" / "blocker:" | → **Blocker** workflow |
| "I used to think X, now I think Y" | → **Changed-mind** workflow |

## Daily log workflow

1. Ask (one line, only the missing fields):
   - What did you work on today? (one sentence)
   - What shipped? (commits / files / deploys, or "nothing yet")
   - Two things you learned?
   - Friction?
   - One next action for tomorrow?
   - Hours worked? (rough)
2. **Prepend** an entry to `learning-state/journal.md` using the entry template at the top of that file. Use today's date in `YYYY-MM-DD`.
3. Update `progress.md` → `Last activity: <one-line summary>` (today's date).
4. If the user shipped something matching an acceptance criterion verbatim, ask: _"Should I check off `<criterion>` in progress.md? (need evidence link first)"_

## Update progress.md workflow

To check off an acceptance criterion, **demand evidence first**:

- a commit SHA or PR link, OR
- a file path that proves it, OR
- a public URL (for "deployed" criteria), OR
- a screenshot path (for "observable" criteria)

If the user can't provide evidence, **do not check it off**. Instead change `[ ]` to `[!]` (evidence needed) and add a row under "Blockers / open questions".

When checking off, **find the row by its `<!-- ac:sN-M -->` anchor**, change `[ ]` to `[x]`, and append the evidence inline:

`<!-- ac:s1-1 --> - [x] App deployed at public URL — https://example.fly.dev (YYYY-MM-DD)`

## Stage/week transition workflow

1. Confirm the previous stage passed `stage-gate` (its hard gates: AC evidence, blog post, self-check quiz). Block the transition if it hasn't been gated.
2. Update `Current state` block in `progress.md` (Stage, Week, project version target from the roadmap's `<!-- stage:N project=... -->` anchor metadata).
3. If transitioning to a new stage, the new stage's acceptance criteria should already exist in `progress.md` (written by `bootstrap-state`). If they don't, re-run `/bootstrap-state` rather than copying by hand.

## Blocker workflow

Append under `## Blockers / open questions`:

```
- **<date>** · stage <N> · <one-line blocker>
  - Tried: <what>
  - Hypothesis: <best guess>
  - Need: <what would unblock>
```

Offer to schedule a `concept-explainer` or `source-code-reader` session for the blocker.

## Changed-mind workflow

Walk through the template at the top of `learning-state/changed-mind.md` (4 lines: used to think / now think / what changed my mind / implication). Prepend the new entry.

## Rules

- **Never silently rewrite history.** Use append/prepend. Never delete entries.
- **Never check off an acceptance criterion without evidence.**
- **Match by anchor, not by text.** When you find the AC to check off, use the `<!-- ac:sN-M -->` ID — the criterion text may have been edited.
- Keep journal entries short. If the user dumps a paragraph, compress to the template.
