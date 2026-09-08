export interface Technology {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "ai";
  description: string;
}

export const technologies: Technology[] = [
  {
    name: "JavaScript",
    category: "frontend",
    description: "Modern ES6+ development for dynamic, reactive web interfaces and interactive client logic."
  },
  {
    name: "React",
    category: "frontend",
    description: "Component architecture, hooks, state management, and performant interactive client UI."
  },
  {
    name: "Next.js",
    category: "frontend",
    description: "Production full-stack framework with App Router, SSR, SSG, server actions, and edge rendering."
  },
  {
    name: "Node.js",
    category: "backend",
    description: "Event-driven asynchronous server runtimes for high-throughput microservices and APIs."
  },
  {
    name: "Express.js",
    category: "backend",
    description: "Minimalist, robust HTTP routing, custom middleware architecture, and REST API services."
  },
  {
    name: "Go",
    category: "backend",
    description: "High-concurrency compiled backend services, goroutines, and low-latency systems."
  },
  {
    name: "Gin",
    category: "backend",
    description: "High-performance Go web framework for ultra-fast, memory-efficient HTTP services."
  },
  {
    name: "Python",
    category: "backend",
    description: "Backend scripting, automated pipelines, machine learning integration, and AI logic."
  },
  {
    name: "MongoDB",
    category: "database",
    description: "Scalable NoSQL document databases, indexing, schema modeling, and aggregation pipelines."
  },
  {
    name: "MySQL",
    category: "database",
    description: "Relational database modeling, complex SQL queries, migrations, and ACID transactional integrity."
  },
  {
    name: "REST APIs",
    category: "backend",
    description: "Production API design, secure endpoints, comprehensive status handling, and payload optimization."
  },
  {
    name: "WebSockets",
    category: "backend",
    description: "Full-duplex real-time bidirectional communication for live chat, feeds, and event streaming."
  },
  {
    name: "JWT",
    category: "tools",
    description: "Stateless security, token-based authentication, refresh rotation, and role-based access control."
  },
  {
    name: "Git",
    category: "tools",
    description: "Distributed version control, branching workflows, trunk-based development, and rebase strategies."
  },
  {
    name: "GitHub",
    category: "tools",
    description: "Collaborative code reviews, automated CI/CD GitHub Actions, and repository governance."
  },
  {
    name: "Vercel",
    category: "tools",
    description: "Optimized Next.js edge deployments, serverless functions, and global CDN asset distribution."
  },
  {
    name: "Railway",
    category: "tools",
    description: "Cloud container deployment, backend service orchestration, and automated environment provisioning."
  },
  {
    name: "AI APIs",
    category: "ai",
    description: "Integration of state-of-the-art LLMs (OpenAI, Anthropic, Gemini), prompt engineering & AI workflows."
  }
];
