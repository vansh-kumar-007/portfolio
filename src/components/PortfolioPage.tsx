"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { PortfolioAssistant } from "@/components/chat/PortfolioAssistant";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { LiveHealth } from "@/components/sections/LiveHealth";
import { Projects } from "@/components/sections/Projects";
import { AILab } from "@/components/sections/AILab";
import { Timeline } from "@/components/sections/Timeline";
import { Stats } from "@/components/sections/Stats";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Recruiter } from "@/components/sections/Recruiter";
import { VisitorMap } from "@/components/sections/VisitorMap";
import { Contact } from "@/components/sections/Contact";

export function PortfolioPage() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <LiveHealth />
        <Projects />
        <AILab />
        <Timeline />
        <GitHubSection />
        <Recruiter />
        <VisitorMap />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <PortfolioAssistant />
    </>
  );
}
