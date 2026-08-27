#!/usr/bin/env node
/**
 * Build praxicraft-assess.postman_collection.json from assess-docs/openapi.json.
 *
 * Curated example bodies win over OpenAPI placeholders so invite_token, flat JSON,
 * and whsec_… stay correct even when the snapshot is sparse.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(root, "..");
const openapiPath = path.join(docsRoot, "openapi.json");
const outPath = path.join(docsRoot, "praxicraft-assess.postman_collection.json");

const jsonBody = (obj) => ({
  mode: "raw",
  raw: JSON.stringify(obj, null, 2),
  options: { raw: { language: "json" } },
});

const EXAMPLES = {
  "POST /api/v1/public/assessments/create/": {
    title: "Backend take-home",
    description: "Draft assessment. Attach tasks, then PATCH status to active before inviting.",
  },
  "POST /api/v1/public/assessments/{slug}/invites/": {
    email: "ada@example.com",
    name: "Ada Lovelace",
    send_email: true,
    external_id: "gh_cand_123",
  },
  "POST /api/v1/public/assessments/{slug}/invites/bulk/": {
    send_email: true,
    candidates: [
      { email: "ada@example.com", name: "Ada Lovelace", external_id: "gh_cand_123" },
      { email: "al@example.com", name: "Al Turing", external_id: "gh_cand_124" },
    ],
  },
  "POST /api/v1/public/webhooks/create/": {
    url: "https://example.com/hooks/praxicraft",
    kind: "https",
    events: ["assessment.completed", "candidate.passed", "candidate.failed"],
  },
  "PATCH /api/v1/public/webhooks/{id}/": {
    events: ["assessment.completed", "candidate.passed"],
  },
  "POST /api/v1/public/assessments/{slug}/tasks/attach/": {
    tasks: [{ task_id: "{{task_id}}", source: "platform" }],
  },
  "PUT /api/v1/public/assessments/{slug}/tasks/replace/": {
    tasks: [{ task_id: "{{task_id}}", source: "platform" }],
  },
  "PATCH /api/v1/public/assessments/{slug}/update/": {
    status: "active",
  },
  "POST /api/v1/public/pipelines/{slug}/enroll/": {
    email: "ada@example.com",
    name: "Ada Lovelace",
    send_email: true,
  },
};

const PATH_VARS = {
  slug: "assessment_slug",
  token: "invite_token",
  id: "id",
  delivery_id: "delivery_id",
  task_id: "task_id",
  provider: "provider",
};

function firstExample(content) {
  const json = content?.["application/json"];
  if (!json) return null;
  if (json.example && typeof json.example === "object") return json.example;
  const examples = json.examples || {};
  for (const ex of Object.values(examples)) {
    if (ex && typeof ex === "object" && ex.value && typeof ex.value === "object" && !ex.value.error) {
      return ex.value;
    }
  }
  return null;
}

function postmanUrl(apiPath) {
  const parts = apiPath.replace(/^\//, "").split("/");
  const variables = [];
  const mapped = parts.map((part) => {
    const m = part.match(/^\{(.+)\}$/);
    if (!m) return part;
    const name = PATH_VARS[m[1]] || m[1];
    variables.push({ key: name, value: "" });
    return `:${name}`;
  });
  return {
    raw: `{{base_url}}/${mapped.join("/")}`,
    host: ["{{base_url}}"],
    path: mapped,
    variable: variables,
  };
}

function requestItem(apiPath, method, operation) {
  const key = `${method.toUpperCase()} ${apiPath}`;
  const curated = EXAMPLES[key];
  const openapiExample = firstExample(operation.requestBody?.content);
  const bodyObj = curated || openapiExample;
  const needsJson =
    bodyObj && ["post", "put", "patch"].includes(method) && operation.requestBody;
  const headers = [{ key: "Accept", value: "application/json" }];
  if (needsJson) headers.push({ key: "Content-Type", value: "application/json" });

  const request = {
    method: method.toUpperCase(),
    header: headers,
    url: postmanUrl(apiPath),
    description: operation.description || operation.summary || "",
  };
  if (needsJson) request.body = jsonBody(bodyObj);

  return {
    name: operation.summary || key,
    request,
  };
}

function main() {
  const spec = JSON.parse(fs.readFileSync(openapiPath, "utf8"));
  const groups = new Map();
  for (const [apiPath, pathItem] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!operation || typeof operation !== "object" || !operation.tags) continue;
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      const tag = operation.tags[0] || "Public API";
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag).push(requestItem(apiPath, method, operation));
      if (method === "post" && apiPath === "/api/v1/public/webhooks/create/") {
        groups.get(tag).push({
          name: "Create Slack destination",
          request: {
            method: "POST",
            header: [
              { key: "Accept", value: "application/json" },
              { key: "Content-Type", value: "application/json" },
            ],
            url: postmanUrl(apiPath),
            description:
              "Slack Incoming Webhook. Assess posts a Block Kit message (no HMAC). Chat destinations do not use whsec_….",
            body: jsonBody({
              url: "https://hooks.slack.com/services/T000/B000/xxx",
              kind: "slack",
              events: ["candidate.passed", "candidate.failed"],
            }),
          },
        });
      }
    }
  }

  const collection = {
    info: {
      name: "Praxicraft Assess Public API",
      description:
        "Organisation Public API. Set collection variable `api_key` (from Assess → Developer → API Keys) and `base_url`. Success bodies are flat JSON. Invite id is invite_token. Webhook signing secrets use the whsec prefix. Errors: { error: { code, message } }.",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    auth: {
      type: "bearer",
      bearer: [{ key: "token", value: "{{api_key}}", type: "string" }],
    },
    variable: [
      { key: "base_url", value: "https://assess.praxicraft.com" },
      { key: "api_key", value: "" },
      { key: "assessment_slug", value: "senior-backend-screen" },
      { key: "invite_token", value: "" },
      { key: "id", value: "" },
      { key: "delivery_id", value: "" },
      { key: "task_id", value: "" },
      { key: "provider", value: "greenhouse" },
    ],
    item: [...groups.entries()].map(([name, item]) => ({ name, item })),
  };

  const webhookGroup = collection.item.find((g) => g.name.includes("Webhook"));
  if (webhookGroup && !webhookGroup.item.some((it) => /retry/i.test(it.name))) {
    webhookGroup.item.push({
      name: "Retry webhook delivery",
      request: {
        method: "POST",
        header: [{ key: "Accept", value: "application/json" }],
        url: postmanUrl("/api/v1/public/webhooks/{id}/deliveries/{delivery_id}/retry/"),
        description:
          "Resend one failed or pending delivery. Destination must be active and verified. Required scope: webhooks:write.",
      },
    });
  }

  fs.writeFileSync(outPath, `${JSON.stringify(collection, null, 2)}\n`);
  const n = collection.item.reduce((sum, g) => sum + g.item.length, 0);
  console.log(`wrote ${n} requests to ${path.relative(docsRoot, outPath)}`);
}

main();
