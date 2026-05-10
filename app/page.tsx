import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { CtaBand } from "@/components/cta-band";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <CtaBand />
      <Contact />
      <Footer />
    </>
  );
}
