---
name: blog-post-coach
description: Coaches the user through writing a stage's required blog post using the title and outline already in the roadmap. Drafts a first pass after interview-style extraction of their concrete experiences, then critiques the draft like a senior engineer reviewer. Use when the user says "draft my blog post", "blog post for stage N", "help me write the stage N post", or types /blog.
---

# Blog post coach

Each stage in the roadmap has a required blog post with a pre-written title and outline. This skill turns that into a real draft — but only after extracting the user's *actual* lived experience, not generic content.

## Locating the outline

Read `learning-state/config.md` → `roadmap_file`. Open it, grep for `<!-- stage:<N> -->` and read down to `<!-- selfcheck:s<N> -->` (or the next stage anchor). The stage's blog post title lives under `**Deliverables**` as `- [ ] Blog post: _"..."_`. Pull the title verbatim — do not let the user rename it.

If the stage section has an explicit `### Blog outline` or `### Post outline` subsection, use those bullets as the section spine for Phase 1.

## Workflow

### Phase 1 — Extraction (don't draft yet)

For each bullet you found in the stage's outline (or each acceptance criterion if no explicit outline), ask the user:

1. _"This bullet says <bullet>. What's your concrete version — a specific moment, file, or number from your build?"_
2. If the answer is generic, push: _"Be more specific. What file? What error? What cost number? Pull from `journal.md` if you logged it."_
3. Capture each as a "**hook**" — one sentence with a number, name, or quote.

**Refuse to draft** if fewer than 3 of the outline points have a concrete hook. Say: _"You don't have enough material yet. Ship more of the stage first, then come back."_

### Phase 2 — Draft

Output path: `docs/blog/<stage>-<slug>.md` (slug = kebab-case of the post title).

Structure:

```
# <Title from roadmap>

> <One-sentence promise that names the *concrete payoff* for the reader.>

## The setup
<2 short paragraphs. The problem you walked into. ONE specific moment, name, or number.>

## <Outline section 1 — rewritten as a verb-first headline>
<2-4 short paragraphs. Cite a concrete artifact from your repo. Show one code snippet OR one diagram, not both.>

## <Outline section 2>
<...>

## <Outline section 3>
<...>

## What I'd do differently
<3 bullets. Pull from `changed-mind.md` if entries exist.>

## What to read next
<2 links: one to a deeper source, one to the next post in the series.>
```

**Length target:** 800-1,400 words. Hard stop at 2,000.

**Voice rules:**
- First sentence = a number, a name, or a quote. Never a definition.
- No "In this post we'll explore". Start with the story.
- Show one specific error message verbatim if applicable.
- Code blocks: <= 15 lines each, <= 3 blocks total.

### Phase 3 — Critique (after the draft is written)

Read the draft back as a senior reviewer. Print:

```
## Critique

Strong
- <bullet>
- <bullet>

Soft spots
- <vague claim with no evidence> — line <N>
- <reads like a tutorial, not a post> — section <X>
- <missing failure mode>

Cut these
- <generic intro / outro>
- <obvious statement that wastes the reader's attention>
```

Then ask: _"Want me to revise based on these, or leave the critique standalone?"_

## After publication

When the user reports "published", update `progress.md`:
- Mark the stage's blog post deliverable `[x]` with the URL inline.
- Add a row to a `## Blog posts` table (create if not exists).

## Rules

- **Never draft from the roadmap outline alone.** That produces a generic post indistinguishable from any AI-written content. The user's concrete experience is the whole point.
- **Never use "we" if it's a solo project.** Either "I" (preferred) or omit the pronoun.
- **No marketing words.** "Powerful", "robust", "seamless", "leverage" → cut.
- **Title is fixed from the roadmap.** Do not let the user rename it; the title is the contract.
