"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateId } from "@/types/portfolio";
import Badge from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/client";

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

// Mini portfolio preview card per template

function MinimalistPreview({ accent }: { accent: string }) {
  return (
    <div className="p-6 h-full" style={{ background: "#fff", color: "#111" }}>
      <div className="mb-4">
        <div
          className="h-6 w-36 rounded mb-2"
          style={{ background: "#111", opacity: 0.85 }}
        />
        <div
          className="h-4 w-24 rounded"
          style={{ background: "#888", opacity: 0.5 }}
        />
      </div>
      <div className="flex gap-3 mb-5">
        {["✉", "📍", "🐙"].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className="h-2.5 w-16 rounded"
              style={{ background: "#ccc" }}
            />
          </div>
        ))}
      </div>
      <div className="h-px mb-5" style={{ background: "#eee" }} />
      <div
        className="text-[10px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        ABOUT
      </div>
      <div className="space-y-1.5 mb-5">
        {[100, 90, 75].map((w) => (
          <div
            key={w}
            className="h-2.5 rounded"
            style={{ background: "#eee", width: `${w}%` }}
          />
        ))}
      </div>
      <div
        className="text-[10px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        SKILLS
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {["React", "TypeScript", "Node.js", "PostgreSQL"].map((s) => (
          <span
            key={s}
            className="px-2.5 py-1 rounded text-[9px]"
            style={{ border: "1px solid #eee", color: "#555" }}
          >
            {s}
          </span>
        ))}
      </div>
      <div
        className="text-[10px] font-mono tracking-widest mb-2"
        style={{ color: "#aaa" }}
      >
        PROJECTS
      </div>
      <div className="space-y-2.5">
        {["Realtime Dashboard ↗", "E-Commerce Platform ↗"].map((p) => (
          <div key={p}>
            <div
              className="text-[10px] font-semibold mb-1"
              style={{ color: "#222" }}
            >
              {p}
            </div>
            <div
              className="h-2 rounded w-5/6"
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
      className="p-6 h-full"
      style={{ background: "#0a0a0a", color: "#f0eff8" }}
    >
      <div
        className="inline-block px-2.5 py-1 rounded-full mb-3 text-[9px] tracking-wider"
        style={{ border: `1px solid ${accent}60`, color: accent }}
      >
        FULL-STACK ENGINEER
      </div>
      <div
        className="font-bold leading-none mb-4"
        style={{ fontSize: 32, fontFamily: "'Playfair Display', serif" }}
      >
        Alex
        <br />
        <span style={{ color: accent }}>Rivera</span>
      </div>
      <div className="space-y-1.5 mb-5">
        {[80, 65, 55].map((w) => (
          <div
            key={w}
            className="h-2 rounded"
            style={{ background: "#222", width: `${w}%` }}
          />
        ))}
      </div>
      <div
        className="mb-2 font-bold text-base"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Skills<span style={{ color: accent }}>.</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["React", "TypeScript", "Node.js", "Docker"].map((s) => (
          <span
            key={s}
            className="px-2.5 py-1 rounded-full text-[9px]"
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
        className="mb-2 font-bold text-base"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Projects<span style={{ color: accent }}>.</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {["Realtime Dashboard", "E-Commerce"].map((p) => (
          <div
            key={p}
            className="p-3 rounded-xl"
            style={{ background: "#111", border: "1px solid #1a1a1a" }}
          >
            <div
              className="text-[9px] font-semibold mb-1.5"
              style={{ color: "#ddd" }}
            >
              {p}
            </div>
            <div
              className="h-1.5 rounded w-4/5"
              style={{ background: "#222" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativePreview({ accent }: { accent: string }) {
  return (
    <div className="h-full overflow-hidden" style={{ background: "#f7f4ef" }}>
      <div className="p-5" style={{ background: "#1a1a1a", color: "#f7f4ef" }}>
        <div
          className="text-[9px] tracking-widest mb-1.5"
          style={{ color: accent }}
        >
          FULL-STACK ENGINEER
        </div>
        <div
          className="leading-none"
          style={{
            fontSize: 26,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
          }}
        >
          Alex <span style={{ color: accent }}>Rivera</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="text-xs font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1a1a1a",
            }}
          >
            Skills
          </div>
          <div className="flex-1 h-px" style={{ background: "#ddd" }} />
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            ["React", 100],
            ["Node", 80],
            ["Docker", 60],
            ["Figma", 60],
          ].map(([name, pct]) => (
            <div
              key={name}
              className="p-2 rounded-lg"
              style={{ background: "#1a1a1a" }}
            >
              <div
                className="text-[8px] font-medium mb-2"
                style={{ color: "#f7f4ef" }}
              >
                {name}
              </div>
              <div className="h-1 rounded" style={{ background: "#333" }}>
                <div
                  className="h-full rounded"
                  style={{ width: `${pct}%`, background: accent }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div
            className="text-xs font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1a1a1a",
            }}
          >
            Projects
          </div>
          <div className="flex-1 h-px" style={{ background: "#ddd" }} />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className="p-3 rounded-xl"
            style={{ background: "#1a1a1a", color: "#f7f4ef" }}
          >
            <div
              className="text-[9px] font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Realtime Dashboard
            </div>
            <div
              className="h-1.5 rounded w-4/5 opacity-30"
              style={{ background: "#fff" }}
            />
          </div>
          <div
            className="p-3 rounded-xl"
            style={{ background: "#eee8dc", color: "#1a1a1a" }}
          >
            <div
              className="text-[9px] font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              E-Commerce
            </div>
            <div
              className="h-1.5 rounded w-3/5 opacity-20"
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

export default function TemplateShowcase() {
  const [active, setActive] = useState<TemplateId>("bold");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const activeTemplate = templates.find((t) => t.id === active)!;
  const Preview = previewComponents[active];

  return (
    <section className="py-40 px-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="font-display text-6xl md:text-7xl font-black leading-tight">
              Pick your vibe.
              <br />
              <span className="gradient-text">Switch anytime.</span>
            </h2>
          </div>
          <p className="text-[var(--text-muted)] text-xl md:text-2xl max-w-md leading-relaxed">
            Every template is fully responsive and production-ready out of the
            box.
          </p>
        </div>

        {/* Layout: tabs + live preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: template picker tabs */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setActive(tmpl.id)}
                className={cn(
                  "w-full text-left p-7 rounded-3xl border transition-all duration-300 group",
                  active === tmpl.id
                    ? "border-[var(--accent)] bg-[var(--surface-2)] shadow-[0_0_24px_rgba(124,106,255,0.1)]"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border)]/80 hover:bg-[var(--surface-2)]",
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: tmpl.accent }}
                    />
                    <div>
                      <div className="font-semibold text-xl">{tmpl.name}</div>
                      <Badge
                        variant={
                          tmpl.tag === "Most Popular"
                            ? "accent"
                            : tmpl.tag === "Eye-catching"
                              ? "warning"
                              : "success"
                        }
                        size="xs"
                        className="mt-1"
                      >
                        {tmpl.tag}
                      </Badge>
                    </div>
                  </div>
                  {active === tmpl.id && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: tmpl.accent }}
                    >
                      <Check size={15} className="text-black" />
                    </div>
                  )}
                </div>

                <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-4">
                  {tmpl.desc}
                </p>

                {active === tmpl.id && (
                  <div className="space-y-2">
                    {tmpl.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 text-sm md:text-base text-[var(--text-muted)]"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: tmpl.accent }}
                        />
                        {f}
                      </div>
                    ))}
                    <div className="pt-3 text-sm md:text-base text-[var(--text-muted)]">
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

            {isLoggedIn ? (
              <Link
                href="/builder"
                className="mt-3 flex items-center justify-center gap-3 py-5 px-8 rounded-3xl text-lg md:text-xl font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(124,106,255,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                Use {activeTemplate.name} Template
                <ArrowRight size={20} />
              </Link>
            ) : (
              <button
                disabled
                className="mt-3 flex items-center justify-center gap-3 py-5 px-8 rounded-3xl text-lg md:text-xl font-semibold text-black opacity-50 cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                Use {activeTemplate.name} Template
                <ArrowRight size={20} />
              </button>
            )}
          </div>

          {/* Right: live browser frame preview */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Browser chrome */}
            <div className="rounded-t-3xl border border-[var(--border)] border-b-0 bg-[var(--surface)] px-6 py-4 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500/50" />
                <div className="w-4 h-4 rounded-full bg-yellow-500/50" />
                <div className="w-4 h-4 rounded-full bg-green-500/50" />
              </div>

              <div
                className="flex-1 h-8 rounded-md border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center text-xs font-mono text-[var(--text-muted)]"
                style={{ maxWidth: 280, margin: "0 auto" }}
              >
                folio.app/alexrivera
              </div>

              <div className="flex items-center gap-2 bg-[var(--bg)] rounded-xl p-1.5">
                {(["desktop", "mobile"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDevice(d)}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      device === d
                        ? "bg-[var(--surface-2)] text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]",
                    )}
                  >
                    {d === "desktop" ? (
                      <Monitor size={16} />
                    ) : (
                      <Smartphone size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview frame */}
            <div
              className="border border-[var(--border)] rounded-b-3xl overflow-hidden transition-all duration-500"
              style={{ minHeight: 500 }}
            >
              <div
                className={cn(
                  "transition-all duration-500 overflow-hidden",
                  device === "mobile"
                    ? "max-w-[340px] mx-auto border-x border-[var(--border)]"
                    : "w-full",
                )}
              >
                <Preview accent={activeTemplate.accent} />
              </div>
            </div>

            {/* Caption */}
            <div className="mt-5 flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: activeTemplate.accent }}
                />
                <span className="text-sm md:text-base text-[var(--text-muted)]">
                  Live preview — updates as you type
                </span>
              </div>
              <span className="text-sm md:text-base text-[var(--text-muted)]">
                Switch without losing data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
