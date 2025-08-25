import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Features from "./components/Features";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-24">
      <HeroBanner />
      <Features />
      <CTA />
    </main>
  );
}
