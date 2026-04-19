"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import BoldTemplate from "@/components/templates/Boldtemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PreviewPane() {
  const { data } = usePortfolio();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const Template =
    data.templateId === "bold"
      ? BoldTemplate
      : data.templateId === "creative"
        ? CreativeTemplate
        : MinimalistTemplate;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-(--border) bg-(--surface)">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500/60" />
          <div className="w-4 h-4 rounded-full bg-yellow-500/60" />
          <div className="w-4 h-4 rounded-full bg-green-500/60" />
        </div>

        <div className="flex-1 mx-8">
          <div className="mx-auto max-w-72 h-10 rounded-lg border border-(--border) bg-(--bg) flex items-center px-4 text-(--text-muted) text-sm font-mono">
            folio.app/preview
          </div>
        </div>

        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-(--bg)">
          {(
            [
              ["desktop", Monitor],
              ["mobile", Smartphone],
            ] as const
          ).map(([d, Icon]) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={cn(
                "p-2.5 rounded-lg transition-all",
                device === d
                  ? "bg-(--surface-2) text-(--text)"
                  : "text-(--text-muted) hover:text-(--text)",
              )}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-(--bg) flex items-start justify-center p-4">
        <div
          className={cn(
            "origin-top transition-all duration-300 rounded-lg overflow-hidden shadow-2xl",
            device === "mobile" ? "w-80" : "w-full max-w-3xl",
          )}
          style={{ transform: device === "mobile" ? "scale(0.9)" : "scale(1)" }}
        >
          <Template data={data} />
        </div>
      </div>
    </div>
  );
}
