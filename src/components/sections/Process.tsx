"use client";

import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      description: "Understand your idea, business problem, and functional requirements.",
    },
    {
      number: "02",
      title: "PLAN",
      description: "Define product features, technical architecture, and intuitive UX.",
    },
    {
      number: "03",
      title: "BUILD",
      description: "Develop frontend, backend APIs, AI models, and rigorous test coverage.",
    },
    {
      number: "04",
      title: "LAUNCH",
      description: "Deploy, optimize performance, and hand over production-ready code.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-secondary/10 relative overflow-hidden border-y border-secondary">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
            STREAMLINED WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
            HOW I WORK
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-secondary">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-accent-light relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-offwhite shadow-[0_0_10px_#B3CFE5]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex md:flex-col gap-4 sm:gap-6"
              >
                {/* Mobile Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-[19px] top-10 bottom-[-32px] w-[1px] bg-secondary/80" />
                )}

                <div className="w-10 h-10 rounded-full bg-primary border-2 border-accent-light flex items-center justify-center relative z-10 shrink-0 mt-0.5 md:mt-0 shadow-lg shadow-black/20">
                  <div className="w-2 h-2 rounded-full bg-offwhite" />
                </div>
                
                <div>
                  <span className="text-accent/60 font-mono text-sm sm:text-base font-bold mb-1 block">
                    {step.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-offwhite mb-2 uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-offwhite/65 text-xs sm:text-sm leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
