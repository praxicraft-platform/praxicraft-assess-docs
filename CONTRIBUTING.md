# Contributing to Praxicraft Assess docs

Thanks for helping improve Assess documentation.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md). Report unacceptable behavior to [support@praxicraft.com](mailto:support@praxicraft.com).

## Getting started

1. Fork this repository.
2. Clone your fork and create a branch.
3. Preview locally:

```bash
npx mintlify@latest dev
```

4. Open a pull request with a clear description of the change.

Put new guide pages under `guides/`, integration pages under `integrations/`, SDK pages under `sdks/`, and changelog entries under `api-changelog/`. Register them in `docs.json`. Keep the repo root free of guide MDX except `index.mdx`.

## What to contribute

- Clarifications and typo fixes
- New examples (curl / SDK) that match the live Public API
- Integration guides (ATS, Zapier, n8n, Make, MCP)
- Changelog entries when the Public API changes (coordinate with maintainers)

## Style

Follow [`STYLE.md`](./STYLE.md). Prefer accurate, concise DevRel tone. Do not invent endpoints or scopes that are not in `openapi.json` / the live API.

## Review

Maintainers review for accuracy against Assess production behavior and OpenAPI. Small, focused PRs merge faster.

## Community

- Live docs: https://docs.praxicraft.com
- Support: support@praxicraft.com
