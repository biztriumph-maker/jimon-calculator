# JIMON Calculator - Codex project rules

These rules apply to work in this repository.

## Scope and reading

- Work only within the current user task and its stated scope.
- Before editing, inspect the current Git branch, HEAD, and `git status`.
- Read this file first, then read only the relevant sections of `CODEX_CONTEXT.md`.
- Do not automatically read every project document, source file, asset, build output, or dependency.
- Do not read the Excel workbook in full unless the current task requires specific sheets or cells.
- Use the task routing in `CODEX_CONTEXT.md`; treat historical task prompts as non-automatic context.

## Safety and fidelity

- Do not change prices, discounts, SKU, points, formulas, product data, approved text, or locked visuals without explicit task scope.
- Preserve unrelated user changes. Never overwrite or revert them.
- Do not add components, documents, dependencies, or refactors unless required by the task.
- Do not run subagents unless the task explicitly requires them and the benefit is clear.
- Do not repeat checks, screenshots, overlays, or reports when the relevant inputs are unchanged.
- Avoid destructive Git commands (reset --hard, force push, broad deletion).

## Verification and handoff

- Use the smallest relevant existing tests and checks for the changed scope.
- Run build, tests, UI screenshots, or deployment checks only when required by the task or by changed behavior.
- For visual work, perform the final target mobile check; use overlay/diff only when exact comparison is needed.
- Make one concise final report listing changed files, checks, and unresolved issues.
- Commit or push only when explicitly requested by the user or task.