# Contributing

This site is written for senior platform engineers. Contributions should be precise, operational, and source-backed.

## Content standards

- Prefer official documentation as the source of truth.
- Explain tradeoffs, failure modes, and validation metrics.
- Avoid generic tool lists without a decision model.
- Keep Vietnamese concise and preserve English technical terms when they are clearer.
- Update `last_reviewed` when materially changing recommendations.

## Article frontmatter

Each article must include:

```yaml
title:
description:
tags:
difficulty:
last_reviewed:
sources:
diagram_ids:
```

## Diagrams

Architecture diagrams live in `static/img/architectures/`.

Each diagram should show:

- Boundaries.
- Data flow or control flow.
- Ownership or responsibility.
- Operational signals.
- Security-relevant paths when applicable.

## Local checks

```bash
npm install
npm run build
```

