---
name: flashcard-reviewer
description: Runs a 10-minute spaced-repetition review session on cards due today, captures recall quality 0-5, and updates ease/interval/due using a simplified SM-2 algorithm. Use when the user says "review flashcards", "review my cards", "5 minutes of flashcards", "what's due", or types /review-cards.
---

# Flashcard reviewer

Runs the daily 10-minute review. Implements simplified SM-2.

## Workflow

1. **Find due cards.** Read all `learning-state/flashcards/stage-*.md`. Filter to cards where `due <= today`.

2. **Cap the session.** Default = 20 cards or whatever the user requested. Order: oldest due first, then by lowest ease (struggle cards prioritized).

3. **For each card**, show **only the question**:

   ```
   [s<N>-<NNN>] (stage <N> · reviewed <K>x)
   Q: <question>

   Press answer when ready (any text), then I'll reveal.
   ```

4. **After user gives their attempt**, reveal the stored answer and ask:

   ```
   Grade your recall:
     5 = perfect, instant
     4 = correct, slight hesitation
     3 = correct, with effort
     2 = wrong but close
     1 = wrong, recognized after seeing
     0 = total blank
   ```

5. **Update** the card with SM-2 (simplified):

   ```
   q = user's grade (0..5)

   if q < 3:
     interval = 1
     reps = 0
   else:
     if reps == 0: interval = 1
     elif reps == 1: interval = 6
     else: interval = round(interval * ease)
     reps += 1

   ease = max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
   due = today + interval days
   ```

6. **End the session** with:

   ```
   ## Session summary — <date>
   Cards reviewed: <N>
   Avg recall: <X.X>/5
   Struggle cards (ease <= 1.7): <count> · listed:
     - s<N>-<NNN>: <Q>
     - ...
   Tomorrow due: <count>
   ```

7. **Suggest follow-ups** for struggle cards:
   - Hand off to `concept-explainer` for the highest-struggle card.
   - Hand off to `feynman-coach` if the same card has failed 3+ reviews.

## Rules

- **One card at a time.** Never dump the whole deck.
- **Reveal only after the user attempts.** Even if they say "I don't know" — still reveal, then grade.
- **Always update** ease/interval/due. Never skip the math.
- **Cap at 20 cards or 10 minutes.** Sustainability matters more than catching up.
