'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LabChallenge } from '@k8sllm/lab-content';
import { getChallengeProgress, loadProgress } from '@/lib/progress';
import type { ProgressStore } from '@/lib/progress';

type ChallengeCatalogClientProps = {
  challenges: LabChallenge[];
  productPaths: Array<{ id: string; title: string; summary: string }>;
};

const allTopics = 'All topics';
const allDifficulties = 'All difficulty';
const allPaths = 'All paths';

const statusTone = {
  not_started: 'border-slate-700 bg-slate-950 text-slate-400',
  in_progress: 'border-sky-400/50 bg-sky-400/10 text-sky-200',
  blocked: 'border-red-400/50 bg-red-400/10 text-red-200',
  completed: 'border-teal-300/60 bg-teal-300/10 text-teal-200',
};

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
  const pathLabels = useMemo(
    () => ({
      [allPaths]: allPaths,
      ...Object.fromEntries(productPaths.map((item) => [item.id, item.title])),
    }),
    [productPaths],
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
    <section className="border border-slate-800 bg-slate-950 text-slate-100">
      <div className="grid border-b border-slate-800 lg:grid-cols-[minmax(0,0.76fr)_minmax(560px,1fr)]">
        <div className="border-b border-slate-800 px-3 py-3 lg:border-b-0 lg:border-r">
          <p className="m-0 font-mono text-[0.68rem] font-black uppercase text-teal-200">
            Challenge catalog
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
            <h2 className="m-0 text-xl font-black leading-none tracking-tight text-white">
              Operator lab index
            </h2>
            <span className="font-mono text-[0.68rem] font-bold uppercase text-slate-500">
              {visibleChallenges.length}/{challenges.length} visible
            </span>
          </div>
        </div>

        <div className="grid gap-2 px-3 py-3">
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
            labels={pathLabels}
          />
        </div>
      </div>

      {visibleChallenges.length > 0 ? (
        <div>
          <div className="hidden grid-cols-[42px_minmax(0,1.55fr)_104px_92px_136px_minmax(170px,0.8fr)_138px] border-b border-slate-800 px-3 py-2 font-mono text-[0.65rem] font-black uppercase text-slate-500 lg:grid">
            <span>ID</span>
            <span>Challenge</span>
            <span>Difficulty</span>
            <span>Time</span>
            <span>Progress status</span>
            <span>Persona / tools</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-slate-800">
            {visibleChallenges.map((challenge, index) => {
              const challengeProgress = getChallengeProgress(progress, challenge.id);
              const pathIds = challenge.roadmapIds.join(' / ');

              return (
                <article
                  key={challenge.id}
                  className="grid gap-3 px-3 py-3 transition hover:bg-slate-900/60 lg:grid-cols-[42px_minmax(0,1.55fr)_104px_92px_136px_minmax(170px,0.8fr)_138px] lg:items-start"
                >
                  <div className="font-mono text-[0.68rem] font-black text-slate-600">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1">
                      <MetaChip>{challenge.topic}</MetaChip>
                      {pathIds ? <MetaChip>{pathIds}</MetaChip> : null}
                    </div>
                    <h3 className="mt-2 text-base font-black leading-snug text-white">
                      <Link
                        href={`/challenges/${challenge.slug}`}
                        className="outline-none hover:text-teal-200 focus-visible:text-teal-200"
                      >
                        {challenge.title}
                      </Link>
                    </h3>
                    <p className="m-0 mt-1 text-[0.8rem] leading-5 text-slate-400">{challenge.summary}</p>

                    <div className="mt-3 grid gap-1.5 border-t border-slate-800 pt-2 lg:hidden">
                      <CompactMeta label="Difficulty" value={challenge.difficulty} />
                      <CompactMeta label="Time" value={challenge.duration} />
                      <CompactMeta
                        label="Progress status"
                        value={formatStatus(challengeProgress.status)}
                        valueClassName={statusTone[challengeProgress.status]}
                      />
                    </div>
                  </div>

                  <MetadataColumn label="Difficulty" value={challenge.difficulty} />
                  <MetadataColumn label="Time" value={challenge.duration} />
                  <MetadataColumn
                    label="Progress status"
                    value={formatStatus(challengeProgress.status)}
                    valueClassName={statusTone[challengeProgress.status]}
                  />

                  <div className="hidden min-w-0 text-[0.76rem] leading-5 text-slate-300 lg:block">
                    <p className="m-0 truncate font-bold text-slate-200">{challenge.persona}</p>
                    <p className="m-0 truncate font-mono text-[0.68rem] uppercase text-slate-500">
                      {challenge.tools.join(' + ')}
                    </p>
                  </div>

                  <div className="flex gap-1.5 lg:justify-end">
                    <Link
                      href={`/challenges/${challenge.slug}`}
                      className="border border-teal-300 bg-teal-300 px-2.5 py-1.5 font-mono text-[0.68rem] font-black uppercase text-slate-950 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-teal-200"
                    >
                      Open lab
                    </Link>
                    <a
                      href={challenge.docsHref}
                      className="border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-[0.68rem] font-black uppercase text-slate-300 outline-none transition hover:border-white/20 hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-200"
                    >
                      Docs
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border-t border-dashed border-slate-800 px-3 py-8">
          <h3 className="m-0 font-mono text-sm font-black uppercase text-white">No matching challenge</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Clear a filter or switch product paths to restore the indexed challenge view.
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
    <div className="grid gap-1 sm:grid-cols-[88px_1fr] sm:items-start">
      <span className="font-mono text-[0.65rem] font-black uppercase leading-7 text-slate-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {values.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={
              item === value
                ? 'border border-teal-300 bg-teal-300 px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-teal-200'
                : 'border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-[0.68rem] font-bold uppercase text-slate-400 outline-none transition hover:border-white/20 hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-200'
            }
          >
            {labels[item] || item}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetadataColumn({
  label,
  value,
  valueClassName = 'border-slate-800 bg-slate-950 text-slate-200',
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="hidden lg:block">
      <span className="sr-only">{label}</span>
      <span
        className={`inline-flex border px-2 py-1 font-mono text-[0.68rem] font-black uppercase ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function CompactMeta({
  label,
  value,
  valueClassName = 'border-slate-800 bg-slate-950 text-slate-200',
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[132px_1fr] items-center gap-2">
      <span className="font-mono text-[0.65rem] font-black uppercase text-slate-500">{label}</span>
      <span
        className={`w-fit border px-2 py-1 font-mono text-[0.68rem] font-black uppercase ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-slate-800 bg-slate-950 px-1.5 py-0.5 font-mono text-[0.62rem] font-black uppercase text-slate-400">
      {children}
    </span>
  );
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ');
}
