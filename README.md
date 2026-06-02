# Kubernetes + LLM Platform Guide

A Docusaurus knowledge site for senior platform engineers who need to design and operate Kubernetes platforms, platform services, and LLM workloads on Kubernetes.

The project is self-contained in this folder so it can later be pushed as its own GitHub repository.

## What is included

- Kubernetes Core: control plane, workloads, scheduling, networking, storage.
- Production Best Practices: scaling, security, observability, backup and disaster recovery.
- Platform Services: traffic, GitOps, policy, secrets, supply chain, observability stack.
- LLM On Kubernetes: GPU node pools, model serving, RAG, inference scaling and cost.
- Reference Architectures: six SVG architecture diagrams with explanatory pages.
- GitHub Actions build workflow.
- GitHub Pages and custom domain deployment instructions.

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

## Push as a new GitHub repository

From inside this folder:

```bash
git init
git add .
git commit -m "Initial Kubernetes LLM platform guide"
git branch -M main
git remote add origin git@github.com:vtmhieu/k8sllm.git
git push -u origin main
```

Then follow `docs/publish-and-domain.mdx` to enable GitHub Pages or Cloudflare Pages.

## Configuration to update before publishing

Edit `docusaurus.config.js`:

- `url`
- `baseUrl`
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
