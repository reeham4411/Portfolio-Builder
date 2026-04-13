"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/utils";
import { Experience } from "@/types/portfolio";

const emptyExp = (): Experience => ({
  id: generateId(),
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
});

export default function ExperienceForm() {
  const { data, updateExperience, setCurrentStep } = usePortfolio();

  const addExp = () => updateExperience([...data.experience, emptyExp()]);
  const updateExp = (id: string, u: Partial<Experience>) =>
    updateExperience(
      data.experience.map((e) => (e.id === id ? { ...e, ...u } : e)),
    );
  const removeExp = (id: string) =>
    updateExperience(data.experience.filter((e) => e.id !== id));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">Experience</h2>
        <p className="text-[var(--text-muted)] text-sm">
          Add your work history.
        </p>
      </div>

      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">
                {exp.role || "New Experience"}
              </span>
              <button
                onClick={() => removeExp(exp.id)}
                className="text-[var(--text-muted)] hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Company"
                placeholder="Acme Corp"
                value={exp.company}
                onChange={(e) => updateExp(exp.id, { company: e.target.value })}
              />
              <Input
                label="Role"
                placeholder="Software Engineer"
                value={exp.role}
                onChange={(e) => updateExp(exp.id, { role: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                type="month"
                value={exp.startDate}
                onChange={(e) =>
                  updateExp(exp.id, { startDate: e.target.value })
                }
              />
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) => updateExp(exp.id, { endDate: e.target.value })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) =>
                  updateExp(exp.id, { current: e.target.checked })
                }
                className="rounded"
              />
              Currently working here
            </label>
            <Textarea
              label="Description"
              placeholder="Briefly describe your responsibilities..."
              rows={3}
              value={exp.description}
              onChange={(e) =>
                updateExp(exp.id, { description: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={addExp} className="w-full">
        <Plus size={16} /> Add Experience
      </Button>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setCurrentStep("projects")}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep("publish")} className="flex-1">
          Review & Publish
        </Button>
      </div>
    </div>
  );
}
