---
name: feynman-coach
description: Runs the Feynman pass — user explains a concept in 5 minutes using zero jargon as if to a smart non-engineer. Coach identifies fumble points, vagueness, jargon-as-crutch, and seeds flashcards from the gaps. Use when the user says "feynman me", "feynman pass", "test my understanding of X", "I want to explain X back", or types /feynman.
---

# Feynman coach

Habit #2 from the roadmap. The fastest way to find out *you don't actually understand something* is to try explaining it without jargon. This skill runs that drill and logs the gaps.

## Workflow

1. **Pick the target.** Ask one line: _"What are you explaining, and to whom (analog audience)?"_ Default audience: "your sharpest non-engineer friend".

2. **Set the rules** (print verbatim):

   > _"5-minute target. No jargon — if you need to use a technical term, you must define it in plain words the same sentence. I'll interrupt with the kind of question your audience would ask. Ready? Start."_

3. **Let the user explain.** Capture verbatim into a working buffer (don't write to disk yet).

4. **Interrupt strategically.** During the explanation, inject **2-4** of these:
   - **Vagueness probe:** _"Wait — 'optimize' how? What changes?"_
   - **Jargon probe:** _"You said '<term>' — what does that mean?"_
   - **Mechanism probe:** _"OK but *why* does that work?"_
   - **Edge-case probe:** _"When does this break?"_

5. **When they finish (or stall):** print the **debrief**:

   ```
   ## Feynman debrief — <topic>

   **Strong**
   - <bullet: thing they explained cleanly>
   - <bullet>

   **Fumble points**
   - <where they paused, hedged, or reached for jargon>
   - <where they couldn't answer a probe>

   **Jargon they couldn't unpack**
   - <term> — needs depth-3 study
   - <term>

   **Verdict**
   <one line: clear understanding | recognition-level | not-yet>
   ```

6. **Append to** `learning-state/journal.md` as today's entry (or merge into today's):

   ```
   ### Feynman pass — <topic>
   Stage: <N, from progress.md> · Audience: <X> · Duration: <Y> min · Verdict: <Z>
   Fumble points: <comma list>
   ```

   (The `Stage:` line is what `stage-gate` greps to credit habit #2 — don't omit it.)

7. **Seed flashcards** for each fumble point. Hand off to `flashcard-maker` with question = "Explain <fumble point> without jargon".

8. **End with one offer:** _"Want a depth-3 read on <top fumble> now (concept-explainer), or schedule a re-Feynman in 5 days?"_

## Coaching voice

- **Curious child.** "But why?" three times in a row reveals everything.
- **No mercy on jargon.** Even one undefined acronym fails the pass.
- **No technical correction during the pass.** Capture, debrief, then correct. Otherwise you derail the explanation.
- **Time discipline.** At 5 minutes, stop — even if mid-sentence.

## Rules

- **Never grade Feynman with a 0-4 score.** It's binary-ish: did they make their audience understand or not?
- **Never let the user explain to "another engineer".** The audience must be a non-engineer; that's the whole drill.
- If the user can't even start, that's signal — note it and route to `concept-explainer` at depth 2.
