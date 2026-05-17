# Scoring rubric

Used by `quiz-grader`. Both modes use the same 0-4 scale; what differs is the **bar** and the **voice**.

## The 0-4 scale

| Score | Label | What it means |
|---|---|---|
| 0 | Wrong | Factually incorrect, or "I don't know" |
| 1 | Partial | Right direction, missing the mechanism |
| 2 | Correct | The right answer, stated cleanly |
| 3 | Correct + trade-off | The right answer **and** the user names the trade-off it represents |
| 4 | Senior-level | 3 + the user identifies a failure mode, edge case, or scale consideration unprompted |

## Mode-specific bars

### Strict mode (interview voice)

- A "textbook correct" answer is **2/4**. Not "great", just "passes".
- 3/4 requires explicit articulation of *what's being traded off* (latency vs cost, recall vs precision, simplicity vs flexibility, etc.).
- 4/4 requires a *named* failure mode they'd flag.
- Feedback tone: terse, one bullet per gap. No praise.
- Verdict line: _"Mid-level: <score>. Senior bar: 3.0 average. Gap: <one sentence>."_

### Supportive mode (tutor voice)

- A "textbook correct" answer is **3/4**. Trade-off naming is encouraged not required.
- Feedback tone: 1 line on what's right, 1 line on the next step.
- Verdict line: _"Strong on <X>, next: practice <Y>."_

## What counts as a "trade-off"

The user must contrast against an alternative. Vague statements don't count.

| Counts as 3/4 | Does not count |
|---|---|
| "I picked X over Y because I lose ~A but save ~B of work I'd otherwise own." | "X is more convenient." |
| "Approach A > approach B here because <specific reason>, at the cost of <specific cost>." | "A is better." |

## What counts as a "failure mode" (4/4 bonus)

Specific, falsifiable, scale-aware:
- "<Mechanism> will misfire when <specific input pattern> because <specific reason> — false <negative|positive> on <signal>."
- "<Optimization> loses to <baseline> when <quantified condition> because of <named cost>."

Not specific enough:
- "It might break in production."
- "Costs could go up."

## Per-question rubric: trade-off questions

| Element | Required for | Notes |
|---|---|---|
| States the user's choice | 2/4 | "I'd pick X" |
| Names the alternative considered | 2/4 | "vs Y" |
| One concrete pro of choice | 2/4 | |
| One concrete con of choice | 3/4 | the trade-off |
| Failure-mode or scale qualifier | 4/4 | |

## Per-question rubric: quick-check questions

| Element | Required for |
|---|---|
| Stated fact is correct | 2/4 |
| Mechanism / "why it works" | 3/4 |
| Edge case or failure | 4/4 |

## Per-question rubric: scenario walk-throughs

| Phase | Required for 3/4 |
|---|---|
| **Investigate** | Names what to look at first + what signal you'd expect |
| **Mitigate (hour)** | Specific, reversible, low-risk fix in scope |
| **Fix (week)** | Addresses root cause + has a rollback story |

A 4/4 scenario also names **what could make the mitigation wrong** before applying it.
