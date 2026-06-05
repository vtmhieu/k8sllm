import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@xterm/xterm/css/xterm.css';
import './globals.css';
import { TopNav } from '@/components/TopNav';
import { labsDescription, labsOgImage, labsOrigin, labsSiteName } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(labsOrigin),
  title: {
    default: labsSiteName,
    template: '%s | K8sLLM Labs',
  },
  applicationName: labsSiteName,
  keywords: [
    'Kubernetes LLM labs',
    'K8s LLM labs',
    'vLLM Kubernetes lab',
    'RAG on Kubernetes lab',
    'GPU node pool Kubernetes',
    'MLOps labs',
    'AI infrastructure labs',
  ],
  description: labsDescription,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: labsSiteName,
    description: labsDescription,
    url: '/',
    siteName: labsSiteName,
    type: 'website',
    images: [
      {
        url: labsOgImage,
        width: 1200,
        height: 630,
        alt: 'K8sLLM Labs Kubernetes LLM challenge environment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: labsSiteName,
    description: labsDescription,
    images: [labsOgImage],
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
