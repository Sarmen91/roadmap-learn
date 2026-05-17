---
name: paper-tracker
description: Manages the paper reading list (Keshav's 3-pass method) generated from the roadmap's `<!-- section:papers -->` block. Loads the reading list, tracks pass 1 / 2 / 3 per paper, schedules summaries to docs/papers/, and surfaces what's due next. Use when the user says "next paper", "load reading list", "read paper N", "paper summary", or types /paper.
---

# Paper tracker

Habit #5 from the roadmap. One paper every 2 weeks, three-pass method.

## The three passes

| Pass | Time | Goal | Output |
|---|---|---|---|
| 1 — Scan | 5 min | Decide: read further or drop | One-line verdict in `papers.md` |
| 2 — Read | 1 hour | Understand the idea | 200-word summary in `docs/papers/<slug>.md` |
| 3 — Reproduce | 2 hours (optional) | Make one core idea work in code or a worked example | Code snippet + reflection in summary file |

## Workflow

### Sub-command: "load reading list" / first run

`bootstrap-state` should have populated `learning-state/papers.md` from the roadmap's `<!-- section:papers -->` block. If `papers.md` still has placeholder rows, tell the user: _"Run `/bootstrap-state` to load the reading list from your roadmap."_

If the user wants to re-load (e.g. after editing the roadmap's papers table):
1. Read `learning-state/config.md` → `roadmap_file`.
2. Open the roadmap, grep for `<!-- section:papers -->`, parse the table below it (window + title + why + source).
3. Update `learning-state/papers.md` rows preserving any `[x]` checkboxes whose paper title matches (case-insensitive).
4. Print: _"Loaded N papers. Up next: paper N in window <weeks>."_

### Sub-command: "next paper" / "what's due"

1. Read `papers.md`. Find the first paper where any pass is `[ ]`.
2. Cross-reference with `progress.md` to check what week the user is in.
3. Print:
   ```
   ## Paper <N> — <title>
   **Window:** weeks <X-Y> (you're on week <Z> -> <on time | behind by W weeks>)
   **Why:** <from roadmap>
   **Next pass:** <Pass N>
   **Time budget:** <5 min | 1 hour | 2 hours>
   ```

### Sub-command: "I finished pass <N>"

1. Confirm which paper.
2. **Pass 1:** ask for the one-line verdict. Update the `Pass 1` checkbox + add the verdict to the row.
3. **Pass 2:** scaffold a summary file at `docs/papers/<NN>-<slug>.md` with this skeleton (which you write):

   ```
   # Paper NN — <title>

   **Authors:** <...>  **Year:** <YYYY>  **Read:** <YYYY-MM-DD>

   ## What problem does it solve?
   <2 sentences>

   ## Core idea
   <3-4 sentences. Write as if explaining to a peer.>

   ## How it works
   <The mechanism. 4-6 sentences max.>

   ## Why it matters for <project_name>
   <Specific stage / file / decision this informs. Read project_name from config.md.>

   ## What I didn't follow
   <Honest list. Comes back as flashcards.>

   ## One thing I'd try
   <For pass 3, or a future ADR.>
   ```

   Then walk the user through filling each section (one at a time). Update `Pass 2 [x]` + `Summary [x]`.

4. **Pass 3:** ask: _"What's the smallest reproducible piece you could try?"_ Co-design a minimal experiment. Add the result to the summary file.

5. **Seed flashcards** for the "What I didn't follow" list via `flashcard-maker`.

## Rules

- **Never describe a paper you haven't asked the user to read.** Your job is scaffold + coach, not summary-generation.
- **Time budgets are real.** If the user wants to spend 3 hours on pass 1, ask: _"Sure that's not a sign you should defer this paper?"_
- **Off-roadmap papers are fine.** If the user wants to add a paper not on the list, append it with their own window.
- 1 paper at a time on pass 2+. Don't let them have 3 in-flight.
