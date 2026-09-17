# 01. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @Githab-capibara, @diegosouzapw
- **Related:** [docs/adr/README.md](README.md), [ADR template](template.md)

## Context

OmniRoute has accumulated a large body of architectural choices — the
router-backend lifecycle model, the pluggable persistence boundary, optional
sidecar cluster profiles, the two admission-lane systems, the resilience
stack — that are not obvious from the code alone. A future maintainer (human
or AI) reading `src/domain/` or `open-sse/` cannot recover _why_ a design was
chosen, only _what_ it currently is. Without a durable record, every reopened
question ("why not a single global middleware?", "why is persistence still
SQLite-shaped?") gets relitigated from scratch, and reversals happen silently.

We adopt the [Architecture Decision Record
(Nygard)](https://cognitect.com/blog/2011-11-15/documenting-architecture-decisions)
practice to capture these decisions in version control next to the code they
govern.

## Decision

We record every non-obvious architectural decision as a numbered, append-only
Markdown file in `docs/adr/`, following the Nygard format defined in
[`template.md`](template.md). The set of decisions is enumerated in
[`README.md`](README.md).

A decision is captured as an ADR when it:

- chooses between two viable designs where the loser is not obviously bad;
- encodes a constraint the code relies on but does not test;
- reverses an earlier decision (the old ADR flips to `Superseded by ADR-NN`);
- sets policy that governs how the project operates.

## Consequences

- **Easier:** onboarding, design reviews, and AI-assisted contributions get a
  citable "why"; reversals become explicit rather than accidental.
- **Harder:** every significant design change now needs an accompanying record,
  and `docs/adr/**` is review-gated by an owner.
- **Given up:** the freedom to make architectural changes purely by editing
  code with no written trace.
- **Migration:** existing ADR-shaped documents scattered in `docs/architecture/`
  (`ROUTER_BACKENDS`, `cluster-decisions`, `persistence-backend-boundary`) are
  moved into `docs/adr/` and given numbers.

## Alternatives considered

- **No ADRs, rely on code comments:** rejected because comments describe
  current behavior, not the trade-offs that produced it, and they are easy to
  delete during refactors.
- **A single living ARCHITECTURE.md:** rejected because it grows unbounded,
  hides individual decisions, and makes reversals invisible.
- **ADRs in an external wiki:** rejected because they drift from the code and
  are not reviewed in the same PR that changes the code.
