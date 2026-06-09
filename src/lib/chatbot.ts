import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { hireReasons } from "@/data/recruiter";
import { achievements } from "@/data/profile";

type ChatMessage = { role: "user" | "assistant"; content: string };

const knowledge = {
  about: `${profile.name} is a ${profile.degree} student at ${profile.university}, currently in his ${profile.semester}. He's transitioning from Civil Engineering into AI/ML, focusing on building intelligent systems. ${profile.tagline}`,
  skills: skillCategories.flatMap((c) => c.skills.map((s) => s.name)).join(", "),
  projects: projects.map((p) => `• ${p.title}: ${p.subtitle}`).join("\n"),
  hire: hireReasons.map((r) => `• ${r}`).join("\n"),
  achievements: achievements.map((a) => `• ${a.title}: ${a.description}`).join("\n"),
  contact: `Email: ${profile.email} | LinkedIn: ${profile.links.linkedin} | GitHub: ${profile.links.github}`,
};

function matchIntent(input: string): keyof typeof knowledge | "greeting" | "default" {
  const q = input.toLowerCase();
  if (/^(hi|hello|hey|greetings)/.test(q)) return "greeting";
  if (/about|who is|tell me about|background|introduce/.test(q)) return "about";
  if (/project|built|portfolio|work|demo/.test(q)) return "projects";
  if (/skill|tech|technolog|know|stack|python|pytorch|learn/.test(q)) return "skills";
  if (/hire|recruit|why should|strength|candidate|exceptional/.test(q)) return "hire";
  if (/achieve|hackathon|grabhack|award|certif/.test(q)) return "achievements";
  if (/contact|email|reach|linkedin|connect/.test(q)) return "contact";
  return "default";
}

export function getChatResponse(input: string): string {
  const intent = matchIntent(input);

  switch (intent) {
    case "greeting":
      return `Hello! I'm Vansh's portfolio assistant. Ask me about his projects, skills, background, or why you should hire him.`;
    case "about":
      return knowledge.about;
    case "projects":
      return `Here are Vansh's key projects:\n\n${knowledge.projects}\n\nEach includes live demos, GitHub repos, and production deployments. Ask about any specific project!`;
    case "skills":
      return `Vansh's technical skills include:\n\n${knowledge.skills}\n\nHe specializes in ML, Deep Learning, RL, RAG systems, and full-stack AI deployment with FastAPI, PyTorch, and React.`;
    case "hire":
      return `Why hire Vansh?\n\n${knowledge.hire}\n\n${knowledge.achievements}`;
    case "achievements":
      return knowledge.achievements;
    case "contact":
      return knowledge.contact;
    default:
      return `I can help with questions about Vansh's background, projects, skills, achievements, and contact info. Try asking "What projects has he built?" or "Why should I hire Vansh?"`;
  }
}

export function getInitialMessages(): ChatMessage[] {
  return [
    {
      role: "assistant",
      content:
        "Hi! I'm Vansh's AI assistant. Ask me anything about his projects, skills, or background.",
    },
  ];
}
