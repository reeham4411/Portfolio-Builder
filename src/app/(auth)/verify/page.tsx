"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    // If the user lands here without a code (e.g. navigated manually),
    // redirect after a short delay.
    const timer = setTimeout(() => {
      setStatus("error");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-sm">
        <Link href="/" className="inline-block mb-10">
          <span className="font-display text-3xl font-black gradient-text">
            folio
          </span>
          <span className="font-display text-3xl font-black text-(--text-muted)">
            .
          </span>
        </Link>

        {status === "loading" ? (
          <>
            <Loader2
              size={36}
              className="animate-spin text-(--accent) mx-auto mb-5"
            />
            <h1 className="font-display text-xl font-bold mb-2">
              Verifying your link…
            </h1>
            <p className="text-(--text-muted) text-sm">
              Hang on, we&apos re signing you in.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-xl font-bold mb-2">
              Link expired or invalid
            </h1>
            <p className="text-(--text-muted) text-sm mb-6">
              Magic links expire after 1 hour. Request a new one to continue.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
