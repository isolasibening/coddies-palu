import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-white/82">
      <div className="container py-8">
        <Link href="/" aria-label="Coddies">
          <BrandLogo markClassName="h-10 w-10" wordmarkClassName="h-9" />
        </Link>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Cari dan jual perlengkapan bayi preloved di Palu.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © 2026 Coddies. Teman Tumbuh si Kecil.
        </p>
      </div>
    </footer>
  );
}
