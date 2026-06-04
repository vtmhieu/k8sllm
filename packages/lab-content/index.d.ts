export type LabCheck =
  | {
      id: string;
      type: 'checkbox';
      prompt: string;
      successMessage: string;
      failureMessage: string;
    }
  | {
      id: string;
      type: 'paste_regex';
      prompt: string;
      expectedPattern: string;
      successMessage: string;
      failureMessage: string;
    }
  | {
      id: string;
      type: 'multi_choice';
      prompt: string;
      options: string[];
      answer: string;
      successMessage: string;
      failureMessage: string;
    };

export type LabStep = {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  expectedSignals: string[];
  checks: LabCheck[];
  hints: string[];
  solution: string;
};

export type LabChallenge = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  topic: string;
  persona: string;
  tools: string[];
  prerequisites: string[];
  free: boolean;
  premium: boolean;
  roadmapIds: string[];
  docsHref: string;
  relatedDocs: string[];
  appHref: string;
  steps: LabStep[];
};

export type LabRoadmap = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  modules: Array<{
    title: string;
    challengeIds: string[];
  }>;
};

export type ProductPath = {
  id: string;
  title: string;
  summary: string;
};

export const challenges: LabChallenge[];
export const roadmaps: LabRoadmap[];
export const productPaths: ProductPath[];
export const labProduct: {
  labsBaseUrl: string;
  waitlistStorageKey: string;
  progressStorageKey: string;
  analyticsEvents: string[];
};
