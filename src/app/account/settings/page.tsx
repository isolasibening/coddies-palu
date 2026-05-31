import Link from "next/link";

import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { ProfileForm } from "@/components/account/ProfileForm";
import { SettingsSection } from "@/components/account/SettingsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/services/auth";
import { getAccountProfile } from "@/lib/services/profile";

export const dynamic = "force-dynamic";

export default async function AccountSettingsPage() {
  const user = await requireCurrentUser("/account/settings");
  const profile = await getAccountProfile(user);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Pengaturan"
        title="Profil Saya"
        description="Data akun, kontak, dan lokasi COD."
        action={
          <Button asChild variant="outline">
            <Link href="/account">Kembali</Link>
          </Button>
        }
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        <SettingsSection
          title="Data profil"
          description="Email mengikuti akun Supabase Auth dan tidak bisa diedit di sini."
        >
          <ProfileForm profile={profile} />
        </SettingsSection>
      </div>
    </div>
  );
}
