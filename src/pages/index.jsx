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
    label: 'LLM On Kubernetes',
    href: '/docs/llm-on-kubernetes',
    detail: 'GPU node pools, vLLM, KServe, Ray Serve, RAG, and inference economics.',
  },
];

const signals = [
  'Design for failure domains before tuning replicas.',
  'Prefer explicit platform contracts over tool sprawl.',
  'Treat LLM serving on Kubernetes as a latency, capacity, and GPU economics problem.',
];

const heroStats = [
  { value: '30+', label: 'production topics' },
  { value: '6', label: 'reference architectures' },
  { value: '4', label: 'field labs' },
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
    label: 'RAG On Kubernetes',
    href: '/docs/llm-on-kubernetes/rag-on-kubernetes',
    detail: 'Operate ingestion, retrieval, generation, and evaluation as one production system.',
  },
];

const labs = [
  {
    label: 'vLLM inference lab',
    href: '/docs/labs/vllm-inference-lab',
    detail: 'Deploy a GPU-backed OpenAI-compatible endpoint and verify TTFT, queueing, and health.',
  },
  {
    label: 'RAG evaluation lab',
    href: '/docs/labs/rag-retrieval-lab',
    detail: 'Build the ingestion-to-answer loop with retrieval quality checks and failure drills.',
  },
  {
    label: 'Production readiness lab',
    href: '/docs/labs/production-readiness-lab',
    detail: 'Run security, observability, rollback, and cost checks before a model goes live.',
  },
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

export default function Home() {
  const productionClusterImage = useBaseUrl('/img/architectures/production-cluster.svg');
  const llmStackImage = useBaseUrl('/img/architectures/llm-inference-stack.svg');
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
              K8sLLM teaches how to design, scale, secure, and operate LLM
              workloads on Kubernetes. Use this K8s LLM guide for GPU node
              pools, model serving, RAG, observability, rollout controls, and
              cost-aware platform patterns.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/docs/k8s-llm">
                Start the K8s LLM guide
              </Link>
              <Link className={styles.secondaryAction} to="/docs/labs">
                Open the labs
              </Link>
              <Link className={styles.secondaryAction} to="/docs/llm-on-kubernetes/model-serving-options">
                Compare serving options
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

          <aside className={styles.heroVisual} aria-label="LLM platform command center preview">
            <div className={styles.visualHeader}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <strong>k8sllm production review</strong>
            </div>
            <div className={styles.visualBody}>
              <img src={llmStackImage} alt="LLM inference stack on Kubernetes architecture" />
              <div className={styles.runbookPanel}>
                <p>Readiness gate</p>
                <ol>
                  <li>GPU pool isolated and quota-bound</li>
                  <li>Runtime exposes health, metrics, and token latency</li>
                  <li>Rollback path tested before traffic shift</li>
                </ol>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.videoSection}>
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
            <p className={styles.kicker}>Hands-on lab track</p>
            <h2>Turn the guide into cluster exercises.</h2>
            <p>
              Labs are written as field runbooks: objective, platform contract,
              commands, validation signals, and failure drills. They are static
              docs you can run in your own Kubernetes environment.
            </p>
            <Link className={styles.textAction} to="/docs/labs">
              Browse all labs
            </Link>
          </div>
          <div className={styles.labGrid}>
            {labs.map((lab, index) => (
              <Link className={styles.labCard} to={lab.href} key={lab.label} style={{ '--index': index }}>
                <span>0{index + 1}</span>
                <strong>{lab.label}</strong>
                <small>{lab.detail}</small>
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
