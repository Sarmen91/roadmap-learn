---
name: roadmap-navigator
description: Tells the user what to read, learn, or build next on their roadmap, anchored to their current stage and unchecked acceptance criteria. Use when the user asks "what's next", "what should I do", "what should I read", "what feature should I add", "where am I", or types /next.
---

# Roadmap navigator

Answer **"what should I do next?"** in 5-10 lines, grounded in the user's real progress.

## Workflow

1. **Read** `learning-state/config.md` to find the `roadmap_file`. If it's missing, tell the user to run `/start-roadmap` first.

2. **Read** `learning-state/progress.md`. Identify:
   - Current `Stage` and `Week`
   - First unchecked acceptance criterion in the current stage (matched by `<!-- ac:sN-M -->` anchor)
   - Whether blog post / self-check are still open for completed stages

3. **Read** the relevant stage section in `<roadmap_file>` by grepping for `<!-- stage:N -->`. Read from that anchor up to the next `<!-- stage:N+1 -->` (or end of file).

4. **Choose ONE concrete next action** in this priority order:
   1. Unfinished blog post or self-check from a previously completed stage (don't let them leak)
   2. The next unchecked acceptance criterion of the current stage
   3. The next item in the stage's `Build` block
   4. The current habit cycle (paper due? feynman pass due? flashcard review due?)

5. **Output** in this format:

```
## Where you are
Stage <N>, Week <W> · <stage theme>
Last activity: <from progress.md or "none">

## Next action
**<verb-first one-liner>** — <2 sentences of context>

Why this and not something else: <one sentence trade-off>

## What "done" looks like
- [ ] <concrete check 1>
- [ ] <concrete check 2>

## After this you'll unlock
<next item teased, one sentence>
```

6. **Offer a follow-up** menu (don't auto-execute):
   - `quiz me on this section` → triggers `quiz-runner`
   - `explain <concept> at depth N` → triggers `concept-explainer`
   - `write the ADR for this choice` → triggers `adr-writer`
   - `log what I just did` → triggers `progress-tracker`

## Variants

- **"what should I read next"** → bias toward the stage's `Required reading` block + the next paper in `papers.md`.
- **"what feature should I add"** → bias toward the next acceptance criterion or item in the stage's `Build` block.
- **"start me up for the session"** → print Where-you-are + 3 candidate next actions (with time estimates), let the user pick.

## Rules

- **One next action**, not a list. The whole point is to remove decision fatigue.
- **Never invent acceptance criteria.** Quote them verbatim from the roadmap.
- If multiple stages are partially done, surface the leak ("Stage N-1 blog post still open — write it before continuing Stage N") instead of advancing.
- If the user has logged nothing for 3+ days, gently surface that and suggest `weekly-review`.
- **Anchor lookup, not line numbers.** If you can't find `<!-- stage:N -->` in the roadmap, fail loudly — the roadmap is out of sync with config and `bootstrap-state` needs a re-run.
