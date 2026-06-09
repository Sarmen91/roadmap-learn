# Source-read targets

Habit #4 — read 3-4 library functions per stage to demystify the frameworks you depend on.

Seeded from the roadmap's `Required reading` and `Build` sections by `bootstrap-state`. The list is a starting point — replace with whatever you're actually using.

## Targets by stage

<!-- Repeat per stage. bootstrap-state generates 2-4 targets per stage. -->

| Stage | Library function | Why it's worth reading |
|---|---|---|
| {{N}} | `{{library}}.{{function}}` | <One sentence: what mental model does reading this give you?> |
| {{N}} | `{{library}}.{{function}}` | <One sentence> |

## Picking your own

Bias toward functions that are:

- **30-60 lines, not 600.** The point is "this is just code" — long functions defeat that.
- **At the boundary** between your code and the framework. The handler your decorator wraps; the method your config gets passed to.
- **Doing something you couldn't replace in an afternoon.** That's where the framework actually earns its keep — and where its assumptions live.

When you read a new function, log the "aha" via `source-code-reader` so it gets a journal entry + flashcard.
