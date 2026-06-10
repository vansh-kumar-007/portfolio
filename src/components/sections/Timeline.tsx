"use client";

import { motion } from "framer-motion";
import { timelineEvents } from "@/data/timeline";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const typeColors = {
  education: "border-blue-500/50 bg-blue-500/10",
  project: "border-emerald-500/50 bg-emerald-500/10",
  skill: "border-cyan-500/50 bg-cyan-500/10",
  achievement: "border-amber-500/50 bg-amber-500/10",
  experience: "border-emerald-500/50 bg-emerald-500/10",
};

export function Timeline() {
  return (
    <section id="timeline" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Journey"
          title="Experience & Learning Timeline"
          description="From Civil Engineering student to AI builder — every milestone along the way."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative flex flex-col md:flex-row",
                  i % 2 === 0 ? "md:flex-row-reverse" : "",
                )}
              >
                <div className="hidden md:block md:w-1/2" />
                <div
                  className={cn(
                    "absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-emerald-500 bg-background md:left-1/2",
                  )}
                />
                <div
                  className={cn(
                    "ml-10 md:ml-0 md:w-1/2",
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                  )}
                >
                  <div
                    className={cn(
                      "inline-block rounded-lg border px-3 py-1 text-xs font-medium capitalize",
                      typeColors[event.type],
                    )}
                  >
                    {event.type}
                  </div>
                  <h3 className="mt-2 font-semibold">{event.title}</h3>
                  <p className="text-xs text-emerald-400">{event.year}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  {event.tags && (
                    <div className={cn("mt-3 flex flex-wrap gap-1.5", i % 2 === 0 ? "md:justify-end" : "")}>
                      {event.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="mb-8 text-center text-2xl font-bold">Certifications</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.id}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5"
              >
                <span className="text-xs uppercase tracking-wider text-emerald-400">{cert.issuer}</span>
                <p className="mt-2 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                  {cert.title}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
