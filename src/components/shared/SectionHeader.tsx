type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700 sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
