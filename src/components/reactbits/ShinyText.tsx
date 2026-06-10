"use client";

import { cn } from "@/lib/utils";

type ShinyTextProps = {
  text: string;
  className?: string;
};

export function ShinyText({ text, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer",
        className,
      )}
    >
      {text}
    </span>
  );
}
