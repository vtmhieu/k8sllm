import React, { useMemo, useState } from 'react';
import { challenges, labProduct, productPaths } from '@k8sllm/lab-content';

const allTopics = 'All topics';
const allDifficulties = 'All difficulty';
const allPaths = 'All paths';

export default function LabChallengeCatalog() {
  const [topic, setTopic] = useState(allTopics);
  const [difficulty, setDifficulty] = useState(allDifficulties);
  const [path, setPath] = useState(allPaths);

  const topics = useMemo(
    () => [allTopics, ...Array.from(new Set(challenges.map((challenge) => challenge.topic)))],
    [],
  );
  const difficulties = useMemo(
    () => [
      allDifficulties,
      ...Array.from(new Set(challenges.map((challenge) => challenge.difficulty))),
    ],
    [],
  );

  const visibleChallenges = useMemo(
    () =>
      challenges.filter((challenge) => {
        const topicMatch = topic === allTopics || challenge.topic === topic;
        const difficultyMatch =
          difficulty === allDifficulties || challenge.difficulty === difficulty;
        const pathMatch = path === allPaths || challenge.roadmapIds.includes(path);
        return topicMatch && difficultyMatch && pathMatch;
      }),
    [difficulty, path, topic],
  );

  const guidedChecks = challenges.reduce(
    (total, challenge) =>
      total +
      challenge.steps.reduce((stepTotal, step) => stepTotal + step.checks.length, 0),
    0,
  );

  return (
    <section className="challenge-catalog" aria-label="K8sLLM challenge catalog">
      <div className="challenge-catalog__summary">
        <div>
          <span>Interactive MVP</span>
          <strong>{challenges.length}</strong>
          <small>free browser-guided challenges</small>
        </div>
        <p>
          K8sLLM Labs is moving from static runbooks into an interactive lab product at{' '}
          <a href={labProduct.labsBaseUrl}>labs.k8sllm.online</a>. V1 uses browser-side checks,
          local progress, hints, and solution reveal tracking. Hosted sandboxes and paid lab packs
          come later after auth, abuse controls, and infrastructure cost limits are designed.
        </p>
      </div>

      <div className="challenge-catalog__filters" aria-label="Challenge filters">
        <FilterGroup label="Topic" values={topics} value={topic} onChange={setTopic} />
        <FilterGroup
          label="Difficulty"
          values={difficulties}
          value={difficulty}
          onChange={setDifficulty}
        />
        <FilterGroup
          label="Path"
          values={[allPaths, ...productPaths.map((item) => item.id)]}
          value={path}
          onChange={setPath}
          labels={{
            [allPaths]: allPaths,
            ...Object.fromEntries(productPaths.map((item) => [item.id, item.title])),
          }}
        />
        <div>
          <span>Lab signal</span>
          <button type="button" className="is-active">
            {guidedChecks} guided checks
          </button>
        </div>
      </div>

      <p className="challenge-catalog__result-count">
        Showing {visibleChallenges.length} of {challenges.length} challenges.
      </p>

      <div className="challenge-grid">
        {visibleChallenges.map((challenge) => (
          <article className="challenge-card" key={challenge.id}>
            <div className="challenge-card__meta">
              <span>{challenge.topic}</span>
              <span>{challenge.difficulty}</span>
              <span>{challenge.duration}</span>
              <span>{challenge.free ? 'Free' : 'Premium'}</span>
            </div>
            <h3>{challenge.title}</h3>
            <p>{challenge.summary}</p>
            <dl>
              <div>
                <dt>Persona</dt>
                <dd>{challenge.persona}</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>{challenge.tools.join(', ')}</dd>
              </div>
              <div>
                <dt>Checks</dt>
                <dd>
                  {challenge.steps.reduce((total, step) => total + step.checks.length, 0)}
                </dd>
              </div>
            </dl>
            <div className="challenge-card__actions">
              <a href={challenge.appHref}>Open interactive challenge</a>
              <a href={challenge.docsHref}>Read guide</a>
            </div>
          </article>
        ))}
        {visibleChallenges.length === 0 ? (
          <div className="challenge-empty" role="status">
            <span>No matching challenge</span>
            <p>
              Clear one filter or switch paths. New GPU, observability, RAG, security, and cost
              challenges can be added from the shared lab metadata file.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FilterGroup({ label, values, value, onChange, labels = {} }) {
  return (
    <div>
      <span>{label}</span>
      {values.map((item) => (
        <button
          className={item === value ? 'is-active' : ''}
          key={item}
          type="button"
          onClick={() => onChange(item)}
        >
          {labels[item] || item}
        </button>
      ))}
    </div>
  );
}
