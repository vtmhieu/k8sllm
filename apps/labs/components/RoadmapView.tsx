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
      <div className="grid gap-px border border-blue-100 bg-blue-100 lg:grid-cols-[0.6fr_1fr]">
        <div className="bg-white/90 p-6">
          <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#326ce5]">
            Roadmap progress
          </p>
          <strong className="mt-3 block font-mono text-5xl text-slate-950">{percent}%</strong>
          <p className="mt-3 text-sm font-bold text-slate-600">
            {completedChallenges} of {totalChallenges} challenges completed on this device
          </p>
        </div>
        <div className="bg-white/90 p-6">
          <h1 className="m-0 max-w-3xl text-5xl font-black leading-none tracking-tight text-slate-950">
            {roadmap.title}
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600">{roadmap.summary}</p>
          <div className="mt-6 h-2 bg-blue-50">
            <div className="h-full bg-[#326ce5]" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {modules.map((module, moduleIndex) => (
          <article key={module.title} className="border border-blue-100 bg-white/90 p-5 shadow-[0_18px_55px_rgba(50,108,229,0.08)]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-[#326ce5]">
                  Module {String(moduleIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-2 text-3xl font-black leading-none tracking-tight text-slate-950">
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
                    className="grid min-h-48 gap-4 border border-blue-100 bg-blue-50/70 p-4 transition hover:border-[#326ce5] hover:bg-white"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-blue-200 bg-white px-2 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.08em] text-blue-800">
                        {challenge.difficulty}
                      </span>
                      <span className="border border-blue-100 bg-white px-2 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.08em] text-slate-600">
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <strong className="text-xl leading-none text-slate-950">{challenge.title}</strong>
                    <small className="text-sm leading-relaxed text-slate-600">{challenge.summary}</small>
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
