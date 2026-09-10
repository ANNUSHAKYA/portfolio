"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/contact";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md border-b border-secondary/80 shadow-xl py-3.5 sm:py-4"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-offwhite font-bold text-xl sm:text-2xl tracking-wider focus:outline-none"
        >
          AS<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-offwhite/80 hover:text-accent-light transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 bg-secondary/30 hover:bg-secondary/60 text-offwhite border border-secondary/70 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 duration-150"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden xl:inline">CHAT ON WHATSAPP</span>
            <span className="xl:hidden">WHATSAPP</span>
          </a>
          <Link
            href="#contact"
            className="px-5 py-2.5 bg-offwhite text-primary text-sm font-bold uppercase tracking-wider hover:bg-accent-light transition-colors rounded-sm hover:scale-105 active:scale-95 duration-150"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden text-offwhite p-2.5 rounded-lg bg-secondary/30 border border-secondary/60 active:scale-95 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block w-full h-0.5 bg-current transition-all duration-300 origin-left ${
                mobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-current transition-all duration-300 origin-left ${
                mobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay & Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-primary/95 backdrop-blur-2xl border-b border-secondary/80 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-offwhite/90 hover:text-accent-light text-xl font-medium py-2.5 border-b border-secondary/30 transition-colors flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-accent/60">0{idx + 1}</span>
                </Link>
              ))}

              <Link
                href="#contact"
                className="w-full py-3.5 bg-offwhite text-primary text-center text-sm font-bold uppercase tracking-widest rounded-sm mt-4 shadow-lg hover:bg-accent-light transition-all active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a Project
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-secondary/40 border border-secondary/80 text-offwhite text-center text-xs font-bold uppercase tracking-widest rounded-sm shadow-md flex items-center justify-center gap-2 hover:bg-secondary/70 transition-all active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Mobile Social Links */}
              <div className="pt-4 flex items-center justify-center gap-6 text-offwhite/60 text-xs font-mono">
                <a
                  href="https://www.linkedin.com/in/annu-shakya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-light transition-colors py-1"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://www.github.com/ANNUSHAKYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-light transition-colors py-1"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="mailto:annushakya94526@gmail.com"
                  className="hover:text-accent-light transition-colors py-1"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
