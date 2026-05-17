---
name: adr-writer
description: Drafts an Architecture Decision Record (ADR) for a technical choice — but ONLY after Socratically extracting the trade-offs from the user first. Refuses to write the ADR until context, options, decision, and consequences are all articulated. Use when the user says "write an ADR for X", "I chose X, document it", "decision record", or types /adr.
---

# ADR writer

Habit #3 from the roadmap. ADRs are what senior interviewers ask to see. This skill **refuses** to write a hollow ADR; it makes the user earn it.

## Workflow

1. **Confirm scope.** Ask: _"What's the decision in one sentence? (e.g. 'use X as the Y router' not 'set up Y')"_

2. **Run the Socratic extraction.** Ask, one at a time:
   - **Context:** _"What problem does this decision exist to solve? What changed that forced you to choose?"_
   - **Options considered:** _"What were the 2-3 alternatives you actually evaluated? Not 'I considered other things' — name them."_
   - **For each option, in turn:** _"What's the strongest pro? Strongest con?"_
   - **Decision:** _"Which did you pick, and what's the **single tipping factor**?"_
   - **Consequences:** _"Name one thing that will be **easier** because of this choice. Name one thing that will be **harder**. Name one thing that **might prove this wrong** in 6 months."_

   **If the user gives a hollow answer ("X is more convenient"), push back once** ("compared to what, specifically?"). After two hollow answers, end the session: _"Come back when the decision is more concrete. Try `concept-explainer` on the alternatives first."_

3. **Generate the ADR** using the template at [template.md](template.md). Output path:

   `docs/adr/<NNNN>-<kebab-slug>.md`

   Number `NNNN` is the next 4-digit zero-padded index from existing files in `docs/adr/`.

4. **After writing, update `progress.md`:** add the ADR path under the current stage's `## Deliverables` block:
   - `- [x] ADR: docs/adr/<NNNN>-<slug>.md`

5. **End with one offer:** _"Want me to quiz you on this decision in 7 days to test if it holds up? (writes a deferred flashcard at depth-4.)"_

## Rules

- **No ADR without all 5 inputs.** Context · Options · Pros/cons · Decision · Consequences. Refuse to draft without them.
- **No marketing language.** "Powerful", "scalable", "industry-standard" → ask for the concrete claim instead.
- **The "what could prove this wrong" line is non-negotiable.** That's the line interviewers love.
- **One decision per ADR.** If the user is conflating two, make them split.
