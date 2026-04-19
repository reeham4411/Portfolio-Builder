"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full opacity-8"
          style={{ background: "var(--accent)", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-display text-4xl font-black gradient-text">
              folio
            </span>
            <span className="font-display text-4xl font-black text-(--text-muted)">
              .
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--surface) p-8">
          {!sent ? (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold mb-1">
                  Welcome back
                </h1>
                <p className="text-(--text-muted) text-sm">
                  Enter your email and we&apos;ll send you a magic link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-(--text-muted) uppercase tracking-wide">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-(--border) bg-(--bg) text-(--text) placeholder-(--text-muted) text-sm focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  }}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-4 w-4"
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
                    <>
                      Send magic link
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-(--text-muted)">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-(--accent) hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            /* Sent state */
            <div className="text-center py-4">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                <Mail size={24} className="text-white" />
              </div>
              <h2 className="font-display text-xl font-bold mb-2">
                Check your inbox
              </h2>
              <p className="text-(--text-muted) text-sm leading-relaxed mb-6">
                We sent a magic link to{" "}
                <span className="text-(--text) font-medium">{email}</span>.
                Click the link to sign in — it expires in 1 hour.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="text-sm text-(--accent) hover:underline"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        {/* Magic link explanation */}
        <div className="mt-5 flex items-start gap-2.5 px-2">
          <Sparkles size={13} className="text-(--text-muted) shrink-0 mt-0.5" />
          <p className="text-xs text-(--text-muted) leading-relaxed">
            No password needed. We use secure magic links — one click and
            you&apos re in.
          </p>
        </div>
      </div>
    </div>
  );
}
