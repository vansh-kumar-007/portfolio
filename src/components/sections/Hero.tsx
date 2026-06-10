"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Aurora } from "@/components/reactbits/Aurora";
import { Particles } from "@/components/reactbits/Particles";
import { SplitText } from "@/components/reactbits/SplitText";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <Aurora />
      <Particles />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300"
          >
            <Sparkles className="h-4 w-4" />
            Open to AI/ML Engineering Opportunities
          </motion.div>

          <SplitText
            text={profile.headline}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          />

          <BlurText
            text={profile.title}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
            delay={0.6}
          />

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#projects">
              <Button>View Projects</Button>
            </a>
            <a href={profile.resumePath} download>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
            <a href="#contact">
              <Button variant="secondary">
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div>
              <p className="text-2xl font-bold text-foreground">
                <ShinyText text="15+" />
              </p>
              <p>Projects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                <ShinyText text="28" />
              </p>
              <p>GitHub Repos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                <ShinyText text="Top 100" />
              </p>
              <p>GrabHack</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 blur-3xl" />
          <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-white/10 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <Image
              src={profile.photoPath}
              alt={profile.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 288px, 384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-background/60 p-4 backdrop-blur-md">
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.university}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
