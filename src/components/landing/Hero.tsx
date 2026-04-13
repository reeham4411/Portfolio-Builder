"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-(--accent) opacity-10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-(--accent-2)opacity-8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-10">
        <span className="font-display text-2xl font-bold tracking-tight">
          <span className="gradient-text">folio</span>
          <span className="text-(--text-muted)">.</span>
        </span>
        <Link
          href="/builder"
          className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent)transition-all duration-300"
        >
          Start Building <ArrowRight size={14} />
        </Link>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--border) text-(--text-muted) text-sm mb-8 opacity-0 animate-fade-up">
          <Sparkles size={13} className="text-(--accent)" />
          AI-powered portfolio generation
        </div>

        <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8 opacity-0 animate-fade-up animate-delay-100">
          Your work,
          <br />
          <span className="gradient-text">beautifully</span>
          <br />
          presented.
        </h1>

        <p className="text-(--text-muted) text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-up animate-delay-200">
          Build a stunning professional portfolio in minutes — not days. Choose
          a template, fill in your story, let AI refine it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animate-delay-300">
          <Link
            href="/builder"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,106,255,0.4)]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
            }}
          >
            Build My Portfolio
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/preview/demo"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-all duration-300"
          >
            <Globe size={16} />
            See Example
          </Link>
        </div>

        {/* Stats */}
        <div
          className="mt-24 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            ["3 min", "avg. build time"],
            ["12+", "templates"],
            ["100%", "free to start"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl font-bold gradient-text">
                {num}
              </div>
              <div className="text-(--text-muted)s text-sm mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
