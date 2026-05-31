"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createReviewAction,
  type ReviewActionState,
} from "@/lib/services/reviews";

type ReviewFormProps = {
  productId: string;
};

const initialState: ReviewActionState = {
  error: null,
  success: null,
};

const ratingFields = [
  {
    name: "product_accuracy_rating",
    label: "Akurasi produk",
  },
  {
    name: "hygiene_rating",
    label: "Kebersihan",
  },
  {
    name: "communication_rating",
    label: "Komunikasi",
  },
  {
    name: "safety_rating",
    label: "Keamanan",
  },
];

const ratingOptions = [5, 4, 3, 2, 1];

function ReviewSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Mengirim..." : "Kirim Review"}
    </Button>
  );
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [state, formAction] = useActionState(createReviewAction, initialState);

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5"
    >
      <input type="hidden" name="product_id" value={productId} />
      <div>
        <h3 className="font-semibold">Beri review sederhana</h3>
        <p className="mt-1 hidden text-sm leading-5 text-muted-foreground sm:block">
          Bantu pembeli lain memahami pengalamanmu.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ratingFields.map((field) => (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select
              id={field.name}
              name={field.name}
              defaultValue="5"
              required
            >
              {ratingOptions.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="comment">Komentar</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Ceritakan pengalaman COD singkat."
          required
        />
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

      <ReviewSubmitButton />
    </form>
  );
}
