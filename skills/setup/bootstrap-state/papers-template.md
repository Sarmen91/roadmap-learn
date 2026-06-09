# Papers — 3-pass tracker

Habit #5: one paper every 2 weeks. Use Keshav's three-pass method.

- **Pass 1 — Scan** (5 min): read title, abstract, intro, section headings, conclusion. Decide: read further or drop.
- **Pass 2 — Read** (1 hour): read for understanding, skip proofs/details. Take notes.
- **Pass 3 — Reproduce** (2 hours, optional): reproduce one key idea in code or a worked example.

For each paper write a 200-word summary in `docs/papers/<NN>-<slug>.md`.

## Reading list (from `{{roadmap_file}}` → `<!-- section:papers -->`)

| # | Window | Paper / topic | Pass 1 | Pass 2 | Pass 3 | Summary |
|---|---|---|---|---|---|---|
<!-- bootstrap-state fills the rows from the roadmap's papers table. -->
| 1 | {{window 1}} | {{title 1}} | [ ] | [ ] | [ ] | [ ] |
| 2 | {{window 2}} | {{title 2}} | [ ] | [ ] | [ ] | [ ] |
| N | {{window N}} | {{title N}} | [ ] | [ ] | [ ] | [ ] |

Run `paper-tracker` to advance a pass on the current paper.
