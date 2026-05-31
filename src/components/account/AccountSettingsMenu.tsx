import {
  Bell,
  BookOpen,
  CircleHelp,
  ClipboardList,
  Heart,
  Home,
  Info,
  ListChecks,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Package,
  ReceiptText,
  Search,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

import { logoutAction } from "@/lib/services/auth";

import { SettingsItem } from "./SettingsItem";

const menuItems = [
  {
    href: "/account/settings#profile",
    label: "Profil Saya",
    description: "Nama, email, avatar",
    icon: UserRound,
  },
  {
    href: "/account/settings#contact",
    label: "Informasi Kontak",
    description: "WhatsApp utama",
    icon: Mail,
  },
  {
    href: "/account/settings#location",
    label: "Lokasi",
    description: "Kecamatan dan COD",
    icon: MapPin,
  },
  {
    href: "/account/security",
    label: "Keamanan Akun",
    description: "Password dan logout",
    icon: LockKeyhole,
  },
  {
    href: "/account/notifications",
    label: "Notifikasi",
    description: "Preferensi info",
    icon: Bell,
  },
  {
    href: "/account/products",
    label: "Barang Saya",
    description: "Listing dan status",
    icon: Package,
  },
  {
    href: "/wishlist",
    label: "Wishlist Saya",
    description: "Barang disimpan",
    icon: Heart,
  },
  {
    href: "/wishlist#saved-searches",
    label: "Pencarian Disimpan",
    description: "Filter favorit",
    icon: Search,
  },
  {
    href: "/account/transactions",
    label: "Transaksi Saya",
    description: "Catatan terjual",
    icon: ReceiptText,
  },
  {
    href: "/account/reviews",
    label: "Review Saya",
    description: "Diberikan dan diterima",
    icon: Star,
  },
  {
    href: "/help",
    label: "Bantuan",
    description: "FAQ Coddies",
    icon: CircleHelp,
  },
  {
    href: "/report",
    label: "Laporkan Masalah",
    description: "Produk, akun, bug",
    icon: ClipboardList,
  },
  {
    href: "/privacy-policy",
    label: "Kebijakan Privasi",
    description: "Data dan keamanan",
    icon: ShieldCheck,
  },
  {
    href: "/terms",
    label: "Syarat dan Ketentuan",
    description: "Aturan marketplace",
    icon: ListChecks,
  },
  {
    href: "/community-guidelines",
    label: "Panduan Komunitas",
    description: "Jual beli aman",
    icon: BookOpen,
  },
  {
    href: "/about",
    label: "Tentang Coddies",
    description: "Misi dan fokus",
    icon: Info,
  },
];

export function AccountSettingsMenu() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {menuItems.map((item) => (
          <SettingsItem key={item.label} {...item} />
        ))}
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white">
            <LogOut className="size-5" />
          </span>
          Keluar
        </button>
      </form>
    </div>
  );
}
