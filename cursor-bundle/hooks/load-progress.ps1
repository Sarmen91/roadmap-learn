# load-progress.ps1
# Deterministic alternative to the sessionStart prompt hook.
# Reads learning-state/progress.md and emits additional_context to the agent.
#
# To enable: see ./README.md

# Read stdin (Cursor sends hook event JSON on stdin; we ignore the contents but consume them)
$null = [Console]::In.ReadToEnd()

$progressPath = Join-Path (Get-Location) "learning-state/progress.md"

if (-not (Test-Path $progressPath)) {
    @{
        additional_context = "No learning-state/progress.md found yet. Run the start-roadmap skill to bootstrap."
    } | ConvertTo-Json -Compress
    exit 0
}

$content = Get-Content $progressPath -Raw

# Extract the "Current state" block (between '## Current state' and the next '## ')
$currentStateMatch = [regex]::Match($content, '(?ms)## Current state\s*\r?\n(.*?)(?=^## )')
if ($currentStateMatch.Success) {
    $currentState = $currentStateMatch.Groups[1].Value.Trim()
} else {
    $currentState = "(could not parse Current state block from progress.md)"
}

# Count checked vs total acceptance criteria across the file (rough but useful)
$checked  = ([regex]::Matches($content, "- \[x\]")).Count
$total    = ([regex]::Matches($content, "- \[[ x!~]\]")).Count
$pct      = if ($total -gt 0) { [math]::Round(($checked / $total) * 100) } else { 0 }

$context = @"
## Roadmap session-start context

$currentState

**Overall progress:** $checked / $total checked ($pct%).

Tell the user: 'Use "what's next" for navigator, "dashboard" for full status, or just start working.'
"@

@{
    additional_context = $context
} | ConvertTo-Json -Compress

exit 0
