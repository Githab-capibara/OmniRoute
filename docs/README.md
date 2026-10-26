---
title: "OmniRoute Documentation"
version: 3.8.51
lastUpdated: 2026-09-22
---

# OmniRoute Documentation

Navigable index of the OmniRoute documentation set. Every folder carries its own `README.md` (audience + doc-set table) and `template.md`; this file is the single source of truth for cross-folder navigation.

## Start here

| Doc                                                                      | Purpose                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------- |
| [getting-started/01-quick-start.md](getting-started/01-quick-start.md)   | Install and run OmniRoute in ~3 minutes           |
| [guides/01-user-guide.md](guides/01-user-guide.md)                       | Daily usage of the dashboard and API              |
| [guides/03-features-overview.md](guides/03-features-overview.md)         | What OmniRoute can do (dashboard feature gallery) |
| [architecture/01-system-overview.md](architecture/01-system-overview.md) | How the system is put together                    |
| [../CHANGELOG.md](../CHANGELOG.md)                                       | Release notes                                     |
| [plans/03-roadmap.md](plans/03-roadmap.md)                               | Where the project is headed                       |

## Directory map

| Folder                                        | Purpose                                                         |
| --------------------------------------------- | --------------------------------------------------------------- |
| [assets/](assets/)                            | Static images referenced by docs (flags, QR codes, hero art)    |
| [changelog/](changelog/)                      | Unreleased changelog fragments (conventional-changelog sources) |
| [diagrams/](diagrams/)                        | Mermaid sources + exported SVGs for architecture flows          |
| [getting-started/](getting-started/README.md) | 3-minute onboarding: quick start, provider combo, free tiers    |
| [guides/](guides/README.md)                   | How-to and setup guides for users and operators                 |
| [architecture/](architecture/README.md)       | Runtime, pipeline and module architecture (incl. quality gates) |
| [adr/](adr/README.md)                         | Architecture Decision Records (append-only, Nygard format)      |
| [plans/](plans/README.md)                     | Accepted execution plans and the project roadmap                |
| [development/](development/README.md)         | One numbered record per completed dev work item                 |
| [reference/](reference/README.md)             | API/env/CLI/provider lookup material                            |
| [routing/](routing/README.md)                 | Routing and combo-selection rules                               |
| [security/](security/README.md)               | Guardrails, egress policy, BAN detection, supply chain          |
| [compression/](compression/README.md)         | Context-compression engines and rule packs                      |
| [frameworks/](frameworks/README.md)           | Agent/IDE integrations, skills, memory, webhooks, evals         |
| [providers/](providers/README.md)             | Provider setup specifics (web, docker, CLI keys)                |
| [ops/](ops/README.md)                         | Release, deployment and operations runbooks                     |
| [features/](features/README.md)               | Feature-specific deep dives (context relay)                     |
| [comparison/](comparison/README.md)           | OmniRoute vs. alternatives                                      |
| [governance/](governance/README.md)           | Contributing, code of conduct, security disclosure              |
| [i18n/](i18n/README.md)                       | Translated docs (50 locales, machine-mirrored)                  |
| [screenshots/](screenshots/)                  | Dashboard screenshots referenced by guides                      |

## Key entry points

- [getting-started/02-providers-guide.md](getting-started/02-providers-guide.md) — how to connect AI providers
- [getting-started/04-free-tiers-guide.md](getting-started/04-free-tiers-guide.md) — free AI with no credit card
- [getting-started/03-auto-combo-guide.md](getting-started/03-auto-combo-guide.md) — let OmniRoute pick the best AI for you
- [guides/02-setup-guide.md](guides/02-setup-guide.md) — first-time setup
- [guides/23-troubleshooting.md](guides/23-troubleshooting.md) — fix common problems
- [ops/15-fly-io-deployment.md](ops/15-fly-io-deployment.md) — deploy a VPS
- [../llm.txt](../llm.txt) — machine-readable docs index (feeds agents)

## Governance

- [governance/01-contributing-guide.md](governance/01-contributing-guide.md) — how to contribute
- [governance/02-code-of-conduct.md](governance/02-code-of-conduct.md) — community code of conduct
- [governance/03-security-policy.md](governance/03-security-policy.md) — vulnerability disclosure

> **Doc style.** Every doc follows [template.md](template.md) (Nygard-style frontmatter + numbered kebab-case filename). Author a new doc: copy `template.md` into the target folder as `NN-kebab-case.md`, register it in that folder's `README.md`, and cross-link with relative paths (`npm run check:doc-links`).
