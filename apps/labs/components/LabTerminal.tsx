'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { FitAddon } from '@xterm/addon-fit';
import type { Terminal } from '@xterm/xterm';
import type { LabChallenge, LabStep } from '@k8sllm/lab-content';
import { trackLabEvent } from '@/lib/analytics';
import { runLabTerminalCommand } from '@/lib/terminal-simulator';

type LabTerminalProps = {
  challenge: LabChallenge;
  step: LabStep;
};

const ansi = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const prompt = `${ansi.green}lab@k8sllm${ansi.reset}:${ansi.blue}llm-serving${ansi.reset}$ `;

export function LabTerminal({ challenge, step }: LabTerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const currentLineRef = useRef('');
  const stepRef = useRef(step);
  const challengeRef = useRef(challenge);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const lastOutputRef = useRef('');
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [lastOutput, setLastOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    stepRef.current = step;
    challengeRef.current = challenge;
    const terminal = terminalRef.current;

    if (terminal) {
      writeInfo(terminal, `switched step: ${step.title}`);
      writePrompt(terminal);
    }
  }, [challenge, step]);

  useEffect(() => {
    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;

    async function bootTerminal() {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import('@xterm/xterm'),
        import('@xterm/addon-fit'),
      ]);

      if (disposed || !containerRef.current) {
        return;
      }

      const terminal = new Terminal({
        allowProposedApi: false,
        convertEol: true,
        cursorBlink: true,
        cursorStyle: 'bar',
        disableStdin: false,
        fontFamily: 'JetBrains Mono, SFMono-Regular, Consolas, monospace',
        fontSize: 13,
        lineHeight: 1.34,
        rows: 24,
        scrollback: 1600,
        theme: {
          background: '#08090a',
          foreground: '#d4d4d4',
          cursor: '#e5e7eb',
          cursorAccent: '#08090a',
          selectionBackground: '#37415199',
          black: '#111827',
          red: '#ef4444',
          green: '#22c55e',
          yellow: '#f59e0b',
          blue: '#3b82f6',
          magenta: '#a855f7',
          cyan: '#06b6d4',
          white: '#e5e7eb',
          brightBlack: '#6b7280',
          brightRed: '#f87171',
          brightGreen: '#4ade80',
          brightYellow: '#fbbf24',
          brightBlue: '#60a5fa',
          brightMagenta: '#c084fc',
          brightCyan: '#67e8f9',
          brightWhite: '#f9fafb',
        },
      });
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      terminal.open(containerRef.current);
      fitAddon.fit();

      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      setReady(true);

      writeIntro(terminal, challengeRef.current, stepRef.current);
      terminal.onData((data) => handleData(data));

      resizeObserver = new ResizeObserver(() => {
        fitAddonRef.current?.fit();
      });
      resizeObserver.observe(containerRef.current);
    }

    bootTerminal();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      terminalRef.current?.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  const runSuggestedSequence = async () => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    for (const command of step.commands) {
      await runCommand(command, terminal, true);
    }
  };

  const resetEnvironment = () => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    currentLineRef.current = '';
    commandHistoryRef.current = [];
    historyIndexRef.current = null;
    runningRef.current = false;
    setRunning(false);
    lastOutputRef.current = '';
    setLastOutput('');
    setCopied(false);
    terminal.clear();
    writeIntro(terminal, challenge, step);
  };

  const copyLastOutput = async () => {
    if (!lastOutputRef.current || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(lastOutputRef.current);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="overflow-hidden border border-white/10 bg-[#08090a]">
      <div className="grid border-b border-white/10 bg-[#0f1115] md:grid-cols-[1fr_auto]">
        <div className="min-w-0 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden="true" />
            <p className="m-0 ml-2 truncate font-mono text-xs text-slate-400">
              lab@k8sllm:llm-serving
            </p>
          </div>
          <p className="m-0 mt-2 text-sm text-slate-500">
            Kubernetes context is loaded. Type commands directly or run the step sequence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 md:border-l md:border-t-0">
          <TerminalButton onClick={() => void runSuggestedSequence()} disabled={!ready || running}>
            {running ? 'running' : 'run step'}
          </TerminalButton>
          <TerminalButton onClick={copyLastOutput} disabled={!lastOutput}>
            {copied ? 'copied' : 'copy output'}
          </TerminalButton>
          <TerminalButton onClick={resetEnvironment} disabled={!ready}>
            reset
          </TerminalButton>
        </div>
      </div>

      <div className="grid bg-white/10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-px">
        <div className="min-h-[520px] min-w-0 bg-[#08090a] p-3">
          <div ref={containerRef} className="h-[500px] w-full" aria-label="K8sLLM lab terminal" />
        </div>
        <aside className="grid content-start gap-3 border-t border-white/10 bg-[#0f1115] p-4 lg:border-t-0">
          <div className="grid grid-cols-2 gap-2">
            <ShellStatus label="cluster" value="k8sllm-lab-01" state="ready" />
            <ShellStatus label="namespace" value="llm-serving" state="ready" />
            <ShellStatus label="gpu pool" value="ready" state="ready" />
            <ShellStatus label="telemetry" value="ready" state="ready" />
          </div>
          <div>
            <p className="m-0 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              command history
            </p>
            <div className="mt-2 grid gap-1">
              <CommandSuggestion disabled={!ready || running} onClick={() => writeAndRun('help')}>
                help
              </CommandSuggestion>
              <CommandSuggestion disabled={!ready || running} onClick={() => writeAndRun('k8sllm status')}>
                k8sllm status
              </CommandSuggestion>
              <CommandSuggestion disabled={!ready || running} onClick={() => writeAndRun('k8sllm commands')}>
                k8sllm commands
              </CommandSuggestion>
              <CommandSuggestion disabled={!ready || running} onClick={() => writeAndRun('kubectl config current-context')}>
                kubectl config current-context
              </CommandSuggestion>
            </div>
          </div>
          <div className="border border-white/10 bg-[#08090a] p-3">
            <p className="m-0 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              active runbook
            </p>
            <p className="m-0 mt-2 text-sm font-semibold leading-relaxed text-slate-300">{step.title}</p>
          </div>
        </aside>
      </div>
    </section>
  );

  function writeAndRun(command: string) {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    void runCommand(command, terminal, true);
  }

  function handleData(data: string) {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    if (data === '\r') {
      const command = currentLineRef.current;
      terminal.write('\r\n');
      void runCommand(command, terminal, false);
      currentLineRef.current = '';
      historyIndexRef.current = null;
      return;
    }

    if (data === '\u0003') {
      terminal.write(`${ansi.red}^C${ansi.reset}\r\n`);
      currentLineRef.current = '';
      writePrompt(terminal);
      return;
    }

    if (data === '\u007f') {
      if (currentLineRef.current.length > 0) {
        currentLineRef.current = currentLineRef.current.slice(0, -1);
        terminal.write('\b \b');
      }
      return;
    }

    if (data === '\u001b[A' || data === '\u001b[B') {
      recallHistory(data === '\u001b[A' ? -1 : 1, terminal);
      return;
    }

    if (data >= ' ' && data !== '\u007f') {
      currentLineRef.current += data;
      terminal.write(data);
    }
  }

  async function runCommand(command: string, terminal: Terminal, echoCommand: boolean) {
    if (runningRef.current) {
      writeInfo(terminal, 'command already running; wait for prompt');
      writePrompt(terminal);
      return;
    }

    const trimmed = command.trim();

    if (echoCommand) {
      clearCurrentLine(terminal);
      currentLineRef.current = '';
      terminal.write(`${trimmed}\r\n`);
    }

    if (trimmed) {
      commandHistoryRef.current = [...commandHistoryRef.current, trimmed].slice(-40);
    }

    runningRef.current = true;
    setRunning(true);
    const startedAt = Date.now();
    if (trimmed && trimmed !== 'clear') {
      terminal.writeln(`${ansi.gray}[running]${ansi.reset}`);
      await waitForCommand(trimmed);
    }

    const result =
      trimmed.toLowerCase() === 'history'
        ? {
            output: commandHistoryRef.current
              .map((item, index) => `${String(index + 1).padStart(4, ' ')}  ${item}`)
              .join('\n'),
            matched: true,
            summary: 'history shown',
          }
        : runLabTerminalCommand({
            challenge: challengeRef.current,
            step: stepRef.current,
            command: trimmed,
          });

    trackLabEvent('terminal_command_run', {
      challengeId: challengeRef.current.id,
      stepId: stepRef.current.id,
      matched: result.matched,
      summary: result.summary,
    });

    if (result.output === '__CLEAR__') {
      terminal.clear();
      runningRef.current = false;
      setRunning(false);
      writePrompt(terminal);
      return;
    }

    if (result.output) {
      terminal.write(formatOutput(result.output));
      lastOutputRef.current = result.output;
      setLastOutput(result.output);
    }

    if (trimmed) {
      const exitCode = result.matched ? '0' : '127';
      const exitColor = result.matched ? ansi.green : ansi.red;
      terminal.writeln(`${exitColor}[exit ${exitCode}]${ansi.reset} ${ansi.gray}${Date.now() - startedAt}ms${ansi.reset}`);
    }
    runningRef.current = false;
    setRunning(false);
    writePrompt(terminal);
  }

  function recallHistory(direction: -1 | 1, terminal: Terminal) {
    if (commandHistoryRef.current.length === 0) {
      return;
    }

    const currentIndex =
      historyIndexRef.current === null ? commandHistoryRef.current.length : historyIndexRef.current;
    const nextIndex = Math.max(
      0,
      Math.min(commandHistoryRef.current.length - 1, currentIndex + direction),
    );
    historyIndexRef.current = nextIndex;

    clearCurrentLine(terminal);
    const nextCommand = commandHistoryRef.current[nextIndex] || '';
    currentLineRef.current = nextCommand;
    terminal.write(nextCommand);
  }

  function clearCurrentLine(terminal: Terminal) {
    const length = currentLineRef.current.length;
    if (length > 0) {
      terminal.write('\b \b'.repeat(length));
    }
  }
}

