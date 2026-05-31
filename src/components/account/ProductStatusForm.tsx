"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { productStatusOptions } from "@/lib/product-status";
import {
  type ProductStatusActionState,
  updateProductStatusAction,
} from "@/lib/services/product-status";
import type { ProductLifecycleStatus } from "@/lib/types";

type ProductStatusFormProps = {
  productId: string;
  currentStatus: ProductLifecycleStatus;
};

const initialState: ProductStatusActionState = {
  error: null,
  success: null,
  status: null,
};

function StatusSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" size="sm" disabled={pending}>
      {pending ? "Menyimpan..." : "Ubah"}
    </Button>
  );
}

export function ProductStatusForm({
  productId,
  currentStatus,
}: ProductStatusFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    updateProductStatusAction,
    initialState,
  );

  useEffect(() => {
    if (state.status) {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <div className="grid gap-2">
      <form
        action={formAction}
        className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-white p-2 shadow-sm"
      >
        <input type="hidden" name="product_id" value={productId} />
        <Select
          name="status"
          defaultValue={state.status ?? currentStatus}
          aria-label="Ubah status produk"
          className="h-9 min-w-0 flex-1"
        >
          {productStatusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
        <StatusSubmitButton />
      </form>
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
    </div>
  );
}
