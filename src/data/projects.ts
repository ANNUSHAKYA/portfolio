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
  },
  {
    id: "songmap",
    number: "04",
    name: "SONGMAP",
    category: "Music Discovery / Recommendation",
    description: "A music recommendation experience that explores songs through musical characteristics such as BPM, beats and instrumentation.",
    highlight: "Music + Recommendation + Interactive UI",
    technology: ["React", "Audio API", "Visualization"],
    live: "https://song-map-tau.vercel.app/",
  },
  {
    id: "gochat",
    number: "05",
    name: "GOCHAT",
    category: "Real-Time Chat API",
    description: "A real-time chat backend built with Go, featuring concurrent WebSocket communication, JWT authentication, role-based access control and persistent MongoDB message history.",
    highlight: "Real-Time + Concurrency + Authentication",
    technology: ["Go", "Gin", "WebSockets", "MongoDB", "JWT"],
  },
  {
    id: "secure-uav",
    number: "06",
    name: "SECURE UAV / IoT COMMUNICATION",
    category: "Research / AI / Cybersecurity",
    description: "A research-oriented secure task offloading and authentication system for UAV-enabled IoT communication.",
    highlight: "Research + Cybersecurity + Edge Computing",
    technology: ["HMAC-SHA256", "SHA-256", "Timestamp-based freshness", "IoT", "UAV", "Edge Computing"],
  }
];
