"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-primary relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-offwhite uppercase tracking-tight">
            WHAT I CAN BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              FOR YOU
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-secondary/20 hover:bg-secondary/40 border border-secondary hover:border-accent/50 p-8 rounded-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-accent-light font-mono text-sm font-bold tracking-widest opacity-60">
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-offwhite/30 group-hover:text-accent-light group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-xl font-bold text-offwhite mb-4 uppercase tracking-wide leading-snug">
                {service.title}
              </h3>
              
              <p className="text-offwhite/60 mb-8 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center text-xs font-mono text-offwhite/50 group-hover:text-offwhite/80 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-accent mr-3"></span>
                    {item}
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
