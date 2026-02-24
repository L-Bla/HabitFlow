

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Favicon } from "./components/Favicon";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Favicon />
      <Hero />
      <Features />
      <Showcase />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}