import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChallengeRunner } from '@/components/ChallengeRunner';
import { challenges, getChallenge } from '@/lib/content';

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

  return {
    title: challenge.title,
    description: challenge.summary,
  };
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const challenge = getChallenge(params.slug);

  if (!challenge) {
    notFound();
  }

  return (
    <main className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-8 py-12">
      <header className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
            Interactive challenge
          </p>
          <h1 className="mt-4 max-w-5xl text-6xl font-black leading-[0.9] tracking-tight text-white">
            {challenge.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            {challenge.summary}
          </p>
        </div>
        <aside className="border border-white/10 bg-white/[0.045] p-5">
          <dl className="grid gap-3 text-sm">
            <InfoRow label="Difficulty" value={challenge.difficulty} />
            <InfoRow label="Duration" value={challenge.duration} />
            <InfoRow label="Persona" value={challenge.persona} />
            <InfoRow label="Tools" value={challenge.tools.join(', ')} />
          </dl>
          <a
            href={challenge.docsHref}
            className="mt-5 flex min-h-11 items-center justify-center border border-white/10 px-4 text-sm font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5"
          >
            Read matching guide
          </a>
        </aside>
      </header>

      <section className="grid gap-3 border border-white/10 bg-white/[0.045] p-5">
        <h2 className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
          Prerequisites
        </h2>
        <div className="flex flex-wrap gap-2">
          {challenge.prerequisites.map((item) => (
            <span
              key={item}
              className="border border-white/10 bg-[#101718] px-3 py-2 text-sm font-bold text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <ChallengeRunner challenge={challenge} />
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
      <dt className="font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-200">
        {label}
      </dt>
      <dd className="m-0 font-bold text-slate-200">{value}</dd>
    </div>
  );
}
