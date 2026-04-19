"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { BuilderStep } from "@/types/portfolio";
import {
  Check,
  Palette,
  User,
  Zap,
  FolderOpen,
  Briefcase,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps: { id: BuilderStep; label: string; icon: React.ElementType }[] = [
  { id: "template", label: "Template", icon: Palette },
  { id: "personal", label: "Personal", icon: User },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "publish", label: "Publish", icon: Rocket },
];

const order = steps.map((s) => s.id);

export default function StepNav() {
  const { currentStep, setCurrentStep } = usePortfolio();
  const currentIndex = order.indexOf(currentStep);

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {steps.map(({ id, label, icon: Icon }, i) => {
        const done = i < currentIndex;
        const active = id === currentStep;

        return (
          <button
            key={id}
            onClick={() => setCurrentStep(id)}
            className={cn(
              "flex items-center gap-3 px-5 py-3 rounded-xl text-base font-semibold transition-all whitespace-nowrap",
              active &&
                "bg-(--accent)/10 text-(--accent) border border-(--accent)/30",
              done && !active && "text-(--text-muted) hover:text-(--text)",
              !done && !active && "text-(--text-muted)/40 cursor-default",
            )}
            disabled={!done && !active && i > currentIndex}
          >
            {done ? (
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check size={15} className="text-emerald-400" />
              </span>
            ) : (
              <Icon size={18} />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}
