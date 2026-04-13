"use client";

import { Zap, Palette, Brain, Link2, Eye, Shield } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Stunning Templates",
    desc: "Choose from professionally designed templates that adapt to your personal brand.",
  },
  {
    icon: Brain,
    title: "AI Content Assistant",
    desc: "Struggling to write about yourself? Let AI craft compelling bios and project descriptions.",
  },
  {
    icon: Eye,
    title: "Real-time Preview",
    desc: "See your portfolio update live as you type — no guessing how it'll look.",
  },
  {
    icon: Zap,
    title: "Instant Publishing",
    desc: "One click to go live. Get a shareable link within seconds.",
  },
  {
    icon: Link2,
    title: "Custom Links",
    desc: "Share folio.app/yourname with recruiters, clients, and the world.",
  },
  {
    icon: Shield,
    title: "Always Yours",
    desc: "Your data stays with you. Export or delete anytime, no lock-in.",
  },
];

export default function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Everything you need,
            <br />
            <span className="gradient-text">nothing you don&apos;t.</span>
          </h2>
          <p className="text-(--text-muted) text-lg max-w-xl mx-auto">
            Thoughtfully built for designers, developers, writers, and everyone
            in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-(--border) bg-(--surface) hover:border-(--accent) hover:bg-(--surface-2) transition-all duration-300 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,106,255,0.2), rgba(255,107,157,0.2))",
                }}
              >
                <Icon size={22} className="text-(--accent)" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {title}
              </h3>
              <p className="text-(--text-muted) leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
