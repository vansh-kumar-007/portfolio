"use client";

import { motion } from "framer-motion";
import { GraduationCap, Brain, Route, Target } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

const journeySteps = [
  {
    icon: GraduationCap,
    year: "2023",
    title: "DTU Journey Begins",
    description:
      "Started B.Tech Civil Engineering at Delhi Technological University — building analytical foundations through structural analysis and engineering mathematics.",
  },
  {
    icon: Brain,
    year: "2023",
    title: "Discovery of AI",
    description:
      "Joined NeuralAI Society at DTU. Self-taught Python, discovered machine learning, and built first end-to-end projects beyond the classroom.",
  },
  {
    icon: Route,
    year: "2024–25",
    title: "The Transition",
    description:
      "Pivoted from Civil to AI — shipping production systems in computer vision, reinforcement learning, NLP, and RAG while maintaining engineering rigor.",
  },
  {
    icon: Target,
    year: "2026",
    title: "Current Roadmap",
    description:
      "Deep diving into agentic AI, RAG optimization, MLOps, and full-stack AI applications — targeting AI Engineer and ML Engineer roles.",
  },
];

const roadmap = [
  "Master transformer architectures & fine-tuning",
  "Production-grade RAG with hybrid retrieval",
  "Multi-agent systems & tool-use patterns",
  "MLOps: CI/CD, monitoring, model versioning",
  "Contribute to open-source AI projects",
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="About"
          title="From Civil Engineering to AI"
          description="An unconventional path driven by curiosity, self-learning, and a passion for building intelligent systems."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {journeySteps.map((step, i) => (
              <SpotlightCard key={step.title} className="p-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-violet-400">{step.year}</span>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold">Why AI?</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Civil engineering taught me to model complex systems, optimize under constraints, and
                think in first principles. AI felt like the natural evolution — instead of designing
                bridges, I design intelligent systems that learn, adapt, and solve problems at scale.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-muted-foreground">University</p>
                  <p className="font-medium">{profile.university}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-muted-foreground">CGPA</p>
                  <p className="font-medium">{profile.cgpa}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-muted-foreground">Degree</p>
                  <p className="font-medium">{profile.degree}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-muted-foreground">Graduation</p>
                  <p className="font-medium">{profile.graduation}</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold">Learning Roadmap</h3>
              <ul className="mt-4 space-y-3">
                {roadmap.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                      {i + 1}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
