---
name: quiz-grader
description: Grades the most recent quiz or assessment file using the rubric in quiz-runner/rubric.md, writes feedback into the file, updates progress.md scores, and seeds flashcards for missed questions. Use when the user says "grade my quiz", "score my answers", "grade in strict mode", or types /grade.
---

# Quiz grader

Scores assessment files written by `quiz-runner` (and `mock-interviewer`).

## Workflow

1. **Find the target file.** Default = most recently modified file under `learning-state/assessments/` (quiz `stage-*.md` or mock `mock-*.md`). The user can override by naming a file or stage+date.

2. **Read** the file. Confirm `Status: [ ] ungraded` (or `abandoned`). If already graded, ask before re-grading.

3. **Read** the rubric: `<skills_dir>/quiz-runner/rubric.md` (resolve `skills_dir` from `learning-state/config.md`).

4. **Determine grading mode** — file header has `**Mode:**`. The user can override at invocation: _"grade in strict mode"_ takes precedence. If not set anywhere, fall back to `mode:` from `learning-state/config.md`.

5. **Score each question** using the rubric. For each Q<i>, append below the user's answer:

   ```
   **Score:** <0-4>/4 · confidence delta: <predicted% vs actual correctness>
   **Reference answer (compressed):** <2-3 sentences of what a 3-4 looks like, drawn from roadmap context>
   **Gap (if any):** <one bullet>
   **Flashcard candidate?** <yes/no>
   ```

6. **Compute totals** and replace the `## Status` block with:

   ```
   ## Grade — <YYYY-MM-DD HH:MM>
   - Average: <X.X> / 4
   - Distribution: 0:<n> · 1:<n> · 2:<n> · 3:<n> · 4:<n>
   - Mode used: <strict|supportive>
   - Verdict: <one line per rubric>
   - Top gap: <one sentence>
   - Strength: <one sentence>
   ```

7. **Update** `learning-state/progress.md` → `Latest scores` table (use `mock` in the stage column for mock interviews):
   ```
   | <stage> | <YYYY-MM-DD> | <mode> | <avg>/4 | <one-line verdict> |
   ```

8. **Update** `learning-state/confidence-log.md` — append one row per question:
   ```
   | <date> | <stage> | <shorthand> | <pred %> | <0|1, where 1 = score >= 2> | <score> | <mode> |
   ```

9. **Seed flashcards** for every question with score < 3:
   - Hand off to `flashcard-maker` with the question + reference answer + the gap (it owns the card format and IDs).

10. **Calibration check** every 5+ entries: print _"Of your last 5 high-confidence answers (>=70%), X were correct (>= 2/4)."_ and prepend the same line to the `## Summary` section of `learning-state/confidence-log.md` (most recent on top — `dashboard` and `weekly-review` read it from there).

11. **End with one next-step prompt.** Examples:
    - If average >= 3.0: _"Strong. Run `stage-gate <N>` if acceptance criteria are also complete."_
    - If average 2.0-2.9: _"Mid-level pass. Top gap: <X>. Review with `concept-explainer <topic>` then re-quiz in 3 days."_
    - If average < 2.0: _"Below bar. Don't move stage. Run `feynman-coach` on the bottom-scoring concept."_

## Mock interviews (`mock-*.md` files)

Files written by `mock-interviewer` differ from quizzes in three ways:

- Mode is always **strict** (the file header says so; no fallback needed).
- Score each **segment's** Q+A on the same 0-4 rubric (a segment = the question plus its follow-up).
- The verdict line is one of: `Senior · Senior-leaning · Mid · Below mid`, followed by **three concrete follow-up actions**. Use `mock` in the Latest-scores stage column.

## Strict-mode voice (sample)

> Q3 scored 1/4. You said approach X is "better than approach Y". That's an opinion, not an answer. A 3 names the alternative, the trade-off, and the condition. Try again next round.

## Supportive-mode voice (sample)

> Q3 scored 2/4. You correctly named X as the winner — next level is to articulate *what you trade for it*: <one concrete cost>. Flashcard added.

## Rules

- **Never inflate to be nice.** Scoring is the product. If the grader is soft, calibration breaks.
- **Reference answers stay compressed** (<= 3 sentences). They are study material, not lectures.
- **One pass.** Do not iterate scores after writing them; if the user disputes a score, append a note instead of overwriting.
- Quote the rubric line that drove the score (e.g. _"missing 'failure mode' -> cap at 3"_).
