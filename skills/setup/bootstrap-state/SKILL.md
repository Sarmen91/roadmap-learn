---
name: bootstrap-state
description: Stage 0b of the learning platform. Reads `learning-state/config.md` + the user's roadmap, generates all dependent state files (progress, papers, journal, confidence-log, flashcards/, assessments/, notes/) and seeds the domain-specific skill data (mock-interviewer question bank, source-code-reader targets). Run after `/start-roadmap`, or any time you've meaningfully restructured the roadmap. Use when the user says "bootstrap state", "generate the rest", "/bootstrap-state".
disable-model-invocation: true
---

# Bootstrap state

The "generate dependent files" step. Parses the roadmap by stable anchors and writes the rest of the platform.

This skill is **idempotent**: re-running it preserves user-owned state (checkmarks, journal entries, flashcards) and only refills structure that's missing.

## Hard refusals

Refuse to run if:

1. `learning-state/config.md` does not exist. Tell the user: _"Run `/start-roadmap` first."_
2. The roadmap file named in `config.md` does not exist or has fewer than 1 valid `<!-- stage:N -->` anchor. Tell the user the parse failed and show what was found.
3. Stage anchor count does not match `stage_count` in config. Refuse and surface the mismatch.

## Process

### 1. Load and validate

1. Read `learning-state/config.md`. Parse `key: value` lines. Capture: `roadmap_file`, `domain`, `domain_slug`, `project_name`, `stage_count`, `timeline_weeks`, `started`, `mode`.
2. Read the roadmap file at `roadmap_file` (repo root).
3. Validate anchors:
   - Count `<!-- stage:N -->` matches → should equal `stage_count`.
   - For each stage, find at least 3 `<!-- ac:sN-M -->` lines.
   - Find `<!-- section:papers -->`, `<!-- section:habits -->`, `<!-- section:system-design-prompts -->` once each.
   - If any check fails, **stop** and print a one-line diagnostic per failure.

### 2. Parse the roadmap

For each stage, extract:
- `stage_number`, `slug`, `week_start`, `week_end`, `project_version` (from the `<!-- stage:N ... -->` line)
- `theme` (the `## Stage N — <theme>` heading)
- `acceptance_criteria`: list of `{id, text}` where id is `s<N>-<M>` (from `<!-- ac:sN-M -->` anchors)
- `blog_title` (from `**Deliverables** -> Blog post: _"..."_`)
- `self_check_block` (the `## Self-check — Stage N` block, used for `quiz-runner` later)

For the papers section: parse the table into rows of `{window, title, why, source}`.

Hold all this in a working buffer. Do not write files until the parse succeeds end-to-end.

### 3. Write `learning-state/` files (idempotent)

For each target file:
- If it does not exist → write from template.
- If it exists → run the **merge rule** below.

#### `learning-state/progress.md`

Use [progress-template.md](progress-template.md). Substitute:
- `{{domain}}`, `{{project_name}}`, `{{stage_count}}`, `{{timeline_weeks}}` from config.
- One stage section per parsed stage, with all `acceptance_criteria` as `<!-- ac:sN-M --> - [ ] <text>` lines.

**Merge rule**: if a stage section already exists in the user's progress.md, preserve any `[x]` or `[!]` boxes (matched by `ac:sN-M` anchor) and only add new criteria or fix the wording of existing ones. Print a summary: _"Preserved N user checkmarks. Added M new criteria. Updated K criterion texts."_

#### `learning-state/papers.md`

Use [papers-template.md](papers-template.md) with one row per parsed paper. Preserve any `[x]` boxes on a Pass column if the row matches by paper title (case-insensitive).

#### `learning-state/journal.md`

Use [journal-template.md](journal-template.md) — the header + an entry-template block. If the file already exists, do not touch it.

#### `learning-state/changed-mind.md`

Use [changed-mind-template.md](changed-mind-template.md) — header + entry template. If the file exists, do not touch.

#### `learning-state/confidence-log.md`

Use [confidence-log-template.md](confidence-log-template.md). If exists, do not touch.

#### `learning-state/README.md`

