# Roadmap template

Canonical structure for the file `start-roadmap` writes. Every downstream skill expects these anchors to exist.

## Top of file

```markdown
# <Domain> roadmap — <year>

> One-paragraph promise. "By the end of this you'll be able to <goal_artifact>, evidenced by <portfolio item>."

## Setup

- **Current level:** <user's one-sentence current_level>
- **Goal artifact:** <goal_artifact>
- **Timeline:** <timeline_weeks> weeks at ~<weekly_hours> hours/week
- **Project name:** <project_name>
- **Default grading mode:** <strict | supportive | mixed>

## How to use this roadmap

This file is the source of truth for the platform. Skills read it via stable HTML-comment anchors (`<!-- stage:N -->`, `<!-- ac:sN-M -->`, `<!-- section:papers -->`, etc.). Edit headings freely; preserve anchors.

- `<!-- stage:N -->` marks each stage.
- `<!-- ac:sN-M -->` marks each acceptance criterion (stage N, criterion M).
- `<!-- selfcheck:sN -->` marks the self-check section for stage N.
- `<!-- section:papers -->`, `<!-- section:habits -->`, `<!-- section:system-design-prompts -->` mark the cross-stage sections.

If you want to add or reorder, run `/bootstrap-state` again — it will reconcile your edits with state files using these IDs.
```

## Per stage (repeat for each)

```markdown
<!-- stage:N slug=<stage-slug> weeks=<X>-<Y> project=<version> -->
## Stage N — <theme>

**Goal:** <one paragraph. What the user can do after this stage that they couldn't before. Concrete.>

**Required reading**
- <Link 1 — one-line takeaway>
- <Link 2 — one-line takeaway>
- (Cite from web search, footnoted.)

**Build**
- Endpoints / features / services to implement, listed by week.
- Week <X>: <verb-first deliverable>
- Week <X+1>: <verb-first deliverable>

**Acceptance criteria**
<!-- ac:sN-1 --> - [ ] <testable, verb-first criterion>
<!-- ac:sN-2 --> - [ ] <criterion — observable in logs / files / URLs>
<!-- ac:sN-3 --> - [ ] <criterion>
<!-- ac:sN-4 --> - [ ] <criterion>
<!-- ac:sN-5 --> - [ ] <criterion>
<!-- ac:sN-6 --> - [ ] >=1 ADR in `docs/adr/`

**Deliverables**
- [ ] Blog post: _"<title from output_preferences>"_
- [ ] Self-check answers in `docs/notes/wk-<W>.md`
- [ ] Quick-check questions added to flashcards

<!-- selfcheck:sN -->
## Self-check — Stage N

### Trade-offs you must be able to defend
1. <Trade-off question — names both options, asks for the tipping factor and a failure mode of each>
2. <Trade-off question>
3. <Trade-off question>

### Quick-check questions
1. <Fact-or-mechanism question — answerable in one sentence>
2. <Quick check>
3. <Quick check>
4. <Quick check>
5. <Quick check>

### Scenario walk-through
> <Scenario in one paragraph. Specific. Latency / cost / failure context.>

Investigate / Mitigate (hour) / Fix (week) — answer each.
```

## Cross-stage sections (after all stages)

### Papers

```markdown
<!-- section:papers -->
## Papers

One paper every 2 weeks. Keshav's three-pass method (Scan / Read / Reproduce).

| # | Window | Paper / topic | Why it matters | Source |
|---|---|---|---|---|
| 1 | Weeks 1-2 | <title> | <one line> | <link> |
| 2 | Weeks 3-4 | <title> | <one line> | <link> |
| ... | ... | ... | ... | ... |

(One row per `timeline_weeks / 2`, rounded down.)
```

### Habits

```markdown
<!-- section:habits -->
## Habits (cross-stage)

1. **Spaced repetition** — 10 min/day flashcards
2. **Feynman pass** — once per stage, recorded
3. **ADRs** — at least one per stage
4. **Source reading** — 3-4 library functions per stage
5. **Papers** — see `section:papers`
6. **Reproduce an external post** — one per stage
7. **Open-source PR** — at least one across the whole roadmap
8. **Community** — 5+ helpful answers (forum / Slack / Discord)
9. **Changed-mind log** — every time the roadmap proves you wrong
10. **Calibration** — confidence prediction before every quiz answer
```

### System design prompts

```markdown
<!-- section:system-design-prompts -->
## System design prompts (capstone)

For the final stage / mock interviews. Pick one to defend end-to-end.

1. <Domain-specific design prompt, scale qualified — "for N users / docs / req/s">
2. <Design prompt>
3. <Design prompt>
4. <Design prompt>
5. <Design prompt>

For each: defend model / tool / framework choice, data + state plan, eval / observability story, security / multi-tenancy model, cost-at-scale, day-1 failure mode.
```

### References

```markdown
## References

Footnotes from the web-search grounding. The user can click each to audit.

[1] <Title> — <URL> — <date>
[2] <Title> — <URL> — <date>
...
```

## Anchor discipline (non-negotiable)

- Every stage starts with `<!-- stage:N ... -->` on its own line *immediately before* the `## Stage N` heading.
- Every acceptance criterion has `<!-- ac:sN-M -->` *on the same line*, before the `- [ ]`.
- IDs are deterministic: number from 1 within each stage. Never reuse an ID after deletion (always increment).
- The three cross-stage anchors (`section:papers`, `section:habits`, `section:system-design-prompts`) appear exactly once each in the file.

If `bootstrap-state` cannot find these anchors, it will fail loudly. Keep them.
