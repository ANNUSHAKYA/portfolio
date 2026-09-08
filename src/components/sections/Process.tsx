"use client";

import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      description: "Understand your idea, business and requirements.",
    },
    {
      number: "02",
      title: "PLAN",
      description: "Define features, architecture and user experience.",
    },
    {
      number: "03",
      title: "BUILD",
      description: "Design, develop, integrate and test the product.",
    },
    {
      number: "04",
      title: "LAUNCH",
      description: "Deploy, optimize and hand over a production-ready solution.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/10 relative overflow-hidden border-y border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
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

          <div className="grid md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Mobile Line */}
                <div className="md:hidden absolute left-[19px] top-12 bottom-[-48px] w-[1px] bg-secondary last:hidden"></div>

                <div className="flex flex-col gap-6 relative">
                  <div className="w-10 h-10 rounded-full bg-primary border-2 border-accent-light flex items-center justify-center relative z-10">
                    <div className="w-2 h-2 rounded-full bg-offwhite" />
                  </div>
                  
                  <div>
                    <span className="text-accent/50 font-mono text-lg font-bold mb-2 block">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-offwhite mb-3 uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-offwhite/60 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
