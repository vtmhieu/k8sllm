import * as labContent from '@k8sllm/lab-content';
import type { LabChallenge, LabRoadmap } from '@k8sllm/lab-content';

const { challenges, roadmaps, productPaths, labProduct } = labContent as {
  challenges: LabChallenge[];
  roadmaps: LabRoadmap[];
  productPaths: Array<{ id: string; title: string; summary: string }>;
  labProduct: {
    labsBaseUrl: string;
    waitlistStorageKey: string;
    progressStorageKey: string;
    analyticsEvents: string[];
  };
};

export { challenges, roadmaps, productPaths, labProduct };

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}

export function getRoadmap(slug: string) {
  return roadmaps.find((roadmap) => roadmap.slug === slug);
}

export function getRoadmapChallenges(roadmap: LabRoadmap) {
  return roadmap.modules.map((module) => ({
    ...module,
    challenges: module.challengeIds
      .map((challengeId) => challenges.find((challenge) => challenge.id === challengeId))
      .filter(Boolean) as LabChallenge[],
  }));
}
