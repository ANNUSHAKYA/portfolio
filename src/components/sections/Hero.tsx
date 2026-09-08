"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Load 3D scene dynamically to avoid SSR issues
const HeroScene = dynamic(() => import("../3d/HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-primary/90 z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-block"
          >
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-accent-light uppercase bg-secondary/30 border border-secondary/50 px-4 py-2 rounded-full backdrop-blur-sm">
              FULL-STACK DEVELOPER · AI BUILDER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-offwhite"
          >
            I BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-offwhite to-accent-light">
              DIGITAL PRODUCTS
            </span>{" "}
            <br />
            THAT MATTER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-offwhite/70 mb-10 leading-relaxed max-w-xl"
          >
            I'm Annu Shakya, a Full-Stack Developer focused on building modern web applications, AI-powered products, APIs, and seamless digital experiences for startups, businesses, and ambitious ideas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#contact"
              className="px-8 py-4 bg-offwhite text-primary text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all text-center rounded-sm hover:scale-105 active:scale-95 duration-200"
            >
              Let's Work Together
            </Link>
            <Link
              href="#work"
              className="px-8 py-4 bg-transparent border border-secondary text-offwhite text-sm font-bold uppercase tracking-widest hover:bg-secondary/40 backdrop-blur-sm transition-all text-center rounded-sm hover:scale-105 active:scale-95 duration-200"
            >
              View My Work
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Space reserved for the 3D scene visual balance */}
        <div className="hidden lg:block h-[500px] w-full relative">
          {/* Subtle UI cards floating over the 3D scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-20 right-10 bg-secondary/40 backdrop-blur-md border border-accent/20 p-4 rounded-lg shadow-2xl w-64"
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
            className="absolute bottom-20 left-10 bg-secondary/40 backdrop-blur-md border border-accent/20 p-4 rounded-lg shadow-2xl w-56"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-offwhite/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-offwhite/50 to-transparent" />
      </motion.div>
    </section>
  );
}
