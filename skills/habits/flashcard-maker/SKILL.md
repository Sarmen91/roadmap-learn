---
name: flashcard-maker
description: Turns missed quiz questions, Feynman fumble points, or arbitrary user notes into spaced-repetition flashcards in learning-state/flashcards/. Use when the user says "make flashcards", "card this", "add to my deck", "remember this", when quiz-grader / feynman-coach hand off, or types /card.
---

# Flashcard maker

Single writer to `learning-state/flashcards/stage-<N>.md`. Lightweight SM-2 spaced repetition, all in markdown.

## Card format (one card = one row)

```
| <id> | <question> | <answer (<= 240 chars)> | <ease> | <interval days> | <next due YYYY-MM-DD> | <reviewed n times> | <source> |
```

ID is `s<stage>-<3-digit zero-padded>` per stage (e.g. `s1-007`).

## File layout per stage

```
# Stage <N> flashcards

| ID | Q | A | Ease | Interval | Due | Reps | Source |
|---|---|---|---|---|---|---|---|
| s1-001 | ... | ... | 2.5 | 1 | <YYYY-MM-DD> | 0 | quiz <date> Q3 |
```

## Workflow — adding cards

1. Determine the stage. If hand-off from `quiz-grader`, use the quiz's stage. If user is just typing notes, ask: _"Which stage does this belong to?"_

2. **Read or create** `learning-state/flashcards/stage-<N>.md` (with the header above).

3. For each card input:
   - **Question**: must be answerable in one sentence; not "explain X" (use Feynman for that). Good: _"What's <mechanism>'s failure mode at <stress condition>?"_
   - **Answer**: <= 240 chars. The compressed reference answer.
   - Initial: `ease = 2.5`, `interval = 1`, `due = tomorrow`, `reps = 0`.

4. **Append** the row. Get the next id by reading the highest existing id in the file.

5. Output one line per card added: _"Added s<N>-NNN · due tomorrow."_

## Anti-cards (refuse to add)

- Questions longer than the answer.
- "Explain X" prompts — those go to Feynman.
- Questions where the answer is a paragraph — split it into 2-3 cards.
- Duplicates — check `Q` substring overlap before adding.

## Rules

- **One file per stage.** Never split across files within a stage.
- **Never edit other cards** when adding new ones.
- **Answers must be self-contained.** No "see roadmap line X" — write the answer.
- **Trust the user's phrasing for Q.** Only rewrite if it violates the anti-card rules.
