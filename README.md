# roadmap-learn

> A Cursor-native learning platform that turns any "I want to be senior at X" into a structured roadmap with stages, acceptance criteria, assessments, and habit loops — and pushes back when you'd rather skip the hard parts.

No backend, no SaaS. Just **18 agent skills**, **3 Cursor rules**, **2 hooks**, and a `learning-state/` folder of markdown your agent reads and writes.

The whole point of the scaffolding is that **the platform pushes back** so the road feels harder, not easier. That's the senior signal.

---

## Install (30-second setup)

From the root of the repo where you want to learn:

```bash
npx skills@latest add <your-handle>/<your-repo>
```

(Substitute the GitHub handle/repo where you forked or copied this package.)

When the installer asks which skills to add, select **all of them** — or at minimum `/start-roadmap`, `/bootstrap-state`, plus everything under `navigation/`, `assessment/`, `habits/`, `output/`. The cursor-bundle (rules + hooks) is **not** installed by the CLI; the `start-roadmap` skill copies those files into `.cursor/` on first run.

---

## First run

After install, run these two commands in your Cursor agent, in order:

### 1. `/start-roadmap`

The interview. Walks through:

- **Domain capture** — fuzzy "I want to learn X" → concrete `domain` + `domain_slug`.
- **Web grounding** — searches the web for the current-year stack, interview topics, and landmark posts/papers in your domain. Cites them inline so you can audit.
- **Follow-ups** — timeline, weekly hours, current level, goal artifact, project name, output and assessment preferences, stage count.
- **Draft + review loop** — writes `<domain_slug>-roadmap-<year>.md` at the repo root with stable anchors; iterates with you until you say "ship it".
- **Hand-off** — writes `learning-state/config.md` (only this) and copies the cursor-bundle (rules + hooks) into `.cursor/`.

You leave with a roadmap file you've read and approved, and a config file pointing at it.

### 2. `/bootstrap-state`

The state generator. Reads your approved roadmap and writes:

