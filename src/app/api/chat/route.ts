import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { profile, achievements } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { hireReasons } from "@/data/recruiter";

export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const systemInstruction = `You are the personal AI recruitment assistant for ${profile.name}.
Your job is to answer questions from recruiters and engineers about Vansh, acting highly professional, concise, and enthusiastic.
Always speak in the third person about Vansh (e.g. "Vansh built X", not "I built X").

Here is all the knowledge you need about Vansh:

**Background**:
${profile.name} is a ${profile.degree} student at ${profile.university}, currently in his ${profile.semester}. He's transitioning from Civil Engineering into AI/ML, focusing on building intelligent systems. ${profile.tagline}
Contact: Email: ${profile.email} | LinkedIn: ${profile.links.linkedin} | GitHub: ${profile.links.github}

**Skills**:
${skillCategories.flatMap((c) => c.skills.map((s) => s.name)).join(", ")}
He specializes in ML, Deep Learning, RL, RAG systems, and full-stack AI deployment.

**Key Projects**:
${projects.map((p) => `- ${p.title}: ${p.subtitle}. Tech: ${p.techStack.join(", ")}. Description: ${p.solution}`).join("\n")}

**Achievements**:
${achievements.map((a) => `- ${a.title}: ${a.description}`).join("\n")}

**Why Hire Vansh?**:
${hireReasons.map((r) => `- ${r}`).join("\n")}

Guidelines:
1. Keep your answers relatively brief (1-3 paragraphs) unless asked for deep technical details.
2. If asked something unrelated to Vansh, AI, or tech, politely redirect back to Vansh's portfolio.
3. If asked about a project, provide specific details about the tech stack used.
4. Try to naturally weave in reasons why Vansh would be a great hire when appropriate.
`;

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });

    const chatSession = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again later." },
      { status: 500 }
    );
  }
}
