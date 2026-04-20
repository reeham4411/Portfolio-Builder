"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { PortfolioRow } from "@/types/portfolio";
import {
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  Globe,
  Clock,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  user: User;
  portfolios: PortfolioRow[];
}

export default function DashboardClient({ user, portfolios: initial }: Props) {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<PortfolioRow[]>(initial);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio? This cannot be undone.")) return;
    setDeletingId(id);

    try {
      const res = await fetch("/api/portfolio/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId: id }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete portfolio");
      }

      setPortfolios((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete portfolio. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Nav */}
      <header className="border-b border-(--border) bg-(--surface)">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="font-display text-2xl font-black gradient-text">
              folio
            </span>
            <span className="font-display text-2xl font-black text-(--text-muted)">
              .
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-(--text-muted) hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text) transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl font-black mb-1">
              Your portfolios
            </h1>
            <p className="text-(--text-muted) text-sm">
              {portfolios.length === 0
                ? "No portfolios yet — create your first one."
                : `${portfolios.length} portfolio${portfolios.length > 1 ? "s" : ""}`}
            </p>
          </div>

          <Link
            href="/builder"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
            }}
          >
            <Plus size={15} />
            New portfolio
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-dashed border-(--border)">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              <Plus size={24} className="text-white" />
            </div>

            <h2 className="font-display text-xl font-bold mb-2">
              Create your first portfolio
            </h2>

            <p className="text-(--text-muted) text-sm mb-6 max-w-xs mx-auto">
              Pick a template, fill in your details, and publish in minutes.
            </p>

            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              Get started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="group rounded-2xl border border-(--border) bg-(--surface) p-5 hover:border-(--accent)/40 transition-all duration-300"
              >
                <div
                  className="h-1.5 rounded-full mb-4"
                  style={{
                    background:
                      portfolio.template_id === "bold"
                        ? "#ff6b9d"
                        : portfolio.template_id === "creative"
                          ? "#f0c040"
                          : "#7c6aff",
                  }}
                />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {portfolio.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1">
                      {portfolio.is_published ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <Globe size={10} />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-(--text-muted)">
                          <Clock size={10} />
                          Draft
                        </span>
                      )}

                      <span className="text-(--text-muted) text-xs">·</span>

                      <span className="text-xs text-(--text-muted) capitalize">
                        {portfolio.template_id}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-(--text-muted) mb-4">
                  Updated {formatDate(portfolio.updated_at)}
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/builder?id=${portfolio.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border) text-xs text-(--text-muted) hover:text-(--text) hover:border-(--accent)/40 transition-all"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>

                  {portfolio.is_published && portfolio.slug && (
                    <Link
                      href={`/portfolio/${portfolio.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border) text-xs text-(--text-muted) hover:text-(--text) transition-all"
                    >
                      <ExternalLink size={12} />
                      View
                    </Link>
                  )}

                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    disabled={deletingId === portfolio.id}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent text-xs text-(--text-muted) hover:text-red-400 hover:border-red-500/25 hover:bg-red-500/5 transition-all disabled:opacity-50"
                  >
                    {deletingId === portfolio.id ? (
                      <svg
                        className="animate-spin h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      <Trash2 size={12} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
