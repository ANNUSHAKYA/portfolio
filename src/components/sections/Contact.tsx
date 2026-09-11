"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Check, Copy, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/contact";

// ─── Icon components ──────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Client-side field validation (mirrors server) ────────────────────────────
function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  } else if (form.name.trim().length > 100) {
    errors.name = "Name is too long.";
  }

  if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.projectType) {
    errors.projectType = "Please select a project type.";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Please describe your project (at least 10 characters).";
  } else if (form.message.trim().length > 5000) {
    errors.message = "Message is too long (max 5000 characters).";
  }

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 mt-1"
    >
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </motion.p>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center text-center py-10 sm:py-14 px-4 gap-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-green-400" strokeWidth={2.5} />
      </motion.div>

      <div>
        <p className="text-[10px] font-mono uppercase text-green-400 tracking-[0.2em] mb-3">
          ✓ PROJECT ENQUIRY RECEIVED
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-offwhite mb-3 tracking-tight">
          Thanks for reaching out.
        </h3>
        <p className="text-sm sm:text-base text-offwhite/60 leading-relaxed max-w-sm mx-auto">
          I&apos;ll review your project details and get back to you within{" "}
          <span className="text-accent-light font-medium">24 hours</span>.
          Check your inbox for a confirmation email.
        </p>
      </div>

      <button
        onClick={onReset}
        className="mt-2 px-6 py-3 bg-secondary/40 border border-secondary hover:bg-secondary/70 text-offwhite text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-sm transition-colors active:scale-95 duration-150"
      >
        Send Another Enquiry
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const submitInFlight = useRef(false); // prevents duplicate submissions

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("annushakya94526@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double-submit
    if (submitInFlight.current || loading) return;

    // Client-side validation first
    const errors = validateForm(formState);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setGlobalError("");
    setLoading(true);
    submitInFlight.current = true;

    // Honeypot: grab from hidden input
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, website: honeypot }),
      });

      const data = await res.json();

      if (res.status === 422 && data.fields) {
        // Server returned per-field errors — map them
        const serverErrors: FieldErrors = {};
        for (const fe of data.fields as { field: string; message: string }[]) {
          serverErrors[fe.field as keyof FieldErrors] = fe.message;
        }
        setFieldErrors(serverErrors);
      } else if (!res.ok) {
        setGlobalError(
          data.error || "Something went wrong. Please try again."
        );
      } else {
        setSubmitted(true);
        setFormState(EMPTY_FORM);
      }
    } catch {
      setGlobalError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
      submitInFlight.current = false;
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setGlobalError("");
    setFieldErrors({});
    setFormState(EMPTY_FORM);
  };

  const inputClass = (hasError?: string) =>
    `w-full bg-primary border ${
      hasError ? "border-red-500/70" : "border-secondary"
    } rounded-sm px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-offwhite focus:outline-none focus:border-accent transition-colors`;

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-32 bg-primary relative border-t border-secondary"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left Side ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase text-accent-light tracking-widest px-3 py-1 bg-secondary/40 border border-secondary rounded-full inline-block mb-4">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-offwhite mb-4 sm:mb-6 uppercase tracking-tight leading-[1.1]">
              HAVE AN IDEA? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                LET&apos;S BUILD IT.
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-offwhite/70 leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Whether you need a business website, AI-powered application, SaaS
              product, custom web platform or backend system — let&apos;s turn
              your idea into something real.
            </p>

            {/* Direct Email Card */}
            <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl bg-secondary/30 border border-secondary/80 max-w-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary border border-secondary flex items-center justify-center text-accent-light shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-mono uppercase text-accent-light tracking-wider">
                    Direct Email
                  </p>
                  <a
                    href="mailto:annushakya94526@gmail.com"
                    className="text-offwhite font-medium hover:text-accent-light transition-colors text-xs sm:text-sm md:text-base break-all"
                  >
                    annushakya94526@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 sm:py-2 rounded bg-secondary/50 hover:bg-secondary text-offwhite text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-secondary self-start sm:self-auto shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-offwhite/70" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Contact & Social Links */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-secondary/40 hover:bg-secondary/70 border border-secondary hover:border-accent-light/60 text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-150 shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>CHAT ON WHATSAPP</span>
              </a>
              <Link
                href="mailto:annushakya94526@gmail.com"
                className="w-full sm:w-auto px-5 py-3.5 bg-offwhite text-primary text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all rounded-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-150 shadow-md"
              >
                <span>EMAIL ME</span>
                <Send className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/annu-shakya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 bg-secondary/30 border border-secondary text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-secondary/60 hover:border-accent-light transition-all rounded-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <LinkedinIcon />
                <span>LINKEDIN</span>
              </Link>
              <Link
                href="https://www.github.com/ANNUSHAKYA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 bg-secondary/30 border border-secondary text-offwhite text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-secondary/60 hover:border-accent-light transition-all rounded-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <GithubIcon />
                <span>GITHUB</span>
              </Link>
            </div>
          </motion.div>

          {/* ── Right Side — Form / Success ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary/20 rounded-xl sm:rounded-2xl border border-secondary backdrop-blur-sm relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen key="success" onReset={handleReset} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 sm:p-8"
                >
                  <div className="mb-5 pb-4 border-b border-secondary/40 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-offwhite tracking-tight uppercase">
                        Start a Project
                      </h3>
                      <p className="text-xs font-mono text-accent-light/80 mt-1">
                        Fill in details below or chat directly
                      </p>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-accent-light hover:text-offwhite transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Prefer WhatsApp?</span>
                    </a>
                  </div>
                  <form
                    className="space-y-4 sm:space-y-5"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Honeypot — visually hidden, real users never fill this */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                      }}
                    />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-[11px] sm:text-xs font-mono uppercase text-accent-light tracking-wider"
                        >
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formState.name}
                          onChange={handleChange}
                          className={inputClass(fieldErrors.name)}
                          placeholder="Your Name"
                        />
                        <FieldError message={fieldErrors.name} />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="text-[11px] sm:text-xs font-mono uppercase text-accent-light tracking-wider"
                        >
                          Your Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={inputClass(fieldErrors.email)}
                          placeholder="youremail@gmail.com"
                        />
                        <FieldError message={fieldErrors.email} />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div className="space-y-1">
                      <label
                        htmlFor="projectType"
                        className="text-[11px] sm:text-xs font-mono uppercase text-accent-light tracking-wider"
                      >
                        Project Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleChange}
                        className={`${inputClass(fieldErrors.projectType)} appearance-none cursor-pointer text-offwhite/80`}
                      >
                        <option value="">Select a project type...</option>
                        <option value="Business Website">Business Website</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Web Application">Web Application</option>
                        <option value="AI Application">AI Application</option>
                        <option value="SaaS Platform">SaaS Platform</option>
                        <option value="API / Backend Architecture">API / Backend</option>
                        <option value="Other Digital Product">Other</option>
                      </select>
                      <FieldError message={fieldErrors.projectType} />
                    </div>

                    {/* Budget */}
                    <div className="space-y-1">
                      <label
                        htmlFor="budget"
                        className="text-[11px] sm:text-xs font-mono uppercase text-accent-light tracking-wider"
                      >
                        Budget Range{" "}
                        <span className="text-offwhite/30 normal-case">(optional)</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className={`${inputClass(fieldErrors.budget)} appearance-none cursor-pointer text-offwhite/80`}
                      >
                        <option value="">Select a budget range...</option>
                        <option value="₹10k – ₹25k">₹10k – ₹25k</option>
                        <option value="₹25k – ₹50k">₹25k – ₹50k</option>
                        <option value="₹50k – ₹1L">₹50k – ₹1L</option>
                        <option value="₹1L+">₹1L+</option>
                      </select>
                      <FieldError message={fieldErrors.budget} />
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="text-[11px] sm:text-xs font-mono uppercase text-accent-light tracking-wider flex justify-between"
                      >
                        <span>
                          Project Details <span className="text-red-400">*</span>
                        </span>
                        <span className="text-offwhite/30 normal-case font-normal">
                          {formState.message.length}/5000
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        className={`${inputClass(fieldErrors.message)} resize-none`}
                        placeholder="Tell me about your product, timeline, or requirements..."
                      />
                      <FieldError message={fieldErrors.message} />
                    </div>

                    {/* Global error */}
                    <AnimatePresence>
                      {globalError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{globalError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 sm:py-4 bg-offwhite text-primary text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all rounded-sm mt-1 flex items-center justify-center gap-2 active:scale-95 duration-150 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] font-mono text-offwhite/25 tracking-wider">
                      I respond within 24 hours · No spam, ever
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
