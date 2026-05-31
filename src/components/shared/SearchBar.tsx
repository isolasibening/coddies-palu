"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  compact?: boolean;
  className?: string;
};

export function SearchBar({
  defaultValue = "",
  placeholder = "Cari barang bayi...",
  onSearch,
  compact = false,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValue = value.trim();

    if (onSearch) {
      onSearch(nextValue);
      return;
    }

    const query = nextValue ? `?q=${encodeURIComponent(nextValue)}` : "";
    router.push(`/products${query}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full items-center gap-2 rounded-2xl border border-border bg-white shadow-sm",
        compact ? "p-1.5" : "p-2.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 px-1">
        <Search className="size-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="h-10 min-w-0 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <Button type="submit" size={compact ? "sm" : "default"} className="shrink-0">
        Cari
      </Button>
    </form>
  );
}
