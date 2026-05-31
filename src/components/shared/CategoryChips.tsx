import Link from "next/link";
import {
  Armchair,
  Baby,
  BedDouble,
  Bike,
  Car,
  Footprints,
  LucideIcon,
  Moon,
  Puzzle,
  Shirt,
  Soup,
} from "lucide-react";

import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Armchair,
  Baby,
  BedDouble,
  Bike,
  Car,
  Footprints,
  Moon,
  Puzzle,
  Shirt,
  Soup,
};

type CategoryChipsProps = {
  categories: Category[];
  activeCategory?: string;
  showAll?: boolean;
  featuredOnly?: boolean;
  className?: string;
};

export function CategoryChips({
  categories,
  activeCategory,
  showAll = true,
  featuredOnly = false,
  className,
}: CategoryChipsProps) {
  const visibleCategories = featuredOnly
    ? categories.filter((category) => category.featured)
    : categories;

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {showAll ? (
        <Link
          href="/products"
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border border-[#253d79]/20 bg-[#fff7df] px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm",
            !activeCategory && "border-[#efbd3a] bg-[#fdce5b]/40 text-[#253d79]",
          )}
        >
          Semua
        </Link>
      ) : null}
      {visibleCategories.map((category) => {
        const Icon = iconMap[category.icon] ?? Baby;

        return (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-[#253d79]/20 bg-[#fff7df] px-4 py-2 text-sm font-semibold text-[#253d79] shadow-sm transition-colors hover:border-[#efbd3a] hover:bg-[#fdce5b]/25",
              activeCategory === category.id &&
                "border-[#efbd3a] bg-[#fdce5b]/40 text-[#253d79]",
            )}
          >
            <Icon className="size-4 text-emerald-700" />
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
