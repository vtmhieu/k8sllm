import Link from 'next/link';
import { PremiumWaitlist } from '@/components/PremiumWaitlist';

export const metadata = {
  title: 'Account',
  description:
    'K8sLLM Labs account placeholder for future saved progress, premium lab packs, and hosted sandbox access.',
};

export default function AccountPage() {
  return (
    <main className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-8 py-12">
      <header>
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
          Account placeholder
        </p>
        <h1 className="mt-4 max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-white">
          Free labs first. Accounts and paid packs later.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
          V1 is intentionally anonymous and backend-free. The first sellable product should be
          premium lab packs: advanced checks, downloadable manifests, full solutions, and architecture
          review worksheets.
        </p>
      </header>

      <section className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
        <AccountPhase
          title="V1"
          body="Free guided checks, local progress, hints, and solution reveal tracking."
        />
        <AccountPhase
          title="V2"
          body="Premium lab packs with downloadable kits, advanced scenarios, and review worksheets."
        />
        <AccountPhase
          title="V3"
          body="Hosted labs only after auth, abuse controls, sandbox lifecycle, and cost limits are designed."
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
