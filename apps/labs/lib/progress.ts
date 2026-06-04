import { labProduct } from './content';

export type ChallengeStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';

export type ChallengeProgress = {
  status: ChallengeStatus;
  completedSteps: string[];
  passedChecks: string[];
  openedHints: string[];
  revealedSolutions: string[];
  updatedAt: string;
};

export type ProgressStore = Record<string, ChallengeProgress>;

export const emptyChallengeProgress = (): ChallengeProgress => ({
  status: 'not_started',
  completedSteps: [],
  passedChecks: [],
  openedHints: [],
  revealedSolutions: [],
  updatedAt: new Date().toISOString(),
});

export function loadProgress(): ProgressStore {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(labProduct.progressStorageKey);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressStore) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(labProduct.progressStorageKey, JSON.stringify(progress));
}

export function getChallengeProgress(progress: ProgressStore, challengeId: string) {
  return progress[challengeId] || emptyChallengeProgress();
}

export function upsertChallengeProgress(
  progress: ProgressStore,
  challengeId: string,
  update: Partial<ChallengeProgress>,
) {
  const current = getChallengeProgress(progress, challengeId);
  return {
    ...progress,
    [challengeId]: {
      ...current,
      ...update,
      completedSteps: update.completedSteps || current.completedSteps,
      passedChecks: update.passedChecks || current.passedChecks,
      openedHints: update.openedHints || current.openedHints,
      revealedSolutions: update.revealedSolutions || current.revealedSolutions,
      updatedAt: new Date().toISOString(),
    },
  };
}
