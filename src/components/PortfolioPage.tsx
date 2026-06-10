"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { TerminalMode } from "@/components/layout/TerminalMode";
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

import { motion } from "framer-motion";
import { useRecruiterMode } from "@/components/context/RecruiterModeContext";

export function PortfolioPage() {
  const { isRecruiterMode } = useRecruiterMode();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <motion.main layout className="flex flex-col">
        <motion.div layout key="hero"><Hero /></motion.div>
        {isRecruiterMode && <motion.div layout key="recruiter-top"><Recruiter /></motion.div>}
        <motion.div layout key="about"><About /></motion.div>
        <motion.div layout key="stats"><Stats /></motion.div>
        <motion.div layout key="skills"><Skills /></motion.div>
        <motion.div layout key="live-health"><LiveHealth /></motion.div>
        <motion.div layout key="projects"><Projects /></motion.div>
        <motion.div layout key="ai-lab"><AILab /></motion.div>
        <motion.div layout key="timeline"><Timeline /></motion.div>
        <motion.div layout key="github"><GitHubSection /></motion.div>
        {!isRecruiterMode && <motion.div layout key="recruiter-bottom"><Recruiter /></motion.div>}
        <motion.div layout key="visitor-map"><VisitorMap /></motion.div>
        <motion.div layout key="contact"><Contact /></motion.div>
      </motion.main>
      <Footer />
      <CommandPalette />
      <PortfolioAssistant />
      <TerminalMode />
    </>
  );
}
