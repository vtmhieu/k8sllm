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
  not_started: 'border-slate-200 bg-white text-slate-500',
  in_progress: 'border-blue-200 bg-blue-50 text-blue-800',
  blocked: 'border-amber-200 bg-amber-50 text-amber-800',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
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
    <section className="border border-blue-100 bg-white/90 text-slate-950 shadow-[0_24px_70px_rgba(50,108,229,0.1)]">
      <div className="grid border-b border-blue-100 lg:grid-cols-[minmax(0,0.76fr)_minmax(560px,1fr)]">
        <div className="border-b border-blue-100 px-3 py-3 lg:border-b-0 lg:border-r">
          <p className="m-0 font-mono text-[0.68rem] font-black uppercase text-[#326ce5]">
            Challenge catalog
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
            <h2 className="m-0 text-xl font-black leading-none tracking-tight text-slate-950">
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
          <div className="hidden grid-cols-[42px_minmax(0,1.55fr)_104px_92px_136px_minmax(170px,0.8fr)_138px] border-b border-blue-100 bg-blue-50/60 px-3 py-2 font-mono text-[0.65rem] font-black uppercase text-slate-500 lg:grid">
            <span>ID</span>
            <span>Challenge</span>
            <span>Difficulty</span>
            <span>Time</span>
            <span>Progress status</span>
            <span>Persona / tools</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-blue-100">
            {visibleChallenges.map((challenge, index) => {
              const challengeProgress = getChallengeProgress(progress, challenge.id);
              const pathIds = challenge.roadmapIds.join(' / ');

              return (
                <article
                  key={challenge.id}
                  className="grid gap-3 px-3 py-3 transition hover:bg-blue-50/65 lg:grid-cols-[42px_minmax(0,1.55fr)_104px_92px_136px_minmax(170px,0.8fr)_138px] lg:items-start"
                >
                  <div className="font-mono text-[0.68rem] font-black text-blue-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1">
                      <MetaChip>{challenge.topic}</MetaChip>
                      {pathIds ? <MetaChip>{pathIds}</MetaChip> : null}
                    </div>
                    <h3 className="mt-2 text-base font-black leading-snug text-slate-950">
                      <Link
                        href={`/challenges/${challenge.slug}`}
                        className="outline-none hover:text-[#326ce5] focus-visible:text-[#326ce5]"
                      >
                        {challenge.title}
                      </Link>
                    </h3>
                    <p className="m-0 mt-1 text-[0.8rem] leading-5 text-slate-600">{challenge.summary}</p>

                    <div className="mt-3 grid gap-1.5 border-t border-blue-100 pt-2 lg:hidden">
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

                  <div className="hidden min-w-0 text-[0.76rem] leading-5 text-slate-700 lg:block">
                    <p className="m-0 truncate font-bold text-slate-800">{challenge.persona}</p>
                    <p className="m-0 truncate font-mono text-[0.68rem] uppercase text-slate-500">
                      {challenge.tools.join(' + ')}
                    </p>
                  </div>

                  <div className="flex gap-1.5 lg:justify-end">
                    <Link
                      href={`/challenges/${challenge.slug}`}
                      className="border border-[#326ce5] bg-[#326ce5] px-2.5 py-1.5 font-mono text-[0.68rem] font-black uppercase text-white outline-none transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                      Open lab
                    </Link>
                    <a
                      href={challenge.docsHref}
                      className="border border-blue-200 bg-white px-2.5 py-1.5 font-mono text-[0.68rem] font-black uppercase text-slate-700 outline-none transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5] focus-visible:ring-2 focus-visible:ring-blue-300"
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
        <div className="border-t border-dashed border-blue-100 px-3 py-8">
          <h3 className="m-0 font-mono text-sm font-black uppercase text-slate-950">No matching challenge</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
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
                ? 'border border-[#326ce5] bg-[#326ce5] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-300'
                : 'border border-blue-100 bg-white px-2 py-1 font-mono text-[0.68rem] font-bold uppercase text-slate-600 outline-none transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5] focus-visible:ring-2 focus-visible:ring-blue-300'
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
  valueClassName = 'border-blue-100 bg-blue-50 text-slate-700',
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
  valueClassName = 'border-blue-100 bg-blue-50 text-slate-700',
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
    <span className="border border-blue-100 bg-blue-50 px-1.5 py-0.5 font-mono text-[0.62rem] font-black uppercase text-blue-800">
      {children}
    </span>
  );
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ');
}
