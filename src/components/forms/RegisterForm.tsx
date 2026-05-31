"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { locations } from "@/data/dummy-products";
import { registerAction } from "@/lib/services/auth";

type RegisterFormProps = {
  redirectTo?: string;
};

function RegisterSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Mendaftarkan..." : "Daftar"}
      <ArrowRight />
    </Button>
  );
}

export function RegisterForm({ redirectTo = "/account" }: RegisterFormProps) {
  const [state, formAction] = useActionState(registerAction, { error: null });

  return (
    <form action={formAction} className="grid gap-4">
      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {state.error}
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          name="name"
          placeholder="Rina Lestari"
          autoComplete="name"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="rina@email.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          minLength={6}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Kecamatan</Label>
        <Select id="location" name="location" defaultValue="" required>
          <option value="" disabled>
            Pilih kecamatan
          </option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Nomor WhatsApp</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="0812..."
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </div>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <RegisterSubmitButton />
      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="font-bold text-foreground underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}
