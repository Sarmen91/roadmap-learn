#!/usr/bin/env node
// load-progress.mjs
// Deterministic alternative to the sessionStart prompt hook.
// Reads learning-state/progress.md and emits session-start context to the agent.
//
// Cross-platform (Windows / mac / Linux) and cross-agent:
//   node load-progress.mjs --agent=cursor   -> {"additional_context": "..."}            (Cursor hooks.json)
//   node load-progress.mjs --agent=claude   -> {"hookSpecificOutput": {...}}            (Claude Code settings.json)
//
// Node is a safe dependency: this package is installed via `npx skills`, so Node exists.
// To enable: see ./README.md

import { readFileSync } from "node:fs";
import { join } from "node:path";

const agent = (process.argv.find((a) => a.startsWith("--agent=")) ?? "--agent=cursor").split("=")[1];

// Consume stdin (hook event JSON); contents are not needed.
// Skip when attached to a TTY (manual run) — reading fd 0 would block forever there.
try { if (!process.stdin.isTTY) readFileSync(0, "utf8"); } catch { /* no stdin */ }

function emit(context) {
  if (agent === "claude") {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: context },
    }));
  } else {
    process.stdout.write(JSON.stringify({ additional_context: context }));
  }
  process.exit(0);
}

let content;
try {
  content = readFileSync(join(process.cwd(), "learning-state", "progress.md"), "utf8");
} catch {
  emit("No learning-state/progress.md found yet. Run the start-roadmap skill to bootstrap.");
}

// Extract the "Current state" block (between '## Current state' and the next '## ' or end of file)
const m = content.match(/## Current state\s*\r?\n([\s\S]*?)(?=\r?\n## |$)/);
const currentState = m ? m[1].trim() : "(could not parse Current state block from progress.md)";

// Count only acceptance criteria (lines carrying an ac:sN-M anchor) — not deliverables or habits
const checked = (content.match(/<!-- ac:s\d+-\d+ -->\s*- \[[xX]\]/g) ?? []).length;
const total = (content.match(/<!-- ac:s\d+-\d+ -->\s*- \[[ xX!~]\]/g) ?? []).length;
const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

emit(`## Roadmap session-start context

${currentState}

**Acceptance criteria:** ${checked} / ${total} checked (${pct}%).

Tell the user: 'Use "what's next" for navigator, "dashboard" for full status, or just start working.'`);
