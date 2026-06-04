import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './video.module.css';

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

export default function VideoPage() {
  const video = useBaseUrl('/videos/k8sllm-architecture.mp4');
  const poster = useBaseUrl('/img/video/k8sllm-architecture-poster.png');
  const captions = useBaseUrl('/videos/k8sllm-architecture.vtt');
  const canonical = 'https://www.k8sllm.online/video';
  const videoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'K8sLLM Architecture Explainer',
    description:
      'A 100-second architecture explainer for Kubernetes LLM infrastructure, covering GPU node pools, model serving, RAG, observability, GitOps, and production operations.',
    thumbnailUrl: ['https://www.k8sllm.online/img/video/k8sllm-architecture-poster.png'],
    uploadDate: '2026-06-04',
    duration: 'PT1M40S',
    contentUrl: 'https://www.k8sllm.online/videos/k8sllm-architecture.mp4',
    embedUrl: canonical,
    inLanguage: 'en',
  };

  return (
    <Layout
      title="K8sLLM Architecture Video"
      description="Watch a 100-second Kubernetes LLM architecture explainer covering GPU node pools, model serving, RAG, observability, GitOps, cost, and reliability."
    >
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content="https://www.k8sllm.online/videos/k8sllm-architecture.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <script type="application/ld+json">{JSON.stringify(videoStructuredData)}</script>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Kubernetes LLM architecture video</p>
            <h1>K8sLLM Architecture Explainer</h1>
            <p>
              A code-generated Remotion demo for platform engineers, DevOps
              engineers, MLOps engineers, and AI infrastructure learners. It
              shows how to design, scale, secure, and operate LLM workloads on
              Kubernetes.
            </p>
            <div className={styles.actions}>
              <Link to="/docs/k8s-llm">Read the K8s LLM guide</Link>
              <Link to="/docs/reference-architectures">Open architectures</Link>
            </div>
          </div>
          <div className={styles.videoShell}>
            <video
              controls
              playsInline
              preload="metadata"
              poster={poster}
              aria-label="Kubernetes and LLM platform architecture explainer video"
            >
              <source src={video} type="video/mp4" />
              <track src={captions} kind="captions" srcLang="en" label="English" default />
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
      </main>
    </Layout>
  );
}
