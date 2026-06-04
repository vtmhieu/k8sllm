import clsx from 'clsx';
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

  return (
    <Layout
      title="Kubernetes + LLM Platform Guide"
      description="K8sLLM is a senior platform engineering guide for Kubernetes LLM infrastructure, GPU node pools, model serving, RAG, and production platform services."
    >
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
