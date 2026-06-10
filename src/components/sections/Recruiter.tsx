"use client";

import { motion } from "framer-motion";
import { Rocket, Layers, Zap, Trophy, Shield, Users, CheckCircle2 } from "lucide-react";
import { recruiterHighlights, hireReasons } from "@/data/recruiter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

const iconMap = {
  rocket: Rocket,
  layers: Layers,
  zap: Zap,
  trophy: Trophy,
  shield: Shield,
  users: Users,
};

export function Recruiter() {
  return (
    <section id="hire" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="For Recruiters"
          title="Why Hire Vansh?"
          description="A candidate who ships production AI systems, learns at exceptional speed, and thinks like an engineer."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recruiterHighlights.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Rocket;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <SpotlightCard className="mt-12 p-8 md:p-12">
          <h3 className="text-center text-2xl font-bold">The Bottom Line</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {hireReasons.map((reason, i) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm text-muted-foreground">{reason}</span>
              </motion.div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
