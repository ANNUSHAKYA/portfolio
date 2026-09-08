"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-primary relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
            CLIENT SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
            WHAT I CAN BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              FOR YOU
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-secondary/20 hover:bg-secondary/40 border border-secondary hover:border-accent/50 p-6 sm:p-8 rounded-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-5 sm:mb-6">
                  <span className="text-accent-light font-mono text-xs sm:text-sm font-bold tracking-widest opacity-75">
                    {service.number}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-offwhite/40 group-hover:text-accent-light group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-offwhite mb-3 sm:mb-4 uppercase tracking-wide leading-snug">
                  {service.title}
                </h3>
                
                <p className="text-offwhite/65 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <ul className="space-y-2 pt-4 border-t border-secondary/40">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center text-[11px] sm:text-xs font-mono text-offwhite/60 group-hover:text-offwhite/85 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
