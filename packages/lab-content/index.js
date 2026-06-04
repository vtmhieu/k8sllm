const labsBaseUrl = 'https://labs.k8sllm.online';

const productPaths = [
  {
    id: 'kubernetes-llm-foundations',
    title: 'Kubernetes LLM Foundations',
    summary: 'Build the cluster mental model needed before serving models.',
  },
  {
    id: 'vllm-production-serving',
    title: 'vLLM Production Serving',
    summary: 'Move from runtime deployment to latency, health, and rollout checks.',
  },
  {
    id: 'rag-platform-engineering',
    title: 'RAG Platform Engineering',
    summary: 'Operate ingestion, retrieval, policy, answer quality, and evaluation.',
  },
  {
    id: 'llm-observability-cost',
    title: 'LLM Observability and Cost',
    summary: 'Connect user latency, runtime saturation, GPU pressure, and economics.',
  },
  {
    id: 'production-readiness-ai',
    title: 'Production Readiness for AI Workloads',
    summary: 'Review security, rollout, tenancy, rollback, and platform ownership.',
  },
];

const challengeSummaries = [
  {
    id: 'vllm-inference',
    slug: 'vllm-inference',
    title: 'vLLM Inference Challenge',
    summary:
      'Deploy a GPU-backed OpenAI-compatible endpoint and prove scheduling, health, TTFT, queueing, and rollback readiness.',
    difficulty: 'Hard',
    duration: '75 min',
    topic: 'Model serving',
    persona: 'AI infrastructure engineer',
    tools: ['kubectl', 'vLLM', 'Prometheus'],
    prerequisites: ['GPU node pool', 'GPU scheduling basics', 'Model artifact access'],
    free: true,
    premium: false,
    roadmapIds: ['vllm-production-serving', 'production-readiness-ai'],
    docsHref: 'https://www.k8sllm.online/docs/labs/vllm-inference-lab',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/vllm-kubernetes',
      'https://www.k8sllm.online/docs/llm-on-kubernetes/gpu-node-pools',
    ],
  },
  {
    id: 'rag-retrieval',
    slug: 'rag-retrieval',
    title: 'RAG Retrieval Challenge',
    summary:
      'Operate ingestion, metadata filters, vector retrieval, answer evaluation, and failure drills for production RAG.',
    difficulty: 'Medium',
    duration: '60 min',
    topic: 'RAG',
    persona: 'MLOps engineer',
    tools: ['kubectl', 'curl', 'vector database'],
    prerequisites: ['Kubernetes namespace', 'Basic retrieval pipeline'],
    free: true,
    premium: false,
    roadmapIds: ['rag-platform-engineering'],
    docsHref: 'https://www.k8sllm.online/docs/labs/rag-retrieval-lab',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/rag-on-kubernetes',
      'https://www.k8sllm.online/docs/reference-architectures/rag-platform',
    ],
  },
  {
    id: 'production-readiness',
    slug: 'production-readiness',
    title: 'Production Readiness Challenge',
    summary:
      'Run a launch review across security, quota, rollout, observability, cost, and ownership before live traffic.',
    difficulty: 'Hard',
    duration: '50 min',
    topic: 'Production',
    persona: 'Platform lead',
    tools: ['kubectl', 'policy engine', 'dashboard'],
    prerequisites: ['RBAC', 'rollout workflow', 'telemetry baseline'],
    free: true,
    premium: false,
    roadmapIds: ['production-readiness-ai', 'kubernetes-llm-foundations'],
    docsHref: 'https://www.k8sllm.online/docs/labs/production-readiness-lab',
    relatedDocs: [
      'https://www.k8sllm.online/docs/best-practices/security-hardening-checklist',
      'https://www.k8sllm.online/docs/best-practices/production-scaling-decision-guide',
    ],
  },
  {
    id: 'observability',
    slug: 'observability',
    title: 'LLM Observability Challenge',
    summary:
      'Build the signal model needed to debug user latency, runtime saturation, GPU pressure, traces, logs, and alerts.',
    difficulty: 'Medium',
    duration: '45 min',
    topic: 'Observability',
    persona: 'SRE',
    tools: ['Prometheus', 'Grafana', 'OpenTelemetry'],
    prerequisites: ['Metrics stack', 'LLM or mock inference workload'],
    free: true,
    premium: false,
    roadmapIds: ['llm-observability-cost', 'production-readiness-ai'],
    docsHref: 'https://www.k8sllm.online/docs/labs/observability-lab',
    relatedDocs: [
      'https://www.k8sllm.online/docs/platform-services/observability-stack',
      'https://www.k8sllm.online/docs/reference-architectures/observability-pipeline',
    ],
  },
  {
    id: 'vllm-kubernetes-deployment',
    slug: 'vllm-kubernetes-deployment',
    title: 'vLLM Kubernetes Deployment Lab',
    summary:
      'Design the deployment contract for vLLM with model cache, readiness, runtime flags, and service exposure.',
    difficulty: 'Medium',
    duration: '55 min',
    topic: 'Model serving',
    persona: 'AI infrastructure engineer',
    tools: ['kubectl', 'vLLM', 'container registry'],
    prerequisites: ['Kubernetes deployment basics', 'Model artifact access'],
    free: true,
    premium: false,
    roadmapIds: ['vllm-production-serving'],
    docsHref: 'https://www.k8sllm.online/docs/llm-on-kubernetes/vllm-kubernetes',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/vllm-kubernetes',
      'https://www.k8sllm.online/docs/reference-architectures/llm-inference-stack',
    ],
  },
  {
    id: 'kserve-vs-ray-serve-decision',
    slug: 'kserve-vs-ray-serve-decision',
    title: 'KServe vs Ray Serve Decision Lab',
    summary:
      'Choose the serving abstraction by ownership model, CRDs, graph complexity, autoscaling, and rollout needs.',
    difficulty: 'Medium',
    duration: '35 min',
    topic: 'Architecture',
    persona: 'Platform architect',
    tools: ['decision matrix', 'runtime inventory'],
    prerequisites: ['Serving architecture context'],
    free: true,
    premium: false,
    roadmapIds: ['kubernetes-llm-foundations', 'vllm-production-serving'],
    docsHref: 'https://www.k8sllm.online/docs/llm-on-kubernetes/kserve-vs-ray-serve',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/kserve-vs-ray-serve',
      'https://www.k8sllm.online/docs/llm-on-kubernetes/model-serving-options',
    ],
  },
  {
    id: 'gpu-node-pool-scheduling',
    slug: 'gpu-node-pool-scheduling',
    title: 'GPU Node Pool Scheduling Lab',
    summary:
      'Prove accelerator placement with labels, taints, tolerations, quotas, and unschedulable-pod debugging.',
    difficulty: 'Hard',
    duration: '65 min',
    topic: 'GPU capacity',
    persona: 'Platform engineer',
    tools: ['kubectl', 'NVIDIA device plugin', 'cluster autoscaler'],
    prerequisites: ['GPU node pool access'],
    free: true,
    premium: false,
    roadmapIds: ['kubernetes-llm-foundations', 'vllm-production-serving'],
    docsHref: 'https://www.k8sllm.online/docs/llm-on-kubernetes/gpu-node-pools',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/gpu-node-pools',
      'https://www.k8sllm.online/docs/kubernetes/workloads-scheduling',
    ],
  },
  {
    id: 'rag-retrieval-quality',
    slug: 'rag-retrieval-quality',
    title: 'RAG Retrieval Quality Lab',
    summary:
      'Measure retrieval recall, citation accuracy, tenant filtering, and reranking latency before generation.',
    difficulty: 'Hard',
    duration: '70 min',
    topic: 'RAG',
    persona: 'MLOps engineer',
    tools: ['evaluation set', 'vector database', 'reranker'],
    prerequisites: ['RAG ingestion pipeline'],
    free: true,
    premium: false,
    roadmapIds: ['rag-platform-engineering', 'llm-observability-cost'],
    docsHref: 'https://www.k8sllm.online/docs/llm-on-kubernetes/rag-failure-modes-evaluation',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/rag-failure-modes-evaluation',
      'https://www.k8sllm.online/docs/llm-on-kubernetes/rag-on-kubernetes',
    ],
  },
  {
    id: 'inference-cost-model',
    slug: 'inference-cost-model',
    title: 'Inference Cost Model Lab',
    summary:
      'Calculate cost per request from input tokens, output tokens, GPU profile, utilization, and cache behavior.',
    difficulty: 'Medium',
    duration: '45 min',
    topic: 'Cost',
    persona: 'AI platform lead',
    tools: ['spreadsheet', 'metrics export', 'benchmark report'],
    prerequisites: ['Latency and token metrics'],
    free: true,
    premium: false,
    roadmapIds: ['llm-observability-cost', 'production-readiness-ai'],
    docsHref: 'https://www.k8sllm.online/docs/llm-on-kubernetes/inference-benchmarking-cost-model',
    relatedDocs: [
      'https://www.k8sllm.online/docs/llm-on-kubernetes/inference-benchmarking-cost-model',
      'https://www.k8sllm.online/docs/llm-on-kubernetes/inference-scaling-cost',
    ],
  },
  {
    id: 'rollout-rollback',
    slug: 'rollout-rollback',
    title: 'LLM Rollout and Rollback Lab',
    summary:
      'Design traffic shifting, readiness gates, rollback triggers, and model-version ownership for inference services.',
    difficulty: 'Hard',
    duration: '60 min',
    topic: 'Production',
    persona: 'SRE',
    tools: ['Argo CD', 'gateway policy', 'metrics dashboard'],
    prerequisites: ['GitOps delivery path'],
    free: true,
    premium: false,
    roadmapIds: ['production-readiness-ai', 'vllm-production-serving'],
    docsHref: 'https://www.k8sllm.online/docs/platform-services/gitops-delivery',
    relatedDocs: [
      'https://www.k8sllm.online/docs/platform-services/gitops-delivery',
      'https://www.k8sllm.online/docs/reference-architectures/gitops-flow',
    ],
  },
  {
    id: 'multi-tenant-security',
    slug: 'multi-tenant-security',
    title: 'Multi-Tenant LLM Security Lab',
    summary:
      'Review tenant routing, namespace boundaries, secrets, NetworkPolicy, prompt logging, and retrieval authorization.',
    difficulty: 'Hard',
    duration: '70 min',
    topic: 'Security',
    persona: 'Security-minded platform engineer',
    tools: ['kubectl', 'NetworkPolicy', 'admission policy'],
    prerequisites: ['RBAC and namespace policy basics'],
    free: true,
    premium: false,
    roadmapIds: ['production-readiness-ai', 'rag-platform-engineering'],
    docsHref: 'https://www.k8sllm.online/docs/reference-architectures/multi-tenant-security',
    relatedDocs: [
      'https://www.k8sllm.online/docs/reference-architectures/multi-tenant-security',
      'https://www.k8sllm.online/docs/best-practices/security-baseline',
    ],
  },
  {
    id: 'observability-cost-dashboard',
    slug: 'observability-cost-dashboard',
    title: 'LLM Observability and Cost Dashboard Lab',
    summary:
      'Create a dashboard model that joins user latency, queue wait, GPU pressure, token throughput, and cost signals.',
    difficulty: 'Medium',
    duration: '50 min',
    topic: 'Observability',
    persona: 'SRE',
    tools: ['Prometheus', 'Grafana', 'OpenTelemetry'],
    prerequisites: ['Metrics and logs stack'],
    free: true,
    premium: false,
    roadmapIds: ['llm-observability-cost'],
    docsHref: 'https://www.k8sllm.online/docs/platform-services/observability-stack',
    relatedDocs: [
      'https://www.k8sllm.online/docs/platform-services/observability-stack',
      'https://www.k8sllm.online/docs/llm-on-kubernetes/inference-scaling-cost',
    ],
  },
];

