import Link from 'next/link';
import type { LabChallenge } from '@k8sllm/lab-content';

type ChallengeOfWeekProps = {
  challenge: LabChallenge;
};

export function ChallengeOfWeek({ challenge }: ChallengeOfWeekProps) {
  const checkedSignals = challenge.steps
    .flatMap((step) => step.expectedSignals)
    .slice(0, 4);

  return (
    <section className="grid gap-4 border border-blue-200 bg-white/90 p-5 shadow-[0_26px_70px_rgba(50,108,229,0.12)] md:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.32fr)]">
      <div>
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-[#326ce5]">
          Challenge of the Week
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-tight text-slate-950 md:text-5xl">
          {challenge.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          {challenge.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[challenge.difficulty, challenge.duration, challenge.topic, challenge.persona].map((item) => (
            <span
              key={item}
              className="border border-blue-100 bg-blue-50 px-3 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-blue-900"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/challenges/${challenge.slug}`}
            className="min-h-11 border border-[#326ce5] bg-[#326ce5] px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
          >
            Start challenge
          </Link>
          <a
            href={challenge.docsHref}
            className="min-h-11 border border-blue-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5]"
          >
            Read guide
          </a>
          <Link
            href="/roadmaps/kubernetes-llm-platform"
            className="min-h-11 border border-blue-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5]"
          >
            Follow roadmap
          </Link>
        </div>
      </div>

      <aside className="grid content-start gap-3 border border-blue-100 bg-blue-50 p-4">
        <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#326ce5]">
          Signals checked
        </p>
        <ul className="m-0 grid gap-2 p-0">
          {checkedSignals.map((signal) => (
            <li
              key={signal}
              className="list-none border-l border-[#326ce5]/45 pl-3 text-sm leading-relaxed text-slate-700"
            >
              {signal}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
