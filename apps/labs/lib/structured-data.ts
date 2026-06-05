import type { LabChallenge, LabRoadmap } from '@k8sllm/lab-content';
import { absoluteLabsUrl, docsOrigin, labsDescription, labsOrigin, minutesToIsoDuration } from '@/lib/seo';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'K8sLLM Labs',
    alternateName: ['K8sLLM', 'K8s LLM Labs', 'Kubernetes LLM Labs'],
    url: labsOrigin,
    description: labsDescription,
    inLanguage: 'en',
    about: [
      'Kubernetes',
      'LLM infrastructure',
      'vLLM',
      'KServe',
      'Ray Serve',
      'RAG on Kubernetes',
      'GPU node pools',
      'Platform engineering',
      'MLOps',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'K8sLLM',
      url: docsOrigin,
    },
  };
}

export function challengeCatalogJsonLd(challenges: LabChallenge[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'K8sLLM Kubernetes LLM Challenge Catalog',
    description: 'Interactive Kubernetes LLM challenges for platform, DevOps, MLOps, and AI infrastructure engineers.',
    url: absoluteLabsUrl('/challenges'),
    itemListElement: challenges.map((challenge, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: challenge.title,
      url: absoluteLabsUrl(`/challenges/${challenge.slug}`),
      description: challenge.summary,
    })),
  };
}

export function challengeJsonLd(challenge: LabChallenge) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: challenge.title,
    description: challenge.summary,
    url: absoluteLabsUrl(`/challenges/${challenge.slug}`),
    inLanguage: 'en',
    learningResourceType: 'Interactive lab challenge',
    educationalLevel: challenge.difficulty,
    timeRequired: minutesToIsoDuration(challenge.duration),
    isAccessibleForFree: challenge.free,
    teaches: [challenge.topic, ...challenge.tools, 'Kubernetes LLM platform operations'],
    competencyRequired: challenge.prerequisites,
    audience: {
      '@type': 'Audience',
      audienceType: challenge.persona,
    },
    provider: {
      '@type': 'Organization',
      name: 'K8sLLM',
      url: docsOrigin,
    },
    mainEntityOfPage: absoluteLabsUrl(`/challenges/${challenge.slug}`),
  };
}

export function challengeBreadcrumbJsonLd(challenge: LabChallenge) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'K8sLLM Labs',
        item: labsOrigin,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Challenges',
        item: absoluteLabsUrl('/challenges'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: challenge.title,
        item: absoluteLabsUrl(`/challenges/${challenge.slug}`),
      },
    ],
  };
}

export function roadmapJsonLd(roadmap: LabRoadmap, challenges: LabChallenge[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: roadmap.title,
    description: roadmap.summary,
    url: absoluteLabsUrl(`/roadmaps/${roadmap.slug}`),
    itemListElement: challenges.map((challenge, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: challenge.title,
      url: absoluteLabsUrl(`/challenges/${challenge.slug}`),
      description: challenge.summary,
    })),
  };
}
