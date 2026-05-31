"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { locations } from "@/data/dummy-products";
import {
  type ProductEditActionState,
  updateProductDetailsAction,
} from "@/lib/services/product-management";
import type { Category, Product } from "@/lib/types";

type ProductEditFormProps = {
  product: Product;
  categories: Category[];
};

const initialState: ProductEditActionState = {
  error: null,
  success: null,
};

const conditions = [
  "Seperti Baru",
  "Sangat Baik",
  "Baik",
  "Ada Minus Ringan",
  "Perlu Perbaikan",
];

function ProductEditSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Produk"}
    </Button>
  );
}

export function ProductEditForm({ product, categories }: ProductEditFormProps) {
  const [state, formAction] = useActionState(
    updateProductDetailsAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="product_id" value={product.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="title">Nama barang</Label>
          <Input id="title" name="title" defaultValue={product.title} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category_id">Kategori</Label>
          <Select
            id="category_id"
            name="category_id"
            defaultValue={product.categoryId}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Harga</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="1"
            defaultValue={product.price}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="condition">Kondisi</Label>
          <Select
            id="condition"
            name="condition"
            defaultValue={product.condition}
            required
          >
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Kecamatan</Label>
          <Select
            id="location"
            name="location"
            defaultValue={product.location}
            required
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="brand">Merek</Label>
          <Input id="brand" name="brand" defaultValue={product.brand} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="age_range">Usia anak</Label>
          <Input id="age_range" name="age_range" defaultValue={product.ageRange} />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="whatsapp_number">Nomor WhatsApp</Label>
          <Input
            id="whatsapp_number"
            name="whatsapp_number"
            defaultValue={product.whatsappNumber ?? product.seller.phone}
            inputMode="tel"
            required
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={product.description}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="defects">Minus atau kerusakan</Label>
          <Textarea id="defects" name="defects" defaultValue={product.defects} />
        </div>
      </div>

      {state.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {state.success}
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {state.error}
        </p>
      ) : null}

      <ProductEditSubmitButton />
    </form>
  );
}
