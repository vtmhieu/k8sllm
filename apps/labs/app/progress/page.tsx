import { ProgressDashboard } from '@/components/ProgressDashboard';
import { challenges } from '@/lib/content';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Progress',
  description:
    'Private device progress dashboard for Kubernetes LLM labs, challenge status, and completion tracking.',
  path: '/progress',
  noIndex: true,
});

export default function ProgressPage() {
  return (
    <main className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-8 py-12">
      <header className="max-w-4xl">
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-[#326ce5]">
          Progress dashboard
        </p>
        <h1 className="mt-4 text-6xl font-black leading-[0.9] tracking-tight text-slate-950">
          Track Kubernetes LLM lab progress locally.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
          This dashboard reads challenge status, completed steps, and blocked work saved on this device.
          Accounts and saved cloud progress are intentionally deferred until premium lab packs exist.
        </p>
      </header>
      <ProgressDashboard challenges={challenges} />
    </main>
  );
}
