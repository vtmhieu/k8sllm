import type { LabChallenge, LabStep } from '@k8sllm/lab-content';

export type TerminalCommandResult = {
  output: string;
  matched: boolean;
  summary: string;
};

type TerminalCommandInput = {
  challenge: LabChallenge;
  step: LabStep;
  command: string;
};

const namespaceOutput = `apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: null
  name: llm-serving`;

const namespaceLabelsOutput = `NAME          STATUS   AGE   LABELS
llm-serving   Active   18m   kubernetes.io/metadata.name=llm-serving,owner=platform-ai,workload-class=llm`;

const gpuNodesOutput = `NAME              STATUS   ROLES    AGE   VERSION   ACCELERATOR   GPU PRODUCT
system-pool-01    Ready    <none>   21d   v1.30.8   <none>        <none>
app-pool-04       Ready    <none>   21d   v1.30.8   <none>        <none>
gpu-a10-01        Ready    <none>   12d   v1.30.8   nvidia       NVIDIA-A10G
gpu-a10-02        Ready    <none>   12d   v1.30.8   nvidia       NVIDIA-A10G`;

const gpuPodDescription = `Name:             vllm-openai-7f77fd9c7d-gpu8x
Namespace:        llm-serving
Node:             gpu-a10-01/10.48.7.21
Status:           Running
Labels:           app=vllm-openai
                  model=mistral-7b
Containers:
  vllm:
    Image:        vllm/vllm-openai:latest
    Ports:        8000/TCP
    Limits:
      nvidia.com/gpu:  1
    Requests:
      cpu:            4
      memory:         24Gi
Tolerations:       nvidia.com/gpu:NoSchedule op=Exists
Events:
  Normal Scheduled  default-scheduler  Successfully assigned llm-serving/vllm-openai-7f77fd9c7d-gpu8x to gpu-a10-01
  Normal Pulled     kubelet            Container image already present
  Normal Started    kubelet            Started container vllm`;

const gpuPodWide = `NAME                                READY   STATUS    RESTARTS   AGE   IP            NODE
vllm-openai-7f77fd9c7d-gpu8x         1/1     Running   0          18m   10.244.8.44   gpu-a10-01`;

const servingResources = `NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)
svc/vllm-openai       ClusterIP   10.96.42.117   <none>        8000/TCP

NAME                    ENDPOINTS           AGE
endpoints/vllm-openai    10.244.8.44:8000    18m

NAME                                    READY   STATUS    RESTARTS   AGE
pod/vllm-openai-7f77fd9c7d-gpu8x         1/1     Running   0          18m`;

const servingLogs = `INFO 06-04 11:41:02 api_server.py: model=mistral-7b loading weights from cache
INFO 06-04 11:41:47 engine.py: CUDA graph captured for decoding path
INFO 06-04 11:42:03 api_server.py: OpenAI-compatible server listening on 0.0.0.0:8000
INFO 06-04 11:42:07 metrics.py: ttft_p95_ms=742 queue_wait_p95_ms=38 tokens_per_second=1288 gpu_utilization=0.72
INFO 06-04 11:42:09 health.py: readiness=Ready model_loaded=true`;

const modelList = `{
  "object": "list",
  "data": [
    {
      "id": "mistral-7b",
      "object": "model",
      "owned_by": "platform-ai",
      "ready": true
    }
  ]
}`;

const ragSearch = `{
  "tenant": "team-a",
  "query": "deployment rollback",
  "policy": "authorized",
  "filter": {
    "tenant": "team-a",
    "classification": "internal"
  },
  "results": [
    {
      "document_id": "runbook-rollback-v3",
      "score": 0.91,
      "metadata": {
        "tenant": "team-a",
        "source": "platform-runbooks",
        "index_version": "2026-06-04"
      }
    }
  ]
}`;

const ragLogs = `INFO retrieval request_id=req_192 tenant=team-a policy=authorized filter=tenant:team-a top_k=5
INFO retrieval document_id=runbook-rollback-v3 score=0.91 metadata.index_version=2026-06-04
WARN retrieval tenant=team-b unauthorized_document=runbook-rollback-v3 action=filtered_before_prompt`;

const metricOutput = `llm_request_duration_seconds_bucket{route_class="interactive",model="mistral-7b",le="1"} 438
llm_ttft_seconds_p95{route_class="interactive",model="mistral-7b"} 0.742
llm_queue_wait_seconds_p95{route_class="interactive",model="mistral-7b"} 0.038
llm_tokens_per_second{model="mistral-7b"} 1288
gpu_utilization_ratio{node="gpu-a10-01",profile="a10g"} 0.72
gpu_memory_used_bytes{node="gpu-a10-01",profile="a10g"} 18468359372`;

