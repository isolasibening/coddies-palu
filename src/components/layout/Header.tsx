"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, UserRound } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Cari Barang" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account", label: "Akun" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="Coddies">
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-[#fdce5b]/25 hover:text-[#253d79]",
                  isActive && "bg-[#fdce5b]/35 text-[#253d79] shadow-sm",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Cari barang"
          >
            <Link href="/products">
              <Search />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex md:hidden"
            aria-label="Wishlist"
          >
            <Link href="/wishlist">
              <Heart />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex md:hidden"
            aria-label="Akun"
          >
            <Link href="/account">
              <UserRound />
            </Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/sell">Jual Barang</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
