"use client";

import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  title: string;
  description: string;
  triggerLabel: string;
  children: ReactNode;
};

export function ConfirmDialog({
  title,
  description,
  triggerLabel,
  children,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 xl:w-auto"
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>
      {open ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#253d79]/35 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              {description}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
