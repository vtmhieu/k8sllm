import Link from 'next/link';
import { challenges, roadmaps } from '@/lib/content';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'K8sLLM Lab Roadmaps',
  description:
    'Kubernetes LLM learning roadmaps for vLLM production serving, RAG platform engineering, observability, cost, and production readiness.',
  path: '/roadmaps',
});

export default function RoadmapsIndexPage() {
  return (
    <main className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-8 py-12">
      <header className="max-w-4xl">
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-[#326ce5]">
          Lab roadmaps
        </p>
        <h1 className="mt-4 text-6xl font-black leading-[0.9] tracking-tight text-slate-950">
          Learn Kubernetes LLM platforms as connected paths.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
          Roadmaps group free challenges into a production progression: cluster foundations,
          GPU serving, RAG quality, observability, cost, and readiness checks.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        {roadmaps.map((roadmap) => {
          const roadmapChallengeIds = roadmap.modules.flatMap((module) => module.challengeIds);
          const roadmapChallenges = roadmapChallengeIds
            .map((challengeId) => challenges.find((challenge) => challenge.id === challengeId))
            .filter(Boolean);

          return (
            <article key={roadmap.id} className="border border-blue-100 bg-white/90 p-5 shadow-[0_22px_62px_rgba(50,108,229,0.1)]">
              <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#326ce5]">
                {roadmap.modules.length} modules · {roadmapChallenges.length} challenges
              </p>
              <h2 className="mt-3 text-3xl font-black leading-none tracking-tight text-slate-950">
                {roadmap.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{roadmap.summary}</p>
              <div className="mt-5 grid gap-2">
                {roadmap.modules.map((module) => (
                  <div key={module.title} className="border border-blue-100 bg-blue-50 p-3">
                    <strong className="block text-sm text-slate-800">{module.title}</strong>
                    <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-slate-500">
                      {module.challengeIds.length} challenges
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/roadmaps/${roadmap.slug}`}
                className="mt-6 inline-flex min-h-11 items-center border border-[#326ce5] bg-[#326ce5] px-4 text-sm font-black text-white transition hover:bg-blue-700"
              >
                Open roadmap
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
