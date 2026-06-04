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

const prompt = 'lab@k8sllm:~$ ';

export function LabTerminal({ challenge, step }: LabTerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const currentLineRef = useRef('');
  const stepRef = useRef(step);
  const challengeRef = useRef(challenge);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);
  const lastOutputRef = useRef('');
  const [ready, setReady] = useState(false);
  const [lastOutput, setLastOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    stepRef.current = step;
    challengeRef.current = challenge;
    const terminal = terminalRef.current;

    if (terminal) {
      writeInfo(terminal, `Switched to step: ${step.title}`);
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
        lineHeight: 1.35,
        rows: 18,
        scrollback: 1200,
        theme: {
          background: '#070b0a',
          foreground: '#d9fff6',
          cursor: '#99f6e4',
          cursorAccent: '#101718',
          selectionBackground: '#0f766e66',
          black: '#070b0a',
          blue: '#7dd3fc',
          cyan: '#99f6e4',
          green: '#5eead4',
          magenta: '#d8b4fe',
          red: '#fca5a5',
          white: '#eef7f3',
          yellow: '#fde68a',
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

  const runSuggestedSequence = () => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    for (const command of step.commands) {
      runCommand(command, terminal, true);
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
    <section className="overflow-hidden border border-teal-200/20 bg-[#070b0a] shadow-diffusion">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#101718] px-4 py-3">
        <div>
          <p className="m-0 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-200">
            K8sLLM lab terminal
          </p>
          <p className="m-0 mt-1 text-sm text-slate-400">
            Connected to the `llm-serving` lab environment. Type Kubernetes and LLM platform commands directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TerminalButton onClick={runSuggestedSequence} disabled={!ready}>
            Run step commands
          </TerminalButton>
          <TerminalButton onClick={copyLastOutput} disabled={!lastOutput}>
            {copied ? 'Copied' : 'Copy last output'}
          </TerminalButton>
          <TerminalButton onClick={resetEnvironment} disabled={!ready}>
            Reset
          </TerminalButton>
        </div>
      </div>
      <div className="grid gap-px bg-white/10 lg:grid-cols-[1fr_280px]">
        <div className="min-h-[360px] bg-[#070b0a] p-3">
          <div ref={containerRef} className="h-[360px] w-full" aria-label="K8sLLM lab terminal" />
        </div>
        <aside className="grid content-start gap-3 bg-[#101718] p-4">
          <div className="grid grid-cols-2 gap-2">
            <ShellStatus label="Cluster" value="k8sllm-lab-01" />
            <ShellStatus label="Namespace" value="llm-serving" />
            <ShellStatus label="GPU pool" value="ready" />
            <ShellStatus label="Telemetry" value="ready" />
          </div>
          <p className="m-0 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-200">
            Try these
          </p>
          <button
            type="button"
            onClick={() => writeAndRun('help')}
            className="border border-white/10 px-3 py-2 text-left font-mono text-xs font-bold text-slate-300 transition hover:border-teal-200/40 hover:text-white"
          >
            help
          </button>
          <button
            type="button"
            onClick={() => writeAndRun('k8sllm status')}
            className="border border-white/10 px-3 py-2 text-left font-mono text-xs font-bold text-slate-300 transition hover:border-teal-200/40 hover:text-white"
          >
            k8sllm status
          </button>
          <button
            type="button"
            onClick={() => writeAndRun('k8sllm commands')}
            className="border border-white/10 px-3 py-2 text-left font-mono text-xs font-bold text-slate-300 transition hover:border-teal-200/40 hover:text-white"
          >
            k8sllm commands
          </button>
          <div className="border border-white/10 bg-[#070b0a] p-3">
            <p className="m-0 font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] text-teal-200">
              Current step
            </p>
            <p className="m-0 mt-2 text-sm font-bold leading-relaxed text-slate-200">{step.title}</p>
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

    runCommand(command, terminal, true);
  }

  function handleData(data: string) {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }

    if (data === '\r') {
      const command = currentLineRef.current;
      terminal.write('\r\n');
      runCommand(command, terminal, false);
      currentLineRef.current = '';
      historyIndexRef.current = null;
      return;
    }

    if (data === '\u0003') {
      terminal.write('^C\r\n');
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

  function runCommand(command: string, terminal: Terminal, echoCommand: boolean) {
    const trimmed = command.trim();

    if (echoCommand) {
      terminal.write(prompt + trimmed + '\r\n');
    }

    if (trimmed) {
      commandHistoryRef.current = [...commandHistoryRef.current, trimmed].slice(-40);
    }

    const result = runLabTerminalCommand({
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
      writePrompt(terminal);
      return;
    }

    if (result.output) {
      terminal.write(formatOutput(result.output));
      lastOutputRef.current = result.output;
      setLastOutput(result.output);
    }

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
  terminal.writeln('Connecting to k8sllm-lab-01 ... connected');
  terminal.writeln('Context: cluster=k8sllm-lab-01 namespace=llm-serving user=lab');
  terminal.writeln(`Challenge: ${challenge.title}`);
  terminal.writeln(`Step: ${step.title}`);
  terminal.writeln('Type `help` or `k8sllm commands` to begin.');
  terminal.writeln('');
  writePrompt(terminal);
}

function writeInfo(terminal: Terminal, message: string) {
  terminal.writeln('');
  terminal.writeln(`info: ${message}`);
}

function writePrompt(terminal: Terminal) {
  terminal.write(prompt);
}

function formatOutput(output: string) {
  return `${output.replace(/\n/g, '\r\n')}\r\n`;
}

function ShellStatus({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-[#070b0a] p-2">
      <p className="m-0 font-mono text-[0.58rem] font-black uppercase tracking-[0.08em] text-teal-200">
        {label}
      </p>
      <p className="m-0 mt-1 truncate font-mono text-xs font-bold text-slate-200">{value}</p>
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
      className="min-h-10 border border-white/10 px-3 text-xs font-black text-slate-200 transition hover:border-teal-200/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </button>
  );
}
