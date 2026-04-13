"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { generateId } from "@/lib/utils";
import { Project } from "@/types/portfolio";
import { generateAIContent } from "@/lib/ai";

const emptyProject = (): Project => ({
  id: generateId(),
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
});

export default function ProjectsForm() {
  const { data, updateProjects, setCurrentStep } = usePortfolio();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const addProject = () => {
    const p = emptyProject();
    updateProjects([...data.projects, p]);
    setExpanded(p.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) =>
    updateProjects(
      data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );

  const removeProject = (id: string) =>
    updateProjects(data.projects.filter((p) => p.id !== id));

  const handleAIDesc = async (project: Project) => {
    if (!project.title) return;
    setAiLoading(project.id);
    try {
      const result = await generateAIContent(
        `Write a compelling 2-3 sentence project description for a portfolio for a project called "${project.title}"${project.techStack.length ? ` built with ${project.techStack.join(", ")}` : ""}. Make it engaging and professional.`,
      );
      updateProject(project.id, { description: result });
    } catch {
      console.error("Failed");
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">Projects</h2>
        <p className="text-(--text-muted) text-sm">Showcase your best work.</p>
      </div>

      <div className="space-y-3">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-(--border) bg-(--surface) overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-(--surface-2) transition-colors"
              onClick={() =>
                setExpanded(expanded === project.id ? null : project.id)
              }
            >
              <span className="font-medium">
                {project.title || "Untitled Project"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(project.id);
                  }}
                  className="text-(--text-muted) hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
                {expanded === project.id ? (
                  <ChevronUp size={16} className="text-(--text-muted)" />
                ) : (
                  <ChevronDown size={16} className="text-(--text-muted)" />
                )}
              </div>
            </button>

            {expanded === project.id && (
              <div className="p-4 pt-0 space-y-4 border-t border-(--border)">
                <div className="pt-4">
                  <Input
                    label="Project Title"
                    placeholder="My Awesome App"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(project.id, { title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-(--text-muted)">
                      Description
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAIDesc(project)}
                      loading={aiLoading === project.id}
                      className="text-(--accent) text-xs"
                    >
                      <Sparkles size={12} /> AI Write
                    </Button>
                  </div>
                  <Textarea
                    placeholder="What does this project do?"
                    rows={3}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, { description: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="Tech Stack (comma separated)"
                  placeholder="React, Node.js, PostgreSQL"
                  value={project.techStack.join(", ")}
                  onChange={(e) =>
                    updateProject(project.id, {
                      techStack: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Live URL"
                    placeholder="https://..."
                    value={project.liveUrl}
                    onChange={(e) =>
                      updateProject(project.id, { liveUrl: e.target.value })
                    }
                  />
                  <Input
                    label="GitHub URL"
                    placeholder="https://github.com/..."
                    value={project.githubUrl}
                    onChange={(e) =>
                      updateProject(project.id, { githubUrl: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={addProject} className="w-full">
        <Plus size={16} /> Add Project
      </Button>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setCurrentStep("skills")}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep("experience")} className="flex-1">
          Continue to Experience
        </Button>
      </div>
    </div>
  );
}
