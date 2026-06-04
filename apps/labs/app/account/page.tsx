import Link from 'next/link';
import { PremiumWaitlist } from '@/components/PremiumWaitlist';

export const metadata = {
  title: 'Early Access',
  description:
    'K8sLLM Labs early access for advanced Kubernetes LLM lab packs, downloadable kits, and review worksheets.',
};

export default function AccountPage() {
  return (
    <main className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-8 py-12">
      <header>
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
          Early access
        </p>
        <h1 className="mt-4 max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-white">
          Free challenges now. Advanced platform labs next.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
          K8sLLM starts with guided public challenges. The next product layer is deeper lab packs:
          advanced checks, downloadable manifests, full solution reviews, and architecture worksheets
          for production AI infrastructure teams.
        </p>
      </header>

      <section className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
        <AccountPhase
          title="Free"
          body="Guided checks, private device progress, hints, and production-focused readiness tasks."
        />
        <AccountPhase
          title="Pro"
          body="Downloadable kits, advanced scenarios, complete solutions, and architecture review worksheets."
        />
        <AccountPhase
          title="Hosted"
          body="Managed lab environments come after account, security, quota, and sandbox lifecycle controls."
        />
      </section>

      <PremiumWaitlist />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/challenges"
          className="min-h-12 border border-teal-200/40 bg-teal-200 px-5 py-3 font-black text-[#111816] transition hover:bg-white"
        >
          Browse free challenges
        </Link>
        <a
          href="https://www.k8sllm.online/docs/labs"
          className="min-h-12 border border-white/10 px-5 py-3 font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5"
        >
          Read public docs
        </a>
      </div>
    </main>
  );
}

function AccountPhase({ title, body }: { title: string; body: string }) {
  return (
    <article className="bg-[#111816]/88 p-5">
      <h2 className="m-0 font-mono text-3xl font-black text-white">{title}</h2>
      <p className="m-0 mt-3 text-sm leading-relaxed text-slate-300">{body}</p>
    </article>
  );
}
