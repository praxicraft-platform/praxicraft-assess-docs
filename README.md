# Praxicraft Assess Documentation

Official Mintlify docs for [Praxicraft Assess](https://assess.praxicraft.com) — technical hiring assessments, live interviews, Public API, SDKs, MCP, and ATS automations.

**Live site:** [docs.praxicraft.com](https://docs.praxicraft.com)

## Overview

This repository is the **source of truth** for customer-facing Assess documentation. It is built with [Mintlify](https://mintlify.com) and published independently of the product monorepo.

### Sections

| Area | Contents |
|------|----------|
| **Guides** | Quickstart, auth, assessments, invites, results, webhooks, interviews, integrations, MCP, agents |
| **SDKs** | Python, Node, Go, PHP, Ruby, Java, .NET, CLI, webhook verification |
| **API Reference** | OpenAPI playground (`openapi.json`) |
| **API changelog** | Public API release notes under `/api-changelog` |

Internal writing rules: [`STYLE.md`](STYLE.md) (not in the public nav).

## Local preview

```bash
git clone https://github.com/praxicraft-platform/praxicraft-assess-docs.git
cd praxicraft-assess-docs
npx mintlify@latest dev
```

Open the URL Mintlify prints (usually http://localhost:3000).

## Contributing

We welcome docs PRs — fixes, clarifications, and new examples.

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Refresh OpenAPI snapshot

The Public API schema is generated from the product backend. From a checkout of the web monorepo:

```bash
docker compose -f docker-compose.dev.yml run --rm --no-deps \
  -v "/path/to/praxicraft-assess-docs:/out" backend python -c "
import os, json
os.environ.setdefault('DJANGO_SETTINGS_MODULE','config.settings.dev')
import django; django.setup()
from django.test import RequestFactory
from apps.assess.public_openapi import PublicSpectacularAPIView
resp = PublicSpectacularAPIView.as_view()(RequestFactory().get('/api/v1/public/schema/', HTTP_ACCEPT='application/json'))
data = resp.data
for p in [k for k in data.get('paths', {}) if k.startswith('/api/v1/public/organisation')]:
    del data['paths'][p]
data['servers'] = [
  {'url': 'https://assess.praxicraft.com', 'description': 'Production'},
  {
    'url': '{baseUrl}',
    'description': 'Custom base URL',
    'variables': {
      'baseUrl': {
        'default': 'https://assess.praxicraft.com',
        'description': 'Full origin only (no path).',
      }
    },
  },
]
data['security'] = [{'bearerAuth': []}]
open('/out/openapi.json','w').write(json.dumps(data, indent=2)+chr(10))
print('wrote', len(data['paths']), 'paths')
"
```

Then regenerate Postman:

```bash
node scripts/openapi-to-postman.mjs
```

## Mintlify deployment

Connect this GitHub repo in the [Mintlify dashboard](https://app.mintlify.com). Prefer DNS: `docs.praxicraft.com` CNAME → Mintlify.

After changing `robots.txt` or SEO fields in `docs.json`, redeploy so production picks up crawl rules.

## Related repos

- [praxicraft-assess-cli](https://github.com/praxicraft-platform/praxicraft-assess-cli)
- [praxicraft-assess-mcp](https://github.com/praxicraft-platform/praxicraft-assess-mcp)
- [praxicraft-assess-agent-plugin](https://github.com/praxicraft-platform/praxicraft-assess-agent-plugin)
- SDKs under [praxicraft-platform](https://github.com/orgs/praxicraft-platform/repositories)

## License

[MIT](./LICENSE)
