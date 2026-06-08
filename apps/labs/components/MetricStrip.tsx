type MetricStripProps = {
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <div className="grid gap-px border border-blue-100 bg-blue-100 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white/90 p-4">
          <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#326ce5]">
            {metric.label}
          </span>
          <strong className="mt-2 block font-mono text-2xl text-slate-950">{metric.value}</strong>
        </div>
      ))}
    </div>
  );
}
