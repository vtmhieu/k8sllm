# Kubernetes + LLM Platform Guide

A Docusaurus knowledge site for senior platform engineers who need to design and operate Kubernetes platforms, platform services, and LLM workloads on Kubernetes.

Public site target:

```text
https://k8sllm.online/
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

The repository is already configured for GitHub Pages from GitHub Actions. In GitHub settings, set Pages source to GitHub Actions and push to `main`.

## Publishing

The site is configured for GitHub Pages with the custom domain `k8sllm.online`.

Target public URL:

```text
https://k8sllm.online/
```

GitHub Pages settings:

1. Open `https://github.com/vtmhieu/k8sllm/settings/pages`.
2. Keep **Source** set to **GitHub Actions**.
3. Keep **Custom domain** set to `k8sllm.online`.
4. Enable HTTPS after GitHub validates the certificate.

The current `docusaurus.config.js` publishing settings are:

- `url` is currently `https://k8sllm.online`
- `baseUrl` is currently `/`
- `organizationName` is currently `vtmhieu`
- `projectName` is currently `k8sllm`
- GitHub navbar and edit URLs

After deployment, verify:

```text
https://k8sllm.online/
https://k8sllm.online/docs/kubernetes
https://k8sllm.online/docs/llm-on-kubernetes
https://k8sllm.online/docs/reference-architectures
https://k8sllm.online/img/architectures/llm-inference-stack.svg
https://k8sllm.online/sitemap.xml
https://k8sllm.online/robots.txt
```

## Custom domain

The canonical domain is:

```text
https://k8sllm.online/
```

The repo includes:

```text
static/CNAME
static/robots.txt
```

`static/CNAME` should contain:

```text
k8sllm.online
```

`static/robots.txt` should point crawlers to:

```text
https://k8sllm.online/sitemap.xml
```

### DNS records

For the apex/root domain `k8sllm.online`, create these `A` records:

```text
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

Optional IPv6 records:

```text
AAAA @ 2606:50c0:8000::153
AAAA @ 2606:50c0:8001::153
AAAA @ 2606:50c0:8002::153
AAAA @ 2606:50c0:8003::153
```

For the `www` variant:

```text
CNAME www vtmhieu.github.io
```

Do not create wildcard DNS records such as `*.k8sllm.online`.

### GitHub Pages setup

After DNS is configured:

1. Open `https://github.com/vtmhieu/k8sllm/settings/pages`.
2. Set **Custom domain** to `k8sllm.online`.
3. Enable HTTPS after GitHub validates the domain.
4. Push the config and `static/CNAME` changes.

### Google Search Console

After the custom domain is live:

1. Verify `k8sllm.online` using DNS TXT verification.
2. Submit `https://k8sllm.online/sitemap.xml`.
3. Inspect these URLs:

```text
https://k8sllm.online/
https://k8sllm.online/docs/kubernetes
https://k8sllm.online/docs/llm-on-kubernetes
https://k8sllm.online/docs/reference-architectures
```

After migration, use `https://k8sllm.online/` in public links and avoid promoting the older `https://vtmhieu.github.io/k8sllm/` URL.

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
