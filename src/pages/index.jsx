import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const tracks = [
  {
    label: 'Kubernetes Core',
    href: '/docs/kubernetes',
    detail: 'Control plane, workloads, scheduling, networking, storage.',
  },
  {
    label: 'Production Baseline',
    href: '/docs/best-practices',
    detail: 'Scale, security, observability, backup, disaster recovery.',
  },
  {
    label: 'LLM Infrastructure',
    href: '/docs/llm-on-kubernetes',
    detail: 'GPU pools, model serving, RAG, inference economics.',
  },
];

const signals = [
  'Design for failure domains before tuning replicas.',
  'Prefer explicit platform contracts over tool sprawl.',
  'Treat LLM serving as a latency and capacity problem, not only a model problem.',
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
      description="A senior platform engineering guide for Kubernetes, production services, and LLM workloads."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Senior platform engineering guide</p>
            <h1>Kubernetes + LLM Platform Guide</h1>
            <p className={styles.lead}>
              Knowledge base thực chiến cho platform engineers: Kubernetes production,
              security, observability, GitOps, và LLM workloads trên GPU clusters.
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
            <h2>Đi từ cluster primitives tới AI inference platform.</h2>
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
            <h2>Không học từng tool rời rạc.</h2>
            <p>
              Mỗi guide nối kỹ thuật với quyết định vận hành: khi nào dùng service đó,
              failure mode chính là gì, metric nào chứng minh hệ thống đang khỏe,
              và tradeoff nào ảnh hưởng trực tiếp tới latency, cost, hoặc security.
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
      </main>
    </Layout>
  );
}
