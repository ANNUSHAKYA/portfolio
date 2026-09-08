"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Projects() {
  return (
    <section id="work" className="py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight mb-4">
            SELECTED WORK
          </h2>
          <p className="text-xl text-offwhite/50 max-w-2xl">
            A selection of products, platforms and experiments I've built.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col gap-12 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-3/5 group relative perspective-1000">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-secondary/50 transform transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-primary opacity-80 z-0"></div>
                    
                    {/* Placeholder for project mockups (instead of generic images) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                      <div className="w-full max-w-md h-full max-h-64 bg-primary/80 backdrop-blur-md rounded-lg border border-accent/20 shadow-xl overflow-hidden flex flex-col">
                        <div className="h-6 bg-secondary/80 border-b border-accent/20 flex items-center px-3 gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                           <h4 className="text-2xl font-bold text-offwhite/90 mb-2">{project.name}</h4>
                           <p className="text-accent-light/80 text-sm">{project.category}</p>
                           <div className="mt-8 flex gap-2">
                              {project.technology.slice(0,3).map(t => (
                                <span key={t} className="px-2 py-1 bg-secondary/50 rounded text-xs text-offwhite/60">{t}</span>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-2/5 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-light text-accent/30 font-mono">
                      {project.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-light px-3 py-1 bg-secondary/30 rounded-full border border-secondary">
                      {project.highlight}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-offwhite mb-6 uppercase tracking-wide">
                    {project.name}
                  </h3>

                  <p className="text-offwhite/70 text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.technology.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-offwhite/60 uppercase"
                      >
                        {tech} <span className="text-accent/50 mx-1">•</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 bg-offwhite text-primary text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-accent-light transition-colors"
                      >
                        Live Project <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="flex items-center gap-2 p-3 bg-secondary text-offwhite rounded-sm hover:bg-secondary/70 transition-colors border border-secondary"
                      >
                        <GithubIcon />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
