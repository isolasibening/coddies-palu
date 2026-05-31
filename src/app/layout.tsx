import type { Metadata } from "next";

import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Coddies - Teman Tumbuh si Kecil",
  description:
    "Marketplace lokal Palu untuk perlengkapan bayi dan balita preloved.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen safe-bottom">
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
