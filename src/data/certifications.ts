export type Certification = {
  id: string;
  title: string;
  issuer: string;
  file: string;
  category: "ai" | "engineering" | "design" | "other";
};

export const certifications: Certification[] = [
  {
    id: "python",
    title: "Certificate of Excellence in Python Course",
    issuer: "Scaler",
    file: "/certificates/Certificate-of-Excellence-in-Python-Course.png",
    category: "ai",
  },
  {
    id: "cpp",
    title: "Certificate of Excellence in C++ Course",
    issuer: "Scaler",
    file: "/certificates/Certificate-of-Excellence-in-Cpp-Course.png",
    category: "engineering",
  },
  {
    id: "ml-stackoverflow",
    title: "Predicting Tags for StackOverflow using Machine Learning",
    issuer: "Scaler",
    file: "/certificates/Certificate-of-Excellence-in-Predicting-Tags-For-Stackoverflow-using-Machine-Learning.png",
    category: "ai",
  },
  {
    id: "coding-essentials",
    title: "Coding Essentials & Logic Building",
    issuer: "Scaler",
    file: "/certificates/Certificate-of-Excellence-in-Coding-Essentials-Logic-Building.png",
    category: "engineering",
  },
  {
    id: "cyber-security",
    title: "Certificate of Excellence in Cyber Security",
    issuer: "Credly",
    file: "/certificates/Certificate-of-Excellence-in-Cyber-Security.pdf",
    category: "ai",
  },
  {
    id: "instagram-design",
    title: "Instagram System Design Course",
    issuer: "Scaler",
    file: "/certificates/Certificate-of-Excellence-in-Instagram-System-Design-Course.png",
    category: "engineering",
  },
  {
    id: "revit-mep",
    title: "Revit MEP Essentials for Beginners",
    issuer: "SourceCAD",
    file: "/certificates/revit-mep-essentials-for-beginners-certificate.pdf",
    category: "design",
  },
  {
    id: "sketchup",
    title: "SketchUp Fundamentals (Desktop)",
    issuer: "Trimble",
    file: "/certificates/Certificate-Of-Achievement-in-SketchUp-Fundamentals-Desktop-.pdf",
    category: "design",
  },
  {
    id: "robot-structural",
    title: "Robot Structural Analysis Essentials",
    issuer: "Autodesk",
    file: "/certificates/Certificate-Of-Excellence-in-Robots-structural-analysis-essentials-course.pdf",
    category: "engineering",
  },
  {
    id: "architecture",
    title: "Architecture Building from Reference",
    issuer: "Professional Development",
    file: "/certificates/Certificate-of-achievement-in-Architecture-Building-from-Refrence.pdf",
    category: "design",
  },
  {
    id: "jmes-internship",
    title: "Internship Certificate — JMES",
    issuer: "JMES",
    file: "/certificates/Certificate-of-internship-with-JMES.pdf",
    category: "other",
  },
];
