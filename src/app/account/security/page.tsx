import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { SecuritySettings } from "@/components/account/SecuritySettings";
import { SettingsSection } from "@/components/account/SettingsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { requireCurrentUser } from "@/lib/services/auth";
import { getAccountProfile } from "@/lib/services/profile";

export const dynamic = "force-dynamic";

export default async function AccountSecurityPage() {
  const user = await requireCurrentUser("/account/security");
  const profile = await getAccountProfile(user);

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Keamanan Akun"
        description="Reset password dan logout dengan Supabase Auth."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        <SettingsSection title="Keamanan sederhana">
          <SecuritySettings email={profile.email} />
        </SettingsSection>
      </div>
    </div>
  );
}
