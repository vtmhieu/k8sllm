import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';

const challenges = [
  {
    id: 'vllm-inference',
    title: 'vLLM Inference Challenge',
    href: '/docs/labs/vllm-inference-lab',
    topic: 'Model serving',
    difficulty: 'Hard',
    time: '75 min',
    environment: 'GPU Kubernetes cluster',
    prerequisite: 'GPU scheduling basics',
    summary:
      'Deploy a GPU-backed OpenAI-compatible endpoint and prove scheduling, health, TTFT, queueing, and rollback readiness.',
  },
  {
    id: 'rag-retrieval',
    title: 'RAG Retrieval Challenge',
    href: '/docs/labs/rag-retrieval-lab',
    topic: 'RAG',
    difficulty: 'Medium',
    time: '60 min',
    environment: 'Kubernetes namespace',
    prerequisite: 'Basic retrieval pipeline',
    summary:
      'Operate ingestion, metadata filters, vector retrieval, answer evaluation, and failure drills for production RAG.',
  },
  {
    id: 'production-readiness',
    title: 'Production Readiness Challenge',
    href: '/docs/labs/production-readiness-lab',
    topic: 'Production',
    difficulty: 'Hard',
    time: '50 min',
    environment: 'Existing LLM workload',
    prerequisite: 'RBAC, rollout, telemetry',
    summary:
      'Run a launch review across security, quota, rollout, observability, cost, and ownership before live traffic.',
  },
  {
    id: 'observability',
    title: 'LLM Observability Challenge',
    href: '/docs/labs/observability-lab',
    topic: 'Observability',
    difficulty: 'Medium',
    time: '45 min',
    environment: 'Metrics and logs stack',
    prerequisite: 'Prometheus or equivalent',
    summary:
      'Build the signal model needed to debug user latency, runtime saturation, GPU pressure, traces, logs, and alerts.',
  },
];

const topics = ['All topics', ...Array.from(new Set(challenges.map((challenge) => challenge.topic)))];
const difficulties = ['All difficulty', 'Medium', 'Hard'];
const statusLabels = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
};
const nextStatus = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
};

export default function LabChallengeCatalog() {
  const [topic, setTopic] = useState('All topics');
  const [difficulty, setDifficulty] = useState('All difficulty');
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('k8sllm.labProgress');
      setProgress(raw ? JSON.parse(raw) : {});
    } catch {
      setProgress({});
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('k8sllm.labProgress', JSON.stringify(progress));
    } catch {
      // Progress is an enhancement. The catalog works without localStorage.
    }
  }, [progress]);

  const visibleChallenges = useMemo(
    () =>
      challenges.filter((challenge) => {
        const topicMatch = topic === 'All topics' || challenge.topic === topic;
        const difficultyMatch =
          difficulty === 'All difficulty' || challenge.difficulty === difficulty;
        return topicMatch && difficultyMatch;
      }),
    [topic, difficulty],
  );

  const completedCount = challenges.filter(
    (challenge) => progress[challenge.id] === 'completed',
  ).length;

  const updateProgress = (challengeId) => {
    setProgress((current) => {
      const currentStatus = current[challengeId] || 'not_started';
      return {
        ...current,
        [challengeId]: nextStatus[currentStatus],
      };
    });
  };

  return (
    <section className="challenge-catalog" aria-label="K8sLLM challenge catalog">
      <div className="challenge-catalog__summary">
        <div>
          <span>Roadmap progress</span>
          <strong>
            {completedCount}/{challenges.length}
          </strong>
          <small>completed in this browser</small>
        </div>
        <p>
          Choose a challenge, run it in your own cluster, then mark progress
          locally. This version is static, private to your browser, and ready
          for teams that want practice before hosted sandboxes exist.
        </p>
      </div>

      <div className="challenge-catalog__filters" aria-label="Challenge filters">
        <div>
          <span>Topic</span>
          {topics.map((item) => (
            <button
              className={item === topic ? 'is-active' : ''}
              key={item}
              type="button"
              onClick={() => setTopic(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div>
          <span>Difficulty</span>
          {difficulties.map((item) => (
            <button
              className={item === difficulty ? 'is-active' : ''}
              key={item}
              type="button"
              onClick={() => setDifficulty(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="challenge-catalog__result-count">
        Showing {visibleChallenges.length} of {challenges.length} challenges.
      </p>

      <div className="challenge-grid">
        {visibleChallenges.map((challenge) => {
          const status = progress[challenge.id] || 'not_started';
          return (
            <article className="challenge-card" key={challenge.id}>
              <div className="challenge-card__meta">
                <span>{challenge.topic}</span>
                <span>{challenge.difficulty}</span>
              </div>
              <h3>{challenge.title}</h3>
              <p>{challenge.summary}</p>
              <dl>
                <div>
                  <dt>Time</dt>
                  <dd>{challenge.time}</dd>
                </div>
                <div>
                  <dt>Environment</dt>
                  <dd>{challenge.environment}</dd>
                </div>
                <div>
                  <dt>Prerequisite</dt>
                  <dd>{challenge.prerequisite}</dd>
                </div>
              </dl>
              <div className="challenge-card__actions">
                <Link to={challenge.href}>Start challenge</Link>
                <button type="button" onClick={() => updateProgress(challenge.id)}>
                  {statusLabels[status]}
                </button>
              </div>
            </article>
          );
        })}
        {visibleChallenges.length === 0 ? (
          <div className="challenge-empty" role="status">
            <span>No matching challenge</span>
            <p>
              Clear one filter or switch difficulty. New GPU, observability,
              and RAG drills will be added as the lab track expands.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
