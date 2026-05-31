import Link from "next/link";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Card, CardContent } from "@/components/ui/card";

type RegisterPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirectTo ?? "/account";

  return (
    <div className="container grid min-h-[calc(100vh-10rem)] place-items-center py-6 sm:py-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-5 sm:p-6">
          <Link href="/" aria-label="Coddies">
            <BrandLogo priority />
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Daftar</h1>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Buat akun untuk jual dan wishlist.
          </p>
          <div className="mt-5 sm:mt-6">
            <RegisterForm redirectTo={redirectTo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
