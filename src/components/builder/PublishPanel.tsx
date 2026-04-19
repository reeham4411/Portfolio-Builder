"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { Check, Copy, Globe, Rocket } from "lucide-react";

export default function PublishPanel() {
  const {
    data,
    publishPortfolio,
    publishedId,
    setCurrentStep,
    isPublishing,
    error,
  } = usePortfolio();

  const [copied, setCopied] = useState(false);

  const handlePublish = async () => {
    await publishPortfolio();
  };

  const shareUrl = publishedId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/portfolio/${publishedId}`
    : "";

  const copyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">
          Publish Portfolio
        </h2>
        <p className="text-(--text-muted) text-sm">Go live with one click.</p>
      </div>

      <div className="space-y-3">
        {[
          [
            "Template",
            data.templateId.charAt(0).toUpperCase() + data.templateId.slice(1),
          ],
          ["Name", data.personalInfo.name || "—"],
          ["Skills", `${data.skills.length} added`],
          ["Projects", `${data.projects.length} added`],
          ["Experience", `${data.experience.length} added`],
        ].map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between text-sm py-2 border-b border-(--border)"
          >
            <span className="text-(--text-muted)">{label}</span>
            <span className="font-medium">{val}</span>
          </div>
        ))}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {!publishedId ? (
        <Button
          onClick={handlePublish}
          loading={isPublishing}
          className="w-full"
          size="lg"
        >
          <Rocket size={18} />
          {isPublishing ? "Publishing..." : "Publish Now"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center gap-2 text-emerald-400 font-medium mb-3">
              <Check size={16} />
              Your portfolio is live!
            </div>

            <div className="flex items-center gap-2 bg-(--bg) rounded-lg p-2.5 border border-(--border)">
              <Globe size={14} className="text-(--text-muted) shrink-0" />
              <span className="text-sm font-mono text-(--text-muted) flex-1 truncate">
                {shareUrl}
              </span>

              <button
                onClick={copyLink}
                className="shrink-0 text-(--accent) hover:text-(--text) transition-colors"
                aria-label="Copy portfolio link"
                type="button"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          <a href={shareUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full">
              <Globe size={15} /> Open Portfolio
            </Button>
          </a>
        </div>
      )}

      <Button
        variant="ghost"
        onClick={() => setCurrentStep("experience")}
        className="w-full text-(--text-muted)"
      >
        ← Back to Experience
      </Button>
    </div>
  );
}
