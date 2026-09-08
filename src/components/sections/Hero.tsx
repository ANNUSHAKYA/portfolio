"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Load 3D scene dynamically to avoid SSR issues
const HeroScene = dynamic(() => import("../3d/HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 sm:py-20">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/60 to-primary/95 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 sm:mb-6 inline-block"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-accent-light uppercase bg-secondary/40 border border-secondary/70 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
              FULL-STACK DEVELOPER · AI BUILDER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.12] mb-6 sm:mb-8 text-offwhite tracking-tight"
          >
            I BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-offwhite via-accent-light to-accent">
              DIGITAL PRODUCTS
            </span>{" "}
            <br />
            THAT MATTER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-offwhite/75 mb-8 sm:mb-10 leading-relaxed max-w-xl"
          >
            I'm Annu Shakya, a Full-Stack Developer focused on building modern web applications, AI-powered products, APIs, and seamless digital experiences for startups, businesses, and ambitious ideas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3.5 sm:gap-4"
          >
            <Link
              href="#contact"
              className="w-full sm:w-auto px-7 py-4 bg-offwhite text-primary text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all text-center rounded-sm hover:scale-105 active:scale-95 duration-150 shadow-lg shadow-black/30"
            >
              Let's Work Together
            </Link>
            <Link
              href="#work"
              className="w-full sm:w-auto px-7 py-4 bg-secondary/30 border border-secondary text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-secondary/60 backdrop-blur-sm transition-all text-center rounded-sm hover:scale-105 active:scale-95 duration-150"
            >
              View My Work
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Space reserved for the 3D scene visual balance */}
        <div className="hidden lg:block h-[500px] w-full relative pointer-events-none">
          {/* Subtle UI cards floating over the 3D scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-20 right-10 bg-secondary/40 backdrop-blur-md border border-accent/20 p-4 rounded-lg shadow-2xl w-64 pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs text-accent-light font-mono uppercase tracking-wider">System Status</p>
            </div>
            <p className="text-offwhite text-sm font-medium">All APIs Operational</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-20 left-10 bg-secondary/40 backdrop-blur-md border border-accent/20 p-4 rounded-lg shadow-2xl w-56 pointer-events-auto"
          >
            <p className="text-xs text-accent-light font-mono uppercase tracking-wider mb-2">Deployment</p>
            <div className="h-1.5 w-full bg-primary rounded-full overflow-hidden">
              <div className="h-full bg-accent-light w-[85%]" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-offwhite/50 font-mono">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-offwhite/50 to-transparent" />
      </motion.div>
    </section>
  );
}
