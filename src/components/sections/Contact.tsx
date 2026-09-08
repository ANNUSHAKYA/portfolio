"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Check, Copy } from "lucide-react";
import Link from "next/link";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("annushakya94526@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formState.projectType || "New Project"} from ${formState.name || "Client"}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\nBudget: ${formState.budget}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:annushakya94526@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-primary relative border-t border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
              LET'S COLLABORATE
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-offwhite mb-6 uppercase tracking-tight leading-none">
              HAVE AN IDEA? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">LET'S BUILD IT.</span>
            </h2>
            
            <p className="text-xl text-offwhite/70 leading-relaxed mb-8 max-w-lg">
              Whether you need a business website, AI-powered application, SaaS product, custom web platform or backend system — let's turn your idea into something real.
            </p>

            {/* Direct Email Card with 1-Click Copy */}
            <div className="mb-8 p-4 rounded-xl bg-secondary/30 border border-secondary/80 max-w-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary border border-secondary flex items-center justify-center text-accent-light">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-accent-light tracking-wider">Direct Email</p>
                  <a
                    href="mailto:annushakya94526@gmail.com"
                    className="text-offwhite font-medium hover:text-accent-light transition-colors text-sm sm:text-base break-all"
                  >
                    annushakya94526@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded bg-secondary/50 hover:bg-secondary text-offwhite text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-secondary self-start sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-offwhite/70" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Contact Buttons */}
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="mailto:annushakya94526@gmail.com"
                className="px-7 py-3.5 bg-offwhite text-primary text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all rounded-sm flex items-center gap-2.5 hover:scale-105 active:scale-95 duration-200"
              >
                EMAIL ME <Send className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/annu-shakya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-secondary text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-secondary/50 hover:border-accent-light transition-all rounded-sm flex items-center gap-2.5"
              >
                <LinkedinIcon />
                <span>LINKEDIN</span>
              </Link>
              <Link
                href="https://www.github.com/ANNUSHAKYA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-secondary text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-secondary/50 hover:border-accent-light transition-all rounded-sm flex items-center gap-2.5"
              >
                <GithubIcon />
                <span>GITHUB</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary/20 p-8 rounded-2xl border border-secondary backdrop-blur-sm relative"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono uppercase text-accent-light tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-primary border border-secondary rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono uppercase text-accent-light tracking-wider">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-primary border border-secondary rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="text-xs font-mono uppercase text-accent-light tracking-wider">Project Type</label>
                <select
                  id="projectType"
                  value={formState.projectType}
                  onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  className="w-full bg-primary border border-secondary rounded-sm px-4 py-3 text-offwhite/80 focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a project type...</option>
                  <option value="Business Website">Business Website</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Web Application">Web Application</option>
                  <option value="AI Application">AI Application</option>
                  <option value="SaaS Platform">SaaS</option>
                  <option value="API / Backend Architecture">API / Backend</option>
                  <option value="Other Digital Product">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="text-xs font-mono uppercase text-accent-light tracking-wider">Budget Range</label>
                <select
                  id="budget"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  className="w-full bg-primary border border-secondary rounded-sm px-4 py-3 text-offwhite/80 focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a budget range...</option>
                  <option value="₹10k – ₹25k">₹10k – ₹25k</option>
                  <option value="₹25k – ₹50k">₹25k – ₹50k</option>
                  <option value="₹50k – ₹1L">₹50k – ₹1L</option>
                  <option value="₹1L+">₹1L+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono uppercase text-accent-light tracking-wider">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-primary border border-secondary rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your product, timeline, or requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-offwhite text-primary text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all rounded-sm mt-4 flex items-center justify-center gap-2"
              >
                <span>Send Message to Annu</span>
                <Send className="w-4 h-4" />
              </button>

              {submitted && (
                <p className="text-center text-xs font-mono text-accent-light mt-3">
                  Email client opened with your inquiry pre-filled for annushakya94526@gmail.com!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
