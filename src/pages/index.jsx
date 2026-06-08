import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const tracks = [
  {
    label: 'Kubernetes Core',
    href: '/docs/kubernetes',
    detail: 'Control plane contracts, scheduling, networking, and storage decisions.',
  },
  {
    label: 'Production Baseline',
    href: '/docs/best-practices',
    detail: 'Scaling, security, observability, backup, and incident-ready operations.',
  },
  {
    label: 'LLM on Kubernetes',
    href: '/docs/llm-on-kubernetes',
    detail: 'GPU node pools, vLLM, KServe, Ray Serve, RAG, and inference economics.',
  },
];

const signals = [
  'Separate system, app, and GPU capacity before tuning replicas.',
  'Make serving contracts explicit before adding runtime choices.',
  'Treat LLM inference as a latency, placement, and GPU economics system.',
];

const heroStats = [
  { value: '30+', label: 'production topics' },
  { value: '12', label: 'interactive challenges' },
  { value: '6', label: 'architecture maps' },
];

const pathCards = [
  {
    label: 'Serve models in production',
    href: '/docs/llm-on-kubernetes/vllm-kubernetes',
    detail: 'Design runtime contracts around vLLM, KServe, Ray Serve, probes, routing, and rollbacks.',
    links: [
      { label: 'vLLM Kubernetes', href: '/docs/llm-on-kubernetes/vllm-kubernetes' },
      { label: 'KServe vs Ray Serve', href: '/docs/llm-on-kubernetes/kserve-vs-ray-serve' },
    ],
  },
  {
    label: 'Design GPU capacity',
    href: '/docs/llm-on-kubernetes/gpu-node-pools',
    detail: 'Plan accelerator pools with labels, taints, quotas, autoscaling buffers, and failure isolation.',
    links: [
      { label: 'GPU node pool guide', href: '/docs/llm-on-kubernetes/gpu-node-pools' },
      { label: 'Scheduling lab', href: 'https://labs.k8sllm.online/challenges/gpu-node-pool-scheduling' },
    ],
  },
  {
    label: 'Build RAG on Kubernetes',
    href: '/docs/llm-on-kubernetes/rag-on-kubernetes',
    detail: 'Separate ingestion quality, tenant-aware retrieval, prompt assembly, generation, and evaluation.',
    links: [
      { label: 'RAG guide', href: '/docs/llm-on-kubernetes/rag-on-kubernetes' },
      { label: 'RAG challenge', href: 'https://labs.k8sllm.online/challenges/rag-retrieval' },
    ],
  },
  {
    label: 'Prove production readiness',
    href: '/docs/best-practices/security-hardening-checklist',
    detail: 'Check security, observability, rollout, rollback, cost, and ownership before model traffic shifts.',
    links: [
      { label: 'Security checklist', href: '/docs/best-practices/security-hardening-checklist' },
      { label: 'Readiness lab', href: 'https://labs.k8sllm.online/challenges/production-readiness' },
    ],
  },
];

const productionScenarios = [
  {
    label: 'LLM latency on Kubernetes',
    title: 'Pods are healthy, users still wait 14 seconds',
    href: '/docs/field-notes/llm-latency-war-room',
    labHref: 'https://labs.k8sllm.online/challenges/vllm-inference',
    symptoms: ['green readiness', 'slow first token', 'runtime queueing'],
    decision:
      'Separate gateway time, prefill, decode, queue wait, and GPU pressure before adding replicas.',
    signals: 'TTFT, queue wait, tokens/sec, GPU memory, model load time',
  },
  {
    label: 'GPU node pool Kubernetes',
    title: 'GPU nodes are expensive but underutilized',
    href: '/docs/field-notes/gpu-capacity-incident',
    labHref: 'https://labs.k8sllm.online/challenges/gpu-node-pool-scheduling',
    symptoms: ['pending pods', 'idle accelerators', 'fragmented profiles'],
    decision:
      'Treat GPU pools as distinct capacity classes with labels, taints, quotas, buffers, and workload lanes.',
    signals: 'pending reasons, GPU utilization, memory profile, queue wait, cost/request',
  },
  {
    label: 'RAG on Kubernetes',
    title: 'RAG retrieves documents the user should not see',
    href: '/docs/field-notes/rag-tenant-isolation-review',
    labHref: 'https://labs.k8sllm.online/challenges/rag-retrieval',
    symptoms: ['cross-tenant context', 'wrong citations', 'metadata drift'],
    decision:
      'Enforce authorization before context enters the prompt and test retrieval quality as a release gate.',
    signals: 'tenant filters, citation IDs, retrieval recall, unauthorized-document tests',
  },
  {
    label: 'KServe vs Ray Serve',
    title: 'KServe vs Ray Serve becomes an ownership decision',
    href: '/docs/field-notes/kserve-ray-serve-ownership',
    labHref: 'https://labs.k8sllm.online/challenges/kserve-vs-ray-serve-decision',
    symptoms: ['unclear rollback unit', 'runtime knobs hidden', 'serving graph sprawl'],
    decision:
      'Pick the serving layer by ownership model, not popularity: platform API or programmable serving graph.',
    signals: 'revision boundary, graph complexity, autoscaling owner, SRE operability',
  },
];