- `learning-state/progress.md` with every acceptance criterion (anchor-tagged) ready to check off.
- `learning-state/papers.md` from the roadmap's papers table.
- `learning-state/journal.md`, `changed-mind.md`, `confidence-log.md`, plus `flashcards/`, `assessments/`, `notes/` directories.
- `.cursor/skills/mock-interviewer/question-bank.md` — LLM-generated from your roadmap + web grounding (you'll want to hand-edit this before your first mock).
- `.cursor/skills/source-code-reader/targets.md` — 1-2 library functions per stage to read.

Idempotent — re-run safely after editing the roadmap; user state (checkmarks, journal entries) is preserved by matching `<!-- ac:sN-M -->` anchors.

After this, you're ready. Try `what's next` or `dashboard`.

---

## The skill map (18 skills)

| Category | Skills |
|---|---|
| **Setup** | `start-roadmap` · `bootstrap-state` |
| **Navigation** | `roadmap-navigator` · `progress-tracker` · `dashboard` |
| **Assessment** | `quiz-runner` (+rubric) · `quiz-grader` · `stage-gate` · `mock-interviewer` |
| **Learning habits** | `concept-explainer` · `feynman-coach` · `flashcard-maker` · `flashcard-reviewer` · `adr-writer` · `source-code-reader` · `paper-tracker` |
| **Output** | `blog-post-coach` · `weekly-review` |

Skills auto-trigger from natural phrasing — no `/slash` required (but slashes work too).

| You say | What runs |
|---|---|
| "where am I" / "dashboard" | `dashboard` |
| "what's next" | `roadmap-navigator` |
| "quiz me on stage 2 in strict mode" | `quiz-runner` |
| "grade my quiz" | `quiz-grader` |
| "gate stage 1" | `stage-gate` (blocks if evidence missing) |
| "explain <concept> at depth 3" | `concept-explainer` |
| "feynman me on <topic>" | `feynman-coach` |
| "write an ADR for <choice>" | `adr-writer` |
| "log today" | `progress-tracker` |
| "mock interview me, 30 minutes" | `mock-interviewer` |
| "weekly review" | `weekly-review` |
| "review my flashcards" | `flashcard-reviewer` |
| "let's read <library>'s <function>" | `source-code-reader` |
| "load the reading list" | `paper-tracker` |
| "draft my stage 1 blog post" | `blog-post-coach` |

---

## Daily / weekly / per-stage rhythm

**Daily** (~30 min, plus your project work):
1. 1 min: `dashboard` to orient
2. 25 min: work on your project (the agent pushes back Socratically)
3. 2 min: `log today`
4. 5 min: `review my flashcards`

**Weekly** (Friday, ~15 min):
- `weekly review` ritual
- If a stage is ~80%+ done → `gate stage N` to find what's missing
- Schedule the next paper pass

**Per-stage** (end of every stage):
- `quiz me on stage N --mode=strict` → `grade my quiz`
- `draft my stage N blog post`
- `gate stage N` — must pass to advance

---

## The hard gates (you cannot skip)

`stage-gate` refuses to mark a stage complete unless **all** of these are true:

1. Every roadmap acceptance criterion checked with inline evidence (commit / PR / URL / file).
2. Blog post drafted.
3. Self-check quiz scored ≥ 2.5 average in at least one graded run.

Soft gates (skippable with reason): ADR, Feynman pass, external reproduction.

---

## Grading modes

Every quiz/assessment supports `--mode=strict` or `--mode=supportive`. The default lives in `learning-state/config.md` (initially set during `/start-roadmap`). See `.cursor/skills/quiz-runner/rubric.md` for the 0-4 rubric.

- **Strict** = senior interviewer voice. A "textbook correct" answer is **2/4**. 3/4 requires trade-off articulation. 4/4 requires a failure mode named unprompted. Use for real assessment.
- **Supportive** = tutor voice. 3/4 for correct, 4/4 for depth. Use for early learning of a topic.

---

## How it stays generic (config-driven)

There are **no hardcoded domain references** anywhere in the skills or rules. Everything reads `learning-state/config.md` to find:

```
roadmap_file: <your-roadmap>.md
domain: <your domain name>
project_name: <your project>
stage_count: <N>
timeline_weeks: <N>
mode: <strict | supportive | mixed>
```

And the roadmap itself uses **stable HTML-comment anchors** so skills don't depend on line numbers:

| Anchor | What it marks |
|---|---|
| `<!-- stage:N -->` | Start of stage N |
| `<!-- ac:sN-M -->` | Acceptance criterion M of stage N |
| `<!-- selfcheck:sN -->` | Self-check block for stage N |
| `<!-- section:papers -->`, `section:habits`, `section:system-design-prompts` | Cross-stage sections |

Edit the roadmap freely; re-run `/bootstrap-state` to propagate structural changes — user state (checkmarks, journal entries, flashcards) is preserved by anchor match.

---

## Customization

| Want to change | Where |
|---|---|
| Default grading strictness | `learning-state/config.md` → `mode:` |
| Roadmap content (stages, ACs, papers) | The `<domain_slug>-roadmap-<year>.md` file at repo root, then re-run `/bootstrap-state` |
| Rubric bar | `.cursor/skills/quiz-runner/rubric.md` |
| Mock interview question bank | `.cursor/skills/mock-interviewer/question-bank.md` (hand-edit after `/bootstrap-state` seeds it) |
| Source-reading targets | `.cursor/skills/source-code-reader/targets.md` |
| Session-start nudge | `.cursor/hooks.json` |
| Rule strictness | `.cursor/rules/*.mdc` (3 short files) |

---

## Files you'll edit by hand

| File | When |
|---|---|
| `learning-state/notes/wk-XX.md` | Per stage — your self-check answers in writing |
| `docs/adr/NNNN-*.md` | Created by `adr-writer` (Socratic extraction first, then it writes) |
| `docs/blog/<stage>-*.md` | Created by `blog-post-coach` |
| `docs/papers/NN-*.md` | Created by `paper-tracker` on pass 2 |

## Files skills own (don't hand-edit; let the skill update them)

- `learning-state/progress.md` ← `progress-tracker` · `stage-gate` · `quiz-grader`
- `learning-state/journal.md` ← `progress-tracker` · `weekly-review`
- `learning-state/confidence-log.md` ← `calibration` rule · `quiz-grader`
- `learning-state/flashcards/stage-*.md` ← `flashcard-maker` · `flashcard-reviewer`
- `learning-state/assessments/*.md` ← `quiz-runner` · `quiz-grader` · `mock-interviewer`

If you hand-edit them anyway, that's fine — they're just markdown — but the skills assume the structure documented in each file's header.

---

## When something doesn't work

| Symptom | Fix |
|---|---|
| Skill doesn't trigger from natural phrasing | Name it explicitly: _"use the roadmap-navigator skill"_ |
| Hook doesn't fire | Cursor Settings → Hooks tab to inspect; ensure `.cursor/hooks.json` is valid JSON |
| `progress.md` is out of sync with roadmap edits | Run `/bootstrap-state` again — it merges new ACs while preserving your checkmarks |
| Anchor parse fails | Look for missing `<!-- stage:N -->` or `<!-- ac:sN-M -->` lines; the templates show the format |
| Quiz feels too soft | Switch to strict mode; or edit the rubric to raise the bar for 3/4 |
| Question bank is shallow | Hand-edit `.cursor/skills/mock-interviewer/question-bank.md` — LLM-generated questions are weaker than your own production scars |
| You want a fresh start | `git restore learning-state/` (the skills are deterministic enough that you can roll back state safely) |

---

## Platform notes

- **Cursor**: full feature set (skills + rules + hooks).
- **Other agents (Claude Code, Codex CLI, etc.)**: the `skills` CLI installs the skills folder only. Rules and hooks under `cursor-bundle/` are Cursor-specific — port them to your agent's equivalent (or copy the rule/hook content into a common-instructions file).

---

## What's next

- Open the agent. Type `/start-roadmap`. Answer honestly.
- Push back on the draft. Specifically question: timeline realism, acceptance criteria that are vague, papers you've already read.
- Then `/bootstrap-state`, then `what's next`, and start work.

Good luck.
