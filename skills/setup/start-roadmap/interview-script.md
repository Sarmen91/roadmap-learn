# Interview script

The question flow `start-roadmap` walks the user through. Ask **one section at a time**, present the explainer first, then the question.

Assume the user does not know what these terms mean. The explainer is short (2 lines max) — it explains *why* you're asking, not the answer.

---

## Section A — Domain capture

> Explainer: I'll turn "I want to learn X" into a structured roadmap with stages, acceptance criteria, and assessments. To do that I need a domain — broad is fine, I'll sharpen it with you.

**Question A.1.** _"What do you want to learn or get better at? Don't worry about being precise — '<role I want>', '<technology I want to be senior in>', or '<career transition>' are all fine."_

If the answer is fuzzy ("backend stuff"), follow up once: _"More specifically — backend in what context? Web APIs, data pipelines, distributed systems, low-latency trading, embedded?"_

**Question A.2.** _"Pick a short slug for filenames (kebab-case, ASCII)."_ Propose one based on A.1, e.g. `senior-backend`, `sre`, `ml-platform`. Confirm.

---

## Section B — Web grounding

(No questions here — this is your job, not the user's. Run the searches in `domain-research.md`, then announce one line to the user.)

> _"Grounded the draft with N web sources from the last 12 months. I'll cite them inline so you can audit before approving the roadmap."_

---

## Section C — Timeline

> Explainer: This decides how many stages and what fits in each. Tight timelines force scope cuts; longer ones leave room for habits like papers and source-reading.

**Question C.1.** _"How long are you giving yourself? (e.g. 4 weeks intensive, 16 weeks part-time, open-ended)"_

**Question C.2.** _"How many hours per week, realistically? (be honest — better to under-commit and ship than over-commit and stall)"_

---

## Section D — Current level

> Explainer: The roadmap starts where you are. Telling me what you already ship today lets me skip stages you'd find trivial and dwell on the gaps.

**Question D.1.** _"What do you already ship today, in one sentence? Concrete: 'I ship CRUD APIs in NestJS' beats 'I'm a backend dev'."_

**Question D.2.** _"What's the gap you're trying to close? One sentence. (e.g. 'I've never operated a system on-call', 'I can use OpenAI APIs but don't know RAG', 'I've never owned a migration')."_

---

## Section E — Goal artifact

> Explainer: The roadmap is more useful when it's pointed at a concrete artifact. A portfolio project, a job title you're chasing, a talk you want to give, a promo packet. This is what the blog posts and ADRs feed into.

**Question E.1.** _"What's the artifact at the end? Pick one — portfolio project / new job / promotion / talk / open-source contribution. Then name it specifically."_

**Question E.2.** _"What's the working name of the project you'll build through the roadmap? (1–2 words; if you don't have one, propose: <domain_slug>-project)"_

---

## Section F — Output preferences

> Explainer: Senior signal comes from artifacts that survive the session — blog posts, ADRs, talks. Pick what you'll actually do, not what sounds impressive. Too many outputs = none ship.

**Question F.1.** _"Which outputs will you commit to (pick any, default = 1 blog post per stage + 1 ADR per stage)?"_

Options:
- Blog post per stage
- ADR per major decision
- Talk / lightning talk at end
- Open-source PR
- Tweet thread per stage
- Internal write-up only (no public output)

---

## Section G — Assessment preferences

> Explainer: How aggressively do you want the platform to push back? Mock interviews are adversarial; self-quizzes are graded against a rubric; Feynman is the "explain it to a non-engineer" drill. Pick the mix.

**Question G.1.** _"Pick one default grading voice — strict (senior-interviewer voice, textbook-correct = 2/4) or supportive (tutor voice, textbook-correct = 3/4)?"_

**Question G.2.** _"Which assessments will you actually do (pick any, default = quiz per stage + 1 mock at the end)?"_

Options:
- Self-quiz per stage
- Mock interview at end
- Mock interview per stage (intensive)
- Feynman pass per stage
- Source-code read per stage (3–4 functions)
- Paper reading (1 every 2 weeks)

---

## Section H — Stage count

> Explainer: Stages bundle weeks together by theme. Default: 8 stages for 12+ weeks, 4–6 stages for shorter timelines. Last 1–2 stages are usually polish / portfolio / capstone.

**Question H.1.** _"Propose <N> stages over <timeline_weeks> weeks (about <weeks_per_stage> weeks each). Adjust?"_

---

## Wrap-up

After Section H, before drafting, recap **the captured fields** as a single readable summary, and ask: _"Anything off? If not, I'll draft the roadmap (~30 seconds)."_

When the user approves, draft using `roadmap-template.md`.
