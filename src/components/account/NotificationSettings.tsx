"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type NotificationKey =
  | "wishlist"
  | "savedSearch"
  | "myProducts"
  | "reviews"
  | "promo";

const storageKey = "coddies-notification-settings";

const options: Array<{
  key: NotificationKey;
  label: string;
  description: string;
}> = [
  {
    key: "wishlist",
    label: "Notifikasi wishlist",
    description: "Info barang yang kamu simpan.",
  },
  {
    key: "savedSearch",
    label: "Pencarian tersimpan",
    description: "Pengingat cek filter favorit.",
  },
  {
    key: "myProducts",
    label: "Produk saya",
    description: "Status dan aktivitas listing.",
  },
  {
    key: "reviews",
    label: "Review",
    description: "Info review baru.",
  },
  {
    key: "promo",
    label: "Promo Coddies",
    description: "Info kampanye dan tips.",
  },
];

const defaultSettings: Record<NotificationKey, boolean> = {
  wishlist: true,
  savedSearch: true,
  myProducts: true,
  reviews: true,
  promo: false,
};

export function NotificationSettings() {
  const [settings, setSettings] = useState<Record<NotificationKey, boolean>>(
    () => {
      if (typeof window === "undefined") {
        return defaultSettings;
      }

      const stored = window.localStorage.getItem(storageKey);
      if (!stored) {
        return defaultSettings;
      }

      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    },
  );
  const [saved, setSaved] = useState(false);

  function toggle(key: NotificationKey) {
    setSaved(false);
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  function saveSettings() {
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
    setSaved(true);
  }

  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <label
          key={option.key}
          className="flex items-start gap-3 rounded-xl border border-border bg-white/88 p-4"
        >
          <Checkbox
            checked={settings[option.key]}
            onChange={() => toggle(option.key)}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-semibold">{option.label}</span>
            <span className="text-sm text-muted-foreground">
              {option.description}
            </span>
          </span>
        </label>
      ))}
      <Button type="button" onClick={saveSettings}>
        Simpan Preferensi
      </Button>
      {saved ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Preferensi notifikasi tersimpan di perangkat ini.
        </p>
      ) : null}
    </div>
  );
}
