import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RoadmapView } from '@/components/RoadmapView';
import { challenges, getRoadmap, roadmaps } from '@/lib/content';

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

  return {
    title: roadmap.title,
    description: roadmap.summary,
  };
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
      <RoadmapView roadmap={roadmap} modules={modules} />
    </main>
  );
}
