# Ops

Release, deployment, proxies, tunnels, coverage, database, monitoring.

- **Audience:** Maintainers
- **Doc set index:** [docs/README.md](../README.md)

| Document                                                           | Purpose                                                    |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| [01-release-checklist.md](./01-release-checklist.md)               | Release Checklist                                          |
| [02-release-green-policy.md](./02-release-green-policy.md)         | Release-Green — keeping the queue and release branch green |
| [03-branching-model.md](./03-branching-model.md)                   | Branching & Release Model                                  |
| [04-branch-protection-main.md](./04-branch-protection-main.md)     | Branch Protection — main                                   |
| [05-merge-train-runbook.md](./05-merge-train-runbook.md)           | Merge Queue & Manual Merge-Train Runbook                   |
| [06-contribution-golden-path.md](./06-contribution-golden-path.md) | Contribution Golden Path                                   |
| [07-homologation-suite.md](./07-homologation-suite.md)             | Homologation Suite (npm run homolog)                       |
| [08-quality-gate-playbook.md](./08-quality-gate-playbook.md)       | Quality Gate Playbook                                      |
| [09-runner-box-operations.md](./09-runner-box-operations.md)       | Self-Hosted Runner Box Operations                          |
| [10-coverage-plan.md](./10-coverage-plan.md)                       | Test Coverage Plan                                         |
| [11-database-guide.md](./11-database-guide.md)                     | Database Schema & Operations Guide                         |
| [12-sqlite-runtime.md](./12-sqlite-runtime.md)                     | SQLite Runtime Resolution                                  |
| [13-redis-production-config.md](./13-redis-production-config.md)   | Redis Production Configuration Guide                       |
| [14-monitoring-observability.md](./14-monitoring-observability.md) | Monitoring & Observability Guide                           |
| [15-fly-io-deployment.md](./15-fly-io-deployment.md)               | OmniRoute Fly.io Deployment Guide                          |
| [16-vm-deployment.md](./16-vm-deployment.md)                       | OmniRoute — Deployment Guide on VM with Cloudflare         |
| [17-proxy-guide.md](./17-proxy-guide.md)                           | 🌐 OmniRoute Proxy Guide                                   |
| [18-tunnels-guide.md](./18-tunnels-guide.md)                       | Tunnels Guide                                              |

New here? Copy [template.md](./template.md) to `NN-kebab-case.md`, fill _"Purpose"_ here, in `meta.json` (if rendered), and in the [docs index](../README.md).
