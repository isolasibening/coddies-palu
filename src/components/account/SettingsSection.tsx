import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type SettingsSectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsSection({
  id,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section id={id}>
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
