# Agent notes

This is the **public** Mintlify documentation for Praxicraft Assess (`docs.praxicraft.com`).

## Layout

| Path | Purpose |
|------|---------|
| `index.mdx` | Landing page (only guide MDX at repo root) |
| `guides/` | Get started + Product guides (nav split in `docs.json`) |
| `integrations/` | ATS, chat, automations, MCP, agents |
| `sdks/` | Official client & CLI docs |
| `api-changelog/` | Public API release notes |
| `docs.json` | Navigation, redirects, theme, SEO — **Guides** = get started only; **Product** = assessments, jobs, screening, etc. |
| `openapi.json` | API Reference playground |

Do **not** dump new guides at the repo root — put them under the matching folder and register them in `docs.json`.

## Rules

- Prefer editing MDX + `docs.json` together.
- Do not invent Public API paths; verify against `openapi.json`.
- Writing tone: see `STYLE.md`.
- When moving pages, add redirects in `docs.json` so old URLs keep working.
