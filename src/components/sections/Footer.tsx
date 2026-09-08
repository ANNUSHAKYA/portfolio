import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-offwhite mb-2">ANNU SHAKYA</h2>
            <p className="text-accent-light font-medium tracking-widest text-sm uppercase">
              Full-Stack Developer · AI Builder
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link
              href="https://www.linkedin.com/in/annu-shakya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-offwhite/70 hover:text-accent-light transition-colors"
            >
              <LinkedinIcon />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.github.com/ANNUSHAKYA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-offwhite/70 hover:text-accent-light transition-colors"
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:annushakya94526@gmail.com"
              aria-label="Email"
              className="text-offwhite/70 hover:text-accent-light transition-colors"
            >
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:flex md:space-x-12 mb-16 border-t border-secondary/50 pt-8">
          <div className="flex flex-col space-y-3">
            <Link href="#home" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">Home</Link>
            <Link href="#work" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">Work</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link href="#services" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">Services</Link>
            <Link href="#about" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">About</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link href="#contact" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">Contact</Link>
            <Link href="https://www.linkedin.com/in/annu-shakya" target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">LinkedIn</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link href="https://www.github.com/ANNUSHAKYA" target="_blank" rel="noopener noreferrer" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">GitHub</Link>
            <Link href="mailto:annushakya94526@gmail.com" className="text-offwhite/60 hover:text-offwhite transition-colors text-sm">annushakya94526@gmail.com</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-offwhite/40 text-xs">
          <p>© 2026 Annu Shakya. All rights reserved.</p>
          <p className="mt-2 md:mt-0 italic">Built with curiosity, caffeine & code.</p>
        </div>
      </div>
    </footer>
  );
}
