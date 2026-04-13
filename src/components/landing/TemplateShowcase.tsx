"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateId } from "@/types/portfolio";
import Badge from "@/components/ui/Badge";

// ─── Template definitions ────────────────────────────────────────────────────

interface TemplateConfig {
  id: TemplateId;
  name: string;
  tag: string;
  desc: string;
  accent: string;
  accentSecondary: string;
  bg: string;
  textColor: string;
  features: string[];
  bestFor: string;
}

const templates: TemplateConfig[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    tag: "Most Popular",
    desc: "Whitespace-first design with sharp editorial typography. Lets your content breathe.",
    accent: "#7c6aff",
    accentSecondary: "#a89ef8",
    bg: "#ffffff",
    textColor: "#111111",
    features: [
      "Georgia serif headings",
      "Generous spacing",
      "Subtle rule lines",
    ],
    bestFor: "Developers & writers",
  },
  {
    id: "bold",
    name: "Bold",
    tag: "Eye-catching",
    desc: "High contrast dark canvas. Your name owns the page. Impossible to scroll past.",
    accent: "#ff6b9d",
    accentSecondary: "#ff9dbe",
    bg: "#0a0a0a",
    textColor: "#f0eff8",
    features: ["Dark canvas", "Pink accent system", "Timeline experience"],
    bestFor: "Engineers & PMs",
  },
  {
    id: "creative",
    name: "Creative",
    tag: "Unique",
    desc: "Asymmetric grid. Dark header, warm cream body. Designed to feel like a magazine spread.",
    accent: "#f0c040",
    accentSecondary: "#f5d070",
    bg: "#f7f4ef",
    textColor: "#1a1a1a",
    features: ["Two-tone layout", "Gold accent system", "Skill progress bars"],
    bestFor: "Designers & artists",
  },
];

// ─── Mini portfolio preview card per template ─────────────────────────────────