Use [learning-state-readme-template.md](learning-state-readme-template.md). Substitute `{{domain}}` and `{{roadmap_file}}`. Overwrite if exists (it's structural).

#### Directories with READMEs

Ensure these exist (create empty + a short README explaining ownership):
- `learning-state/flashcards/` (README explains: per-stage decks, SM-2 metadata)
- `learning-state/assessments/` (README explains: one file per quiz/mock run)
- `learning-state/notes/` (README explains: `wk-XX.md` notes per the roadmap's required output)

### 4. Generate skill seeds

#### `.cursor/skills/mock-interviewer/question-bank.md`

Use [question-bank-template.md](question-bank-template.md) as the structure. For each parsed stage, **LLM-generate 4–6 questions** drawn from:

- That stage's `acceptance_criteria` (one trade-off, one failure-mode question per AC group).
- That stage's `self_check_block` (rewrite the trade-off questions as interview prompts).
- The domain-research findings (web-search-grounded — re-fetch if needed for currency).

Tag every question with `[stage][type]` where type is one of `fund | to | fm | scn`.

End the file with a `## Always-fair behavioral prompts` section (copy as-is from the template).

If the target file already exists, ask the user before overwriting: _"Question bank exists. Regenerate (loses your edits), merge (adds new questions tagged for new stages only), or skip?"_

**After writing, print the caveat**: _"Question bank seeded from roadmap + web. Add 5-10 hand-written questions before your first mock — generated questions are weaker than ones drawn from your own production scars."_

#### `.cursor/skills/source-code-reader/targets.md`

Use [source-targets-template.md](source-targets-template.md). For each parsed stage, LLM-generate 1–2 library-function targets drawn from:

- Tools / frameworks named in the stage's `Required reading` and `Build` sections.
- Domain-research findings.

Each target is `{stage, library.function, why-it's-worth-reading}`. Bias toward the **smallest meaningful function** in the named library (a 30–60 line read, not the whole module).

If the target file exists, same overwrite prompt as above.

### 5. Validate the bundle

After writing, do a final pass:

1. `progress.md` parses: every `<!-- ac:sN-M -->` in the roadmap appears in progress.md.
2. `papers.md` row count equals the roadmap's papers table row count.
3. `question-bank.md` has ≥ 1 question per stage (across stages 1..stage_count).
4. `targets.md` has ≥ 1 target per stage.

If any check fails, print which and how to fix (usually: re-run `bootstrap-state` after fixing roadmap anchors).

### 6. Print the hand-off

```
State bootstrapped for <domain> · <stage_count> stages · <timeline_weeks> weeks.

Files written:
  learning-state/progress.md         [<new | merged: N preserved>]
  learning-state/papers.md            [<new | merged>]
  learning-state/journal.md           [<new | kept>]
  learning-state/changed-mind.md      [<new | kept>]
  learning-state/confidence-log.md    [<new | kept>]
  learning-state/README.md            [<new | overwritten>]
  learning-state/{flashcards,assessments,notes}/
  .cursor/skills/mock-interviewer/question-bank.md   [<new | merged | skipped>]
  .cursor/skills/source-code-reader/targets.md       [<new | merged | skipped>]

Try: `what's next` · `dashboard` · `quiz me on stage 1`
```

## Rules

- **Never write without parsing first.** If parse fails, do nothing.
- **Preserve user state on re-run.** Checkmarks, journal entries, flashcards — never silently lose them.
- **Use the IDs, not line numbers.** Every match is by `<!-- ac:sN-M -->` or similar anchor.
- **Be loud about LLM-generated seeds.** Question bank and targets are weaker than hand-curated; tell the user.

## See also

- `../start-roadmap/SKILL.md` — what wrote the roadmap and config in the first place
- [config-template.md](config-template.md) — the shape `start-roadmap` writes (also what this skill reads)
- [progress-template.md](progress-template.md), [papers-template.md](papers-template.md), [question-bank-template.md](question-bank-template.md), [source-targets-template.md](source-targets-template.md), [learning-state-readme-template.md](learning-state-readme-template.md)