const debuggingPaths = [
  {
    label: 'LLM latency',
    question: 'Pods are healthy, but users still wait for the first token.',
    href: '/docs/production-guides/llm-latency-on-kubernetes',
    labHref: 'https://labs.k8sllm.online/challenges/vllm-inference',
    signal: 'TTFT, queue wait, tokens/sec',
  },
  {
    label: 'GPU scheduling',
    question: 'GPU nodes exist, but inference pods are pending or misplaced.',
    href: '/docs/production-guides/gpu-node-pool-scheduling-llm-inference',
    labHref: 'https://labs.k8sllm.online/challenges/gpu-node-pool-scheduling',
    signal: 'labels, taints, GPU requests',
  },
  {
    label: 'RAG isolation',
    question: 'Retrieval is strong, but tenant access is not proven.',
    href: '/docs/production-guides/rag-tenant-isolation-kubernetes',
    labHref: 'https://labs.k8sllm.online/challenges/rag-retrieval',
    signal: 'tenant filters, citations, policy',
  },
  {
    label: 'Serving choice',
    question: 'KServe or Ray Serve is really an ownership decision.',
    href: '/docs/production-guides/kserve-vs-ray-serve-llm-platforms',
    labHref: 'https://labs.k8sllm.online/challenges/kserve-vs-ray-serve-decision',
    signal: 'contract, graph complexity, rollback',
  },
  {
    label: 'Readiness',
    question: 'The model works, but launch evidence is incomplete.',
    href: '/docs/production-guides/llm-production-readiness-checklist',
    labHref: 'https://labs.k8sllm.online/challenges/production-readiness',
    signal: 'policy, rollback, cost, latency',
  },
];

const growthProof = [
  { value: '12', label: 'free guided labs' },
  { value: '6', label: 'production guides' },
  { value: '4', label: 'field notes' },
  { value: '0', label: 'fake customer claims' },
];

const llmPillars = [
  {
    label: 'K8s LLM Guide',
    href: '/docs/k8s-llm',
    detail: 'Use the exact platform map for Kubernetes LLM infrastructure, teams, and learning paths.',
  },
  {
    label: 'vLLM Kubernetes',
    href: '/docs/llm-on-kubernetes/vllm-kubernetes',
    detail: 'Deploy the runtime contract around GPU placement, model cache, health, and metrics.',
  },
  {
    label: 'KServe vs Ray Serve',
    href: '/docs/llm-on-kubernetes/kserve-vs-ray-serve',
    detail: 'Pick the serving abstraction by ownership model, rollout style, and graph complexity.',
  },
  {
    label: 'GPU Node Pools',
    href: '/docs/llm-on-kubernetes/gpu-node-pools',
    detail: 'Design accelerator pools with taints, quotas, autoscaling, and failure isolation.',
  },
  {
    label: 'RAG on Kubernetes',
    href: '/docs/llm-on-kubernetes/rag-on-kubernetes',
    detail: 'Operate ingestion, retrieval, generation, and evaluation as one production system.',
  },
];

