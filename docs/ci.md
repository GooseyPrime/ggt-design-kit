# CI

Workflow: `.github/workflows/ci.yml`

Job name **`package`** (validate package.json + CSS entry + `npm pack --dry-run`).

## Required check on `main`

Brandon: Settings → Branches → `main` protection → require status check **`package`**.

Merge the scaffold PR first so `src/index.css` exists on `main`, then this CI is meaningful on every PR.
