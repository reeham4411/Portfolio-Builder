"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { generateAIContent } from "@/lib/ai";

export default function PersonalInfoForm() {
  const { data, updatePersonalInfo, setCurrentStep } = usePortfolio();
  const { personalInfo: info } = data;
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIBio = async () => {
    if (!info.name || !info.title) return;
    setAiLoading(true);
    try {
      const result = await generateAIContent(
        `Write a concise, compelling professional bio (3-4 sentences) for ${info.name}, who is a ${info.title}. Make it engaging, first-person, and suitable for a portfolio website. Return only the bio text.`,
      );
      updatePersonalInfo({ bio: result });
    } catch {
      console.error("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold mb-1">
          Personal Information
        </h2>
        <p className="text-(--text-muted) text-sm">
          This appears at the top of your portfolio.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            value={info.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          />
          <Input
            label="Professional Title"
            placeholder="Full-Stack Developer"
            value={info.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="jane@example.com"
            value={info.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
          <Input
            label="Location"
            placeholder="New York, USA"
            value={info.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="GitHub"
            placeholder="github.com/username"
            value={info.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          />
          <Input
            label="LinkedIn"
            placeholder="linkedin.com/in/username"
            value={info.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-(--text-muted)">
              Bio
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAIBio}
              loading={aiLoading}
              className="text-(--accent)"
            >
              <Sparkles size={13} />
              Generate with AI
            </Button>
          </div>
          <Textarea
            placeholder="A brief professional bio about yourself..."
            rows={5}
            value={info.bio}
            onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setCurrentStep("template")}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep("skills")} className="flex-1">
          Continue to Skills
        </Button>
      </div>
    </div>
  );
}
