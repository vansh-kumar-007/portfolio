"use client";

import { motion } from "framer-motion";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ label, title, description, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-16 text-center", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-violet-300">
        {label}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <ShinyText text={title} />
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
