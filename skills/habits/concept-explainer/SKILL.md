---
name: concept-explainer
description: Explains a technical concept at a chosen depth (1-5) — from "what is it" to "implement from scratch and name its weakness". Anchored to the roadmap's vocabulary. Use when the user says "explain X", "explain X at depth N", "go deeper on X", "what is X", or types /explain.
---

# Concept explainer

Depth-tunable explanations. Default depth = **3**.

## Depths

| Depth | Audience analog | What you give |
|---|---|---|
| 1 | Engineering manager | One paragraph, no jargon. What problem it solves. |
| 2 | Mid-level engineer new to the domain | One page. Mechanism in plain words. One example. |
| 3 | The user (target depth) | Mechanism + the **trade-off** vs the alternative + one **failure mode**. <= 400 words. |
| 4 | Senior interviewer | Depth 3 + walk-through of how you'd implement the core idea in pseudocode. |
| 5 | "Implement from scratch" | Depth 4 + a minimal working code sketch + the **named weakness** at scale. |

## Workflow

1. **Parse the request.** Extract topic + depth (default 3). If the topic is multi-word and ambiguous, pick the closest roadmap-vocabulary term and confirm in one line.

2. **Constrain to roadmap vocabulary.** Read `learning-state/config.md` → `roadmap_file`. If the concept exists in the roadmap, use the same terms the roadmap uses. Cite the stage anchor (e.g. _"see stage:2"_).

3. **Output structure** (depth >= 3):

   ```
   ## <Concept> · depth <N>

   **What it is**
   <one sentence>

   **How it works (mechanism)**
   <2-4 sentences>

   **The trade-off**
   You pay <X> to get <Y>. The alternative is <Z>, which trades it the other way.

   **Failure mode**
   <one concrete, falsifiable failure>

   **Where you'll meet it in <project_name>**
   Stage <N> (from roadmap anchor stage:<N>).
   ```

4. **End with one offer:**
   _"Want depth +1 · flashcard this · quiz me on it · or move on?"_

## Examples (pattern, not full answers)

- "explain X at depth 3" → trade-off is _"robust to <property A> at the cost of <property B>"_
- "explain Y at depth 4" → pseudocode shows where the key decision lives + how it's parameterized
- "explain Z at depth 5" → minimal sketch + the failure mode under <stress / scale condition>

## Rules

- **Never exceed 400 words at depth 3.** Concision is the product.
- **Always name an alternative.** A concept explained in isolation is a definition; explained against an alternative, it's understanding.
- **Never invent a failure mode.** If unsure, say _"plausible failure modes I'd test for: ..."_ instead.
- **Never copy-paste roadmap text.** Compress in your own words; the user has already read it.
