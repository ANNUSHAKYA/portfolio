"use client";

import { motion } from "framer-motion";

export default function WhyWorkWithMe() {
  const points = [
    {
      title: "END-TO-END DEVELOPMENT",
      description: "From frontend architecture to backend APIs and production deployment, I manage the complete software lifecycle."
    },
    {
      title: "PRODUCT-FIRST THINKING",
      description: "I focus on solving the actual business problem and user conversion, not just writing syntax."
    },
    {
      title: "AI + MODERN TECHNOLOGY",
      description: "I integrate state-of-the-art AI capabilities, LLMs, and real-time streaming into practical commercial products."
    },
    {
      title: "CLEAN & SCALABLE",
      description: "I architect systems that are maintainable, modular, secure, and ready to scale with your user growth."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-primary relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 md:mb-24"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
            THE VALUE I BRING
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
            WHY WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">WITH ME</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-14">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-4 sm:gap-6"
            >
              <span className="text-2xl sm:text-3xl font-light text-accent/50 font-mono leading-none shrink-0 pt-0.5">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-offwhite mb-2 sm:mb-3 uppercase tracking-wider">
                  {point.title}
                </h3>
                <p className="text-offwhite/70 text-sm sm:text-base md:text-lg leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
