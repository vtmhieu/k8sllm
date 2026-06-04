type MetricStripProps = {
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-[#111816]/88 p-4">
          <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-teal-200">
            {metric.label}
          </span>
          <strong className="mt-2 block font-mono text-2xl text-white">{metric.value}</strong>
        </div>
      ))}
    </div>
  );
}
