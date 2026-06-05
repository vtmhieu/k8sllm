'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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
  nextChallenge?: Pick<LabChallenge, 'slug' | 'title'> | null;
};

export function ChallengeRunner({ challenge, nextChallenge }: ChallengeRunnerProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressStore>({});
  const [activeStepId, setActiveStepId] = useState(challenge.steps[0]?.id || '');
  const [checkMessages, setCheckMessages] = useState<Record<string, string>>({});
  const [transitionMessage, setTransitionMessage] = useState('');

  useEffect(() => {
    const stored = loadProgress();
    const current = getChallengeProgress(stored, challenge.id);
    const next =
      current.status === 'not_started'
        ? upsertChallengeProgress(stored, challenge.id, { status: 'in_progress' })
        : stored;
    const refreshed = getChallengeProgress(next, challenge.id);
    const firstUnfinishedStep =
      challenge.steps.find((step) => !refreshed.completedSteps.includes(step.id)) ||
      challenge.steps[0];
    setProgress(next);
    setActiveStepId(firstUnfinishedStep?.id || '');
    saveProgress(next);
    trackLabEvent('challenge_start', {
      challengeId: challenge.id,
      challengeTitle: challenge.title,
    });
  }, [challenge.id, challenge.steps, challenge.title]);

  const challengeProgress = getChallengeProgress(progress, challenge.id);
  const activeStep = challenge.steps.find((step) => step.id === activeStepId) || challenge.steps[0];
  const activeStepDone = activeStep
    ? challengeProgress.completedSteps.includes(activeStep.id)
    : false;
  const activeStepIndex = activeStep
    ? challenge.steps.findIndex((step) => step.id === activeStep.id)
    : -1;
  const nextUnfinishedStep = challenge.steps.find(
    (step, index) =>
      index > activeStepIndex && !challengeProgress.completedSteps.includes(step.id),
  );
  const completedCount = challenge.steps.filter((step) =>
    challengeProgress.completedSteps.includes(step.id),
  ).length;
  const completionPercent =
    challenge.steps.length > 0 ? Math.round((completedCount / challenge.steps.length) * 100) : 0;
  const challengeDone = completedCount === challenge.steps.length;

  const updateProgress = (update: Parameters<typeof upsertChallengeProgress>[2]) => {
    setProgress((current) => {
      const next = upsertChallengeProgress(current, challenge.id, update);
      saveProgress(next);
      return next;
    });
  };

  const continueToNextChallenge = () => {
    if (!nextChallenge) {
      return;
    }

    router.push(`/challenges/${nextChallenge.slug}`);
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
    const stepIndex = challenge.steps.findIndex((item) => item.id === step.id);
    const nextStep =
      challenge.steps.find(
        (item, index) => index > stepIndex && !completedSteps.includes(item.id),
      ) || challenge.steps.find((item) => !completedSteps.includes(item.id));

    updateProgress({
      status: allDone ? 'completed' : 'in_progress',
      completedSteps,
    });
    trackLabEvent(allDone ? 'challenge_complete' : 'step_complete', {
      challengeId: challenge.id,
      stepId: step.id,
      completedSteps: completedSteps.length,
    });

    if (allDone) {
      if (nextChallenge) {
        setTransitionMessage(`Challenge complete. Continuing to ${nextChallenge.title}.`);
        window.setTimeout(continueToNextChallenge, 650);
      } else {
        setTransitionMessage('Challenge complete. All roadmap challenges are complete.');
      }
      return;
    }

    if (nextStep) {
      setActiveStepId(nextStep.id);
      setTransitionMessage(`${step.title} complete. Continue with ${nextStep.title}.`);
    }
  };

  const markBlocked = () => {
    updateProgress({ status: 'blocked' });
    setTransitionMessage('Marked blocked. Open a hint, inspect the expected signals, or reveal the solution.');
  };

  const selectStep = (stepId: string) => {
    setActiveStepId(stepId);
    setTransitionMessage('');
  };

  return (
    <section className="grid gap-3 xl:grid-cols-[280px_minmax(0,1fr)_380px]">
      <StepRail
        steps={challenge.steps}
        activeStepId={activeStep?.id || ''}
        completedSteps={challengeProgress.completedSteps}
        status={challengeProgress.status}
        completionPercent={completionPercent}
        onSelectStep={selectStep}
      />

      {activeStep ? (
        <>
          <main className="min-w-0 border border-white/10 bg-[#101214]">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Active step {String(activeStepIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="m-0 mt-2 text-2xl font-black leading-none tracking-tight text-slate-100 md:text-3xl">
                    {activeStep.title}
                  </h2>
                </div>
                <StepStatePill done={activeStepDone} blocked={challengeProgress.status === 'blocked'} />
              </div>
              <p className="m-0 mt-3 max-w-4xl text-sm leading-relaxed text-slate-400">
                {activeStep.objective}
              </p>
            </div>

            {transitionMessage ? (
              <div className="border-b border-emerald-400/20 bg-emerald-400/[0.06] px-5 py-3 text-sm font-semibold text-emerald-200">
                {transitionMessage}
              </div>
            ) : null}

            <div className="p-3 md:p-4">
              <LabTerminal challenge={challenge} step={activeStep} />
            </div>
          </main>

          <ValidationRail
            activeStep={activeStep}
            activeStepDone={activeStepDone}
            challengeDone={challengeDone}
            nextChallenge={nextChallenge}
            nextUnfinishedStep={nextUnfinishedStep}
            checkMessages={checkMessages}
            passedChecks={challengeProgress.passedChecks}
            openedHints={challengeProgress.openedHints}
            revealedSolutions={challengeProgress.revealedSolutions}
            onCheckPassed={markCheckPassed}
            onCheckMessage={(checkId, message) =>
              setCheckMessages((current) => ({ ...current, [checkId]: message }))
            }
            onRevealHint={revealHint}
            onRevealSolution={revealSolution}
            onCompleteStep={completeStep}
            onContinueNextChallenge={continueToNextChallenge}
            onMarkBlocked={markBlocked}
            onSelectStep={selectStep}
          />
        </>
      ) : null}
    </section>
  );
}

function StepRail({
  steps,
  activeStepId,
  completedSteps,
  status,
  completionPercent,
  onSelectStep,
}: {
  steps: LabStep[];
  activeStepId: string;
  completedSteps: string[];
  status: string;
  completionPercent: number;
  onSelectStep: (stepId: string) => void;
}) {
  return (
    <aside className="h-fit border border-white/10 bg-[#101214] xl:sticky xl:top-20">
      <div className="border-b border-white/10 p-4">
        <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Lab progress
        </p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <strong className="font-mono text-3xl text-slate-100">{completionPercent}%</strong>
          <span className={status === 'blocked' ? 'font-mono text-xs text-amber-300' : 'font-mono text-xs text-slate-400'}>
            {status.replace('_', ' ')}
          </span>
        </div>
        <div className="mt-4 h-1.5 bg-white/10">
          <div className="h-full bg-emerald-400" style={{ width: `${completionPercent}%` }} />
        </div>
      </div>

      <ol className="m-0 grid p-0">
        {steps.map((step, index) => {
          const done = completedSteps.includes(step.id);
          const active = step.id === activeStepId;
          return (
            <li key={step.id} className="list-none border-b border-white/10 last:border-b-0">
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={
                  active
                    ? 'grid w-full grid-cols-[28px_1fr] gap-3 bg-white/[0.06] px-4 py-3 text-left text-slate-100 outline-none ring-1 ring-inset ring-emerald-400/30'
                    : 'grid w-full grid-cols-[28px_1fr] gap-3 px-4 py-3 text-left text-slate-400 outline-none transition hover:bg-white/[0.035] hover:text-slate-100 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-emerald-400/40'
                }
              >
                <span
                  className={
                    done
                      ? 'grid h-6 w-6 place-items-center border border-emerald-400/30 bg-emerald-400/10 font-mono text-[0.65rem] text-emerald-300'
                      : active
                        ? 'grid h-6 w-6 place-items-center border border-emerald-400/40 font-mono text-[0.65rem] text-emerald-300'
                        : 'grid h-6 w-6 place-items-center border border-white/10 font-mono text-[0.65rem] text-slate-500'
                  }
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-sm font-bold leading-tight">{step.title}</span>
                  <span className="mt-1 block font-mono text-[0.66rem] uppercase tracking-[0.08em] text-slate-500">
                    {done ? 'completed' : active ? 'active' : 'queued'}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function ValidationRail({
  activeStep,
  activeStepDone,
  challengeDone,
  nextChallenge,
  nextUnfinishedStep,
  checkMessages,
  passedChecks,
  openedHints,
  revealedSolutions,
  onCheckPassed,
  onCheckMessage,
  onRevealHint,
  onRevealSolution,
  onCompleteStep,
  onContinueNextChallenge,
  onMarkBlocked,
  onSelectStep,
}: {
  activeStep: LabStep;
  activeStepDone: boolean;
  challengeDone: boolean;
  nextChallenge?: Pick<LabChallenge, 'slug' | 'title'> | null;
  nextUnfinishedStep?: LabStep;
  checkMessages: Record<string, string>;
  passedChecks: string[];
  openedHints: string[];
  revealedSolutions: string[];
  onCheckPassed: (check: LabCheck, message: string) => void;
  onCheckMessage: (checkId: string, message: string) => void;
  onRevealHint: (step: LabStep) => void;
  onRevealSolution: (step: LabStep) => void;
  onCompleteStep: (step: LabStep) => void;
  onContinueNextChallenge: () => void;
  onMarkBlocked: () => void;
  onSelectStep: (stepId: string) => void;
}) {
  return (
    <aside className="grid content-start gap-3">
      <RailSection title="Runbook">
        <div className="grid gap-2">
          {activeStep.commands.map((command) => (
            <pre
              key={command}
              className="m-0 overflow-x-auto border border-white/10 bg-[#0b0d0f] p-3 font-mono text-xs leading-relaxed text-slate-300"
            >
              {command}
            </pre>
          ))}
        </div>
      </RailSection>

      <RailSection title="Expected signals">
        <ul className="m-0 grid gap-2 p-0">
          {activeStep.expectedSignals.map((signal) => (
            <li key={signal} className="list-none border-l border-emerald-400/30 pl-3 text-sm leading-relaxed text-slate-400">
              {signal}
            </li>
          ))}
        </ul>
      </RailSection>

      <RailSection title="Validation">
        <div className="grid gap-3">
          {activeStep.checks.map((check) => (
            <CheckControl
              key={check.id}
              check={check}
              passed={passedChecks.includes(check.id)}
              message={checkMessages[check.id]}
              onPassed={(message) => onCheckPassed(check, message)}
              onMessage={(message) => onCheckMessage(check.id, message)}
            />
          ))}
        </div>
      </RailSection>

      <RailSection title="Hints">
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => onRevealHint(activeStep)}
            className="min-h-10 border border-white/10 px-3 text-left text-sm font-bold text-slate-300 transition hover:border-emerald-400/30 hover:bg-white/[0.04] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/40"
          >
            Reveal next hint
          </button>
          <HintList step={activeStep} openedHints={openedHints} />
          <button
            type="button"
            onClick={() => onRevealSolution(activeStep)}
            className="min-h-10 border border-amber-300/20 px-3 text-left text-sm font-bold text-amber-200 transition hover:bg-amber-300/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300/40"
          >
            Reveal solution
          </button>
          {revealedSolutions.includes(activeStep.id) ? (
            <div className="border border-amber-300/20 bg-amber-300/[0.06] p-3 text-sm leading-relaxed text-amber-100">
              {activeStep.solution}
            </div>
          ) : null}
        </div>
      </RailSection>

      <div className="grid gap-2 border border-white/10 bg-[#101214] p-3">
        <button
          type="button"
          onClick={() =>
            activeStepDone && nextUnfinishedStep
              ? onSelectStep(nextUnfinishedStep.id)
              : challengeDone && nextChallenge
                ? onContinueNextChallenge()
                : onCompleteStep(activeStep)
          }
          disabled={activeStepDone && !nextUnfinishedStep && !nextChallenge}
          className="min-h-11 border border-emerald-400/30 bg-emerald-400 px-4 text-sm font-black text-[#101214] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {activeStepDone
            ? nextUnfinishedStep
              ? 'Go to next unfinished step'
              : nextChallenge
                ? 'Continue to next challenge'
                : 'Challenge complete'
            : 'Mark step complete'}
        </button>
        <button
          type="button"
          onClick={onMarkBlocked}
          className="min-h-10 border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-amber-300/30 hover:bg-amber-300/[0.06] hover:text-amber-100"
        >
          Mark blocked
        </button>
      </div>
    </aside>
  );
}

function StepStatePill({ done, blocked }: { done: boolean; blocked: boolean }) {
  if (blocked && !done) {
    return (
      <span className="border border-amber-300/25 px-3 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-amber-200">
        blocked
      </span>
    );
  }

  if (done) {
    return (
      <span className="border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-emerald-300">
        step complete
      </span>
    );
  }

  return (
    <span className="border border-white/10 px-3 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
      running
    </span>
  );
}

function RailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-white/10 bg-[#101214] p-4">
      <h3 className="m-0 mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
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
    <div
      className={
        passed
          ? 'border border-emerald-400/25 bg-emerald-400/[0.045] p-3'
          : 'border border-white/10 bg-[#0d0f12] p-3'
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="m-0 text-sm font-semibold leading-relaxed text-slate-200">{check.prompt}</p>
        {passed ? (
          <span className="border border-emerald-400/25 px-2 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-emerald-300">
            passed
          </span>
        ) : null}
      </div>
      {check.type === 'paste_regex' ? (
        <div className="mt-3 grid gap-2">
          <label className="grid gap-2">
            <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
              Terminal evidence
            </span>
            <textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="min-h-28 resize-y border border-white/10 bg-[#070809] p-3 font-mono text-xs leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-emerald-400/35"
              placeholder="Paste command output"
            />
          </label>
          <button
            type="button"
            onClick={validatePaste}
            className="w-fit border border-emerald-400/25 px-3 py-2 text-xs font-black text-emerald-300 transition hover:bg-emerald-400 hover:text-[#101214]"
          >
            {passed ? 'Re-check output' : 'Check output'}
          </button>
        </div>
      ) : null}

      {check.type === 'checkbox' ? (
        <button
          type="button"
          onClick={() => onPassed(check.successMessage)}
          className="mt-3 border border-emerald-400/25 px-3 py-2 text-xs font-black text-emerald-300 transition hover:bg-emerald-400 hover:text-[#101214]"
        >
          Confirm
        </button>
      ) : null}

      {check.type === 'multi_choice' ? (
        <div className="mt-3 grid gap-2">
          {check.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => chooseOption(option)}
              className="border border-white/10 px-3 py-2 text-left text-xs font-semibold leading-relaxed text-slate-300 transition hover:border-emerald-400/25 hover:bg-white/[0.035] hover:text-slate-100"
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
              ? 'mt-3 border border-emerald-400/20 bg-emerald-400/[0.055] p-3 text-xs font-semibold leading-relaxed text-emerald-200'
              : 'mt-3 border border-amber-300/20 bg-amber-300/[0.06] p-3 text-xs font-semibold leading-relaxed text-amber-100'
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
    return <p className="m-0 text-sm text-slate-500">No hints opened for this step yet.</p>;
  }

  return (
    <ol className="m-0 grid gap-2 p-0">
      {hints.map((hint, index) => (
        <li key={hint} className="list-none border border-white/10 bg-[#0d0f12] p-3 text-sm leading-relaxed text-slate-300">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Hint {index + 1}
          </span>
          <p className="m-0 mt-1">{hint}</p>
        </li>
      ))}
    </ol>
  );
}
