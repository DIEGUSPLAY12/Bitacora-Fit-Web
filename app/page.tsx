import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Features from "@/components/sections/Features";
import Comparison from "@/components/sections/Comparison";
import Gallery from "@/components/sections/Gallery";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import Divider from "@/components/ui/Divider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Divider />
        <Features />
        <Comparison />
        <Gallery />
        <FaqSection />
        <Divider />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
