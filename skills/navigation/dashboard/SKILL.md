---
name: dashboard
description: Prints a one-shot status view of the user's roadmap journey — current stage, completion %, last scores, flashcard backlog, blocking acceptance criteria, days since last journal entry. Read-only. Use when the user says "show my dashboard", "where am I", "status", "give me an overview", or types /dashboard.
---

# Dashboard

Read-only one-shot status print. Does not write anything.

## Workflow

Read these files in parallel:
- `learning-state/config.md` (for `domain`, `project_name`, `stage_count`, `roadmap_file`)
- `learning-state/progress.md`
- `learning-state/journal.md` (just the top entry)
- `learning-state/confidence-log.md` (just the summary section)
- `learning-state/papers.md`
- `learning-state/flashcards/*.md` (read contents — needed to count cards due today)
- `learning-state/assessments/` (list files; read the most recent)
- the current stage's section of the roadmap (anchor `<!-- stage:N -->`) — needed for the next-action line

Then print **this exact layout** (substitute `<project_name>` from config — uppercase, used as the header banner):

```
┌─ <PROJECT_NAME> JOURNEY ─────────────────────────────────┐
 Stage:        <N> / <stage_count> — <theme>
 Week:         <W> / <range> · <stage version>
 Progress:     <X/Y acceptance criteria> · <pct>%
 Last active:  <date> (<N> days ago)
└────────────────────────────────────────────────────────┘

▌Next action
  <copy from roadmap-navigator's logic — one line>

▌Recent scores
  <stage> · <date> · <mode> · <score>/4 avg
  <stage> · <date> · <mode> · <score>/4 avg

▌Calibration
  Last 5 high-confidence (>=70%) answers: <X>/<5> correct
  → <one-word verdict: well-calibrated | overconfident | underconfident>

▌Open loops (don't let these leak)
  • Stage <N> blog post: <status>
  • Stage <N> self-check: <status>
  • Stage <N> ADR(s): <count>
  • Flashcards due today: <N>
  • Next paper due: <window>

▌Habits this stage
  ADR · Feynman · Source-read · Reproduce-post · <count>/<total> ✓

▌Blockers
  <count from progress.md, or "none">
```

## Rules

- **Read-only.** Never edit any file.
- **Honest counts.** If a habit hasn't been tracked yet, mark it `—` not `0`.
- **No advice section.** Dashboard is a status print; advice belongs in `roadmap-navigator`.
- Compute percentages as `checked / total` of the current stage's acceptance criteria only.
- "Days since last journal entry" is calculated against today's date. Highlight if > 3 days.
