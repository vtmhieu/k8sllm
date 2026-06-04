import Link from 'next/link';

const navItems = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/roadmaps/kubernetes-llm-platform', label: 'Roadmap' },
  { href: '/progress', label: 'Progress' },
  { href: '/account', label: 'Account' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#101718]/86 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 w-[min(1440px,calc(100%-32px))] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-teal-200/30 bg-teal-200/10 font-mono text-xs font-black text-teal-100">
            KL
          </span>
          <span className="font-black tracking-tight text-white">K8sLLM Labs</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-transparent px-3 py-2 text-sm font-bold text-slate-300 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href="https://www.k8sllm.online/docs/labs"
          className="border border-teal-200/30 px-3 py-2 text-sm font-bold text-teal-100 transition hover:bg-teal-200/10"
        >
          Docs
        </a>
      </nav>
    </header>
  );
}