const stepTemplates = {
  namespace: {
    title: 'Prepare the platform boundary',
    objective: 'Create or identify the namespace, labels, and ownership metadata that make the workload reviewable.',
    commands: [
      'kubectl create namespace llm-serving --dry-run=client -o yaml',
      'kubectl label namespace llm-serving workload-class=llm owner=platform-ai --overwrite',
      'kubectl get namespace llm-serving --show-labels',
    ],
    expectedSignals: [
      'Namespace ownership is visible.',
      'Workload class is encoded as a label.',
      'The lab has a clear place to run validation commands.',
    ],
    checks: [
      {
        id: 'namespace-labels',
        type: 'paste_regex',
        prompt: 'Paste the `kubectl get namespace llm-serving --show-labels` output.',
        expectedPattern: 'llm-serving.*workload-class=llm',
        successMessage: 'The namespace boundary is labeled for LLM workloads.',
        failureMessage: 'The output should include `llm-serving` and `workload-class=llm`.',
      },
      {
        id: 'owner-confirmed',
        type: 'checkbox',
        prompt: 'Confirm that the namespace has an owner label or documented owner.',
        successMessage: 'Ownership is explicit.',
        failureMessage: 'Add an owner before treating this as production-ready.',
      },
    ],
    hints: [
      'Use labels that survive incident review, not only temporary annotations.',
      'If your platform uses a different namespace name, paste output that shows the same ownership and workload-class intent.',
    ],
    solution:
      'A healthy answer shows `llm-serving` with labels such as `workload-class=llm` and `owner=platform-ai`. The exact owner can differ, but ownership must be visible.',
  },
  gpuScheduling: {
    title: 'Prove GPU scheduling',
    objective: 'Show that inference pods request GPU resources and land only on compatible accelerator nodes.',
    commands: [
      'kubectl get nodes -L accelerator,nvidia.com/gpu.product',
      'kubectl -n llm-serving describe pod <model-pod>',
      'kubectl -n llm-serving get pod <model-pod> -o wide',
    ],
    expectedSignals: [
      'GPU nodes are labeled.',
      'Pods request `nvidia.com/gpu`.',
      'Taints and tolerations prevent accidental placement on general workers.',
    ],
    checks: [
      {
        id: 'gpu-node-visible',
        type: 'paste_regex',
        prompt: 'Paste output showing the scheduled pod or node labels.',
        expectedPattern: 'nvidia.com/gpu|GPU|accelerator|gpu',
        successMessage: 'GPU placement evidence is present.',
        failureMessage: 'Paste output that shows GPU labels, GPU resource requests, or accelerator node placement.',
      },
      {
        id: 'general-node-policy',
        type: 'multi_choice',
        prompt: 'What should prevent LLM pods from landing on general worker nodes?',
        options: ['Only replica count', 'Node labels, taints, tolerations, and GPU resource requests', 'A larger CPU request'],
        answer: 'Node labels, taints, tolerations, and GPU resource requests',
        successMessage: 'Correct. Placement needs an explicit scheduling contract.',
        failureMessage: 'Replica count and CPU requests do not guarantee GPU node placement.',
      },
    ],
    hints: [
      'Look for `nvidia.com/gpu` in pod resources.',
      'If a pod is pending, inspect events for taint, quota, or insufficient GPU capacity messages.',
    ],
    solution:
      'The pod should request `nvidia.com/gpu`, tolerate the GPU node taint, and schedule onto a node labeled with the expected accelerator profile.',
  },
  servingHealth: {
    title: 'Validate runtime health and serving path',
    objective: 'Verify that gateway, service, runtime, and model endpoint expose enough signal before real users arrive.',
    commands: [
      'kubectl -n llm-serving get svc,endpoints,pod',
      'kubectl -n llm-serving logs deploy/<runtime-deployment> --tail=80',
      'curl -sS http://<gateway>/v1/models',
    ],
    expectedSignals: [
      'Service endpoints point to ready pods.',
      'Runtime logs show model loaded or ready.',
      'The model endpoint responds through the intended route.',
    ],
    checks: [
      {
        id: 'endpoint-health',
        type: 'paste_regex',
        prompt: 'Paste service, endpoint, log, or curl output proving the model route is healthy.',
        expectedPattern: 'Ready|ready|models|200|loaded|Running',
        successMessage: 'The serving path has a concrete health signal.',
        failureMessage: 'Look for ready pods, loaded model logs, `/v1/models`, or an HTTP 200 response.',
      },
      {
        id: 'latency-signal',
        type: 'checkbox',
        prompt: 'Confirm that TTFT, queue wait, or request latency is visible somewhere.',
        successMessage: 'Runtime health includes user-facing latency evidence.',
        failureMessage: 'Add latency visibility before calling the endpoint production-ready.',
      },
    ],
    hints: [
      'A pod can be running while the model is still loading.',
      'Separate Kubernetes readiness from model readiness.',
    ],
    solution:
      'A good validation includes ready endpoints, model-loaded logs, a successful model list or chat request, and a visible latency signal.',
  },
  ragPolicy: {
    title: 'Test retrieval policy',
    objective: 'Prove retrieval uses tenant and authorization context before documents enter the prompt.',
    commands: [
      'curl -sS "$RAG_API/search?tenant=team-a&q=deployment rollback"',
      'curl -sS "$RAG_API/search?tenant=team-b&q=deployment rollback"',
      'kubectl -n rag-system logs deploy/rag-api --tail=80',
    ],
    expectedSignals: [
      'Search results include tenant metadata.',
      'Unauthorized documents are filtered before prompt assembly.',
      'Logs show retrieval policy decisions without leaking prompt text.',
    ],
    checks: [
      {
        id: 'tenant-filter',
        type: 'paste_regex',
        prompt: 'Paste retrieval output or logs showing tenant-aware filtering.',
        expectedPattern: 'tenant|authorized|filter|metadata|policy',
        successMessage: 'Retrieval policy evidence is present.',
        failureMessage: 'Paste output that includes tenant, metadata, authorization, filter, or policy evidence.',
      },
      {
        id: 'auth-placement',
        type: 'multi_choice',
        prompt: 'Where should RAG authorization happen?',
        options: ['Only after the answer is generated', 'Before retrieved context enters the prompt', 'Only in the vector database backup job'],
        answer: 'Before retrieved context enters the prompt',
        successMessage: 'Correct. Unauthorized context must not enter the prompt.',
        failureMessage: 'Filtering after generation can still leak information.',
      },
    ],
    hints: [
      'Search output should carry metadata, not just plain chunks.',
      'Test a user who should not see a document.',
    ],
    solution:
      'The retrieval layer must filter by tenant and authorization metadata before prompt assembly. The generated answer should never see unauthorized chunks.',
  },
  observability: {
    title: 'Build the signal model',
    objective: 'Connect user latency to runtime queueing, GPU pressure, token throughput, logs, and traces.',
    commands: [
      'kubectl -n llm-serving get pod --show-labels',
      'curl -sS "$METRICS_ENDPOINT" | grep -E "ttft|queue|tokens|gpu"',
      'kubectl -n llm-serving logs deploy/<runtime-deployment> --tail=80',
    ],
    expectedSignals: [
      'Metrics have stable route, model, and tenant-safe labels.',
      'TTFT and queue wait are visible separately.',
      'GPU pressure can be correlated with user latency.',
    ],
    checks: [
      {
        id: 'metrics-evidence',
        type: 'paste_regex',
        prompt: 'Paste metric names or dashboard notes for LLM serving.',
        expectedPattern: 'ttft|queue|tokens|gpu|latency|request',
        successMessage: 'The signal model includes LLM-specific metrics.',
        failureMessage: 'Look for TTFT, queue wait, token throughput, GPU pressure, or request latency.',
      },
      {
        id: 'label-safety',
        type: 'checkbox',
        prompt: 'Confirm that prompt text is not used as a metric label.',
        successMessage: 'Metric labels are safer and lower-cardinality.',
        failureMessage: 'Use token counts and route classes, not raw prompt text.',
      },
    ],
    hints: [
      'Pod readiness does not explain user latency.',
      'Avoid high-cardinality labels such as user prompt text.',
    ],
    solution:
      'A production dashboard separates TTFT, queue wait, generation throughput, GPU utilization, errors, and route class without storing sensitive prompt text as labels.',
  },
  launchReview: {
    title: 'Run the production launch review',
    objective: 'Check ownership, security, rollout, rollback, quota, observability, and cost before live traffic.',
    commands: [
      'kubectl auth can-i list pods --namespace llm-serving',
      'kubectl -n llm-serving get deploy,quota,networkpolicy',
      'kubectl -n llm-serving rollout history deploy/<model-deployment>',
    ],
    expectedSignals: [
      'RBAC and NetworkPolicy stance are known.',
      'Quota protects shared capacity.',
      'Rollback path and telemetry are reviewed before traffic shift.',
    ],
    checks: [
      {
        id: 'readiness-output',
        type: 'paste_regex',
        prompt: 'Paste launch-review output showing policy, quota, rollout, or authorization evidence.',
        expectedPattern: 'yes|quota|NetworkPolicy|rollout|deploy|Role|policy',
        successMessage: 'Launch review evidence is present.',
        failureMessage: 'Paste output that shows RBAC, quota, NetworkPolicy, deployment, or rollout history.',
      },
      {
        id: 'rollback-ready',
        type: 'checkbox',
        prompt: 'Confirm rollback has been tested before the traffic shift.',
        successMessage: 'Rollback is part of launch readiness.',
        failureMessage: 'Do not launch without a tested rollback path.',
      },
    ],
    hints: [
      'A deployment can be technically healthy and still not launch-ready.',
      'Review cost and quota as production controls, not finance paperwork.',
    ],
    solution:
      'A launch-ready workload has explicit RBAC, namespace policy, quota, rollout history, rollback test evidence, latency dashboards, and ownership metadata.',
  },
  decisionMatrix: {
    title: 'Choose the serving contract',
    objective: 'Pick KServe, Ray Serve, direct vLLM, or another runtime based on ownership and graph complexity.',
    commands: [
      'List each route: owner, runtime, traffic class, graph complexity, rollout model.',
      'Mark whether the platform team or app team owns the endpoint contract.',
      'Write the serving choice and the reason in one paragraph.',
    ],
    expectedSignals: [
      'Serving choice is linked to team ownership.',
      'Routing and rollout requirements are explicit.',
      'The team can explain why the alternative was rejected.',
    ],
    checks: [
      {
        id: 'serving-choice',
        type: 'multi_choice',
        prompt: 'Which workload tends to fit Ray Serve better?',
        options: ['A standard single-model endpoint owned by the platform', 'A Python-native multi-step retrieval, routing, reranking, generation graph', 'A static documentation site'],
        answer: 'A Python-native multi-step retrieval, routing, reranking, generation graph',
        successMessage: 'Correct. Ray Serve fits programmable serving graphs well.',
        failureMessage: 'Ray Serve is strongest when the serving graph is programmable and Python-native.',
      },
      {
        id: 'decision-written',
        type: 'checkbox',
        prompt: 'Confirm that the chosen serving abstraction and rejection reason are written down.',
        successMessage: 'The serving choice is reviewable.',
        failureMessage: 'The decision should be explicit enough for future platform reviews.',
      },
    ],
    hints: [
      'KServe is strong for standardized platform APIs.',
      'Ray Serve is strong for programmable Python-native serving graphs.',
    ],
    solution:
      'A good decision names the serving abstraction, endpoint owner, rollout model, autoscaling signal, and why the closest alternative was rejected.',
  },
  costModel: {
    title: 'Calculate request economics',
    objective: 'Translate latency and token metrics into cost per route class.',
    commands: [
      'Collect: input tokens, output tokens, request count, GPU profile, GPU hourly price, utilization.',
      'Compute: allocated GPU cost / successful requests.',
      'Segment results by route class: interactive, agentic, batch.',
    ],
    expectedSignals: [
      'Cost is reported per route class.',
      'GPU utilization and cache behavior are visible.',
      'Benchmark data includes gateway and runtime path, not only isolated runtime numbers.',
    ],
    checks: [
      {
        id: 'cost-fields',
        type: 'paste_regex',
        prompt: 'Paste notes or a table header for the cost model.',
        expectedPattern: 'input|output|tokens|GPU|utilization|request|cost',
        successMessage: 'The cost model includes the required fields.',
        failureMessage: 'Include token counts, GPU profile or utilization, requests, and cost.',
      },
      {
        id: 'route-class',
        type: 'checkbox',
        prompt: 'Confirm cost is segmented by route class, not only averaged across all traffic.',
        successMessage: 'Cost reporting is useful for platform decisions.',
        failureMessage: 'Average-only cost hides interactive and batch tradeoffs.',
      },
    ],
    hints: [
      'A single blended cost number is rarely actionable.',
      'Keep prompt and completion token counts separate.',
    ],
    solution:
      'Cost should be reported by route class with request count, token counts, GPU type, utilization, cache behavior, and latency distribution.',
  },
};

