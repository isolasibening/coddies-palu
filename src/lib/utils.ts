import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function makeWhatsAppLink(phone: string, productTitle: string) {
  const cleanedPhone = phone.replace(/\D/g, "").replace(/^0/, "62");
  const message = encodeURIComponent(
    `Halo, saya tertarik dengan ${productTitle} yang ada di Coddies. Apakah masih tersedia?`,
  );

  return `https://wa.me/${cleanedPhone}?text=${message}`;
}
