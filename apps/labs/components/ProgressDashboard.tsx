'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LabChallenge } from '@k8sllm/lab-content';
import {
  getChallengeProgress,
  loadProgress,
  ProgressStore,
  saveProgress,
} from '@/lib/progress';

type ProgressDashboardProps = {
  challenges: LabChallenge[];
};

const statusOrder = ['completed', 'in_progress', 'blocked', 'not_started'] as const;

export function ProgressDashboard({ challenges }: ProgressDashboardProps) {
  const [progress, setProgress] = useState<ProgressStore>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const rows = useMemo(
    () =>
      challenges
        .map((challenge) => ({
          challenge,
          progress: getChallengeProgress(progress, challenge.id),
        }))
        .sort(
          (left, right) =>
            statusOrder.indexOf(left.progress.status) - statusOrder.indexOf(right.progress.status),
        ),
    [challenges, progress],
  );

  const completed = rows.filter((row) => row.progress.status === 'completed').length;
  const inProgress = rows.filter((row) => row.progress.status === 'in_progress').length;
  const blocked = rows.filter((row) => row.progress.status === 'blocked').length;
  const percent = rows.length > 0 ? Math.round((completed / rows.length) * 100) : 0;

  const resetProgress = () => {
    saveProgress({});
    setProgress({});
  };

  return (
    <section className="grid gap-8">
      <div className="grid gap-px border border-blue-100 bg-blue-100 lg:grid-cols-4">
        <ProgressMetric label="Overall" value={`${percent}%`} />
        <ProgressMetric label="Completed" value={String(completed)} />
        <ProgressMetric label="In progress" value={String(inProgress)} />
        <ProgressMetric label="Blocked" value={String(blocked)} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border border-blue-100 bg-white/90 p-5">
        <div>
          <h2 className="m-0 text-3xl font-black leading-none tracking-tight text-slate-950">
            Private device progress
          </h2>
          <p className="m-0 mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Your challenge status, completed steps, and blocked work stay on this device. Use reset
            when you want to restart the lab track.
          </p>
        </div>
        <button
          type="button"
          onClick={resetProgress}
          className="min-h-11 border border-blue-100 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
        >
          Reset progress
        </button>
      </div>

      <div className="grid gap-3">
        {rows.map(({ challenge, progress: challengeProgress }) => {
          const completedSteps = challengeProgress.completedSteps.length;
          const totalSteps = challenge.steps.length;
          const stepPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

          return (
            <Link
              key={challenge.id}
              href={`/challenges/${challenge.slug}`}
              className="grid gap-4 border border-blue-100 bg-white/90 p-4 transition hover:border-[#326ce5] hover:bg-blue-50 md:grid-cols-[1fr_220px]"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill status={challengeProgress.status} />
                  <span className="border border-blue-100 bg-blue-50 px-2 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-blue-800">
                    {challenge.topic}
                  </span>
                  <span className="border border-blue-100 bg-blue-50 px-2 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-slate-600">
                    {challenge.duration}
                  </span>
                </div>
                <h3 className="m-0 mt-3 text-2xl font-black leading-none tracking-tight text-slate-950">
                  {challenge.title}
                </h3>
                <p className="m-0 mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {challenge.summary}
                </p>
              </div>
              <div className="self-center">
                <div className="mb-2 flex justify-between font-mono text-xs font-black uppercase tracking-[0.08em] text-[#326ce5]">
                  <span>Steps</span>
                  <span>
                    {completedSteps}/{totalSteps}
                  </span>
                </div>
                <div className="h-2 bg-blue-50">
                  <div className="h-full bg-[#326ce5]" style={{ width: `${stepPercent}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ProgressMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/90 p-5">
      <span className="font-mono text-[0.7rem] font-black uppercase tracking-[0.08em] text-[#326ce5]">
        {label}
      </span>
      <strong className="mt-2 block font-mono text-4xl leading-none text-slate-950">{value}</strong>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'completed'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : status === 'blocked'
        ? 'border-amber-200 bg-amber-50 text-amber-800'
        : 'border-blue-100 bg-blue-50 text-slate-700';

  return (
    <span
      className={`border px-2 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] ${tone}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
