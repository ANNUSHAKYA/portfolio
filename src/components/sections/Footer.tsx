import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary pt-14 sm:pt-20 pb-8 sm:pb-10 border-t border-secondary">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 sm:mb-16 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-offwhite mb-1.5 sm:mb-2">ANNU SHAKYA</h2>
            <p className="text-accent-light font-medium tracking-widest text-xs sm:text-sm uppercase">
              Full-Stack Developer · AI Builder
            </p>
          </div>
          
          <div className="flex space-x-5 sm:space-x-6">
            <Link
              href="https://www.linkedin.com/in/annu-shakya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-offwhite/70 hover:text-accent-light transition-colors p-1.5 rounded bg-secondary/30 border border-secondary/50"
            >
              <LinkedinIcon />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.github.com/ANNUSHAKYA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-offwhite/70 hover:text-accent-light transition-colors p-1.5 rounded bg-secondary/30 border border-secondary/50"
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:annushakya94526@gmail.com"
              aria-label="Email"
              className="text-offwhite/70 hover:text-accent-light transition-colors p-1.5 rounded bg-secondary/30 border border-secondary/50"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:flex md:space-x-12 mb-10 sm:mb-16 border-t border-secondary/50 pt-8">
          <div className="flex flex-col space-y-2.5 sm:space-y-3">
            <span className="text-[11px] font-mono uppercase text-accent-light tracking-wider">Navigation</span>
            <Link href="#home" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">Home</Link>
            <Link href="#work" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">Work</Link>
          </div>
          <div className="flex flex-col space-y-2.5 sm:space-y-3">
            <span className="text-[11px] font-mono uppercase text-accent-light tracking-wider">Explore</span>
            <Link href="#services" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">Services</Link>
            <Link href="#about" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">About</Link>
          </div>
          <div className="flex flex-col space-y-2.5 sm:space-y-3">
            <span className="text-[11px] font-mono uppercase text-accent-light tracking-wider">Connect</span>
            <Link href="#contact" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">Contact</Link>
            <Link href="https://www.linkedin.com/in/annu-shakya" target="_blank" rel="noopener noreferrer" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">LinkedIn</Link>
          </div>
          <div className="flex flex-col space-y-2.5 sm:space-y-3">
            <span className="text-[11px] font-mono uppercase text-accent-light tracking-wider">Direct</span>
            <Link href="https://www.github.com/ANNUSHAKYA" target="_blank" rel="noopener noreferrer" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm">GitHub</Link>
            <Link href="mailto:annushakya94526@gmail.com" className="text-offwhite/65 hover:text-offwhite transition-colors text-xs sm:text-sm break-all">Email Annu</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-offwhite/40 text-[11px] sm:text-xs gap-2 sm:gap-0 pt-4 border-t border-secondary/30">
          <p>© 2026 Annu Shakya. All rights reserved.</p>
          <p className="italic text-center sm:text-right">Built with curiosity, caffeine & code.</p>
        </div>
      </div>
    </footer>
  );
}