function writeIntro(terminal: Terminal, challenge: LabChallenge, step: LabStep) {
  terminal.writeln(`${ansi.gray}ssh lab@k8sllm-lab-01${ansi.reset}`);
  terminal.writeln(`${ansi.green}connected${ansi.reset} ${ansi.gray}cluster=k8sllm-lab-01 namespace=llm-serving user=lab${ansi.reset}`);
  terminal.writeln(`${ansi.gray}challenge${ansi.reset}: ${ansi.bold}${challenge.title}${ansi.reset}`);
  terminal.writeln(`${ansi.gray}step${ansi.reset}: ${step.title}`);
  terminal.writeln(`${ansi.gray}type 'help' or 'k8sllm commands' to begin${ansi.reset}`);
  terminal.writeln('');
  writePrompt(terminal);
}

function writeInfo(terminal: Terminal, message: string) {
  terminal.writeln('');
  terminal.writeln(`${ansi.gray}info:${ansi.reset} ${message}`);
}

function writePrompt(terminal: Terminal) {
  terminal.write(prompt);
}

function formatOutput(output: string) {
  return `${output
    .split('\n')
    .map((line) => colorizeLine(line))
    .join('\r\n')}\r\n`;
}

function colorizeLine(line: string) {
  if (/error|failed|not found|unauthorized/i.test(line)) {
    return `${ansi.red}${line}${ansi.reset}`;
  }
  if (/warn|pending|filtered_before_prompt/i.test(line)) {
    return `${ansi.yellow}${line}${ansi.reset}`;
  }
  if (/ready|running|active|successfully|authorized|200|loaded|connected/i.test(line)) {
    return `${ansi.green}${line}${ansi.reset}`;
  }
  if (/info|context|challenge|step/i.test(line)) {
    return `${ansi.gray}${line}${ansi.reset}`;
  }
  if (/ttft|queue|tokens|gpu|nvidia|accelerator/i.test(line)) {
    return `${ansi.cyan}${line}${ansi.reset}`;
  }
  return line;
}

function waitForCommand(command: string) {
  const normalized = command.trim().toLowerCase();
  const baseDelay = normalized.startsWith('kubectl') || normalized.startsWith('curl') ? 520 : 260;
  const variableDelay = Math.min(480, normalized.length * 4);

  return new Promise((resolve) => {
    window.setTimeout(resolve, baseDelay + variableDelay);
  });
}

function ShellStatus({ label, value, state }: { label: string; value: string; state: 'ready' | 'idle' }) {
  return (
    <div className="border border-white/10 bg-[#08090a] p-2">
      <p className="m-0 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </p>
      <p className={state === 'ready' ? 'm-0 mt-1 truncate font-mono text-xs font-semibold text-emerald-300' : 'm-0 mt-1 truncate font-mono text-xs font-semibold text-slate-300'}>
        {value}
      </p>
    </div>
  );
}

function TerminalButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="min-h-9 border border-white/10 px-3 font-mono text-xs font-semibold text-slate-300 transition hover:border-emerald-400/25 hover:bg-white/[0.04] hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </button>
  );
}

function CommandSuggestion({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="border border-transparent px-0 py-1 text-left font-mono text-xs text-slate-400 transition hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
    >
      <span className="text-slate-600">$ </span>
      {children}
    </button>
  );
}
