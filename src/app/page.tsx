import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
// import TemplateShowcase from "@/components/landing/TemplateShowcase";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      {/* <TemplateShowcase /> */}
    </main>
  );
}
