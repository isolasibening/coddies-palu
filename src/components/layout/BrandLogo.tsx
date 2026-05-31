import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/brand/coddies-mark.svg"
        alt=""
        width={40}
        height={40}
        priority={priority}
        aria-hidden="true"
        className={cn("h-9 w-9 shrink-0 object-contain", markClassName)}
      />
      <Image
        src="/brand/coddies-logo.svg"
        alt="Coddies"
        width={128}
        height={34}
        priority={priority}
        className={cn("h-6 w-auto shrink-0 object-contain sm:h-8", wordmarkClassName)}
      />
    </span>
  );
}
