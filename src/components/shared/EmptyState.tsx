import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/70 px-5 py-8 text-center sm:min-h-[280px] sm:px-6 sm:py-10">
      <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-sky-700 sm:size-12">
        <Icon className="size-5 sm:size-6" />
      </span>
      <h2 className="mt-3 text-lg font-semibold sm:mt-4 sm:text-xl">{title}</h2>
      <p className="mt-1 max-w-xs text-sm leading-5 text-muted-foreground sm:mt-2 sm:max-w-sm">
        {description}
      </p>
      {action ? (
        <Button asChild className="mt-4 sm:mt-5">
          <a href={action.href}>{action.label}</a>
        </Button>
      ) : null}
    </div>
  );
}
