"use client";

import { motion } from "framer-motion";

const capabilities = [
  "FULL-STACK DEVELOPMENT",
  "AI INTEGRATION",
  "REST APIs",
  "DATABASE ARCHITECTURE",
  "RESPONSIVE UI",
  "DEPLOYMENT",
];

export default function TrustStrip() {
  return (
    <div className="w-full bg-secondary/80 overflow-hidden py-3 sm:py-4 border-y border-accent/20 select-none">
      <div className="flex relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 22, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {/* Double the array for seamless infinite looping */}
          {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map((cap, i) => (
            <div key={i} className="flex items-center mx-4 sm:mx-8">
              <span className="text-offwhite/85 font-mono tracking-widest text-xs sm:text-sm font-bold">
                {cap}
              </span>
              <div className="w-1.5 h-1.5 bg-accent-light rounded-full ml-8 sm:ml-16" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
