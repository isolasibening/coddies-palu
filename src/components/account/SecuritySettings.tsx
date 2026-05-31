import { Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logoutAction, sendPasswordResetAction } from "@/lib/services/auth";

type SecuritySettingsProps = {
  email: string;
};

export function SecuritySettings({ email }: SecuritySettingsProps) {
  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-border bg-white/88 p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#fdce5b]/35 text-[#253d79]">
            <Mail className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Email akun</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white/88 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 text-emerald-700" />
          <p className="text-sm leading-5 text-muted-foreground">
            Gunakan password yang tidak dipakai di aplikasi lain. Link reset akan
            dikirim lewat Supabase Auth ke email akunmu.
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <form action={sendPasswordResetAction}>
          <Button type="submit" variant="outline" className="w-full">
            Ubah password
          </Button>
        </form>
        <form action={logoutAction}>
          <Button type="submit" variant="secondary" className="w-full">
            Logout dari akun
          </Button>
        </form>
      </div>
    </div>
  );
}
