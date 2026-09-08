"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Projects() {
  return (
    <section id="work" className="py-16 sm:py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight mb-3 sm:mb-4">
            SELECTED WORK
          </h2>
          <p className="text-base sm:text-xl text-offwhite/50 max-w-2xl">
            A selection of products, platforms and experiments I've built.
          </p>
        </motion.div>

        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-8 lg:gap-12 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-3/5 group relative">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/80 border border-secondary/60 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-primary opacity-90 z-0" />
                    
                    {/* Project Browser Mockup */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 z-10">
                      <div className="w-full max-w-md bg-primary/90 backdrop-blur-md rounded-lg sm:rounded-xl border border-accent/25 shadow-2xl overflow-hidden flex flex-col">
                        <div className="h-7 bg-secondary/70 border-b border-accent/20 flex items-center px-3 gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                          <span className="ml-2 text-[10px] font-mono text-offwhite/40 truncate">
                            {project.live ? project.live.replace("https://", "") : `${project.name.toLowerCase()}.app`}
                          </span>
                        </div>
                        <div className="p-5 sm:p-8 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-accent-light px-2.5 py-0.5 rounded-full bg-secondary/50 border border-secondary mb-2">
                            {project.category}
                          </span>
                          <h4 className="text-xl sm:text-2xl font-bold text-offwhite mb-2">{project.name}</h4>
                          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                            {project.technology.slice(0, 4).map((t) => (
                              <span key={t} className="px-2 py-0.5 sm:py-1 bg-secondary/60 rounded text-[11px] font-mono text-offwhite/70 border border-secondary/50">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-2/5 flex flex-col">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl font-light text-accent/40 font-mono">
                      {project.number}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent-light px-2.5 sm:px-3 py-1 bg-secondary/40 rounded-full border border-secondary">
                      {project.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-offwhite mb-4 sm:mb-5 uppercase tracking-wide">
                    {project.name}
                  </h3>

                  <p className="text-offwhite/75 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                    {project.technology.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] sm:text-xs font-mono text-offwhite/65 uppercase bg-secondary/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-secondary/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-auto">
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-offwhite text-primary text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-accent-light transition-all active:scale-95 duration-150 shadow-md"
                      >
                        <span>Live Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        aria-label={`GitHub repository for ${project.name}`}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 bg-secondary/50 text-offwhite rounded-sm hover:bg-secondary/80 transition-all border border-secondary active:scale-95"
                      >
                        <GithubIcon />
                        <span className="sm:sr-only text-xs uppercase font-mono tracking-wider">GitHub Code</span>
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
