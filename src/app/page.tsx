import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Projects />
      <Process />
      <WhyWorkWithMe />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
