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
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--border) bg-(--surface)">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-6">
          <div className="mx-auto max-w-56 h-6 rounded-md border border-(--border) bg-(--bg) flex items-center px-3 text-(--text-muted) text-xs font-mono">
            folio.app/preview
          </div>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-(--bg)">
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
                "p-1.5 rounded-md transition-all",
                device === d
                  ? "bg-(--surface-2) text-(--text)"
                  : "text-(--text-muted) hover:text-(--text)",
              )}
            >
              <Icon size={15} />
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
