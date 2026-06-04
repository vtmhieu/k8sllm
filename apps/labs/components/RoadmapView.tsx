'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { LabChallenge, LabRoadmap } from '@k8sllm/lab-content';
import { getChallengeProgress, loadProgress, ProgressStore } from '@/lib/progress';

type RoadmapModule = {
  title: string;
  challenges: LabChallenge[];
};

type RoadmapViewProps = {
  roadmap: LabRoadmap;
  modules: RoadmapModule[];
};

export function RoadmapView({ roadmap, modules }: RoadmapViewProps) {
  const [progress, setProgress] = useState<ProgressStore>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const totalChallenges = modules.reduce((count, module) => count + module.challenges.length, 0);
  const completedChallenges = useMemo(
    () =>
      modules
        .flatMap((module) => module.challenges)
        .filter((challenge) => getChallengeProgress(progress, challenge.id).status === 'completed').length,
    [modules, progress],
  );
  const percent = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  return (
    <section className="grid gap-8">
      <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[0.6fr_1fr]">
        <div className="bg-[#111816]/88 p-6">
          <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
            Roadmap progress
          </p>
          <strong className="mt-3 block font-mono text-5xl text-white">{percent}%</strong>
          <p className="mt-3 text-sm font-bold text-slate-300">
            {completedChallenges} of {totalChallenges} challenges completed in this browser
          </p>
        </div>
        <div className="bg-[#111816]/88 p-6">
          <h1 className="m-0 max-w-3xl text-5xl font-black leading-none tracking-tight text-white">
            {roadmap.title}
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">{roadmap.summary}</p>
          <div className="mt-6 h-2 bg-white/10">
            <div className="h-full bg-teal-200" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {modules.map((module, moduleIndex) => (
          <article key={module.title} className="border border-white/10 bg-white/[0.045] p-5">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
                  Module {String(moduleIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-2 text-3xl font-black leading-none tracking-tight text-white">
                  {module.title}
                </h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {module.challenges.map((challenge) => {
                const status = getChallengeProgress(progress, challenge.id).status;
                return (
                  <Link
                    key={challenge.id}
                    href={`/challenges/${challenge.slug}`}
                    className="grid min-h-48 gap-4 border border-white/10 bg-[#101718] p-4 transition hover:border-teal-200/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-teal-200/20 px-2 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.08em] text-teal-200">
                        {challenge.difficulty}
                      </span>
                      <span className="border border-white/10 px-2 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.08em] text-slate-300">
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <strong className="text-xl leading-none text-white">{challenge.title}</strong>
                    <small className="text-sm leading-relaxed text-slate-400">{challenge.summary}</small>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