const observablePods = `NAME                                READY   STATUS    RESTARTS   LABELS
vllm-openai-7f77fd9c7d-gpu8x         1/1     Running   0          app.kubernetes.io/name=vllm-openai,workload.k8sllm.io/model=mistral-7b,workload.k8sllm.io/route-class=interactive`;

const launchReview = `yes

NAME                                READY   UP-TO-DATE   AVAILABLE
deployment.apps/vllm-openai          1/1     1            1

NAME                                     AGE   REQUEST     LIMIT
resourcequota/llm-serving-gpu-quota       12d   gpu: 1/4    gpu: 4/4

NAME                                      POD-SELECTOR
networkpolicy.networking.k8s.io/deny-all  <none>
networkpolicy.networking.k8s.io/gateway-to-vllm app=vllm-openai`;

const rolloutHistory = `deployment.apps/vllm-openai
REVISION  CHANGE-CAUSE
12        model=mistral-7b runtime=vllm flags=max_model_len=8192
13        model=mistral-7b runtime=vllm flags=max_model_len=8192,enable_prefix_caching=true`;

const costModel = `route_class,input_tokens,output_tokens,requests,gpu_profile,gpu_hourly_cost,utilization,cost_per_request
interactive,812,164,18000,A10G,1.21,0.72,0.00019
agentic,3890,812,3200,A10G,1.21,0.69,0.00134
batch,1460,220,90000,A10G,1.21,0.83,0.00008`;

const servingDecision = `route,owner,graph_complexity,rollout_model,recommended_contract
/v1/chat/completions,platform,single-model,revision traffic split,KServe or direct vLLM
/rag/answer,app-team,multi-step retrieval-rerank-generate,application rollout,Ray Serve
/batch/summarize,platform,batch queue,job template,KServe Batch or Ray Job

Decision: use KServe for standardized platform-owned endpoints; use Ray Serve when the app team owns a Python-native serving graph.`;

const contextsOutput = `CURRENT   NAME             CLUSTER          AUTHINFO      NAMESPACE
*         k8sllm-lab-01    k8sllm-lab-01    lab-user      llm-serving`;

const namespacesOutput = `NAME              STATUS   AGE   LABELS
default           Active   21d   kubernetes.io/metadata.name=default
kube-system       Active   21d   kubernetes.io/metadata.name=kube-system
llm-serving       Active   18m   kubernetes.io/metadata.name=llm-serving,owner=platform-ai,workload-class=llm
observability     Active   21d   kubernetes.io/metadata.name=observability,owner=platform`;

const versionOutput = `Client Version: v1.30.8
Kustomize Version: v5.0.4
Server Version: v1.30.8`;

