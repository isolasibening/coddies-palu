import { AccountSettingsMenu } from "@/components/account/AccountSettingsMenu";
import { NotificationSettings } from "@/components/account/NotificationSettings";
import { SettingsSection } from "@/components/account/SettingsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { requireCurrentUser } from "@/lib/services/auth";

export const dynamic = "force-dynamic";

export default async function AccountNotificationsPage() {
  await requireCurrentUser("/account/notifications");

  return (
    <div className="container py-6 md:py-10">
      <SectionHeader
        eyebrow="Akun"
        title="Notifikasi"
        description="Preferensi disimpan lokal untuk MVP."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AccountSettingsMenu />
        </aside>
        <SettingsSection title="Preferensi notifikasi">
          <NotificationSettings />
        </SettingsSection>
      </div>
    </div>
  );
}
