# Skill Registry — albertproject

**Generated**: 2026-04-17
**Project stack**: Vite + React 18 + TypeScript + TailwindCSS

This registry lists available skills with pre-digested compact rules. Orchestrators inject matching rule blocks into sub-agent prompts at delegation time. Sub-agents do NOT read SKILL.md files directly.

---

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Creating a GitHub issue, bug report, feature request | `issue-creation` | `~/.claude/skills/issue-creation/SKILL.md` |
| Creating a PR, opening a pull request | `branch-pr` | `~/.claude/skills/branch-pr/SKILL.md` |
| "judgment day", "dual review", "doble review", "juzgar" | `judgment-day` | `~/.claude/skills/judgment-day/SKILL.md` |
| Creating a new AI skill or agent instruction | `skill-creator` | `~/.claude/skills/skill-creator/SKILL.md` |
| Go tests, Bubbletea TUI testing | `go-testing` | `~/.claude/skills/go-testing/SKILL.md` (N/A — project is TS/React) |

---

## Project Conventions

No project-level convention files detected (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `GEMINI.md` — none present).

Global conventions inherited from `~/.claude/CLAUDE.md`:
- Conventional commits only — NEVER add `Co-Authored-By` or AI attribution
- Never run `build` after changes
- Use `bat`/`rg`/`fd`/`sd`/`eza` instead of `cat`/`grep`/`find`/`sed`/`ls`
- Ask questions and STOP — never assume answers
- Verify technical claims before stating them — never agree without verification
- Rioplatense Spanish voseo for Spanish input; same warm energy in English

---

## Compact Rules

### issue-creation

```
- Blank issues disabled → MUST use a template (bug_report.yml or feature_request.yml)
- Every new issue auto-labels `status:needs-review`; maintainer adds `status:approved` before any PR
- Questions go to Discussions, NOT issues
- Required: pre-flight checkboxes (no duplicate + understands approval workflow)
- Bug template: Description, Steps to Reproduce, Expected, Actual, OS, Agent, Shell
- Feature template: Problem, Proposed Solution, Affected Area
- CLI: `gh issue create --template "bug_report.yml" --title "fix(scope): ..."`
- Title MUST follow conventional commit format (e.g. `fix(scope): description`)
```

### branch-pr

```
- Every PR MUST link an approved issue (`Closes #N` / `Fixes #N` / `Resolves #N`)
- Linked issue MUST have `status:approved` label
- PR MUST have exactly ONE `type:*` label (bug, feature, docs, refactor, chore, breaking-change)
- Branch regex: ^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$
- Commit regex: ^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9._-]+\))?!?: .+
- NO `Co-Authored-By` trailers in commits or PR body
- PR body template: Linked Issue → Type checkbox → Summary → Changes Table → Test Plan → Checklist
- Automated checks (PR Validation + CI) must pass before merge
```

### judgment-day

```
- Launch 2 blind judge sub-agents IN PARALLEL (single message, 2 Agent tool uses)
- Judges are independent — neither sees the other's verdict
- Synthesize: take UNION of critical findings, intersection of high-confidence agreements
- Apply fixes → re-run BOTH judges (iteration 2)
- Max 2 iterations. If still failing → escalate to user, do NOT fix blindly
- Triggers: "judgment day", "dual review", "doble review", "juzgar", "que lo juzguen"
```

### skill-creator

```
- Skills live in `~/.claude/skills/<name>/SKILL.md` with required frontmatter: name, description, license
- `description` MUST end with "Trigger: <when-to-use>" — this is how agents know when to load it
- Keep SKILL.md under 200 lines when possible; move deep details to companion files
- Structure: When to Use → Critical Rules → Workflow → Details → Commands
- Never reuse an existing skill name. Never invent skill names — scan existing skills first
```

### go-testing

```
NOT APPLICABLE — albertproject is TS/React. Skip this skill entirely.
```

---

## How Orchestrators Use This

1. Read this file (or fetch from engram: `mem_search "skill-registry"`)
2. For each sub-agent delegation, match skills by:
   - Code context (file extensions/paths the sub-agent will touch)
   - Task context (review, PR creation, issue creation, etc.)
3. Copy matching **Compact Rules** blocks into the sub-agent prompt under `## Project Standards (auto-resolved)`
4. Inject BEFORE the sub-agent's task-specific instructions

Sub-agents receive rules pre-digested — they do NOT read SKILL.md files themselves.