export function runLabTerminalCommand({
  challenge,
  step,
  command,
}: TerminalCommandInput): TerminalCommandResult {
  const trimmed = command.trim();
  const normalized = trimmed.replace(/\s+/g, ' ');
  const lower = normalized.toLowerCase();

  if (!trimmed) {
    return result('', true, 'empty command');
  }

  if (lower === 'clear') {
    return result('__CLEAR__', true, 'clear terminal');
  }

  if (lower === 'help') {
    return result(
      [
        'K8sLLM lab commands:',
        '  help                         show this help',
        '  clear                        clear terminal output',
        '  history                      show recent commands',
        '  k8sllm status                show lab state',
        '  k8sllm commands              list suggested commands for this step',
        '  kubectl config current-context',
        '  kubectl get namespaces --show-labels',
        '  kubectl ...                  run Kubernetes checks',
        '  curl ...                     run endpoint checks',
      ].join('\n'),
      true,
      'help',
    );
  }

  if (lower === 'k8sllm status') {
    return result(
      [
        `challenge=${challenge.slug}`,
        `step="${step.title}"`,
        'cluster=k8sllm-lab-01',
        'namespace=llm-serving',
        'user=lab',
        'gpu_pool=ready',
        'telemetry=ready',
      ].join('\n'),
      true,
      'lab status',
    );
  }

  if (lower === 'whoami') {
    return result('lab', true, 'current user');
  }

  if (lower === 'pwd') {
    return result('/home/lab/workspace', true, 'current directory');
  }

  if (lower === 'ls' || lower === 'ls -la') {
    return result(
      [
        'README.md',
        'manifests/',
        'checks/',
        'prometheus-queries/',
        'failure-drills/',
      ].join('\n'),
      true,
      'workspace listed',
    );
  }

  if (lower === 'history') {
    return result(
      [
        '1  kubectl config current-context',
        '2  kubectl get namespaces --show-labels',
        '3  k8sllm commands',
      ].join('\n'),
      true,
      'history shown',
    );
  }

  if (lower === 'kubectl config current-context') {
    return result('k8sllm-lab-01', true, 'current context');
  }

  if (lower === 'kubectl config get-contexts') {
    return result(contextsOutput, true, 'contexts listed');
  }

  if (lower === 'kubectl version --short' || lower === 'kubectl version') {
    return result(versionOutput, true, 'kubectl version');
  }

  if (lower.includes('get namespaces') || lower.includes('get ns --show-labels')) {
    return result(namespacesOutput, true, 'namespaces listed');
  }

  if (lower === 'k8sllm commands') {
    return result(step.commands.map((item, index) => `${index + 1}. ${item}`).join('\n'), true, 'commands');
  }

  if (lower.includes('create namespace llm-serving') && lower.includes('--dry-run')) {
    return result(namespaceOutput, true, 'namespace manifest generated');
  }

  if (lower.includes('create namespace llm-serving')) {
    return result('namespace/llm-serving created', true, 'namespace created');
  }

  if (lower.includes('label namespace llm-serving')) {
    return result('namespace/llm-serving labeled', true, 'namespace labeled');
  }

  if (lower.includes('get namespace llm-serving') || lower.includes('get ns llm-serving')) {
    return result(namespaceLabelsOutput, true, 'namespace labels visible');
  }

  if (lower.includes('get nodes') && (lower.includes('accelerator') || lower.includes('gpu'))) {
    return result(gpuNodesOutput, true, 'gpu nodes listed');
  }

  if (lower.includes('describe pod')) {
    return result(gpuPodDescription, true, 'gpu pod described');
  }

  if (lower.includes('get pod') && lower.includes('-o wide')) {
    return result(gpuPodWide, true, 'pod placement shown');
  }

  if (
    lower.includes('get svc,endpoints,pod') ||
    lower.includes('get svc') ||
    lower.includes('get endpoints')
  ) {
    return result(servingResources, true, 'serving resources ready');
  }

  if (lower.includes('logs') && lower.includes('rag')) {
    return result(ragLogs, true, 'rag policy logs visible');
  }

  if (lower.includes('logs')) {
    return result(servingLogs, true, 'runtime logs visible');
  }

  if (lower.includes('/v1/models') || lower.includes('gateway') || lower.includes('curl') && lower.includes('models')) {
    return result(modelList, true, 'model endpoint ready');
  }

  if (lower.includes('$rag_api/search') || lower.includes('/search?tenant=')) {
    return result(ragSearch, true, 'tenant-aware retrieval shown');
  }

  if (lower.includes('$metrics_endpoint') || lower.includes('grep -e') || lower.includes('ttft')) {
    return result(metricOutput, true, 'llm metrics shown');
  }

  if (lower.includes('get pod --show-labels')) {
    return result(observablePods, true, 'observability labels shown');
  }

  if (lower.includes('auth can-i') || lower.includes('get deploy,quota,networkpolicy')) {
    return result(launchReview, true, 'launch review evidence shown');
  }

  if (lower.includes('rollout history')) {
    return result(rolloutHistory, true, 'rollout history visible');
  }

  if (lower.startsWith('list each route') || lower.includes('serving choice') || lower.includes('endpoint contract')) {
    return result(servingDecision, true, 'serving decision matrix generated');
  }

  if (
    lower.startsWith('collect:') ||
    lower.startsWith('compute:') ||
    lower.startsWith('segment results') ||
    lower.includes('cost per route')
  ) {
    return result(costModel, true, 'cost model generated');
  }

  if (lower.includes('kubectl')) {
    return result(
      [
        `kubectl: command not recognized for this step`,
        `current step: ${step.title}`,
        'try: k8sllm commands',
      ].join('\n'),
      false,
      'unknown kubectl command',
    );
  }

  return result(
    [
      `command not found: ${trimmed}`,
      'try: help',
      'try: k8sllm commands',
    ].join('\n'),
    false,
    'unknown command',
  );
}

function result(output: string, matched: boolean, summary: string): TerminalCommandResult {
  return {
    output,
    matched,
    summary,
  };
}
