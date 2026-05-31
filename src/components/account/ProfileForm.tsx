"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { locations } from "@/data/dummy-products";
import { defaultAvatarOptions } from "@/lib/avatar-options";
import {
  type AccountProfile,
  type ProfileActionState,
  updateProfileAction,
} from "@/lib/services/profile";

type ProfileFormProps = {
  profile: AccountProfile;
};

const initialState: ProfileActionState = {
  error: null,
  success: null,
};

function ProfileSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfileAction, initialState);
  const currentAvatar = profile.avatarUrl || defaultAvatarOptions[0];

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="user_id" value={profile.id} />
      <input type="hidden" name="current_avatar_url" value={profile.avatarUrl} />

      <div id="profile" className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-3 sm:col-span-2">
          <Label>Foto profil/avatar</Label>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/88 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentAvatar}
              alt=""
              className="size-16 rounded-full border border-border bg-white object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Pilih avatar atau upload foto</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload gambar maksimal 2 MB.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:max-w-sm">
            {defaultAvatarOptions.map((avatar, index) => (
              <label
                key={avatar}
                className="cursor-pointer rounded-2xl border border-border bg-white/88 p-2 has-[:checked]:border-[#fdce5b] has-[:checked]:bg-[#fff7df]"
              >
                <input
                  type="radio"
                  name="avatar_default"
                  value={avatar}
                  defaultChecked={profile.avatarUrl === avatar}
                  className="sr-only"
                  aria-label={`Avatar default ${index + 1}`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt=""
                  className="aspect-square w-full rounded-full object-cover"
                />
              </label>
            ))}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="avatar_file">Upload foto profil</Label>
            <Input
              id="avatar_file"
              name="avatar_file"
              type="file"
              accept="image/*"
              className="file:mr-3 file:rounded-xl file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-semibold"
            />
          </div>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="name">Nama lengkap</Label>
          <Input id="name" name="name" defaultValue={profile.name} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={profile.email} readOnly />
        </div>
      </div>

      <div id="contact" className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Nomor telepon/WhatsApp</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={profile.phone === "-" ? "" : profile.phone}
            inputMode="tel"
            required
          />
        </div>
      </div>

      <div id="location" className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="location">Alamat/Kecamatan</Label>
          <Select
            id="location"
            name="location"
            defaultValue={
              locations.includes(profile.location) ? profile.location : ""
            }
            required
          >
            <option value="" disabled>
              Pilih alamat/kecamatan
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {state.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {state.success}
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {state.error}
        </p>
      ) : null}

      <ProfileSubmitButton />
    </form>
  );
}
