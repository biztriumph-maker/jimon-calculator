# JIMON Calculator - compact context map

## Project

- React/Vite/TypeScript calculator. Application code is under src/.
- Runtime entry: src/main.tsx; shell/navigation: src/app/.
- Main feature areas: src/features/; shared UI: src/components/.
- Business model and calculations: src/domain/.
- Product/catalog data: src/data/catalog.ts and related files under src/data/.
- Product detail screen: src/features/product-info/ProductDetailScreen.tsx.
- Images: public/images/ and src/assets/.
- Tests are colocated as *.test.ts under src/.

## Selective reading routes

- Product card/detail: relevant data in src/data/, src/domain/types.ts, ProductDetailScreen.tsx, and related product-info tests.
- Calculations: src/domain/calculator.ts, src/domain/thresholds.ts, related calculator tests, and only needed price data.
- Catalog/filtering: src/features/catalog/, catalog data, and related tests.
- Purchase plan: src/features/purchase-plan/, calculation model, and related tests.
- Onboarding/navigation: the relevant feature folder, src/app/, and matching tests.
- Visual change: the current screen component/styles plus 14_UI_VISUAL_CONTRACT.md, the applicable lock file, and required approved reference only.
- Deployment: PROJECT_DEPLOYMENT.md, package.json, vite.config.ts, and relevant TypeScript config.
- Data import/accuracy: inspect only the required workbook sheet/range from 02_JIMON_MASTER_DATA.xlsx.

## Document priority

1. User's current task and explicit constraints.
2. AGENTS.md and this routing map.
3. Current source code, tests, and data used by the task.
4. The applicable focused specification or visual contract.
5. Historical prompts and broad playbooks only when directly relevant.

13_FINAL_CODEX_TASK.md is historical project context; its instruction to read all listed sources does not apply automatically to every new task. 16_CODEX_HOME_SCREEN_TASK.md applies only to the home-screen visual scope. 99_VISUAL_IMPLEMENTATION_PLAYBOOK.md is guidance, not a requirement to repeat every procedure.

## Verification commands

- Formatting/whitespace-only documentation check: git diff --check.
- Focused tests: npm test -- --run <relevant test path> when behavior changed.
- Full tests: npm test only when requested or when broad behavior changed.
- Build: npm run build only when build/config/integration changes require it.
- Visual/mobile checks: only for visual changes; do not create screenshots for documentation-only work.

Do not claim a check was run when it was not run.