const labs = [
  {
    label: 'vLLM inference challenge',
    href: 'https://labs.k8sllm.online/challenges/vllm-inference',
    detail: 'Deploy a GPU-backed OpenAI-compatible endpoint and verify TTFT, queueing, placement, and health.',
    difficulty: 'Hard',
    duration: '75 min',
    role: 'AI infra',
    signals: 'GPU placement, TTFT, queue wait',
  },
  {
    label: 'RAG retrieval challenge',
    href: 'https://labs.k8sllm.online/challenges/rag-retrieval',
    detail: 'Validate tenant-aware retrieval, metadata filters, answer quality, and failure drills.',
    difficulty: 'Medium',
    duration: '60 min',
    role: 'MLOps',
    signals: 'tenant filters, citations, recall',
  },
  {
    label: 'Production readiness challenge',
    href: 'https://labs.k8sllm.online/challenges/production-readiness',
    detail: 'Run launch checks across security, observability, rollback, quota, and cost.',
    difficulty: 'Hard',
    duration: '50 min',
    role: 'Platform lead',
    signals: 'RBAC, quota, rollback, dashboards',
  },
  {
    label: 'LLM observability challenge',
    href: 'https://labs.k8sllm.online/challenges/observability',
    detail: 'Connect user latency to runtime queueing, token throughput, GPU pressure, traces, and logs.',
    difficulty: 'Medium',
    duration: '45 min',
    role: 'SRE',
    signals: 'TTFT, tokens/sec, GPU pressure',
  },
];

const proofPoints = [
  {
    label: 'Architecture-first',
    detail: 'Every topic starts with platform boundaries, ownership, failure modes, and operating signals.',
  },
  {
    label: 'Hands-on validation',
    detail: 'Interactive labs use terminal-style checks for Kubernetes output, GPU placement, runtime health, and policy evidence.',
  },
  {
    label: 'Production scope',
    detail: 'The guide covers GPU capacity, latency, cost, security, GitOps, observability, RAG, and rollback paths.',
  },
  {
    label: 'Source anchored',
    detail: 'Pages are tied to official Kubernetes, vLLM, KServe, Ray Serve, and NVIDIA GPU Operator documentation.',
  },
];

const stackItems = [
  'Kubernetes',
  'vLLM',
  'KServe',
  'Ray Serve',
  'RAG',
  'Prometheus/Grafana',
  'GitOps',
  'policy-as-code',
];

const credibilityLinks = [
  { label: 'About K8sLLM', href: '/docs/about-k8sllm' },
  { label: 'Field Notes', href: '/docs/field-notes' },
  { label: 'Production guides', href: '/docs/production-guides' },
  { label: 'Review checklist', href: '/docs/content-review-checklist' },
  { label: 'Challenge labs', href: '/docs/labs' },
  { label: 'Premium lab waitlist', href: 'https://labs.k8sllm.online/#premium-labs' },
  { label: 'Reference architectures', href: '/docs/reference-architectures' },
];

const scenes = [
  {
    time: '0-8s',
    title: 'Production LLM Infrastructure on Kubernetes',
    detail:
      'The opening map frames LLM serving as a platform engineering problem, not just a model deployment.',
  },
  {
    time: '8-18s',
    title: 'LLM workloads break normal Kubernetes assumptions',
    detail:
      'GPU capacity, token latency, queue wait, model rollout, and tenant isolation become first-order design concerns.',
  },
  {
    time: '18-32s',
    title: 'Reference Architecture: Production Cluster',
    detail:
      'Control plane, system pool, app pool, GPU pool, GitOps, policy, backup, and observability are separated by responsibility.',
  },
  {
    time: '32-48s',
    title: 'Reference Architecture: LLM Inference Stack',
    detail:
      'Gateway policy, runtime behavior, GPU placement, inference metrics, and cost signals are shown as one serving path.',
  },
  {
    time: '48-60s',
    title: 'Serving Choice: KServe or Ray Serve?',
    detail:
      'KServe fits standardized platform APIs, while Ray Serve fits programmable Python-native serving graphs.',
  },
  {
    time: '60-78s',
    title: 'Reference Architecture: RAG Platform',
    detail:
      'The RAG map separates ingestion quality from online serving latency and access-controlled retrieval.',
  },
  {
    time: '78-90s',
    title: 'Operate it like a platform',
    detail:
      'GitOps change flow and observability signals make LLM infrastructure reviewable, measurable, and reversible.',
  },
  {
    time: '90-100s',
    title: 'K8sLLM',
    detail:
      'The final map connects production cluster design, GPU node pools, model serving, RAG, observability, GitOps, cost, and reliability.',
  },
];

function TrackLink({ label, href, detail, index }) {
  return (
    <Link className={styles.trackLink} to={href} style={{ '--index': index }}>
      <span>{label}</span>
      <small>{detail}</small>
    </Link>
  );
}

