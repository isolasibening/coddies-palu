"use client";

import { type ReactNode, useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { Category, ProductFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductFilterProps = {
  categories: Category[];
  locations: string[];
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  action?: ReactNode;
};

const emptyFilters: ProductFilters = {
  keyword: "",
  category: "",
  location: "",
  condition: "",
  status: "",
  priceRange: "",
  ageRange: "",
  sort: "newest",
};

export function ProductFilter({
  categories,
  locations,
  filters,
  onChange,
  action,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = [
    filters.category,
    filters.location,
    filters.condition,
    filters.status,
    filters.priceRange,
    filters.ageRange,
  ].filter(Boolean).length;

  function updateFilter(key: keyof ProductFilters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex items-center gap-2 text-base font-semibold lg:pointer-events-none"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
        >
          <SlidersHorizontal className="size-4" />
          Filter
          {activeCount > 0 ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs">
              {activeCount}
            </span>
          ) : null}
        </button>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "Tutup" : "Buka"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(emptyFilters)}
          >
            <RotateCcw />
            Reset
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "mt-4 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-1",
          isOpen ? "grid" : "hidden",
        )}
      >
        <div className="grid gap-2">
          <Label htmlFor="category">Kategori</Label>
          <Select
            id="category"
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="">Semua kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Lokasi</Label>
          <Select
            id="location"
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
          >
            <option value="">Semua lokasi</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Harga</Label>
          <Select
            id="price"
            value={filters.priceRange}
            onChange={(event) => updateFilter("priceRange", event.target.value)}
          >
            <option value="">Semua harga</option>
            <option value="under-300">Di bawah Rp300 rb</option>
            <option value="300-700">Rp300 rb - Rp700 rb</option>
            <option value="700-1200">Rp700 rb - Rp1,2 jt</option>
            <option value="above-1200">Di atas Rp1,2 jt</option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="condition">Kondisi</Label>
          <Select
            id="condition"
            value={filters.condition}
            onChange={(event) => updateFilter("condition", event.target.value)}
          >
            <option value="">Semua kondisi</option>
            <option value="Seperti Baru">Seperti Baru</option>
            <option value="Sangat Baik">Sangat Baik</option>
            <option value="Baik">Baik</option>
            <option value="Ada Minus Ringan">Ada Minus Ringan</option>
            <option value="Perlu Perbaikan">Perlu Perbaikan</option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="ageRange">Usia anak</Label>
          <Select
            id="ageRange"
            value={filters.ageRange}
            onChange={(event) => updateFilter("ageRange", event.target.value)}
          >
            <option value="">Semua usia</option>
            <option value="0">0 - 8 bulan</option>
            <option value="6">6 bulan - 3 tahun</option>
            <option value="1">1 - 4 tahun</option>
            <option value="2">2 - 5 tahun</option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <option value="">Semua status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Sedang Dinego">Sedang Dinego</option>
            <option value="Booking">Booking</option>
            <option value="Terjual">Terjual</option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sort">Urutkan</Label>
          <Select
            id="sort"
            value={filters.sort}
            onChange={(event) => updateFilter("sort", event.target.value)}
          >
            <option value="newest">Terbaru</option>
            <option value="lowest">Harga terendah</option>
            <option value="highest">Harga tertinggi</option>
          </Select>
        </div>

        {action ? <div className="grid gap-2">{action}</div> : null}
      </div>
    </aside>
  );
}
