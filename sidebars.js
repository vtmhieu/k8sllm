// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
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
        'best-practices/security-baseline',
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
      label: 'LLM On Kubernetes',
      link: { type: 'doc', id: 'llm-on-kubernetes/index' },
      items: [
        'llm-on-kubernetes/gpu-node-pools',
        'llm-on-kubernetes/model-serving-options',
        'llm-on-kubernetes/rag-on-kubernetes',
        'llm-on-kubernetes/inference-scaling-cost',
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
    'content-review-checklist',
    'publish-and-domain',
  ],
};

module.exports = sidebars;
