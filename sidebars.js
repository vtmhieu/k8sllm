// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'k8s-llm',
    {
      type: 'category',
      label: 'Field Notes',
      link: { type: 'doc', id: 'field-notes/index' },
      items: [
        'field-notes/llm-latency-war-room',
        'field-notes/gpu-capacity-incident',
        'field-notes/rag-tenant-isolation-review',
        'field-notes/kserve-ray-serve-ownership',
      ],
    },
    {
      type: 'category',
      label: 'Production Guides',
      link: { type: 'doc', id: 'production-guides/index' },
      items: [
        'production-guides/llm-latency-on-kubernetes',
        'production-guides/vllm-kubernetes-production-deployment',
        'production-guides/gpu-node-pool-scheduling-llm-inference',
        'production-guides/kserve-vs-ray-serve-llm-platforms',
        'production-guides/rag-tenant-isolation-kubernetes',
        'production-guides/llm-production-readiness-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Kubernetes Core',
      link: { type: 'doc', id: 'kubernetes/index' },
      items: [
        'kubernetes/control-plane-api',
        'kubernetes/workloads-scheduling',
        'kubernetes/networking',
        'kubernetes/storage',
      ],
    },
    {
      type: 'category',
      label: 'Production Best Practices',
      link: { type: 'doc', id: 'best-practices/index' },
      items: [
        'best-practices/scaling-autoscaling',
        'best-practices/production-scaling-decision-guide',
        'best-practices/security-baseline',
        'best-practices/security-hardening-checklist',
        'best-practices/observability-baseline',
        'best-practices/backup-dr',
      ],
    },
    {
      type: 'category',
      label: 'Platform Services',
      link: { type: 'doc', id: 'platform-services/index' },
      items: [
        'platform-services/ingress-gateway-service-mesh',
        'platform-services/gitops-delivery',
        'platform-services/policy-secrets-supply-chain',
        'platform-services/observability-stack',
      ],
    },
    {
      type: 'category',
      label: 'LLM on Kubernetes',
      link: { type: 'doc', id: 'llm-on-kubernetes/index' },
      items: [
        'llm-on-kubernetes/gpu-node-pools',
        'llm-on-kubernetes/vllm-kubernetes',
        'llm-on-kubernetes/model-serving-options',
        'llm-on-kubernetes/kserve-vs-ray-serve',
        'llm-on-kubernetes/inference-benchmarking-cost-model',
        'llm-on-kubernetes/rag-on-kubernetes',
        'llm-on-kubernetes/rag-failure-modes-evaluation',
        'llm-on-kubernetes/inference-scaling-cost',
      ],
    },
    {
      type: 'category',
      label: 'Labs',
      link: { type: 'doc', id: 'labs/index' },
      items: [
        'labs/vllm-inference-lab',
        'labs/rag-retrieval-lab',
        'labs/production-readiness-lab',
        'labs/observability-lab',
      ],
    },
    {
      type: 'category',
      label: 'Reference Architectures',
      link: { type: 'doc', id: 'reference-architectures/index' },
      items: [
        'reference-architectures/production-cluster',
        'reference-architectures/multi-tenant-security',
        'reference-architectures/observability-pipeline',
        'reference-architectures/gitops-flow',
        'reference-architectures/llm-inference-stack',
        'reference-architectures/rag-platform',
      ],
    },
    'about-k8sllm',
    'content-review-checklist',
  ],
};

module.exports = sidebars;
