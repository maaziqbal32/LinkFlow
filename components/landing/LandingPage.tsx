
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Pricing />

      </main>

      <Footer />
    </>
  );
}
