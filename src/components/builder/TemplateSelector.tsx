"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { TemplateId } from "@/types/portfolio";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const templates: {
  id: TemplateId;
  name: string;
  desc: string;
  accent: string;
}[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    desc: "Clean, spacious, typography-first layout perfect for developers and writers.",
    accent: "#7c6aff",
  },
  {
    id: "bold",
    name: "Bold",
    desc: "High contrast, strong headings. Makes a statement in job applications.",
    accent: "#ff6b9d",
  },
  {
    id: "creative",
    name: "Creative",
    desc: "Asymmetric grid, colorful accents. Perfect for designers and artists.",
    accent: "#f0c040",
  },
];

export default function TemplateSelector() {
  const { data, updateTemplate, setCurrentStep } = usePortfolio();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">
          Choose your template
        </h2>
        <p className="text-(--text-muted) text-sm">
          You can switch anytime without losing your data.
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map(({ id, name, desc, accent }) => {
          const selected = data.templateId === id;
          return (
            <button
              key={id}
              onClick={() => updateTemplate(id)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all duration-300",
                selected
                  ? "border-(--accent) bg-(--surface-2)"
                  : "border-(--border) bg-(--surface) hover:border-(--border)/80",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mini preview */}
                  <div
                    className="w-16 h-12 rounded-lg shrink-0 overflow-hidden relative"
                    style={{ background: "var(--bg)" }}
                  >
                    <div
                      className="absolute top-2 left-2 w-4 h-4 rounded-full"
                      style={{ background: accent }}
                    />
                    <div
                      className="absolute top-7 left-2 right-2 h-1 rounded"
                      style={{ background: accent, opacity: 0.5 }}
                    />
                    <div
                      className="absolute top-9 left-2 right-4 h-0.5 rounded"
                      style={{ background: accent, opacity: 0.3 }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-(--text-muted) text-sm mt-0.5">
                      {desc}
                    </div>
                  </div>
                </div>
                {selected && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: accent }}
                  >
                    <Check size={13} className="text-black" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Button onClick={() => setCurrentStep("personal")} className="w-full">
        Continue with {templates.find((t) => t.id === data.templateId)?.name}
      </Button>
    </div>
  );
}
