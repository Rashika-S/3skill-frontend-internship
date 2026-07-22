export function SectionHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">{eyebrow}</p>}
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        {subtitle && <p className="mt-2 text-white/60 max-w-xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
