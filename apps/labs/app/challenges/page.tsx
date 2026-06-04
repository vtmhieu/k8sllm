import { ChallengeCatalogClient } from '@/components/ChallengeCatalogClient';
import { challenges, productPaths } from '@/lib/content';

export const metadata = {
  title: 'K8sLLM Challenges',
  description:
    'Interactive Kubernetes LLM challenges with guided checks, hints, progress, and production-oriented validation tasks.',
};

export default function ChallengesPage() {
  return (
    <main className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-8 py-12">
      <header className="max-w-4xl">
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
          Challenge catalog
        </p>
        <h1 className="mt-4 text-6xl font-black leading-[0.9] tracking-tight text-white">
          Kubernetes LLM challenges with evidence-based checks.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
          Start with free guided labs. Each challenge has objectives, commands, expected signals,
          paste-output validation, progressive hints, and a final readiness check.
        </p>
      </header>
      <ChallengeCatalogClient challenges={challenges} productPaths={productPaths} />
    </main>
  );
}
