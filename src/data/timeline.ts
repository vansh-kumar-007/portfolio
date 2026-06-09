export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  type: "education" | "project" | "skill" | "achievement" | "experience";
  tags?: string[];
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    title: "Started B.Tech at DTU",
    description: "Began Civil Engineering at Delhi Technological University with curiosity for technology.",
    type: "education",
    tags: ["DTU", "Civil Engineering"],
  },
  {
    year: "2023",
    title: "Discovered AI/ML",
    description:
      "Joined NeuralAI Society — first exposure to machine learning, deep learning, and Python ecosystems.",
    type: "skill",
    tags: ["Python", "NeuralAI Society"],
  },
  {
    year: "2023",
    title: "First ML Projects",
    description: "Built spam classifier and foundational data science projects with end-to-end pipelines.",
    type: "project",
    tags: ["Scikit-learn", "NLP"],
  },
  {
    year: "2024",
    title: "Face Recognition System",
    description: "Deployed production FaceNet system with FastAPI + Streamlit on cloud infrastructure.",
    type: "project",
    tags: ["Computer Vision", "FaceNet", "FastAPI"],
  },
  {
    year: "2024",
    title: "GrabHack — Top 100",
    description: "Qualified multiple rounds and ranked Top 100 among 4,000+ teams nationally.",
    type: "achievement",
    tags: ["Hackathon", "Top 100"],
  },
  {
    year: "2024",
    title: "CyberArena RL",
    description: "Built multi-agent DQN cybersecurity simulation with full-stack deployment.",
    type: "project",
    tags: ["PyTorch", "DQN", "React"],
  },
  {
    year: "2024",
    title: "Co-Head PR, Sports Council",
    description: "Leadership role managing communications for DTU Sports Council.",
    type: "experience",
    tags: ["Leadership", "DTU"],
  },
  {
    year: "2025",
    title: "DTU Academic Intelligence",
    description: "Started AI platform with RAG, analytics, and automated result monitoring.",
    type: "project",
    tags: ["RAG", "LangChain", "FastAPI"],
  },
  {
    year: "2025",
    title: "Project Nova",
    description: "Alternative credit scoring with fairness analysis and synthetic data generation.",
    type: "project",
    tags: ["XGBoost", "Fairness ML"],
  },
  {
    year: "2026",
    title: "Portfolio & Agentic AI",
    description: "Deep diving into RAG systems, agentic AI, MLOps, and full-stack AI applications.",
    type: "skill",
    tags: ["RAG", "Agentic AI", "MLOps"],
  },
];
