# Biome + Prettier Setup

**Date:** 2026-06-25
**Status:** Approved

## Problem

The project has no linter or code formatter configured. As TypeScript and component files are added, consistent code style and static analysis will be needed.

## Constraints

- Biome does not support `.astro` files — only JS, TS, JSX, TSX, CSS, and JSON.
- The project uses pnpm.
- No pre-commit hooks or CI enforcement in scope.

## Solution

Two tools with a clear, non-overlapping split of responsibility:

| Tool | File types | Role |
|---|---|---|
| Biome | `.ts`, `.js`, `.tsx`, `.jsx`, `.css`, `.json` | Lint + format |
| Prettier | `.astro` only | Format only |

Biome explicitly ignores `.astro` files. Prettier is scoped to `.astro` only via `.prettierignore`. There is no overlap.

## Packages

Dev dependencies to install:

- `@biomejs/biome`
- `prettier`
- `prettier-plugin-astro`

## Configuration Files

### `biome.json`

- Formatter: 2-space indent, double quotes, trailing commas (ES5 style)
- Linter: recommended ruleset enabled
- Organise imports: enabled
- `files.ignore`: `["**/*.astro"]`

### `prettier.config.mjs`

Minimal — sole purpose is loading `prettier-plugin-astro`. No formatting rules defined here (Biome owns those for non-Astro files).

### `.prettierignore`

Ignores all files except `.astro`:

```
*
!*.astro
!src/**/*.astro
```

## Scripts

Added to `package.json`:

```json
"lint":    "biome lint ./src",
"format":  "biome format --write ./src && prettier --write \"src/**/*.astro\"",
"check":   "biome check ./src && prettier --check \"src/**/*.astro\""
```

- `lint` — static analysis only, no writes
- `format` — auto-fixes formatting across all files
- `check` — CI-friendly: lint + format check, exits non-zero on violations

## Out of Scope

- Pre-commit hooks
- VS Code workspace settings
- CI pipeline integration
- ESLint (replaced by Biome)
