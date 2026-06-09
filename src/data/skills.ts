export type SkillCategory = {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Machine Learning",
    icon: "brain",
    skills: [
      { name: "Scikit-Learn", level: 90 },
      { name: "XGBoost", level: 85 },
      { name: "Feature Engineering", level: 88 },
      { name: "ML Pipelines", level: 87 },
    ],
  },
  {
    name: "Deep Learning",
    icon: "network",
    skills: [
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 75 },
      { name: "FaceNet", level: 85 },
      { name: "Computer Vision", level: 82 },
    ],
  },
  {
    name: "Reinforcement Learning",
    icon: "gamepad",
    skills: [
      { name: "Q-Learning", level: 85 },
      { name: "Deep Q-Networks", level: 88 },
      { name: "Multi-Agent RL", level: 82 },
      { name: "Gym Environments", level: 78 },
    ],
  },
  {
    name: "Data Science",
    icon: "chart",
    skills: [
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 90 },
      { name: "Data Analysis", level: 90 },
      { name: "Matplotlib", level: 85 },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Python", level: 92 },
      { name: "REST APIs", level: 88 },
      { name: "Uvicorn", level: 85 },
    ],
  },
  {
    name: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Streamlit", level: 90 },
    ],
  },
  {
    name: "Databases",
    icon: "database",
    skills: [
      { name: "SQL", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "Vector DBs", level: 78 },
      { name: "Qdrant", level: 72 },
    ],
  },
  {
    name: "MLOps",
    icon: "cloud",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Render Deploy", level: 85 },
      { name: "Vercel", level: 88 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    name: "Tools",
    icon: "wrench",
    skills: [
      { name: "Jupyter", level: 92 },
      { name: "Linux", level: 80 },
      { name: "LangChain", level: 78 },
      { name: "NLTK", level: 85 },
    ],
  },
];
