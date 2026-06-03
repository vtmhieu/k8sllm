import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const tracks = [
  {
    label: 'Kubernetes Core',
    href: '/docs/kubernetes',
    detail: 'Control plane, workloads, scheduling, networking, and storage.',
  },
  {
    label: 'Production Baseline',
    href: '/docs/best-practices',
    detail: 'Scaling, security, observability, backup, and disaster recovery.',
  },
  {
    label: 'LLM On Kubernetes',
    href: '/docs/llm-on-kubernetes',
    detail: 'GPU node pools, vLLM, KServe, Ray Serve, RAG, and inference cost.',
  },
];

const signals = [
  'Design for failure domains before tuning replicas.',
  'Prefer explicit platform contracts over tool sprawl.',
  'Treat LLM serving on Kubernetes as a latency, capacity, and GPU economics problem.',
];

const llmPillars = [
  {
    label: 'vLLM Kubernetes',
    href: '/docs/llm-on-kubernetes/vllm-kubernetes',
  },
  {
    label: 'KServe vs Ray Serve',
    href: '/docs/llm-on-kubernetes/kserve-vs-ray-serve',
  },
  {
    label: 'GPU Node Pools',
    href: '/docs/llm-on-kubernetes/gpu-node-pools',
  },
  {
    label: 'RAG On Kubernetes',
    href: '/docs/llm-on-kubernetes/rag-on-kubernetes',
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

  return (
    <Layout
      title="Kubernetes + LLM Platform Guide"
      description="A senior platform engineering guide for Kubernetes LLM infrastructure, GPU node pools, model serving, RAG, and production platform services."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Senior platform engineering guide</p>
            <h1>Kubernetes + LLM Platform Guide</h1>
            <p className={styles.lead}>
              Learn how to design, scale, secure, and operate LLM workloads on
              Kubernetes with production-grade GPU node pools, model serving,
              observability, GitOps, and RAG platform patterns.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/docs/intro">
                Start learning
              </Link>
              <Link className={styles.secondaryAction} to="/docs/reference-architectures">
                View architectures
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Platform reference architecture preview">
            <img
              src={productionClusterImage}
              alt="Production Kubernetes cluster architecture"
            />
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
                <small>Deep guide for production LLM infrastructure.</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