function MinimalistPreview({ accent }: { accent: string }) {
  return (
    <div className="p-5 h-full" style={{ background: "#fff", color: "#111" }}>
      <div className="mb-3">
        <div
          className="h-5 w-32 rounded mb-1.5"
          style={{ background: "#111", opacity: 0.85 }}
        />
        <div
          className="h-3 w-20 rounded"
          style={{ background: "#888", opacity: 0.5 }}
        />
      </div>
      <div className="flex gap-3 mb-4">
        {["✉", "📍", "🐙"].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-2 w-14 rounded" style={{ background: "#ccc" }} />
          </div>
        ))}
      </div>
      <div className="h-px mb-4" style={{ background: "#eee" }} />
      <div
        className="text-[9px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        ABOUT
      </div>
      <div className="space-y-1 mb-4">
        {[100, 90, 75].map((w) => (
          <div
            key={w}
            className="h-2 rounded"
            style={{ background: "#eee", width: `${w}%` }}
          />
        ))}
      </div>
      <div
        className="text-[9px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        SKILLS
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {["React", "TypeScript", "Node.js", "PostgreSQL"].map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded text-[8px]"
            style={{ border: "1px solid #eee", color: "#555" }}
          >
            {s}
          </span>
        ))}
      </div>
      <div
        className="text-[9px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        PROJECTS
      </div>
      <div className="space-y-2">
        {["Realtime Dashboard ↗", "E-Commerce Platform ↗"].map((p) => (
          <div key={p}>
            <div
              className="text-[9px] font-semibold mb-0.5"
              style={{ color: "#222" }}
            >
              {p}
            </div>
            <div
              className="h-1.5 rounded w-5/6"
              style={{ background: "#f0f0f0" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BoldPreview({ accent }: { accent: string }) {
  return (
    <div
      className="p-5 h-full"
      style={{ background: "#0a0a0a", color: "#f0eff8" }}
    >
      <div
        className="inline-block px-2 py-0.5 rounded-full mb-2 text-[8px] tracking-wider"
        style={{ border: `1px solid ${accent}60`, color: accent }}
      >
        FULL-STACK ENGINEER
      </div>
      <div
        className="font-bold leading-none mb-3"
        style={{ fontSize: 28, fontFamily: "'Playfair Display', serif" }}
      >
        Alex
        <br />
        <span style={{ color: accent }}>Rivera</span>
      </div>
      <div className="space-y-1 mb-4">
        {[80, 65, 55].map((w) => (
          <div
            key={w}
            className="h-1.5 rounded"
            style={{ background: "#222", width: `${w}%` }}
          />
        ))}
      </div>
      <div
        className="mb-1 font-bold text-sm"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Skills<span style={{ color: accent }}>.</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {["React", "TypeScript", "Node.js", "Docker"].map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded-full text-[8px]"
            style={{
              border: "1px solid #222",
              color: "#aaa",
              background: "#111",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div
        className="mb-1 font-bold text-sm"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Projects<span style={{ color: accent }}>.</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Realtime Dashboard", "E-Commerce"].map((p) => (
          <div
            key={p}
            className="p-2 rounded-lg"
            style={{ background: "#111", border: "1px solid #1a1a1a" }}
          >
            <div
              className="text-[8px] font-semibold mb-1"
              style={{ color: "#ddd" }}
            >
              {p}
            </div>
            <div className="h-1 rounded w-4/5" style={{ background: "#222" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativePreview({ accent }: { accent: string }) {
  return (
    <div className="h-full overflow-hidden" style={{ background: "#f7f4ef" }}>
      <div className="p-4" style={{ background: "#1a1a1a", color: "#f7f4ef" }}>
        <div
          className="text-[8px] tracking-widest mb-1"
          style={{ color: accent }}
        >
          FULL-STACK ENGINEER
        </div>
        <div
          className="leading-none"
          style={{
            fontSize: 22,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
          }}
        >
          Alex <span style={{ color: accent }}>Rivera</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-[10px] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1a1a1a",
            }}
          >
            Skills
          </div>
          <div className="flex-1 h-px" style={{ background: "#ddd" }} />
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            ["React", 100],
            ["Node", 80],
            ["Docker", 60],
            ["Figma", 60],
          ].map(([name, pct]) => (
            <div
              key={name}
              className="p-1.5 rounded-lg"
              style={{ background: "#1a1a1a" }}
            >
              <div
                className="text-[7px] font-medium mb-1.5"
                style={{ color: "#f7f4ef" }}
              >
                {name}
              </div>
              <div className="h-0.5 rounded" style={{ background: "#333" }}>
                <div
                  className="h-full rounded"
                  style={{ width: `${pct}%`, background: accent }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-[10px] font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1a1a1a",
            }}
          >
            Projects
          </div>
          <div className="flex-1 h-px" style={{ background: "#ddd" }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div
            className="p-2 rounded-lg"
            style={{ background: "#1a1a1a", color: "#f7f4ef" }}
          >
            <div
              className="text-[8px] font-bold mb-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Realtime Dashboard
            </div>
            <div
              className="h-1 rounded w-4/5 opacity-30"
              style={{ background: "#fff" }}
            />
          </div>
          <div
            className="p-2 rounded-lg"
            style={{ background: "#eee8dc", color: "#1a1a1a" }}
          >
            <div
              className="text-[8px] font-bold mb-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              E-Commerce
            </div>
            <div
              className="h-1 rounded w-3/5 opacity-20"
              style={{ background: "#1a1a1a" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const previewComponents: Record<TemplateId, React.FC<{ accent: string }>> = {
  minimalist: MinimalistPreview,
  bold: BoldPreview,
  creative: CreativePreview,
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TemplateShowcase() {
  const [active, setActive] = useState<TemplateId>("bold");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const activeTemplate = templates.find((t) => t.id === active)!;
  const Preview = previewComponents[active];

  return (
    <section className="py-32 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              03 — Templates
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black leading-tight">
              Pick your vibe.
              <br />
              <span className="gradient-text">Switch anytime.</span>
            </h2>
          </div>
          <p className="text-[var(--text-muted)] text-lg max-w-xs leading-relaxed">
            Every template is fully responsive and production-ready out of the
            box.
          </p>
        </div>

        {/* Layout: tabs + live preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: template picker tabs */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setActive(tmpl.id)}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border transition-all duration-300 group",
                  active === tmpl.id
                    ? "border-[var(--accent)] bg-[var(--surface-2)] shadow-[0_0_24px_rgba(124,106,255,0.1)]"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border)]/80 hover:bg-[var(--surface-2)]",
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    {/* Color swatch */}
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: tmpl.accent }}
                    />
                    <div>
                      <div className="font-semibold text-sm">{tmpl.name}</div>
                      <Badge
                        variant={
                          tmpl.tag === "Most Popular"
                            ? "accent"
                            : tmpl.tag === "Eye-catching"
                              ? "warning"
                              : "success"
                        }
                        size="xs"
                        className="mt-0.5"
                      >
                        {tmpl.tag}
                      </Badge>
                    </div>
                  </div>
                  {active === tmpl.id && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: tmpl.accent }}
                    >
                      <Check size={11} className="text-black" />
                    </div>
                  )}
                </div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-3">
                  {tmpl.desc}
                </p>
                {active === tmpl.id && (
                  <div className="space-y-1">
                    {tmpl.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: tmpl.accent }}
                        />
                        {f}
                      </div>
                    ))}
                    <div className="pt-2 text-xs text-[var(--text-muted)]">
                      Best for{" "}
                      <span
                        className="font-medium"
                        style={{ color: tmpl.accent }}
                      >
                        {tmpl.bestFor}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            ))}

            <Link
              href="/builder"
              className="mt-2 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(124,106,255,0.3)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              Use {activeTemplate.name} Template
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: live browser frame preview */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Browser chrome */}
            <div className="rounded-t-2xl border border-[var(--border)] border-b-0 bg-[var(--surface)] px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div
                className="flex-1 h-6 rounded-md border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-[10px] font-mono text-[var(--text-muted)]"
                style={{ maxWidth: 220, margin: "0 auto" }}
              >
                folio.app/alexrivera
              </div>
              <div className="flex items-center gap-1 bg-[var(--bg)] rounded-lg p-1">
                {(["desktop", "mobile"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDevice(d)}
                    className={cn(
                      "p-1 rounded-md transition-all",
                      device === d
                        ? "bg-[var(--surface-2)] text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]",
                    )}
                  >
                    {d === "desktop" ? (
                      <Monitor size={12} />
                    ) : (
                      <Smartphone size={12} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview frame */}
            <div
              className="border border-[var(--border)] rounded-b-2xl overflow-hidden transition-all duration-500"
              style={{ minHeight: 380 }}
            >
              <div
                className={cn(
                  "transition-all duration-500 overflow-hidden",
                  device === "mobile"
                    ? "max-w-[300px] mx-auto border-x border-[var(--border)]"
                    : "w-full",
                )}
              >
                <Preview accent={activeTemplate.accent} />
              </div>
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ background: activeTemplate.accent }}
                />
                <span className="text-xs text-[var(--text-muted)]">
                  Live preview — updates as you type
                </span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                Switch without losing data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
