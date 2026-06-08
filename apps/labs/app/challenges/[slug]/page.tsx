import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChallengeRunner } from '@/components/ChallengeRunner';
import { JsonLd } from '@/components/JsonLd';
import { challenges, getChallenge, getNextChallenge } from '@/lib/content';
import { createPageMetadata } from '@/lib/seo';
import { challengeBreadcrumbJsonLd, challengeJsonLd } from '@/lib/structured-data';

type ChallengePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return challenges.map((challenge) => ({ slug: challenge.slug }));
}

export function generateMetadata({ params }: ChallengePageProps): Metadata {
  const challenge = getChallenge(params.slug);

  if (!challenge) {
    return {
      title: 'Challenge not found',
    };
  }

  return createPageMetadata({
    title: challenge.title,
    description: challenge.summary,
    path: `/challenges/${challenge.slug}`,
  });
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const challenge = getChallenge(params.slug);

  if (!challenge) {
    notFound();
  }

  const nextChallenge = getNextChallenge(challenge.id);

  return (
    <main className="mx-auto grid w-[min(1480px,calc(100%-24px))] gap-4 py-6 md:w-[min(1480px,calc(100%-32px))]">
      <JsonLd data={[challengeJsonLd(challenge), challengeBreadcrumbJsonLd(challenge)]} />
      <header className="grid gap-4 border border-blue-100 bg-white/90 p-5 shadow-[0_22px_62px_rgba(50,108,229,0.1)] lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#326ce5]">
            Interactive challenge
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-none tracking-tight text-slate-950 md:text-5xl">
            {challenge.title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600">
            {challenge.summary}
          </p>
        </div>
        <a
          href={challenge.docsHref}
          className="inline-flex min-h-10 items-center justify-center border border-blue-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5]"
        >
          Read matching guide
        </a>
      </header>

      <section className="grid gap-px border border-blue-100 bg-blue-100 md:grid-cols-4">
        <InfoCell label="Difficulty" value={challenge.difficulty} />
        <InfoCell label="Duration" value={challenge.duration} />
        <InfoCell label="Persona" value={challenge.persona} />
        <InfoCell label="Tools" value={challenge.tools.join(', ')} />
        <div className="bg-white/90 p-4 md:col-span-4">
          <p className="m-0 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#326ce5]">
            Prerequisites
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {challenge.prerequisites.map((item) => (
              <span
                key={item}
                className="border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-900"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ChallengeRunner challenge={challenge} nextChallenge={nextChallenge} />
    </main>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/90 p-4">
      <p className="m-0 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#326ce5]">
        {label}
      </p>
      <p className="m-0 mt-2 truncate text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
