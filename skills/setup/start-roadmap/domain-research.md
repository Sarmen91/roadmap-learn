# Domain research

Web-search prompt patterns `start-roadmap` uses before drafting the roadmap. Run at least 3 searches; capture results into a working buffer; cite sources inline in the draft.

The goal is **currency** — your training data may be 6–18 months stale. The user's roadmap should reflect what hiring panels and senior engineers are using *now*, not what was hot two years ago.

## Mandatory searches (run all 3)

### 1. Current stack / canonical tools

Search pattern (substitute `<domain>` and `<year>`):

```
senior <domain> stack <year>
what tools are senior <domain>s using in <year>
<domain> best practices <year>
```

Look for: tool names, framework versions, deprecated patterns, recent migration posts. Bias toward primary sources (vendor blogs, talks, GitHub READMEs) over secondary aggregators.

### 2. What interviews test for

Search pattern:

```
senior <domain> interview questions <year>
<domain> hiring rubric <year>
what does a senior <domain> need to know <year>
```

Look for: the four-five topics that come up in *every* interview at that level. These become the backbone of the assessment / Self-check sections.

### 3. Landmark posts / papers / talks in the last 12 months

Search pattern:

```
best <domain> blog posts <year>
must-read <domain> papers <year>
<domain> conference talks <year>
```

Look for: 6–10 candidate items for the Papers section. Bias toward posts that taught you something new in your own search — those are the ones with real signal.

## Optional searches (run if relevant)

### Common production failure modes

```
<domain> postmortems <year>
<domain> production incidents
<topic in domain> failure mode
```

Use these to seed `[fm]`-tagged Self-check questions and to inform acceptance criteria ("observable in logs" etc.).

### What's deprecated / changed

```
<domain> what's changed in <year>
<old framework / api / pattern> alternatives <year>
```

Use these to avoid putting stale guidance in the roadmap.

## Capture format (your working buffer)

Keep notes structured so you can cite them later:

```
[1] Title — URL — date — one-line takeaway
[2] Title — URL — date — one-line takeaway
...
```

When you cite in the roadmap, use inline footnote-style references:

```
... uses <tool> as the canonical <role> in <domain> in <year> [1].
```

The user should be able to click `[1]` and verify.

## Anti-patterns

- **Do not search and skip reading.** Skim the result, write the takeaway, then move on. A search you didn't read is worse than no search.
- **Do not trust a single source for a controversial claim.** If two sources disagree on the canonical tool, surface that in the roadmap ("[community is split: A vs B — quick comparison below]").
- **Do not search for "best <library>" without a version year.** Bias toward "in 2026" / "this year" / "latest" qualifiers so stale results rank lower.
- **Do not bury sources in a `## References` section.** Footnote them inline — the user should know which claim came from which source while reading.

## When the domain is niche

If the domain has < 3 quality recent sources (e.g. a very narrow specialization), tell the user before drafting:

> _"Heads-up: only N current sources found for this domain. The roadmap may lean on older patterns. After we ship the draft, plan to revisit it at week 4 to incorporate anything new."_

Then draft anyway — but mark the stale sections with `<!-- needs-refresh -->` so they surface in `weekly-review`.
