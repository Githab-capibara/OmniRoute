# Architecture

How the system is put together — runtime, code layout, resilience model.

- **Audience:** Developers
- **Doc set index:** [docs/README.md](../README.md)

| Document                                                       | Purpose                                                                 |
| -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [01-system-overview.md](./01-system-overview.md)               | OmniRoute Architecture                                                  |
| [02-adaptive-routing.md](./02-adaptive-routing.md)             | Adaptive Routing: Routing Events, Quality Feedback & Explainability     |
| [03-admission-lanes.md](./03-admission-lanes.md)               | Admission lanes — two lane systems, what gates each, where each reports |
| [04-authorization-pipeline.md](./04-authorization-pipeline.md) | Authorization Guide                                                     |
| [05-allocation-handoff.md](./05-allocation-handoff.md)         | OmniRoute Allocation Handoff                                            |
| [06-provider-failover.md](./06-provider-failover.md)           | OmniRoute Provider Failover                                             |
| [07-resilience-guide.md](./07-resilience-guide.md)             | Resilience Guide                                                        |
| [08-quality-gates.md](./08-quality-gates.md)                   | Quality Gates Reference                                                 |
| [09-monitoring-sections.md](./09-monitoring-sections.md)       | Monitoring & Costs — Navigation Structure                               |
| [10-codebase-documentation.md](./10-codebase-documentation.md) | OmniRoute Codebase Documentation                                        |
| [11-repository-map.md](./11-repository-map.md)                 | Repository Map                                                          |
| [12-design-system.md](./12-design-system.md)                   | Design System & Visual Identity                                         |

New here? Copy [template.md](./template.md) to `NN-kebab-case.md`, fill _"Purpose"_ here, in `meta.json` (if rendered), and in the [docs index](../README.md).
