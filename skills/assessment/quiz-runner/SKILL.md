---
name: quiz-runner
description: Runs an interactive self-check quiz drawn verbatim from a roadmap stage's Self-check section. Captures answers, confidence ratings, and time, then saves to learning-state/assessments/. Use when the user says "quiz me", "self-check", "test me on stage N", "assess me on <topic>", or types /quiz.
---

# Quiz runner

Runs a focused assessment. **Does not grade** — that's `quiz-grader`. This skill's job is clean delivery and clean capture.

## Flags (mode defaults to `mode:` in `learning-state/config.md`; type defaults to `mixed` = quick-checks + 1 trade-off)

| Flag | Effect |
|---|---|
| `--mode=strict` | Senior interviewer voice. Refuses follow-ups, no hints, terse pushback. |
| `--mode=supportive` | Tutor voice. Offers one nudge per question if the user is stuck. |
| `--type=trade-offs` | Only the "Trade-offs you must be able to defend" subsection. |
| `--type=quick` | Only the "Quick-check questions" subsection. |
| `--type=scenario` | Only the scenario walk-through. |
| `--length=N` | Cap to N questions (default 6, max = whole section). |

If the user gave no flags, ask **one** line: _"Strict (interview-style) or supportive (tutor-style)? Default 6 questions from quick-checks + 1 trade-off."_

If `--mode` is unset, fall back to `mode:` from `learning-state/config.md`.

## Workflow

1. **Locate the section.** Read `learning-state/config.md` for `roadmap_file`. Open it, grep for `<!-- selfcheck:s<N> -->`, and read from that anchor up to the next `<!-- ` HTML-comment block (or the end of the stage section).

2. **Compose the question set** based on flags. If `--type` not set: pick 1 trade-off + N-1 quick-checks. Shuffle order. Number them 1..N.

3. **Create the assessment file** before starting:

   Path: `learning-state/assessments/stage-<N>-<YYYY-MM-DD-HHMM>-<mode>.md` (the time component prevents same-day re-takes from colliding)

   ```
   # Stage <N> self-check — <YYYY-MM-DD>
   **Mode:** <strict|supportive>  **Type:** <quick|trade-offs|scenario|mixed>  **Length:** <N>
   **Started:** <ISO timestamp>
   **Source:** <roadmap_file> anchor selfcheck:s<N>

   ## Questions
   _populated below as we go_

   ## Status
   `[ ]` ungraded — run `quiz-grader` to score
   ```

4. **Run the loop** — one question at a time:
   1. Print **Q<i>/<N>:** with the **verbatim** question from the roadmap. Do not paraphrase.
   2. Ask: _"Confidence 0-100% before you answer?"_ (then wait)
   3. User answers.
   4. Append to assessment file:
      ```
      ### Q<i> — <one-line shorthand>
      **Source anchor:** selfcheck:s<N>  **Asked at:** <HH:MM>  **Predicted confidence:** <%>
      **Answer:**
      <user's answer verbatim>
      ```
   5. In **strict mode**: move to next question. No feedback.
      In **supportive mode**: if the user says "hint" or "stuck", give exactly ONE hint, then move on. Note `**Hinted:** yes` in the file.
   6. Repeat for all N.

5. **End** with one summary line + next-step prompt:
   _"<N> captured. Run **`grade my quiz`** to score (strict | supportive)."_

## Rules

- **Verbatim questions.** Do not rewrite the roadmap's quick-checks. They are designed to be cardable.
- **One question on screen at a time.** Don't dump the full list.
- **Capture before correcting.** Even in supportive mode, the answer goes to the file first; commentary comes later from `quiz-grader`.
- **Never grade in this skill.** Resist the urge. Hand off to `quiz-grader`.
- If the user abandons mid-quiz, save what's captured and mark `**Status:** abandoned at Q<i>`.

## Special: scenario walk-throughs

For `--type=scenario`, the question is multi-turn. Use this protocol:

1. Pose the scenario verbatim.
2. Let the user respond.
3. Ask exactly **three** senior-engineer follow-ups (e.g. "what's your latency budget?", "how would you instrument this?", "what's the rollback if your fix is wrong?").
4. Save the full transcript to the assessment file.

## See also

- Scoring rubric: [rubric.md](rubric.md)
- Grader: `quiz-grader`
