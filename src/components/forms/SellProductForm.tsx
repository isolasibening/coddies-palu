"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { locations } from "@/data/dummy-products";
import { createProductAction } from "@/lib/services/product-upload";
import type { Category } from "@/lib/types";

type SellProductFormProps = {
  categories: Category[];
};

const extraPhotoSlots = [1, 2, 3, 4, 5];

export function SellProductForm({ categories }: SellProductFormProps) {
  const [state, formAction] = useActionState(createProductAction, {
    error: null,
  });

  return (
    <form action={formAction} className="grid gap-4 sm:gap-5">
      {state.error ? (
        <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-800 sm:p-4">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-bold">Produk belum bisa disimpan.</p>
            <p className="mt-1 text-sm leading-5">{state.error}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 sm:p-4">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-bold">Siapkan foto asli.</p>
            <p className="mt-1 text-sm leading-5">
              Lengkapi data wajib dan minimal 1 foto.
            </p>
          </div>
        </div>
      )}

      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-semibold">Informasi Barang</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="title">Nama barang</Label>
            <Input
              id="title"
              name="title"
              placeholder="Contoh: Stroller Cocolatte ringan"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Select id="category" name="category_id" defaultValue="" required>
              <option value="" disabled>
                {categories.length > 0
                  ? "Pilih kategori"
                  : "Kategori belum tersedia"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="brand">Merek</Label>
            <Input
              id="brand"
              name="brand"
              placeholder="Contoh: Joie, IKEA, BabySafe"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="age">Usia anak</Label>
            <Input
              id="age"
              name="age_range"
              placeholder="Contoh: 6 bulan - 3 tahun"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Pemakaian, kelengkapan, alasan dijual."
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-semibold">Kondisi dan Harga</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="condition">Kondisi barang</Label>
            <Select id="condition" name="condition" defaultValue="" required>
              <option value="" disabled>
                Pilih kondisi
              </option>
              <option>Seperti Baru</option>
              <option>Sangat Baik</option>
              <option>Baik</option>
              <option>Ada Minus Ringan</option>
              <option>Perlu Perbaikan</option>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Harga</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="850000"
              min="1"
              required
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="defects">Minus atau kerusakan</Label>
            <Textarea
              id="defects"
              name="defects"
              placeholder="Contoh: lecet kecil, tidak mengganggu."
            />
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/45 p-3 text-sm">
            <Checkbox name="is_negotiable" defaultChecked />
            <span>
              <span className="block font-semibold">Bisa nego</span>
              <span className="hidden text-muted-foreground sm:inline">
                Terbuka diskusi harga.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/45 p-3 text-sm">
            <Checkbox name="is_trade_allowed" />
            <span>
              <span className="block font-semibold">Bisa tukar tambah</span>
              <span className="hidden text-muted-foreground sm:inline">
                Opsional.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-semibold">Lokasi dan Kontak</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="location">Kecamatan</Label>
            <Select id="location" name="location" defaultValue="" required>
              <option value="" disabled>
                Pilih lokasi
              </option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="areaDetail">Area detail</Label>
            <Input
              id="areaDetail"
              name="area_detail"
              placeholder="Contoh: dekat Lapangan Vatulemo"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp_number"
              placeholder="0812..."
              inputMode="tel"
              required
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-semibold">Foto Produk</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Minimal 1 foto. Foto tambahan boleh dikosongkan.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="mainPhoto">Foto utama</Label>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-input bg-white px-3 text-sm text-muted-foreground shadow-sm">
              <ImagePlus className="size-4" />
              <Input
                id="mainPhoto"
                name="main_photo"
                type="file"
                accept="image/*"
                className="h-auto border-0 p-0 shadow-none file:mr-3 file:rounded-xl file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-semibold"
              />
            </div>
          </div>

          <div className="grid gap-3 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold">Foto tambahan</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Maksimal 5 foto tambahan, semuanya opsional.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {extraPhotoSlots.map((slot) => (
                <div key={slot} className="grid gap-2">
                  <Label htmlFor={`extraPhoto${slot}`}>
                    Foto tambahan {slot}
                  </Label>
                  <div className="flex h-11 items-center gap-2 rounded-xl border border-input bg-white px-3 text-sm text-muted-foreground shadow-sm">
                    <ImagePlus className="size-4" />
                    <Input
                      id={`extraPhoto${slot}`}
                      name="extra_photos"
                      type="file"
                      accept="image/*"
                      className="h-auto border-0 p-0 shadow-none file:mr-3 file:rounded-xl file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SellProductSubmitButton />
    </form>
  );
}

function SellProductSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={pending}>
      {pending ? "Menyimpan produk..." : "Simpan Produk"}
    </Button>
  );
}
