import Link from 'next/link';

const navItems = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/roadmaps/kubernetes-llm-platform', label: 'Roadmap' },
  { href: '/progress', label: 'Progress' },
  { href: '/account', label: 'Account' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 w-[min(1440px,calc(100%-32px))] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-blue-200 bg-blue-50 font-mono text-xs font-black text-[#326ce5]">
            KL
          </span>
          <span className="font-black tracking-tight text-slate-950">K8sLLM Labs</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-transparent px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-blue-100 hover:bg-blue-50 hover:text-[#326ce5]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href="https://www.k8sllm.online/docs/labs"
          className="border border-blue-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-[#326ce5] hover:bg-blue-50 hover:text-[#326ce5]"
        >
          Docs
        </a>
      </nav>
    </header>
  );
}
