"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  return (
    <motion.p
      className={cn(className)}
      initial={{ filter: "blur(12px)", opacity: 0, y: 20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  );
}
