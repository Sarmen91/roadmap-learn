---
name: stage-gate
description: Walks through a stage's acceptance criteria one at a time, demands evidence (commit/PR/URL/file), refuses to mark the stage done until every criterion has evidence + blog post + self-check pass. Use when the user says "gate stage N", "check stage N is done", "can I finish stage N", "am I done with stage N", or types /stage-gate.
---

# Stage gate

The bouncer. Prevents the user from declaring a stage "done" without the senior-signal artifacts.

## Definition of done (per stage)

A stage is **done** only when ALL of these are true:

1. **Every acceptance criterion** in the stage's roadmap section is checked `[x]` in `progress.md` with **inline evidence**.
2. **Blog post** drafted (file path or URL recorded).
3. **Self-check quiz**: the **most recent** graded run for this stage scores >= 2.5 average. The latest run counts, not the best — a newer, lower-scored run reopens the gate.
4. **>=1 ADR** exists (in `docs/adr/` — file path recorded).
5. **Feynman pass** recorded (habit #2 — a brief note in journal or a recording link).
6. The required external reproduction (habit #6) is logged for this stage.

The user can `--skip` items 4-6 with a written reason ("ADR-skip: reason"), but items 1-3 are **hard gates**.

## Workflow

1. **Ask:** "Gating stage <N>. Read-only check first, or interactive (I walk through each item)?"

2. **Read** `learning-state/config.md` for `roadmap_file`. **Read** the roadmap and grep `<!-- stage:<N> -->` then `<!-- ac:s<N>-* -->` to extract the canonical AC list. **Do not paraphrase** — the AC text is what was approved by the user at `start-roadmap` time.

3. **Read** `learning-state/progress.md` to see current checked state (match by `<!-- ac:sN-M -->` anchor, not by text).

4. **For each criterion**, print:

   ```
   [<status>] <criterion text>
       evidence: <inline link/file/sha or "MISSING">
   ```

5. **For each `MISSING`**, ask interactively:
   _"Evidence for `<criterion>`? (commit sha · PR link · file path · public URL · screenshot path · or 'skip with reason')"_

   - Valid evidence → call `progress-tracker` to check it off with evidence inline.
   - Skip → mark as `[!]` (deferred) with the reason logged under `Blockers / open questions`.
   - No answer → leave as `[ ]`.

6. **Check derived requirements:**
   - Blog post: search the repo for a `docs/blog/<stage>-*.md` OR ask for a URL.
   - Self-check: read `learning-state/assessments/stage-<N>-*.md` files; require the **most recently graded** run to score >= 2.5.
   - ADR: search `docs/adr/` for >=1 file referencing this stage's choice.
   - Feynman pass: grep `journal.md` for `Feynman pass` entries whose `Stage:` line matches this stage.
   - Reproduction: grep `journal.md` for "reproduced" mentions; if an entry doesn't name the stage, confirm with the user which stage it belongs to.

7. **Verdict.** Print one of:

   - **`PASS`** — all hard gates met. Update `progress.md`:
     ```
     ### Stage <N> — ... · status: `[x]` · completed YYYY-MM-DD
     ```
     Print one celebratory line + tee up the next stage.

   - **`SOFT-PASS`** — hard gates met, soft gates skipped with reasons. Same update but add a `## Open follow-ups` note for the soft gates so they don't vanish.

   - **`BLOCKED`** — list every missing item. Refuse to mark done. Suggest the right skill for each:
     - missing acceptance criterion → `progress-tracker` (when evidence ready) or `roadmap-navigator` (if it's still unbuilt)
     - missing blog post → `blog-post-coach`
     - low quiz score → `quiz-runner` (re-take) then `quiz-grader`
     - missing ADR → `adr-writer`

## Sample BLOCKED output

```
Stage <N> — BLOCKED. 3 hard gates missing:

  [!] <acceptance criterion text>
      → Run `roadmap-navigator` and ship the test case.

  [ ] Blog post: "<title from roadmap>"
      → Run `blog-post-coach <N>` to scaffold the draft.

  [ ] Self-check quiz never run (latest graded run must average >= 2.5)
      → Run `quiz-runner stage <N> --mode=strict`.

Soft gates: 1 ADR exists, Feynman not logged, reproduction not logged.
```

## Rules

- **Never PASS without evidence on every hard gate.** A "yes I did it" without evidence does not count.
- **Always quote the criterion text verbatim** from the roadmap. Do not paraphrase.
- **Never close a stage that has a more recent, lower-scored quiz.** Use the latest, not the best.
- **Match by `<!-- ac:sN-M -->` anchor.** Text drift between roadmap and progress.md should not break the gate.
- This skill **writes** to `progress.md`. It's allowed; it owns the `status:` line transitions specifically.
