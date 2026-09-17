---
title: "Doc Template"
version: 3.8.51
lastUpdated: 2026-09-17
---

# NN. Title in kebab-case topic style

- **Status:** Draft | Accepted | Superseded by NN | Research note
- **Date:** YYYY-MM-DD
- **Deciders:** @handle
- **Related:** links to related docs, ADRs, issues

## Context

What forces are at play? What problem does this document address?
Who is the audience (operators, contributors, agents)?

## Decision / Contents

What is being stated, decided, or documented? (present tense, affirmative)

## Consequences / Details

- **Easier:** ...
- **Harder:** ...
- **Given up:** ...

## Verification

Which checks (`npm run check:*`), tests, or manual steps prove this is true?

---

Authoring rules:

1. File name: `NN-kebab-case.md`, next free number in the folder.
2. Frontmatter `title` is mandatory for any doc compiled by fumadocs
   (`source.config.ts` globs); run `npm run check:docs-frontmatter`.
3. Register the new file in the folder `README.md`, in this folder's
   `meta.json` (if rendered), and in [`../README.md`](../README.md).
4. Cross-link with relative paths; run `npm run check:doc-links`.
5. English is the source of truth; `docs/i18n/` mirrors are generated
   (see [guides/22-i18n-guide.md](guides/22-i18n-guide.md)).
