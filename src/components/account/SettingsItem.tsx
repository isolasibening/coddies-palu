import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SettingsItemProps = {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  className?: string;
};

export function SettingsItem({
  href,
  label,
  description,
  icon: Icon,
  className,
}: SettingsItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-white/88 p-3 shadow-sm transition hover:border-[#fdce5b] hover:bg-[#fff7df]",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fdce5b]/35 text-[#253d79]">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        {description ? (
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