function HeroTopology() {
  return (
    <aside className={styles.heroVisual} aria-label="Kubernetes LLM platform topology">
      <div className={styles.visualHeader}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <strong>k8sllm production topology</strong>
      </div>
      <div className={styles.topologyShell}>
        <div className={styles.topologyMap}>
          <div className={styles.topologyLayer}>
            <span className={styles.layerLabel}>Ingress plane</span>
            <div className={styles.serviceNode}>Gateway</div>
            <div className={styles.serviceNode}>Auth and quota</div>
          </div>

          <div className={styles.topologyLayer}>
            <span className={styles.layerLabel}>Serving plane</span>
            <div className={styles.serviceNode}>KServe</div>
            <div className={styles.serviceNode}>Ray Serve</div>
            <div className={styles.serviceNode}>vLLM runtime</div>
          </div>

          <div className={styles.poolGrid} aria-label="Node pool layout">
            <div className={styles.nodePool}>
              <span>system pool</span>
              <div className={styles.nodeRack}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
            </div>
            <div className={styles.nodePool}>
              <span>app pool</span>
              <div className={styles.nodeRack}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
            </div>
            <div className={clsx(styles.nodePool, styles.gpuNodePool)}>
              <span>GPU pool</span>
              <div className={styles.nodeRack}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
            </div>
          </div>

          <svg className={styles.flowOverlay} viewBox="0 0 720 520" role="img" aria-label="Request flow from gateway to model runtime and telemetry">
            <path d="M84 112 C180 112 190 188 286 188" />
            <path d="M414 188 C496 188 512 304 600 304" />
            <path d="M600 354 C524 438 348 444 132 424" />
          </svg>
        </div>

        <div className={styles.telemetryStrip} aria-label="LLM operating signals">
          <div>
            <span>TTFT</span>
            <strong>1.8s</strong>
          </div>
          <div>
            <span>tokens/sec</span>
            <strong>128</strong>
          </div>
          <div>
            <span>GPU util</span>
            <strong>74%</strong>
          </div>
          <div>
            <span>queue wait</span>
            <strong>420ms</strong>
          </div>
        </div>

        <div className={styles.runbookPanel}>
          <p>Readiness gate</p>
          <ol>
            <li>GPU pool is tainted, quota-bound, and isolated</li>
            <li>Runtime exposes health, metrics, and token latency</li>
            <li>Rollback path is tested before traffic shift</li>
          </ol>
        </div>
      </div>
    </aside>
  );
}

