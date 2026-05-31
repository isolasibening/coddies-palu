type HelpItem = {
  title: string;
  content: string;
};

type HelpAccordionProps = {
  items: HelpItem[];
};

export function HelpAccordion({ items }: HelpAccordionProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.title}
          className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm"
        >
          <summary className="cursor-pointer text-sm font-semibold">
            {item.title}
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.content}
          </p>
        </details>
      ))}
    </div>
  );
}
