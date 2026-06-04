# Kubernetes + LLM Platform Guide

A Docusaurus knowledge site for senior platform engineers who need to design and operate Kubernetes platforms, platform services, and LLM workloads on Kubernetes.

Public site target:

```text
https://www.k8sllm.online/
```

GitHub repository:

```text
https://github.com/vtmhieu/k8sllm
```

## What is included

- Kubernetes Core: control plane, workloads, scheduling, networking, storage.
- Production Best Practices: scaling, security, observability, backup and disaster recovery.
- Platform Services: traffic, GitOps, policy, secrets, supply chain, observability stack.
- LLM on Kubernetes: GPU node pools, model serving, RAG, inference scaling and cost.
- Reference Architectures: six SVG architecture diagrams with explanatory pages.
- K8sLLM Platform Walkthrough: a local Remotion MP4 explainer embedded on the homepage.
- GitHub Actions build validation and Vercel production deployment.
- Vercel Web Analytics for page-view and visitor measurement.

## Learning roadmap

1. Kubernetes Core: build a reliable mental model of API, control plane, scheduling, networking, and storage.
2. Production Best Practices: turn cluster primitives into scaling, security, observability, and recovery baselines.
3. Platform Services: choose ingress, GitOps, policy, secrets, supply chain, and telemetry services by capability.
4. LLM on Kubernetes: design GPU pools, serving runtimes, RAG systems, and inference cost controls.
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

## K8sLLM Platform Walkthrough

The homepage walkthrough video is generated locally with Remotion from:

```text
remotion-k8sllm-video/
```

Regenerate the MP4:

```bash
cd remotion-k8sllm-video
npm install
npm run dev
npm run render
```

The website serves the published copy from:

```text
static/videos/k8sllm-architecture.mp4
```

After regenerating the video, copy the new MP4 into `static/videos/` before deploying.

The old `/video` URL redirects to `/` because the homepage is now the single public video surface.

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

GitHub Actions validates the Docusaurus build on pull requests and pushes. Vercel deploys production from the `main` branch.

## Publishing

The site is deployed on Vercel with `www.k8sllm.online` as the canonical URL.

Target public URL:

```text
https://www.k8sllm.online/
```

Domain behavior:

1. `https://www.k8sllm.online/` serves the production site.
2. `https://k8sllm.online/` redirects to `https://www.k8sllm.online/`.
3. Vercel manages HTTPS certificates for both domains.

The current `docusaurus.config.js` publishing settings are:

- `url` is currently `https://www.k8sllm.online`
- `baseUrl` is currently `/`
- `organizationName` is currently `vtmhieu`
- `projectName` is currently `k8sllm`
- GitHub navbar and edit URLs

After deployment, verify:

```text
https://www.k8sllm.online/
https://www.k8sllm.online/docs/kubernetes
https://www.k8sllm.online/docs/llm-on-kubernetes
https://www.k8sllm.online/docs/reference-architectures
https://www.k8sllm.online/img/architectures/llm-inference-stack.svg
https://www.k8sllm.online/videos/k8sllm-architecture.mp4
https://www.k8sllm.online/sitemap.xml
https://www.k8sllm.online/robots.txt
```

## Custom domain

The canonical domain is:

```text
https://www.k8sllm.online/
```

The repo includes:

```text
static/robots.txt
```

`static/robots.txt` should point crawlers to:

```text
https://www.k8sllm.online/sitemap.xml
```

### DNS records

For the apex/root domain `k8sllm.online`, create this Vercel `A` record:

```text
A @ 76.76.21.21
```

For the `www` variant:

```text
CNAME www cname.vercel-dns.com
```

Do not create wildcard DNS records such as `*.k8sllm.online`.

### Vercel setup

Build settings:

```text
Framework Preset: Docusaurus
Install Command: npm ci
Build Command: npm run build
Output Directory: build
```

Environment:

```text
DOCUSAURUS_SITE_URL=https://www.k8sllm.online
DOCUSAURUS_BASE_URL=/
```

`docusaurus.config.js` also normalizes the old apex value `https://k8sllm.online` to the canonical `https://www.k8sllm.online` so stale Vercel environment values do not leak into canonical or Open Graph tags.

Analytics:

- `@vercel/analytics` is installed.
- `src/theme/Root.js` loads the Vercel `<Analytics />` component on every page.
- Analytics is for measuring traffic and content performance; it does not directly change Google ranking.

### Google Search Console

After the custom domain is live:

1. Verify `k8sllm.online` using DNS TXT verification.
2. Submit `https://www.k8sllm.online/sitemap.xml`.
3. Inspect these URLs:

```text
https://www.k8sllm.online/
https://www.k8sllm.online/docs/kubernetes
https://www.k8sllm.online/docs/llm-on-kubernetes
https://www.k8sllm.online/docs/reference-architectures
```

Use `https://www.k8sllm.online/` in public links and avoid promoting the older `https://vtmhieu.github.io/k8sllm/` URL.

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
