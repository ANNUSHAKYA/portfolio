export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: "fullstack",
    number: "01",
    title: "FULL-STACK WEB DEVELOPMENT",
    description: "Build complete responsive web applications from frontend to backend.",
    includes: [
      "React / Next.js",
      "Node.js / Express",
      "Go",
      "REST APIs",
      "MongoDB / SQL",
      "Authentication",
      "Deployment"
    ]
  },
  {
    id: "ai",
    number: "02",
    title: "AI-POWERED APPLICATIONS",
    description: "Turn AI ideas into usable products.",
    includes: [
      "AI API integration",
      "AI workflows",
      "Prompt-based applications",
      "AI dashboards",
      "AI automation",
      "Intelligent product features"
    ]
  },
  {
    id: "business",
    number: "03",
    title: "BUSINESS WEBSITES",
    description: "Modern websites for startups, creators and businesses.",
    includes: [
      "Responsive design",
      "Landing pages",
      "Business websites",
      "Conversion-focused UI",
      "SEO-friendly structure"
    ]
  },
  {
    id: "custom",
    number: "04",
    title: "CUSTOM WEB APPLICATIONS",
    description: "Build custom platforms around a client's business requirements.",
    includes: [
      "Dashboards",
      "SaaS products",
      "Authentication",
      "APIs",
      "Database systems",
      "Admin panels"
    ]
  },
  {
    id: "api",
    number: "05",
    title: "API & BACKEND DEVELOPMENT",
    description: "Build secure and scalable backend systems.",
    includes: [
      "REST APIs",
      "JWT authentication",
      "Role-based access",
      "WebSockets",
      "MongoDB",
      "Go / Node.js"
    ]
  },
  {
    id: "redesign",
    number: "06",
    title: "WEBSITE REDESIGN & MODERNIZATION",
    description: "Transform outdated websites into modern responsive experiences.",
    includes: [
      "UI/UX overhaul",
      "Performance optimization",
      "Mobile responsiveness",
      "Tech stack upgrade",
      "Design systems"
    ]
  }
];
