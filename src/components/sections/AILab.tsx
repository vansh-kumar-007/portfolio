"use client";

import { motion } from "framer-motion";
import { FlaskConical, Compass } from "lucide-react";
import { aiLabExperiments, currentlyExploring } from "@/data/ai-lab";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/utils";

const statusColors = {
  exploring: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  active: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  completed: "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

export function AILab() {
  return (
    <section id="ai-lab" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="AI Lab"
          title="Experiments & Research"
          description="Ongoing explorations at the frontier of AI — from reinforcement learning to agentic systems."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {aiLabExperiments.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-start justify-between">
                    <FlaskConical className="h-5 w-5 text-cyan-400" />
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-xs capitalize",
                        statusColors[exp.status],
                      )}
                    >
                      {exp.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{exp.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <SpotlightCard className="p-8">
            <div className="flex items-center gap-3">
              <Compass className="h-6 w-6 text-violet-400" />
              <h3 className="text-xl font-bold">Currently Exploring</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {currentlyExploring.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