export default function Home() {
  const productionClusterImage = useBaseUrl('/img/architectures/production-cluster.svg');
  const architectureVideo = useBaseUrl('/videos/k8sllm-architecture.mp4');
  const architecturePoster = useBaseUrl('/img/video/k8sllm-architecture-poster.png');
  const architectureCaptions = useBaseUrl('/videos/k8sllm-architecture.vtt');
  const videoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'K8sLLM Platform Walkthrough',
    description:
      'A 100-second platform walkthrough for Kubernetes LLM infrastructure, covering GPU node pools, model serving, RAG, observability, GitOps, and production operations.',
    thumbnailUrl: ['https://www.k8sllm.online/img/video/k8sllm-architecture-poster.png'],
    uploadDate: '2026-06-04',
    duration: 'PT1M40S',
    contentUrl: 'https://www.k8sllm.online/videos/k8sllm-architecture.mp4',
    embedUrl: 'https://www.k8sllm.online/',
    inLanguage: 'en',
  };

  return (
    <Layout
      title="Kubernetes + LLM Platform Guide"
      description="K8sLLM is a senior platform engineering guide for Kubernetes LLM infrastructure, GPU node pools, model serving, RAG, and production platform services."
    >
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:video" content="https://www.k8sllm.online/videos/k8sllm-architecture.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <script type="application/ld+json">{JSON.stringify(videoStructuredData)}</script>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>K8sLLM production AI infrastructure guide</p>
            <h1>Kubernetes + LLM Platform Guide</h1>
            <p className={styles.lead}>
              Learn to design, scale, secure, and operate LLM workloads on
              Kubernetes. K8sLLM connects cluster primitives to GPU node pools,
              model serving, RAG, observability, rollout controls, and
              cost-aware platform decisions.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="https://labs.k8sllm.online/challenges">
                Start interactive labs
              </Link>
              <a className={styles.secondaryAction} href="#platform-walkthrough">
                Watch platform walkthrough
              </a>
              <Link className={styles.textAction} to="/docs/k8s-llm">
                Read K8s LLM platform map
              </Link>
            </div>
            <div className={styles.heroStats} aria-label="Site coverage">
              {heroStats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroTopology />
        </section>

        <section className={styles.debugSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>What are you debugging?</p>
            <h2>Enter from the symptom, then move into the matching lab.</h2>
          </div>
          <div className={styles.debugGrid}>
            {debuggingPaths.map((path, index) => (
              <article className={styles.debugCard} key={path.label} style={{ '--index': index }}>
                <span>{path.label}</span>
                <h3>{path.question}</h3>
                <p>
                  <b>Inspect:</b> {path.signal}
                </p>
                <div className={styles.debugActions}>
                  <Link to={path.href}>Read guide</Link>
                  <Link to={path.labHref}>Open lab</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.labSpotlight}>
          <div className={styles.spotlightCopy}>
            <p className={styles.kicker}>Challenge of the Week</p>
            <h2>vLLM Inference Challenge</h2>
            <p>
              Start with the strongest demo: deploy a GPU-backed inference
              service, inspect terminal evidence, validate placement, measure
              token latency, and prove the runtime is ready for traffic.
            </p>
            <div className={styles.spotlightMeta} aria-label="Challenge metadata">
              <span>Hard</span>
              <span>75 min</span>
              <span>AI infrastructure</span>
              <span>TTFT and GPU placement</span>
            </div>
            <div className={styles.spotlightActions}>
              <Link className={styles.primaryAction} to="https://labs.k8sllm.online/challenges/vllm-inference">
                Start vLLM lab
              </Link>
              <Link className={styles.secondaryAction} to="/docs/production-guides/vllm-kubernetes-production-deployment">
                Read deployment guide
              </Link>
              <Link className={styles.textAction} to="/docs/production-guides/llm-production-readiness-checklist">
                Open readiness checklist
              </Link>
            </div>
          </div>
          <div className={styles.spotlightProof} aria-label="K8sLLM usefulness proof">
            {growthProof.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.pathSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Choose your path</p>
            <h2>Start from the production problem you need to solve.</h2>
          </div>
          <div className={styles.pathGrid}>
            {pathCards.map((path, index) => (
              <article className={styles.pathCard} key={path.label} style={{ '--index': index }}>
                <Link to={path.href} className={styles.pathMainLink}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{path.label}</strong>
                  <small>{path.detail}</small>
                </Link>
                <div className={styles.pathLinks}>
                  {path.links.map((link) => (
                    <Link key={link.label} to={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.scenarioSection}>
          <div className={styles.scenarioIntro}>
            <p className={styles.kicker}>Production scenarios</p>
            <h2>Read the incidents before they happen.</h2>
            <p>
              Field notes turn common Kubernetes LLM failures into practical
              engineering conversations. Start with symptoms, inspect the
              right signals, then move into the matching guide or lab.
            </p>
            <Link className={styles.textAction} to="/docs/field-notes">
              Browse Field Notes
            </Link>
          </div>
          <div className={styles.scenarioGrid}>
            {productionScenarios.map((scenario, index) => (
              <article className={styles.scenarioCard} key={scenario.title} style={{ '--index': index }}>
                <div className={styles.scenarioTopline}>
                  <span>{scenario.label}</span>
                  <strong>{scenario.title}</strong>
                </div>
                <div className={styles.scenarioSymptoms} aria-label={`${scenario.title} symptoms`}>
                  {scenario.symptoms.map((symptom) => (
                    <em key={symptom}>{symptom}</em>
                  ))}
                </div>
                <p>
                  <b>Platform decision:</b> {scenario.decision}
                </p>
                <small>
                  <b>Signals:</b> {scenario.signals}
                </small>
                <div className={styles.scenarioActions}>
                  <Link to={scenario.href}>Read field note</Link>
                  <Link to={scenario.labHref}>Open lab</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.videoSection} id="platform-walkthrough">
          <div className={styles.videoCopy}>
            <p className={styles.kicker}>Platform walkthrough</p>
            <h2>K8sLLM Platform Walkthrough</h2>
            <p>
              This code-generated Remotion video explains the production path
              from cluster isolation and GPU pools to model serving, RAG,
              GitOps, observability, and cost-aware operations.
            </p>
            <span className={styles.videoMeta}>100 seconds · 8 architecture scenes · captions included</span>
          </div>
          <div className={styles.videoFrame} aria-label="K8sLLM Platform Walkthrough video player">
            <video
              controls
              playsInline
              preload="metadata"
              poster={architecturePoster}
              aria-label="K8sLLM Platform Walkthrough video"
            >
              <source src={architectureVideo} type="video/mp4" />
              <track
                src={architectureCaptions}
                kind="captions"
                srcLang="en"
                label="English"
                default
              />
            </video>
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Why K8sLLM is different</p>
            <h2>A practical platform guide, not a collection of toy tutorials.</h2>
          </div>
          <div className={styles.proofGrid}>
            {proofPoints.map((point, index) => (
              <article className={styles.proofCard} key={point.label} style={{ '--index': index }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{point.label}</h3>
                <p>{point.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.sceneSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>What the video covers</p>
            <h2>Eight architecture scenes for production LLM platforms.</h2>
          </div>
          <div className={styles.sceneGrid}>
            {scenes.map((scene) => (
              <article className={styles.sceneCard} key={scene.title}>
                <span>{scene.time}</span>
                <h3>{scene.title}</h3>
                <p>{scene.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trackSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Learning map</p>
            <h2>Move from cluster primitives to an AI inference platform.</h2>
          </div>
          <div className={styles.trackGrid}>
            {tracks.map((track, index) => (
              <TrackLink key={track.label} index={index} {...track} />
            ))}
          </div>
        </section>

        <section className={styles.labSection}>
          <div className={styles.labIntro}>
            <p className={styles.kicker}>Challenge lab track</p>
            <h2>Practice the platform decisions in interactive challenges.</h2>
            <p>
              K8sLLM Labs turn each architecture decision into a guided
              challenge with terminal-style commands, validation checks,
              progressive hints, expected signals, and failure drills.
            </p>
            <Link className={styles.textAction} to="https://labs.k8sllm.online/challenges/vllm-inference">
              Start the vLLM challenge
            </Link>
          </div>
          <div className={styles.labGrid}>
            {labs.map((lab, index) => (
              <Link className={styles.labCard} to={lab.href} key={lab.label} style={{ '--index': index }}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{lab.label}</strong>
                  <small>{lab.detail}</small>
                  <div className={styles.labMeta}>
                    <em>{lab.difficulty}</em>
                    <em>{lab.duration}</em>
                    <em>{lab.role}</em>
                  </div>
                  <p>{lab.signals}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.operatingModel}>
          <div>
            <p className={styles.kicker}>Operating model</p>
            <h2>Learn the platform decisions behind the tools.</h2>
            <p>
              Each guide connects Kubernetes mechanics to operational decisions:
              when to use a service, which failure modes matter, which metrics
              prove the system is healthy, and which tradeoffs affect latency,
              cost, or security.
            </p>
          </div>
          <div className={styles.signalList}>
            {signals.map((signal) => (
              <div className={clsx(styles.signalRow)} key={signal}>
                <span aria-hidden="true" />
                <p>{signal}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.trackSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Kubernetes LLM pillars</p>
            <h2>Start with the pages that shape real AI infrastructure decisions.</h2>
          </div>
          <div className={styles.trackGrid}>
            {llmPillars.map((pillar, index) => (
              <Link className={styles.trackLink} key={pillar.label} to={pillar.href} style={{ '--index': index }}>
                <span>{pillar.label}</span>
                <small>{pillar.detail}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.credibilitySection}>
          <div>
            <p className={styles.kicker}>Built as a product</p>
            <h2>Built as a production AI infrastructure learning platform.</h2>
            <p>
              K8sLLM is designed to show the operating model behind modern AI
              platforms: runtime selection, GPU scheduling, retrieval quality,
              policy controls, GitOps delivery, telemetry, rollback, and
              cost-aware reliability.
            </p>
          </div>
          <div className={styles.credibilityPanel}>
            <p>Stack coverage</p>
            <div className={styles.stackGrid}>
              {stackItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className={styles.credibilityLinks}>
              {credibilityLinks.map((link) => (
                <Link key={link.label} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.trackSection, styles.architectureSection)}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Architecture review</p>
            <h2>Use diagrams as review artifacts, not decoration.</h2>
          </div>
          <Link className={styles.architecturePreview} to="/docs/reference-architectures/production-cluster">
            <img src={productionClusterImage} alt="Production Kubernetes cluster architecture" />
            <div>
              <strong>Production cluster blueprint</strong>
              <small>
                Walk through control plane, worker pools, delivery, policy,
                observability, and recovery boundaries before adding AI workloads.
              </small>
            </div>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
