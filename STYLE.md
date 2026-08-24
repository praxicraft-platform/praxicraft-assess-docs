# Assess docs style kit (internal)

Not published in the Mintlify nav. Use when rewriting or reviewing pages.

## Audience

Two readers on every guide when the topic touches hiring ops:

1. **Recruiting / TA / ops** — dashboard-first, no assumed terminal knowledge
2. **Engineers / ATS integrators** — Public API, SDKs, webhooks, MCP

## Voice

- Second person (“you”)
- Short sentences; lead with the action
- Explain *why* when it prevents a common mistake
- No marketing fluff or aspirational features
- Open with **plain language**; put HTTP tables and curl under a clear “For engineers” heading
- Prefer a section titled **If you are recruiting / ops** with `<Steps>` and dashboard links before API details
- Say explicitly when someone does **not** need an API key


## Page hero (title → description → body)

Mintlify renders `description` as the subtitle under the H1. Readers see:

1. **Title**
2. **Description** (one line)
3. **First body paragraph**

Rules:

- Description = the promise of the page (what / why)
- First body paragraph = the next thought (how / who / where) — **never restate the description**
- Prefer a short opener before the first `##` so the subtitle is not stranded above a heading
- Avoid stacking two marketing slogans back-to-back on Introduction and About

## Accuracy gate

Before claiming a behavior, verify against:

1. `openapi.json` (refresh from backend when stale — see README)
2. `backend/apps/assess/` Public API views/serializers
3. Shipped SDKs: `praxicraft-python`, `praxicraft-node`, `praxicraft-go`
4. MCP (`@praxicraft/assess-mcp`) / n8n (`@praxicraft/n8n-nodes-assess`) only as implemented

Rules:

- Document **only what ships today**
- Field names must match responses (`invite_token`, not `token`)
- Public API responses are **flat JSON** — not `{ "status", "data" }`
- Error shape: `{ "error": { "code", "message", "details?" } }` — branch on `error.code`
- If something is dashboard-only, say so
- Do not invent endpoints, plans, providers, or SDK methods

## Components

Prefer Mintlify components over walls of prose:

- `<CardGroup>` / `<Card>` for paths and next steps
- `<Steps>` for sequential setup
- `<CodeGroup>` for curl | Python | Node | Go
- `<Tabs>` when comparing approaches
- `<Note>` / `<Warning>` for constraints

## Canonical facts

| Item | Value |
|------|--------|
| Base URL | `https://assess.praxicraft.com` |
| API prefix | `/api/v1/public/` |
| Auth | `Authorization: Bearer ct_live_…` or `ct_test_…` |
| Env | `PRAXICRAFT_API_KEY`, optional `PRAXICRAFT_API_BASE_URL` |
| Webhook secret | `whsec_…` |
| Signature header | `X-Praxicraft-Signature: sha256=<hex>` |
| Invite field | `invite_token` |
| ReDoc | `https://assess.praxicraft.com/api/v1/public/redoc/` |
| Dashboard roles | `owner`, `admin`, `developer`, `recruiter`, `reviewer`, `member` (no `viewer`) |

## Code samples

- Prefer real path shapes and response fields from OpenAPI
- SDK snippets must match published client APIs
- Never commit real keys; use placeholders like `ct_live_xxxxxxxxxxxxxxxx` or `ct_test_xxxxxxxxxxxxxxxx`
