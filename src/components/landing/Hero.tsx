"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    badge: "Most Popular",
    accent: "#7c6aff",
    description:
      "Whitespace-first design with sharp editorial typography. Lets your content breathe.",
    bullets: [],
    bestFor: "",
  },
  {
    id: "bold",
    name: "Bold",
    badge: "Eye-catching",
    accent: "#ff6b9d",
    description:
      "High contrast dark canvas. Your name owns the page. Impossible to scroll past.",
    bullets: ["Dark canvas", "Pink accent system", "Timeline experience"],
    bestFor: "Best for Engineers & PMs",
  },
  {
    id: "creative",
    name: "Creative",
    badge: "Unique",
    accent: "#f0c040",
    description:
      "Asymmetric grid. Dark header, warm cream body. Designed to feel like a magazine spread.",
    bullets: [],
    bestFor: "",
  },
] as const;

export default function TemplateShowcase() {
  const [selected, setSelected] =
    useState<(typeof templates)[number]["id"]>("bold");
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

  const activeTemplate =
    templates.find((template) => template.id === selected) ?? templates[0];

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-4">
              <span className="gradient-text">Switch anytime.</span>
            </h2>

            <p className="text-(--text-muted) text-lg mb-10">
              Every template is fully responsive and production-ready out of the
              box.
            </p>

            <div className="space-y-4">
              {templates.map((template) => {
                const isActive = selected === template.id;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelected(template.id)}
                    className={cn(
                      "w-full rounded-3xl border p-5 text-left transition-all duration-300",
                      isActive
                        ? "border-(--accent) bg-(--surface-2)"
                        : "border-(--border) bg-(--surface)",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-12 w-12 rounded-2xl shrink-0"
                        style={{ background: template.accent }}
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-semibold">
                                {template.name}
                              </h3>
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                style={{
                                  background: `${template.accent}20`,
                                  color: template.accent,
                                  border: `1px solid ${template.accent}40`,
                                }}
                              >
                                {template.badge}
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <div
                              className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                              style={{ background: template.accent }}
                            >
                              <Check size={14} className="text-black" />
                            </div>
                          )}
                        </div>

                        <p className="mt-4 text-(--text-muted) text-lg leading-relaxed">
                          {template.description}
                        </p>

                        {template.bullets.length > 0 && (
                          <ul className="mt-5 space-y-2 text-(--text-muted)">
                            {template.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-center gap-3"
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ background: template.accent }}
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {template.bestFor && (
                          <p
                            className="mt-5 text-sm"
                            style={{ color: template.accent }}
                          >
                            {template.bestFor}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              {isLoggedIn ? (
                <Link
                  href="/builder"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-5 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  }}
                >
                  Use {activeTemplate.name} Template
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-5 text-lg font-semibold text-black opacity-50 cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  }}
                >
                  Use {activeTemplate.name} Template
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-(--border) bg-(--surface) overflow-hidden">
            <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>

              <div className="rounded-lg border border-(--border) px-4 py-1.5 text-sm text-(--text-muted)">
                folio.app/{selected}
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-(--bg) p-2">🖥️</div>
                <div className="rounded-lg bg-(--bg) p-2">📱</div>
              </div>
            </div>

            <div className="p-5">
              <div className="min-h-[430px] rounded-[1.5rem] bg-black/80 p-6">
                {selected === "minimalist" && (
                  <div className="h-full rounded-[1.25rem] bg-white p-8 text-black">
                    <div className="mb-6">
                      <div className="text-5xl font-bold mb-2">Alex Rivera</div>
                      <div className="text-zinc-500 text-lg">
                        Frontend Engineer
                      </div>
                    </div>
                    <div className="space-y-3 text-zinc-600">
                      <div className="h-3 w-2/3 rounded bg-zinc-200" />
                      <div className="h-3 w-1/2 rounded bg-zinc-200" />
                    </div>
                  </div>
                )}

                {selected === "bold" && (
                  <div className="h-full rounded-[1.25rem] bg-black p-8 text-white">
                    <div className="mb-8">
                      <div className="mb-3 inline-block rounded-full border border-pink-500/40 px-3 py-1 text-xs text-pink-400">
                        FULL-STACK ENGINEER
                      </div>
                      <div className="text-6xl font-black leading-none">
                        Alex
                        <br />
                        <span className="text-pink-500">Rivera</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="h-3 w-full rounded bg-zinc-800" />
                      <div className="h-3 w-4/5 rounded bg-zinc-800" />
                    </div>
                    <div className="mb-6">
                      <div className="mb-3 text-xl font-bold">Skills.</div>
                      <div className="flex gap-2 flex-wrap">
                        {["React", "TypeScript", "Node.js", "Docker"].map(
                          (item) => (
                            <span
                              key={item}
                              className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                            >
                              {item}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "creative" && (
                  <div className="h-full overflow-hidden rounded-[1.25rem]">
                    <div className="bg-[#1a1a1a] px-8 py-8 text-white">
                      <div className="text-xs tracking-[0.3em] uppercase text-[#f0c040] mb-3">
                        Product Designer
                      </div>
                      <div className="text-6xl font-black leading-none">
                        Alex
                      </div>
                      <div className="text-6xl font-black leading-none text-[#f0c040] text-right">
                        Rivera
                      </div>
                    </div>
                    <div className="bg-[#f7f4ef] px-8 py-8 text-black">
                      <div className="space-y-3">
                        <div className="h-3 w-3/4 rounded bg-black/10" />
                        <div className="h-3 w-1/2 rounded bg-black/10" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-(--text-muted)">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500" />
                  Live preview — updates as you type
                </div>
                <div>Switch without losing content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
