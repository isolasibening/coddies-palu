import Link from "next/link";

import { LoginForm } from "@/components/forms/LoginForm";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Card, CardContent } from "@/components/ui/card";

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirectTo ?? "/account";
  const registered = params.registered === "1";

  return (
    <div className="container grid min-h-[calc(100vh-10rem)] place-items-center py-6 sm:py-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-5 sm:p-6">
          <Link href="/" aria-label="Coddies">
            <BrandLogo priority />
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Masuk</h1>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Lanjutkan wishlist dan barangmu.
          </p>
          {registered ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
              Pendaftaran berhasil. Silakan masuk untuk lanjut.
            </div>
          ) : null}
          <div className="mt-5 sm:mt-6">
            <LoginForm redirectTo={redirectTo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
