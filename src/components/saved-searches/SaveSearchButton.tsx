"use client";

import { useActionState } from "react";
import { BookmarkPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createSavedSearchAction,
  type SavedSearchActionState,
} from "@/lib/services/saved-searches";
import type { ProductFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

type SaveSearchButtonProps = {
  filters: ProductFilters;
  className?: string;
};

const initialState: SavedSearchActionState = {
  error: null,
  success: null,
};

function getMaxPrice(priceRange: string) {
  if (priceRange === "under-300") {
    return "300000";
  }

  if (priceRange === "300-700") {
    return "700000";
  }

  if (priceRange === "700-1200") {
    return "1200000";
  }

  return "";
}

export function SaveSearchButton({
  filters,
  className,
}: SaveSearchButtonProps) {
  const [state, formAction, pending] = useActionState(
    createSavedSearchAction,
    initialState,
  );

  return (
    <form action={formAction} className={cn("grid gap-2", className)}>
      <input type="hidden" name="keyword" value={filters.keyword} />
      <input type="hidden" name="category_id" value={filters.category} />
      <input type="hidden" name="location" value={filters.location} />
      <input
        type="hidden"
        name="max_price"
        value={getMaxPrice(filters.priceRange)}
      />
      <input type="hidden" name="redirect_to" value="/products" />
      <Button type="submit" variant="outline" disabled={pending}>
        <BookmarkPlus />
        {pending ? "Menyimpan..." : "Simpan Pencarian"}
      </Button>
      {state.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
          {state.success}
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
