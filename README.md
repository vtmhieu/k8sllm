# Kubernetes + LLM Platform Guide

A Docusaurus knowledge site for senior platform engineers who need to design and operate Kubernetes platforms, platform services, and LLM workloads on Kubernetes.

Public site target:

```text
https://vtmhieu.github.io/k8sllm/
```

GitHub repository:

```text
https://github.com/vtmhieu/k8sllm
```

## What is included

- Kubernetes Core: control plane, workloads, scheduling, networking, storage.
- Production Best Practices: scaling, security, observability, backup and disaster recovery.
- Platform Services: traffic, GitOps, policy, secrets, supply chain, observability stack.
- LLM On Kubernetes: GPU node pools, model serving, RAG, inference scaling and cost.
- Reference Architectures: six SVG architecture diagrams with explanatory pages.
- GitHub Actions build and GitHub Pages deploy workflow.
- GitHub Pages and custom domain deployment instructions.

## Learning roadmap

1. Kubernetes Core: build a reliable mental model of API, control plane, scheduling, networking, and storage.
2. Production Best Practices: turn cluster primitives into scaling, security, observability, and recovery baselines.
3. Platform Services: choose ingress, GitOps, policy, secrets, supply chain, and telemetry services by capability.
4. LLM On Kubernetes: design GPU pools, serving runtimes, RAG systems, and inference cost controls.
5. Reference Architectures: use the diagrams as review checklists for real platform designs.

## Source of truth policy

- Kubernetes behavior should anchor on official Kubernetes documentation.
- LLM serving guidance should cite official project docs for vLLM, KServe, Ray Serve, Triton, and NVIDIA Kubernetes integrations.
- Vendor blogs can support examples, but should not override official docs for API behavior or security guarantees.
- Every content page includes frontmatter with `sources` and `last_reviewed`.

## Local development

```bash
npm install
npm run start
```

Build the static site:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run serve
```

## Repository workflow

This repository is already connected to:

```text
https://github.com/vtmhieu/k8sllm.git
```

Use the normal workflow:

```bash
git add .
git commit -m "Describe the content or platform change"
git push -u origin main
```

Then follow `docs/publish-and-domain.mdx` to enable GitHub Pages or Cloudflare Pages.

The repository is already configured for GitHub Pages from GitHub Actions. In GitHub settings, set Pages source to GitHub Actions and push to `main`.

## Configuration to update before publishing

Edit `docusaurus.config.js` only if the publishing target changes:

- `url` is currently `https://vtmhieu.github.io`
- `baseUrl` is currently `/k8sllm/`
- `organizationName` is currently `vtmhieu`
- `projectName` is currently `k8sllm`
- GitHub navbar and edit URLs

For a custom domain, copy `static/CNAME.example` to `static/CNAME` and replace the domain.

## Content rules

Every article should include frontmatter:

```yaml
title:
description:
tags:
difficulty:
last_reviewed:
sources:
diagram_ids:
```

Use official documentation as the source of truth for Kubernetes behavior and LLM serving projects.
