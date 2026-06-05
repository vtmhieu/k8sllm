import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { RoadmapView } from '@/components/RoadmapView';
import { challenges, getRoadmap, roadmaps } from '@/lib/content';
import { createPageMetadata } from '@/lib/seo';
import { roadmapJsonLd } from '@/lib/structured-data';

type RoadmapPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return roadmaps.map((roadmap) => ({ slug: roadmap.slug }));
}

export function generateMetadata({ params }: RoadmapPageProps): Metadata {
  const roadmap = getRoadmap(params.slug);

  if (!roadmap) {
    return {
      title: 'Roadmap not found',
    };
  }

  return createPageMetadata({
    title: roadmap.title,
    description: roadmap.summary,
    path: `/roadmaps/${roadmap.slug}`,
  });
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = getRoadmap(params.slug);

  if (!roadmap) {
    notFound();
  }

  const modules = roadmap.modules.map((module) => ({
    title: module.title,
    challenges: module.challengeIds
      .map((challengeId) => challenges.find((challenge) => challenge.id === challengeId))
      .filter((challenge): challenge is (typeof challenges)[number] => Boolean(challenge)),
  }));

  return (
    <main className="mx-auto w-[min(1440px,calc(100%-32px))] py-12">
      <JsonLd data={roadmapJsonLd(roadmap, modules.flatMap((module) => module.challenges))} />
      <RoadmapView roadmap={roadmap} modules={modules} />
    </main>
  );
}
