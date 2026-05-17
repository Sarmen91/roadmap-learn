# Learning platform config

> Single source of truth for "which roadmap, which domain, which mode". All skills read this file at runtime — there are no hardcoded domain references anywhere else.
>
> Written by `start-roadmap` on first run. Edited by hand any time (effect is immediate). Owned by you, not by the skills.

roadmap_file: {{roadmap_file}}
domain: {{domain}}
domain_slug: {{domain_slug}}
project_name: {{project_name}}
stage_count: {{stage_count}}
timeline_weeks: {{timeline_weeks}}
weekly_hours: {{weekly_hours}}
started: {{YYYY-MM-DD}}
mode: {{strict | supportive | mixed}}

## Notes

- `roadmap_file` is a path relative to repo root.
- `mode` is the default grading mode; `quiz-runner` accepts an override per invocation.
- Any extra `key: value` lines you add here are ignored by current skills but will not break parsing.
