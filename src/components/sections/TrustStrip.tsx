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
    <div className="w-full bg-secondary overflow-hidden py-4 border-y border-accent/20">
      <div className="flex relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {/* Double the array for seamless looping */}
          {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map((cap, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-offwhite/80 font-mono tracking-widest text-sm font-bold">
                {cap}
              </span>
              <div className="w-1.5 h-1.5 bg-accent-light rounded-full ml-16" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
