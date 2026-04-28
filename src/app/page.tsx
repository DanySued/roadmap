import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import FeatureCarousel from "@/components/sections/FeatureCarousel";
import BrainOptimized from "@/components/sections/BrainOptimized";
import Research from "@/components/sections/Research";
import LogoMarquee from "@/components/sections/LogoMarquee";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <FeatureCarousel />
        <BrainOptimized />
        <Research />
        <LogoMarquee />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
