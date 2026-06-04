'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LabChallenge } from '@k8sllm/lab-content';
import { getChallengeProgress, loadProgress, ProgressStore } from '@/lib/progress';

type ChallengeCatalogClientProps = {
  challenges: LabChallenge[];
  productPaths: Array<{ id: string; title: string; summary: string }>;
};

const allTopics = 'All topics';
const allDifficulties = 'All difficulty';
const allPaths = 'All paths';

export function ChallengeCatalogClient({ challenges, productPaths }: ChallengeCatalogClientProps) {
  const [topic, setTopic] = useState(allTopics);
  const [difficulty, setDifficulty] = useState(allDifficulties);
  const [path, setPath] = useState(allPaths);
  const [progress, setProgress] = useState<ProgressStore>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const topics = useMemo(
    () => [allTopics, ...Array.from(new Set(challenges.map((challenge) => challenge.topic)))],
    [challenges],
  );
  const difficulties = useMemo(
    () => [allDifficulties, ...Array.from(new Set(challenges.map((challenge) => challenge.difficulty)))],
    [challenges],
  );

  const visibleChallenges = useMemo(
    () =>
      challenges.filter((challenge) => {
        const topicMatch = topic === allTopics || challenge.topic === topic;
        const difficultyMatch = difficulty === allDifficulties || challenge.difficulty === difficulty;
        const pathMatch = path === allPaths || challenge.roadmapIds.includes(path);
        return topicMatch && difficultyMatch && pathMatch;
      }),
    [challenges, difficulty, path, topic],
  );

  return (
    <section className="grid gap-6">
      <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[0.8fr_1fr]">
        <div className="bg-[#111816]/88 p-5">
          <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
            Challenge catalog
          </span>
          <h2 className="mt-3 text-3xl font-black leading-none tracking-tight text-white">
            Guided checks for Kubernetes LLM operators.
          </h2>
        </div>
        <div className="grid gap-4 bg-[#111816]/88 p-5">
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
        </div>
      </div>

      <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
        Showing {visibleChallenges.length} of {challenges.length} challenges
      </p>

      {visibleChallenges.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {visibleChallenges.map((challenge) => {
            const challengeProgress = getChallengeProgress(progress, challenge.id);
            return (
              <article
                key={challenge.id}
                className="grid min-h-[360px] gap-5 border border-white/10 bg-white/[0.045] p-5 transition hover:border-teal-200/35 hover:bg-white/[0.07]"
              >
                <div className="flex flex-wrap gap-2">
                  <MetaPill>{challenge.topic}</MetaPill>
                  <MetaPill>{challenge.difficulty}</MetaPill>
                  <MetaPill>{challenge.duration}</MetaPill>
                  <MetaPill>{challenge.free ? 'Free' : 'Premium'}</MetaPill>
                </div>
                <div>
                  <h3 className="m-0 text-2xl font-black leading-none tracking-tight text-white">
                    {challenge.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{challenge.summary}</p>
                </div>
                <dl className="grid gap-3 border-t border-white/10 pt-4 text-sm">
                  <InfoRow label="Persona" value={challenge.persona} />
                  <InfoRow label="Tools" value={challenge.tools.join(', ')} />
                  <InfoRow label="Progress" value={challengeProgress.status.replace('_', ' ')} />
                </dl>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    href={`/challenges/${challenge.slug}`}
                    className="min-h-11 border border-teal-200/40 bg-teal-200 px-4 py-3 text-sm font-black text-[#111816] transition hover:bg-white"
                  >
                    Start challenge
                  </Link>
                  <a
                    href={challenge.docsHref}
                    className="min-h-11 border border-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/5"
                  >
                    Read guide
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="border border-dashed border-white/20 bg-white/[0.035] p-8">
          <h3 className="m-0 text-2xl font-black text-white">No matching challenge</h3>
          <p className="mt-3 max-w-2xl text-slate-300">
            Clear one filter or switch paths. The catalog is designed to grow weekly without changing
            the app model.
          </p>
        </div>
      )}
    </section>
  );
}

function FilterGroup({
  label,
  values,
  value,
  onChange,
  labels = {},
}: {
  label: string;
  values: string[];
  value: string;
  onChange: (value: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="grid gap-2">
      <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={
              item === value
                ? 'border border-teal-200 bg-teal-200 px-3 py-2 text-xs font-black text-[#111816]'
                : 'border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-teal-200/40 hover:text-white'
            }
          >
            {labels[item] || item}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-teal-200/20 bg-teal-200/[0.08] px-2.5 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-100">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-200">
        {label}
      </dt>
      <dd className="m-0 font-bold text-slate-200">{value}</dd>
    </div>
  );
}
