export type SkillCategory = {
  name: string;
  icon: string;
  skills: { name: string; level: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Machine Learning",
    icon: "brain",
    skills: [
      { name: "Scikit-Learn", level: "Expert" },
      { name: "XGBoost", level: "Master" },
      { name: "Feature Engineering", level: "Master" },
      { name: "ML Pipelines", level: "Master" },
    ],
  },
  {
    name: "Deep Learning",
    icon: "network",
    skills: [
      { name: "PyTorch", level: "Master" },
      { name: "TensorFlow", level: "Advanced" },
      { name: "FaceNet", level: "Master" },
      { name: "Computer Vision", level: "Professional" },
    ],
  },
  {
    name: "Reinforcement Learning",
    icon: "gamepad",
    skills: [
      { name: "Q-Learning", level: "Master" },
      { name: "Deep Q-Networks", level: "Master" },
      { name: "Multi-Agent RL", level: "Professional" },
      { name: "Gym Environments", level: "Advanced" },
    ],
  },
  {
    name: "Data Science",
    icon: "chart",
    skills: [
      { name: "Pandas", level: "Expert" },
      { name: "NumPy", level: "Expert" },
      { name: "Data Analysis", level: "Expert" },
      { name: "Matplotlib", level: "Master" },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      { name: "FastAPI", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "REST APIs", level: "Master" },
      { name: "Uvicorn", level: "Master" },
    ],
  },
  {
    name: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "Master" },
      { name: "Next.js", level: "Master" },
      { name: "TypeScript", level: "Master" },
      { name: "Streamlit", level: "Expert" },
    ],
  },
  {
    name: "Databases",
    icon: "database",
    skills: [
      { name: "SQL", level: "Professional" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "Vector DBs", level: "Advanced" },
      { name: "Qdrant", level: "Intermediate" },
    ],
  },
  {
    name: "MLOps",
    icon: "cloud",
    skills: [
      { name: "Git/GitHub", level: "Expert" },
      { name: "Render Deploy", level: "Master" },
      { name: "Vercel", level: "Master" },
      { name: "Docker", level: "Intermediate" },
    ],
  },
  {
    name: "Tools",
    icon: "wrench",
    skills: [
      { name: "Jupyter", level: "Expert" },
      { name: "Linux", level: "Professional" },
      { name: "LangChain", level: "Advanced" },
      { name: "NLTK", level: "Master" },
    ],
  },
];
