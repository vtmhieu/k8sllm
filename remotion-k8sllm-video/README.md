# K8sLLM Architecture Video

Local Remotion project for a 100-second MP4 explainer video for [k8sllm.online](https://www.k8sllm.online/).

The video is generated entirely with TypeScript, React, SVG, and CSS-style inline drawing. It does not call paid APIs, AI video services, or external asset generators.

## What it renders

- 1920x1080
- 30fps
- 100 seconds
- Dark technical infrastructure-dashboard theme
- Code-generated Kubernetes, GPU, inference, RAG, GitOps, and observability diagrams
- Captions on every scene
- MP4 output at `out/k8sllm-architecture.mp4`

## Commands

```bash
npm install
npm run dev
npm run render
```

Optional one-frame preview:

```bash
npm run still
```

## Composition

Composition id:

```text
K8sLLMArchitecture
```

## Scene map

| Scene | Time | Topic |
| --- | --- | --- |
| 1 | 0-8s | Production LLM infrastructure hook |
| 2 | 8-18s | LLM workload failure modes |
| 3 | 18-32s | Production Kubernetes cluster reference architecture |
| 4 | 32-48s | LLM inference stack |
| 5 | 48-60s | KServe vs Ray Serve decision |
| 6 | 60-78s | RAG platform architecture |
| 7 | 78-90s | GitOps and observability |
| 8 | 90-100s | K8sLLM CTA |

## Reusable components

- `ArchitectureBox`
- `FlowArrow`
- `MetricCard`
- `KubernetesCluster`
- `NodePool`
- `GpuPool`
- `ServiceLayer`
- `RagPipeline`
- `GitOpsFlow`
- `SceneTitle`
- `Caption`
