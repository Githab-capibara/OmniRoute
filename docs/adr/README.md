# Architecture Decision Records

Append-only record of non-obvious architectural decisions (Nygard format).

- **Audience:** Architects
- **Doc set index:** [docs/README.md](../README.md)

| Document                                                                     | Purpose                                   |
| ---------------------------------------------------------------------------- | ----------------------------------------- |
| [01-record-architecture-decisions.md](./01-record-architecture-decisions.md) | 01. Record architecture decisions         |
| [02-router-backends-contract.md](./02-router-backends-contract.md)           | Router Backends & Embedded Services (ADR) |
| [03-cluster-sidecar-profiles.md](./03-cluster-sidecar-profiles.md)           | Cluster Decisions                         |
| [04-persistence-boundary.md](./04-persistence-boundary.md)                   | ADR: Pluggable persistence boundary       |

New here? Copy [template.md](./template.md) to `NN-kebab-case.md`, fill _"Purpose"_ here, in `meta.json` (if rendered), and in the [docs index](../README.md).
