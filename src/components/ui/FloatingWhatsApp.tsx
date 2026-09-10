"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/contact";

export default function FloatingWhatsApp() {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact options"
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Annu on WhatsApp"
        className="group flex items-center justify-center h-12 min-w-12 px-0 md:hover:px-4 bg-primary/90 hover:bg-secondary/90 text-offwhite border border-secondary/90 hover:border-accent-light/60 backdrop-blur-md shadow-xl shadow-black/40 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-accent-light active:scale-95"
      >
        <span className="flex items-center justify-center w-12 h-12 shrink-0">
          <WhatsAppIcon className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
        </span>
        <span className="hidden md:inline-block max-w-0 group-hover:max-w-[200px] overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out text-xs font-bold uppercase tracking-wider text-offwhite pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </motion.aside>
  );
}
