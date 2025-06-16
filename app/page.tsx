import Image from "next/image";
import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import RecentWorks from './components/RecentWorks/RecentWorks';
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Features from "./components/Features/Features";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQ from "./components/FAQ/FAQ";
import StartBuilding from "./components/CTA/StartBuilding";
import Footer from "./components/Footer/Footer";
import Pricing from './components/Pricing/Pricing';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <RecentWorks />
      <HowItWorks />
      <Features />
      <div id="pricing">
        <Pricing />
      </div>
      <Testimonials />
      <FAQ />
      <StartBuilding />
      <Footer />
    </main>
  );
}
