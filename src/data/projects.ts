export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  featured: boolean;
  problem: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  architecture: string;
  github: string;
  liveDemo?: string;
  apiDocs?: string;
  streamlit?: string;
  video?: string;
  kaggle?: string;
  screenshots: string[];
  thumbnail: string;
};

export const projects: Project[] = [
  {
    id: "cyber-arena",
    title: "CyberArena RL",
    subtitle: "Multi-Agent Reinforcement Learning for Adversarial Cybersecurity",
    category: "Reinforcement Learning",
    featured: true,
    problem:
      "Cybersecurity is an adversarial arms race — static rule-based defenses fail against evolving attack strategies. How can autonomous agents learn to attack and defend without hardcoded rules?",
    solution:
      "Built a full-stack multi-agent RL simulation where Red Team (attacker) and Blue Team (defender) DQN agents co-evolve in a pixel-art network environment. Deployed with React frontend, FastAPI backend, and Streamlit analytics dashboard.",
    results: [
      "Emergent attack/defense strategies from pure interaction",
      "Live gameplay powered by real PyTorch DQN models",
      "12 attack types × 12 defense types in network simulation",
      "Full production deployment across Vercel, Render, and Streamlit Cloud",
    ],
    metrics: [
      { label: "DQN Architecture", value: "29→128→128→12" },
      { label: "Attack Types", value: "12" },
      { label: "Defense Types", value: "12" },
      { label: "Deployment", value: "3 Platforms" },
    ],
    techStack: ["Python", "PyTorch", "DQN", "React", "FastAPI", "Streamlit", "NumPy"],
    architecture:
      "React Game (Vercel) → FastAPI Backend (Render) → Python RL Engine (DQN Attacker + DQN Defender + Network Environment) → Streamlit Dashboard",
    github: "https://github.com/vansh-kumar-007/cyber_arena-",
    liveDemo: "https://cyber-arena-delta.vercel.app/",
    apiDocs: "https://cyberarena-api.onrender.com/docs",
    streamlit: "https://cyber-arena.streamlit.app/",
    screenshots: [
      "/projects/cyber-arena/game_running.png",
      "/projects/cyber-arena/neural_network.png",
      "/projects/cyber-arena/game_over.png",
      "/projects/cyber-arena/dashboard.png",
      "/projects/cyber-arena/arsenal.png",
      "/projects/cyber-arena/logs_viewer.png",
    ],
    thumbnail: "/projects/cyber-arena/game_running.png",
  },
  {
    id: "face-recognition",
    title: "Face Recognition System",
    subtitle: "Real-Time Detection with FaceNet & Production API",
    category: "Computer Vision",
    featured: true,
    problem:
      "Organizations need reliable face recognition that can be extended dynamically — adding/removing identities without retraining from scratch.",
    solution:
      "Production-ready face recognition using FaceNet embeddings with MTCNN detection. Built FastAPI backend for inference and Streamlit UI for interaction, deployed on Render and Streamlit Cloud.",
    results: [
      "512-dimensional FaceNet embeddings with cosine similarity matching",
      "Dynamic person add/delete via REST API",
      "Perfect classification metrics on test set",
      "End-to-end cloud deployment with Swagger docs",
    ],
    metrics: [
      { label: "Accuracy", value: "100%" },
      { label: "Embedding Dim", value: "512" },
      { label: "Model", value: "FaceNet" },
      { label: "API Endpoints", value: "4" },
    ],
    techStack: ["Python", "FaceNet", "MTCNN", "FastAPI", "Streamlit", "OpenCV", "PyTorch"],
    architecture: "Streamlit UI → FastAPI Backend → FaceNet Model → Embedding Database → Prediction",
    github: "https://github.com/vansh-kumar-007/face-detection-app",
    liveDemo: "https://face-detection-app-x5aaubnswbi83pbpplxp3v.streamlit.app/",
    apiDocs: "https://face-detection-app-wgm4.onrender.com/docs",
    video: "https://www.youtube.com/watch?v=MllYlmUcvk0",
    screenshots: [
      "/projects/face-detection/predict.png",
      "/projects/face-detection/api_overview.png",
      "/projects/face-detection/add_person.png",
      "/projects/face-detection/list_people.png",
    ],
    thumbnail: "/projects/face-detection/predict.png",
  },
  {
    id: "dtu-academic",
    title: "DTU Academic Intelligence Platform",
    subtitle: "AI-Powered Examination Ecosystem Analytics",
    category: "Full Stack AI",
    featured: true,
    problem:
      "DTU students lack centralized, intelligent access to examination results, trends, and predictive insights across sessions and branches.",
    solution:
      "Building an AI-powered platform with automated result monitoring, analytics dashboards, RAG-based student assistant, and prediction of result declaration dates using FastAPI, Next.js, PostgreSQL, and Qdrant.",
    results: [
      "Automated result scraping and monitoring pipeline",
      "RAG-based AI assistant for student queries",
      "Analytics dashboard with historical trends",
      "Email and Telegram notification system (planned)",
    ],
    metrics: [
      { label: "Stack", value: "FastAPI + Next.js" },
      { label: "Vector DB", value: "Qdrant" },
      { label: "AI Layer", value: "LangChain" },
      { label: "Status", value: "Active Dev" },
    ],
    techStack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Qdrant", "LangChain", "BeautifulSoup"],
    architecture:
      "Next.js Frontend → FastAPI Backend → PostgreSQL + Qdrant Vector DB → LangChain RAG Pipeline → Scraping Engine",
    github: "https://github.com/vansh-kumar-007/dtu-academic-intelligence",
    screenshots: [
      "/projects/dtu-academic/homepage.png",
      "/projects/dtu-academic/cover.png",
    ],
    thumbnail: "/projects/dtu-academic/cover.png",
  },
  {
    id: "spam-classifier",
    title: "Spam Classifier",
    subtitle: "Production ML Pipeline for SMS/Email Classification",
    category: "Machine Learning",
    featured: true,
    problem:
      "Spam detection requires high precision to avoid false positives — legitimate messages marked as spam cause real harm to users.",
    solution:
      "End-to-end ML pipeline with TF-IDF + SVM after comparing Naive Bayes, Logistic Regression, and SVM. Deployed with FastAPI REST API and Streamlit frontend.",
    results: [
      "98% accuracy with 100% precision on test set",
      "Reusable preprocessing pipeline shared between training and API",
      "Live deployment with interactive Swagger documentation",
      "Confidence scores returned with every prediction",
    ],
    metrics: [
      { label: "Accuracy", value: "98%" },
      { label: "F1 Score", value: "0.93" },
      { label: "Dataset", value: "5,500+" },
      { label: "Model", value: "SVM + TF-IDF" },
    ],
    techStack: ["Python", "Scikit-learn", "NLTK", "FastAPI", "Streamlit", "TF-IDF"],
    architecture: "Streamlit UI → FastAPI Backend → SVM Model + TF-IDF Vectorizer",
    github: "https://github.com/vansh-kumar-007/Spam-Classifier",
    liveDemo: "https://spam-classifier-a4i5b83fnzxtpe8nwsqefy.streamlit.app/",
    apiDocs: "https://spam-classifier-ps0y.onrender.com/docs",
    screenshots: [
      "/projects/spam-classifier/ui.png",
      "/projects/spam-classifier/api_home.png",
      "/projects/spam-classifier/api_predict.png",
    ],
    thumbnail: "/projects/spam-classifier/ui.png",
  },
  {
    id: "project-nova",
    title: "Project Nova",
    subtitle: "Alternative Credit Scoring with Fairness Analysis",
    category: "Data Science",
    featured: false,
    problem:
      "Platform partners need fair, explainable credit scoring beyond traditional financial history — using activity signals like earnings, ratings, and trip patterns.",
    solution:
      "End-to-end ML pipeline generating 10,000+ synthetic partner records, training Linear/RandomForest/XGBoost models for Nova Score prediction with fairness metrics and mitigation strategies.",
    results: [
      "Synthetic dataset with 15+ behavioral features",
      "Multiple baseline models compared systematically",
      "Fairness analysis with mitigation applied",
      "Modular pipeline architecture for reproducibility",
    ],
    metrics: [
      { label: "Records", value: "10,000+" },
      { label: "Features", value: "15+" },
      { label: "Models", value: "3 Baselines" },
      { label: "Target", value: "Nova Score" },
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "XGBoost", "Jupyter", "Fairness Analysis", "Next.js"],
    architecture: "Data Generation → EDA → Feature Engineering → Model Training → Fairness Evaluation → Nova Score Dashboard (Vercel)",
    github: "https://github.com/vansh-kumar-007/project-nova",
    liveDemo: "https://nova-gig-score.vercel.app/",
    screenshots: [
      "/projects/project-nova/home.png",
      "/projects/project-nova/understanding.png",
      "/projects/project-nova/cover.png",
    ],
    thumbnail: "/projects/project-nova/cover.png",
  },
  {
    id: "college-analytics",
    title: "DTU Placements Analytics",
    subtitle: "Branch-wise CTC & Placement Statistics (2019–2025)",
    category: "Data Science",
    featured: true,
    problem:
      "No clean, structured DTU placement dataset existed publicly — students and researchers couldn't compare branch-wise placement trends, CTC growth, or program performance across academic years.",
    solution:
      "Built a Python scraping pipeline to extract official placement data from DTU's Training & Placement Cell (tnp.dtu.ac.in), structured 6 years of branch-wise statistics, and published the dataset on Kaggle with interactive dashboards for trend analysis and educational research.",
    results: [
      "192-row structured dataset covering 6 academic years (2019–2025)",
      "Branch-wise breakdown across B.Tech, M.Tech, and MBA programs",
      "Placement %, avg CTC, and max CTC columns for trend analysis",
      "Published on Kaggle — first clean DTU placement dataset of its kind",
      "Dashboards for salary growth, branch comparison, and outcome research",
    ],
    metrics: [
      { label: "Academic Years", value: "6" },
      { label: "Dataset Rows", value: "192" },
      { label: "Programs", value: "B.Tech+MBA" },
      { label: "Platform", value: "Kaggle" },
    ],
    techStack: ["Python", "Web Scraping", "Pandas", "Kaggle", "Data Visualization", "PDF Parsing"],
    architecture:
      "DTU T&P Website Scraping → Data Cleaning & Structuring → CSV Dataset → Kaggle Publication → Analytics Dashboards & Visualizations",
    github: "https://www.kaggle.com/datasets/vanshkumar007/dtu-placements-2019-2025",
    kaggle: "https://www.kaggle.com/datasets/vanshkumar007/dtu-placements-2019-2025",
    liveDemo: "https://www.kaggle.com/datasets/vanshkumar007/dtu-placements-2019-2025",
    screenshots: [
      "/projects/placement-analytics/activity.png",
      "/projects/placement-analytics/dataset.png",
      "/projects/placement-analytics/cover.png",
    ],
    thumbnail: "/projects/placement-analytics/cover.png",
  },
];
