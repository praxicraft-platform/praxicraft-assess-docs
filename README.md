# Praxicraft Assess Documentation

<p align="center">
  <img src="./images/docs-banner.jpg" alt="Praxicraft Assess documentation" width="900"/>
</p>

<div align="center">

  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" />
  </a>
  <a href="https://docs.praxicraft.com">
    <img src="https://img.shields.io/badge/docs-live-brightgreen.svg" alt="Live Documentation" />
  </a>

</div>

## Overview

Welcome to the official documentation repository for [Praxicraft Assess](https://assess.praxicraft.com) — technical assessments, live interviews, and hiring automations for engineering teams. This documentation is built with [Mintlify](https://mintlify.com).

## Documentation site

Visit the live docs at [docs.praxicraft.com](https://docs.praxicraft.com)

## Documentation structure

Content is organized by section (MDX lives in folders, not at the repo root):

### 1. Guides (`guides/`)

Getting started, authentication, assessments, invitations, results, interviews, webhooks, pipelines, organisation, scopes, errors, and API reference hub.

### 2. Integrations (`integrations/`)

ATS providers, Slack/Teams, n8n / Zapier / Make, MCP, and agent workflows.

### 3. SDKs (`sdks/`)

Official clients (Python, Node, Go, PHP, Ruby, Java, .NET), CLI, and webhook verification.

### 4. API changelog (`api-changelog/`)

Public API release notes.

### 5. API Reference

Interactive OpenAPI playground from `openapi.json`.

The landing page is root [`index.mdx`](./index.mdx). Navigation is configured in [`docs.json`](./docs.json). Writing rules for contributors: [`STYLE.md`](./STYLE.md).

## Development setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/praxicraft-platform/praxicraft-assess-docs.git
   cd praxicraft-assess-docs
   ```

2. **Install the Mintlify CLI**

   ```bash
   npm i -g mintlify
   ```

3. **Run the development server**

   ```bash
   mintlify dev
   ```

   Docs will be available at `http://localhost:3000`.

### Configuration

`docs.json` controls navigation, theme, SEO, playground settings, and redirects.

## Contributing

Want to help improve the docs? See [CONTRIBUTING.md](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md).

- Fix typos, clarify explanations, or add examples
- Keep examples accurate against the live Public API and `openapi.json`
- Preview with `mintlify dev` before opening a pull request

## Troubleshooting

**Mintlify dev isn't running**

- Run `mintlify install` to reinstall dependencies
- Ensure you're in the directory containing `docs.json`

**Page loads as 404**

- Confirm the file is listed in `docs.json` navigation
- Verify the path matches the navigation entry (e.g. `guides/authentication`)

**Images not displaying**

- Keep images under `/images`
- Use absolute paths starting with `/images/`

## Deployment

Documentation deploys when changes land on `main` via Mintlify connected to this repository. Live site: [docs.praxicraft.com](https://docs.praxicraft.com).

## License

[MIT](./LICENSE)

## Support

- **Documentation issues**: open an issue in this repository
- **Product support**: [support@praxicraft.com](mailto:support@praxicraft.com)
- **API status**: [status.praxicraft.com](https://status.praxicraft.com)

## Useful links

- [Assess dashboard](https://assess.praxicraft.com/assess)
- [Quickstart](https://docs.praxicraft.com/guides/quickstart)
- [API Reference](https://docs.praxicraft.com/guides/api-reference)
- [CLI](https://docs.praxicraft.com/sdks/cli)
- [API changelog](https://docs.praxicraft.com/api-changelog)