const stepsByChallenge = {
  'vllm-inference': [stepTemplates.namespace, stepTemplates.gpuScheduling, stepTemplates.servingHealth],
  'rag-retrieval': [stepTemplates.namespace, stepTemplates.ragPolicy, stepTemplates.observability],
  'production-readiness': [stepTemplates.namespace, stepTemplates.launchReview, stepTemplates.costModel],
  observability: [stepTemplates.namespace, stepTemplates.observability, stepTemplates.costModel],
  'vllm-kubernetes-deployment': [stepTemplates.namespace, stepTemplates.gpuScheduling, stepTemplates.servingHealth],
  'kserve-vs-ray-serve-decision': [stepTemplates.decisionMatrix, stepTemplates.launchReview],
  'gpu-node-pool-scheduling': [stepTemplates.namespace, stepTemplates.gpuScheduling, stepTemplates.launchReview],
  'rag-retrieval-quality': [stepTemplates.ragPolicy, stepTemplates.observability, stepTemplates.costModel],
  'inference-cost-model': [stepTemplates.observability, stepTemplates.costModel],
  'rollout-rollback': [stepTemplates.namespace, stepTemplates.launchReview, stepTemplates.observability],
  'multi-tenant-security': [stepTemplates.namespace, stepTemplates.ragPolicy, stepTemplates.launchReview],
  'observability-cost-dashboard': [stepTemplates.observability, stepTemplates.costModel, stepTemplates.launchReview],
};

