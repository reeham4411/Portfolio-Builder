"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Globe, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-(--accent) opacity-10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-(--accent-2) opacity-8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-8 py-5 z-50 gap-4">
        <span className="font-display text-4xl md:text-5xl font-bold tracking-tight shrink-0">
          <span className="gradient-text">folio</span>
          <span className="text-(--text-muted)">.</span>
        </span>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2.5 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2.5 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
              >
                Sign Up
              </Link>

              <button
                disabled
                className="flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2.5 rounded-full border border-(--border) opacity-50 cursor-not-allowed"
              >
                Saved Portfolios
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2.5 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
              >
                Saved Portfolios
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm md:text-base font-semibold px-4 md:px-5 py-2.5 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          )}

          {isLoggedIn ? (
            <Link
              href="/builder"
              className="flex items-center gap-2 text-base md:text-lg font-semibold px-5 md:px-7 py-3 rounded-full border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-all duration-300"
            >
              Start Building <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 text-base md:text-lg font-semibold px-5 md:px-7 py-3 rounded-full border border-(--border) opacity-50 cursor-not-allowed"
            >
              Start Building <ArrowRight size={18} />
            </button>
          )}
        </div>
      </nav>

      <div className="relative z-0 text-center max-w-6xl mx-auto px-6 pt-24">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-8 opacity-0 animate-fade-up animate-delay-100">
          Your work,
          <br />
          <span className="gradient-text">beautifully</span>
          <br />
          presented.
        </h1>

        <p className="text-(--text-muted) text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-up animate-delay-200">
          Build a stunning professional portfolio in minutes — not days. Choose
          a template, fill in your story, let AI refine it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animate-delay-300">
          {isLoggedIn ? (
            <Link
              href="/builder"
              className="group flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full text-black font-semibold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,106,255,0.4)]"
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
          ) : (
            <button
              disabled
              className="group flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full text-black font-semibold text-lg md:text-xl opacity-50 cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              Build My Portfolio
              <ArrowRight size={18} />
            </button>
          )}

          <Link
            href="/preview/demo"
            className="flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full border border-(--border) text-lg md:text-xl font-semibold text-(--text-muted) hover:text-var(--text) hover:border-(--text) transition-all duration-300"
          >
            <Globe size={18} />
            See Example
          </Link>
        </div>
      </div>
    </section>
  );
}
