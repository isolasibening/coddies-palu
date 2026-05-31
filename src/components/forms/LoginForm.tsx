"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/services/auth";

type LoginFormProps = {
  redirectTo?: string;
};

function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Memproses..." : "Masuk"}
      <ArrowRight />
    </Button>
  );
}

export function LoginForm({ redirectTo = "/account" }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, { error: null });

  return (
    <form action={formAction} className="grid gap-4">
      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {state.error}
        </div>
      ) : null}
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
          autoComplete="current-password"
          required
        />
      </div>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <LoginSubmitButton />
      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href={`/register?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="font-bold text-foreground underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}
