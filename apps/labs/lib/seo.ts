import type { Metadata } from 'next';

export const labsOrigin = 'https://labs.k8sllm.online';
export const docsOrigin = 'https://www.k8sllm.online';
export const labsSiteName = 'K8sLLM Labs';
export const labsDescription =
  'Interactive Kubernetes LLM labs with guided terminal checks, production scenarios, and platform readiness validation.';
export const labsOgImage = `${labsOrigin}/opengraph-image`;

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function absoluteLabsUrl(path = '/') {
  return new URL(path, labsOrigin).toString();
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
}: SeoMetadataInput): Metadata {
  const canonical = absoluteLabsUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonical,
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
      title,
      description,
      images: [labsOgImage],
    },
  };
}

export function minutesToIsoDuration(duration: string) {
  const match = duration.match(/(\d+)\s*min/i);
  return match ? `PT${match[1]}M` : undefined;
}
