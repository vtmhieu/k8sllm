import { ChallengeOfWeek } from '@/components/ChallengeOfWeek';
import { ChallengeCatalogClient } from '@/components/ChallengeCatalogClient';
import { JsonLd } from '@/components/JsonLd';
import { challenges, productPaths } from '@/lib/content';
import { createPageMetadata } from '@/lib/seo';
import { challengeCatalogJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: 'K8sLLM Challenges',
  description:
    'Interactive Kubernetes LLM challenges with guided checks, hints, progress, and production-oriented validation tasks.',
  path: '/challenges',
});

export default function ChallengesPage() {
  const challengeOfWeek =
    challenges.find((challenge) => challenge.slug === 'vllm-inference') || challenges[0];

  return (
    <main className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-8 py-12">
      <JsonLd data={challengeCatalogJsonLd(challenges)} />
      <header className="max-w-4xl">
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-[#326ce5]">
          Challenge catalog
        </p>
        <h1 className="mt-4 text-6xl font-black leading-[0.9] tracking-tight text-slate-950">
          Kubernetes LLM challenges with evidence-based checks.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
          Start with free guided labs. Each challenge has objectives, commands, expected signals,
          paste-output validation, progressive hints, and a final readiness check.
        </p>
      </header>
      <ChallengeOfWeek challenge={challengeOfWeek} />
      <ChallengeCatalogClient challenges={challenges} productPaths={productPaths} />
    </main>
  );
}
