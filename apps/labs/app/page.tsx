import Link from 'next/link';
import { ChallengeCatalogClient } from '@/components/ChallengeCatalogClient';
import { MetricStrip } from '@/components/MetricStrip';
import { PremiumWaitlist } from '@/components/PremiumWaitlist';
import { challenges, productPaths, roadmaps } from '@/lib/content';

export default function LabsHomePage() {
  const roadmap = roadmaps[0];

  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-64px)] w-[min(1440px,calc(100%-32px))] gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
            Kubernetes LLM guided labs
          </p>
          <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-white md:text-7xl">
            Practice the platform checks behind production LLM systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            K8sLLM Labs turns Kubernetes LLM architecture into interactive operator challenges:
            type commands in a simulated terminal, inspect realistic Kubernetes output, unlock hints,
            validate readiness, and track progress locally.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/challenges"
              className="min-h-12 border border-teal-200/40 bg-teal-200 px-5 py-3 font-black text-[#111816] transition hover:bg-white"
            >
              Browse challenges
            </Link>
            <Link
              href={`/roadmaps/${roadmap.slug}`}
              className="min-h-12 border border-white/10 px-5 py-3 font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5"
            >
              Follow roadmap
            </Link>
            <a
              href="https://www.k8sllm.online/docs/labs"
              className="min-h-12 border border-white/10 px-5 py-3 font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5"
            >
              Read docs
            </a>
          </div>
        </div>

        <div className="shell-grid border border-white/10 bg-white/[0.045] p-5 shadow-diffusion">
          <div className="grid gap-3">
            <LabFlowRow left="Pull architecture guide" right="Choose challenge" />
            <LabFlowRow left="Type kubectl or curl" right="Inspect simulated output" />
            <LabFlowRow left="Regex check passes" right="Step completed" />
            <LabFlowRow left="Open hint if blocked" right="Reveal solution if needed" />
          </div>
          <div className="mt-5 grid gap-3 border border-white/10 bg-[#070b0a] p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
                Example check
              </span>
              <span className="border border-teal-200/25 px-2 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-100">
                paste_regex
              </span>
            </div>
            <pre className="m-0 overflow-x-auto text-sm leading-relaxed text-teal-100">
              kubectl get nodes -L accelerator,nvidia.com/gpu.product
            </pre>
            <p className="m-0 border-l-2 border-teal-200/60 pl-3 text-sm leading-relaxed text-slate-300">
              The check passes when the output proves GPU placement, node labeling, or accelerator
              scheduling evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1440px,calc(100%-32px))] pb-12">
        <MetricStrip
          metrics={[
            { label: 'Free challenges', value: String(challenges.filter((item) => item.free).length) },
            { label: 'Learning paths', value: String(productPaths.length) },
            { label: 'Guided checks', value: String(challenges.reduce((sum, item) => sum + item.steps.reduce((stepSum, step) => stepSum + step.checks.length, 0), 0)) },
            { label: 'Storage model', value: 'local' },
          ]}
        />
      </section>

      <section className="mx-auto grid w-[min(1440px,calc(100%-32px))] gap-6 pb-12">
        <div className="grid gap-4 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.12em] text-teal-200">
              Product paths
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-none tracking-tight text-white">
              Built for platform engineers, DevOps, MLOps, and AI infrastructure learners.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {productPaths.map((path) => (
              <article key={path.id} className="border border-white/10 bg-white/[0.045] p-4">
                <h3 className="m-0 text-xl font-black leading-none tracking-tight text-white">
                  {path.title}
                </h3>
                <p className="m-0 mt-3 text-sm leading-relaxed text-slate-400">{path.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1440px,calc(100%-32px))] pb-12">
        <ChallengeCatalogClient challenges={challenges.slice(0, 6)} productPaths={productPaths} />
      </section>

      <section className="mx-auto w-[min(1440px,calc(100%-32px))] pb-16">
        <PremiumWaitlist />
      </section>
    </main>
  );
}

function LabFlowRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-[1fr_36px_1fr] items-center gap-3">
      <span className="border border-white/10 bg-[#101718] p-3 text-sm font-bold text-slate-200">
        {left}
      </span>
      <span className="text-center font-mono text-teal-200">-&gt;</span>
      <span className="border border-teal-200/20 bg-teal-200/[0.08] p-3 text-sm font-bold text-teal-100">
        {right}
      </span>
    </div>
  );
}
