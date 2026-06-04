'use client';

import { useEffect, useMemo, useState } from 'react';
import type { LabChallenge, LabCheck, LabStep } from '@k8sllm/lab-content';
import { LabTerminal } from '@/components/LabTerminal';
import { trackLabEvent } from '@/lib/analytics';
import {
  getChallengeProgress,
  loadProgress,
  saveProgress,
  upsertChallengeProgress,
  ProgressStore,
} from '@/lib/progress';

type ChallengeRunnerProps = {
  challenge: LabChallenge;
};

export function ChallengeRunner({ challenge }: ChallengeRunnerProps) {
  const [progress, setProgress] = useState<ProgressStore>({});
  const [activeStepId, setActiveStepId] = useState(challenge.steps[0]?.id || '');
  const [checkMessages, setCheckMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = loadProgress();
    const current = getChallengeProgress(stored, challenge.id);
    const next =
      current.status === 'not_started'
        ? upsertChallengeProgress(stored, challenge.id, { status: 'in_progress' })
        : stored;
    setProgress(next);
    saveProgress(next);
    trackLabEvent('challenge_start', {
      challengeId: challenge.id,
      challengeTitle: challenge.title,
    });
  }, [challenge.id, challenge.title]);

  const challengeProgress = getChallengeProgress(progress, challenge.id);
  const activeStep = challenge.steps.find((step) => step.id === activeStepId) || challenge.steps[0];
  const completedCount = challenge.steps.filter((step) =>
    challengeProgress.completedSteps.includes(step.id),
  ).length;
  const completionPercent =
    challenge.steps.length > 0 ? Math.round((completedCount / challenge.steps.length) * 100) : 0;

  const updateProgress = (update: Parameters<typeof upsertChallengeProgress>[2]) => {
    setProgress((current) => {
      const next = upsertChallengeProgress(current, challenge.id, update);
      saveProgress(next);
      return next;
    });
  };

  const markCheckPassed = (check: LabCheck, message: string) => {
    if (!challengeProgress.passedChecks.includes(check.id)) {
      updateProgress({
        status: 'in_progress',
        passedChecks: [...challengeProgress.passedChecks, check.id],
      });
    }
    setCheckMessages((current) => ({ ...current, [check.id]: message }));
  };

  const revealHint = (step: LabStep) => {
    const openedForStep = challengeProgress.openedHints.filter((hintId) =>
      hintId.startsWith(`${step.id}:`),
    );
    const nextHintIndex = openedForStep.length;
    const nextHint = step.hints[nextHintIndex];
    if (!nextHint) {
      return;
    }

    const hintId = `${step.id}:${nextHintIndex}`;
    updateProgress({
      status: 'in_progress',
      openedHints: [...challengeProgress.openedHints, hintId],
    });
    trackLabEvent('hint_open', {
      challengeId: challenge.id,
      stepId: step.id,
      hintIndex: nextHintIndex + 1,
    });
  };

  const revealSolution = (step: LabStep) => {
    if (!challengeProgress.revealedSolutions.includes(step.id)) {
      updateProgress({
        status: 'in_progress',
        revealedSolutions: [...challengeProgress.revealedSolutions, step.id],
      });
      trackLabEvent('solution_reveal', {
        challengeId: challenge.id,
        stepId: step.id,
      });
    }
  };

  const completeStep = (step: LabStep) => {
    const completedSteps = challengeProgress.completedSteps.includes(step.id)
      ? challengeProgress.completedSteps
      : [...challengeProgress.completedSteps, step.id];
    const allDone = completedSteps.length === challenge.steps.length;

    updateProgress({
      status: allDone ? 'completed' : 'in_progress',
      completedSteps,
    });
    trackLabEvent(allDone ? 'challenge_complete' : 'step_complete', {
      challengeId: challenge.id,
      stepId: step.id,
      completedSteps: completedSteps.length,
    });
  };

  const markBlocked = () => {
    updateProgress({ status: 'blocked' });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[330px_1fr]">
      <aside className="h-fit border border-white/10 bg-white/[0.045] p-5 lg:sticky lg:top-24">
        <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
          Challenge progress
        </p>
        <strong className="mt-3 block font-mono text-4xl text-white">{completionPercent}%</strong>
        <div className="mt-4 h-2 bg-white/10">
          <div className="h-full bg-teal-200" style={{ width: `${completionPercent}%` }} />
        </div>
        <p className="mt-4 text-sm font-bold text-slate-300">
          Status: <span className="text-white">{challengeProgress.status.replace('_', ' ')}</span>
        </p>
        <div className="mt-5 grid gap-2">
          {challenge.steps.map((step, index) => {
            const done = challengeProgress.completedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={
                  step.id === activeStep?.id
                    ? 'border border-teal-200 bg-teal-200 px-3 py-3 text-left text-sm font-black text-[#111816]'
                    : 'border border-white/10 bg-[#101718] px-3 py-3 text-left text-sm font-bold text-slate-300 transition hover:border-teal-200/40 hover:text-white'
                }
              >
                <span className="font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>{' '}
                {step.title}
                {done ? <span className="ml-2 text-xs">Completed</span> : null}
              </button>
            );
          })}
        </div>
      </aside>

      {activeStep ? (
        <section className="grid gap-5">
          <header className="border border-white/10 bg-white/[0.045] p-6">
            <p className="m-0 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
              Guided step
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-tight text-white">
              {activeStep.title}
            </h2>
            <p className="mt-4 max-w-3xl text-slate-300">{activeStep.objective}</p>
          </header>

          <LabTerminal challenge={challenge} step={activeStep} />

          <Panel title="Commands">
            <div className="grid gap-3">
              {activeStep.commands.map((command) => (
                <pre
                  key={command}
                  className="overflow-x-auto border border-white/10 bg-[#070b0a] p-4 font-mono text-sm text-teal-100"
                >
                  {command}
                </pre>
              ))}
            </div>
          </Panel>

          <Panel title="Expected signals">
            <ul className="m-0 grid gap-2 p-0">
              {activeStep.expectedSignals.map((signal) => (
                <li key={signal} className="list-none border-l-2 border-teal-200/50 pl-3 text-slate-300">
                  {signal}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Checks">
            <div className="grid gap-4">
              {activeStep.checks.map((check) => (
                <CheckControl
                  key={check.id}
                  check={check}
                  passed={challengeProgress.passedChecks.includes(check.id)}
                  message={checkMessages[check.id]}
                  onPassed={(message) => markCheckPassed(check, message)}
                  onMessage={(message) =>
                    setCheckMessages((current) => ({ ...current, [check.id]: message }))
                  }
                />
              ))}
            </div>
          </Panel>

          <Panel title="Hints and solution">
            <div className="grid gap-4">
              <button
                type="button"
                onClick={() => revealHint(activeStep)}
                className="w-fit border border-white/10 px-4 py-3 text-sm font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5"
              >
                Reveal next hint
              </button>
              <HintList step={activeStep} openedHints={challengeProgress.openedHints} />
              <button
                type="button"
                onClick={() => revealSolution(activeStep)}
                className="w-fit border border-amber-300/30 px-4 py-3 text-sm font-black text-amber-100 transition hover:bg-amber-300/10"
              >
                Reveal solution
              </button>
              {challengeProgress.revealedSolutions.includes(activeStep.id) ? (
                <div className="border border-amber-300/20 bg-amber-300/[0.08] p-4 text-sm leading-relaxed text-amber-50">
                  {activeStep.solution}
                </div>
              ) : null}
            </div>
          </Panel>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => completeStep(activeStep)}
              className="min-h-12 border border-teal-200/40 bg-teal-200 px-5 font-black text-[#111816] transition hover:bg-white"
            >
              Mark step complete
            </button>
            <button
              type="button"
              onClick={markBlocked}
              className="min-h-12 border border-white/10 px-5 font-black text-slate-200 transition hover:border-amber-300/40 hover:bg-amber-300/10"
            >
              Mark blocked
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-white/10 bg-white/[0.045] p-5">
      <h3 className="m-0 mb-4 font-mono text-xs font-black uppercase tracking-[0.08em] text-teal-200">
        {title}
      </h3>
      {children}
    </section>
  );
}

function CheckControl({
  check,
  passed,
  message,
  onPassed,
  onMessage,
}: {
  check: LabCheck;
  passed: boolean;
  message?: string;
  onPassed: (message: string) => void;
  onMessage: (message: string) => void;
}) {
  const [value, setValue] = useState('');

  const validatePaste = () => {
    if (check.type !== 'paste_regex') {
      return;
    }
    const regex = new RegExp(check.expectedPattern, 'i');
    if (regex.test(value)) {
      onPassed(check.successMessage);
    } else {
      onMessage(check.failureMessage);
    }
  };

  const chooseOption = (option: string) => {
    if (check.type !== 'multi_choice') {
      return;
    }
    if (option === check.answer) {
      onPassed(check.successMessage);
    } else {
      onMessage(check.failureMessage);
    }
  };

  return (
    <div className="border border-white/10 bg-[#101718] p-4">
      <p className="m-0 text-sm font-bold text-white">{check.prompt}</p>
      {check.type === 'paste_regex' ? (
        <div className="mt-3 grid gap-3">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="min-h-32 resize-y border border-white/10 bg-[#070b0a] p-3 font-mono text-sm text-slate-100 outline-none transition focus:border-teal-200/50"
            placeholder="Paste command output here"
          />
          <button
            type="button"
            onClick={validatePaste}
            className="w-fit border border-teal-200/40 px-4 py-2 text-sm font-black text-teal-100 transition hover:bg-teal-200 hover:text-[#111816]"
          >
            Check output
          </button>
        </div>
      ) : null}

      {check.type === 'checkbox' ? (
        <button
          type="button"
          onClick={() => onPassed(check.successMessage)}
          className="mt-3 border border-teal-200/40 px-4 py-2 text-sm font-black text-teal-100 transition hover:bg-teal-200 hover:text-[#111816]"
        >
          Confirm
        </button>
      ) : null}

      {check.type === 'multi_choice' ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {check.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => chooseOption(option)}
              className="border border-white/10 px-3 py-2 text-left text-sm font-bold text-slate-300 transition hover:border-teal-200/40 hover:bg-white/5 hover:text-white"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {message ? (
        <p
          className={
            passed
              ? 'mt-3 border border-teal-200/20 bg-teal-200/[0.08] p-3 text-sm font-bold text-teal-100'
              : 'mt-3 border border-amber-300/20 bg-amber-300/[0.08] p-3 text-sm font-bold text-amber-100'
          }
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

function HintList({ step, openedHints }: { step: LabStep; openedHints: string[] }) {
  const hints = useMemo(
    () =>
      step.hints.filter((_, index) => openedHints.includes(`${step.id}:${index}`)),
    [openedHints, step],
  );

  if (hints.length === 0) {
    return <p className="m-0 text-sm text-slate-400">No hints opened for this step yet.</p>;
  }

  return (
    <ol className="m-0 grid gap-2 p-0">
      {hints.map((hint, index) => (
        <li key={hint} className="list-none border border-white/10 bg-[#101718] p-3 text-sm text-slate-200">
          <span className="font-mono text-xs font-black text-teal-200">Hint {index + 1}</span>
          <p className="m-0 mt-1">{hint}</p>
        </li>
      ))}
    </ol>
  );
}
