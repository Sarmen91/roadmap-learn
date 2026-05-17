# Learning State

This folder is the **single source of truth** for where you are on the [{{domain}} roadmap]({{roadmap_file}}). The skills in `.cursor/skills/` read and write to these files. Treat them like a database — but one you can read, edit, and `git diff`.

## Files

| File | Purpose | Written by |
|---|---|---|
| `config.md` | Domain + roadmap pointer + grading mode | `start-roadmap` (you, via the skill) |
| `progress.md` | Current stage, week, completed acceptance criteria, latest scores | `progress-tracker`, `stage-gate`, `quiz-grader` |
| `journal.md` | Append-only daily learning log | `progress-tracker` (you, via the skill) |
| `changed-mind.md` | Habit #9: every time the roadmap proved an assumption wrong | `progress-tracker` |
| `confidence-log.md` | Habit #10: confidence calibration record (predicted % vs actual correct) | `calibration` rule + `quiz-grader` |
| `papers.md` | The papers + which 3-pass stage you're on for each | `paper-tracker` |
| `assessments/` | One file per quiz/mock-interview run: questions, answers, scores, feedback | `quiz-runner`, `quiz-grader`, `mock-interviewer` |
| `flashcards/` | Per-stage flashcard decks with SM-2 due dates | `flashcard-maker`, `flashcard-reviewer` |
| `notes/` | `wk-XX.md` notes (matches the roadmap's required output) | you, scaffolded by `progress-tracker` |

## Daily / weekly rhythm

```
Daily   →  "what's next" → work → /log → /flashcards review (10 min)
Weekly  →  /weekly-review (Friday)
Per stage → /quiz <stage> → /grade → /stage-gate <stage> → /blog-post <stage>
```

## Quick command reference

Type these in chat. The skills auto-trigger on the phrasing.

| You say | What runs |
|---|---|
| "what's next" / "what should I do" | `roadmap-navigator` |
| "show me my dashboard" / "where am I" | `dashboard` |
| "quiz me on stage 2" / "quiz me on <topic>" | `quiz-runner` |
| "grade my quiz" / "grade in strict mode" | `quiz-grader` |
| "gate stage 1" / "check acceptance criteria for stage 3" | `stage-gate` |
| "explain <topic> at depth 3" | `concept-explainer` |
| "feynman me on <topic>" | `feynman-coach` |
| "make flashcards from this" / "review flashcards" | `flashcard-maker` / `flashcard-reviewer` |
| "write an ADR for X" | `adr-writer` |
| "mock interview me, 30 minutes" | `mock-interviewer` |
| "help me draft the stage 1 blog post" | `blog-post-coach` |
| "weekly review" / "it's friday" | `weekly-review` |
| "log today" / "I just finished X" | `progress-tracker` |
| "let's read <library>'s <function>" | `source-code-reader` |
| "let's read the next paper" | `paper-tracker` |
