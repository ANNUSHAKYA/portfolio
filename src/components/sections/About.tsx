"use client";

import { motion } from "framer-motion";
import { technologies } from "@/data/technologies";
import { Database, Layout, Server, Sparkles } from "lucide-react";

export default function About() {
  const categories = [
    { name: "Frontend", id: "frontend", icon: <Layout className="w-5 h-5" /> },
    { name: "Backend", id: "backend", icon: <Server className="w-5 h-5" /> },
    { name: "Databases", id: "database", icon: <Database className="w-5 h-5" /> },
    { name: "AI Integration", id: "ai", icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite mb-8 leading-tight">
              I DON'T JUST WRITE CODE. <br />
              <span className="text-accent-light">I BUILD PRODUCTS.</span>
            </h2>
            
            <div className="space-y-6 text-offwhite/70 text-lg">
              <p>
                I work across the entire development stack — from designing responsive frontend interfaces to architecting robust backend APIs and integrating modern AI capabilities.
              </p>
              <p>
                My focus is always on solving the core business problem rather than just writing lines of code. I build systems that are fast, secure, maintainable, and designed to scale.
              </p>
            </div>
          </motion.div>

          {/* Right Skills Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-secondary/20 border border-secondary p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <div className="w-32 h-32 border border-offwhite rounded-full"></div>
              <div className="w-24 h-24 border border-accent absolute top-8 right-8 rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center gap-3 text-accent-light">
                    {cat.icon}
                    <h3 className="font-semibold uppercase tracking-wider text-sm">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies
                      .filter((t) => t.category === cat.id || (cat.id === "backend" && t.category === "tools"))
                      .slice(0, 7) // Show top technologies per category
                      .map((tech) => (
                        <span
                          key={tech.name}
                          className="text-xs font-mono text-offwhite/80 bg-secondary/50 px-3 py-1.5 rounded-sm border border-secondary"
                        >
                          {tech.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
