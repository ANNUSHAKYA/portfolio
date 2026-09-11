export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  highlight: string;
  technology: string[];
  live?: string;
  github?: string;
  isHero?: boolean;
}

export const projects: Project[] = [
  {
    id: "promptvault",
    number: "01",
    name: "PROMPTVAULT",
    category: "AI Marketplace / SaaS",
    description: "An AI marketplace for discovering, organizing and using high-quality prompts. Designed as a modern platform for people working with generative AI.",
    highlight: "AI + Marketplace + Full Stack",
    technology: ["React", "Next.js", "JavaScript", "APIs", "Database"],
    live: "https://promptvaulto.in/",
    isHero: true,
  },
  {
    id: "clinico",
    number: "02",
    name: "CLINICO",
    category: "AI-Enabled Healthcare Management System",
    description: "An AI-enabled healthcare appointment management platform designed to simplify patient and healthcare workflow management.",
    highlight: "Healthcare + AI + Full Stack",
    technology: ["React", "APIs", "Database", "AI integration"],
    live: "https://clinico-health-care-appointment-man-nine.vercel.app/",
  },
  {
    id: "divadrip",
    number: "03",
    name: "DIVADRIP",
    category: "E-Commerce / Fashion",
    description: "A modern fashion e-commerce website focused on presenting products through a visually engaging shopping experience.",
    highlight: "E-Commerce + UI/UX + Responsive Design",
    technology: ["React", "Tailwind CSS", "Next.js", "E-Commerce"],
    live: "https://divadrip.vercel.app/",
  },
  {
    id: "revive",
    number: "04",
    name: "REVIVE",
    category: "Healthcare / Physiotherapy & Rehab",
    description: "A comprehensive digital web platform for Revive Physiotherapy & Rehabilitation Center, showcasing specialized treatments, clinic expertise, patient recovery pathways, and direct appointment booking.",
    highlight: "Healthcare + Clinic Platform + Modern UI/UX",
    technology: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    live: "https://physiotherapist-orcin.vercel.app/",
  },
  {
    id: "songmap",
    number: "05",
    name: "SONGMAP",
    category: "Music Discovery / Recommendation",
    description: "A music recommendation experience that explores songs through musical characteristics such as BPM, beats and instrumentation.",
    highlight: "Music + Recommendation + Interactive UI",
    technology: ["React", "Audio API", "Visualization"],
    live: "https://song-map-tau.vercel.app/",
  }
];
