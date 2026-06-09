---
name: start-roadmap
description: Stage 0a of the learning platform. Multi-turn interview that turns a fuzzy "I want to get better at X" into a structured, anchor-tagged roadmap markdown file plus a `learning-state/config.md`. Web-searches for current best practices before drafting. Use when the user says "start a roadmap", "I want to learn X", "build me a roadmap", "/start-roadmap", or on the first run of the platform.
disable-model-invocation: true
---

# Start roadmap

The "pre-stage" of the platform. Turns a vague learning intent into a structured roadmap file the downstream skills can consume.

This is a **prompt-driven** skill, not a script. Explore, ask one decision at a time with an explainer, present a draft, iterate, then write only when the user explicitly approves.

## Hard refusals

Refuse to write any file until **all** of these are true:

1. Web grounding ran (at least one `WebSearch` call returned, captured in your working buffer).
2. The user answered: domain, timeline, weekly-hours, current-level, goal-artifact.
3. The user explicitly said "ship it" / "looks good" / equivalent on the roadmap draft.
4. If `learning-state/config.md` already exists, the user explicitly confirmed overwrite.

## Process

### 1. Probe repo state

Read whatever exists; don't assume:

- `learning-state/config.md` — if present, this repo already has a roadmap. Stop and ask: _"Found an existing config (domain: <X>). Overwrite, start fresh in a new folder, or cancel?"_
- `*.md` at repo root matching `*-roadmap-*.md` — same logic; surface what's there.
- Which agent is hosting this session (you know what you're running in: Cursor, Claude Code, Codex CLI, or other). This determines `skills_dir` (`.cursor/skills` / `.claude/skills` / `.agents/skills`) and how step 8 installs the bundle. If genuinely ambiguous, ask the user.
- The agent's config dirs (`.cursor/rules/` + `.cursor/hooks/`, or `.claude/`, or `AGENTS.md`) — note whether they already contain learning-platform files (so you know whether the final copy step needs an overwrite confirmation).

### 2. Section A — Domain capture (fuzzy to concrete)

Use the prompts and explainers in [interview-script.md](interview-script.md). Ask **one decision at a time** — present a section, get the answer, then move to the next. Don't dump all questions at once.

Start with Section A even if the user already named a domain in their opening message — confirm and sharpen.

After Section A you should have:
- `domain` (e.g. "AI Engineer", "Site Reliability Engineering", "Backend at Scale")
- `domain_slug` (kebab-case, ASCII, for filenames)

### 3. Section B — Web grounding

**Before** drafting anything, run web searches per the patterns in [domain-research.md](domain-research.md). At minimum, three searches:

- Current stack / tools for `<domain>` in the current year
- What senior `<domain>` interviews test for in the current year
- Landmark posts / papers / talks in `<domain>` from the last 12 months

Capture findings in a working buffer. Cite sources when surfacing them in the draft so the user can verify.

Tell the user (one line): _"Grounded the draft with N web sources from the last 12 months. I'll cite them inline so you can audit."_

### 4. Section C — Follow-ups

Continue through [interview-script.md](interview-script.md) Sections C through G. After this you should have:

- `timeline_weeks` (e.g. 16, 8, "open-ended")
- `weekly_hours` (e.g. "8–10")
- `current_level` (one sentence — what they already ship today)
- `goal_artifact` (portfolio project name, job title, talk, etc.)
- `project_name` (the working title for the project they'll build through the roadmap — can be `<domain-slug>-project` if none chosen)
- `output_preferences` (blog posts? talks? ADRs only?)
- `assessment_preferences` (mock interviews + self-quizzes? quizzes only? Feynman-heavy?)
- `stage_count` (default 8 if 12+ weeks, 4–6 if shorter — propose and confirm)

### 5. Draft the roadmap

Use [roadmap-template.md](roadmap-template.md) as the canonical structure. Output filename:

```
<domain_slug>-roadmap-<year>.md
```

at the **repo root**. The roadmap MUST:

- Open with the user's `current_level`, `goal_artifact`, and `timeline_weeks`.
- Have exactly `stage_count` stages, each tagged with a stable anchor:
  ```markdown
  <!-- stage:1 slug=<stage-slug> weeks=1-2 -->
  ## Stage 1 — <theme>
  ```
- Per stage: `**Acceptance criteria**` block where each criterion has an `<!-- ac:sN-M -->` anchor:
  ```markdown
  **Acceptance criteria**
  <!-- ac:s1-1 --> - [ ] <verb-first criterion>
  <!-- ac:s1-2 --> - [ ] <criterion>
  ```
- Per stage: `**Deliverables**` block (blog post, self-check section, ADR slot).
- Per stage: a `## Self-check` block with quick-checks and trade-off questions tagged `<!-- selfcheck:sN -->`.
- A `## Papers` section tagged `<!-- section:papers -->` with a `stage_count`-row table.
- A `## Habits` section tagged `<!-- section:habits -->` listing the 10 cross-stage habits.
- A `## System design prompts` section tagged `<!-- section:system-design-prompts -->` with 3–5 capstone design prompts.
- All web-search citations inline as footnote-style links.

Do NOT invent acceptance criteria. Derive them from the web-search-grounded current stack + the user's `goal_artifact`. If you cannot ground a criterion in a source, mark it `(unverified — please review)`.

### 6. Review loop

Present the draft and ask:

> _"Here's the draft. What feels off? Common questions to consider — too many stages? wrong tools? acceptance criteria too vague? timeline mismatch? Tell me what to change, or say 'ship it' to commit."_

Iterate. Each revision keeps the anchor scheme intact (regenerate `<!-- ac:sN-M -->` IDs if criteria reorder, but keep them deterministic — number from 1 per stage).

### 7. Write `learning-state/config.md`

Only after explicit "ship it" — and only this one state file. Full state generation is `bootstrap-state`'s job. Use the template at `../bootstrap-state/config-template.md`.

Fill from the answers captured above. Include today's date as `started:`. Set `skills_dir` to the host agent's skills folder detected in step 1 (e.g. `.cursor/skills`, `.claude/skills`, `.agents/skills`) — downstream skills resolve their seed files through it.

### 8. Install the agent bundle

The `agent-bundle/` folder lives next to this skill in the package source (one level above the skills tree). It is a single source of truth with per-agent adapters — see `agent-bundle/README.md` for the rationale. Materialize it for the **host agent detected in step 1**:

**Cursor:**

- All `*.mdc` files from `agent-bundle/rules/` → `.cursor/rules/`
- `agent-bundle/cursor/hooks.json` → `.cursor/hooks.json`
- `agent-bundle/hooks/load-progress.mjs` → `.cursor/hooks/load-progress.mjs` (deterministic alternative; `hooks.json` uses prompt hooks by default)

**Claude Code:**

- `agent-bundle/hooks/load-progress.mjs` → `.claude/hooks/load-progress.mjs`
- Merge the `hooks` object from `agent-bundle/claude/settings-hooks.json` into `.claude/settings.json` (create the file if missing; preserve existing keys and hooks). Tell the user Claude Code will ask to trust the hook on first run.
- Append a managed block to `CLAUDE.md` (create if missing) containing: the body of each `agent-bundle/rules/*.mdc` file with YAML frontmatter stripped, plus the "end of a substantive session" section of `agent-bundle/session-rituals.md` (session start is covered by the hook). Delimit the block with `<!-- roadmap-learn:start -->` / `<!-- roadmap-learn:end -->`; if the markers already exist, replace the block contents instead of appending.

**Codex CLI:**

- Append the same managed block to `AGENTS.md` (create if missing), containing: the frontmatter-stripped rule bodies plus **all** of `agent-bundle/session-rituals.md` (Codex hooks cannot inject model context, so both rituals are instructions). Same `<!-- roadmap-learn:start/end -->` marker handling.

**Other agents:** follow the Codex path against the agent's instructions file (`AGENTS.md` is the common convention).

If any target already exists outside a managed block, ask before overwriting. If the user declines, leave their version in place and note it in the final summary.

### 9. Print the hand-off

```
Roadmap drafted: <domain_slug>-roadmap-<year>.md
Config written:  learning-state/config.md
Agent bundle:    installed for <cursor | claude | codex> (rules + hooks/rituals) | skipped (user declined)

Next step: review the roadmap once more, then run `/bootstrap-state` to scaffold:
  - learning-state/progress.md
  - learning-state/papers.md
  - learning-state/journal.md, changed-mind.md, confidence-log.md
  - skill seed files (mock interview question bank, source-reading targets)
```

## Style rules

- **One question on screen at a time.** No multi-question dumps.
- **Each question has a short explainer** (2 lines, the why) before the choices.
- **No marketing language** in the roadmap. "Robust", "powerful", "scalable" → cut.
- **Cite sources inline** for any current-stack claim. Make the user able to audit you.
- **Never let stages drift past the timeline.** Sum of stage weeks must equal `timeline_weeks`.
- **Acceptance criteria are testable.** "App deployed at public URL" — passes. "Better at deploys" — fails.

## See also

- [roadmap-template.md](roadmap-template.md) — canonical structure with anchors
- [interview-script.md](interview-script.md) — the question flow + explainers
- [domain-research.md](domain-research.md) — web-search prompt patterns
- `../bootstrap-state/SKILL.md` — what runs next, after the roadmap is approved
