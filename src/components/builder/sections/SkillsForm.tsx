"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { generateId } from "@/lib/utils";
import { Skill } from "@/types/portfolio";

export default function SkillsForm() {
  const { data, updateSkills, setCurrentStep } = usePortfolio();
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = {
      id: generateId(),
      name: newSkill.trim(),
      level: 4,
      category: newCategory,
    };
    updateSkills([...data.skills, skill]);
    setNewSkill("");
  };

  const removeSkill = (id: string) =>
    updateSkills(data.skills.filter((s) => s.id !== id));
  const updateLevel = (id: string, level: number) =>
    updateSkills(data.skills.map((s) => (s.id === id ? { ...s, level } : s)));

  const categories = [
    "Frontend",
    "Backend",
    "DevOps",
    "Design",
    "Mobile",
    "Other",
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">Skills</h2>
        <p className="text-(--text-muted) text-sm">
          Add your technical and professional skills.
        </p>
      </div>

      {/* Add skill */}
      <div className="p-4 rounded-xl border border-(--border) bg-(--surface) space-y-3">
        <div className="flex gap-3">
          <Input
            placeholder="Skill name (e.g. React)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className="flex-1"
          />
          <Button onClick={addSkill} size="sm">
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setNewCategory(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${newCategory === cat ? "border-(--accent) text-(--accent) bg-(--accent)/10" : "border-(--border)text-(--text-muted)"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills list */}
      <div className="space-y-2">
        {data.skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-(--border) bg-(--surface)"
          >
            <Badge variant="accent">{skill.category}</Badge>
            <span className="flex-1 text-sm font-medium">{skill.name}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((l) => (
                <button
                  key={l}
                  onClick={() => updateLevel(skill.id, l)}
                  className={`w-4 h-4 rounded-full transition-all ${l <= skill.level ? "bg-(--accent)" : "bg-(--border)"}`}
                />
              ))}
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-(--text-muted) hover:text-red-400 transition-colors ml-1"
            >
              <X size={15} />
            </button>
          </div>
        ))}
        {data.skills.length === 0 && (
          <div className="text-center py-8 text-(--text-muted) text-sm">
            No skills added yet
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setCurrentStep("personal")}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep("projects")} className="flex-1">
          Continue to Projects
        </Button>
      </div>
    </div>
  );
}
