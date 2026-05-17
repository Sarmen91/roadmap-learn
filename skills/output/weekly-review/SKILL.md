---
name: weekly-review
description: Runs a Friday ritual — reads journal + progress, asks what shipped, what blocked, what changed mind, plan for next week, where confidence was miscalibrated. Outputs a one-page summary. Use when the user says "weekly review", "it's friday", "wrap up the week", "review my week", or types /weekly.
---

# Weekly review

End-of-week ritual. Runs as an interview-style conversation, not a form. Produces a single dated summary at the top of `learning-state/journal.md`.

## Workflow

1. **Read context** (parallel):
   - `learning-state/config.md` (domain, project_name for the summary header)
   - `learning-state/progress.md` (current stage, scores, blockers)
   - `learning-state/journal.md` (this week's entries — last 7 days)
   - `learning-state/confidence-log.md` (recent calibration entries)
   - `learning-state/papers.md` (paper progress)
   - `learning-state/flashcards/*.md` (struggle cards)

2. **Compute and surface (printed first, before asking anything):**

   ```
   ## Week of <YYYY-MM-DD> — auto-summary

   Stage <N>, week <W> of stage
   Days logged this week: <N>/7
   Acceptance criteria checked this week: <N>
   Quizzes taken: <N> · avg score: <X.X>
   Calibration: <on | overconfident by X% | underconfident by X%>
   Flashcards struggled: <count of ease <= 1.7>
   Paper status: <on time | behind by X>
   ```

3. **Then ask, one at a time** (capture verbatim):

   1. _"What's the thing you shipped this week you're most proud of? One sentence."_
   2. _"What's the thing you didn't ship that you said you would? Why didn't it?"_
   3. _"Anything that changed your mind this week — even a small thing? (logs to `changed-mind.md` if yes)"_
   4. _"Where was your confidence wrong this week? (read the confidence-log auto-summary back to them)"_
   5. _"What's the **one** thing for next week?"_ (force a single answer)

4. **Append to `learning-state/journal.md` at the top**, under today's date, as a special entry:

   ```
   ## YYYY-MM-DD — WEEKLY REVIEW · Stage N · Week W
   **Shipped:** <answer 1>
   **Slipped:** <answer 2>
   **Changed mind:** <answer 3> (also logged in changed-mind.md)
   **Calibration:** <answer 4>
   **One thing next week:** <answer 5>
   **Auto-stats:** logged: <N>/7 · ACs: <N> · quizzes: <N> avg <X.X> · cards-struggled: <N>
   ```

5. **If "changed mind" answer is non-trivial**, hand off to `progress-tracker` → changed-mind workflow.

6. **If days logged < 3**, end with a gentle prod:
   _"You logged <N>/7 days. Sustainability beats intensity. Want a session-end journal nudge enabled? (it's already on by default in the hook)"_

7. **End with one suggestion** based on state:

   | If | Suggest |
   |---|---|
   | Avg quiz score < 2.5 | `concept-explainer` + re-quiz on the worst topic |
   | Paper behind by 2+ | `paper-tracker` next pass scheduled in the new week |
   | Stage acceptance >= 80% checked | `stage-gate` early to find what's missing |
   | "One thing" answer is mushy | _"That's too vague. Be more specific — what would 'done' look like?"_ then re-ask |

## Rules

- **Never let the user skip the "one thing" question.** Force a single concrete answer.
- **Never edit prior week's reviews.** Always append a new one.
- **No motivational filler.** ("Great week!") The data is the message.
- This skill runs in ~10 minutes. If it's taking longer, you're being too conversational; tighten up.
