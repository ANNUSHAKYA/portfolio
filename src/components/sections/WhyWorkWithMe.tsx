"use client";

import { motion } from "framer-motion";

export default function WhyWorkWithMe() {
  const points = [
    {
      title: "END-TO-END DEVELOPMENT",
      description: "From frontend to backend and deployment. I handle the complete lifecycle."
    },
    {
      title: "PRODUCT-FIRST THINKING",
      description: "I focus on solving the actual business problem, not just writing code."
    },
    {
      title: "AI + MODERN TECHNOLOGY",
      description: "I can integrate AI capabilities into practical products for real users."
    },
    {
      title: "CLEAN & SCALABLE",
      description: "Build systems that are maintainable, secure, and ready to grow."
    }
  ];

  return (
    <section className="py-24 bg-primary relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
            WHY WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">WITH ME</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6"
            >
              <span className="text-3xl font-light text-secondary font-mono leading-none">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-offwhite mb-3 uppercase tracking-wider">
                  {point.title}
                </h3>
                <p className="text-offwhite/60 text-lg leading-relaxed">
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
