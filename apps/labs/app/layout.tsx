import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { TopNav } from '@/components/TopNav';

export const metadata: Metadata = {
  metadataBase: new URL('https://labs.k8sllm.online'),
  title: {
    default: 'K8sLLM Labs',
    template: '%s | K8sLLM Labs',
  },
  description:
    'Interactive Kubernetes LLM labs with guided checks, hints, progress, and production platform challenges.',
  openGraph: {
    title: 'K8sLLM Labs',
    description:
      'Guided Kubernetes LLM challenges for platform, DevOps, MLOps, and AI infrastructure engineers.',
    url: 'https://labs.k8sllm.online',
    siteName: 'K8sLLM Labs',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <TopNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