function withSteps(challenge) {
  return {
    ...challenge,
    appHref: `${labsBaseUrl}/challenges/${challenge.slug}`,
    steps: (stepsByChallenge[challenge.id] || []).map((step, index) => ({
      ...step,
      id: `${challenge.id}-step-${index + 1}`,
      checks: step.checks.map((check) => ({
        ...check,
        id: `${challenge.id}-${check.id}`,
      })),
    })),
  };
}

const challenges = challengeSummaries.map(withSteps);

const roadmaps = [
  {
    id: 'kubernetes-llm-platform',
    slug: 'kubernetes-llm-platform',
    title: 'Kubernetes LLM Platform Roadmap',
    summary:
      'A guided path from Kubernetes primitives to production LLM serving, RAG, observability, cost, and readiness.',
    modules: [
      {
        title: 'Foundations',
        challengeIds: ['kserve-vs-ray-serve-decision', 'gpu-node-pool-scheduling', 'production-readiness'],
      },
      {
        title: 'Model Serving',
        challengeIds: ['vllm-kubernetes-deployment', 'vllm-inference', 'rollout-rollback'],
      },
      {
        title: 'RAG Platform',
        challengeIds: ['rag-retrieval', 'rag-retrieval-quality', 'multi-tenant-security'],
      },
      {
        title: 'Operate and Optimize',
        challengeIds: ['observability', 'observability-cost-dashboard', 'inference-cost-model'],
      },
    ],
  },
];

const labProduct = {
  labsBaseUrl,
  waitlistStorageKey: 'k8sllm.labWaitlist',
  progressStorageKey: 'k8sllm.interactiveProgress',
  analyticsEvents: [
    'challenge_start',
    'step_complete',
    'hint_open',
    'solution_reveal',
    'challenge_complete',
    'premium_interest_click',
  ],
};

module.exports = {
  challenges,
  roadmaps,
  productPaths,
  labProduct,
};
