"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Technology } from "@/data/technologies";

const TechOrbit = dynamic(() => import("../3d/TechOrbit"), { ssr: false });

const CATEGORIES = [
  { id: "all", label: "All Tech", color: "#F6FAFD" },
  { id: "frontend", label: "Frontend", color: "#B3CFE5" },
  { id: "backend", label: "Backend", color: "#4A7FA7" },
  { id: "database", label: "Database", color: "#6BA4CD" },
  { id: "tools", label: "DevOps & Tools", color: "#1A3D63" },
  { id: "ai", label: "AI & APIs", color: "#ffffff" },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);

  return (
    <section id="tech-stack" className="py-24 bg-primary relative overflow-hidden border-t border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
              INTERACTIVE 3D CONSTELLATION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite mb-6 uppercase tracking-tight">
              TECHNOLOGY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                ECOSYSTEM
              </span>
            </h2>
            <p className="text-lg text-offwhite/70 leading-relaxed mb-8 max-w-lg">
              I use a modern, performant, and scalable stack to build production-ready applications. Drag the 3D constellation to rotate the sphere and hover any node to inspect its architectural purpose.
            </p>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                      isActive
                        ? "bg-secondary text-offwhite border-accent-light shadow-lg shadow-secondary/50 scale-105"
                        : "bg-secondary/20 text-offwhite/60 border-secondary hover:border-accent/40 hover:text-offwhite"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Live Inspector Box */}
            <div className="min-h-[100px] p-5 rounded-xl bg-secondary/20 border border-secondary/60 backdrop-blur-sm transition-all duration-300">
              {hoveredTech ? (
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-sm font-bold text-offwhite tracking-wide">
                      {hoveredTech.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent-light border border-accent/30">
                      {hoveredTech.category}
                    </span>
                  </div>
                  <p className="text-sm text-offwhite/75 leading-relaxed font-sans">
                    {hoveredTech.description}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-offwhite/40 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent-light animate-ping" />
                  <span>Hover over any node or drag the constellation to inspect technologies</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent rounded-full blur-3xl z-0 pointer-events-none" />
            <TechOrbit
              activeCategory={activeCategory}
              onHoverTech={setHoveredTech}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
